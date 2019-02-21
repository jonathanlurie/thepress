import EventManager from './EventManager'
import { getMainConfig } from './Config'
import { fetchJson, pathJoin, getAbsoluteURL } from './Tools'
import Page from './Page'


class PageCollection extends EventManager {
  constructor() {
    super()
    let that = this
    this._isReady = false
    this._pageList = []
    this._pagesIndex = {}

    let pathToPageList = getAbsoluteURL(pathJoin([getMainConfig().content.pageDir, 'list.json']))

    fetchJson([pathToPageList], function(url, pageLists){
      let pageList = pageLists[0]
      if (!pageList)
        throw 'The list of pages is not available'

      pageList.map( pageId => that.addPage(pageId))

      // Load all the pages' config because we need that for the menu
      that.loadPagesConfig(function(pages){
        that._isReady = true
        that.emit('ready', [pages])
      })
    })
  }


  isReady () {
    return this._isReady
  }


  addPage (id) {
    if (!(id in this._pagesIndex)) {
      let page = new Page(id)
      this._pageList.push(page)
      this._pagesIndex[id] = page
    }
  }


  loadPagesConfig (cb) {
    let pages = this._pageList
    let pagesUrls = pages.map(page => getAbsoluteURL(page.getConfigURL()))

    fetchJson(pagesUrls, function(url, configs){
      if (!configs)
        throw 'The list of pages is not available'

      for (let i=0; i<pages.length; i++) {
        pages[i].setConfig(configs[i])
      }

      if (typeof cb === 'function') {
        cb(pages)
      }
    })
  }


  getPage (id, cb) {
    if (!(id in this._pagesIndex))
      throw 'The page ' + id + ' does not exist.'

    if (typeof cb !== 'function')
      throw 'The callback must be a function'

    let page = this._pagesIndex[id]

    if (page.isLoaded()) {
      return cb(page)
    } else {
      page.loadContent(cb)
    }
  }


  getMenuMetadata () {
    let allMenuPages = this._pageList.filter(p => p.getShowInMenu())
                                      .map(function(p) {
                                        return {
                                          id: p.getId(),
                                          title: p.getTitle(),
                                          link: p.getLink(),
                                        }
                                      })
    return allMenuPages
  }


}

export default PageCollection
