import EventManager from './EventManager'
import { fetchJson, fetchText, pathJoin, getAbsoluteURL, markdownReplaceImageURL } from './Tools'
import { getMainConfig } from './Config'
import md2html from './md2html'

class Article extends EventManager {

  constructor (id) {
    super()
    let mainConfig = getMainConfig()
    this._folderURL = getAbsoluteURL(pathJoin([mainConfig.content.articleDir, id ]))
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
    this._link = `#${mainConfig.content.articleDir}/${this._id}`
  }

  getId () {
    return this._id
  }


  getLink () {
    return this._link
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


  setConfig (config) {
    if(config.author === undefined || config.author === null || config.author === ''){
      this._author = getMainConfig().site.author
    } else {
      this._author = config.author
    }

    this._date = config.date

    if(config.cover === '' || config.cover === null || config.cover === undefined){
      this._cover = null
    } else {
      if (config.cover.startsWith('http')) {
        this._cover = config.cover
      } else {
        this._cover = pathJoin([this._folderURL, config.cover])
      }
    }

    this._excerpt = config.excerpt
    this._title = config.title
    this._published = config.published
    this._tags = config.tags.split(',').map(t=> t.trim().toLowerCase())
    this._configLoaded = true
  }


  _setMarkdownContent (md) {
    this._markdownContent = markdownReplaceImageURL(md, this._folderURL)
    this._htmlContent = md2html(this._markdownContent)
  }


  getMetadata () {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      date: this._date,
      tags: this._tags,
      excerpt: this._excerpt,
      cover: this._cover,
      link: this._link,
    }
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


  getHtmlContent () {
    return this._htmlContent
  }

  loadContent (cb) {
    let that = this

    if (this._htmlContent && typeof cb === 'function') {
      return cb(this)
    }

    // must test if the config is loaded
    if (!this._configLoaded) {
      fetchJson( [this.getConfigURL()], function(url, configs){
        let config = configs[0]
        if (!config)
          throw 'The config for the article ' + that._id + ' is not available.'

        that.setConfig(config)
        that.loadContent(cb)
      })
    } else {

      fetchText( this._markdownURL, function(url, text) {
        if (!text)
          throw 'The article at ' + url + 'could not be loaded'

        that._setMarkdownContent(text)

        if (typeof cb === 'function') {
          return cb(that)
        }
      })
    }
  }


  hasTag(tag) {
    return !!~this._tags.indexOf(tag.toLowerCase())
  }

}


export default Article
