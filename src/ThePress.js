import EventManager from './EventManager'
import { fetchJson, getURL, getAbsoluteURL } from './Tools'
import { setMainConfig, getMainConfig } from './Config'
import ArticleCollection from './ArticleCollection'
import PageCollection from './PageCollection'
import RouteManager from './RouteManager'
import Builder from './Builder'


class ThePress extends EventManager{

  constructor () {
    super()
    let that = this
    this._articleCollection = null
    this._pageCollection = null
    this._builder = new Builder()

    fetchJson([getAbsoluteURL('config.json')], function(url, data){
      if (!data[0])
        throw 'The config file is not available'

      setMainConfig(data[0])
      that._init()
    })


  }


  _init () {
    let that = this
    this._routeManager = new RouteManager()
    this._defineRoutingEvent()

    this._articleCollection = new ArticleCollection()
    console.log(this._articleCollection)
    // the first page of articles should be loaded
    this._articleCollection.on('ready', function(articles) {
      that._checkIsReady()
    })

    this._pageCollection = new PageCollection()
    console.log(this._pageCollection)
    this._pageCollection.on('ready', function(pages) {
      that._checkIsReady()
    })

    this._builder.setArticleCollection(this._articleCollection)
    this._builder.setPageCollection(this._pageCollection)
  }


  _defineRoutingEvent () {
    let that = this

    this._routeManager.on('home', function(){
      console.log('GOTO: home')
      that._builder.buildArticleListChronological(0)
    })

    this._routeManager.on('articleListing', function(pageIndex){
      console.log('GOTO articleListing: ' + pageIndex)
      that._builder.buildArticleListChronological(pageIndex)
    })

    this._routeManager.on('specificArticle', function(articleId){
      console.log('GOTO article: ' + articleId)
      that._builder.buildArticle(articleId)
    })

    this._routeManager.on('specificPage', function(pageId){
      console.log('GOTO page: ' + pageId)
      that._builder.buildPage(pageId)
    })
  }


  _checkIsReady () {
    let isReady = this._pageCollection.isReady() && this._articleCollection.isReady()

    if (!isReady)
      return

    this._routeManager.init()
  }

}


export default ThePress
