import EventManager from './EventManager'
import { fetchText, pathJoin, getAbsoluteURL, markdownReplaceImageURL } from './Tools'
import { getMainConfig } from './Config'
import md2html from './md2html'

class Page extends EventManager {

  constructor (id) {
    super()

    this._folderURL = getAbsoluteURL(pathJoin([getMainConfig().content.pageDir, id ]))
    this._markdownURL = pathJoin([this._folderURL, "index.md"])
    this._configURL = pathJoin([this._folderURL, "config.json"])

    this._id = id
    this._configLoaded = false
    this._title = null
    this._cover = null
    this._showInMenu = false
    this._markdownContent = null
    this._htmlContent = null
  }


  isConfigLoaded () {
    return this._configLoaded
  }


  setConfig (config) {
    if (config.cover.startsWith('http')) {
      this._cover = config.cover
    } else {
      this._cover = pathJoin([this._folderURL, config.cover])
    }

    this._title = config.title
    this._showInMenu = config.showInMenu
    this._configLoaded = true
  }


  getMarkdownURL () {
    return this._markdownURL
  }


  getConfigURL () {
    return this._configURL
  }


  _setMarkdownContent (md) {
    this._markdownContent = markdownReplaceImageURL(md, this._folderURL)
    this._htmlContent = md2html(this._markdownContent)
  }


  isLoaded () {
    return !!this._htmlContent
  }


  getTitle () {
    return this._title
  }


  getCover () {
    return this._cover
  }


  getShowInMenu () {
    return this._showInMenu
  }


  getMarkdownContent () {
    return this._markdownContent
  }


  loadContent (cb) {
    let that = this

    if (this._htmlContent && typeof cb === 'function') {
      return cb(this)
    }

    fetchText( this._markdownURL, function(url, text) {
      if (!text)
        throw 'The page at ' + url + 'could not be loaded'

      that._setMarkdownContent(text)

      if (typeof cb === 'function') {
        return cb(that)
      }
    })
  }

}


export default Page
