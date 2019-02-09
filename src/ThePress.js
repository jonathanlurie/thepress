import EventManager from './EventManager'
import { fetchJson, getURL, getAbsoluteURL } from './Tools'
import { setMainConfig } from './Config'
import ArticleCollection from './ArticleCollection'


class ThePress extends EventManager{

  constructor () {
    super()

    console.log(getAbsoluteURL('config.json'))
    console.log(getURL())
    console.log(window.location)

    let that = this
    this._articleCollection = null


    fetchJson(getAbsoluteURL('config.json'), function(url, data){
      if (!data)
        throw 'The config file is not available'

      setMainConfig(data)
      that._init()
    })

  }


  _init () {
    this._articleCollection = new ArticleCollection()

    // the first page of articles should be loaded
    this._articleCollection.on('ready', function(articles) {
      console.log(articles)

      articles[0].loadContent()

    })
  }

}


export default ThePress
