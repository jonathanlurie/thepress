import EventManager from './EventManager'

const REGEX = {
  ARTICLE_LISTING_FIRST_PAGE: /^articles\/?$/,
  ARTICLE_LISTING_PAGE: /^articles\/page-([0-9-]+)$/,
  SPECIFIC_ARTICLE: /articles\/([a-zA-Z0-9-]+)/,
  PAGE: /(\S+)/ // a kind of default regex
}

class RouteManager extends EventManager {

  constructor () {
    super()
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
      return
    }

    // route is #articles
    // --> we want the first page of article listing
    let match = route.match(REGEX.ARTICLE_LISTING_FIRST_PAGE)
    if(match) {
      this.emit('articleListing', [0])
      return
    }

    // route is of form #articles/page-10
    // --> we want the nth pqge of article listing
    match = route.match(REGEX.ARTICLE_LISTING_PAGE)
    if(match) {
      this.emit('articleListing', [parseInt(match[1])])
      return
    }

    // route is of form #articles/my-article
    // --> we want the article my-article
    match = route.match(REGEX.SPECIFIC_ARTICLE)
    if(match) {
      this.emit('specificArticle', [match[1]])
      return
    }

    // should come last
    // route is of form #my-page
    // --> we want the page my-page
    match = route.match(REGEX.SPECIFIC_PAGE)
    console.log(match)
    if(match) {
      this.emit('specificPage', [route])
      return
    }

  }

}

export default RouteManager
