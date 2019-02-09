import EventManager from './EventManager'

const REGEX = {
  ARTICLE_LISTING_PAGE: /articles\/page-([0-9-]+)/,
  SPECIFIC_ARTICLE: /articles\/([a-zA-Z0-9-]+)/, // TODO what to do if only #articles is written? listing page1 ?
  PAGE: /([a-zA-Z0-9-]+)/
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
    let route = location.hash
    if (route.startsWith('#')) {
      route = route.substring(1)
    }

    if (route === '') {
      this.emit('home')
    }

  }

}

export default RouteManager
