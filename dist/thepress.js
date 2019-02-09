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



  function fetchText(urls, cb) {

    if (typeof cb !== 'function') {
      throw 'The callback provided must be a function'
    }

    // if a single url is provided, we make it an array
    if (typeof urls === 'string') {
      urls = [urls];
    }

    // separate function to make code more clear
    const grabContent = url => fetch(url)
      .then(res => res.text())
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


  function pathJoin(parts, separator = '/'){
     let replace   = new RegExp(separator+'{1,}', 'g');
     return parts.join(separator).replace(replace, separator);
  }

  let mainConfig = null;

  function setMainConfig (data) {
    mainConfig = data;
  }

  function getMainConfig () {
    return mainConfig
  }

  class Article extends EventManager {

    constructor (id) {
      super();
      this._mainConfig = getMainConfig();
      this._folderURL = pathJoin([this._mainConfig.content.articleDir, id ]);
      this._markdownURL = pathJoin([this._folderURL, "index.md"]);
      this._configURL = pathJoin([this._folderURL, "config.json"]);

      this._id = id;
      this._configLoaded = false;
      this._title = null;
      this._author = null;
      this._date = null;
      this._tags = [];
      this._excerpt = null;
      this._cover = null;
      this._published = false;
      this._markdownContent = null;
      this._htmlContent = null;
    }

    confirmConfigLoaded () {
      this._configLoaded = true;
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
      this._title = t;
    }

    setAuthor (a) {
      this._author = a;
    }


    setDate (d) {
      this._date = d;
    }


    setTags (tags) {
      this._tags = tags;
    }


    setExcerpt (e) {
      this._excerpt = e;
    }


    // TODO resolve for relative path
    setCover (c) {
      if (c.startsWith('http')) {
        this._cover = c;
      } else {
        this._cover = pathJoin([this._folderURL, c]);
      }

      console.log(this._cover);

    }


    setPublished (p) {
      this._published = p;
    }


    setMarkdownContent (md) {
      this._markdownContent = md;
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
      console.log(this);

      if (this._htmlContent && typeof cb === 'function') {
        return cb(this)
      }

      fetchText( this._markdownURL, function(url, data) {
        if (!data)
          throw 'The article at ' + url + 'could not be loaded'

        console.log(data);

        // TODO convert md to html

        if (typeof cb === 'function') {
          return cb(this)
        }
      });
    }

  }

  class ArticleCollection extends EventManager {
    constructor() {
      super();
      let that = this;
      this._mainConfig = getMainConfig();

      this._articlesList = [];
      this._articlesIndex = {};

      let pathToArticleList = pathJoin([this._mainConfig.content.articleDir, 'list.json']);

      fetchJson(pathToArticleList, function(url, articleList){
        if (!articleList)
          throw 'The list of articles is not available'

        articleList.map( articleId => that.addArticle(articleId));

        // Load the first page of articles
        that.loadArticlesConfigFromIndex(0, function(articles){
          that.emit('ready', [articles]);
        });
      });
    }


    addArticle (id) {
      if (!(id in this._articlesIndex)) {
        let article = new Article(id);
        this._articlesList.push(article);
        this._articlesIndex[id] = article;
      }
    }


    loadArticlesConfigFromIndex (from=0, cb) {
      if (from < 0)
        throw 'The index of article must be above 0.'

      let to = Math.min(from + this._mainConfig.content.articlesPerPage, this._articlesList.length);
      let shortIdList = this._articlesList.slice(from, to);
      this.loadArticlesConfigSubset(shortIdList, cb);
    }


    loadArticlesConfigSubset (articles, cb) {
      // get the articles with the config not yet loaded
      let noConfArticles = articles.filter( a => !a.isConfigLoaded());

      // if all articles already have their config loaded,
      // we directly call the event
      if (noConfArticles.length === 0 && typeof cb === 'function') {
        return cb(articles)
      }

      let articlesUrls = noConfArticles.map(article => article.getConfigURL());
      //console.log(articlesUrls)

      fetchJson(articlesUrls, function(url, configs){
        if (!configs)
          throw 'The list of articles is not available'

        for (let i=0; i<noConfArticles.length; i++) {
          noConfArticles[i].setAuthor(configs[i].author);
          noConfArticles[i].setDate(configs[i].date);
          noConfArticles[i].setCover(configs[i].cover);
          noConfArticles[i].setExcerpt(configs[i].excerpt);
          noConfArticles[i].setTitle(configs[i].title);
          noConfArticles[i].setPublished(configs[i].published);
          noConfArticles[i].setTags(configs[i].tags.split(',').map(t=> t.trim()));
          noConfArticles[i].confirmConfigLoaded();
        }

        if (typeof cb === 'function') {
          cb(articles);
        }
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

      // the first page of articles should be loaded
      this._articleCollection.on('ready', function(articles) {
        console.log(articles);

        articles[0].loadContent();

      });
    }

  }

  var index = ({ThePress});

  return index;

})));
//# sourceMappingURL=thepress.js.map
