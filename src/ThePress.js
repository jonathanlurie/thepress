import EventManager from './EventManager'
import { fetchJson, getURL, getAbsoluteURL } from './Tools'
import { setMainConfig } from './Config'
import ArticleCollection from './ArticleCollection'
import RouteManager from './RouteManager'


class ThePress extends EventManager{

  constructor () {
    super()
    let that = this
    this._articleCollection = null

    fetchJson(getAbsoluteURL('config.json'), function(url, data){
      if (!data)
        throw 'The config file is not available'

      setMainConfig(data)
      that._init()
    })

    this._routeManager = new RouteManager()
    this._defineRoutingEvent()
  }


  _init () {
    let that = this
    this._articleCollection = new ArticleCollection()

    // the first page of articles should be loaded
    this._articleCollection.on('ready', function(articles) {

      //articles[1].loadContent()

      // the routing must be the firt thing to go when listing is read`
      that._routeManager.init()

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

}


export default ThePress
