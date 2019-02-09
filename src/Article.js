import EventManager from './EventManager'
import { fetchText, pathJoin, getAbsoluteURL } from './Tools'
import { getMainConfig } from './Config'

class Article extends EventManager {

  constructor (id) {
    super()
    this._mainConfig = getMainConfig()
    this._folderURL = getAbsoluteURL(pathJoin([this._mainConfig.content.articleDir, id ]))
    this._markdownURL = pathJoin([this._folderURL, "index.md"])
    this._configURL = pathJoin([this._folderURL, "config.json"])

    this._id = id
    this._configLoaded = false
    this._title = null
    this._author = null
    this._date = null
    this._tags = []
    this._excerpt = null
    this._cover = null
    this._published = false
    this._markdownContent = null
    this._htmlContent = null
  }

  confirmConfigLoaded () {
    this._configLoaded = true
  }

  isConfigLoaded () {
    return this._configLoaded
  }


  getMarkdownURL () {
    return this._markdownURL
  }


  getConfigURL () {
    return this._configURL
  }

  setTitle (t) {
    this._title = t
  }

  setAuthor (a) {
    this._author = a
  }


  setDate (d) {
    this._date = d
  }


  setTags (tags) {
    this._tags = tags
  }


  setExcerpt (e) {
    this._excerpt = e
  }


  // TODO resolve for relative path
  setCover (c) {
    if (c.startsWith('http')) {
      this._cover = c
    } else {
      this._cover = pathJoin([this._folderURL, c])
    }

    console.log(this._cover);

  }


  setPublished (p) {
    this._published = p
  }


  setMarkdownContent (md) {
    this._markdownContent = md
  }

  getTitle () {
    return this._title
  }

  getAuthor () {
    return this._author
  }


  getDate () {
    return this._date
  }


  getTags () {
    return this._tags
  }


  getExcerpt () {
    return this._excerpt
  }


  getCover () {
    return this._cover
  }


  getPublished () {
    return this._published
  }


  getMarkdownContent () {
    return this._markdownContent
  }


  _convertMardownToHTML () {
    // TODO
  }


  loadContent (cb) {
    console.log(this)

    if (this._htmlContent && typeof cb === 'function') {
      return cb(this)
    }

    fetchText( this._markdownURL, function(url, data) {
      if (!data)
        throw 'The article at ' + url + 'could not be loaded'

      console.log(data)

      // TODO convert md to html

      if (typeof cb === 'function') {
        return cb(this)
      }
    })
  }

}


export default Article
