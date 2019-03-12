import Handlebars from 'handlebars'
import { getMainConfig } from './Config'
const TEMPLATE_ID = 'thepress-template'

// to allow string comparison
Handlebars.registerHelper('sameString', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
})



/*
  add string comparison in template language:
  https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value

 */


/**
 * The builder is in charge of generating the graphical elements and inject
 * them into the DOM
 */
class Builder {

  constructor() {
    this._articleCollection = null
    this._pageCollection = null
    this._template = Handlebars.compile(document.getElementById(TEMPLATE_ID).innerHTML)
  }

  setArticleCollection (ac) {
    this._articleCollection = ac
  }

  setPageCollection (pc) {
    this._pageCollection = pc
  }

  /**
   * Remove all the non-<script> elements from document.body
   */
  flushNonScript() {
    let bodyChildren = document.body.children
    for (let i=0; i<bodyChildren.length; i++){
      let el = bodyChildren[i]
      if (el.tagName !== 'SCRIPT') {
        document.body.removeChild(el)
      }
    }
  }


  /**
   * Remove all the content of document.body
   */
  flushBody() {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
  }


  buildArticle(id) {
    let that = this
    this._articleCollection.getArticle(id, function(article){
      let articleData = {
        metadata: article.getMetadata(),
        body: article.getHtmlContent()
      }
      that._buildGenericPage(articleData, 'article')
    })
  }


  buildPage(id) {
    let that = this
    this._pageCollection.getPage(id, function(page){
      let pageData = {
        metadata: page.getMetadata(),
        body: page.getHtmlContent()
      }
      that._buildGenericPage(pageData, 'page')
    })
  }


  buildArticleListChronological(pageIndex) {
    let that = this
    this._articleCollection.loadArticlesConfigFromIndex(
      pageIndex * getMainConfig().content.articlesPerPage,
      function(articles) {

        let listData = {
          curentIndex: pageIndex,
          prevIndex: pageIndex - 1,
          nextIndex: pageIndex + 1,
          prev: pageIndex === 0 ? null : `#articles/page-${pageIndex - 1}`,
          next: ((pageIndex + 1) * getMainConfig().content.articlesPerPage) >= that._articleCollection.getNumberOfArticles() ? null : `#articles/page-${pageIndex + 1}`,
          articlesMeta: articles.map(a => a.getMetadata())
        }
        that._buildGenericPage(listData, 'list')
      }
    )
  }


  buildArticleListPerTag(tag) {
    let that = this
    this._articleCollection.loadAllArticlesConfig(function(articles){
      let listData = {
        tag: tag,
        articlesMeta: articles.filter(a => a.hasTag(tag)).map(a => a.getMetadata())
      }
      that._buildGenericPage(listData, 'tagList')
    })
  }


  _buildGenericPage(contentData, type) {
    let allData = {
      site: getMainConfig().site,
      content: contentData,
      menu: this._pageCollection.getMenuMetadata(),
    }

    allData[type] = true

    console.log(allData)

    let htmlCorpus = this._template(allData)
    this.flushBody()
    // this.flushNonScript()
    document.body.innerHTML += htmlCorpus
  }


}

export default Builder
