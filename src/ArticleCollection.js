import EventManager from './EventManager'
import { getMainConfig } from './Config'
import { fetchJson } from './Tools'
import Article from './Article'


class ArticleCollection extends EventManager {
  constructor() {
    super()
    let that = this
    this._mainConfig = getMainConfig()

    this._articlesList = []
    this._articlesIndex = {}

    let pathToArticleList = this._mainConfig.content.articleDir + 'list.json'

    fetchJson(pathToArticleList, function(url, articleList){
      if (!articleList)
        throw 'The list of articles is not available'

      articleList.map( articleId => that.addArticle(articleId))

      // Load the first page of articles
      that.loadArticlesConfigFromIndex(0, function(articles){
        that.emit('ready', [articles])
      })
    })
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

    let to = Math.min(from + this._mainConfig.content.articlesPerPage, this._articlesList.length)
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
        noConfArticles[i].setAuthor(configs[i].author)
        noConfArticles[i].setDate(configs[i].date)
        noConfArticles[i].setCover(configs[i].cover)
        noConfArticles[i].setExcerpt(configs[i].excerpt)
        noConfArticles[i].setTitle(configs[i].title)
        noConfArticles[i].setPublished(configs[i].published)
        noConfArticles[i].setTags(configs[i].tags.split(',').map(t=> t.trim()))
        noConfArticles[i].confirmConfigLoaded()
      }

      if (typeof cb === 'function') {
        cb(articles)
      }
    })
  }





}

export default ArticleCollection
