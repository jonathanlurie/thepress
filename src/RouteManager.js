import EventManager from './EventManager'
import { getMainConfig } from './Config'


class RouteManager extends EventManager {

  constructor () {
    super()

    const mainConfig = getMainConfig()
    this._REGEX = {
      ARTICLE_LISTING_FIRST_PAGE: /^articles\/?$/,
      ARTICLE_LISTING_PAGE: new RegExp(`${mainConfig.content.articleDir}\/page-([0-9-]+)$`),
      //SPECIFIC_ARTICLE: /articles\/([a-zA-Z0-9-]+)/,
      SPECIFIC_ARTICLE: new RegExp(`${mainConfig.content.articleDir}\/([a-zA-Z0-9-]+)`),
      PAGE: /(\S+)/ // a kind of default regex
    }
  }


  init () {
    let that = this
    window.addEventListener("hashchange", function(e){
      that._decideRoute()
    }, false)

    // force call because loading a page that already has a hash does not
    // fire the hashchange event
    this._decideRoute()
  }

  _decideRoute () {
    let route = location.hash.trim()
    if (route.startsWith('#')) {
      route = route.substring(1)
    }

    // no hash route given, or nothing after the hash
    // --> We want to go home
    if (route === '') {
      this.emit('home')
      window.scrollTo(0, 0)
      return
    }

    // route is #articles
    // --> we want the first page of article listing
    let match = route.match(this._REGEX.ARTICLE_LISTING_FIRST_PAGE)
    if(match) {
      this.emit('articleListing', [0])
      window.scrollTo(0, 0)
      return
    }

    // route is of form #articles/page-10
    // --> we want the nth pqge of article listing
    match = route.match(this._REGEX.ARTICLE_LISTING_PAGE)
    if(match) {
      this.emit('articleListing', [parseInt(match[1])])
      window.scrollTo(0, 0)
      return
    }

    // route is of form #articles/my-article
    // --> we want the article my-article
    match = route.match(this._REGEX.SPECIFIC_ARTICLE)
    if(match) {
      this.emit('specificArticle', [match[1]])
      window.scrollTo(0, 0)
      return
    }

    // should come last
    // route is of form #my-page
    // --> we want the page my-page
    match = route.match(this._REGEX.SPECIFIC_PAGE)
    if(match) {
      this.emit('specificPage', [route])
      window.scrollTo(0, 0)
      return
    }

  }


  /**
   * Go to the given hash
   * @param  {string} path - path (without # symbole)
   */
  goTo(path) {
    location.hash = `${path}`
  }

}

export default RouteManager
