import EventManager from './EventManager'
import { fetchJson, getURL, getAbsoluteURL } from './Tools'
import { setMainConfig } from './Config'
import ArticleCollection from './ArticleCollection'
import PageCollection from './PageCollection'
import RouteManager from './RouteManager'


class ThePress extends EventManager{

  constructor () {
    super()
    let that = this
    this._articleCollection = null
    this._pageCollection = null

    fetchJson([getAbsoluteURL('config.json')], function(url, data){
      if (!data[0])
        throw 'The config file is not available'

      setMainConfig(data[0])
      that._init()
    })

    this._routeManager = new RouteManager()
    this._defineRoutingEvent()
  }


  _init () {
    let that = this

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

  }


  _defineRoutingEvent () {
    this._routeManager.on('home', function(){
      console.log('GOTO: home')
    })

    this._routeManager.on('articleListing', function(listIndex){
      console.log('GOTO articleListing: ' + listIndex)
    })

    this._routeManager.on('specificArticle', function(articleId){
      console.log('GOTO article: ' + articleId)
    })

    this._routeManager.on('specificPage', function(pageId){
      console.log('GOTO page: ' + pageId)
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
