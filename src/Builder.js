import Handlebars from 'handlebars'
import { getMainConfig } from './Config'
const TEMPLATE_ID = 'thepress-template'

// to allow string comparison
Handlebars.registerHelper('sameString', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

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
