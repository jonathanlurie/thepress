import EventManager from './EventManager'
import { fetchJson } from './Tools'
import { setMainConfig } from './Config'
import ArticleCollection from './ArticleCollection'


class ThePress extends EventManager{

  constructor () {
    super()
    let that = this
    this._articleCollection = null


    fetchJson('./config.json', function(url, data){
      if (!data)
        throw 'The config file is not available'

      setMainConfig(data)
      that._init()
    })

  }

  _init () {
    this._articleCollection = new ArticleCollection()
  }

}


export default ThePress
