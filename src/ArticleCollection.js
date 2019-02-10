import EventManager from './EventManager'
import { getMainConfig } from './Config'
import { fetchJson, pathJoin, getAbsoluteURL } from './Tools'
import Article from './Article'


class ArticleCollection extends EventManager {
  constructor() {
    super()
    let that = this
    this._isReady = false
    this._articlesList = []
    this._articlesIndex = {}

    let pathToArticleList = getAbsoluteURL(pathJoin([getMainConfig().content.articleDir, 'list.json']))

    fetchJson([pathToArticleList], function(url, articleLists){
      let articleList = articleLists[0]
      if (!articleList)
        throw 'The list of articles is not available'

      articleList.map( articleId => that.addArticle(articleId))

      // unlike pages, we dont load article configs per default. This
      // will be done on demand, dependading on the route
      that._isReady = true
      that.emit('ready')
      // Load the first page of articles
      // that.loadArticlesConfigFromIndex(0, function(articles){
      //   that.emit('ready', [articles])
      // })
    })
  }


  isReady () {
    return this._isReady
  }


  addArticle (id) {
    if (!(id in this._articlesIndex)) {
      let article = new Article(id)
      this._articlesList.push(article)
      this._articlesIndex[id] = article
    }
  }


  loadArticlesConfigFromIndex (from=0, cb) {
    if (from < 0)
      throw 'The index of article must be above 0.'

    let to = Math.min(from + getMainConfig().content.articlesPerPage, this._articlesList.length)
    let shortIdList = this._articlesList.slice(from, to)
    this.loadArticlesConfigSubset(shortIdList, cb)
  }


  loadArticlesConfigSubset (articles, cb) {
    // get the articles with the config not yet loaded
    let noConfArticles = articles.filter( a => !a.isConfigLoaded())

    // if all articles already have their config loaded,
    // we directly call the event
    if (noConfArticles.length === 0 && typeof cb === 'function') {
      return cb(articles)
    }

    let articlesUrls = noConfArticles.map(article => article.getConfigURL())
    //console.log(articlesUrls)

    fetchJson(articlesUrls, function(url, configs){
      if (!configs)
        throw 'The list of articles is not available'

      for (let i=0; i<noConfArticles.length; i++) {
        noConfArticles[i].setConfig(configs[i])
      }

      if (typeof cb === 'function') {
        cb(articles)
      }
    })
  }


  getArticle (id, cb) {
    if (!(id in this._articlesIndex))
      throw 'The article ' + id + ' does not exist.'

    if (typeof cb !== 'function')
      throw 'The callback must be a function'

    let article = this._articlesIndex[id]
    article.loadContent(cb)
  }



}

export default ArticleCollection
