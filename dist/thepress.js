(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.thepress = factory());
}(this, (function () { 'use strict';

  /**
   * The EventManager deals with events, create them, call them.
   * This class is mostly for being inherited from.
   */
  class EventManager {
    /**
     * Constructor
     */
    constructor() {
      this._events = {};
    }


    /**
     * Define an event, with a name associated with a function
     * @param  {String} eventName - Name to give to the event
     * @param  {Function} callback - function associated to the even
     */
    on(eventName, callback) {
      if (typeof callback === 'function') {
        if (!(eventName in this._events)) {
          this._events[eventName] = [];
        }
        this._events[eventName].push(callback);
      } else {
        console.warn('The callback must be of type Function');
      }
    }


    emit(eventName, args = []) {
      // the event must exist and be non null
      if ((eventName in this._events) && (this._events[eventName].length > 0)) {
        const events = this._events[eventName];
        for (let i = 0; i < events.length; i += 1) {
          events[i](...args);
        }
      } else {
        console.warn(`No function associated to the event ${eventName}`);
      }
    }
  }

  /**
   * Fetch some distant json files by URL. The callback is called with é args:
   * - the list of urls (as provided)
   * - the list of js object corresponding to the json files
   * If some json file could not be fetched, their value are null
   * @param  {[type]} urls [description]
   */
  function fetchJson (urls, cb) {

    if (typeof cb !== 'function') {
      throw 'The callback provided must be a function'
    }

    // if a single url is provided, we make it an array
    if (typeof urls === 'string') {
      urls = [urls];
    }

    // separate function to make code more clear
    const grabContent = url => fetch(url)
      .then(res => res.json())
      .catch(function(error) {
        return null
      });

    Promise
    .all(urls.map(grabContent))
    .then(function(res){
      if (urls.length === 1) {
        cb(urls[0], res[0]);
      } else {
        cb(urls, res);
      }
    });
  }

  let mainConfig = null;

  function setMainConfig (data) {
    mainConfig = data;
  }

  function getMainConfig () {
    return mainConfig
  }

  class ArticleCollection {
    constructor() {
      this._mainConfig = getMainConfig();

      let pathToArticleList = this._mainConfig.content.articleDir + 'list.json';

      fetchJson(pathToArticleList, function(url, data){
        if (!data)
          throw 'The list of articles is not available'

        console.log(data);
        
      });


    }
  }

  class ThePress extends EventManager{

    constructor () {
      super();
      let that = this;
      this._articleCollection = null;


      fetchJson('./config.json', function(url, data){
        if (!data)
          throw 'The config file is not available'

        setMainConfig(data);
        that._init();
      });

    }

    _init () {
      this._articleCollection = new ArticleCollection();
    }

  }

  var index = ({ThePress});

  return index;

})));
//# sourceMappingURL=thepress.js.map
