import Handlebars from 'handlebars'
import { getMainConfig } from './Config'
import { stripHtml, firstWords } from './Tools'
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
      that._updatePageMetadata(
        articleData.metadata.title,
        articleData.metadata.cover,
        articleData.metadata.author,
        articleData.metadata.excerpt
      )
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
      that._updatePageMetadata(
        pageData.metadata.title,
        pageData.metadata.cover,
        null, // pages are authorless, but this will use the site author
        firstWords(stripHtml(page.getHtmlContent())), // pages dont have excerpt, the mainConfig subtitle will be used
      )
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

        that._updatePageMetadata(
          null,
          null,
          null,
          null,
        )
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

      that._updatePageMetadata(
        tag,
        null,
        null,
        `All the articles on ${getMainConfig().site.title} about ${tag}`,
      )
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


  _updatePageMetadata(title, coverImage, author, excerpt) {
    let validTitle = ''
    if(title === undefined || title === null || title === ''){
      validTitle = getMainConfig().site.title
    } else {
      validTitle = title
    }
    document.title = validTitle
    this._setUniqueMeta("meta[property='og:title']", validTitle)
    this._setUniqueMeta("meta[name='twitter:title']", validTitle)

    let validCoverImage = ''
    if(coverImage === undefined || coverImage === null || coverImage === ''){
      validCoverImage = getMainConfig().site.cover
    } else {
      validCoverImage = coverImage
    }
    this._setUniqueMeta("meta[property='og:image']", validCoverImage)
    this._setUniqueMeta("meta[name='twitter:image']", validCoverImage)

    let validAuthor = ''
    if(author === undefined || author === null || author === ''){
      validAuthor = getMainConfig().site.author
    } else {
      validAuthor = author
    }
    this._setUniqueMeta("meta[name='author']", validAuthor)

    let validExcerpt = ''
    if(excerpt === undefined || excerpt === null || excerpt === ''){
      validExcerpt = getMainConfig().site.subtitle
    } else {
      validExcerpt = excerpt
    }
    this._setUniqueMeta("meta[name='description']", validExcerpt)
    this._setUniqueMeta("meta[property='og:description']", validExcerpt)
    this._setUniqueMeta("meta[name='twitter:description']", validExcerpt)
  }

  _setUniqueMeta(qs, content) {
    try {
      document.querySelector(qs).setAttribute('content', content)
    } catch(e){
      console.warn(`Cannot update the querySelector "${qs}" with the value "${content}". Probably this markup does not exist.\n(original error message: ${e.message})`)
    }
  }


}

export default Builder
