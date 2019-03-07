(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
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

    // separate function to make code more clear
    const grabContent = url => fetch(url)
      .then(res => res.json())
      .catch(function(error) {
        return null
      });

    Promise
    .all(urls.map(grabContent))
    .then(function(res){
      cb(urls, res);
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


  function pathJoin (parts, separator = '/') {
    let cleanParts = [];

    for (let i=0; i<parts.length; i++) {
      let part = parts[i];
      if (i > 0) {
        if (part[0] === separator) {
          part = part.substring(1);
        }
      }

      if (part[part.length - 1] === separator) {
        part = part.substring(0, part.length - 1);
      }

      cleanParts.push(part);
    }

    return cleanParts.join(separator)
  }


  /**
   * Get the URL without the #hash
   * @return {String} the curent URL
   */
  function getURL () {
    return location.protocol+'//'+location.host+location.pathname
  }


  function getAbsoluteURL (path) {
    if (path.startsWith('http')) {
      return path
    } else {
      return pathJoin([getURL(), path])
    }
  }


  /**
   * Change the relative path to prepend some prefix. Image URL starting with http
   * are not modified
   */
  function markdownReplaceImageURL (md, prefix) {
    let mdMod = md.replace(/\!\[[a-zA-Z0-9 ]*\]\(\s*(\S*)\s*\)/gm, function(correspondance, p1){
      if (p1.startsWith('http')) {
        return correspondance
      } else {
        return correspondance.replace(p1, pathJoin([prefix, p1]))
      }
    });
    return mdMod
  }

  let mainConfig = null;

  function setMainConfig (data) {
    mainConfig = data;

    if('logo' in mainConfig.site) {
      mainConfig.site.logo = getAbsoluteURL(mainConfig.site.logo);
    }

    if('cover' in mainConfig.site) {
      mainConfig.site.cover = getAbsoluteURL(mainConfig.site.cover);
    }

    console.log(mainConfig);
  }

  function getMainConfig () {
    return mainConfig
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var markdownIt = createCommonjsModule(function (module, exports) {
  /*! markdown-it 8.4.2 https://github.com//markdown-it/markdown-it @license MIT */(function(f){{module.exports=f();}})(function(){return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){

  /*eslint quotes:0*/
  module.exports = require('entities/maps/entities.json');

  },{"entities/maps/entities.json":52}],2:[function(require,module,exports){


  module.exports = [
    'address',
    'article',
    'aside',
    'base',
    'basefont',
    'blockquote',
    'body',
    'caption',
    'center',
    'col',
    'colgroup',
    'dd',
    'details',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'html',
    'iframe',
    'legend',
    'li',
    'link',
    'main',
    'menu',
    'menuitem',
    'meta',
    'nav',
    'noframes',
    'ol',
    'optgroup',
    'option',
    'p',
    'param',
    'section',
    'source',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'title',
    'tr',
    'track',
    'ul'
  ];

  },{}],3:[function(require,module,exports){

  var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

  var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
  var single_quoted = "'[^']*'";
  var double_quoted = '"[^"]*"';

  var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

  var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

  var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

  var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
  var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
  var processing  = '<[?].*?[?]>';
  var declaration = '<![A-Z]+\\s+[^>]*>';
  var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

  var HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                          '|' + processing + '|' + declaration + '|' + cdata + ')');
  var HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

  module.exports.HTML_TAG_RE = HTML_TAG_RE;
  module.exports.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE;

  },{}],4:[function(require,module,exports){


  function _class(obj) { return Object.prototype.toString.call(obj); }

  function isString(obj) { return _class(obj) === '[object String]'; }

  var _hasOwnProperty = Object.prototype.hasOwnProperty;

  function has(object, key) {
    return _hasOwnProperty.call(object, key);
  }

  // Merge objects
  //
  function assign(obj /*from1, from2, from3, ...*/) {
    var sources = Array.prototype.slice.call(arguments, 1);

    sources.forEach(function (source) {
      if (!source) { return; }

      if (typeof source !== 'object') {
        throw new TypeError(source + 'must be object');
      }

      Object.keys(source).forEach(function (key) {
        obj[key] = source[key];
      });
    });

    return obj;
  }

  // Remove element from array and put another array at those position.
  // Useful for some operations with tokens
  function arrayReplaceAt(src, pos, newElements) {
    return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
  }

  ////////////////////////////////////////////////////////////////////////////////

  function isValidEntityCode(c) {
    /*eslint no-bitwise:0*/
    // broken sequence
    if (c >= 0xD800 && c <= 0xDFFF) { return false; }
    // never used
    if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
    if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
    // control codes
    if (c >= 0x00 && c <= 0x08) { return false; }
    if (c === 0x0B) { return false; }
    if (c >= 0x0E && c <= 0x1F) { return false; }
    if (c >= 0x7F && c <= 0x9F) { return false; }
    // out of range
    if (c > 0x10FFFF) { return false; }
    return true;
  }

  function fromCodePoint(c) {
    /*eslint no-bitwise:0*/
    if (c > 0xffff) {
      c -= 0x10000;
      var surrogate1 = 0xd800 + (c >> 10),
          surrogate2 = 0xdc00 + (c & 0x3ff);

      return String.fromCharCode(surrogate1, surrogate2);
    }
    return String.fromCharCode(c);
  }


  var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
  var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
  var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

  var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;

  var entities = require('./entities');

  function replaceEntityPattern(match, name) {
    var code = 0;

    if (has(entities, name)) {
      return entities[name];
    }

    if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
      code = name[1].toLowerCase() === 'x' ?
        parseInt(name.slice(2), 16)
      :
        parseInt(name.slice(1), 10);
      if (isValidEntityCode(code)) {
        return fromCodePoint(code);
      }
    }

    return match;
  }

  /*function replaceEntities(str) {
    if (str.indexOf('&') < 0) { return str; }

    return str.replace(ENTITY_RE, replaceEntityPattern);
  }*/

  function unescapeMd(str) {
    if (str.indexOf('\\') < 0) { return str; }
    return str.replace(UNESCAPE_MD_RE, '$1');
  }

  function unescapeAll(str) {
    if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

    return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
      if (escaped) { return escaped; }
      return replaceEntityPattern(match, entity);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  var HTML_ESCAPE_TEST_RE = /[&<>"]/;
  var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
  var HTML_REPLACEMENTS = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };

  function replaceUnsafeChar(ch) {
    return HTML_REPLACEMENTS[ch];
  }

  function escapeHtml(str) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
      return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    }
    return str;
  }

  ////////////////////////////////////////////////////////////////////////////////

  var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

  function escapeRE(str) {
    return str.replace(REGEXP_ESCAPE_RE, '\\$&');
  }

  ////////////////////////////////////////////////////////////////////////////////

  function isSpace(code) {
    switch (code) {
      case 0x09:
      case 0x20:
        return true;
    }
    return false;
  }

  // Zs (unicode class) || [\t\f\v\r\n]
  function isWhiteSpace(code) {
    if (code >= 0x2000 && code <= 0x200A) { return true; }
    switch (code) {
      case 0x09: // \t
      case 0x0A: // \n
      case 0x0B: // \v
      case 0x0C: // \f
      case 0x0D: // \r
      case 0x20:
      case 0xA0:
      case 0x1680:
      case 0x202F:
      case 0x205F:
      case 0x3000:
        return true;
    }
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////////

  /*eslint-disable max-len*/
  var UNICODE_PUNCT_RE = require('uc.micro/categories/P/regex');

  // Currently without astral characters support.
  function isPunctChar(ch) {
    return UNICODE_PUNCT_RE.test(ch);
  }


  // Markdown ASCII punctuation characters.
  //
  // !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
  // http://spec.commonmark.org/0.15/#ascii-punctuation-character
  //
  // Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
  //
  function isMdAsciiPunct(ch) {
    switch (ch) {
      case 0x21/* ! */:
      case 0x22/* " */:
      case 0x23/* # */:
      case 0x24/* $ */:
      case 0x25/* % */:
      case 0x26/* & */:
      case 0x27/* ' */:
      case 0x28/* ( */:
      case 0x29/* ) */:
      case 0x2A/* * */:
      case 0x2B/* + */:
      case 0x2C/* , */:
      case 0x2D/* - */:
      case 0x2E/* . */:
      case 0x2F/* / */:
      case 0x3A/* : */:
      case 0x3B/* ; */:
      case 0x3C/* < */:
      case 0x3D/* = */:
      case 0x3E/* > */:
      case 0x3F/* ? */:
      case 0x40/* @ */:
      case 0x5B/* [ */:
      case 0x5C/* \ */:
      case 0x5D/* ] */:
      case 0x5E/* ^ */:
      case 0x5F/* _ */:
      case 0x60/* ` */:
      case 0x7B/* { */:
      case 0x7C/* | */:
      case 0x7D/* } */:
      case 0x7E/* ~ */:
        return true;
      default:
        return false;
    }
  }

  // Hepler to unify [reference labels].
  //
  function normalizeReference(str) {
    // use .toUpperCase() instead of .toLowerCase()
    // here to avoid a conflict with Object.prototype
    // members (most notably, `__proto__`)
    return str.trim().replace(/\s+/g, ' ').toUpperCase();
  }

  ////////////////////////////////////////////////////////////////////////////////

  // Re-export libraries commonly used in both markdown-it and its plugins,
  // so plugins won't have to depend on them explicitly, which reduces their
  // bundled size (e.g. a browser build).
  //
  exports.lib                 = {};
  exports.lib.mdurl           = require('mdurl');
  exports.lib.ucmicro         = require('uc.micro');

  exports.assign              = assign;
  exports.isString            = isString;
  exports.has                 = has;
  exports.unescapeMd          = unescapeMd;
  exports.unescapeAll         = unescapeAll;
  exports.isValidEntityCode   = isValidEntityCode;
  exports.fromCodePoint       = fromCodePoint;
  // exports.replaceEntities     = replaceEntities;
  exports.escapeHtml          = escapeHtml;
  exports.arrayReplaceAt      = arrayReplaceAt;
  exports.isSpace             = isSpace;
  exports.isWhiteSpace        = isWhiteSpace;
  exports.isMdAsciiPunct      = isMdAsciiPunct;
  exports.isPunctChar         = isPunctChar;
  exports.escapeRE            = escapeRE;
  exports.normalizeReference  = normalizeReference;

  },{"./entities":1,"mdurl":58,"uc.micro":65,"uc.micro/categories/P/regex":63}],5:[function(require,module,exports){


  exports.parseLinkLabel       = require('./parse_link_label');
  exports.parseLinkDestination = require('./parse_link_destination');
  exports.parseLinkTitle       = require('./parse_link_title');

  },{"./parse_link_destination":6,"./parse_link_label":7,"./parse_link_title":8}],6:[function(require,module,exports){


  var isSpace     = require('../common/utils').isSpace;
  var unescapeAll = require('../common/utils').unescapeAll;


  module.exports = function parseLinkDestination(str, pos, max) {
    var code, level,
        lines = 0,
        start = pos,
        result = {
          ok: false,
          pos: 0,
          lines: 0,
          str: ''
        };

    if (str.charCodeAt(pos) === 0x3C /* < */) {
      pos++;
      while (pos < max) {
        code = str.charCodeAt(pos);
        if (code === 0x0A /* \n */ || isSpace(code)) { return result; }
        if (code === 0x3E /* > */) {
          result.pos = pos + 1;
          result.str = unescapeAll(str.slice(start + 1, pos));
          result.ok = true;
          return result;
        }
        if (code === 0x5C /* \ */ && pos + 1 < max) {
          pos += 2;
          continue;
        }

        pos++;
      }

      // no closing '>'
      return result;
    }

    // this should be ... } else { ... branch

    level = 0;
    while (pos < max) {
      code = str.charCodeAt(pos);

      if (code === 0x20) { break; }

      // ascii control characters
      if (code < 0x20 || code === 0x7F) { break; }

      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      if (code === 0x28 /* ( */) {
        level++;
      }

      if (code === 0x29 /* ) */) {
        if (level === 0) { break; }
        level--;
      }

      pos++;
    }

    if (start === pos) { return result; }
    if (level !== 0) { return result; }

    result.str = unescapeAll(str.slice(start, pos));
    result.lines = lines;
    result.pos = pos;
    result.ok = true;
    return result;
  };

  },{"../common/utils":4}],7:[function(require,module,exports){

  module.exports = function parseLinkLabel(state, start, disableNested) {
    var level, found, marker, prevPos,
        labelEnd = -1,
        max = state.posMax,
        oldPos = state.pos;

    state.pos = start + 1;
    level = 1;

    while (state.pos < max) {
      marker = state.src.charCodeAt(state.pos);
      if (marker === 0x5D /* ] */) {
        level--;
        if (level === 0) {
          found = true;
          break;
        }
      }

      prevPos = state.pos;
      state.md.inline.skipToken(state);
      if (marker === 0x5B /* [ */) {
        if (prevPos === state.pos - 1) {
          // increase level if we find text `[`, which is not a part of any token
          level++;
        } else if (disableNested) {
          state.pos = oldPos;
          return -1;
        }
      }
    }

    if (found) {
      labelEnd = state.pos;
    }

    // restore old state
    state.pos = oldPos;

    return labelEnd;
  };

  },{}],8:[function(require,module,exports){


  var unescapeAll = require('../common/utils').unescapeAll;


  module.exports = function parseLinkTitle(str, pos, max) {
    var code,
        marker,
        lines = 0,
        start = pos,
        result = {
          ok: false,
          pos: 0,
          lines: 0,
          str: ''
        };

    if (pos >= max) { return result; }

    marker = str.charCodeAt(pos);

    if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

    pos++;

    // if opening marker is "(", switch it to closing marker ")"
    if (marker === 0x28) { marker = 0x29; }

    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === marker) {
        result.pos = pos + 1;
        result.lines = lines;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      } else if (code === 0x0A) {
        lines++;
      } else if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos++;
        if (str.charCodeAt(pos) === 0x0A) {
          lines++;
        }
      }

      pos++;
    }

    return result;
  };

  },{"../common/utils":4}],9:[function(require,module,exports){


  var utils        = require('./common/utils');
  var helpers      = require('./helpers');
  var Renderer     = require('./renderer');
  var ParserCore   = require('./parser_core');
  var ParserBlock  = require('./parser_block');
  var ParserInline = require('./parser_inline');
  var LinkifyIt    = require('linkify-it');
  var mdurl        = require('mdurl');
  var punycode     = require('punycode');


  var config = {
    'default': require('./presets/default'),
    zero: require('./presets/zero'),
    commonmark: require('./presets/commonmark')
  };

  ////////////////////////////////////////////////////////////////////////////////
  //
  // This validator can prohibit more than really needed to prevent XSS. It's a
  // tradeoff to keep code simple and to be secure by default.
  //
  // If you need different setup - override validator method as you wish. Or
  // replace it with dummy function and use external sanitizer.
  //

  var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
  var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

  function validateLink(url) {
    // url should be normalized at this point, and existing entities are decoded
    var str = url.trim().toLowerCase();

    return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
  }

  ////////////////////////////////////////////////////////////////////////////////


  var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

  function normalizeLink(url) {
    var parsed = mdurl.parse(url, true);

    if (parsed.hostname) {
      // Encode hostnames in urls like:
      // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
      //
      // We don't encode unknown schemas, because it's likely that we encode
      // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
      //
      if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
        try {
          parsed.hostname = punycode.toASCII(parsed.hostname);
        } catch (er) { /**/ }
      }
    }

    return mdurl.encode(mdurl.format(parsed));
  }

  function normalizeLinkText(url) {
    var parsed = mdurl.parse(url, true);

    if (parsed.hostname) {
      // Encode hostnames in urls like:
      // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
      //
      // We don't encode unknown schemas, because it's likely that we encode
      // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
      //
      if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
        try {
          parsed.hostname = punycode.toUnicode(parsed.hostname);
        } catch (er) { /**/ }
      }
    }

    return mdurl.decode(mdurl.format(parsed));
  }


  /**
   * class MarkdownIt
   *
   * Main parser/renderer class.
   *
   * ##### Usage
   *
   * ```javascript
   * // node.js, "classic" way:
   * var MarkdownIt = require('markdown-it'),
   *     md = new MarkdownIt();
   * var result = md.render('# markdown-it rulezz!');
   *
   * // node.js, the same, but with sugar:
   * var md = require('markdown-it')();
   * var result = md.render('# markdown-it rulezz!');
   *
   * // browser without AMD, added to "window" on script load
   * // Note, there are no dash.
   * var md = window.markdownit();
   * var result = md.render('# markdown-it rulezz!');
   * ```
   *
   * Single line rendering, without paragraph wrap:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * var result = md.renderInline('__markdown-it__ rulezz!');
   * ```
   **/

  /**
   * new MarkdownIt([presetName, options])
   * - presetName (String): optional, `commonmark` / `zero`
   * - options (Object)
   *
   * Creates parser instanse with given config. Can be called without `new`.
   *
   * ##### presetName
   *
   * MarkdownIt provides named presets as a convenience to quickly
   * enable/disable active syntax rules and options for common use cases.
   *
   * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
   *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
   * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
   *   similar to GFM, used when no preset name given. Enables all available rules,
   *   but still without html, typographer & autolinker.
   * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
   *   all rules disabled. Useful to quickly setup your config via `.enable()`.
   *   For example, when you need only `bold` and `italic` markup and nothing else.
   *
   * ##### options:
   *
   * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
   *   That's not safe! You may need external sanitizer to protect output from XSS.
   *   It's better to extend features via plugins, instead of enabling HTML.
   * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
   *   (`<br />`). This is needed only for full CommonMark compatibility. In real
   *   world you will need HTML output.
   * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
   * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
   *   Can be useful for external highlighters.
   * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
   * - __typographer__  - `false`. Set `true` to enable [some language-neutral
   *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
   *   quotes beautification (smartquotes).
   * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
   *   pairs, when typographer enabled and smartquotes on. For example, you can
   *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
   *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
   * - __highlight__ - `null`. Highlighter function for fenced code blocks.
   *   Highlighter `function (str, lang)` should return escaped HTML. It can also
   *   return empty string if the source was not changed and should be escaped
   *   externaly. If result starts with <pre... internal wrapper is skipped.
   *
   * ##### Example
   *
   * ```javascript
   * // commonmark mode
   * var md = require('markdown-it')('commonmark');
   *
   * // default mode
   * var md = require('markdown-it')();
   *
   * // enable everything
   * var md = require('markdown-it')({
   *   html: true,
   *   linkify: true,
   *   typographer: true
   * });
   * ```
   *
   * ##### Syntax highlighting
   *
   * ```js
   * var hljs = require('highlight.js') // https://highlightjs.org/
   *
   * var md = require('markdown-it')({
   *   highlight: function (str, lang) {
   *     if (lang && hljs.getLanguage(lang)) {
   *       try {
   *         return hljs.highlight(lang, str, true).value;
   *       } catch (__) {}
   *     }
   *
   *     return ''; // use external default escaping
   *   }
   * });
   * ```
   *
   * Or with full wrapper override (if you need assign class to `<pre>`):
   *
   * ```javascript
   * var hljs = require('highlight.js') // https://highlightjs.org/
   *
   * // Actual default values
   * var md = require('markdown-it')({
   *   highlight: function (str, lang) {
   *     if (lang && hljs.getLanguage(lang)) {
   *       try {
   *         return '<pre class="hljs"><code>' +
   *                hljs.highlight(lang, str, true).value +
   *                '</code></pre>';
   *       } catch (__) {}
   *     }
   *
   *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
   *   }
   * });
   * ```
   *
   **/
  function MarkdownIt(presetName, options) {
    if (!(this instanceof MarkdownIt)) {
      return new MarkdownIt(presetName, options);
    }

    if (!options) {
      if (!utils.isString(presetName)) {
        options = presetName || {};
        presetName = 'default';
      }
    }

    /**
     * MarkdownIt#inline -> ParserInline
     *
     * Instance of [[ParserInline]]. You may need it to add new rules when
     * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
     * [[MarkdownIt.enable]].
     **/
    this.inline = new ParserInline();

    /**
     * MarkdownIt#block -> ParserBlock
     *
     * Instance of [[ParserBlock]]. You may need it to add new rules when
     * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
     * [[MarkdownIt.enable]].
     **/
    this.block = new ParserBlock();

    /**
     * MarkdownIt#core -> Core
     *
     * Instance of [[Core]] chain executor. You may need it to add new rules when
     * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
     * [[MarkdownIt.enable]].
     **/
    this.core = new ParserCore();

    /**
     * MarkdownIt#renderer -> Renderer
     *
     * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
     * rules for new token types, generated by plugins.
     *
     * ##### Example
     *
     * ```javascript
     * var md = require('markdown-it')();
     *
     * function myToken(tokens, idx, options, env, self) {
     *   //...
     *   return result;
     * };
     *
     * md.renderer.rules['my_token'] = myToken
     * ```
     *
     * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
     **/
    this.renderer = new Renderer();

    /**
     * MarkdownIt#linkify -> LinkifyIt
     *
     * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
     * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
     * rule.
     **/
    this.linkify = new LinkifyIt();

    /**
     * MarkdownIt#validateLink(url) -> Boolean
     *
     * Link validation function. CommonMark allows too much in links. By default
     * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
     * except some embedded image types.
     *
     * You can change this behaviour:
     *
     * ```javascript
     * var md = require('markdown-it')();
     * // enable everything
     * md.validateLink = function () { return true; }
     * ```
     **/
    this.validateLink = validateLink;

    /**
     * MarkdownIt#normalizeLink(url) -> String
     *
     * Function used to encode link url to a machine-readable format,
     * which includes url-encoding, punycode, etc.
     **/
    this.normalizeLink = normalizeLink;

    /**
     * MarkdownIt#normalizeLinkText(url) -> String
     *
     * Function used to decode link url to a human-readable format`
     **/
    this.normalizeLinkText = normalizeLinkText;


    // Expose utils & helpers for easy acces from plugins

    /**
     * MarkdownIt#utils -> utils
     *
     * Assorted utility functions, useful to write plugins. See details
     * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
     **/
    this.utils = utils;

    /**
     * MarkdownIt#helpers -> helpers
     *
     * Link components parser functions, useful to write plugins. See details
     * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
     **/
    this.helpers = utils.assign({}, helpers);


    this.options = {};
    this.configure(presetName);

    if (options) { this.set(options); }
  }


  /** chainable
   * MarkdownIt.set(options)
   *
   * Set parser options (in the same format as in constructor). Probably, you
   * will never need it, but you can change options after constructor call.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')()
   *             .set({ html: true, breaks: true })
   *             .set({ typographer, true });
   * ```
   *
   * __Note:__ To achieve the best possible performance, don't modify a
   * `markdown-it` instance options on the fly. If you need multiple configurations
   * it's best to create multiple instances and initialize each with separate
   * config.
   **/
  MarkdownIt.prototype.set = function (options) {
    utils.assign(this.options, options);
    return this;
  };


  /** chainable, internal
   * MarkdownIt.configure(presets)
   *
   * Batch load of all options and compenent settings. This is internal method,
   * and you probably will not need it. But if you with - see available presets
   * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
   *
   * We strongly recommend to use presets instead of direct config loads. That
   * will give better compatibility with next versions.
   **/
  MarkdownIt.prototype.configure = function (presets) {
    var self = this, presetName;

    if (utils.isString(presets)) {
      presetName = presets;
      presets = config[presetName];
      if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
    }

    if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

    if (presets.options) { self.set(presets.options); }

    if (presets.components) {
      Object.keys(presets.components).forEach(function (name) {
        if (presets.components[name].rules) {
          self[name].ruler.enableOnly(presets.components[name].rules);
        }
        if (presets.components[name].rules2) {
          self[name].ruler2.enableOnly(presets.components[name].rules2);
        }
      });
    }
    return this;
  };


  /** chainable
   * MarkdownIt.enable(list, ignoreInvalid)
   * - list (String|Array): rule name or list of rule names to enable
   * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
   *
   * Enable list or rules. It will automatically find appropriate components,
   * containing rules with given names. If rule not found, and `ignoreInvalid`
   * not set - throws exception.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')()
   *             .enable(['sub', 'sup'])
   *             .disable('smartquotes');
   * ```
   **/
  MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
    var result = [];

    if (!Array.isArray(list)) { list = [ list ]; }

    [ 'core', 'block', 'inline' ].forEach(function (chain) {
      result = result.concat(this[chain].ruler.enable(list, true));
    }, this);

    result = result.concat(this.inline.ruler2.enable(list, true));

    var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

    if (missed.length && !ignoreInvalid) {
      throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
    }

    return this;
  };


  /** chainable
   * MarkdownIt.disable(list, ignoreInvalid)
   * - list (String|Array): rule name or list of rule names to disable.
   * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
   *
   * The same as [[MarkdownIt.enable]], but turn specified rules off.
   **/
  MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
    var result = [];

    if (!Array.isArray(list)) { list = [ list ]; }

    [ 'core', 'block', 'inline' ].forEach(function (chain) {
      result = result.concat(this[chain].ruler.disable(list, true));
    }, this);

    result = result.concat(this.inline.ruler2.disable(list, true));

    var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

    if (missed.length && !ignoreInvalid) {
      throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
    }
    return this;
  };


  /** chainable
   * MarkdownIt.use(plugin, params)
   *
   * Load specified plugin with given params into current parser instance.
   * It's just a sugar to call `plugin(md, params)` with curring.
   *
   * ##### Example
   *
   * ```javascript
   * var iterator = require('markdown-it-for-inline');
   * var md = require('markdown-it')()
   *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
   *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
   *             });
   * ```
   **/
  MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
    var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
    plugin.apply(plugin, args);
    return this;
  };


  /** internal
   * MarkdownIt.parse(src, env) -> Array
   * - src (String): source string
   * - env (Object): environment sandbox
   *
   * Parse input string and returns list of block tokens (special token type
   * "inline" will contain list of inline tokens). You should not call this
   * method directly, until you write custom renderer (for example, to produce
   * AST).
   *
   * `env` is used to pass data between "distributed" rules and return additional
   * metadata like reference info, needed for the renderer. It also can be used to
   * inject data in specific cases. Usually, you will be ok to pass `{}`,
   * and then pass updated object to renderer.
   **/
  MarkdownIt.prototype.parse = function (src, env) {
    if (typeof src !== 'string') {
      throw new Error('Input data should be a String');
    }

    var state = new this.core.State(src, this, env);

    this.core.process(state);

    return state.tokens;
  };


  /**
   * MarkdownIt.render(src [, env]) -> String
   * - src (String): source string
   * - env (Object): environment sandbox
   *
   * Render markdown string into html. It does all magic for you :).
   *
   * `env` can be used to inject additional metadata (`{}` by default).
   * But you will not need it with high probability. See also comment
   * in [[MarkdownIt.parse]].
   **/
  MarkdownIt.prototype.render = function (src, env) {
    env = env || {};

    return this.renderer.render(this.parse(src, env), this.options, env);
  };


  /** internal
   * MarkdownIt.parseInline(src, env) -> Array
   * - src (String): source string
   * - env (Object): environment sandbox
   *
   * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
   * block tokens list with the single `inline` element, containing parsed inline
   * tokens in `children` property. Also updates `env` object.
   **/
  MarkdownIt.prototype.parseInline = function (src, env) {
    var state = new this.core.State(src, this, env);

    state.inlineMode = true;
    this.core.process(state);

    return state.tokens;
  };


  /**
   * MarkdownIt.renderInline(src [, env]) -> String
   * - src (String): source string
   * - env (Object): environment sandbox
   *
   * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
   * will NOT be wrapped into `<p>` tags.
   **/
  MarkdownIt.prototype.renderInline = function (src, env) {
    env = env || {};

    return this.renderer.render(this.parseInline(src, env), this.options, env);
  };


  module.exports = MarkdownIt;

  },{"./common/utils":4,"./helpers":5,"./parser_block":10,"./parser_core":11,"./parser_inline":12,"./presets/commonmark":13,"./presets/default":14,"./presets/zero":15,"./renderer":16,"linkify-it":53,"mdurl":58,"punycode":60}],10:[function(require,module,exports){


  var Ruler           = require('./ruler');


  var _rules = [
    // First 2 params - rule name & source. Secondary array - list of rules,
    // which can be terminated by this one.
    [ 'table',      require('./rules_block/table'),      [ 'paragraph', 'reference' ] ],
    [ 'code',       require('./rules_block/code') ],
    [ 'fence',      require('./rules_block/fence'),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
    [ 'blockquote', require('./rules_block/blockquote'), [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
    [ 'hr',         require('./rules_block/hr'),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
    [ 'list',       require('./rules_block/list'),       [ 'paragraph', 'reference', 'blockquote' ] ],
    [ 'reference',  require('./rules_block/reference') ],
    [ 'heading',    require('./rules_block/heading'),    [ 'paragraph', 'reference', 'blockquote' ] ],
    [ 'lheading',   require('./rules_block/lheading') ],
    [ 'html_block', require('./rules_block/html_block'), [ 'paragraph', 'reference', 'blockquote' ] ],
    [ 'paragraph',  require('./rules_block/paragraph') ]
  ];


  /**
   * new ParserBlock()
   **/
  function ParserBlock() {
    /**
     * ParserBlock#ruler -> Ruler
     *
     * [[Ruler]] instance. Keep configuration of block rules.
     **/
    this.ruler = new Ruler();

    for (var i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
    }
  }


  // Generate tokens for input range
  //
  ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
    var ok, i,
        rules = this.ruler.getRules(''),
        len = rules.length,
        line = startLine,
        hasEmptyLines = false,
        maxNesting = state.md.options.maxNesting;

    while (line < endLine) {
      state.line = line = state.skipEmptyLines(line);
      if (line >= endLine) { break; }

      // Termination condition for nested calls.
      // Nested calls currently used for blockquotes & lists
      if (state.sCount[line] < state.blkIndent) { break; }

      // If nesting level exceeded - skip tail to the end. That's not ordinary
      // situation and we should not care about content.
      if (state.level >= maxNesting) {
        state.line = endLine;
        break;
      }

      // Try all possible rules.
      // On success, rule should:
      //
      // - update `state.line`
      // - update `state.tokens`
      // - return true

      for (i = 0; i < len; i++) {
        ok = rules[i](state, line, endLine, false);
        if (ok) { break; }
      }

      // set state.tight if we had an empty line before current tag
      // i.e. latest empty line should not count
      state.tight = !hasEmptyLines;

      // paragraph might "eat" one newline after it in nested lists
      if (state.isEmpty(state.line - 1)) {
        hasEmptyLines = true;
      }

      line = state.line;

      if (line < endLine && state.isEmpty(line)) {
        hasEmptyLines = true;
        line++;
        state.line = line;
      }
    }
  };


  /**
   * ParserBlock.parse(str, md, env, outTokens)
   *
   * Process input string and push block tokens into `outTokens`
   **/
  ParserBlock.prototype.parse = function (src, md, env, outTokens) {
    var state;

    if (!src) { return; }

    state = new this.State(src, md, env, outTokens);

    this.tokenize(state, state.line, state.lineMax);
  };


  ParserBlock.prototype.State = require('./rules_block/state_block');


  module.exports = ParserBlock;

  },{"./ruler":17,"./rules_block/blockquote":18,"./rules_block/code":19,"./rules_block/fence":20,"./rules_block/heading":21,"./rules_block/hr":22,"./rules_block/html_block":23,"./rules_block/lheading":24,"./rules_block/list":25,"./rules_block/paragraph":26,"./rules_block/reference":27,"./rules_block/state_block":28,"./rules_block/table":29}],11:[function(require,module,exports){


  var Ruler  = require('./ruler');


  var _rules = [
    [ 'normalize',      require('./rules_core/normalize')      ],
    [ 'block',          require('./rules_core/block')          ],
    [ 'inline',         require('./rules_core/inline')         ],
    [ 'linkify',        require('./rules_core/linkify')        ],
    [ 'replacements',   require('./rules_core/replacements')   ],
    [ 'smartquotes',    require('./rules_core/smartquotes')    ]
  ];


  /**
   * new Core()
   **/
  function Core() {
    /**
     * Core#ruler -> Ruler
     *
     * [[Ruler]] instance. Keep configuration of core rules.
     **/
    this.ruler = new Ruler();

    for (var i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }
  }


  /**
   * Core.process(state)
   *
   * Executes core chain rules.
   **/
  Core.prototype.process = function (state) {
    var i, l, rules;

    rules = this.ruler.getRules('');

    for (i = 0, l = rules.length; i < l; i++) {
      rules[i](state);
    }
  };

  Core.prototype.State = require('./rules_core/state_core');


  module.exports = Core;

  },{"./ruler":17,"./rules_core/block":30,"./rules_core/inline":31,"./rules_core/linkify":32,"./rules_core/normalize":33,"./rules_core/replacements":34,"./rules_core/smartquotes":35,"./rules_core/state_core":36}],12:[function(require,module,exports){


  var Ruler           = require('./ruler');


  ////////////////////////////////////////////////////////////////////////////////
  // Parser rules

  var _rules = [
    [ 'text',            require('./rules_inline/text') ],
    [ 'newline',         require('./rules_inline/newline') ],
    [ 'escape',          require('./rules_inline/escape') ],
    [ 'backticks',       require('./rules_inline/backticks') ],
    [ 'strikethrough',   require('./rules_inline/strikethrough').tokenize ],
    [ 'emphasis',        require('./rules_inline/emphasis').tokenize ],
    [ 'link',            require('./rules_inline/link') ],
    [ 'image',           require('./rules_inline/image') ],
    [ 'autolink',        require('./rules_inline/autolink') ],
    [ 'html_inline',     require('./rules_inline/html_inline') ],
    [ 'entity',          require('./rules_inline/entity') ]
  ];

  var _rules2 = [
    [ 'balance_pairs',   require('./rules_inline/balance_pairs') ],
    [ 'strikethrough',   require('./rules_inline/strikethrough').postProcess ],
    [ 'emphasis',        require('./rules_inline/emphasis').postProcess ],
    [ 'text_collapse',   require('./rules_inline/text_collapse') ]
  ];


  /**
   * new ParserInline()
   **/
  function ParserInline() {
    var i;

    /**
     * ParserInline#ruler -> Ruler
     *
     * [[Ruler]] instance. Keep configuration of inline rules.
     **/
    this.ruler = new Ruler();

    for (i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }

    /**
     * ParserInline#ruler2 -> Ruler
     *
     * [[Ruler]] instance. Second ruler used for post-processing
     * (e.g. in emphasis-like rules).
     **/
    this.ruler2 = new Ruler();

    for (i = 0; i < _rules2.length; i++) {
      this.ruler2.push(_rules2[i][0], _rules2[i][1]);
    }
  }


  // Skip single token by running all rules in validation mode;
  // returns `true` if any rule reported success
  //
  ParserInline.prototype.skipToken = function (state) {
    var ok, i, pos = state.pos,
        rules = this.ruler.getRules(''),
        len = rules.length,
        maxNesting = state.md.options.maxNesting,
        cache = state.cache;


    if (typeof cache[pos] !== 'undefined') {
      state.pos = cache[pos];
      return;
    }

    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        // Increment state.level and decrement it later to limit recursion.
        // It's harmless to do here, because no tokens are created. But ideally,
        // we'd need a separate private state variable for this purpose.
        //
        state.level++;
        ok = rules[i](state, true);
        state.level--;

        if (ok) { break; }
      }
    } else {
      // Too much nesting, just skip until the end of the paragraph.
      //
      // NOTE: this will cause links to behave incorrectly in the following case,
      //       when an amount of `[` is exactly equal to `maxNesting + 1`:
      //
      //       [[[[[[[[[[[[[[[[[[[[[foo]()
      //
      // TODO: remove this workaround when CM standard will allow nested links
      //       (we can replace it by preventing links from being parsed in
      //       validation mode)
      //
      state.pos = state.posMax;
    }

    if (!ok) { state.pos++; }
    cache[pos] = state.pos;
  };


  // Generate tokens for input range
  //
  ParserInline.prototype.tokenize = function (state) {
    var ok, i,
        rules = this.ruler.getRules(''),
        len = rules.length,
        end = state.posMax,
        maxNesting = state.md.options.maxNesting;

    while (state.pos < end) {
      // Try all possible rules.
      // On success, rule should:
      //
      // - update `state.pos`
      // - update `state.tokens`
      // - return true

      if (state.level < maxNesting) {
        for (i = 0; i < len; i++) {
          ok = rules[i](state, false);
          if (ok) { break; }
        }
      }

      if (ok) {
        if (state.pos >= end) { break; }
        continue;
      }

      state.pending += state.src[state.pos++];
    }

    if (state.pending) {
      state.pushPending();
    }
  };


  /**
   * ParserInline.parse(str, md, env, outTokens)
   *
   * Process input string and push inline tokens into `outTokens`
   **/
  ParserInline.prototype.parse = function (str, md, env, outTokens) {
    var i, rules, len;
    var state = new this.State(str, md, env, outTokens);

    this.tokenize(state);

    rules = this.ruler2.getRules('');
    len = rules.length;

    for (i = 0; i < len; i++) {
      rules[i](state);
    }
  };


  ParserInline.prototype.State = require('./rules_inline/state_inline');


  module.exports = ParserInline;

  },{"./ruler":17,"./rules_inline/autolink":37,"./rules_inline/backticks":38,"./rules_inline/balance_pairs":39,"./rules_inline/emphasis":40,"./rules_inline/entity":41,"./rules_inline/escape":42,"./rules_inline/html_inline":43,"./rules_inline/image":44,"./rules_inline/link":45,"./rules_inline/newline":46,"./rules_inline/state_inline":47,"./rules_inline/strikethrough":48,"./rules_inline/text":49,"./rules_inline/text_collapse":50}],13:[function(require,module,exports){


  module.exports = {
    options: {
      html:         true,         // Enable HTML tags in source
      xhtmlOut:     true,         // Use '/' to close single tags (<br />)
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkify:      false,        // autoconvert URL-like texts to links

      // Enable some language-neutral replacements + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,

      maxNesting:   20            // Internal protection, recursion limit
    },

    components: {

      core: {
        rules: [
          'normalize',
          'block',
          'inline'
        ]
      },

      block: {
        rules: [
          'blockquote',
          'code',
          'fence',
          'heading',
          'hr',
          'html_block',
          'lheading',
          'list',
          'reference',
          'paragraph'
        ]
      },

      inline: {
        rules: [
          'autolink',
          'backticks',
          'emphasis',
          'entity',
          'escape',
          'html_inline',
          'image',
          'link',
          'newline',
          'text'
        ],
        rules2: [
          'balance_pairs',
          'emphasis',
          'text_collapse'
        ]
      }
    }
  };

  },{}],14:[function(require,module,exports){


  module.exports = {
    options: {
      html:         false,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />)
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkify:      false,        // autoconvert URL-like texts to links

      // Enable some language-neutral replacements + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,

      maxNesting:   100            // Internal protection, recursion limit
    },

    components: {

      core: {},
      block: {},
      inline: {}
    }
  };

  },{}],15:[function(require,module,exports){


  module.exports = {
    options: {
      html:         false,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />)
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkify:      false,        // autoconvert URL-like texts to links

      // Enable some language-neutral replacements + quotes beautification
      typographer:  false,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,

      maxNesting:   20            // Internal protection, recursion limit
    },

    components: {

      core: {
        rules: [
          'normalize',
          'block',
          'inline'
        ]
      },

      block: {
        rules: [
          'paragraph'
        ]
      },

      inline: {
        rules: [
          'text'
        ],
        rules2: [
          'balance_pairs',
          'text_collapse'
        ]
      }
    }
  };

  },{}],16:[function(require,module,exports){


  var assign          = require('./common/utils').assign;
  var unescapeAll     = require('./common/utils').unescapeAll;
  var escapeHtml      = require('./common/utils').escapeHtml;


  ////////////////////////////////////////////////////////////////////////////////

  var default_rules = {};


  default_rules.code_inline = function (tokens, idx, options, env, slf) {
    var token = tokens[idx];

    return  '<code' + slf.renderAttrs(token) + '>' +
            escapeHtml(tokens[idx].content) +
            '</code>';
  };


  default_rules.code_block = function (tokens, idx, options, env, slf) {
    var token = tokens[idx];

    return  '<pre' + slf.renderAttrs(token) + '><code>' +
            escapeHtml(tokens[idx].content) +
            '</code></pre>\n';
  };


  default_rules.fence = function (tokens, idx, options, env, slf) {
    var token = tokens[idx],
        info = token.info ? unescapeAll(token.info).trim() : '',
        langName = '',
        highlighted, i, tmpAttrs, tmpToken;

    if (info) {
      langName = info.split(/\s+/g)[0];
    }

    if (options.highlight) {
      highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
    } else {
      highlighted = escapeHtml(token.content);
    }

    if (highlighted.indexOf('<pre') === 0) {
      return highlighted + '\n';
    }

    // If language exists, inject class gently, without modifying original token.
    // May be, one day we will add .clone() for token and simplify this part, but
    // now we prefer to keep things local.
    if (info) {
      i        = token.attrIndex('class');
      tmpAttrs = token.attrs ? token.attrs.slice() : [];

      if (i < 0) {
        tmpAttrs.push([ 'class', options.langPrefix + langName ]);
      } else {
        tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
      }

      // Fake token just to render attributes
      tmpToken = {
        attrs: tmpAttrs
      };

      return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
            + highlighted
            + '</code></pre>\n';
    }


    return  '<pre><code' + slf.renderAttrs(token) + '>'
          + highlighted
          + '</code></pre>\n';
  };


  default_rules.image = function (tokens, idx, options, env, slf) {
    var token = tokens[idx];

    // "alt" attr MUST be set, even if empty. Because it's mandatory and
    // should be placed on proper position for tests.
    //
    // Replace content with actual value

    token.attrs[token.attrIndex('alt')][1] =
      slf.renderInlineAsText(token.children, options, env);

    return slf.renderToken(tokens, idx, options);
  };


  default_rules.hardbreak = function (tokens, idx, options /*, env */) {
    return options.xhtmlOut ? '<br />\n' : '<br>\n';
  };
  default_rules.softbreak = function (tokens, idx, options /*, env */) {
    return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
  };


  default_rules.text = function (tokens, idx /*, options, env */) {
    return escapeHtml(tokens[idx].content);
  };


  default_rules.html_block = function (tokens, idx /*, options, env */) {
    return tokens[idx].content;
  };
  default_rules.html_inline = function (tokens, idx /*, options, env */) {
    return tokens[idx].content;
  };


  /**
   * new Renderer()
   *
   * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
   **/
  function Renderer() {

    /**
     * Renderer#rules -> Object
     *
     * Contains render rules for tokens. Can be updated and extended.
     *
     * ##### Example
     *
     * ```javascript
     * var md = require('markdown-it')();
     *
     * md.renderer.rules.strong_open  = function () { return '<b>'; };
     * md.renderer.rules.strong_close = function () { return '</b>'; };
     *
     * var result = md.renderInline(...);
     * ```
     *
     * Each rule is called as independent static function with fixed signature:
     *
     * ```javascript
     * function my_token_render(tokens, idx, options, env, renderer) {
     *   // ...
     *   return renderedHTML;
     * }
     * ```
     *
     * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
     * for more details and examples.
     **/
    this.rules = assign({}, default_rules);
  }


  /**
   * Renderer.renderAttrs(token) -> String
   *
   * Render token attributes to string.
   **/
  Renderer.prototype.renderAttrs = function renderAttrs(token) {
    var i, l, result;

    if (!token.attrs) { return ''; }

    result = '';

    for (i = 0, l = token.attrs.length; i < l; i++) {
      result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
    }

    return result;
  };


  /**
   * Renderer.renderToken(tokens, idx, options) -> String
   * - tokens (Array): list of tokens
   * - idx (Numbed): token index to render
   * - options (Object): params of parser instance
   *
   * Default token renderer. Can be overriden by custom function
   * in [[Renderer#rules]].
   **/
  Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
    var nextToken,
        result = '',
        needLf = false,
        token = tokens[idx];

    // Tight list paragraphs
    if (token.hidden) {
      return '';
    }

    // Insert a newline between hidden paragraph and subsequent opening
    // block-level tag.
    //
    // For example, here we should insert a newline before blockquote:
    //  - a
    //    >
    //
    if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
      result += '\n';
    }

    // Add token name, e.g. `<img`
    result += (token.nesting === -1 ? '</' : '<') + token.tag;

    // Encode attributes, e.g. `<img src="foo"`
    result += this.renderAttrs(token);

    // Add a slash for self-closing tags, e.g. `<img src="foo" /`
    if (token.nesting === 0 && options.xhtmlOut) {
      result += ' /';
    }

    // Check if we need to add a newline after this tag
    if (token.block) {
      needLf = true;

      if (token.nesting === 1) {
        if (idx + 1 < tokens.length) {
          nextToken = tokens[idx + 1];

          if (nextToken.type === 'inline' || nextToken.hidden) {
            // Block-level tag containing an inline tag.
            //
            needLf = false;

          } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
            // Opening tag + closing tag of the same type. E.g. `<li></li>`.
            //
            needLf = false;
          }
        }
      }
    }

    result += needLf ? '>\n' : '>';

    return result;
  };


  /**
   * Renderer.renderInline(tokens, options, env) -> String
   * - tokens (Array): list on block tokens to renter
   * - options (Object): params of parser instance
   * - env (Object): additional data from parsed input (references, for example)
   *
   * The same as [[Renderer.render]], but for single token of `inline` type.
   **/
  Renderer.prototype.renderInline = function (tokens, options, env) {
    var type,
        result = '',
        rules = this.rules;

    for (var i = 0, len = tokens.length; i < len; i++) {
      type = tokens[i].type;

      if (typeof rules[type] !== 'undefined') {
        result += rules[type](tokens, i, options, env, this);
      } else {
        result += this.renderToken(tokens, i, options);
      }
    }

    return result;
  };


  /** internal
   * Renderer.renderInlineAsText(tokens, options, env) -> String
   * - tokens (Array): list on block tokens to renter
   * - options (Object): params of parser instance
   * - env (Object): additional data from parsed input (references, for example)
   *
   * Special kludge for image `alt` attributes to conform CommonMark spec.
   * Don't try to use it! Spec requires to show `alt` content with stripped markup,
   * instead of simple escaping.
   **/
  Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
    var result = '';

    for (var i = 0, len = tokens.length; i < len; i++) {
      if (tokens[i].type === 'text') {
        result += tokens[i].content;
      } else if (tokens[i].type === 'image') {
        result += this.renderInlineAsText(tokens[i].children, options, env);
      }
    }

    return result;
  };


  /**
   * Renderer.render(tokens, options, env) -> String
   * - tokens (Array): list on block tokens to renter
   * - options (Object): params of parser instance
   * - env (Object): additional data from parsed input (references, for example)
   *
   * Takes token stream and generates HTML. Probably, you will never need to call
   * this method directly.
   **/
  Renderer.prototype.render = function (tokens, options, env) {
    var i, len, type,
        result = '',
        rules = this.rules;

    for (i = 0, len = tokens.length; i < len; i++) {
      type = tokens[i].type;

      if (type === 'inline') {
        result += this.renderInline(tokens[i].children, options, env);
      } else if (typeof rules[type] !== 'undefined') {
        result += rules[tokens[i].type](tokens, i, options, env, this);
      } else {
        result += this.renderToken(tokens, i, options, env);
      }
    }

    return result;
  };

  module.exports = Renderer;

  },{"./common/utils":4}],17:[function(require,module,exports){


  /**
   * new Ruler()
   **/
  function Ruler() {
    // List of added rules. Each element is:
    //
    // {
    //   name: XXX,
    //   enabled: Boolean,
    //   fn: Function(),
    //   alt: [ name2, name3 ]
    // }
    //
    this.__rules__ = [];

    // Cached rule chains.
    //
    // First level - chain name, '' for default.
    // Second level - diginal anchor for fast filtering by charcodes.
    //
    this.__cache__ = null;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Helper methods, should not be used directly


  // Find rule index by name
  //
  Ruler.prototype.__find__ = function (name) {
    for (var i = 0; i < this.__rules__.length; i++) {
      if (this.__rules__[i].name === name) {
        return i;
      }
    }
    return -1;
  };


  // Build rules lookup cache
  //
  Ruler.prototype.__compile__ = function () {
    var self = this;
    var chains = [ '' ];

    // collect unique names
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return; }

      rule.alt.forEach(function (altName) {
        if (chains.indexOf(altName) < 0) {
          chains.push(altName);
        }
      });
    });

    self.__cache__ = {};

    chains.forEach(function (chain) {
      self.__cache__[chain] = [];
      self.__rules__.forEach(function (rule) {
        if (!rule.enabled) { return; }

        if (chain && rule.alt.indexOf(chain) < 0) { return; }

        self.__cache__[chain].push(rule.fn);
      });
    });
  };


  /**
   * Ruler.at(name, fn [, options])
   * - name (String): rule name to replace.
   * - fn (Function): new rule function.
   * - options (Object): new rule options (not mandatory).
   *
   * Replace rule by name with new function & options. Throws error if name not
   * found.
   *
   * ##### Options:
   *
   * - __alt__ - array with names of "alternate" chains.
   *
   * ##### Example
   *
   * Replace existing typographer replacement rule with new one:
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.core.ruler.at('replacements', function replace(state) {
   *   //...
   * });
   * ```
   **/
  Ruler.prototype.at = function (name, fn, options) {
    var index = this.__find__(name);
    var opt = options || {};

    if (index === -1) { throw new Error('Parser rule not found: ' + name); }

    this.__rules__[index].fn = fn;
    this.__rules__[index].alt = opt.alt || [];
    this.__cache__ = null;
  };


  /**
   * Ruler.before(beforeName, ruleName, fn [, options])
   * - beforeName (String): new rule will be added before this one.
   * - ruleName (String): name of added rule.
   * - fn (Function): rule function.
   * - options (Object): rule options (not mandatory).
   *
   * Add new rule to chain before one with given name. See also
   * [[Ruler.after]], [[Ruler.push]].
   *
   * ##### Options:
   *
   * - __alt__ - array with names of "alternate" chains.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
   *   //...
   * });
   * ```
   **/
  Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
    var index = this.__find__(beforeName);
    var opt = options || {};

    if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

    this.__rules__.splice(index, 0, {
      name: ruleName,
      enabled: true,
      fn: fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  };


  /**
   * Ruler.after(afterName, ruleName, fn [, options])
   * - afterName (String): new rule will be added after this one.
   * - ruleName (String): name of added rule.
   * - fn (Function): rule function.
   * - options (Object): rule options (not mandatory).
   *
   * Add new rule to chain after one with given name. See also
   * [[Ruler.before]], [[Ruler.push]].
   *
   * ##### Options:
   *
   * - __alt__ - array with names of "alternate" chains.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.inline.ruler.after('text', 'my_rule', function replace(state) {
   *   //...
   * });
   * ```
   **/
  Ruler.prototype.after = function (afterName, ruleName, fn, options) {
    var index = this.__find__(afterName);
    var opt = options || {};

    if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

    this.__rules__.splice(index + 1, 0, {
      name: ruleName,
      enabled: true,
      fn: fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  };

  /**
   * Ruler.push(ruleName, fn [, options])
   * - ruleName (String): name of added rule.
   * - fn (Function): rule function.
   * - options (Object): rule options (not mandatory).
   *
   * Push new rule to the end of chain. See also
   * [[Ruler.before]], [[Ruler.after]].
   *
   * ##### Options:
   *
   * - __alt__ - array with names of "alternate" chains.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.core.ruler.push('my_rule', function replace(state) {
   *   //...
   * });
   * ```
   **/
  Ruler.prototype.push = function (ruleName, fn, options) {
    var opt = options || {};

    this.__rules__.push({
      name: ruleName,
      enabled: true,
      fn: fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  };


  /**
   * Ruler.enable(list [, ignoreInvalid]) -> Array
   * - list (String|Array): list of rule names to enable.
   * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
   *
   * Enable rules with given names. If any rule name not found - throw Error.
   * Errors can be disabled by second param.
   *
   * Returns list of found rule names (if no exception happened).
   *
   * See also [[Ruler.disable]], [[Ruler.enableOnly]].
   **/
  Ruler.prototype.enable = function (list, ignoreInvalid) {
    if (!Array.isArray(list)) { list = [ list ]; }

    var result = [];

    // Search by name and enable
    list.forEach(function (name) {
      var idx = this.__find__(name);

      if (idx < 0) {
        if (ignoreInvalid) { return; }
        throw new Error('Rules manager: invalid rule name ' + name);
      }
      this.__rules__[idx].enabled = true;
      result.push(name);
    }, this);

    this.__cache__ = null;
    return result;
  };


  /**
   * Ruler.enableOnly(list [, ignoreInvalid])
   * - list (String|Array): list of rule names to enable (whitelist).
   * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
   *
   * Enable rules with given names, and disable everything else. If any rule name
   * not found - throw Error. Errors can be disabled by second param.
   *
   * See also [[Ruler.disable]], [[Ruler.enable]].
   **/
  Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
    if (!Array.isArray(list)) { list = [ list ]; }

    this.__rules__.forEach(function (rule) { rule.enabled = false; });

    this.enable(list, ignoreInvalid);
  };


  /**
   * Ruler.disable(list [, ignoreInvalid]) -> Array
   * - list (String|Array): list of rule names to disable.
   * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
   *
   * Disable rules with given names. If any rule name not found - throw Error.
   * Errors can be disabled by second param.
   *
   * Returns list of found rule names (if no exception happened).
   *
   * See also [[Ruler.enable]], [[Ruler.enableOnly]].
   **/
  Ruler.prototype.disable = function (list, ignoreInvalid) {
    if (!Array.isArray(list)) { list = [ list ]; }

    var result = [];

    // Search by name and disable
    list.forEach(function (name) {
      var idx = this.__find__(name);

      if (idx < 0) {
        if (ignoreInvalid) { return; }
        throw new Error('Rules manager: invalid rule name ' + name);
      }
      this.__rules__[idx].enabled = false;
      result.push(name);
    }, this);

    this.__cache__ = null;
    return result;
  };


  /**
   * Ruler.getRules(chainName) -> Array
   *
   * Return array of active functions (rules) for given chain name. It analyzes
   * rules configuration, compiles caches if not exists and returns result.
   *
   * Default chain name is `''` (empty string). It can't be skipped. That's
   * done intentionally, to keep signature monomorphic for high speed.
   **/
  Ruler.prototype.getRules = function (chainName) {
    if (this.__cache__ === null) {
      this.__compile__();
    }

    // Chain can be empty, if rules disabled. But we still have to return Array.
    return this.__cache__[chainName] || [];
  };

  module.exports = Ruler;

  },{}],18:[function(require,module,exports){

  var isSpace = require('../common/utils').isSpace;


  module.exports = function blockquote(state, startLine, endLine, silent) {
    var adjustTab,
        ch,
        i,
        initial,
        l,
        lastLineEmpty,
        lines,
        nextLine,
        offset,
        oldBMarks,
        oldBSCount,
        oldIndent,
        oldParentType,
        oldSCount,
        oldTShift,
        spaceAfterMarker,
        terminate,
        terminatorRules,
        token,
        wasOutdented,
        oldLineMax = state.lineMax,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    // check the block quote marker
    if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

    // we know that it's going to be a valid blockquote,
    // so no point trying to find the end of it in silent mode
    if (silent) { return true; }

    // skip spaces after ">" and re-calculate offset
    initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);

    // skip one optional space after '>'
    if (state.src.charCodeAt(pos) === 0x20 /* space */) {
      // ' >   test '
      //     ^ -- position start of line here:
      pos++;
      initial++;
      offset++;
      adjustTab = false;
      spaceAfterMarker = true;
    } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
      spaceAfterMarker = true;

      if ((state.bsCount[startLine] + offset) % 4 === 3) {
        // '  >\t  test '
        //       ^ -- position start of line here (tab has width===1)
        pos++;
        initial++;
        offset++;
        adjustTab = false;
      } else {
        // ' >\t  test '
        //    ^ -- position start of line here + shift bsCount slightly
        //         to make extra space appear
        adjustTab = true;
      }
    } else {
      spaceAfterMarker = false;
    }

    oldBMarks = [ state.bMarks[startLine] ];
    state.bMarks[startLine] = pos;

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
        } else {
          offset++;
        }
      } else {
        break;
      }

      pos++;
    }

    oldBSCount = [ state.bsCount[startLine] ];
    state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

    lastLineEmpty = pos >= max;

    oldSCount = [ state.sCount[startLine] ];
    state.sCount[startLine] = offset - initial;

    oldTShift = [ state.tShift[startLine] ];
    state.tShift[startLine] = pos - state.bMarks[startLine];

    terminatorRules = state.md.block.ruler.getRules('blockquote');

    oldParentType = state.parentType;
    state.parentType = 'blockquote';
    wasOutdented = false;

    // Search the end of the block
    //
    // Block ends with either:
    //  1. an empty line outside:
    //     ```
    //     > test
    //
    //     ```
    //  2. an empty line inside:
    //     ```
    //     >
    //     test
    //     ```
    //  3. another tag:
    //     ```
    //     > test
    //      - - -
    //     ```
    for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
      // check if it's outdented, i.e. it's inside list item and indented
      // less than said list item:
      //
      // ```
      // 1. anything
      //    > current blockquote
      // 2. checking this line
      // ```
      if (state.sCount[nextLine] < state.blkIndent) wasOutdented = true;

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos >= max) {
        // Case 1: line is not inside the blockquote, and this line is empty.
        break;
      }

      if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !wasOutdented) {
        // This line is inside the blockquote.

        // skip spaces after ">" and re-calculate offset
        initial = offset = state.sCount[nextLine] + pos - (state.bMarks[nextLine] + state.tShift[nextLine]);

        // skip one optional space after '>'
        if (state.src.charCodeAt(pos) === 0x20 /* space */) {
          // ' >   test '
          //     ^ -- position start of line here:
          pos++;
          initial++;
          offset++;
          adjustTab = false;
          spaceAfterMarker = true;
        } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
          spaceAfterMarker = true;

          if ((state.bsCount[nextLine] + offset) % 4 === 3) {
            // '  >\t  test '
            //       ^ -- position start of line here (tab has width===1)
            pos++;
            initial++;
            offset++;
            adjustTab = false;
          } else {
            // ' >\t  test '
            //    ^ -- position start of line here + shift bsCount slightly
            //         to make extra space appear
            adjustTab = true;
          }
        } else {
          spaceAfterMarker = false;
        }

        oldBMarks.push(state.bMarks[nextLine]);
        state.bMarks[nextLine] = pos;

        while (pos < max) {
          ch = state.src.charCodeAt(pos);

          if (isSpace(ch)) {
            if (ch === 0x09) {
              offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
            } else {
              offset++;
            }
          } else {
            break;
          }

          pos++;
        }

        lastLineEmpty = pos >= max;

        oldBSCount.push(state.bsCount[nextLine]);
        state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = offset - initial;

        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = pos - state.bMarks[nextLine];
        continue;
      }

      // Case 2: line is not inside the blockquote, and the last line was empty.
      if (lastLineEmpty) { break; }

      // Case 3: another tag found.
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }

      if (terminate) {
        // Quirk to enforce "hard termination mode" for paragraphs;
        // normally if you call `tokenize(state, startLine, nextLine)`,
        // paragraphs will look below nextLine for paragraph continuation,
        // but if blockquote is terminated by another tag, they shouldn't
        state.lineMax = nextLine;

        if (state.blkIndent !== 0) {
          // state.blkIndent was non-zero, we now set it to zero,
          // so we need to re-calculate all offsets to appear as
          // if indent wasn't changed
          oldBMarks.push(state.bMarks[nextLine]);
          oldBSCount.push(state.bsCount[nextLine]);
          oldTShift.push(state.tShift[nextLine]);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] -= state.blkIndent;
        }

        break;
      }

      oldBMarks.push(state.bMarks[nextLine]);
      oldBSCount.push(state.bsCount[nextLine]);
      oldTShift.push(state.tShift[nextLine]);
      oldSCount.push(state.sCount[nextLine]);

      // A negative indentation means that this is a paragraph continuation
      //
      state.sCount[nextLine] = -1;
    }

    oldIndent = state.blkIndent;
    state.blkIndent = 0;

    token        = state.push('blockquote_open', 'blockquote', 1);
    token.markup = '>';
    token.map    = lines = [ startLine, 0 ];

    state.md.block.tokenize(state, startLine, nextLine);

    token        = state.push('blockquote_close', 'blockquote', -1);
    token.markup = '>';

    state.lineMax = oldLineMax;
    state.parentType = oldParentType;
    lines[1] = state.line;

    // Restore original tShift; this might not be necessary since the parser
    // has already been here, but just to make sure we can do that.
    for (i = 0; i < oldTShift.length; i++) {
      state.bMarks[i + startLine] = oldBMarks[i];
      state.tShift[i + startLine] = oldTShift[i];
      state.sCount[i + startLine] = oldSCount[i];
      state.bsCount[i + startLine] = oldBSCount[i];
    }
    state.blkIndent = oldIndent;

    return true;
  };

  },{"../common/utils":4}],19:[function(require,module,exports){


  module.exports = function code(state, startLine, endLine/*, silent*/) {
    var nextLine, last, token;

    if (state.sCount[startLine] - state.blkIndent < 4) { return false; }

    last = nextLine = startLine + 1;

    while (nextLine < endLine) {
      if (state.isEmpty(nextLine)) {
        nextLine++;
        continue;
      }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        nextLine++;
        last = nextLine;
        continue;
      }
      break;
    }

    state.line = last;

    token         = state.push('code_block', 'code', 0);
    token.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
    token.map     = [ startLine, state.line ];

    return true;
  };

  },{}],20:[function(require,module,exports){


  module.exports = function fence(state, startLine, endLine, silent) {
    var marker, len, params, nextLine, mem, token, markup,
        haveEndMarker = false,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    if (pos + 3 > max) { return false; }

    marker = state.src.charCodeAt(pos);

    if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
      return false;
    }

    // scan marker length
    mem = pos;
    pos = state.skipChars(pos, marker);

    len = pos - mem;

    if (len < 3) { return false; }

    markup = state.src.slice(mem, pos);
    params = state.src.slice(pos, max);

    if (params.indexOf(String.fromCharCode(marker)) >= 0) { return false; }

    // Since start is found, we can report success here in validation mode
    if (silent) { return true; }

    // search end of block
    nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }

      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }

      if (state.src.charCodeAt(pos) !== marker) { continue; }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }

      pos = state.skipChars(pos, marker);

      // closing code fence must be at least as long as the opening one
      if (pos - mem < len) { continue; }

      // make sure tail has spaces only
      pos = state.skipSpaces(pos);

      if (pos < max) { continue; }

      haveEndMarker = true;
      // found!
      break;
    }

    // If a fence has heading spaces, they should be removed from its inner block
    len = state.sCount[startLine];

    state.line = nextLine + (haveEndMarker ? 1 : 0);

    token         = state.push('fence', 'code', 0);
    token.info    = params;
    token.content = state.getLines(startLine + 1, nextLine, len, true);
    token.markup  = markup;
    token.map     = [ startLine, state.line ];

    return true;
  };

  },{}],21:[function(require,module,exports){

  var isSpace = require('../common/utils').isSpace;


  module.exports = function heading(state, startLine, endLine, silent) {
    var ch, level, tmp, token,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    ch  = state.src.charCodeAt(pos);

    if (ch !== 0x23/* # */ || pos >= max) { return false; }

    // count heading level
    level = 1;
    ch = state.src.charCodeAt(++pos);
    while (ch === 0x23/* # */ && pos < max && level <= 6) {
      level++;
      ch = state.src.charCodeAt(++pos);
    }

    if (level > 6 || (pos < max && !isSpace(ch))) { return false; }

    if (silent) { return true; }

    // Let's cut tails like '    ###  ' from the end of string

    max = state.skipSpacesBack(max, pos);
    tmp = state.skipCharsBack(max, 0x23, pos); // #
    if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
      max = tmp;
    }

    state.line = startLine + 1;

    token        = state.push('heading_open', 'h' + String(level), 1);
    token.markup = '########'.slice(0, level);
    token.map    = [ startLine, state.line ];

    token          = state.push('inline', '', 0);
    token.content  = state.src.slice(pos, max).trim();
    token.map      = [ startLine, state.line ];
    token.children = [];

    token        = state.push('heading_close', 'h' + String(level), -1);
    token.markup = '########'.slice(0, level);

    return true;
  };

  },{"../common/utils":4}],22:[function(require,module,exports){

  var isSpace = require('../common/utils').isSpace;


  module.exports = function hr(state, startLine, endLine, silent) {
    var marker, cnt, ch, token,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    marker = state.src.charCodeAt(pos++);

    // Check hr marker
    if (marker !== 0x2A/* * */ &&
        marker !== 0x2D/* - */ &&
        marker !== 0x5F/* _ */) {
      return false;
    }

    // markers can be mixed with spaces, but there should be at least 3 of them

    cnt = 1;
    while (pos < max) {
      ch = state.src.charCodeAt(pos++);
      if (ch !== marker && !isSpace(ch)) { return false; }
      if (ch === marker) { cnt++; }
    }

    if (cnt < 3) { return false; }

    if (silent) { return true; }

    state.line = startLine + 1;

    token        = state.push('hr', 'hr', 0);
    token.map    = [ startLine, state.line ];
    token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

    return true;
  };

  },{"../common/utils":4}],23:[function(require,module,exports){


  var block_names = require('../common/html_blocks');
  var HTML_OPEN_CLOSE_TAG_RE = require('../common/html_re').HTML_OPEN_CLOSE_TAG_RE;

  // An array of opening and corresponding closing sequences for html tags,
  // last argument defines whether it can terminate a paragraph or not
  //
  var HTML_SEQUENCES = [
    [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true ],
    [ /^<!--/,        /-->/,   true ],
    [ /^<\?/,         /\?>/,   true ],
    [ /^<![A-Z]/,     />/,     true ],
    [ /^<!\[CDATA\[/, /\]\]>/, true ],
    [ new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
    [ new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false ]
  ];


  module.exports = function html_block(state, startLine, endLine, silent) {
    var i, nextLine, token, lineText,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    if (!state.md.options.html) { return false; }

    if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

    lineText = state.src.slice(pos, max);

    for (i = 0; i < HTML_SEQUENCES.length; i++) {
      if (HTML_SEQUENCES[i][0].test(lineText)) { break; }
    }

    if (i === HTML_SEQUENCES.length) { return false; }

    if (silent) {
      // true if this sequence can be a terminator, false otherwise
      return HTML_SEQUENCES[i][2];
    }

    nextLine = startLine + 1;

    // If we are here - we detected HTML block.
    // Let's roll down till block end.
    if (!HTML_SEQUENCES[i][1].test(lineText)) {
      for (; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) { break; }

        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        lineText = state.src.slice(pos, max);

        if (HTML_SEQUENCES[i][1].test(lineText)) {
          if (lineText.length !== 0) { nextLine++; }
          break;
        }
      }
    }

    state.line = nextLine;

    token         = state.push('html_block', '', 0);
    token.map     = [ startLine, nextLine ];
    token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

    return true;
  };

  },{"../common/html_blocks":2,"../common/html_re":3}],24:[function(require,module,exports){


  module.exports = function lheading(state, startLine, endLine/*, silent*/) {
    var content, terminate, i, l, token, pos, max, level, marker,
        nextLine = startLine + 1, oldParentType,
        terminatorRules = state.md.block.ruler.getRules('paragraph');

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    oldParentType = state.parentType;
    state.parentType = 'paragraph'; // use paragraph to match terminatorRules

    // jump line-by-line until empty one or EOF
    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      // this would be a code block normally, but after paragraph
      // it's considered a lazy continuation regardless of what's there
      if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

      //
      // Check for underline in setext header
      //
      if (state.sCount[nextLine] >= state.blkIndent) {
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];

        if (pos < max) {
          marker = state.src.charCodeAt(pos);

          if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
            pos = state.skipChars(pos, marker);
            pos = state.skipSpaces(pos);

            if (pos >= max) {
              level = (marker === 0x3D/* = */ ? 1 : 2);
              break;
            }
          }
        }
      }

      // quirk for blockquotes, this line should already be checked by that rule
      if (state.sCount[nextLine] < 0) { continue; }

      // Some tags can terminate paragraph without empty line.
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) { break; }
    }

    if (!level) {
      // Didn't find valid underline
      return false;
    }

    content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

    state.line = nextLine + 1;

    token          = state.push('heading_open', 'h' + String(level), 1);
    token.markup   = String.fromCharCode(marker);
    token.map      = [ startLine, state.line ];

    token          = state.push('inline', '', 0);
    token.content  = content;
    token.map      = [ startLine, state.line - 1 ];
    token.children = [];

    token          = state.push('heading_close', 'h' + String(level), -1);
    token.markup   = String.fromCharCode(marker);

    state.parentType = oldParentType;

    return true;
  };

  },{}],25:[function(require,module,exports){

  var isSpace = require('../common/utils').isSpace;


  // Search `[-+*][\n ]`, returns next pos after marker on success
  // or -1 on fail.
  function skipBulletListMarker(state, startLine) {
    var marker, pos, max, ch;

    pos = state.bMarks[startLine] + state.tShift[startLine];
    max = state.eMarks[startLine];

    marker = state.src.charCodeAt(pos++);
    // Check bullet
    if (marker !== 0x2A/* * */ &&
        marker !== 0x2D/* - */ &&
        marker !== 0x2B/* + */) {
      return -1;
    }

    if (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (!isSpace(ch)) {
        // " -test " - is not a list item
        return -1;
      }
    }

    return pos;
  }

  // Search `\d+[.)][\n ]`, returns next pos after marker on success
  // or -1 on fail.
  function skipOrderedListMarker(state, startLine) {
    var ch,
        start = state.bMarks[startLine] + state.tShift[startLine],
        pos = start,
        max = state.eMarks[startLine];

    // List marker should have at least 2 chars (digit + dot)
    if (pos + 1 >= max) { return -1; }

    ch = state.src.charCodeAt(pos++);

    if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

    for (;;) {
      // EOL -> fail
      if (pos >= max) { return -1; }

      ch = state.src.charCodeAt(pos++);

      if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {

        // List marker should have no more than 9 digits
        // (prevents integer overflow in browsers)
        if (pos - start >= 10) { return -1; }

        continue;
      }

      // found valid marker
      if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
        break;
      }

      return -1;
    }


    if (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (!isSpace(ch)) {
        // " 1.test " - is not a list item
        return -1;
      }
    }
    return pos;
  }

  function markTightParagraphs(state, idx) {
    var i, l,
        level = state.level + 2;

    for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
        state.tokens[i + 2].hidden = true;
        state.tokens[i].hidden = true;
        i += 2;
      }
    }
  }


  module.exports = function list(state, startLine, endLine, silent) {
    var ch,
        contentStart,
        i,
        indent,
        indentAfterMarker,
        initial,
        isOrdered,
        itemLines,
        l,
        listLines,
        listTokIdx,
        markerCharCode,
        markerValue,
        max,
        nextLine,
        offset,
        oldIndent,
        oldLIndent,
        oldParentType,
        oldTShift,
        oldTight,
        pos,
        posAfterMarker,
        prevEmptyEnd,
        start,
        terminate,
        terminatorRules,
        token,
        isTerminatingParagraph = false,
        tight = true;

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    // limit conditions when list can interrupt
    // a paragraph (validation mode only)
    if (silent && state.parentType === 'paragraph') {
      // Next list item should still terminate previous list item;
      //
      // This code can fail if plugins use blkIndent as well as lists,
      // but I hope the spec gets fixed long before that happens.
      //
      if (state.tShift[startLine] >= state.blkIndent) {
        isTerminatingParagraph = true;
      }
    }

    // Detect list type and position after marker
    if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
      isOrdered = true;
      start = state.bMarks[startLine] + state.tShift[startLine];
      markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

      // If we're starting a new ordered list right after
      // a paragraph, it should start with 1.
      if (isTerminatingParagraph && markerValue !== 1) return false;

    } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
      isOrdered = false;

    } else {
      return false;
    }

    // If we're starting a new unordered list right after
    // a paragraph, first line should not be empty.
    if (isTerminatingParagraph) {
      if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
    }

    // We should terminate list on style change. Remember first one to compare.
    markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

    // For validation mode we can terminate immediately
    if (silent) { return true; }

    // Start list
    listTokIdx = state.tokens.length;

    if (isOrdered) {
      token       = state.push('ordered_list_open', 'ol', 1);
      if (markerValue !== 1) {
        token.attrs = [ [ 'start', markerValue ] ];
      }

    } else {
      token       = state.push('bullet_list_open', 'ul', 1);
    }

    token.map    = listLines = [ startLine, 0 ];
    token.markup = String.fromCharCode(markerCharCode);

    //
    // Iterate list items
    //

    nextLine = startLine;
    prevEmptyEnd = false;
    terminatorRules = state.md.block.ruler.getRules('list');

    oldParentType = state.parentType;
    state.parentType = 'list';

    while (nextLine < endLine) {
      pos = posAfterMarker;
      max = state.eMarks[nextLine];

      initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (ch === 0x09) {
          offset += 4 - (offset + state.bsCount[nextLine]) % 4;
        } else if (ch === 0x20) {
          offset++;
        } else {
          break;
        }

        pos++;
      }

      contentStart = pos;

      if (contentStart >= max) {
        // trimming space in "-    \n  3" case, indent is 1 here
        indentAfterMarker = 1;
      } else {
        indentAfterMarker = offset - initial;
      }

      // If we have more than 4 spaces, the indent is 1
      // (the rest is just indented code block)
      if (indentAfterMarker > 4) { indentAfterMarker = 1; }

      // "  -  test"
      //  ^^^^^ - calculating total length of this thing
      indent = initial + indentAfterMarker;

      // Run subparser & write tokens
      token        = state.push('list_item_open', 'li', 1);
      token.markup = String.fromCharCode(markerCharCode);
      token.map    = itemLines = [ startLine, 0 ];

      oldIndent = state.blkIndent;
      oldTight = state.tight;
      oldTShift = state.tShift[startLine];
      oldLIndent = state.sCount[startLine];
      state.blkIndent = indent;
      state.tight = true;
      state.tShift[startLine] = contentStart - state.bMarks[startLine];
      state.sCount[startLine] = offset;

      if (contentStart >= max && state.isEmpty(startLine + 1)) {
        // workaround for this case
        // (list item is empty, list terminates before "foo"):
        // ~~~~~~~~
        //   -
        //
        //     foo
        // ~~~~~~~~
        state.line = Math.min(state.line + 2, endLine);
      } else {
        state.md.block.tokenize(state, startLine, endLine, true);
      }

      // If any of list item is tight, mark list as tight
      if (!state.tight || prevEmptyEnd) {
        tight = false;
      }
      // Item become loose if finish with empty line,
      // but we should filter last element, because it means list finish
      prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

      state.blkIndent = oldIndent;
      state.tShift[startLine] = oldTShift;
      state.sCount[startLine] = oldLIndent;
      state.tight = oldTight;

      token        = state.push('list_item_close', 'li', -1);
      token.markup = String.fromCharCode(markerCharCode);

      nextLine = startLine = state.line;
      itemLines[1] = nextLine;
      contentStart = state.bMarks[startLine];

      if (nextLine >= endLine) { break; }

      //
      // Try to check if list is terminated or continued.
      //
      if (state.sCount[nextLine] < state.blkIndent) { break; }

      // fail if terminating block found
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) { break; }

      // fail if list has another type
      if (isOrdered) {
        posAfterMarker = skipOrderedListMarker(state, nextLine);
        if (posAfterMarker < 0) { break; }
      } else {
        posAfterMarker = skipBulletListMarker(state, nextLine);
        if (posAfterMarker < 0) { break; }
      }

      if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
    }

    // Finalize list
    if (isOrdered) {
      token = state.push('ordered_list_close', 'ol', -1);
    } else {
      token = state.push('bullet_list_close', 'ul', -1);
    }
    token.markup = String.fromCharCode(markerCharCode);

    listLines[1] = nextLine;
    state.line = nextLine;

    state.parentType = oldParentType;

    // mark paragraphs tight if needed
    if (tight) {
      markTightParagraphs(state, listTokIdx);
    }

    return true;
  };

  },{"../common/utils":4}],26:[function(require,module,exports){


  module.exports = function paragraph(state, startLine/*, endLine*/) {
    var content, terminate, i, l, token, oldParentType,
        nextLine = startLine + 1,
        terminatorRules = state.md.block.ruler.getRules('paragraph'),
        endLine = state.lineMax;

    oldParentType = state.parentType;
    state.parentType = 'paragraph';

    // jump line-by-line until empty one or EOF
    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      // this would be a code block normally, but after paragraph
      // it's considered a lazy continuation regardless of what's there
      if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

      // quirk for blockquotes, this line should already be checked by that rule
      if (state.sCount[nextLine] < 0) { continue; }

      // Some tags can terminate paragraph without empty line.
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) { break; }
    }

    content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

    state.line = nextLine;

    token          = state.push('paragraph_open', 'p', 1);
    token.map      = [ startLine, state.line ];

    token          = state.push('inline', '', 0);
    token.content  = content;
    token.map      = [ startLine, state.line ];
    token.children = [];

    token          = state.push('paragraph_close', 'p', -1);

    state.parentType = oldParentType;

    return true;
  };

  },{}],27:[function(require,module,exports){


  var normalizeReference   = require('../common/utils').normalizeReference;
  var isSpace              = require('../common/utils').isSpace;


  module.exports = function reference(state, startLine, _endLine, silent) {
    var ch,
        destEndPos,
        destEndLineNo,
        endLine,
        href,
        i,
        l,
        label,
        labelEnd,
        oldParentType,
        res,
        start,
        str,
        terminate,
        terminatorRules,
        title,
        lines = 0,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine],
        nextLine = startLine + 1;

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

    if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

    // Simple check to quickly interrupt scan on [link](url) at the start of line.
    // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
    while (++pos < max) {
      if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
          state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
        if (pos + 1 === max) { return false; }
        if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
        break;
      }
    }

    endLine = state.lineMax;

    // jump line-by-line until empty one or EOF
    terminatorRules = state.md.block.ruler.getRules('reference');

    oldParentType = state.parentType;
    state.parentType = 'reference';

    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      // this would be a code block normally, but after paragraph
      // it's considered a lazy continuation regardless of what's there
      if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

      // quirk for blockquotes, this line should already be checked by that rule
      if (state.sCount[nextLine] < 0) { continue; }

      // Some tags can terminate paragraph without empty line.
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) { break; }
    }

    str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
    max = str.length;

    for (pos = 1; pos < max; pos++) {
      ch = str.charCodeAt(pos);
      if (ch === 0x5B /* [ */) {
        return false;
      } else if (ch === 0x5D /* ] */) {
        labelEnd = pos;
        break;
      } else if (ch === 0x0A /* \n */) {
        lines++;
      } else if (ch === 0x5C /* \ */) {
        pos++;
        if (pos < max && str.charCodeAt(pos) === 0x0A) {
          lines++;
        }
      }
    }

    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

    // [label]:   destination   'title'
    //         ^^^ skip optional whitespace here
    for (pos = labelEnd + 2; pos < max; pos++) {
      ch = str.charCodeAt(pos);
      if (ch === 0x0A) {
        lines++;
      } else if (isSpace(ch)) ; else {
        break;
      }
    }

    // [label]:   destination   'title'
    //            ^^^^^^^^^^^ parse this
    res = state.md.helpers.parseLinkDestination(str, pos, max);
    if (!res.ok) { return false; }

    href = state.md.normalizeLink(res.str);
    if (!state.md.validateLink(href)) { return false; }

    pos = res.pos;
    lines += res.lines;

    // save cursor state, we could require to rollback later
    destEndPos = pos;
    destEndLineNo = lines;

    // [label]:   destination   'title'
    //                       ^^^ skipping those spaces
    start = pos;
    for (; pos < max; pos++) {
      ch = str.charCodeAt(pos);
      if (ch === 0x0A) {
        lines++;
      } else if (isSpace(ch)) ; else {
        break;
      }
    }

    // [label]:   destination   'title'
    //                          ^^^^^^^ parse this
    res = state.md.helpers.parseLinkTitle(str, pos, max);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;
      lines += res.lines;
    } else {
      title = '';
      pos = destEndPos;
      lines = destEndLineNo;
    }

    // skip trailing spaces until the rest of the line
    while (pos < max) {
      ch = str.charCodeAt(pos);
      if (!isSpace(ch)) { break; }
      pos++;
    }

    if (pos < max && str.charCodeAt(pos) !== 0x0A) {
      if (title) {
        // garbage at the end of the line after title,
        // but it could still be a valid reference if we roll back
        title = '';
        pos = destEndPos;
        lines = destEndLineNo;
        while (pos < max) {
          ch = str.charCodeAt(pos);
          if (!isSpace(ch)) { break; }
          pos++;
        }
      }
    }

    if (pos < max && str.charCodeAt(pos) !== 0x0A) {
      // garbage at the end of the line
      return false;
    }

    label = normalizeReference(str.slice(1, labelEnd));
    if (!label) {
      // CommonMark 0.20 disallows empty labels
      return false;
    }

    // Reference can not terminate anything. This check is for safety only.
    /*istanbul ignore if*/
    if (silent) { return true; }

    if (typeof state.env.references === 'undefined') {
      state.env.references = {};
    }
    if (typeof state.env.references[label] === 'undefined') {
      state.env.references[label] = { title: title, href: href };
    }

    state.parentType = oldParentType;

    state.line = startLine + lines + 1;
    return true;
  };

  },{"../common/utils":4}],28:[function(require,module,exports){

  var Token = require('../token');
  var isSpace = require('../common/utils').isSpace;


  function StateBlock(src, md, env, tokens) {
    var ch, s, start, pos, len, indent, offset, indent_found;

    this.src = src;

    // link to parser instance
    this.md     = md;

    this.env = env;

    //
    // Internal state vartiables
    //

    this.tokens = tokens;

    this.bMarks = [];  // line begin offsets for fast jumps
    this.eMarks = [];  // line end offsets for fast jumps
    this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
    this.sCount = [];  // indents for each line (tabs expanded)

    // An amount of virtual spaces (tabs expanded) between beginning
    // of each line (bMarks) and real beginning of that line.
    //
    // It exists only as a hack because blockquotes override bMarks
    // losing information in the process.
    //
    // It's used only when expanding tabs, you can think about it as
    // an initial tab length, e.g. bsCount=21 applied to string `\t123`
    // means first tab should be expanded to 4-21%4 === 3 spaces.
    //
    this.bsCount = [];

    // block parser variables
    this.blkIndent  = 0; // required block content indent
                         // (for example, if we are in list)
    this.line       = 0; // line index in src
    this.lineMax    = 0; // lines count
    this.tight      = false;  // loose/tight mode for lists
    this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)

    // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
    // used in lists to determine if they interrupt a paragraph
    this.parentType = 'root';

    this.level = 0;

    // renderer
    this.result = '';

    // Create caches
    // Generate markers.
    s = this.src;
    indent_found = false;

    for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
      ch = s.charCodeAt(pos);

      if (!indent_found) {
        if (isSpace(ch)) {
          indent++;

          if (ch === 0x09) {
            offset += 4 - offset % 4;
          } else {
            offset++;
          }
          continue;
        } else {
          indent_found = true;
        }
      }

      if (ch === 0x0A || pos === len - 1) {
        if (ch !== 0x0A) { pos++; }
        this.bMarks.push(start);
        this.eMarks.push(pos);
        this.tShift.push(indent);
        this.sCount.push(offset);
        this.bsCount.push(0);

        indent_found = false;
        indent = 0;
        offset = 0;
        start = pos + 1;
      }
    }

    // Push fake entry to simplify cache bounds checks
    this.bMarks.push(s.length);
    this.eMarks.push(s.length);
    this.tShift.push(0);
    this.sCount.push(0);
    this.bsCount.push(0);

    this.lineMax = this.bMarks.length - 1; // don't count last fake line
  }

  // Push new token to "stream".
  //
  StateBlock.prototype.push = function (type, tag, nesting) {
    var token = new Token(type, tag, nesting);
    token.block = true;

    if (nesting < 0) { this.level--; }
    token.level = this.level;
    if (nesting > 0) { this.level++; }

    this.tokens.push(token);
    return token;
  };

  StateBlock.prototype.isEmpty = function isEmpty(line) {
    return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
  };

  StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
    for (var max = this.lineMax; from < max; from++) {
      if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
        break;
      }
    }
    return from;
  };

  // Skip spaces from given position.
  StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
    var ch;

    for (var max = this.src.length; pos < max; pos++) {
      ch = this.src.charCodeAt(pos);
      if (!isSpace(ch)) { break; }
    }
    return pos;
  };

  // Skip spaces from given position in reverse.
  StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
    if (pos <= min) { return pos; }

    while (pos > min) {
      if (!isSpace(this.src.charCodeAt(--pos))) { return pos + 1; }
    }
    return pos;
  };

  // Skip char codes from given position
  StateBlock.prototype.skipChars = function skipChars(pos, code) {
    for (var max = this.src.length; pos < max; pos++) {
      if (this.src.charCodeAt(pos) !== code) { break; }
    }
    return pos;
  };

  // Skip char codes reverse from given position - 1
  StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
    if (pos <= min) { return pos; }

    while (pos > min) {
      if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
    }
    return pos;
  };

  // cut lines range from source.
  StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
    var i, lineIndent, ch, first, last, queue, lineStart,
        line = begin;

    if (begin >= end) {
      return '';
    }

    queue = new Array(end - begin);

    for (i = 0; line < end; line++, i++) {
      lineIndent = 0;
      lineStart = first = this.bMarks[line];

      if (line + 1 < end || keepLastLF) {
        // No need for bounds check because we have fake entry on tail.
        last = this.eMarks[line] + 1;
      } else {
        last = this.eMarks[line];
      }

      while (first < last && lineIndent < indent) {
        ch = this.src.charCodeAt(first);

        if (isSpace(ch)) {
          if (ch === 0x09) {
            lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
          } else {
            lineIndent++;
          }
        } else if (first - lineStart < this.tShift[line]) {
          // patched tShift masked characters to look like spaces (blockquotes, list markers)
          lineIndent++;
        } else {
          break;
        }

        first++;
      }

      if (lineIndent > indent) {
        // partially expanding tabs in code blocks, e.g '\t\tfoobar'
        // with indent=2 becomes '  \tfoobar'
        queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
      } else {
        queue[i] = this.src.slice(first, last);
      }
    }

    return queue.join('');
  };

  // re-export Token class to use in block rules
  StateBlock.prototype.Token = Token;


  module.exports = StateBlock;

  },{"../common/utils":4,"../token":51}],29:[function(require,module,exports){

  var isSpace = require('../common/utils').isSpace;


  function getLine(state, line) {
    var pos = state.bMarks[line] + state.blkIndent,
        max = state.eMarks[line];

    return state.src.substr(pos, max - pos);
  }

  function escapedSplit(str) {
    var result = [],
        pos = 0,
        max = str.length,
        ch,
        escapes = 0,
        lastPos = 0,
        backTicked = false,
        lastBackTick = 0;

    ch  = str.charCodeAt(pos);

    while (pos < max) {
      if (ch === 0x60/* ` */) {
        if (backTicked) {
          // make \` close code sequence, but not open it;
          // the reason is: `\` is correct code block
          backTicked = false;
          lastBackTick = pos;
        } else if (escapes % 2 === 0) {
          backTicked = true;
          lastBackTick = pos;
        }
      } else if (ch === 0x7c/* | */ && (escapes % 2 === 0) && !backTicked) {
        result.push(str.substring(lastPos, pos));
        lastPos = pos + 1;
      }

      if (ch === 0x5c/* \ */) {
        escapes++;
      } else {
        escapes = 0;
      }

      pos++;

      // If there was an un-closed backtick, go back to just after
      // the last backtick, but as if it was a normal character
      if (pos === max && backTicked) {
        backTicked = false;
        pos = lastBackTick + 1;
      }

      ch = str.charCodeAt(pos);
    }

    result.push(str.substring(lastPos));

    return result;
  }


  module.exports = function table(state, startLine, endLine, silent) {
    var ch, lineText, pos, i, nextLine, columns, columnCount, token,
        aligns, t, tableLines, tbodyLines;

    // should have at least two lines
    if (startLine + 2 > endLine) { return false; }

    nextLine = startLine + 1;

    if (state.sCount[nextLine] < state.blkIndent) { return false; }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

    // first character of the second line should be '|', '-', ':',
    // and no other characters are allowed but spaces;
    // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    if (pos >= state.eMarks[nextLine]) { return false; }

    ch = state.src.charCodeAt(pos++);
    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) { return false; }

    while (pos < state.eMarks[nextLine]) {
      ch = state.src.charCodeAt(pos);

      if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) { return false; }

      pos++;
    }

    lineText = getLine(state, startLine + 1);

    columns = lineText.split('|');
    aligns = [];
    for (i = 0; i < columns.length; i++) {
      t = columns[i].trim();
      if (!t) {
        // allow empty columns before and after table, but not in between columns;
        // e.g. allow ` |---| `, disallow ` ---||--- `
        if (i === 0 || i === columns.length - 1) {
          continue;
        } else {
          return false;
        }
      }

      if (!/^:?-+:?$/.test(t)) { return false; }
      if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
        aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
      } else if (t.charCodeAt(0) === 0x3A/* : */) {
        aligns.push('left');
      } else {
        aligns.push('');
      }
    }

    lineText = getLine(state, startLine).trim();
    if (lineText.indexOf('|') === -1) { return false; }
    if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
    columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

    // header row will define an amount of columns in the entire table,
    // and align row shouldn't be smaller than that (the rest of the rows can)
    columnCount = columns.length;
    if (columnCount > aligns.length) { return false; }

    if (silent) { return true; }

    token     = state.push('table_open', 'table', 1);
    token.map = tableLines = [ startLine, 0 ];

    token     = state.push('thead_open', 'thead', 1);
    token.map = [ startLine, startLine + 1 ];

    token     = state.push('tr_open', 'tr', 1);
    token.map = [ startLine, startLine + 1 ];

    for (i = 0; i < columns.length; i++) {
      token          = state.push('th_open', 'th', 1);
      token.map      = [ startLine, startLine + 1 ];
      if (aligns[i]) {
        token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
      }

      token          = state.push('inline', '', 0);
      token.content  = columns[i].trim();
      token.map      = [ startLine, startLine + 1 ];
      token.children = [];

      token          = state.push('th_close', 'th', -1);
    }

    token     = state.push('tr_close', 'tr', -1);
    token     = state.push('thead_close', 'thead', -1);

    token     = state.push('tbody_open', 'tbody', 1);
    token.map = tbodyLines = [ startLine + 2, 0 ];

    for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break; }

      lineText = getLine(state, nextLine).trim();
      if (lineText.indexOf('|') === -1) { break; }
      if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
      columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

      token = state.push('tr_open', 'tr', 1);
      for (i = 0; i < columnCount; i++) {
        token          = state.push('td_open', 'td', 1);
        if (aligns[i]) {
          token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
        }

        token          = state.push('inline', '', 0);
        token.content  = columns[i] ? columns[i].trim() : '';
        token.children = [];

        token          = state.push('td_close', 'td', -1);
      }
      token = state.push('tr_close', 'tr', -1);
    }
    token = state.push('tbody_close', 'tbody', -1);
    token = state.push('table_close', 'table', -1);

    tableLines[1] = tbodyLines[1] = nextLine;
    state.line = nextLine;
    return true;
  };

  },{"../common/utils":4}],30:[function(require,module,exports){


  module.exports = function block(state) {
    var token;

    if (state.inlineMode) {
      token          = new state.Token('inline', '', 0);
      token.content  = state.src;
      token.map      = [ 0, 1 ];
      token.children = [];
      state.tokens.push(token);
    } else {
      state.md.block.parse(state.src, state.md, state.env, state.tokens);
    }
  };

  },{}],31:[function(require,module,exports){

  module.exports = function inline(state) {
    var tokens = state.tokens, tok, i, l;

    // Parse inlines
    for (i = 0, l = tokens.length; i < l; i++) {
      tok = tokens[i];
      if (tok.type === 'inline') {
        state.md.inline.parse(tok.content, state.md, state.env, tok.children);
      }
    }
  };

  },{}],32:[function(require,module,exports){


  var arrayReplaceAt = require('../common/utils').arrayReplaceAt;


  function isLinkOpen(str) {
    return /^<a[>\s]/i.test(str);
  }
  function isLinkClose(str) {
    return /^<\/a\s*>/i.test(str);
  }


  module.exports = function linkify(state) {
    var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
        level, htmlLinkLevel, url, fullUrl, urlText,
        blockTokens = state.tokens,
        links;

    if (!state.md.options.linkify) { return; }

    for (j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== 'inline' ||
          !state.md.linkify.pretest(blockTokens[j].content)) {
        continue;
      }

      tokens = blockTokens[j].children;

      htmlLinkLevel = 0;

      // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match
      for (i = tokens.length - 1; i >= 0; i--) {
        currentToken = tokens[i];

        // Skip content of markdown links
        if (currentToken.type === 'link_close') {
          i--;
          while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
            i--;
          }
          continue;
        }

        // Skip content of html tag links
        if (currentToken.type === 'html_inline') {
          if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
            htmlLinkLevel--;
          }
          if (isLinkClose(currentToken.content)) {
            htmlLinkLevel++;
          }
        }
        if (htmlLinkLevel > 0) { continue; }

        if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

          text = currentToken.content;
          links = state.md.linkify.match(text);

          // Now split string to nodes
          nodes = [];
          level = currentToken.level;
          lastPos = 0;

          for (ln = 0; ln < links.length; ln++) {

            url = links[ln].url;
            fullUrl = state.md.normalizeLink(url);
            if (!state.md.validateLink(fullUrl)) { continue; }

            urlText = links[ln].text;

            // Linkifier might send raw hostnames like "example.com", where url
            // starts with domain name. So we prepend http:// in those cases,
            // and remove it afterwards.
            //
            if (!links[ln].schema) {
              urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
            } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
              urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
            } else {
              urlText = state.md.normalizeLinkText(urlText);
            }

            pos = links[ln].index;

            if (pos > lastPos) {
              token         = new state.Token('text', '', 0);
              token.content = text.slice(lastPos, pos);
              token.level   = level;
              nodes.push(token);
            }

            token         = new state.Token('link_open', 'a', 1);
            token.attrs   = [ [ 'href', fullUrl ] ];
            token.level   = level++;
            token.markup  = 'linkify';
            token.info    = 'auto';
            nodes.push(token);

            token         = new state.Token('text', '', 0);
            token.content = urlText;
            token.level   = level;
            nodes.push(token);

            token         = new state.Token('link_close', 'a', -1);
            token.level   = --level;
            token.markup  = 'linkify';
            token.info    = 'auto';
            nodes.push(token);

            lastPos = links[ln].lastIndex;
          }
          if (lastPos < text.length) {
            token         = new state.Token('text', '', 0);
            token.content = text.slice(lastPos);
            token.level   = level;
            nodes.push(token);
          }

          // replace current node
          blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
        }
      }
    }
  };

  },{"../common/utils":4}],33:[function(require,module,exports){


  var NEWLINES_RE  = /\r[\n\u0085]?|[\u2424\u2028\u0085]/g;
  var NULL_RE      = /\u0000/g;


  module.exports = function inline(state) {
    var str;

    // Normalize newlines
    str = state.src.replace(NEWLINES_RE, '\n');

    // Replace NULL characters
    str = str.replace(NULL_RE, '\uFFFD');

    state.src = str;
  };

  },{}],34:[function(require,module,exports){

  // TODO:
  // - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
  // - miltiplication 2 x 4 -> 2 × 4

  var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

  // Workaround for phantomjs - need regex without /g flag,
  // or root check will fail every second time
  var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;

  var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
  var SCOPED_ABBR = {
    c: '©',
    r: '®',
    p: '§',
    tm: '™'
  };

  function replaceFn(match, name) {
    return SCOPED_ABBR[name.toLowerCase()];
  }

  function replace_scoped(inlineTokens) {
    var i, token, inside_autolink = 0;

    for (i = inlineTokens.length - 1; i >= 0; i--) {
      token = inlineTokens[i];

      if (token.type === 'text' && !inside_autolink) {
        token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
      }

      if (token.type === 'link_open' && token.info === 'auto') {
        inside_autolink--;
      }

      if (token.type === 'link_close' && token.info === 'auto') {
        inside_autolink++;
      }
    }
  }

  function replace_rare(inlineTokens) {
    var i, token, inside_autolink = 0;

    for (i = inlineTokens.length - 1; i >= 0; i--) {
      token = inlineTokens[i];

      if (token.type === 'text' && !inside_autolink) {
        if (RARE_RE.test(token.content)) {
          token.content = token.content
                      .replace(/\+-/g, '±')
                      // .., ..., ....... -> …
                      // but ?..... & !..... -> ?.. & !..
                      .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
                      .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
                      // em-dash
                      .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
                      // en-dash
                      .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2')
                      .replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
        }
      }

      if (token.type === 'link_open' && token.info === 'auto') {
        inside_autolink--;
      }

      if (token.type === 'link_close' && token.info === 'auto') {
        inside_autolink++;
      }
    }
  }


  module.exports = function replace(state) {
    var blkIdx;

    if (!state.md.options.typographer) { return; }

    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

      if (state.tokens[blkIdx].type !== 'inline') { continue; }

      if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
        replace_scoped(state.tokens[blkIdx].children);
      }

      if (RARE_RE.test(state.tokens[blkIdx].content)) {
        replace_rare(state.tokens[blkIdx].children);
      }

    }
  };

  },{}],35:[function(require,module,exports){


  var isWhiteSpace   = require('../common/utils').isWhiteSpace;
  var isPunctChar    = require('../common/utils').isPunctChar;
  var isMdAsciiPunct = require('../common/utils').isMdAsciiPunct;

  var QUOTE_TEST_RE = /['"]/;
  var QUOTE_RE = /['"]/g;
  var APOSTROPHE = '\u2019'; /* ’ */


  function replaceAt(str, index, ch) {
    return str.substr(0, index) + ch + str.substr(index + 1);
  }

  function process_inlines(tokens, state) {
    var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
        isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
        canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;

    stack = [];

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];

      thisLevel = tokens[i].level;

      for (j = stack.length - 1; j >= 0; j--) {
        if (stack[j].level <= thisLevel) { break; }
      }
      stack.length = j + 1;

      if (token.type !== 'text') { continue; }

      text = token.content;
      pos = 0;
      max = text.length;

      /*eslint no-labels:0,block-scoped-var:0*/
      OUTER:
      while (pos < max) {
        QUOTE_RE.lastIndex = pos;
        t = QUOTE_RE.exec(text);
        if (!t) { break; }

        canOpen = canClose = true;
        pos = t.index + 1;
        isSingle = (t[0] === "'");

        // Find previous character,
        // default to space if it's the beginning of the line
        //
        lastChar = 0x20;

        if (t.index - 1 >= 0) {
          lastChar = text.charCodeAt(t.index - 1);
        } else {
          for (j = i - 1; j >= 0; j--) {
            if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
            if (tokens[j].type !== 'text') continue;

            lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
            break;
          }
        }

        // Find next character,
        // default to space if it's the end of the line
        //
        nextChar = 0x20;

        if (pos < max) {
          nextChar = text.charCodeAt(pos);
        } else {
          for (j = i + 1; j < tokens.length; j++) {
            if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
            if (tokens[j].type !== 'text') continue;

            nextChar = tokens[j].content.charCodeAt(0);
            break;
          }
        }

        isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
        isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

        isLastWhiteSpace = isWhiteSpace(lastChar);
        isNextWhiteSpace = isWhiteSpace(nextChar);

        if (isNextWhiteSpace) {
          canOpen = false;
        } else if (isNextPunctChar) {
          if (!(isLastWhiteSpace || isLastPunctChar)) {
            canOpen = false;
          }
        }

        if (isLastWhiteSpace) {
          canClose = false;
        } else if (isLastPunctChar) {
          if (!(isNextWhiteSpace || isNextPunctChar)) {
            canClose = false;
          }
        }

        if (nextChar === 0x22 /* " */ && t[0] === '"') {
          if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
            // special case: 1"" - count first quote as an inch
            canClose = canOpen = false;
          }
        }

        if (canOpen && canClose) {
          // treat this as the middle of the word
          canOpen = false;
          canClose = isNextPunctChar;
        }

        if (!canOpen && !canClose) {
          // middle of word
          if (isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
          continue;
        }

        if (canClose) {
          // this could be a closing quote, rewind the stack to get a match
          for (j = stack.length - 1; j >= 0; j--) {
            item = stack[j];
            if (stack[j].level < thisLevel) { break; }
            if (item.single === isSingle && stack[j].level === thisLevel) {
              item = stack[j];

              if (isSingle) {
                openQuote = state.md.options.quotes[2];
                closeQuote = state.md.options.quotes[3];
              } else {
                openQuote = state.md.options.quotes[0];
                closeQuote = state.md.options.quotes[1];
              }

              // replace token.content *before* tokens[item.token].content,
              // because, if they are pointing at the same token, replaceAt
              // could mess up indices when quote length != 1
              token.content = replaceAt(token.content, t.index, closeQuote);
              tokens[item.token].content = replaceAt(
                tokens[item.token].content, item.pos, openQuote);

              pos += closeQuote.length - 1;
              if (item.token === i) { pos += openQuote.length - 1; }

              text = token.content;
              max = text.length;

              stack.length = j;
              continue OUTER;
            }
          }
        }

        if (canOpen) {
          stack.push({
            token: i,
            pos: t.index,
            single: isSingle,
            level: thisLevel
          });
        } else if (canClose && isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
      }
    }
  }


  module.exports = function smartquotes(state) {
    /*eslint max-depth:0*/
    var blkIdx;

    if (!state.md.options.typographer) { return; }

    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

      if (state.tokens[blkIdx].type !== 'inline' ||
          !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
        continue;
      }

      process_inlines(state.tokens[blkIdx].children, state);
    }
  };

  },{"../common/utils":4}],36:[function(require,module,exports){

  var Token = require('../token');


  function StateCore(src, md, env) {
    this.src = src;
    this.env = env;
    this.tokens = [];
    this.inlineMode = false;
    this.md = md; // link to parser instance
  }

  // re-export Token class to use in core rules
  StateCore.prototype.Token = Token;


  module.exports = StateCore;

  },{"../token":51}],37:[function(require,module,exports){


  /*eslint max-len:0*/
  var EMAIL_RE    = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
  var AUTOLINK_RE = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;


  module.exports = function autolink(state, silent) {
    var tail, linkMatch, emailMatch, url, fullUrl, token,
        pos = state.pos;

    if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

    tail = state.src.slice(pos);

    if (tail.indexOf('>') < 0) { return false; }

    if (AUTOLINK_RE.test(tail)) {
      linkMatch = tail.match(AUTOLINK_RE);

      url = linkMatch[0].slice(1, -1);
      fullUrl = state.md.normalizeLink(url);
      if (!state.md.validateLink(fullUrl)) { return false; }

      if (!silent) {
        token         = state.push('link_open', 'a', 1);
        token.attrs   = [ [ 'href', fullUrl ] ];
        token.markup  = 'autolink';
        token.info    = 'auto';

        token         = state.push('text', '', 0);
        token.content = state.md.normalizeLinkText(url);

        token         = state.push('link_close', 'a', -1);
        token.markup  = 'autolink';
        token.info    = 'auto';
      }

      state.pos += linkMatch[0].length;
      return true;
    }

    if (EMAIL_RE.test(tail)) {
      emailMatch = tail.match(EMAIL_RE);

      url = emailMatch[0].slice(1, -1);
      fullUrl = state.md.normalizeLink('mailto:' + url);
      if (!state.md.validateLink(fullUrl)) { return false; }

      if (!silent) {
        token         = state.push('link_open', 'a', 1);
        token.attrs   = [ [ 'href', fullUrl ] ];
        token.markup  = 'autolink';
        token.info    = 'auto';

        token         = state.push('text', '', 0);
        token.content = state.md.normalizeLinkText(url);

        token         = state.push('link_close', 'a', -1);
        token.markup  = 'autolink';
        token.info    = 'auto';
      }

      state.pos += emailMatch[0].length;
      return true;
    }

    return false;
  };

  },{}],38:[function(require,module,exports){

  module.exports = function backtick(state, silent) {
    var start, max, marker, matchStart, matchEnd, token,
        pos = state.pos,
        ch = state.src.charCodeAt(pos);

    if (ch !== 0x60/* ` */) { return false; }

    start = pos;
    pos++;
    max = state.posMax;

    while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

    marker = state.src.slice(start, pos);

    matchStart = matchEnd = pos;

    while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
      matchEnd = matchStart + 1;

      while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

      if (matchEnd - matchStart === marker.length) {
        if (!silent) {
          token         = state.push('code_inline', 'code', 0);
          token.markup  = marker;
          token.content = state.src.slice(pos, matchStart)
                                   .replace(/[ \n]+/g, ' ')
                                   .trim();
        }
        state.pos = matchEnd;
        return true;
      }
    }

    if (!silent) { state.pending += marker; }
    state.pos += marker.length;
    return true;
  };

  },{}],39:[function(require,module,exports){


  module.exports = function link_pairs(state) {
    var i, j, lastDelim, currDelim,
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      lastDelim = delimiters[i];

      if (!lastDelim.close) { continue; }

      j = i - lastDelim.jump - 1;

      while (j >= 0) {
        currDelim = delimiters[j];

        if (currDelim.open &&
            currDelim.marker === lastDelim.marker &&
            currDelim.end < 0 &&
            currDelim.level === lastDelim.level) {

          // typeofs are for backward compatibility with plugins
          var odd_match = (currDelim.close || lastDelim.open) &&
                          typeof currDelim.length !== 'undefined' &&
                          typeof lastDelim.length !== 'undefined' &&
                          (currDelim.length + lastDelim.length) % 3 === 0;

          if (!odd_match) {
            lastDelim.jump = i - j;
            lastDelim.open = false;
            currDelim.end  = i;
            currDelim.jump = 0;
            break;
          }
        }

        j -= currDelim.jump + 1;
      }
    }
  };

  },{}],40:[function(require,module,exports){


  // Insert each marker as a separate text token, and add it to delimiter list
  //
  module.exports.tokenize = function emphasis(state, silent) {
    var i, scanned, token,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (silent) { return false; }

    if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false; }

    scanned = state.scanDelims(state.pos, marker === 0x2A);

    for (i = 0; i < scanned.length; i++) {
      token         = state.push('text', '', 0);
      token.content = String.fromCharCode(marker);

      state.delimiters.push({
        // Char code of the starting marker (number).
        //
        marker: marker,

        // Total length of these series of delimiters.
        //
        length: scanned.length,

        // An amount of characters before this one that's equivalent to
        // current one. In plain English: if this delimiter does not open
        // an emphasis, neither do previous `jump` characters.
        //
        // Used to skip sequences like "*****" in one step, for 1st asterisk
        // value will be 0, for 2nd it's 1 and so on.
        //
        jump:   i,

        // A position of the token this delimiter corresponds to.
        //
        token:  state.tokens.length - 1,

        // Token level.
        //
        level:  state.level,

        // If this delimiter is matched as a valid opener, `end` will be
        // equal to its position, otherwise it's `-1`.
        //
        end:    -1,

        // Boolean flags that determine if this delimiter could open or close
        // an emphasis.
        //
        open:   scanned.can_open,
        close:  scanned.can_close
      });
    }

    state.pos += scanned.length;

    return true;
  };


  // Walk through delimiter list and replace text tokens with tags
  //
  module.exports.postProcess = function emphasis(state) {
    var i,
        startDelim,
        endDelim,
        token,
        ch,
        isStrong,
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = max - 1; i >= 0; i--) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
        continue;
      }

      // Process only opening markers
      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];

      // If the previous delimiter has the same marker and is adjacent to this one,
      // merge those into one strong delimiter.
      //
      // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
      //
      isStrong = i > 0 &&
                 delimiters[i - 1].end === startDelim.end + 1 &&
                 delimiters[i - 1].token === startDelim.token - 1 &&
                 delimiters[startDelim.end + 1].token === endDelim.token + 1 &&
                 delimiters[i - 1].marker === startDelim.marker;

      ch = String.fromCharCode(startDelim.marker);

      token         = state.tokens[startDelim.token];
      token.type    = isStrong ? 'strong_open' : 'em_open';
      token.tag     = isStrong ? 'strong' : 'em';
      token.nesting = 1;
      token.markup  = isStrong ? ch + ch : ch;
      token.content = '';

      token         = state.tokens[endDelim.token];
      token.type    = isStrong ? 'strong_close' : 'em_close';
      token.tag     = isStrong ? 'strong' : 'em';
      token.nesting = -1;
      token.markup  = isStrong ? ch + ch : ch;
      token.content = '';

      if (isStrong) {
        state.tokens[delimiters[i - 1].token].content = '';
        state.tokens[delimiters[startDelim.end + 1].token].content = '';
        i--;
      }
    }
  };

  },{}],41:[function(require,module,exports){

  var entities          = require('../common/entities');
  var has               = require('../common/utils').has;
  var isValidEntityCode = require('../common/utils').isValidEntityCode;
  var fromCodePoint     = require('../common/utils').fromCodePoint;


  var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
  var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


  module.exports = function entity(state, silent) {
    var ch, code, match, pos = state.pos, max = state.posMax;

    if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

    if (pos + 1 < max) {
      ch = state.src.charCodeAt(pos + 1);

      if (ch === 0x23 /* # */) {
        match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
            state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
        match = state.src.slice(pos).match(NAMED_RE);
        if (match) {
          if (has(entities, match[1])) {
            if (!silent) { state.pending += entities[match[1]]; }
            state.pos += match[0].length;
            return true;
          }
        }
      }
    }

    if (!silent) { state.pending += '&'; }
    state.pos++;
    return true;
  };

  },{"../common/entities":1,"../common/utils":4}],42:[function(require,module,exports){

  var isSpace = require('../common/utils').isSpace;

  var ESCAPED = [];

  for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

  '\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
    .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


  module.exports = function escape(state, silent) {
    var ch, pos = state.pos, max = state.posMax;

    if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

    pos++;

    if (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (ch < 256 && ESCAPED[ch] !== 0) {
        if (!silent) { state.pending += state.src[pos]; }
        state.pos += 2;
        return true;
      }

      if (ch === 0x0A) {
        if (!silent) {
          state.push('hardbreak', 'br', 0);
        }

        pos++;
        // skip leading whitespaces from next line
        while (pos < max) {
          ch = state.src.charCodeAt(pos);
          if (!isSpace(ch)) { break; }
          pos++;
        }

        state.pos = pos;
        return true;
      }
    }

    if (!silent) { state.pending += '\\'; }
    state.pos++;
    return true;
  };

  },{"../common/utils":4}],43:[function(require,module,exports){


  var HTML_TAG_RE = require('../common/html_re').HTML_TAG_RE;


  function isLetter(ch) {
    /*eslint no-bitwise:0*/
    var lc = ch | 0x20; // to lower case
    return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
  }


  module.exports = function html_inline(state, silent) {
    var ch, match, max, token,
        pos = state.pos;

    if (!state.md.options.html) { return false; }

    // Check start
    max = state.posMax;
    if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
        pos + 2 >= max) {
      return false;
    }

    // Quick fail on second char
    ch = state.src.charCodeAt(pos + 1);
    if (ch !== 0x21/* ! */ &&
        ch !== 0x3F/* ? */ &&
        ch !== 0x2F/* / */ &&
        !isLetter(ch)) {
      return false;
    }

    match = state.src.slice(pos).match(HTML_TAG_RE);
    if (!match) { return false; }

    if (!silent) {
      token         = state.push('html_inline', '', 0);
      token.content = state.src.slice(pos, pos + match[0].length);
    }
    state.pos += match[0].length;
    return true;
  };

  },{"../common/html_re":3}],44:[function(require,module,exports){

  var normalizeReference   = require('../common/utils').normalizeReference;
  var isSpace              = require('../common/utils').isSpace;


  module.exports = function image(state, silent) {
    var attrs,
        code,
        content,
        label,
        labelEnd,
        labelStart,
        pos,
        ref,
        res,
        title,
        token,
        tokens,
        start,
        href = '',
        oldPos = state.pos,
        max = state.posMax;

    if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
    if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

    labelStart = state.pos + 2;
    labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

    // parser failed to find ']', so it's not a valid link
    if (labelEnd < 0) { return false; }

    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
      //
      // Inline link
      //

      // [link](  <href>  "title"  )
      //        ^^ skipping these spaces
      pos++;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }
      if (pos >= max) { return false; }

      // [link](  <href>  "title"  )
      //          ^^^^^^ parsing link destination
      start = pos;
      res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = '';
        }
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) { break; }
        }
      } else {
        title = '';
      }

      if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
        state.pos = oldPos;
        return false;
      }
      pos++;
    } else {
      //
      // Link reference
      //
      if (typeof state.env.references === 'undefined') { return false; }

      if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
        start = pos + 1;
        pos = state.md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }

      // covers label === '' and label === undefined
      // (collapsed reference link and shortcut reference link respectively)
      if (!label) { label = state.src.slice(labelStart, labelEnd); }

      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }

    //
    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      content = state.src.slice(labelStart, labelEnd);

      state.md.inline.parse(
        content,
        state.md,
        state.env,
        tokens = []
      );

      token          = state.push('image', 'img', 0);
      token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
      token.children = tokens;
      token.content  = content;

      if (title) {
        attrs.push([ 'title', title ]);
      }
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  };

  },{"../common/utils":4}],45:[function(require,module,exports){

  var normalizeReference   = require('../common/utils').normalizeReference;
  var isSpace              = require('../common/utils').isSpace;


  module.exports = function link(state, silent) {
    var attrs,
        code,
        label,
        labelEnd,
        labelStart,
        pos,
        res,
        ref,
        title,
        token,
        href = '',
        oldPos = state.pos,
        max = state.posMax,
        start = state.pos,
        parseReference = true;

    if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

    labelStart = state.pos + 1;
    labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

    // parser failed to find ']', so it's not a valid link
    if (labelEnd < 0) { return false; }

    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
      //
      // Inline link
      //

      // might have found a valid shortcut link, disable reference parsing
      parseReference = false;

      // [link](  <href>  "title"  )
      //        ^^ skipping these spaces
      pos++;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }
      if (pos >= max) { return false; }

      // [link](  <href>  "title"  )
      //          ^^^^^^ parsing link destination
      start = pos;
      res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = '';
        }
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break; }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) { break; }
        }
      } else {
        title = '';
      }

      if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
        // parsing a valid shortcut link failed, fallback to reference
        parseReference = true;
      }
      pos++;
    }

    if (parseReference) {
      //
      // Link reference
      //
      if (typeof state.env.references === 'undefined') { return false; }

      if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
        start = pos + 1;
        pos = state.md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }

      // covers label === '' and label === undefined
      // (collapsed reference link and shortcut reference link respectively)
      if (!label) { label = state.src.slice(labelStart, labelEnd); }

      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }

    //
    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      state.pos = labelStart;
      state.posMax = labelEnd;

      token        = state.push('link_open', 'a', 1);
      token.attrs  = attrs = [ [ 'href', href ] ];
      if (title) {
        attrs.push([ 'title', title ]);
      }

      state.md.inline.tokenize(state);

      token        = state.push('link_close', 'a', -1);
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  };

  },{"../common/utils":4}],46:[function(require,module,exports){

  var isSpace = require('../common/utils').isSpace;


  module.exports = function newline(state, silent) {
    var pmax, max, pos = state.pos;

    if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

    pmax = state.pending.length - 1;
    max = state.posMax;

    // '  \n' -> hardbreak
    // Lookup in pending chars is bad practice! Don't copy to other rules!
    // Pending string is stored in concat mode, indexed lookups will cause
    // convertion to flat mode.
    if (!silent) {
      if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
        if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
          state.pending = state.pending.replace(/ +$/, '');
          state.push('hardbreak', 'br', 0);
        } else {
          state.pending = state.pending.slice(0, -1);
          state.push('softbreak', 'br', 0);
        }

      } else {
        state.push('softbreak', 'br', 0);
      }
    }

    pos++;

    // skip heading spaces for next line
    while (pos < max && isSpace(state.src.charCodeAt(pos))) { pos++; }

    state.pos = pos;
    return true;
  };

  },{"../common/utils":4}],47:[function(require,module,exports){


  var Token          = require('../token');
  var isWhiteSpace   = require('../common/utils').isWhiteSpace;
  var isPunctChar    = require('../common/utils').isPunctChar;
  var isMdAsciiPunct = require('../common/utils').isMdAsciiPunct;


  function StateInline(src, md, env, outTokens) {
    this.src = src;
    this.env = env;
    this.md = md;
    this.tokens = outTokens;

    this.pos = 0;
    this.posMax = this.src.length;
    this.level = 0;
    this.pending = '';
    this.pendingLevel = 0;

    this.cache = {};        // Stores { start: end } pairs. Useful for backtrack
                            // optimization of pairs parse (emphasis, strikes).

    this.delimiters = [];   // Emphasis-like delimiters
  }


  // Flush pending text
  //
  StateInline.prototype.pushPending = function () {
    var token = new Token('text', '', 0);
    token.content = this.pending;
    token.level = this.pendingLevel;
    this.tokens.push(token);
    this.pending = '';
    return token;
  };


  // Push new token to "stream".
  // If pending text exists - flush it as text token
  //
  StateInline.prototype.push = function (type, tag, nesting) {
    if (this.pending) {
      this.pushPending();
    }

    var token = new Token(type, tag, nesting);

    if (nesting < 0) { this.level--; }
    token.level = this.level;
    if (nesting > 0) { this.level++; }

    this.pendingLevel = this.level;
    this.tokens.push(token);
    return token;
  };


  // Scan a sequence of emphasis-like markers, and determine whether
  // it can start an emphasis sequence or end an emphasis sequence.
  //
  //  - start - position to scan from (it should point at a valid marker);
  //  - canSplitWord - determine if these markers can be found inside a word
  //
  StateInline.prototype.scanDelims = function (start, canSplitWord) {
    var pos = start, lastChar, nextChar, count, can_open, can_close,
        isLastWhiteSpace, isLastPunctChar,
        isNextWhiteSpace, isNextPunctChar,
        left_flanking = true,
        right_flanking = true,
        max = this.posMax,
        marker = this.src.charCodeAt(start);

    // treat beginning of the line as a whitespace
    lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

    while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

    count = pos - start;

    // treat end of the line as a whitespace
    nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

    isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
    isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

    isLastWhiteSpace = isWhiteSpace(lastChar);
    isNextWhiteSpace = isWhiteSpace(nextChar);

    if (isNextWhiteSpace) {
      left_flanking = false;
    } else if (isNextPunctChar) {
      if (!(isLastWhiteSpace || isLastPunctChar)) {
        left_flanking = false;
      }
    }

    if (isLastWhiteSpace) {
      right_flanking = false;
    } else if (isLastPunctChar) {
      if (!(isNextWhiteSpace || isNextPunctChar)) {
        right_flanking = false;
      }
    }

    if (!canSplitWord) {
      can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
      can_close = right_flanking && (!left_flanking  || isNextPunctChar);
    } else {
      can_open  = left_flanking;
      can_close = right_flanking;
    }

    return {
      can_open:  can_open,
      can_close: can_close,
      length:    count
    };
  };


  // re-export Token class to use in block rules
  StateInline.prototype.Token = Token;


  module.exports = StateInline;

  },{"../common/utils":4,"../token":51}],48:[function(require,module,exports){


  // Insert each marker as a separate text token, and add it to delimiter list
  //
  module.exports.tokenize = function strikethrough(state, silent) {
    var i, scanned, token, len, ch,
        start = state.pos,
        marker = state.src.charCodeAt(start);

    if (silent) { return false; }

    if (marker !== 0x7E/* ~ */) { return false; }

    scanned = state.scanDelims(state.pos, true);
    len = scanned.length;
    ch = String.fromCharCode(marker);

    if (len < 2) { return false; }

    if (len % 2) {
      token         = state.push('text', '', 0);
      token.content = ch;
      len--;
    }

    for (i = 0; i < len; i += 2) {
      token         = state.push('text', '', 0);
      token.content = ch + ch;

      state.delimiters.push({
        marker: marker,
        jump:   i,
        token:  state.tokens.length - 1,
        level:  state.level,
        end:    -1,
        open:   scanned.can_open,
        close:  scanned.can_close
      });
    }

    state.pos += scanned.length;

    return true;
  };


  // Walk through delimiter list and replace text tokens with tags
  //
  module.exports.postProcess = function strikethrough(state) {
    var i, j,
        startDelim,
        endDelim,
        token,
        loneMarkers = [],
        delimiters = state.delimiters,
        max = state.delimiters.length;

    for (i = 0; i < max; i++) {
      startDelim = delimiters[i];

      if (startDelim.marker !== 0x7E/* ~ */) {
        continue;
      }

      if (startDelim.end === -1) {
        continue;
      }

      endDelim = delimiters[startDelim.end];

      token         = state.tokens[startDelim.token];
      token.type    = 's_open';
      token.tag     = 's';
      token.nesting = 1;
      token.markup  = '~~';
      token.content = '';

      token         = state.tokens[endDelim.token];
      token.type    = 's_close';
      token.tag     = 's';
      token.nesting = -1;
      token.markup  = '~~';
      token.content = '';

      if (state.tokens[endDelim.token - 1].type === 'text' &&
          state.tokens[endDelim.token - 1].content === '~') {

        loneMarkers.push(endDelim.token - 1);
      }
    }

    // If a marker sequence has an odd number of characters, it's splitted
    // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
    // start of the sequence.
    //
    // So, we have to move all those markers after subsequent s_close tags.
    //
    while (loneMarkers.length) {
      i = loneMarkers.pop();
      j = i + 1;

      while (j < state.tokens.length && state.tokens[j].type === 's_close') {
        j++;
      }

      j--;

      if (i !== j) {
        token = state.tokens[j];
        state.tokens[j] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
  };

  },{}],49:[function(require,module,exports){


  // Rule to skip pure text
  // '{}$%@~+=:' reserved for extentions

  // !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

  // !!!! Don't confuse with "Markdown ASCII Punctuation" chars
  // http://spec.commonmark.org/0.15/#ascii-punctuation-character
  function isTerminatorChar(ch) {
    switch (ch) {
      case 0x0A/* \n */:
      case 0x21/* ! */:
      case 0x23/* # */:
      case 0x24/* $ */:
      case 0x25/* % */:
      case 0x26/* & */:
      case 0x2A/* * */:
      case 0x2B/* + */:
      case 0x2D/* - */:
      case 0x3A/* : */:
      case 0x3C/* < */:
      case 0x3D/* = */:
      case 0x3E/* > */:
      case 0x40/* @ */:
      case 0x5B/* [ */:
      case 0x5C/* \ */:
      case 0x5D/* ] */:
      case 0x5E/* ^ */:
      case 0x5F/* _ */:
      case 0x60/* ` */:
      case 0x7B/* { */:
      case 0x7D/* } */:
      case 0x7E/* ~ */:
        return true;
      default:
        return false;
    }
  }

  module.exports = function text(state, silent) {
    var pos = state.pos;

    while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
      pos++;
    }

    if (pos === state.pos) { return false; }

    if (!silent) { state.pending += state.src.slice(state.pos, pos); }

    state.pos = pos;

    return true;
  };

  // Alternative implementation, for memory.
  //
  // It costs 10% of performance, but allows extend terminators list, if place it
  // to `ParcerInline` property. Probably, will switch to it sometime, such
  // flexibility required.

  /*
  var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

  module.exports = function text(state, silent) {
    var pos = state.pos,
        idx = state.src.slice(pos).search(TERMINATOR_RE);

    // first char is terminator -> empty text
    if (idx === 0) { return false; }

    // no terminator -> text till end of string
    if (idx < 0) {
      if (!silent) { state.pending += state.src.slice(pos); }
      state.pos = state.src.length;
      return true;
    }

    if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

    state.pos += idx;

    return true;
  };*/

  },{}],50:[function(require,module,exports){


  module.exports = function text_collapse(state) {
    var curr, last,
        level = 0,
        tokens = state.tokens,
        max = state.tokens.length;

    for (curr = last = 0; curr < max; curr++) {
      // re-calculate levels
      level += tokens[curr].nesting;
      tokens[curr].level = level;

      if (tokens[curr].type === 'text' &&
          curr + 1 < max &&
          tokens[curr + 1].type === 'text') {

        // collapse two adjacent text nodes
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) { tokens[last] = tokens[curr]; }

        last++;
      }
    }

    if (curr !== last) {
      tokens.length = last;
    }
  };

  },{}],51:[function(require,module,exports){


  /**
   * class Token
   **/

  /**
   * new Token(type, tag, nesting)
   *
   * Create new token and fill passed properties.
   **/
  function Token(type, tag, nesting) {
    /**
     * Token#type -> String
     *
     * Type of the token (string, e.g. "paragraph_open")
     **/
    this.type     = type;

    /**
     * Token#tag -> String
     *
     * html tag name, e.g. "p"
     **/
    this.tag      = tag;

    /**
     * Token#attrs -> Array
     *
     * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
     **/
    this.attrs    = null;

    /**
     * Token#map -> Array
     *
     * Source map info. Format: `[ line_begin, line_end ]`
     **/
    this.map      = null;

    /**
     * Token#nesting -> Number
     *
     * Level change (number in {-1, 0, 1} set), where:
     *
     * -  `1` means the tag is opening
     * -  `0` means the tag is self-closing
     * - `-1` means the tag is closing
     **/
    this.nesting  = nesting;

    /**
     * Token#level -> Number
     *
     * nesting level, the same as `state.level`
     **/
    this.level    = 0;

    /**
     * Token#children -> Array
     *
     * An array of child nodes (inline and img tokens)
     **/
    this.children = null;

    /**
     * Token#content -> String
     *
     * In a case of self-closing tag (code, html, fence, etc.),
     * it has contents of this tag.
     **/
    this.content  = '';

    /**
     * Token#markup -> String
     *
     * '*' or '_' for emphasis, fence string for fence, etc.
     **/
    this.markup   = '';

    /**
     * Token#info -> String
     *
     * fence infostring
     **/
    this.info     = '';

    /**
     * Token#meta -> Object
     *
     * A place for plugins to store an arbitrary data
     **/
    this.meta     = null;

    /**
     * Token#block -> Boolean
     *
     * True for block-level tokens, false for inline tokens.
     * Used in renderer to calculate line breaks
     **/
    this.block    = false;

    /**
     * Token#hidden -> Boolean
     *
     * If it's true, ignore this element when rendering. Used for tight lists
     * to hide paragraphs.
     **/
    this.hidden   = false;
  }


  /**
   * Token.attrIndex(name) -> Number
   *
   * Search attribute index by name.
   **/
  Token.prototype.attrIndex = function attrIndex(name) {
    var attrs, i, len;

    if (!this.attrs) { return -1; }

    attrs = this.attrs;

    for (i = 0, len = attrs.length; i < len; i++) {
      if (attrs[i][0] === name) { return i; }
    }
    return -1;
  };


  /**
   * Token.attrPush(attrData)
   *
   * Add `[ name, value ]` attribute to list. Init attrs if necessary
   **/
  Token.prototype.attrPush = function attrPush(attrData) {
    if (this.attrs) {
      this.attrs.push(attrData);
    } else {
      this.attrs = [ attrData ];
    }
  };


  /**
   * Token.attrSet(name, value)
   *
   * Set `name` attribute to `value`. Override old value if exists.
   **/
  Token.prototype.attrSet = function attrSet(name, value) {
    var idx = this.attrIndex(name),
        attrData = [ name, value ];

    if (idx < 0) {
      this.attrPush(attrData);
    } else {
      this.attrs[idx] = attrData;
    }
  };


  /**
   * Token.attrGet(name)
   *
   * Get the value of attribute `name`, or null if it does not exist.
   **/
  Token.prototype.attrGet = function attrGet(name) {
    var idx = this.attrIndex(name), value = null;
    if (idx >= 0) {
      value = this.attrs[idx][1];
    }
    return value;
  };


  /**
   * Token.attrJoin(name, value)
   *
   * Join value to existing attribute via space. Or create new attribute if not
   * exists. Useful to operate with token classes.
   **/
  Token.prototype.attrJoin = function attrJoin(name, value) {
    var idx = this.attrIndex(name);

    if (idx < 0) {
      this.attrPush([ name, value ]);
    } else {
      this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
    }
  };


  module.exports = Token;

  },{}],52:[function(require,module,exports){
  module.exports={"Aacute":"\u00C1","aacute":"\u00E1","Abreve":"\u0102","abreve":"\u0103","ac":"\u223E","acd":"\u223F","acE":"\u223E\u0333","Acirc":"\u00C2","acirc":"\u00E2","acute":"\u00B4","Acy":"\u0410","acy":"\u0430","AElig":"\u00C6","aelig":"\u00E6","af":"\u2061","Afr":"\uD835\uDD04","afr":"\uD835\uDD1E","Agrave":"\u00C0","agrave":"\u00E0","alefsym":"\u2135","aleph":"\u2135","Alpha":"\u0391","alpha":"\u03B1","Amacr":"\u0100","amacr":"\u0101","amalg":"\u2A3F","amp":"&","AMP":"&","andand":"\u2A55","And":"\u2A53","and":"\u2227","andd":"\u2A5C","andslope":"\u2A58","andv":"\u2A5A","ang":"\u2220","ange":"\u29A4","angle":"\u2220","angmsdaa":"\u29A8","angmsdab":"\u29A9","angmsdac":"\u29AA","angmsdad":"\u29AB","angmsdae":"\u29AC","angmsdaf":"\u29AD","angmsdag":"\u29AE","angmsdah":"\u29AF","angmsd":"\u2221","angrt":"\u221F","angrtvb":"\u22BE","angrtvbd":"\u299D","angsph":"\u2222","angst":"\u00C5","angzarr":"\u237C","Aogon":"\u0104","aogon":"\u0105","Aopf":"\uD835\uDD38","aopf":"\uD835\uDD52","apacir":"\u2A6F","ap":"\u2248","apE":"\u2A70","ape":"\u224A","apid":"\u224B","apos":"'","ApplyFunction":"\u2061","approx":"\u2248","approxeq":"\u224A","Aring":"\u00C5","aring":"\u00E5","Ascr":"\uD835\uDC9C","ascr":"\uD835\uDCB6","Assign":"\u2254","ast":"*","asymp":"\u2248","asympeq":"\u224D","Atilde":"\u00C3","atilde":"\u00E3","Auml":"\u00C4","auml":"\u00E4","awconint":"\u2233","awint":"\u2A11","backcong":"\u224C","backepsilon":"\u03F6","backprime":"\u2035","backsim":"\u223D","backsimeq":"\u22CD","Backslash":"\u2216","Barv":"\u2AE7","barvee":"\u22BD","barwed":"\u2305","Barwed":"\u2306","barwedge":"\u2305","bbrk":"\u23B5","bbrktbrk":"\u23B6","bcong":"\u224C","Bcy":"\u0411","bcy":"\u0431","bdquo":"\u201E","becaus":"\u2235","because":"\u2235","Because":"\u2235","bemptyv":"\u29B0","bepsi":"\u03F6","bernou":"\u212C","Bernoullis":"\u212C","Beta":"\u0392","beta":"\u03B2","beth":"\u2136","between":"\u226C","Bfr":"\uD835\uDD05","bfr":"\uD835\uDD1F","bigcap":"\u22C2","bigcirc":"\u25EF","bigcup":"\u22C3","bigodot":"\u2A00","bigoplus":"\u2A01","bigotimes":"\u2A02","bigsqcup":"\u2A06","bigstar":"\u2605","bigtriangledown":"\u25BD","bigtriangleup":"\u25B3","biguplus":"\u2A04","bigvee":"\u22C1","bigwedge":"\u22C0","bkarow":"\u290D","blacklozenge":"\u29EB","blacksquare":"\u25AA","blacktriangle":"\u25B4","blacktriangledown":"\u25BE","blacktriangleleft":"\u25C2","blacktriangleright":"\u25B8","blank":"\u2423","blk12":"\u2592","blk14":"\u2591","blk34":"\u2593","block":"\u2588","bne":"=\u20E5","bnequiv":"\u2261\u20E5","bNot":"\u2AED","bnot":"\u2310","Bopf":"\uD835\uDD39","bopf":"\uD835\uDD53","bot":"\u22A5","bottom":"\u22A5","bowtie":"\u22C8","boxbox":"\u29C9","boxdl":"\u2510","boxdL":"\u2555","boxDl":"\u2556","boxDL":"\u2557","boxdr":"\u250C","boxdR":"\u2552","boxDr":"\u2553","boxDR":"\u2554","boxh":"\u2500","boxH":"\u2550","boxhd":"\u252C","boxHd":"\u2564","boxhD":"\u2565","boxHD":"\u2566","boxhu":"\u2534","boxHu":"\u2567","boxhU":"\u2568","boxHU":"\u2569","boxminus":"\u229F","boxplus":"\u229E","boxtimes":"\u22A0","boxul":"\u2518","boxuL":"\u255B","boxUl":"\u255C","boxUL":"\u255D","boxur":"\u2514","boxuR":"\u2558","boxUr":"\u2559","boxUR":"\u255A","boxv":"\u2502","boxV":"\u2551","boxvh":"\u253C","boxvH":"\u256A","boxVh":"\u256B","boxVH":"\u256C","boxvl":"\u2524","boxvL":"\u2561","boxVl":"\u2562","boxVL":"\u2563","boxvr":"\u251C","boxvR":"\u255E","boxVr":"\u255F","boxVR":"\u2560","bprime":"\u2035","breve":"\u02D8","Breve":"\u02D8","brvbar":"\u00A6","bscr":"\uD835\uDCB7","Bscr":"\u212C","bsemi":"\u204F","bsim":"\u223D","bsime":"\u22CD","bsolb":"\u29C5","bsol":"\\","bsolhsub":"\u27C8","bull":"\u2022","bullet":"\u2022","bump":"\u224E","bumpE":"\u2AAE","bumpe":"\u224F","Bumpeq":"\u224E","bumpeq":"\u224F","Cacute":"\u0106","cacute":"\u0107","capand":"\u2A44","capbrcup":"\u2A49","capcap":"\u2A4B","cap":"\u2229","Cap":"\u22D2","capcup":"\u2A47","capdot":"\u2A40","CapitalDifferentialD":"\u2145","caps":"\u2229\uFE00","caret":"\u2041","caron":"\u02C7","Cayleys":"\u212D","ccaps":"\u2A4D","Ccaron":"\u010C","ccaron":"\u010D","Ccedil":"\u00C7","ccedil":"\u00E7","Ccirc":"\u0108","ccirc":"\u0109","Cconint":"\u2230","ccups":"\u2A4C","ccupssm":"\u2A50","Cdot":"\u010A","cdot":"\u010B","cedil":"\u00B8","Cedilla":"\u00B8","cemptyv":"\u29B2","cent":"\u00A2","centerdot":"\u00B7","CenterDot":"\u00B7","cfr":"\uD835\uDD20","Cfr":"\u212D","CHcy":"\u0427","chcy":"\u0447","check":"\u2713","checkmark":"\u2713","Chi":"\u03A7","chi":"\u03C7","circ":"\u02C6","circeq":"\u2257","circlearrowleft":"\u21BA","circlearrowright":"\u21BB","circledast":"\u229B","circledcirc":"\u229A","circleddash":"\u229D","CircleDot":"\u2299","circledR":"\u00AE","circledS":"\u24C8","CircleMinus":"\u2296","CirclePlus":"\u2295","CircleTimes":"\u2297","cir":"\u25CB","cirE":"\u29C3","cire":"\u2257","cirfnint":"\u2A10","cirmid":"\u2AEF","cirscir":"\u29C2","ClockwiseContourIntegral":"\u2232","CloseCurlyDoubleQuote":"\u201D","CloseCurlyQuote":"\u2019","clubs":"\u2663","clubsuit":"\u2663","colon":":","Colon":"\u2237","Colone":"\u2A74","colone":"\u2254","coloneq":"\u2254","comma":",","commat":"@","comp":"\u2201","compfn":"\u2218","complement":"\u2201","complexes":"\u2102","cong":"\u2245","congdot":"\u2A6D","Congruent":"\u2261","conint":"\u222E","Conint":"\u222F","ContourIntegral":"\u222E","copf":"\uD835\uDD54","Copf":"\u2102","coprod":"\u2210","Coproduct":"\u2210","copy":"\u00A9","COPY":"\u00A9","copysr":"\u2117","CounterClockwiseContourIntegral":"\u2233","crarr":"\u21B5","cross":"\u2717","Cross":"\u2A2F","Cscr":"\uD835\uDC9E","cscr":"\uD835\uDCB8","csub":"\u2ACF","csube":"\u2AD1","csup":"\u2AD0","csupe":"\u2AD2","ctdot":"\u22EF","cudarrl":"\u2938","cudarrr":"\u2935","cuepr":"\u22DE","cuesc":"\u22DF","cularr":"\u21B6","cularrp":"\u293D","cupbrcap":"\u2A48","cupcap":"\u2A46","CupCap":"\u224D","cup":"\u222A","Cup":"\u22D3","cupcup":"\u2A4A","cupdot":"\u228D","cupor":"\u2A45","cups":"\u222A\uFE00","curarr":"\u21B7","curarrm":"\u293C","curlyeqprec":"\u22DE","curlyeqsucc":"\u22DF","curlyvee":"\u22CE","curlywedge":"\u22CF","curren":"\u00A4","curvearrowleft":"\u21B6","curvearrowright":"\u21B7","cuvee":"\u22CE","cuwed":"\u22CF","cwconint":"\u2232","cwint":"\u2231","cylcty":"\u232D","dagger":"\u2020","Dagger":"\u2021","daleth":"\u2138","darr":"\u2193","Darr":"\u21A1","dArr":"\u21D3","dash":"\u2010","Dashv":"\u2AE4","dashv":"\u22A3","dbkarow":"\u290F","dblac":"\u02DD","Dcaron":"\u010E","dcaron":"\u010F","Dcy":"\u0414","dcy":"\u0434","ddagger":"\u2021","ddarr":"\u21CA","DD":"\u2145","dd":"\u2146","DDotrahd":"\u2911","ddotseq":"\u2A77","deg":"\u00B0","Del":"\u2207","Delta":"\u0394","delta":"\u03B4","demptyv":"\u29B1","dfisht":"\u297F","Dfr":"\uD835\uDD07","dfr":"\uD835\uDD21","dHar":"\u2965","dharl":"\u21C3","dharr":"\u21C2","DiacriticalAcute":"\u00B4","DiacriticalDot":"\u02D9","DiacriticalDoubleAcute":"\u02DD","DiacriticalGrave":"`","DiacriticalTilde":"\u02DC","diam":"\u22C4","diamond":"\u22C4","Diamond":"\u22C4","diamondsuit":"\u2666","diams":"\u2666","die":"\u00A8","DifferentialD":"\u2146","digamma":"\u03DD","disin":"\u22F2","div":"\u00F7","divide":"\u00F7","divideontimes":"\u22C7","divonx":"\u22C7","DJcy":"\u0402","djcy":"\u0452","dlcorn":"\u231E","dlcrop":"\u230D","dollar":"$","Dopf":"\uD835\uDD3B","dopf":"\uD835\uDD55","Dot":"\u00A8","dot":"\u02D9","DotDot":"\u20DC","doteq":"\u2250","doteqdot":"\u2251","DotEqual":"\u2250","dotminus":"\u2238","dotplus":"\u2214","dotsquare":"\u22A1","doublebarwedge":"\u2306","DoubleContourIntegral":"\u222F","DoubleDot":"\u00A8","DoubleDownArrow":"\u21D3","DoubleLeftArrow":"\u21D0","DoubleLeftRightArrow":"\u21D4","DoubleLeftTee":"\u2AE4","DoubleLongLeftArrow":"\u27F8","DoubleLongLeftRightArrow":"\u27FA","DoubleLongRightArrow":"\u27F9","DoubleRightArrow":"\u21D2","DoubleRightTee":"\u22A8","DoubleUpArrow":"\u21D1","DoubleUpDownArrow":"\u21D5","DoubleVerticalBar":"\u2225","DownArrowBar":"\u2913","downarrow":"\u2193","DownArrow":"\u2193","Downarrow":"\u21D3","DownArrowUpArrow":"\u21F5","DownBreve":"\u0311","downdownarrows":"\u21CA","downharpoonleft":"\u21C3","downharpoonright":"\u21C2","DownLeftRightVector":"\u2950","DownLeftTeeVector":"\u295E","DownLeftVectorBar":"\u2956","DownLeftVector":"\u21BD","DownRightTeeVector":"\u295F","DownRightVectorBar":"\u2957","DownRightVector":"\u21C1","DownTeeArrow":"\u21A7","DownTee":"\u22A4","drbkarow":"\u2910","drcorn":"\u231F","drcrop":"\u230C","Dscr":"\uD835\uDC9F","dscr":"\uD835\uDCB9","DScy":"\u0405","dscy":"\u0455","dsol":"\u29F6","Dstrok":"\u0110","dstrok":"\u0111","dtdot":"\u22F1","dtri":"\u25BF","dtrif":"\u25BE","duarr":"\u21F5","duhar":"\u296F","dwangle":"\u29A6","DZcy":"\u040F","dzcy":"\u045F","dzigrarr":"\u27FF","Eacute":"\u00C9","eacute":"\u00E9","easter":"\u2A6E","Ecaron":"\u011A","ecaron":"\u011B","Ecirc":"\u00CA","ecirc":"\u00EA","ecir":"\u2256","ecolon":"\u2255","Ecy":"\u042D","ecy":"\u044D","eDDot":"\u2A77","Edot":"\u0116","edot":"\u0117","eDot":"\u2251","ee":"\u2147","efDot":"\u2252","Efr":"\uD835\uDD08","efr":"\uD835\uDD22","eg":"\u2A9A","Egrave":"\u00C8","egrave":"\u00E8","egs":"\u2A96","egsdot":"\u2A98","el":"\u2A99","Element":"\u2208","elinters":"\u23E7","ell":"\u2113","els":"\u2A95","elsdot":"\u2A97","Emacr":"\u0112","emacr":"\u0113","empty":"\u2205","emptyset":"\u2205","EmptySmallSquare":"\u25FB","emptyv":"\u2205","EmptyVerySmallSquare":"\u25AB","emsp13":"\u2004","emsp14":"\u2005","emsp":"\u2003","ENG":"\u014A","eng":"\u014B","ensp":"\u2002","Eogon":"\u0118","eogon":"\u0119","Eopf":"\uD835\uDD3C","eopf":"\uD835\uDD56","epar":"\u22D5","eparsl":"\u29E3","eplus":"\u2A71","epsi":"\u03B5","Epsilon":"\u0395","epsilon":"\u03B5","epsiv":"\u03F5","eqcirc":"\u2256","eqcolon":"\u2255","eqsim":"\u2242","eqslantgtr":"\u2A96","eqslantless":"\u2A95","Equal":"\u2A75","equals":"=","EqualTilde":"\u2242","equest":"\u225F","Equilibrium":"\u21CC","equiv":"\u2261","equivDD":"\u2A78","eqvparsl":"\u29E5","erarr":"\u2971","erDot":"\u2253","escr":"\u212F","Escr":"\u2130","esdot":"\u2250","Esim":"\u2A73","esim":"\u2242","Eta":"\u0397","eta":"\u03B7","ETH":"\u00D0","eth":"\u00F0","Euml":"\u00CB","euml":"\u00EB","euro":"\u20AC","excl":"!","exist":"\u2203","Exists":"\u2203","expectation":"\u2130","exponentiale":"\u2147","ExponentialE":"\u2147","fallingdotseq":"\u2252","Fcy":"\u0424","fcy":"\u0444","female":"\u2640","ffilig":"\uFB03","fflig":"\uFB00","ffllig":"\uFB04","Ffr":"\uD835\uDD09","ffr":"\uD835\uDD23","filig":"\uFB01","FilledSmallSquare":"\u25FC","FilledVerySmallSquare":"\u25AA","fjlig":"fj","flat":"\u266D","fllig":"\uFB02","fltns":"\u25B1","fnof":"\u0192","Fopf":"\uD835\uDD3D","fopf":"\uD835\uDD57","forall":"\u2200","ForAll":"\u2200","fork":"\u22D4","forkv":"\u2AD9","Fouriertrf":"\u2131","fpartint":"\u2A0D","frac12":"\u00BD","frac13":"\u2153","frac14":"\u00BC","frac15":"\u2155","frac16":"\u2159","frac18":"\u215B","frac23":"\u2154","frac25":"\u2156","frac34":"\u00BE","frac35":"\u2157","frac38":"\u215C","frac45":"\u2158","frac56":"\u215A","frac58":"\u215D","frac78":"\u215E","frasl":"\u2044","frown":"\u2322","fscr":"\uD835\uDCBB","Fscr":"\u2131","gacute":"\u01F5","Gamma":"\u0393","gamma":"\u03B3","Gammad":"\u03DC","gammad":"\u03DD","gap":"\u2A86","Gbreve":"\u011E","gbreve":"\u011F","Gcedil":"\u0122","Gcirc":"\u011C","gcirc":"\u011D","Gcy":"\u0413","gcy":"\u0433","Gdot":"\u0120","gdot":"\u0121","ge":"\u2265","gE":"\u2267","gEl":"\u2A8C","gel":"\u22DB","geq":"\u2265","geqq":"\u2267","geqslant":"\u2A7E","gescc":"\u2AA9","ges":"\u2A7E","gesdot":"\u2A80","gesdoto":"\u2A82","gesdotol":"\u2A84","gesl":"\u22DB\uFE00","gesles":"\u2A94","Gfr":"\uD835\uDD0A","gfr":"\uD835\uDD24","gg":"\u226B","Gg":"\u22D9","ggg":"\u22D9","gimel":"\u2137","GJcy":"\u0403","gjcy":"\u0453","gla":"\u2AA5","gl":"\u2277","glE":"\u2A92","glj":"\u2AA4","gnap":"\u2A8A","gnapprox":"\u2A8A","gne":"\u2A88","gnE":"\u2269","gneq":"\u2A88","gneqq":"\u2269","gnsim":"\u22E7","Gopf":"\uD835\uDD3E","gopf":"\uD835\uDD58","grave":"`","GreaterEqual":"\u2265","GreaterEqualLess":"\u22DB","GreaterFullEqual":"\u2267","GreaterGreater":"\u2AA2","GreaterLess":"\u2277","GreaterSlantEqual":"\u2A7E","GreaterTilde":"\u2273","Gscr":"\uD835\uDCA2","gscr":"\u210A","gsim":"\u2273","gsime":"\u2A8E","gsiml":"\u2A90","gtcc":"\u2AA7","gtcir":"\u2A7A","gt":">","GT":">","Gt":"\u226B","gtdot":"\u22D7","gtlPar":"\u2995","gtquest":"\u2A7C","gtrapprox":"\u2A86","gtrarr":"\u2978","gtrdot":"\u22D7","gtreqless":"\u22DB","gtreqqless":"\u2A8C","gtrless":"\u2277","gtrsim":"\u2273","gvertneqq":"\u2269\uFE00","gvnE":"\u2269\uFE00","Hacek":"\u02C7","hairsp":"\u200A","half":"\u00BD","hamilt":"\u210B","HARDcy":"\u042A","hardcy":"\u044A","harrcir":"\u2948","harr":"\u2194","hArr":"\u21D4","harrw":"\u21AD","Hat":"^","hbar":"\u210F","Hcirc":"\u0124","hcirc":"\u0125","hearts":"\u2665","heartsuit":"\u2665","hellip":"\u2026","hercon":"\u22B9","hfr":"\uD835\uDD25","Hfr":"\u210C","HilbertSpace":"\u210B","hksearow":"\u2925","hkswarow":"\u2926","hoarr":"\u21FF","homtht":"\u223B","hookleftarrow":"\u21A9","hookrightarrow":"\u21AA","hopf":"\uD835\uDD59","Hopf":"\u210D","horbar":"\u2015","HorizontalLine":"\u2500","hscr":"\uD835\uDCBD","Hscr":"\u210B","hslash":"\u210F","Hstrok":"\u0126","hstrok":"\u0127","HumpDownHump":"\u224E","HumpEqual":"\u224F","hybull":"\u2043","hyphen":"\u2010","Iacute":"\u00CD","iacute":"\u00ED","ic":"\u2063","Icirc":"\u00CE","icirc":"\u00EE","Icy":"\u0418","icy":"\u0438","Idot":"\u0130","IEcy":"\u0415","iecy":"\u0435","iexcl":"\u00A1","iff":"\u21D4","ifr":"\uD835\uDD26","Ifr":"\u2111","Igrave":"\u00CC","igrave":"\u00EC","ii":"\u2148","iiiint":"\u2A0C","iiint":"\u222D","iinfin":"\u29DC","iiota":"\u2129","IJlig":"\u0132","ijlig":"\u0133","Imacr":"\u012A","imacr":"\u012B","image":"\u2111","ImaginaryI":"\u2148","imagline":"\u2110","imagpart":"\u2111","imath":"\u0131","Im":"\u2111","imof":"\u22B7","imped":"\u01B5","Implies":"\u21D2","incare":"\u2105","in":"\u2208","infin":"\u221E","infintie":"\u29DD","inodot":"\u0131","intcal":"\u22BA","int":"\u222B","Int":"\u222C","integers":"\u2124","Integral":"\u222B","intercal":"\u22BA","Intersection":"\u22C2","intlarhk":"\u2A17","intprod":"\u2A3C","InvisibleComma":"\u2063","InvisibleTimes":"\u2062","IOcy":"\u0401","iocy":"\u0451","Iogon":"\u012E","iogon":"\u012F","Iopf":"\uD835\uDD40","iopf":"\uD835\uDD5A","Iota":"\u0399","iota":"\u03B9","iprod":"\u2A3C","iquest":"\u00BF","iscr":"\uD835\uDCBE","Iscr":"\u2110","isin":"\u2208","isindot":"\u22F5","isinE":"\u22F9","isins":"\u22F4","isinsv":"\u22F3","isinv":"\u2208","it":"\u2062","Itilde":"\u0128","itilde":"\u0129","Iukcy":"\u0406","iukcy":"\u0456","Iuml":"\u00CF","iuml":"\u00EF","Jcirc":"\u0134","jcirc":"\u0135","Jcy":"\u0419","jcy":"\u0439","Jfr":"\uD835\uDD0D","jfr":"\uD835\uDD27","jmath":"\u0237","Jopf":"\uD835\uDD41","jopf":"\uD835\uDD5B","Jscr":"\uD835\uDCA5","jscr":"\uD835\uDCBF","Jsercy":"\u0408","jsercy":"\u0458","Jukcy":"\u0404","jukcy":"\u0454","Kappa":"\u039A","kappa":"\u03BA","kappav":"\u03F0","Kcedil":"\u0136","kcedil":"\u0137","Kcy":"\u041A","kcy":"\u043A","Kfr":"\uD835\uDD0E","kfr":"\uD835\uDD28","kgreen":"\u0138","KHcy":"\u0425","khcy":"\u0445","KJcy":"\u040C","kjcy":"\u045C","Kopf":"\uD835\uDD42","kopf":"\uD835\uDD5C","Kscr":"\uD835\uDCA6","kscr":"\uD835\uDCC0","lAarr":"\u21DA","Lacute":"\u0139","lacute":"\u013A","laemptyv":"\u29B4","lagran":"\u2112","Lambda":"\u039B","lambda":"\u03BB","lang":"\u27E8","Lang":"\u27EA","langd":"\u2991","langle":"\u27E8","lap":"\u2A85","Laplacetrf":"\u2112","laquo":"\u00AB","larrb":"\u21E4","larrbfs":"\u291F","larr":"\u2190","Larr":"\u219E","lArr":"\u21D0","larrfs":"\u291D","larrhk":"\u21A9","larrlp":"\u21AB","larrpl":"\u2939","larrsim":"\u2973","larrtl":"\u21A2","latail":"\u2919","lAtail":"\u291B","lat":"\u2AAB","late":"\u2AAD","lates":"\u2AAD\uFE00","lbarr":"\u290C","lBarr":"\u290E","lbbrk":"\u2772","lbrace":"{","lbrack":"[","lbrke":"\u298B","lbrksld":"\u298F","lbrkslu":"\u298D","Lcaron":"\u013D","lcaron":"\u013E","Lcedil":"\u013B","lcedil":"\u013C","lceil":"\u2308","lcub":"{","Lcy":"\u041B","lcy":"\u043B","ldca":"\u2936","ldquo":"\u201C","ldquor":"\u201E","ldrdhar":"\u2967","ldrushar":"\u294B","ldsh":"\u21B2","le":"\u2264","lE":"\u2266","LeftAngleBracket":"\u27E8","LeftArrowBar":"\u21E4","leftarrow":"\u2190","LeftArrow":"\u2190","Leftarrow":"\u21D0","LeftArrowRightArrow":"\u21C6","leftarrowtail":"\u21A2","LeftCeiling":"\u2308","LeftDoubleBracket":"\u27E6","LeftDownTeeVector":"\u2961","LeftDownVectorBar":"\u2959","LeftDownVector":"\u21C3","LeftFloor":"\u230A","leftharpoondown":"\u21BD","leftharpoonup":"\u21BC","leftleftarrows":"\u21C7","leftrightarrow":"\u2194","LeftRightArrow":"\u2194","Leftrightarrow":"\u21D4","leftrightarrows":"\u21C6","leftrightharpoons":"\u21CB","leftrightsquigarrow":"\u21AD","LeftRightVector":"\u294E","LeftTeeArrow":"\u21A4","LeftTee":"\u22A3","LeftTeeVector":"\u295A","leftthreetimes":"\u22CB","LeftTriangleBar":"\u29CF","LeftTriangle":"\u22B2","LeftTriangleEqual":"\u22B4","LeftUpDownVector":"\u2951","LeftUpTeeVector":"\u2960","LeftUpVectorBar":"\u2958","LeftUpVector":"\u21BF","LeftVectorBar":"\u2952","LeftVector":"\u21BC","lEg":"\u2A8B","leg":"\u22DA","leq":"\u2264","leqq":"\u2266","leqslant":"\u2A7D","lescc":"\u2AA8","les":"\u2A7D","lesdot":"\u2A7F","lesdoto":"\u2A81","lesdotor":"\u2A83","lesg":"\u22DA\uFE00","lesges":"\u2A93","lessapprox":"\u2A85","lessdot":"\u22D6","lesseqgtr":"\u22DA","lesseqqgtr":"\u2A8B","LessEqualGreater":"\u22DA","LessFullEqual":"\u2266","LessGreater":"\u2276","lessgtr":"\u2276","LessLess":"\u2AA1","lesssim":"\u2272","LessSlantEqual":"\u2A7D","LessTilde":"\u2272","lfisht":"\u297C","lfloor":"\u230A","Lfr":"\uD835\uDD0F","lfr":"\uD835\uDD29","lg":"\u2276","lgE":"\u2A91","lHar":"\u2962","lhard":"\u21BD","lharu":"\u21BC","lharul":"\u296A","lhblk":"\u2584","LJcy":"\u0409","ljcy":"\u0459","llarr":"\u21C7","ll":"\u226A","Ll":"\u22D8","llcorner":"\u231E","Lleftarrow":"\u21DA","llhard":"\u296B","lltri":"\u25FA","Lmidot":"\u013F","lmidot":"\u0140","lmoustache":"\u23B0","lmoust":"\u23B0","lnap":"\u2A89","lnapprox":"\u2A89","lne":"\u2A87","lnE":"\u2268","lneq":"\u2A87","lneqq":"\u2268","lnsim":"\u22E6","loang":"\u27EC","loarr":"\u21FD","lobrk":"\u27E6","longleftarrow":"\u27F5","LongLeftArrow":"\u27F5","Longleftarrow":"\u27F8","longleftrightarrow":"\u27F7","LongLeftRightArrow":"\u27F7","Longleftrightarrow":"\u27FA","longmapsto":"\u27FC","longrightarrow":"\u27F6","LongRightArrow":"\u27F6","Longrightarrow":"\u27F9","looparrowleft":"\u21AB","looparrowright":"\u21AC","lopar":"\u2985","Lopf":"\uD835\uDD43","lopf":"\uD835\uDD5D","loplus":"\u2A2D","lotimes":"\u2A34","lowast":"\u2217","lowbar":"_","LowerLeftArrow":"\u2199","LowerRightArrow":"\u2198","loz":"\u25CA","lozenge":"\u25CA","lozf":"\u29EB","lpar":"(","lparlt":"\u2993","lrarr":"\u21C6","lrcorner":"\u231F","lrhar":"\u21CB","lrhard":"\u296D","lrm":"\u200E","lrtri":"\u22BF","lsaquo":"\u2039","lscr":"\uD835\uDCC1","Lscr":"\u2112","lsh":"\u21B0","Lsh":"\u21B0","lsim":"\u2272","lsime":"\u2A8D","lsimg":"\u2A8F","lsqb":"[","lsquo":"\u2018","lsquor":"\u201A","Lstrok":"\u0141","lstrok":"\u0142","ltcc":"\u2AA6","ltcir":"\u2A79","lt":"<","LT":"<","Lt":"\u226A","ltdot":"\u22D6","lthree":"\u22CB","ltimes":"\u22C9","ltlarr":"\u2976","ltquest":"\u2A7B","ltri":"\u25C3","ltrie":"\u22B4","ltrif":"\u25C2","ltrPar":"\u2996","lurdshar":"\u294A","luruhar":"\u2966","lvertneqq":"\u2268\uFE00","lvnE":"\u2268\uFE00","macr":"\u00AF","male":"\u2642","malt":"\u2720","maltese":"\u2720","Map":"\u2905","map":"\u21A6","mapsto":"\u21A6","mapstodown":"\u21A7","mapstoleft":"\u21A4","mapstoup":"\u21A5","marker":"\u25AE","mcomma":"\u2A29","Mcy":"\u041C","mcy":"\u043C","mdash":"\u2014","mDDot":"\u223A","measuredangle":"\u2221","MediumSpace":"\u205F","Mellintrf":"\u2133","Mfr":"\uD835\uDD10","mfr":"\uD835\uDD2A","mho":"\u2127","micro":"\u00B5","midast":"*","midcir":"\u2AF0","mid":"\u2223","middot":"\u00B7","minusb":"\u229F","minus":"\u2212","minusd":"\u2238","minusdu":"\u2A2A","MinusPlus":"\u2213","mlcp":"\u2ADB","mldr":"\u2026","mnplus":"\u2213","models":"\u22A7","Mopf":"\uD835\uDD44","mopf":"\uD835\uDD5E","mp":"\u2213","mscr":"\uD835\uDCC2","Mscr":"\u2133","mstpos":"\u223E","Mu":"\u039C","mu":"\u03BC","multimap":"\u22B8","mumap":"\u22B8","nabla":"\u2207","Nacute":"\u0143","nacute":"\u0144","nang":"\u2220\u20D2","nap":"\u2249","napE":"\u2A70\u0338","napid":"\u224B\u0338","napos":"\u0149","napprox":"\u2249","natural":"\u266E","naturals":"\u2115","natur":"\u266E","nbsp":"\u00A0","nbump":"\u224E\u0338","nbumpe":"\u224F\u0338","ncap":"\u2A43","Ncaron":"\u0147","ncaron":"\u0148","Ncedil":"\u0145","ncedil":"\u0146","ncong":"\u2247","ncongdot":"\u2A6D\u0338","ncup":"\u2A42","Ncy":"\u041D","ncy":"\u043D","ndash":"\u2013","nearhk":"\u2924","nearr":"\u2197","neArr":"\u21D7","nearrow":"\u2197","ne":"\u2260","nedot":"\u2250\u0338","NegativeMediumSpace":"\u200B","NegativeThickSpace":"\u200B","NegativeThinSpace":"\u200B","NegativeVeryThinSpace":"\u200B","nequiv":"\u2262","nesear":"\u2928","nesim":"\u2242\u0338","NestedGreaterGreater":"\u226B","NestedLessLess":"\u226A","NewLine":"\n","nexist":"\u2204","nexists":"\u2204","Nfr":"\uD835\uDD11","nfr":"\uD835\uDD2B","ngE":"\u2267\u0338","nge":"\u2271","ngeq":"\u2271","ngeqq":"\u2267\u0338","ngeqslant":"\u2A7E\u0338","nges":"\u2A7E\u0338","nGg":"\u22D9\u0338","ngsim":"\u2275","nGt":"\u226B\u20D2","ngt":"\u226F","ngtr":"\u226F","nGtv":"\u226B\u0338","nharr":"\u21AE","nhArr":"\u21CE","nhpar":"\u2AF2","ni":"\u220B","nis":"\u22FC","nisd":"\u22FA","niv":"\u220B","NJcy":"\u040A","njcy":"\u045A","nlarr":"\u219A","nlArr":"\u21CD","nldr":"\u2025","nlE":"\u2266\u0338","nle":"\u2270","nleftarrow":"\u219A","nLeftarrow":"\u21CD","nleftrightarrow":"\u21AE","nLeftrightarrow":"\u21CE","nleq":"\u2270","nleqq":"\u2266\u0338","nleqslant":"\u2A7D\u0338","nles":"\u2A7D\u0338","nless":"\u226E","nLl":"\u22D8\u0338","nlsim":"\u2274","nLt":"\u226A\u20D2","nlt":"\u226E","nltri":"\u22EA","nltrie":"\u22EC","nLtv":"\u226A\u0338","nmid":"\u2224","NoBreak":"\u2060","NonBreakingSpace":"\u00A0","nopf":"\uD835\uDD5F","Nopf":"\u2115","Not":"\u2AEC","not":"\u00AC","NotCongruent":"\u2262","NotCupCap":"\u226D","NotDoubleVerticalBar":"\u2226","NotElement":"\u2209","NotEqual":"\u2260","NotEqualTilde":"\u2242\u0338","NotExists":"\u2204","NotGreater":"\u226F","NotGreaterEqual":"\u2271","NotGreaterFullEqual":"\u2267\u0338","NotGreaterGreater":"\u226B\u0338","NotGreaterLess":"\u2279","NotGreaterSlantEqual":"\u2A7E\u0338","NotGreaterTilde":"\u2275","NotHumpDownHump":"\u224E\u0338","NotHumpEqual":"\u224F\u0338","notin":"\u2209","notindot":"\u22F5\u0338","notinE":"\u22F9\u0338","notinva":"\u2209","notinvb":"\u22F7","notinvc":"\u22F6","NotLeftTriangleBar":"\u29CF\u0338","NotLeftTriangle":"\u22EA","NotLeftTriangleEqual":"\u22EC","NotLess":"\u226E","NotLessEqual":"\u2270","NotLessGreater":"\u2278","NotLessLess":"\u226A\u0338","NotLessSlantEqual":"\u2A7D\u0338","NotLessTilde":"\u2274","NotNestedGreaterGreater":"\u2AA2\u0338","NotNestedLessLess":"\u2AA1\u0338","notni":"\u220C","notniva":"\u220C","notnivb":"\u22FE","notnivc":"\u22FD","NotPrecedes":"\u2280","NotPrecedesEqual":"\u2AAF\u0338","NotPrecedesSlantEqual":"\u22E0","NotReverseElement":"\u220C","NotRightTriangleBar":"\u29D0\u0338","NotRightTriangle":"\u22EB","NotRightTriangleEqual":"\u22ED","NotSquareSubset":"\u228F\u0338","NotSquareSubsetEqual":"\u22E2","NotSquareSuperset":"\u2290\u0338","NotSquareSupersetEqual":"\u22E3","NotSubset":"\u2282\u20D2","NotSubsetEqual":"\u2288","NotSucceeds":"\u2281","NotSucceedsEqual":"\u2AB0\u0338","NotSucceedsSlantEqual":"\u22E1","NotSucceedsTilde":"\u227F\u0338","NotSuperset":"\u2283\u20D2","NotSupersetEqual":"\u2289","NotTilde":"\u2241","NotTildeEqual":"\u2244","NotTildeFullEqual":"\u2247","NotTildeTilde":"\u2249","NotVerticalBar":"\u2224","nparallel":"\u2226","npar":"\u2226","nparsl":"\u2AFD\u20E5","npart":"\u2202\u0338","npolint":"\u2A14","npr":"\u2280","nprcue":"\u22E0","nprec":"\u2280","npreceq":"\u2AAF\u0338","npre":"\u2AAF\u0338","nrarrc":"\u2933\u0338","nrarr":"\u219B","nrArr":"\u21CF","nrarrw":"\u219D\u0338","nrightarrow":"\u219B","nRightarrow":"\u21CF","nrtri":"\u22EB","nrtrie":"\u22ED","nsc":"\u2281","nsccue":"\u22E1","nsce":"\u2AB0\u0338","Nscr":"\uD835\uDCA9","nscr":"\uD835\uDCC3","nshortmid":"\u2224","nshortparallel":"\u2226","nsim":"\u2241","nsime":"\u2244","nsimeq":"\u2244","nsmid":"\u2224","nspar":"\u2226","nsqsube":"\u22E2","nsqsupe":"\u22E3","nsub":"\u2284","nsubE":"\u2AC5\u0338","nsube":"\u2288","nsubset":"\u2282\u20D2","nsubseteq":"\u2288","nsubseteqq":"\u2AC5\u0338","nsucc":"\u2281","nsucceq":"\u2AB0\u0338","nsup":"\u2285","nsupE":"\u2AC6\u0338","nsupe":"\u2289","nsupset":"\u2283\u20D2","nsupseteq":"\u2289","nsupseteqq":"\u2AC6\u0338","ntgl":"\u2279","Ntilde":"\u00D1","ntilde":"\u00F1","ntlg":"\u2278","ntriangleleft":"\u22EA","ntrianglelefteq":"\u22EC","ntriangleright":"\u22EB","ntrianglerighteq":"\u22ED","Nu":"\u039D","nu":"\u03BD","num":"#","numero":"\u2116","numsp":"\u2007","nvap":"\u224D\u20D2","nvdash":"\u22AC","nvDash":"\u22AD","nVdash":"\u22AE","nVDash":"\u22AF","nvge":"\u2265\u20D2","nvgt":">\u20D2","nvHarr":"\u2904","nvinfin":"\u29DE","nvlArr":"\u2902","nvle":"\u2264\u20D2","nvlt":"<\u20D2","nvltrie":"\u22B4\u20D2","nvrArr":"\u2903","nvrtrie":"\u22B5\u20D2","nvsim":"\u223C\u20D2","nwarhk":"\u2923","nwarr":"\u2196","nwArr":"\u21D6","nwarrow":"\u2196","nwnear":"\u2927","Oacute":"\u00D3","oacute":"\u00F3","oast":"\u229B","Ocirc":"\u00D4","ocirc":"\u00F4","ocir":"\u229A","Ocy":"\u041E","ocy":"\u043E","odash":"\u229D","Odblac":"\u0150","odblac":"\u0151","odiv":"\u2A38","odot":"\u2299","odsold":"\u29BC","OElig":"\u0152","oelig":"\u0153","ofcir":"\u29BF","Ofr":"\uD835\uDD12","ofr":"\uD835\uDD2C","ogon":"\u02DB","Ograve":"\u00D2","ograve":"\u00F2","ogt":"\u29C1","ohbar":"\u29B5","ohm":"\u03A9","oint":"\u222E","olarr":"\u21BA","olcir":"\u29BE","olcross":"\u29BB","oline":"\u203E","olt":"\u29C0","Omacr":"\u014C","omacr":"\u014D","Omega":"\u03A9","omega":"\u03C9","Omicron":"\u039F","omicron":"\u03BF","omid":"\u29B6","ominus":"\u2296","Oopf":"\uD835\uDD46","oopf":"\uD835\uDD60","opar":"\u29B7","OpenCurlyDoubleQuote":"\u201C","OpenCurlyQuote":"\u2018","operp":"\u29B9","oplus":"\u2295","orarr":"\u21BB","Or":"\u2A54","or":"\u2228","ord":"\u2A5D","order":"\u2134","orderof":"\u2134","ordf":"\u00AA","ordm":"\u00BA","origof":"\u22B6","oror":"\u2A56","orslope":"\u2A57","orv":"\u2A5B","oS":"\u24C8","Oscr":"\uD835\uDCAA","oscr":"\u2134","Oslash":"\u00D8","oslash":"\u00F8","osol":"\u2298","Otilde":"\u00D5","otilde":"\u00F5","otimesas":"\u2A36","Otimes":"\u2A37","otimes":"\u2297","Ouml":"\u00D6","ouml":"\u00F6","ovbar":"\u233D","OverBar":"\u203E","OverBrace":"\u23DE","OverBracket":"\u23B4","OverParenthesis":"\u23DC","para":"\u00B6","parallel":"\u2225","par":"\u2225","parsim":"\u2AF3","parsl":"\u2AFD","part":"\u2202","PartialD":"\u2202","Pcy":"\u041F","pcy":"\u043F","percnt":"%","period":".","permil":"\u2030","perp":"\u22A5","pertenk":"\u2031","Pfr":"\uD835\uDD13","pfr":"\uD835\uDD2D","Phi":"\u03A6","phi":"\u03C6","phiv":"\u03D5","phmmat":"\u2133","phone":"\u260E","Pi":"\u03A0","pi":"\u03C0","pitchfork":"\u22D4","piv":"\u03D6","planck":"\u210F","planckh":"\u210E","plankv":"\u210F","plusacir":"\u2A23","plusb":"\u229E","pluscir":"\u2A22","plus":"+","plusdo":"\u2214","plusdu":"\u2A25","pluse":"\u2A72","PlusMinus":"\u00B1","plusmn":"\u00B1","plussim":"\u2A26","plustwo":"\u2A27","pm":"\u00B1","Poincareplane":"\u210C","pointint":"\u2A15","popf":"\uD835\uDD61","Popf":"\u2119","pound":"\u00A3","prap":"\u2AB7","Pr":"\u2ABB","pr":"\u227A","prcue":"\u227C","precapprox":"\u2AB7","prec":"\u227A","preccurlyeq":"\u227C","Precedes":"\u227A","PrecedesEqual":"\u2AAF","PrecedesSlantEqual":"\u227C","PrecedesTilde":"\u227E","preceq":"\u2AAF","precnapprox":"\u2AB9","precneqq":"\u2AB5","precnsim":"\u22E8","pre":"\u2AAF","prE":"\u2AB3","precsim":"\u227E","prime":"\u2032","Prime":"\u2033","primes":"\u2119","prnap":"\u2AB9","prnE":"\u2AB5","prnsim":"\u22E8","prod":"\u220F","Product":"\u220F","profalar":"\u232E","profline":"\u2312","profsurf":"\u2313","prop":"\u221D","Proportional":"\u221D","Proportion":"\u2237","propto":"\u221D","prsim":"\u227E","prurel":"\u22B0","Pscr":"\uD835\uDCAB","pscr":"\uD835\uDCC5","Psi":"\u03A8","psi":"\u03C8","puncsp":"\u2008","Qfr":"\uD835\uDD14","qfr":"\uD835\uDD2E","qint":"\u2A0C","qopf":"\uD835\uDD62","Qopf":"\u211A","qprime":"\u2057","Qscr":"\uD835\uDCAC","qscr":"\uD835\uDCC6","quaternions":"\u210D","quatint":"\u2A16","quest":"?","questeq":"\u225F","quot":"\"","QUOT":"\"","rAarr":"\u21DB","race":"\u223D\u0331","Racute":"\u0154","racute":"\u0155","radic":"\u221A","raemptyv":"\u29B3","rang":"\u27E9","Rang":"\u27EB","rangd":"\u2992","range":"\u29A5","rangle":"\u27E9","raquo":"\u00BB","rarrap":"\u2975","rarrb":"\u21E5","rarrbfs":"\u2920","rarrc":"\u2933","rarr":"\u2192","Rarr":"\u21A0","rArr":"\u21D2","rarrfs":"\u291E","rarrhk":"\u21AA","rarrlp":"\u21AC","rarrpl":"\u2945","rarrsim":"\u2974","Rarrtl":"\u2916","rarrtl":"\u21A3","rarrw":"\u219D","ratail":"\u291A","rAtail":"\u291C","ratio":"\u2236","rationals":"\u211A","rbarr":"\u290D","rBarr":"\u290F","RBarr":"\u2910","rbbrk":"\u2773","rbrace":"}","rbrack":"]","rbrke":"\u298C","rbrksld":"\u298E","rbrkslu":"\u2990","Rcaron":"\u0158","rcaron":"\u0159","Rcedil":"\u0156","rcedil":"\u0157","rceil":"\u2309","rcub":"}","Rcy":"\u0420","rcy":"\u0440","rdca":"\u2937","rdldhar":"\u2969","rdquo":"\u201D","rdquor":"\u201D","rdsh":"\u21B3","real":"\u211C","realine":"\u211B","realpart":"\u211C","reals":"\u211D","Re":"\u211C","rect":"\u25AD","reg":"\u00AE","REG":"\u00AE","ReverseElement":"\u220B","ReverseEquilibrium":"\u21CB","ReverseUpEquilibrium":"\u296F","rfisht":"\u297D","rfloor":"\u230B","rfr":"\uD835\uDD2F","Rfr":"\u211C","rHar":"\u2964","rhard":"\u21C1","rharu":"\u21C0","rharul":"\u296C","Rho":"\u03A1","rho":"\u03C1","rhov":"\u03F1","RightAngleBracket":"\u27E9","RightArrowBar":"\u21E5","rightarrow":"\u2192","RightArrow":"\u2192","Rightarrow":"\u21D2","RightArrowLeftArrow":"\u21C4","rightarrowtail":"\u21A3","RightCeiling":"\u2309","RightDoubleBracket":"\u27E7","RightDownTeeVector":"\u295D","RightDownVectorBar":"\u2955","RightDownVector":"\u21C2","RightFloor":"\u230B","rightharpoondown":"\u21C1","rightharpoonup":"\u21C0","rightleftarrows":"\u21C4","rightleftharpoons":"\u21CC","rightrightarrows":"\u21C9","rightsquigarrow":"\u219D","RightTeeArrow":"\u21A6","RightTee":"\u22A2","RightTeeVector":"\u295B","rightthreetimes":"\u22CC","RightTriangleBar":"\u29D0","RightTriangle":"\u22B3","RightTriangleEqual":"\u22B5","RightUpDownVector":"\u294F","RightUpTeeVector":"\u295C","RightUpVectorBar":"\u2954","RightUpVector":"\u21BE","RightVectorBar":"\u2953","RightVector":"\u21C0","ring":"\u02DA","risingdotseq":"\u2253","rlarr":"\u21C4","rlhar":"\u21CC","rlm":"\u200F","rmoustache":"\u23B1","rmoust":"\u23B1","rnmid":"\u2AEE","roang":"\u27ED","roarr":"\u21FE","robrk":"\u27E7","ropar":"\u2986","ropf":"\uD835\uDD63","Ropf":"\u211D","roplus":"\u2A2E","rotimes":"\u2A35","RoundImplies":"\u2970","rpar":")","rpargt":"\u2994","rppolint":"\u2A12","rrarr":"\u21C9","Rrightarrow":"\u21DB","rsaquo":"\u203A","rscr":"\uD835\uDCC7","Rscr":"\u211B","rsh":"\u21B1","Rsh":"\u21B1","rsqb":"]","rsquo":"\u2019","rsquor":"\u2019","rthree":"\u22CC","rtimes":"\u22CA","rtri":"\u25B9","rtrie":"\u22B5","rtrif":"\u25B8","rtriltri":"\u29CE","RuleDelayed":"\u29F4","ruluhar":"\u2968","rx":"\u211E","Sacute":"\u015A","sacute":"\u015B","sbquo":"\u201A","scap":"\u2AB8","Scaron":"\u0160","scaron":"\u0161","Sc":"\u2ABC","sc":"\u227B","sccue":"\u227D","sce":"\u2AB0","scE":"\u2AB4","Scedil":"\u015E","scedil":"\u015F","Scirc":"\u015C","scirc":"\u015D","scnap":"\u2ABA","scnE":"\u2AB6","scnsim":"\u22E9","scpolint":"\u2A13","scsim":"\u227F","Scy":"\u0421","scy":"\u0441","sdotb":"\u22A1","sdot":"\u22C5","sdote":"\u2A66","searhk":"\u2925","searr":"\u2198","seArr":"\u21D8","searrow":"\u2198","sect":"\u00A7","semi":";","seswar":"\u2929","setminus":"\u2216","setmn":"\u2216","sext":"\u2736","Sfr":"\uD835\uDD16","sfr":"\uD835\uDD30","sfrown":"\u2322","sharp":"\u266F","SHCHcy":"\u0429","shchcy":"\u0449","SHcy":"\u0428","shcy":"\u0448","ShortDownArrow":"\u2193","ShortLeftArrow":"\u2190","shortmid":"\u2223","shortparallel":"\u2225","ShortRightArrow":"\u2192","ShortUpArrow":"\u2191","shy":"\u00AD","Sigma":"\u03A3","sigma":"\u03C3","sigmaf":"\u03C2","sigmav":"\u03C2","sim":"\u223C","simdot":"\u2A6A","sime":"\u2243","simeq":"\u2243","simg":"\u2A9E","simgE":"\u2AA0","siml":"\u2A9D","simlE":"\u2A9F","simne":"\u2246","simplus":"\u2A24","simrarr":"\u2972","slarr":"\u2190","SmallCircle":"\u2218","smallsetminus":"\u2216","smashp":"\u2A33","smeparsl":"\u29E4","smid":"\u2223","smile":"\u2323","smt":"\u2AAA","smte":"\u2AAC","smtes":"\u2AAC\uFE00","SOFTcy":"\u042C","softcy":"\u044C","solbar":"\u233F","solb":"\u29C4","sol":"/","Sopf":"\uD835\uDD4A","sopf":"\uD835\uDD64","spades":"\u2660","spadesuit":"\u2660","spar":"\u2225","sqcap":"\u2293","sqcaps":"\u2293\uFE00","sqcup":"\u2294","sqcups":"\u2294\uFE00","Sqrt":"\u221A","sqsub":"\u228F","sqsube":"\u2291","sqsubset":"\u228F","sqsubseteq":"\u2291","sqsup":"\u2290","sqsupe":"\u2292","sqsupset":"\u2290","sqsupseteq":"\u2292","square":"\u25A1","Square":"\u25A1","SquareIntersection":"\u2293","SquareSubset":"\u228F","SquareSubsetEqual":"\u2291","SquareSuperset":"\u2290","SquareSupersetEqual":"\u2292","SquareUnion":"\u2294","squarf":"\u25AA","squ":"\u25A1","squf":"\u25AA","srarr":"\u2192","Sscr":"\uD835\uDCAE","sscr":"\uD835\uDCC8","ssetmn":"\u2216","ssmile":"\u2323","sstarf":"\u22C6","Star":"\u22C6","star":"\u2606","starf":"\u2605","straightepsilon":"\u03F5","straightphi":"\u03D5","strns":"\u00AF","sub":"\u2282","Sub":"\u22D0","subdot":"\u2ABD","subE":"\u2AC5","sube":"\u2286","subedot":"\u2AC3","submult":"\u2AC1","subnE":"\u2ACB","subne":"\u228A","subplus":"\u2ABF","subrarr":"\u2979","subset":"\u2282","Subset":"\u22D0","subseteq":"\u2286","subseteqq":"\u2AC5","SubsetEqual":"\u2286","subsetneq":"\u228A","subsetneqq":"\u2ACB","subsim":"\u2AC7","subsub":"\u2AD5","subsup":"\u2AD3","succapprox":"\u2AB8","succ":"\u227B","succcurlyeq":"\u227D","Succeeds":"\u227B","SucceedsEqual":"\u2AB0","SucceedsSlantEqual":"\u227D","SucceedsTilde":"\u227F","succeq":"\u2AB0","succnapprox":"\u2ABA","succneqq":"\u2AB6","succnsim":"\u22E9","succsim":"\u227F","SuchThat":"\u220B","sum":"\u2211","Sum":"\u2211","sung":"\u266A","sup1":"\u00B9","sup2":"\u00B2","sup3":"\u00B3","sup":"\u2283","Sup":"\u22D1","supdot":"\u2ABE","supdsub":"\u2AD8","supE":"\u2AC6","supe":"\u2287","supedot":"\u2AC4","Superset":"\u2283","SupersetEqual":"\u2287","suphsol":"\u27C9","suphsub":"\u2AD7","suplarr":"\u297B","supmult":"\u2AC2","supnE":"\u2ACC","supne":"\u228B","supplus":"\u2AC0","supset":"\u2283","Supset":"\u22D1","supseteq":"\u2287","supseteqq":"\u2AC6","supsetneq":"\u228B","supsetneqq":"\u2ACC","supsim":"\u2AC8","supsub":"\u2AD4","supsup":"\u2AD6","swarhk":"\u2926","swarr":"\u2199","swArr":"\u21D9","swarrow":"\u2199","swnwar":"\u292A","szlig":"\u00DF","Tab":"\t","target":"\u2316","Tau":"\u03A4","tau":"\u03C4","tbrk":"\u23B4","Tcaron":"\u0164","tcaron":"\u0165","Tcedil":"\u0162","tcedil":"\u0163","Tcy":"\u0422","tcy":"\u0442","tdot":"\u20DB","telrec":"\u2315","Tfr":"\uD835\uDD17","tfr":"\uD835\uDD31","there4":"\u2234","therefore":"\u2234","Therefore":"\u2234","Theta":"\u0398","theta":"\u03B8","thetasym":"\u03D1","thetav":"\u03D1","thickapprox":"\u2248","thicksim":"\u223C","ThickSpace":"\u205F\u200A","ThinSpace":"\u2009","thinsp":"\u2009","thkap":"\u2248","thksim":"\u223C","THORN":"\u00DE","thorn":"\u00FE","tilde":"\u02DC","Tilde":"\u223C","TildeEqual":"\u2243","TildeFullEqual":"\u2245","TildeTilde":"\u2248","timesbar":"\u2A31","timesb":"\u22A0","times":"\u00D7","timesd":"\u2A30","tint":"\u222D","toea":"\u2928","topbot":"\u2336","topcir":"\u2AF1","top":"\u22A4","Topf":"\uD835\uDD4B","topf":"\uD835\uDD65","topfork":"\u2ADA","tosa":"\u2929","tprime":"\u2034","trade":"\u2122","TRADE":"\u2122","triangle":"\u25B5","triangledown":"\u25BF","triangleleft":"\u25C3","trianglelefteq":"\u22B4","triangleq":"\u225C","triangleright":"\u25B9","trianglerighteq":"\u22B5","tridot":"\u25EC","trie":"\u225C","triminus":"\u2A3A","TripleDot":"\u20DB","triplus":"\u2A39","trisb":"\u29CD","tritime":"\u2A3B","trpezium":"\u23E2","Tscr":"\uD835\uDCAF","tscr":"\uD835\uDCC9","TScy":"\u0426","tscy":"\u0446","TSHcy":"\u040B","tshcy":"\u045B","Tstrok":"\u0166","tstrok":"\u0167","twixt":"\u226C","twoheadleftarrow":"\u219E","twoheadrightarrow":"\u21A0","Uacute":"\u00DA","uacute":"\u00FA","uarr":"\u2191","Uarr":"\u219F","uArr":"\u21D1","Uarrocir":"\u2949","Ubrcy":"\u040E","ubrcy":"\u045E","Ubreve":"\u016C","ubreve":"\u016D","Ucirc":"\u00DB","ucirc":"\u00FB","Ucy":"\u0423","ucy":"\u0443","udarr":"\u21C5","Udblac":"\u0170","udblac":"\u0171","udhar":"\u296E","ufisht":"\u297E","Ufr":"\uD835\uDD18","ufr":"\uD835\uDD32","Ugrave":"\u00D9","ugrave":"\u00F9","uHar":"\u2963","uharl":"\u21BF","uharr":"\u21BE","uhblk":"\u2580","ulcorn":"\u231C","ulcorner":"\u231C","ulcrop":"\u230F","ultri":"\u25F8","Umacr":"\u016A","umacr":"\u016B","uml":"\u00A8","UnderBar":"_","UnderBrace":"\u23DF","UnderBracket":"\u23B5","UnderParenthesis":"\u23DD","Union":"\u22C3","UnionPlus":"\u228E","Uogon":"\u0172","uogon":"\u0173","Uopf":"\uD835\uDD4C","uopf":"\uD835\uDD66","UpArrowBar":"\u2912","uparrow":"\u2191","UpArrow":"\u2191","Uparrow":"\u21D1","UpArrowDownArrow":"\u21C5","updownarrow":"\u2195","UpDownArrow":"\u2195","Updownarrow":"\u21D5","UpEquilibrium":"\u296E","upharpoonleft":"\u21BF","upharpoonright":"\u21BE","uplus":"\u228E","UpperLeftArrow":"\u2196","UpperRightArrow":"\u2197","upsi":"\u03C5","Upsi":"\u03D2","upsih":"\u03D2","Upsilon":"\u03A5","upsilon":"\u03C5","UpTeeArrow":"\u21A5","UpTee":"\u22A5","upuparrows":"\u21C8","urcorn":"\u231D","urcorner":"\u231D","urcrop":"\u230E","Uring":"\u016E","uring":"\u016F","urtri":"\u25F9","Uscr":"\uD835\uDCB0","uscr":"\uD835\uDCCA","utdot":"\u22F0","Utilde":"\u0168","utilde":"\u0169","utri":"\u25B5","utrif":"\u25B4","uuarr":"\u21C8","Uuml":"\u00DC","uuml":"\u00FC","uwangle":"\u29A7","vangrt":"\u299C","varepsilon":"\u03F5","varkappa":"\u03F0","varnothing":"\u2205","varphi":"\u03D5","varpi":"\u03D6","varpropto":"\u221D","varr":"\u2195","vArr":"\u21D5","varrho":"\u03F1","varsigma":"\u03C2","varsubsetneq":"\u228A\uFE00","varsubsetneqq":"\u2ACB\uFE00","varsupsetneq":"\u228B\uFE00","varsupsetneqq":"\u2ACC\uFE00","vartheta":"\u03D1","vartriangleleft":"\u22B2","vartriangleright":"\u22B3","vBar":"\u2AE8","Vbar":"\u2AEB","vBarv":"\u2AE9","Vcy":"\u0412","vcy":"\u0432","vdash":"\u22A2","vDash":"\u22A8","Vdash":"\u22A9","VDash":"\u22AB","Vdashl":"\u2AE6","veebar":"\u22BB","vee":"\u2228","Vee":"\u22C1","veeeq":"\u225A","vellip":"\u22EE","verbar":"|","Verbar":"\u2016","vert":"|","Vert":"\u2016","VerticalBar":"\u2223","VerticalLine":"|","VerticalSeparator":"\u2758","VerticalTilde":"\u2240","VeryThinSpace":"\u200A","Vfr":"\uD835\uDD19","vfr":"\uD835\uDD33","vltri":"\u22B2","vnsub":"\u2282\u20D2","vnsup":"\u2283\u20D2","Vopf":"\uD835\uDD4D","vopf":"\uD835\uDD67","vprop":"\u221D","vrtri":"\u22B3","Vscr":"\uD835\uDCB1","vscr":"\uD835\uDCCB","vsubnE":"\u2ACB\uFE00","vsubne":"\u228A\uFE00","vsupnE":"\u2ACC\uFE00","vsupne":"\u228B\uFE00","Vvdash":"\u22AA","vzigzag":"\u299A","Wcirc":"\u0174","wcirc":"\u0175","wedbar":"\u2A5F","wedge":"\u2227","Wedge":"\u22C0","wedgeq":"\u2259","weierp":"\u2118","Wfr":"\uD835\uDD1A","wfr":"\uD835\uDD34","Wopf":"\uD835\uDD4E","wopf":"\uD835\uDD68","wp":"\u2118","wr":"\u2240","wreath":"\u2240","Wscr":"\uD835\uDCB2","wscr":"\uD835\uDCCC","xcap":"\u22C2","xcirc":"\u25EF","xcup":"\u22C3","xdtri":"\u25BD","Xfr":"\uD835\uDD1B","xfr":"\uD835\uDD35","xharr":"\u27F7","xhArr":"\u27FA","Xi":"\u039E","xi":"\u03BE","xlarr":"\u27F5","xlArr":"\u27F8","xmap":"\u27FC","xnis":"\u22FB","xodot":"\u2A00","Xopf":"\uD835\uDD4F","xopf":"\uD835\uDD69","xoplus":"\u2A01","xotime":"\u2A02","xrarr":"\u27F6","xrArr":"\u27F9","Xscr":"\uD835\uDCB3","xscr":"\uD835\uDCCD","xsqcup":"\u2A06","xuplus":"\u2A04","xutri":"\u25B3","xvee":"\u22C1","xwedge":"\u22C0","Yacute":"\u00DD","yacute":"\u00FD","YAcy":"\u042F","yacy":"\u044F","Ycirc":"\u0176","ycirc":"\u0177","Ycy":"\u042B","ycy":"\u044B","yen":"\u00A5","Yfr":"\uD835\uDD1C","yfr":"\uD835\uDD36","YIcy":"\u0407","yicy":"\u0457","Yopf":"\uD835\uDD50","yopf":"\uD835\uDD6A","Yscr":"\uD835\uDCB4","yscr":"\uD835\uDCCE","YUcy":"\u042E","yucy":"\u044E","yuml":"\u00FF","Yuml":"\u0178","Zacute":"\u0179","zacute":"\u017A","Zcaron":"\u017D","zcaron":"\u017E","Zcy":"\u0417","zcy":"\u0437","Zdot":"\u017B","zdot":"\u017C","zeetrf":"\u2128","ZeroWidthSpace":"\u200B","Zeta":"\u0396","zeta":"\u03B6","zfr":"\uD835\uDD37","Zfr":"\u2128","ZHcy":"\u0416","zhcy":"\u0436","zigrarr":"\u21DD","zopf":"\uD835\uDD6B","Zopf":"\u2124","Zscr":"\uD835\uDCB5","zscr":"\uD835\uDCCF","zwj":"\u200D","zwnj":"\u200C"};
  },{}],53:[function(require,module,exports){


  ////////////////////////////////////////////////////////////////////////////////
  // Helpers

  // Merge objects
  //
  function assign(obj /*from1, from2, from3, ...*/) {
    var sources = Array.prototype.slice.call(arguments, 1);

    sources.forEach(function (source) {
      if (!source) { return; }

      Object.keys(source).forEach(function (key) {
        obj[key] = source[key];
      });
    });

    return obj;
  }

  function _class(obj) { return Object.prototype.toString.call(obj); }
  function isString(obj) { return _class(obj) === '[object String]'; }
  function isObject(obj) { return _class(obj) === '[object Object]'; }
  function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
  function isFunction(obj) { return _class(obj) === '[object Function]'; }


  function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

  ////////////////////////////////////////////////////////////////////////////////


  var defaultOptions = {
    fuzzyLink: true,
    fuzzyEmail: true,
    fuzzyIP: false
  };


  function isOptionsObj(obj) {
    return Object.keys(obj || {}).reduce(function (acc, k) {
      return acc || defaultOptions.hasOwnProperty(k);
    }, false);
  }


  var defaultSchemas = {
    'http:': {
      validate: function (text, pos, self) {
        var tail = text.slice(pos);

        if (!self.re.http) {
          // compile lazily, because "host"-containing variables can change on tlds update.
          self.re.http =  new RegExp(
            '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
          );
        }
        if (self.re.http.test(tail)) {
          return tail.match(self.re.http)[0].length;
        }
        return 0;
      }
    },
    'https:':  'http:',
    'ftp:':    'http:',
    '//':      {
      validate: function (text, pos, self) {
        var tail = text.slice(pos);

        if (!self.re.no_http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
          self.re.no_http =  new RegExp(
            '^' +
            self.re.src_auth +
            // Don't allow single-level domains, because of false positives like '//test'
            // with code comments
            '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
            self.re.src_port +
            self.re.src_host_terminator +
            self.re.src_path,

            'i'
          );
        }

        if (self.re.no_http.test(tail)) {
          // should not be `://` & `///`, that protects from errors in protocol name
          if (pos >= 3 && text[pos - 3] === ':') { return 0; }
          if (pos >= 3 && text[pos - 3] === '/') { return 0; }
          return tail.match(self.re.no_http)[0].length;
        }
        return 0;
      }
    },
    'mailto:': {
      validate: function (text, pos, self) {
        var tail = text.slice(pos);

        if (!self.re.mailto) {
          self.re.mailto =  new RegExp(
            '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
          );
        }
        if (self.re.mailto.test(tail)) {
          return tail.match(self.re.mailto)[0].length;
        }
        return 0;
      }
    }
  };

  /*eslint-disable max-len*/

  // RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
  var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

  // DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
  var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

  /*eslint-enable max-len*/

  ////////////////////////////////////////////////////////////////////////////////

  function resetScanCache(self) {
    self.__index__ = -1;
    self.__text_cache__   = '';
  }

  function createValidator(re) {
    return function (text, pos) {
      var tail = text.slice(pos);

      if (re.test(tail)) {
        return tail.match(re)[0].length;
      }
      return 0;
    };
  }

  function createNormalizer() {
    return function (match, self) {
      self.normalize(match);
    };
  }

  // Schemas compiler. Build regexps.
  //
  function compile(self) {

    // Load & clone RE patterns.
    var re = self.re = require('./lib/re')(self.__opts__);

    // Define dynamic patterns
    var tlds = self.__tlds__.slice();

    self.onCompile();

    if (!self.__tlds_replaced__) {
      tlds.push(tlds_2ch_src_re);
    }
    tlds.push(re.src_xn);

    re.src_tlds = tlds.join('|');

    function untpl(tpl) { return tpl.replace('%TLDS%', re.src_tlds); }

    re.email_fuzzy      = RegExp(untpl(re.tpl_email_fuzzy), 'i');
    re.link_fuzzy       = RegExp(untpl(re.tpl_link_fuzzy), 'i');
    re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
    re.host_fuzzy_test  = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

    //
    // Compile each schema
    //

    var aliases = [];

    self.__compiled__ = {}; // Reset compiled data

    function schemaError(name, val) {
      throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
    }

    Object.keys(self.__schemas__).forEach(function (name) {
      var val = self.__schemas__[name];

      // skip disabled methods
      if (val === null) { return; }

      var compiled = { validate: null, link: null };

      self.__compiled__[name] = compiled;

      if (isObject(val)) {
        if (isRegExp(val.validate)) {
          compiled.validate = createValidator(val.validate);
        } else if (isFunction(val.validate)) {
          compiled.validate = val.validate;
        } else {
          schemaError(name, val);
        }

        if (isFunction(val.normalize)) {
          compiled.normalize = val.normalize;
        } else if (!val.normalize) {
          compiled.normalize = createNormalizer();
        } else {
          schemaError(name, val);
        }

        return;
      }

      if (isString(val)) {
        aliases.push(name);
        return;
      }

      schemaError(name, val);
    });

    //
    // Compile postponed aliases
    //

    aliases.forEach(function (alias) {
      if (!self.__compiled__[self.__schemas__[alias]]) {
        // Silently fail on missed schemas to avoid errons on disable.
        // schemaError(alias, self.__schemas__[alias]);
        return;
      }

      self.__compiled__[alias].validate =
        self.__compiled__[self.__schemas__[alias]].validate;
      self.__compiled__[alias].normalize =
        self.__compiled__[self.__schemas__[alias]].normalize;
    });

    //
    // Fake record for guessed links
    //
    self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

    //
    // Build schema condition
    //
    var slist = Object.keys(self.__compiled__)
                        .filter(function (name) {
                          // Filter disabled & fake schemas
                          return name.length > 0 && self.__compiled__[name];
                        })
                        .map(escapeRE)
                        .join('|');
    // (?!_) cause 1.5x slowdown
    self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
    self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');

    self.re.pretest       = RegExp(
                              '(' + self.re.schema_test.source + ')|' +
                              '(' + self.re.host_fuzzy_test.source + ')|' +
                              '@',
                              'i');

    //
    // Cleanup
    //

    resetScanCache(self);
  }

  /**
   * class Match
   *
   * Match result. Single element of array, returned by [[LinkifyIt#match]]
   **/
  function Match(self, shift) {
    var start = self.__index__,
        end   = self.__last_index__,
        text  = self.__text_cache__.slice(start, end);

    /**
     * Match#schema -> String
     *
     * Prefix (protocol) for matched string.
     **/
    this.schema    = self.__schema__.toLowerCase();
    /**
     * Match#index -> Number
     *
     * First position of matched string.
     **/
    this.index     = start + shift;
    /**
     * Match#lastIndex -> Number
     *
     * Next position after matched string.
     **/
    this.lastIndex = end + shift;
    /**
     * Match#raw -> String
     *
     * Matched string.
     **/
    this.raw       = text;
    /**
     * Match#text -> String
     *
     * Notmalized text of matched string.
     **/
    this.text      = text;
    /**
     * Match#url -> String
     *
     * Normalized url of matched string.
     **/
    this.url       = text;
  }

  function createMatch(self, shift) {
    var match = new Match(self, shift);

    self.__compiled__[match.schema].normalize(match, self);

    return match;
  }


  /**
   * class LinkifyIt
   **/

  /**
   * new LinkifyIt(schemas, options)
   * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
   * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
   *
   * Creates new linkifier instance with optional additional schemas.
   * Can be called without `new` keyword for convenience.
   *
   * By default understands:
   *
   * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
   * - "fuzzy" links and emails (example.com, foo@bar.com).
   *
   * `schemas` is an object, where each key/value describes protocol/rule:
   *
   * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
   *   for example). `linkify-it` makes shure that prefix is not preceeded with
   *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
   * - __value__ - rule to check tail after link prefix
   *   - _String_ - just alias to existing rule
   *   - _Object_
   *     - _validate_ - validator function (should return matched length on success),
   *       or `RegExp`.
   *     - _normalize_ - optional function to normalize text & url of matched result
   *       (for example, for @twitter mentions).
   *
   * `options`:
   *
   * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
   * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
   *   like version numbers. Default `false`.
   * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
   *
   **/
  function LinkifyIt(schemas, options) {
    if (!(this instanceof LinkifyIt)) {
      return new LinkifyIt(schemas, options);
    }

    if (!options) {
      if (isOptionsObj(schemas)) {
        options = schemas;
        schemas = {};
      }
    }

    this.__opts__           = assign({}, defaultOptions, options);

    // Cache last tested result. Used to skip repeating steps on next `match` call.
    this.__index__          = -1;
    this.__last_index__     = -1; // Next scan position
    this.__schema__         = '';
    this.__text_cache__     = '';

    this.__schemas__        = assign({}, defaultSchemas, schemas);
    this.__compiled__       = {};

    this.__tlds__           = tlds_default;
    this.__tlds_replaced__  = false;

    this.re = {};

    compile(this);
  }


  /** chainable
   * LinkifyIt#add(schema, definition)
   * - schema (String): rule name (fixed pattern prefix)
   * - definition (String|RegExp|Object): schema definition
   *
   * Add new rule definition. See constructor description for details.
   **/
  LinkifyIt.prototype.add = function add(schema, definition) {
    this.__schemas__[schema] = definition;
    compile(this);
    return this;
  };


  /** chainable
   * LinkifyIt#set(options)
   * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
   *
   * Set recognition options for links without schema.
   **/
  LinkifyIt.prototype.set = function set(options) {
    this.__opts__ = assign(this.__opts__, options);
    return this;
  };


  /**
   * LinkifyIt#test(text) -> Boolean
   *
   * Searches linkifiable pattern and returns `true` on success or `false` on fail.
   **/
  LinkifyIt.prototype.test = function test(text) {
    // Reset scan cache
    this.__text_cache__ = text;
    this.__index__      = -1;

    if (!text.length) { return false; }

    var m, ml, me, len, shift, next, re, tld_pos, at_pos;

    // try to scan for link with schema - that's the most simple rule
    if (this.re.schema_test.test(text)) {
      re = this.re.schema_search;
      re.lastIndex = 0;
      while ((m = re.exec(text)) !== null) {
        len = this.testSchemaAt(text, m[2], re.lastIndex);
        if (len) {
          this.__schema__     = m[2];
          this.__index__      = m.index + m[1].length;
          this.__last_index__ = m.index + m[0].length + len;
          break;
        }
      }
    }

    if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
      // guess schemaless links
      tld_pos = text.search(this.re.host_fuzzy_test);
      if (tld_pos >= 0) {
        // if tld is located after found link - no need to check fuzzy pattern
        if (this.__index__ < 0 || tld_pos < this.__index__) {
          if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

            shift = ml.index + ml[1].length;

            if (this.__index__ < 0 || shift < this.__index__) {
              this.__schema__     = '';
              this.__index__      = shift;
              this.__last_index__ = ml.index + ml[0].length;
            }
          }
        }
      }
    }

    if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
      // guess schemaless emails
      at_pos = text.indexOf('@');
      if (at_pos >= 0) {
        // We can't skip this check, because this cases are possible:
        // 192.168.1.1@gmail.com, my.in@example.com
        if ((me = text.match(this.re.email_fuzzy)) !== null) {

          shift = me.index + me[1].length;
          next  = me.index + me[0].length;

          if (this.__index__ < 0 || shift < this.__index__ ||
              (shift === this.__index__ && next > this.__last_index__)) {
            this.__schema__     = 'mailto:';
            this.__index__      = shift;
            this.__last_index__ = next;
          }
        }
      }
    }

    return this.__index__ >= 0;
  };


  /**
   * LinkifyIt#pretest(text) -> Boolean
   *
   * Very quick check, that can give false positives. Returns true if link MAY BE
   * can exists. Can be used for speed optimization, when you need to check that
   * link NOT exists.
   **/
  LinkifyIt.prototype.pretest = function pretest(text) {
    return this.re.pretest.test(text);
  };


  /**
   * LinkifyIt#testSchemaAt(text, name, position) -> Number
   * - text (String): text to scan
   * - name (String): rule (schema) name
   * - position (Number): text offset to check from
   *
   * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
   * at given position. Returns length of found pattern (0 on fail).
   **/
  LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
    // If not supported schema check requested - terminate
    if (!this.__compiled__[schema.toLowerCase()]) {
      return 0;
    }
    return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
  };


  /**
   * LinkifyIt#match(text) -> Array|null
   *
   * Returns array of found link descriptions or `null` on fail. We strongly
   * recommend to use [[LinkifyIt#test]] first, for best speed.
   *
   * ##### Result match description
   *
   * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
   *   protocol-neutral  links.
   * - __index__ - offset of matched text
   * - __lastIndex__ - index of next char after mathch end
   * - __raw__ - matched text
   * - __text__ - normalized text
   * - __url__ - link, generated from matched text
   **/
  LinkifyIt.prototype.match = function match(text) {
    var shift = 0, result = [];

    // Try to take previous element from cache, if .test() called before
    if (this.__index__ >= 0 && this.__text_cache__ === text) {
      result.push(createMatch(this, shift));
      shift = this.__last_index__;
    }

    // Cut head if cache was used
    var tail = shift ? text.slice(shift) : text;

    // Scan string until end reached
    while (this.test(tail)) {
      result.push(createMatch(this, shift));

      tail = tail.slice(this.__last_index__);
      shift += this.__last_index__;
    }

    if (result.length) {
      return result;
    }

    return null;
  };


  /** chainable
   * LinkifyIt#tlds(list [, keepOld]) -> this
   * - list (Array): list of tlds
   * - keepOld (Boolean): merge with current list if `true` (`false` by default)
   *
   * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
   * to avoid false positives. By default this algorythm used:
   *
   * - hostname with any 2-letter root zones are ok.
   * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
   *   are ok.
   * - encoded (`xn--...`) root zones are ok.
   *
   * If list is replaced, then exact match for 2-chars root zones will be checked.
   **/
  LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
    list = Array.isArray(list) ? list : [ list ];

    if (!keepOld) {
      this.__tlds__ = list.slice();
      this.__tlds_replaced__ = true;
      compile(this);
      return this;
    }

    this.__tlds__ = this.__tlds__.concat(list)
                                    .sort()
                                    .filter(function (el, idx, arr) {
                                      return el !== arr[idx - 1];
                                    })
                                    .reverse();

    compile(this);
    return this;
  };

  /**
   * LinkifyIt#normalize(match)
   *
   * Default normalizer (if schema does not define it's own).
   **/
  LinkifyIt.prototype.normalize = function normalize(match) {

    // Do minimal possible changes by default. Need to collect feedback prior
    // to move forward https://github.com/markdown-it/linkify-it/issues/1

    if (!match.schema) { match.url = 'http://' + match.url; }

    if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
      match.url = 'mailto:' + match.url;
    }
  };


  /**
   * LinkifyIt#onCompile()
   *
   * Override to modify basic RegExp-s.
   **/
  LinkifyIt.prototype.onCompile = function onCompile() {
  };


  module.exports = LinkifyIt;

  },{"./lib/re":54}],54:[function(require,module,exports){


  module.exports = function (opts) {
    var re = {};

    // Use direct extract instead of `regenerate` to reduse browserified size
    re.src_Any = require('uc.micro/properties/Any/regex').source;
    re.src_Cc  = require('uc.micro/categories/Cc/regex').source;
    re.src_Z   = require('uc.micro/categories/Z/regex').source;
    re.src_P   = require('uc.micro/categories/P/regex').source;

    // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
    re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

    // \p{\Z\Cc} (white spaces + control)
    re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

    // Experimental. List of chars, completely prohibited in links
    // because can separate it from other part of text
    var text_separators = '[><\uff5c]';

    // All possible word characters (everything without punctuation, spaces & controls)
    // Defined via punctuation & spaces to save space
    // Should be something like \p{\L\N\S\M} (\w but without `_`)
    re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
    // The same as abothe but without [0-9]
    // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

    ////////////////////////////////////////////////////////////////////////////////

    re.src_ip4 =

      '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

    // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
    re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

    re.src_port =

      '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

    re.src_host_terminator =

      '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

    re.src_path =

      '(?:' +
        '[/?#]' +
          '(?:' +
            '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' +
            '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
            '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
            '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
            '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
            "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
            "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
            '\\.{2,3}[a-zA-Z0-9%/]|' + // github has ... in commit range links. Restrict to
                                       // - english
                                       // - percent-encoded
                                       // - parts of file path
                                       // until more examples found.
            '\\.(?!' + re.src_ZCc + '|[.]).|' +
            (opts && opts['---'] ?
              '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
            :
              '\\-+|'
            ) +
            '\\,(?!' + re.src_ZCc + ').|' +      // allow `,,,` in paths
            '\\!(?!' + re.src_ZCc + '|[!]).|' +
            '\\?(?!' + re.src_ZCc + '|[?]).' +
          ')+' +
        '|\\/' +
      ')?';

    re.src_email_name =

      '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+';

    re.src_xn =

      'xn--[a-z0-9\\-]{1,59}';

    // More to read about domain names
    // http://serverfault.com/questions/638260/

    re.src_domain_root =

      // Allow letters & digits (http://test1)
      '(?:' +
        re.src_xn +
        '|' +
        re.src_pseudo_letter + '{1,63}' +
      ')';

    re.src_domain =

      '(?:' +
        re.src_xn +
        '|' +
        '(?:' + re.src_pseudo_letter + ')' +
        '|' +
        // don't allow `--` in domain names, because:
        // - that can conflict with markdown &mdash; / &ndash;
        // - nobody use those anyway
        '(?:' + re.src_pseudo_letter + '(?:-(?!-)|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
      ')';

    re.src_host =

      '(?:' +
      // Don't need IP check, because digits are already allowed in normal domain names
      //   src_ip4 +
      // '|' +
        '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
      ')';

    re.tpl_host_fuzzy =

      '(?:' +
        re.src_ip4 +
      '|' +
        '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
      ')';

    re.tpl_host_no_ip_fuzzy =

      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

    re.src_host_strict =

      re.src_host + re.src_host_terminator;

    re.tpl_host_fuzzy_strict =

      re.tpl_host_fuzzy + re.src_host_terminator;

    re.src_host_port_strict =

      re.src_host + re.src_port + re.src_host_terminator;

    re.tpl_host_port_fuzzy_strict =

      re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

    re.tpl_host_port_no_ip_fuzzy_strict =

      re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


    ////////////////////////////////////////////////////////////////////////////////
    // Main rules

    // Rude test fuzzy links by host, for quick deny
    re.tpl_host_fuzzy_test =

      'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

    re.tpl_email_fuzzy =

        '(^|' + text_separators + '|\\(|' + re.src_ZCc + ')(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

    re.tpl_link_fuzzy =
        // Fuzzy link can't be prepended with .:/\- and non punctuation.
        // but can start with > (markdown blockquote)
        '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
        '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

    re.tpl_link_no_ip_fuzzy =
        // Fuzzy link can't be prepended with .:/\- and non punctuation.
        // but can start with > (markdown blockquote)
        '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
        '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

    return re;
  };

  },{"uc.micro/categories/Cc/regex":61,"uc.micro/categories/P/regex":63,"uc.micro/categories/Z/regex":64,"uc.micro/properties/Any/regex":66}],55:[function(require,module,exports){


  /* eslint-disable no-bitwise */

  var decodeCache = {};

  function getDecodeCache(exclude) {
    var i, ch, cache = decodeCache[exclude];
    if (cache) { return cache; }

    cache = decodeCache[exclude] = [];

    for (i = 0; i < 128; i++) {
      ch = String.fromCharCode(i);
      cache.push(ch);
    }

    for (i = 0; i < exclude.length; i++) {
      ch = exclude.charCodeAt(i);
      cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
    }

    return cache;
  }


  // Decode percent-encoded string.
  //
  function decode(string, exclude) {
    var cache;

    if (typeof exclude !== 'string') {
      exclude = decode.defaultChars;
    }

    cache = getDecodeCache(exclude);

    return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
      var i, l, b1, b2, b3, b4, chr,
          result = '';

      for (i = 0, l = seq.length; i < l; i += 3) {
        b1 = parseInt(seq.slice(i + 1, i + 3), 16);

        if (b1 < 0x80) {
          result += cache[b1];
          continue;
        }

        if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
          // 110xxxxx 10xxxxxx
          b2 = parseInt(seq.slice(i + 4, i + 6), 16);

          if ((b2 & 0xC0) === 0x80) {
            chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

            if (chr < 0x80) {
              result += '\ufffd\ufffd';
            } else {
              result += String.fromCharCode(chr);
            }

            i += 3;
            continue;
          }
        }

        if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
          // 1110xxxx 10xxxxxx 10xxxxxx
          b2 = parseInt(seq.slice(i + 4, i + 6), 16);
          b3 = parseInt(seq.slice(i + 7, i + 9), 16);

          if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
            chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

            if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
              result += '\ufffd\ufffd\ufffd';
            } else {
              result += String.fromCharCode(chr);
            }

            i += 6;
            continue;
          }
        }

        if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
          // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
          b2 = parseInt(seq.slice(i + 4, i + 6), 16);
          b3 = parseInt(seq.slice(i + 7, i + 9), 16);
          b4 = parseInt(seq.slice(i + 10, i + 12), 16);

          if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
            chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

            if (chr < 0x10000 || chr > 0x10FFFF) {
              result += '\ufffd\ufffd\ufffd\ufffd';
            } else {
              chr -= 0x10000;
              result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
            }

            i += 9;
            continue;
          }
        }

        result += '\ufffd';
      }

      return result;
    });
  }


  decode.defaultChars   = ';/?:@&=+$,#';
  decode.componentChars = '';


  module.exports = decode;

  },{}],56:[function(require,module,exports){


  var encodeCache = {};


  // Create a lookup array where anything but characters in `chars` string
  // and alphanumeric chars is percent-encoded.
  //
  function getEncodeCache(exclude) {
    var i, ch, cache = encodeCache[exclude];
    if (cache) { return cache; }

    cache = encodeCache[exclude] = [];

    for (i = 0; i < 128; i++) {
      ch = String.fromCharCode(i);

      if (/^[0-9a-z]$/i.test(ch)) {
        // always allow unencoded alphanumeric characters
        cache.push(ch);
      } else {
        cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
      }
    }

    for (i = 0; i < exclude.length; i++) {
      cache[exclude.charCodeAt(i)] = exclude[i];
    }

    return cache;
  }


  // Encode unsafe characters with percent-encoding, skipping already
  // encoded sequences.
  //
  //  - string       - string to encode
  //  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
  //  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
  //
  function encode(string, exclude, keepEscaped) {
    var i, l, code, nextCode, cache,
        result = '';

    if (typeof exclude !== 'string') {
      // encode(string, keepEscaped)
      keepEscaped  = exclude;
      exclude = encode.defaultChars;
    }

    if (typeof keepEscaped === 'undefined') {
      keepEscaped = true;
    }

    cache = getEncodeCache(exclude);

    for (i = 0, l = string.length; i < l; i++) {
      code = string.charCodeAt(i);

      if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
        if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
          result += string.slice(i, i + 3);
          i += 2;
          continue;
        }
      }

      if (code < 128) {
        result += cache[code];
        continue;
      }

      if (code >= 0xD800 && code <= 0xDFFF) {
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
          nextCode = string.charCodeAt(i + 1);
          if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
            result += encodeURIComponent(string[i] + string[i + 1]);
            i++;
            continue;
          }
        }
        result += '%EF%BF%BD';
        continue;
      }

      result += encodeURIComponent(string[i]);
    }

    return result;
  }

  encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
  encode.componentChars = "-_.!~*'()";


  module.exports = encode;

  },{}],57:[function(require,module,exports){


  module.exports = function format(url) {
    var result = '';

    result += url.protocol || '';
    result += url.slashes ? '//' : '';
    result += url.auth ? url.auth + '@' : '';

    if (url.hostname && url.hostname.indexOf(':') !== -1) {
      // ipv6 address
      result += '[' + url.hostname + ']';
    } else {
      result += url.hostname || '';
    }

    result += url.port ? ':' + url.port : '';
    result += url.pathname || '';
    result += url.search || '';
    result += url.hash || '';

    return result;
  };

  },{}],58:[function(require,module,exports){


  module.exports.encode = require('./encode');
  module.exports.decode = require('./decode');
  module.exports.format = require('./format');
  module.exports.parse  = require('./parse');

  },{"./decode":55,"./encode":56,"./format":57,"./parse":59}],59:[function(require,module,exports){

  //
  // Changes from joyent/node:
  //
  // 1. No leading slash in paths,
  //    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
  //
  // 2. Backslashes are not replaced with slashes,
  //    so `http:\\example.org\` is treated like a relative path
  //
  // 3. Trailing colon is treated like a part of the path,
  //    i.e. in `http://example.org:foo` pathname is `:foo`
  //
  // 4. Nothing is URL-encoded in the resulting object,
  //    (in joyent/node some chars in auth and paths are encoded)
  //
  // 5. `url.parse()` does not have `parseQueryString` argument
  //
  // 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
  //    which can be constructed using other parts of the url.
  //


  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.pathname = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,

      // Special case for a simple path URL
      simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

      // RFC 2396: characters reserved for delimiting URLs.
      // We actually just auto-escape these.
      delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

      // RFC 2396: characters not allowed for various reasons.
      unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
      autoEscape = [ '\'' ].concat(unwise),
      // Characters that are never ever allowed in a hostname.
      // Note that any invalid chars are also handled, but these
      // are the ones that are *expected* to be seen, so we fast-path
      // them.
      nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
      hostEndingChars = [ '/', '?', '#' ],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      // protocols that can allow "unsafe" and "unwise" chars.
      /* eslint-disable no-script-url */
      // protocols that never have a hostname.
      hostlessProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that always contain a // bit.
      slashedProtocol = {
        'http': true,
        'https': true,
        'ftp': true,
        'gopher': true,
        'file': true,
        'http:': true,
        'https:': true,
        'ftp:': true,
        'gopher:': true,
        'file:': true
      };
      /* eslint-enable no-script-url */

  function urlParse(url, slashesDenoteHost) {
    if (url && url instanceof Url) { return url; }

    var u = new Url();
    u.parse(url, slashesDenoteHost);
    return u;
  }

  Url.prototype.parse = function(url, slashesDenoteHost) {
    var i, l, lowerProto, hec, slashes,
        rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
        }
        return this;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      lowerProto = proto.toLowerCase();
      this.protocol = proto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }

    if (!hostlessProtocol[proto] &&
        (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
          hostEnd = hec;
        }
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = auth;
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
          hostEnd = hec;
        }
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1) {
        hostEnd = rest.length;
      }

      if (rest[hostEnd - 1] === ':') { hostEnd--; }
      var host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      this.parseHost(host);

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      this.hostname = this.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = this.hostname[0] === '[' &&
          this.hostname[this.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) { continue; }
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = notHost.join('.') + rest;
              }
              this.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = '';
      }

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      }
    }

    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      this.search = rest.substr(qm);
      rest = rest.slice(0, qm);
    }
    if (rest) { this.pathname = rest; }
    if (slashedProtocol[lowerProto] &&
        this.hostname && !this.pathname) {
      this.pathname = '';
    }

    return this;
  };

  Url.prototype.parseHost = function(host) {
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) { this.hostname = host; }
  };

  module.exports = urlParse;

  },{}],60:[function(require,module,exports){
  (function (global){
  (function(root) {

  	/** Detect free variables */
  	var freeExports = typeof exports == 'object' && exports &&
  		!exports.nodeType && exports;
  	var freeModule = typeof module == 'object' && module &&
  		!module.nodeType && module;
  	var freeGlobal = typeof global == 'object' && global;
  	if (
  		freeGlobal.global === freeGlobal ||
  		freeGlobal.window === freeGlobal ||
  		freeGlobal.self === freeGlobal
  	) {
  		root = freeGlobal;
  	}

  	/**
  	 * The `punycode` object.
  	 * @name punycode
  	 * @type Object
  	 */
  	var punycode,

  	/** Highest positive signed 32-bit float value */
  	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

  	/** Bootstring parameters */
  	base = 36,
  	tMin = 1,
  	tMax = 26,
  	skew = 38,
  	damp = 700,
  	initialBias = 72,
  	initialN = 128, // 0x80
  	delimiter = '-', // '\x2D'

  	/** Regular expressions */
  	regexPunycode = /^xn--/,
  	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
  	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

  	/** Error messages */
  	errors = {
  		'overflow': 'Overflow: input needs wider integers to process',
  		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  		'invalid-input': 'Invalid input'
  	},

  	/** Convenience shortcuts */
  	baseMinusTMin = base - tMin,
  	floor = Math.floor,
  	stringFromCharCode = String.fromCharCode,

  	/** Temporary variable */
  	key;

  	/*--------------------------------------------------------------------------*/

  	/**
  	 * A generic error utility function.
  	 * @private
  	 * @param {String} type The error type.
  	 * @returns {Error} Throws a `RangeError` with the applicable error message.
  	 */
  	function error(type) {
  		throw new RangeError(errors[type]);
  	}

  	/**
  	 * A generic `Array#map` utility function.
  	 * @private
  	 * @param {Array} array The array to iterate over.
  	 * @param {Function} callback The function that gets called for every array
  	 * item.
  	 * @returns {Array} A new array of values returned by the callback function.
  	 */
  	function map(array, fn) {
  		var length = array.length;
  		var result = [];
  		while (length--) {
  			result[length] = fn(array[length]);
  		}
  		return result;
  	}

  	/**
  	 * A simple `Array#map`-like wrapper to work with domain name strings or email
  	 * addresses.
  	 * @private
  	 * @param {String} domain The domain name or email address.
  	 * @param {Function} callback The function that gets called for every
  	 * character.
  	 * @returns {Array} A new string of characters returned by the callback
  	 * function.
  	 */
  	function mapDomain(string, fn) {
  		var parts = string.split('@');
  		var result = '';
  		if (parts.length > 1) {
  			// In email addresses, only the domain name should be punycoded. Leave
  			// the local part (i.e. everything up to `@`) intact.
  			result = parts[0] + '@';
  			string = parts[1];
  		}
  		// Avoid `split(regex)` for IE8 compatibility. See #17.
  		string = string.replace(regexSeparators, '\x2E');
  		var labels = string.split('.');
  		var encoded = map(labels, fn).join('.');
  		return result + encoded;
  	}

  	/**
  	 * Creates an array containing the numeric code points of each Unicode
  	 * character in the string. While JavaScript uses UCS-2 internally,
  	 * this function will convert a pair of surrogate halves (each of which
  	 * UCS-2 exposes as separate characters) into a single code point,
  	 * matching UTF-16.
  	 * @see `punycode.ucs2.encode`
  	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  	 * @memberOf punycode.ucs2
  	 * @name decode
  	 * @param {String} string The Unicode input string (UCS-2).
  	 * @returns {Array} The new array of code points.
  	 */
  	function ucs2decode(string) {
  		var output = [],
  		    counter = 0,
  		    length = string.length,
  		    value,
  		    extra;
  		while (counter < length) {
  			value = string.charCodeAt(counter++);
  			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  				// high surrogate, and there is a next character
  				extra = string.charCodeAt(counter++);
  				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
  					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  				} else {
  					// unmatched surrogate; only append this code unit, in case the next
  					// code unit is the high surrogate of a surrogate pair
  					output.push(value);
  					counter--;
  				}
  			} else {
  				output.push(value);
  			}
  		}
  		return output;
  	}

  	/**
  	 * Creates a string based on an array of numeric code points.
  	 * @see `punycode.ucs2.decode`
  	 * @memberOf punycode.ucs2
  	 * @name encode
  	 * @param {Array} codePoints The array of numeric code points.
  	 * @returns {String} The new Unicode string (UCS-2).
  	 */
  	function ucs2encode(array) {
  		return map(array, function(value) {
  			var output = '';
  			if (value > 0xFFFF) {
  				value -= 0x10000;
  				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  				value = 0xDC00 | value & 0x3FF;
  			}
  			output += stringFromCharCode(value);
  			return output;
  		}).join('');
  	}

  	/**
  	 * Converts a basic code point into a digit/integer.
  	 * @see `digitToBasic()`
  	 * @private
  	 * @param {Number} codePoint The basic numeric code point value.
  	 * @returns {Number} The numeric value of a basic code point (for use in
  	 * representing integers) in the range `0` to `base - 1`, or `base` if
  	 * the code point does not represent a value.
  	 */
  	function basicToDigit(codePoint) {
  		if (codePoint - 48 < 10) {
  			return codePoint - 22;
  		}
  		if (codePoint - 65 < 26) {
  			return codePoint - 65;
  		}
  		if (codePoint - 97 < 26) {
  			return codePoint - 97;
  		}
  		return base;
  	}

  	/**
  	 * Converts a digit/integer into a basic code point.
  	 * @see `basicToDigit()`
  	 * @private
  	 * @param {Number} digit The numeric value of a basic code point.
  	 * @returns {Number} The basic code point whose value (when used for
  	 * representing integers) is `digit`, which needs to be in the range
  	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
  	 * used; else, the lowercase form is used. The behavior is undefined
  	 * if `flag` is non-zero and `digit` has no uppercase form.
  	 */
  	function digitToBasic(digit, flag) {
  		//  0..25 map to ASCII a..z or A..Z
  		// 26..35 map to ASCII 0..9
  		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  	}

  	/**
  	 * Bias adaptation function as per section 3.4 of RFC 3492.
  	 * https://tools.ietf.org/html/rfc3492#section-3.4
  	 * @private
  	 */
  	function adapt(delta, numPoints, firstTime) {
  		var k = 0;
  		delta = firstTime ? floor(delta / damp) : delta >> 1;
  		delta += floor(delta / numPoints);
  		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
  			delta = floor(delta / baseMinusTMin);
  		}
  		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  	}

  	/**
  	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
  	 * symbols.
  	 * @memberOf punycode
  	 * @param {String} input The Punycode string of ASCII-only symbols.
  	 * @returns {String} The resulting string of Unicode symbols.
  	 */
  	function decode(input) {
  		// Don't use UCS-2
  		var output = [],
  		    inputLength = input.length,
  		    out,
  		    i = 0,
  		    n = initialN,
  		    bias = initialBias,
  		    basic,
  		    j,
  		    index,
  		    oldi,
  		    w,
  		    k,
  		    digit,
  		    t,
  		    /** Cached calculation results */
  		    baseMinusT;

  		// Handle the basic code points: let `basic` be the number of input code
  		// points before the last delimiter, or `0` if there is none, then copy
  		// the first basic code points to the output.

  		basic = input.lastIndexOf(delimiter);
  		if (basic < 0) {
  			basic = 0;
  		}

  		for (j = 0; j < basic; ++j) {
  			// if it's not a basic code point
  			if (input.charCodeAt(j) >= 0x80) {
  				error('not-basic');
  			}
  			output.push(input.charCodeAt(j));
  		}

  		// Main decoding loop: start just after the last delimiter if any basic code
  		// points were copied; start at the beginning otherwise.

  		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

  			// `index` is the index of the next character to be consumed.
  			// Decode a generalized variable-length integer into `delta`,
  			// which gets added to `i`. The overflow checking is easier
  			// if we increase `i` as we go, then subtract off its starting
  			// value at the end to obtain `delta`.
  			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

  				if (index >= inputLength) {
  					error('invalid-input');
  				}

  				digit = basicToDigit(input.charCodeAt(index++));

  				if (digit >= base || digit > floor((maxInt - i) / w)) {
  					error('overflow');
  				}

  				i += digit * w;
  				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

  				if (digit < t) {
  					break;
  				}

  				baseMinusT = base - t;
  				if (w > floor(maxInt / baseMinusT)) {
  					error('overflow');
  				}

  				w *= baseMinusT;

  			}

  			out = output.length + 1;
  			bias = adapt(i - oldi, out, oldi == 0);

  			// `i` was supposed to wrap around from `out` to `0`,
  			// incrementing `n` each time, so we'll fix that now:
  			if (floor(i / out) > maxInt - n) {
  				error('overflow');
  			}

  			n += floor(i / out);
  			i %= out;

  			// Insert `n` at position `i` of the output
  			output.splice(i++, 0, n);

  		}

  		return ucs2encode(output);
  	}

  	/**
  	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
  	 * Punycode string of ASCII-only symbols.
  	 * @memberOf punycode
  	 * @param {String} input The string of Unicode symbols.
  	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
  	 */
  	function encode(input) {
  		var n,
  		    delta,
  		    handledCPCount,
  		    basicLength,
  		    bias,
  		    j,
  		    m,
  		    q,
  		    k,
  		    t,
  		    currentValue,
  		    output = [],
  		    /** `inputLength` will hold the number of code points in `input`. */
  		    inputLength,
  		    /** Cached calculation results */
  		    handledCPCountPlusOne,
  		    baseMinusT,
  		    qMinusT;

  		// Convert the input in UCS-2 to Unicode
  		input = ucs2decode(input);

  		// Cache the length
  		inputLength = input.length;

  		// Initialize the state
  		n = initialN;
  		delta = 0;
  		bias = initialBias;

  		// Handle the basic code points
  		for (j = 0; j < inputLength; ++j) {
  			currentValue = input[j];
  			if (currentValue < 0x80) {
  				output.push(stringFromCharCode(currentValue));
  			}
  		}

  		handledCPCount = basicLength = output.length;

  		// `handledCPCount` is the number of code points that have been handled;
  		// `basicLength` is the number of basic code points.

  		// Finish the basic string - if it is not empty - with a delimiter
  		if (basicLength) {
  			output.push(delimiter);
  		}

  		// Main encoding loop:
  		while (handledCPCount < inputLength) {

  			// All non-basic code points < n have been handled already. Find the next
  			// larger one:
  			for (m = maxInt, j = 0; j < inputLength; ++j) {
  				currentValue = input[j];
  				if (currentValue >= n && currentValue < m) {
  					m = currentValue;
  				}
  			}

  			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
  			// but guard against overflow
  			handledCPCountPlusOne = handledCPCount + 1;
  			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  				error('overflow');
  			}

  			delta += (m - n) * handledCPCountPlusOne;
  			n = m;

  			for (j = 0; j < inputLength; ++j) {
  				currentValue = input[j];

  				if (currentValue < n && ++delta > maxInt) {
  					error('overflow');
  				}

  				if (currentValue == n) {
  					// Represent delta as a generalized variable-length integer
  					for (q = delta, k = base; /* no condition */; k += base) {
  						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
  						if (q < t) {
  							break;
  						}
  						qMinusT = q - t;
  						baseMinusT = base - t;
  						output.push(
  							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
  						);
  						q = floor(qMinusT / baseMinusT);
  					}

  					output.push(stringFromCharCode(digitToBasic(q, 0)));
  					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
  					delta = 0;
  					++handledCPCount;
  				}
  			}

  			++delta;
  			++n;

  		}
  		return output.join('');
  	}

  	/**
  	 * Converts a Punycode string representing a domain name or an email address
  	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
  	 * it doesn't matter if you call it on a string that has already been
  	 * converted to Unicode.
  	 * @memberOf punycode
  	 * @param {String} input The Punycoded domain name or email address to
  	 * convert to Unicode.
  	 * @returns {String} The Unicode representation of the given Punycode
  	 * string.
  	 */
  	function toUnicode(input) {
  		return mapDomain(input, function(string) {
  			return regexPunycode.test(string)
  				? decode(string.slice(4).toLowerCase())
  				: string;
  		});
  	}

  	/**
  	 * Converts a Unicode string representing a domain name or an email address to
  	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
  	 * i.e. it doesn't matter if you call it with a domain that's already in
  	 * ASCII.
  	 * @memberOf punycode
  	 * @param {String} input The domain name or email address to convert, as a
  	 * Unicode string.
  	 * @returns {String} The Punycode representation of the given domain name or
  	 * email address.
  	 */
  	function toASCII(input) {
  		return mapDomain(input, function(string) {
  			return regexNonASCII.test(string)
  				? 'xn--' + encode(string)
  				: string;
  		});
  	}

  	/*--------------------------------------------------------------------------*/

  	/** Define the public API */
  	punycode = {
  		/**
  		 * A string representing the current Punycode.js version number.
  		 * @memberOf punycode
  		 * @type String
  		 */
  		'version': '1.4.1',
  		/**
  		 * An object of methods to convert from JavaScript's internal character
  		 * representation (UCS-2) to Unicode code points, and back.
  		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  		 * @memberOf punycode
  		 * @type Object
  		 */
  		'ucs2': {
  			'decode': ucs2decode,
  			'encode': ucs2encode
  		},
  		'decode': decode,
  		'encode': encode,
  		'toASCII': toASCII,
  		'toUnicode': toUnicode
  	};

  	/** Expose `punycode` */
  	// Some AMD build optimizers, like r.js, check for specific condition patterns
  	// like the following:
  	if (freeExports && freeModule) {
  		if (module.exports == freeExports) {
  			// in Node.js, io.js, or RingoJS v0.8.0+
  			freeModule.exports = punycode;
  		} else {
  			// in Narwhal or RingoJS v0.7.0-
  			for (key in punycode) {
  				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
  			}
  		}
  	} else {
  		// in Rhino or a web browser
  		root.punycode = punycode;
  	}

  }(this));

  }).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
  },{}],61:[function(require,module,exports){
  module.exports=/[\0-\x1F\x7F-\x9F]/;
  },{}],62:[function(require,module,exports){
  module.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
  },{}],63:[function(require,module,exports){
  module.exports=/[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E49\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
  },{}],64:[function(require,module,exports){
  module.exports=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
  },{}],65:[function(require,module,exports){

  exports.Any = require('./properties/Any/regex');
  exports.Cc  = require('./categories/Cc/regex');
  exports.Cf  = require('./categories/Cf/regex');
  exports.P   = require('./categories/P/regex');
  exports.Z   = require('./categories/Z/regex');

  },{"./categories/Cc/regex":61,"./categories/Cf/regex":62,"./categories/P/regex":63,"./categories/Z/regex":64,"./properties/Any/regex":66}],66:[function(require,module,exports){
  module.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  },{}],67:[function(require,module,exports){


  module.exports = require('./lib/');

  },{"./lib/":9}]},{},[67])(67)
  });
  });

  const mdit = new markdownIt({
    html: true,
    linkify: true
  });

  // TODO: add syntax highlighter

  function md2html (md) {
    return mdit.render(md)
  }

  class Article extends EventManager {

    constructor (id) {
      super();
      let mainConfig = getMainConfig();
      this._folderURL = getAbsoluteURL(pathJoin([mainConfig.content.articleDir, id ]));
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
      this._link = `#${mainConfig.content.articleDir}/${this._id}`;
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
      this._author = config.author;
      this._date = config.date;

      if (config.cover.startsWith('http')) {
        this._cover = config.cover;
      } else {
        this._cover = pathJoin([this._folderURL, config.cover]);
      }

      this._excerpt = config.excerpt;
      this._title = config.title;
      this._published = config.published;
      this._tags = config.tags.split(',').map(t=> t.trim());
      this._configLoaded = true;
    }


    _setMarkdownContent (md) {
      this._markdownContent = markdownReplaceImageURL(md, this._folderURL);
      this._htmlContent = md2html(this._markdownContent);
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
      let that = this;

      if (this._htmlContent && typeof cb === 'function') {
        return cb(this)
      }

      // must test if the config is loaded
      if (!this._configLoaded) {
        fetchJson( [this.getConfigURL()], function(url, configs){
          let config = configs[0];
          if (!config)
            throw 'The config for the article ' + that._id + ' is not available.'

          that.setConfig(config);
          that.loadContent(cb);
        });
      } else {

        fetchText( this._markdownURL, function(url, text) {
          if (!text)
            throw 'The article at ' + url + 'could not be loaded'

          that._setMarkdownContent(text);

          if (typeof cb === 'function') {
            return cb(that)
          }
        });
      }
    }

  }

  class ArticleCollection extends EventManager {
    constructor() {
      super();
      let that = this;
      this._isReady = false;
      this._articlesList = [];
      this._articlesIndex = {};

      let pathToArticleList = getAbsoluteURL(pathJoin([getMainConfig().content.articleDir, 'list.json']));

      fetchJson([pathToArticleList], function(url, articleLists){
        let articleList = articleLists[0];
        if (!articleList)
          throw 'The list of articles is not available'

        articleList.map( articleId => that.addArticle(articleId));

        // unlike pages, we dont load article configs per default. This
        // will be done on demand, dependading on the route
        that._isReady = true;
        that.emit('ready');
        // Load the first page of articles
        // that.loadArticlesConfigFromIndex(0, function(articles){
        //   that.emit('ready', [articles])
        // })
      });
    }


    isReady () {
      return this._isReady
    }


    addArticle (id) {
      if (!(id in this._articlesIndex)) {
        let article = new Article(id);
        this._articlesList.push(article);
        this._articlesIndex[id] = article;
      }
    }


    /**
     * From is the index of the article (not of the page)
     *
     */
    loadArticlesConfigFromIndex (from=0, cb) {
      if (from < 0)
        throw 'The index of article must be above 0.'

      let to = Math.min(from + getMainConfig().content.articlesPerPage, this._articlesList.length);
      let shortIdList = this._articlesList.slice(from, to);
      this.loadArticlesConfigSubset(shortIdList, cb);
    }


    loadAllArticlesConfig (cb) {
      this.loadArticlesConfigSubset(this._articlesList, cb);
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
          noConfArticles[i].setConfig(configs[i]);
        }

        if (typeof cb === 'function') {
          cb(articles);
        }
      });
    }


    getArticle (id, cb) {
      if (!(id in this._articlesIndex))
        throw 'The article ' + id + ' does not exist.'

      if (typeof cb !== 'function')
        throw 'The callback must be a function'

      let article = this._articlesIndex[id];
      article.loadContent(cb);
    }


    getNumberOfArticles() {
      return this._articlesList.length
    }


  }

  class Page extends EventManager {

    constructor (id) {
      super();
      let mainConfig = getMainConfig();

      this._folderURL = getAbsoluteURL(pathJoin([mainConfig.content.pageDir, id ]));
      this._markdownURL = pathJoin([this._folderURL, "index.md"]);
      this._configURL = pathJoin([this._folderURL, "config.json"]);

      this._id = id;
      this._configLoaded = false;
      this._title = null;
      this._cover = null;
      this._showInMenu = false;
      this._markdownContent = null;
      this._htmlContent = null;
      this._link = `#${this._id}`;
    }


    isConfigLoaded () {
      return this._configLoaded
    }


    setConfig (config) {
      if (config.cover.startsWith('http')) {
        this._cover = config.cover;
      } else {
        this._cover = pathJoin([this._folderURL, config.cover]);
      }

      this._title = config.title;
      this._showInMenu = config.showInMenu;
      this._configLoaded = true;
    }


    getMetadata () {
      return {
        id: this._id,
        title: this._title,
        cover: this._cover,
        link: this._link,
      }
    }


    getId () {
      return this._id
    }

    getLink () {
      return this._link
    }

    getHtmlContent () {
      return this._htmlContent
    }

    getMarkdownURL () {
      return this._markdownURL
    }


    getConfigURL () {
      return this._configURL
    }


    _setMarkdownContent (md) {
      this._markdownContent = markdownReplaceImageURL(md, this._folderURL);
      this._htmlContent = md2html(this._markdownContent);
    }


    isLoaded () {
      return !!this._htmlContent
    }


    getTitle () {
      return this._title
    }


    getCover () {
      return this._cover
    }


    getShowInMenu () {
      return this._showInMenu
    }


    getMarkdownContent () {
      return this._markdownContent
    }


    loadContent (cb) {
      let that = this;

      if (this._htmlContent && typeof cb === 'function') {
        return cb(this)
      }

      fetchText( this._markdownURL, function(url, text) {
        if (!text)
          throw 'The page at ' + url + 'could not be loaded'

        that._setMarkdownContent(text);

        if (typeof cb === 'function') {
          return cb(that)
        }
      });
    }

  }

  class PageCollection extends EventManager {
    constructor() {
      super();
      let that = this;
      this._isReady = false;
      this._pageList = [];
      this._pagesIndex = {};

      let pathToPageList = getAbsoluteURL(pathJoin([getMainConfig().content.pageDir, 'list.json']));

      fetchJson([pathToPageList], function(url, pageLists){
        let pageList = pageLists[0];
        if (!pageList)
          throw 'The list of pages is not available'

        pageList.map( pageId => that.addPage(pageId));

        // Load all the pages' config because we need that for the menu
        that.loadPagesConfig(function(pages){
          that._isReady = true;
          that.emit('ready', [pages]);
        });
      });
    }


    isReady () {
      return this._isReady
    }


    addPage (id) {
      if (!(id in this._pagesIndex)) {
        let page = new Page(id);
        this._pageList.push(page);
        this._pagesIndex[id] = page;
      }
    }


    loadPagesConfig (cb) {
      let pages = this._pageList;
      let pagesUrls = pages.map(page => getAbsoluteURL(page.getConfigURL()));

      fetchJson(pagesUrls, function(url, configs){
        if (!configs)
          throw 'The list of pages is not available'

        for (let i=0; i<pages.length; i++) {
          pages[i].setConfig(configs[i]);
        }

        if (typeof cb === 'function') {
          cb(pages);
        }
      });
    }


    getPage (id, cb) {
      if (!(id in this._pagesIndex))
        throw 'The page ' + id + ' does not exist.'

      if (typeof cb !== 'function')
        throw 'The callback must be a function'

      let page = this._pagesIndex[id];

      if (page.isLoaded()) {
        return cb(page)
      } else {
        page.loadContent(cb);
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
                                        });
      return allMenuPages
    }


  }

  class RouteManager extends EventManager {

    constructor () {
      super();

      const mainConfig = getMainConfig();
      this._REGEX = {
        ARTICLE_LISTING_FIRST_PAGE: /^articles\/?$/,
        ARTICLE_LISTING_PAGE: new RegExp(`${mainConfig.content.articleDir}\/page-([0-9-]+)$`),
        //SPECIFIC_ARTICLE: /articles\/([a-zA-Z0-9-]+)/,
        SPECIFIC_ARTICLE: new RegExp(`${mainConfig.content.articleDir}\/([a-zA-Z0-9-]+)`),
        PAGE: /(\S+)/ // a kind of default regex
      };
    }


    init () {
      let that = this;
      window.addEventListener("hashchange", function(e){
        that._decideRoute();
      }, false);

      // force call because loading a page that already has a hash does not
      // fire the hashchange event
      this._decideRoute();
    }

    _decideRoute () {
      let route = location.hash.trim();
      if (route.startsWith('#')) {
        route = route.substring(1);
      }

      // no hash route given, or nothing after the hash
      // --> We want to go home
      if (route === '') {
        this.emit('home');
        window.scrollTo(0, 0);
        return
      }

      // route is #articles
      // --> we want the first page of article listing
      let match = route.match(this._REGEX.ARTICLE_LISTING_FIRST_PAGE);
      if(match) {
        this.emit('articleListing', [0]);
        window.scrollTo(0, 0);
        return
      }

      // route is of form #articles/page-10
      // --> we want the nth pqge of article listing
      match = route.match(this._REGEX.ARTICLE_LISTING_PAGE);
      if(match) {
        this.emit('articleListing', [parseInt(match[1])]);
        window.scrollTo(0, 0);
        return
      }

      // route is of form #articles/my-article
      // --> we want the article my-article
      match = route.match(this._REGEX.SPECIFIC_ARTICLE);
      if(match) {
        this.emit('specificArticle', [match[1]]);
        window.scrollTo(0, 0);
        return
      }

      // should come last
      // route is of form #my-page
      // --> we want the page my-page
      match = route.match(this._REGEX.SPECIFIC_PAGE);
      if(match) {
        this.emit('specificPage', [route]);
        window.scrollTo(0, 0);
        return
      }

    }


    /**
     * Go to the given hash
     * @param  {string} path - path (without # symbole)
     */
    goTo(path) {
      location.hash = `${path}`;
    }

  }

  var utils = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.extend = extend;
  exports.indexOf = indexOf;
  exports.escapeExpression = escapeExpression;
  exports.isEmpty = isEmpty;
  exports.createFrame = createFrame;
  exports.blockParams = blockParams;
  exports.appendContextPath = appendContextPath;
  var escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  var badChars = /[&<>"'`=]/g,
      possible = /[&<>"'`=]/;

  function escapeChar(chr) {
    return escape[chr];
  }

  function extend(obj /* , ...source */) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          obj[key] = arguments[i][key];
        }
      }
    }

    return obj;
  }

  var toString = Object.prototype.toString;

  exports.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  /* eslint-disable func-style */
  var isFunction = function isFunction(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  /* istanbul ignore next */
  if (isFunction(/x/)) {
    exports.isFunction = isFunction = function (value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  exports.isFunction = isFunction;

  /* eslint-enable func-style */

  /* istanbul ignore next */
  var isArray = Array.isArray || function (value) {
    return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
  };

  exports.isArray = isArray;
  // Older IE versions do not directly support indexOf so we must implement our own, sadly.

  function indexOf(array, value) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  }

  function escapeExpression(string) {
    if (typeof string !== 'string') {
      // don't escape SafeStrings, since they're already safe
      if (string && string.toHTML) {
        return string.toHTML();
      } else if (string == null) {
        return '';
      } else if (!string) {
        return string + '';
      }

      // Force a string conversion as this will be done by the append regardless and
      // the regex test will do this transparently behind the scenes, causing issues if
      // an object's to string has escaped characters in it.
      string = '' + string;
    }

    if (!possible.test(string)) {
      return string;
    }
    return string.replace(badChars, escapeChar);
  }

  function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function createFrame(object) {
    var frame = extend({}, object);
    frame._parent = object;
    return frame;
  }

  function blockParams(params, ids) {
    params.path = ids;
    return params;
  }

  function appendContextPath(contextPath, id) {
    return (contextPath ? contextPath + '.' : '') + id;
  }

  });

  unwrapExports(utils);
  var utils_1 = utils.extend;
  var utils_2 = utils.indexOf;
  var utils_3 = utils.escapeExpression;
  var utils_4 = utils.isEmpty;
  var utils_5 = utils.createFrame;
  var utils_6 = utils.blockParams;
  var utils_7 = utils.appendContextPath;
  var utils_8 = utils.isFunction;
  var utils_9 = utils.isArray;

  var exception = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var loc = node && node.loc,
        line = undefined,
        column = undefined;
    if (loc) {
      line = loc.start.line;
      column = loc.start.column;

      message += ' - ' + line + ':' + column;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    /* istanbul ignore else */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }

    try {
      if (loc) {
        this.lineNumber = line;

        // Work around issue under safari where we can't directly set the column value
        /* istanbul ignore next */
        if (Object.defineProperty) {
          Object.defineProperty(this, 'column', {
            value: column,
            enumerable: true
          });
        } else {
          this.column = column;
        }
      }
    } catch (nop) {
      /* Ignore if the browser is very particular */
    }
  }

  Exception.prototype = new Error();

  exports['default'] = Exception;
  module.exports = exports['default'];

  });

  unwrapExports(exception);

  var blockHelperMissing = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  exports['default'] = function (instance) {
    instance.registerHelper('blockHelperMissing', function (context, options) {
      var inverse = options.inverse,
          fn = options.fn;

      if (context === true) {
        return fn(this);
      } else if (context === false || context == null) {
        return inverse(this);
      } else if (utils.isArray(context)) {
        if (context.length > 0) {
          if (options.ids) {
            options.ids = [options.name];
          }

          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        if (options.data && options.ids) {
          var data = utils.createFrame(options.data);
          data.contextPath = utils.appendContextPath(options.data.contextPath, options.name);
          options = { data: data };
        }

        return fn(context, options);
      }
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(blockHelperMissing);

  var each = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





  var _exception2 = _interopRequireDefault(exception);

  exports['default'] = function (instance) {
    instance.registerHelper('each', function (context, options) {
      if (!options) {
        throw new _exception2['default']('Must pass iterator to #each');
      }

      var fn = options.fn,
          inverse = options.inverse,
          i = 0,
          ret = '',
          data = undefined,
          contextPath = undefined;

      if (options.data && options.ids) {
        contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
      }

      if (utils.isFunction(context)) {
        context = context.call(this);
      }

      if (options.data) {
        data = utils.createFrame(options.data);
      }

      function execIteration(field, index, last) {
        if (data) {
          data.key = field;
          data.index = index;
          data.first = index === 0;
          data.last = !!last;

          if (contextPath) {
            data.contextPath = contextPath + field;
          }
        }

        ret = ret + fn(context[field], {
          data: data,
          blockParams: utils.blockParams([context[field], field], [contextPath + field, null])
        });
      }

      if (context && typeof context === 'object') {
        if (utils.isArray(context)) {
          for (var j = context.length; i < j; i++) {
            if (i in context) {
              execIteration(i, i, i === context.length - 1);
            }
          }
        } else {
          var priorKey = undefined;

          for (var key in context) {
            if (context.hasOwnProperty(key)) {
              // We're running the iterations one step out of sync so we can detect
              // the last iteration without have to scan the object twice and create
              // an itermediate keys array.
              if (priorKey !== undefined) {
                execIteration(priorKey, i - 1);
              }
              priorKey = key;
              i++;
            }
          }
          if (priorKey !== undefined) {
            execIteration(priorKey, i - 1, true);
          }
        }
      }

      if (i === 0) {
        ret = inverse(this);
      }

      return ret;
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(each);

  var helperMissing = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _exception2 = _interopRequireDefault(exception);

  exports['default'] = function (instance) {
    instance.registerHelper('helperMissing', function () /* [args, ]options */{
      if (arguments.length === 1) {
        // A missing field in a {{foo}} construct.
        return undefined;
      } else {
        // Someone is actually trying to call something, blow up.
        throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
      }
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(helperMissing);

  var _if = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  exports['default'] = function (instance) {
    instance.registerHelper('if', function (conditional, options) {
      if (utils.isFunction(conditional)) {
        conditional = conditional.call(this);
      }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if (!options.hash.includeZero && !conditional || utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function (conditional, options) {
      return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(_if);

  var log = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  exports['default'] = function (instance) {
    instance.registerHelper('log', function () /* message, options */{
      var args = [undefined],
          options = arguments[arguments.length - 1];
      for (var i = 0; i < arguments.length - 1; i++) {
        args.push(arguments[i]);
      }

      var level = 1;
      if (options.hash.level != null) {
        level = options.hash.level;
      } else if (options.data && options.data.level != null) {
        level = options.data.level;
      }
      args[0] = level;

      instance.log.apply(instance, args);
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(log);

  var lookup = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  exports['default'] = function (instance) {
    instance.registerHelper('lookup', function (obj, field) {
      return obj && obj[field];
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(lookup);

  var _with = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  exports['default'] = function (instance) {
    instance.registerHelper('with', function (context, options) {
      if (utils.isFunction(context)) {
        context = context.call(this);
      }

      var fn = options.fn;

      if (!utils.isEmpty(context)) {
        var data = options.data;
        if (options.data && options.ids) {
          data = utils.createFrame(options.data);
          data.contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]);
        }

        return fn(context, {
          data: data,
          blockParams: utils.blockParams([context], [data && data.contextPath])
        });
      } else {
        return options.inverse(this);
      }
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(_with);

  var helpers = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.registerDefaultHelpers = registerDefaultHelpers;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _helpersBlockHelperMissing2 = _interopRequireDefault(blockHelperMissing);



  var _helpersEach2 = _interopRequireDefault(each);



  var _helpersHelperMissing2 = _interopRequireDefault(helperMissing);



  var _helpersIf2 = _interopRequireDefault(_if);



  var _helpersLog2 = _interopRequireDefault(log);



  var _helpersLookup2 = _interopRequireDefault(lookup);



  var _helpersWith2 = _interopRequireDefault(_with);

  function registerDefaultHelpers(instance) {
    _helpersBlockHelperMissing2['default'](instance);
    _helpersEach2['default'](instance);
    _helpersHelperMissing2['default'](instance);
    _helpersIf2['default'](instance);
    _helpersLog2['default'](instance);
    _helpersLookup2['default'](instance);
    _helpersWith2['default'](instance);
  }

  });

  unwrapExports(helpers);
  var helpers_1 = helpers.registerDefaultHelpers;

  var inline = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  exports['default'] = function (instance) {
    instance.registerDecorator('inline', function (fn, props, container, options) {
      var ret = fn;
      if (!props.partials) {
        props.partials = {};
        ret = function (context, options) {
          // Create a new partials stack frame prior to exec.
          var original = container.partials;
          container.partials = utils.extend({}, original, props.partials);
          var ret = fn(context, options);
          container.partials = original;
          return ret;
        };
      }

      props.partials[options.args[0]] = options.fn;

      return ret;
    });
  };

  module.exports = exports['default'];

  });

  unwrapExports(inline);

  var decorators = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.registerDefaultDecorators = registerDefaultDecorators;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _decoratorsInline2 = _interopRequireDefault(inline);

  function registerDefaultDecorators(instance) {
    _decoratorsInline2['default'](instance);
  }

  });

  unwrapExports(decorators);
  var decorators_1 = decorators.registerDefaultDecorators;

  var logger_1 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var logger = {
    methodMap: ['debug', 'info', 'warn', 'error'],
    level: 'info',

    // Maps a given level value to the `methodMap` indexes above.
    lookupLevel: function lookupLevel(level) {
      if (typeof level === 'string') {
        var levelMap = utils.indexOf(logger.methodMap, level.toLowerCase());
        if (levelMap >= 0) {
          level = levelMap;
        } else {
          level = parseInt(level, 10);
        }
      }

      return level;
    },

    // Can be overridden in the host environment
    log: function log(level) {
      level = logger.lookupLevel(level);

      if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
        var method = logger.methodMap[level];
        if (!console[method]) {
          // eslint-disable-line no-console
          method = 'log';
        }

        for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          message[_key - 1] = arguments[_key];
        }

        console[method].apply(console, message); // eslint-disable-line no-console
      }
    }
  };

  exports['default'] = logger;
  module.exports = exports['default'];

  });

  unwrapExports(logger_1);

  var base = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.HandlebarsEnvironment = HandlebarsEnvironment;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





  var _exception2 = _interopRequireDefault(exception);







  var _logger2 = _interopRequireDefault(logger_1);

  var VERSION = '4.1.0';
  exports.VERSION = VERSION;
  var COMPILER_REVISION = 7;

  exports.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '== 1.x.x',
    5: '== 2.0.0-alpha.x',
    6: '>= 2.0.0-beta.1',
    7: '>= 4.0.0'
  };

  exports.REVISION_CHANGES = REVISION_CHANGES;
  var objectType = '[object Object]';

  function HandlebarsEnvironment(helpers$$1, partials, decorators$$1) {
    this.helpers = helpers$$1 || {};
    this.partials = partials || {};
    this.decorators = decorators$$1 || {};

    helpers.registerDefaultHelpers(this);
    decorators.registerDefaultDecorators(this);
  }

  HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: _logger2['default'],
    log: _logger2['default'].log,

    registerHelper: function registerHelper(name, fn) {
      if (utils.toString.call(name) === objectType) {
        if (fn) {
          throw new _exception2['default']('Arg not supported with multiple helpers');
        }
        utils.extend(this.helpers, name);
      } else {
        this.helpers[name] = fn;
      }
    },
    unregisterHelper: function unregisterHelper(name) {
      delete this.helpers[name];
    },

    registerPartial: function registerPartial(name, partial) {
      if (utils.toString.call(name) === objectType) {
        utils.extend(this.partials, name);
      } else {
        if (typeof partial === 'undefined') {
          throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
        }
        this.partials[name] = partial;
      }
    },
    unregisterPartial: function unregisterPartial(name) {
      delete this.partials[name];
    },

    registerDecorator: function registerDecorator(name, fn) {
      if (utils.toString.call(name) === objectType) {
        if (fn) {
          throw new _exception2['default']('Arg not supported with multiple decorators');
        }
        utils.extend(this.decorators, name);
      } else {
        this.decorators[name] = fn;
      }
    },
    unregisterDecorator: function unregisterDecorator(name) {
      delete this.decorators[name];
    }
  };

  var log = _logger2['default'].log;

  exports.log = log;
  exports.createFrame = utils.createFrame;
  exports.logger = _logger2['default'];

  });

  unwrapExports(base);
  var base_1 = base.HandlebarsEnvironment;
  var base_2 = base.VERSION;
  var base_3 = base.COMPILER_REVISION;
  var base_4 = base.REVISION_CHANGES;
  var base_5 = base.log;
  var base_6 = base.createFrame;
  var base_7 = base.logger;

  var safeString = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
    return '' + this.string;
  };

  exports['default'] = SafeString;
  module.exports = exports['default'];

  });

  unwrapExports(safeString);

  var runtime = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.checkRevision = checkRevision;
  exports.template = template;
  exports.wrapProgram = wrapProgram;
  exports.resolvePartial = resolvePartial;
  exports.invokePartial = invokePartial;
  exports.noop = noop;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  // istanbul ignore next

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }



  var Utils = _interopRequireWildcard(utils);



  var _exception2 = _interopRequireDefault(exception);



  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = base.COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = base.REVISION_CHANGES[currentRevision],
            compilerVersions = base.REVISION_CHANGES[compilerRevision];
        throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
      }
    }
  }

  function template(templateSpec, env) {
    /* istanbul ignore next */
    if (!env) {
      throw new _exception2['default']('No environment passed to template');
    }
    if (!templateSpec || !templateSpec.main) {
      throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
    }

    templateSpec.main.decorator = templateSpec.main_d;

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    env.VM.checkRevision(templateSpec.compiler);

    function invokePartialWrapper(partial, context, options) {
      if (options.hash) {
        context = Utils.extend({}, context, options.hash);
        if (options.ids) {
          options.ids[0] = true;
        }
      }

      partial = env.VM.resolvePartial.call(this, partial, context, options);
      var result = env.VM.invokePartial.call(this, partial, context, options);

      if (result == null && env.compile) {
        options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
        result = options.partials[options.name](context, options);
      }
      if (result != null) {
        if (options.indent) {
          var lines = result.split('\n');
          for (var i = 0, l = lines.length; i < l; i++) {
            if (!lines[i] && i + 1 === l) {
              break;
            }

            lines[i] = options.indent + lines[i];
          }
          result = lines.join('\n');
        }
        return result;
      } else {
        throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
      }
    }

    // Just add water
    var container = {
      strict: function strict(obj, name) {
        if (!(name in obj)) {
          throw new _exception2['default']('"' + name + '" not defined in ' + obj);
        }
        return obj[name];
      },
      lookup: function lookup(depths, name) {
        var len = depths.length;
        for (var i = 0; i < len; i++) {
          if (depths[i] && depths[i][name] != null) {
            return depths[i][name];
          }
        }
      },
      lambda: function lambda(current, context) {
        return typeof current === 'function' ? current.call(context) : current;
      },

      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,

      fn: function fn(i) {
        var ret = templateSpec[i];
        ret.decorator = templateSpec[i + '_d'];
        return ret;
      },

      programs: [],
      program: function program(i, data, declaredBlockParams, blockParams, depths) {
        var programWrapper = this.programs[i],
            fn = this.fn(i);
        if (data || depths || blockParams || declaredBlockParams) {
          programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = wrapProgram(this, i, fn);
        }
        return programWrapper;
      },

      data: function data(value, depth) {
        while (value && depth--) {
          value = value._parent;
        }
        return value;
      },
      merge: function merge(param, common) {
        var obj = param || common;

        if (param && common && param !== common) {
          obj = Utils.extend({}, common, param);
        }

        return obj;
      },
      // An empty object to use as replacement for null-contexts
      nullContext: Object.seal({}),

      noop: env.VM.noop,
      compilerInfo: templateSpec.compiler
    };

    function ret(context) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var data = options.data;

      ret._setup(options);
      if (!options.partial && templateSpec.useData) {
        data = initData(context, data);
      }
      var depths = undefined,
          blockParams = templateSpec.useBlockParams ? [] : undefined;
      if (templateSpec.useDepths) {
        if (options.depths) {
          depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
        } else {
          depths = [context];
        }
      }

      function main(context /*, options*/) {
        return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
      }
      main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
      return main(context, options);
    }
    ret.isTop = true;

    ret._setup = function (options) {
      if (!options.partial) {
        container.helpers = container.merge(options.helpers, env.helpers);

        if (templateSpec.usePartial) {
          container.partials = container.merge(options.partials, env.partials);
        }
        if (templateSpec.usePartial || templateSpec.useDecorators) {
          container.decorators = container.merge(options.decorators, env.decorators);
        }
      } else {
        container.helpers = options.helpers;
        container.partials = options.partials;
        container.decorators = options.decorators;
      }
    };

    ret._child = function (i, data, blockParams, depths) {
      if (templateSpec.useBlockParams && !blockParams) {
        throw new _exception2['default']('must pass block params');
      }
      if (templateSpec.useDepths && !depths) {
        throw new _exception2['default']('must pass parent depths');
      }

      return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
    };
    return ret;
  }

  function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
    function prog(context) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var currentDepths = depths;
      if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
        currentDepths = [context].concat(depths);
      }

      return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
    }

    prog = executeDecorators(fn, prog, container, depths, data, blockParams);

    prog.program = i;
    prog.depth = depths ? depths.length : 0;
    prog.blockParams = declaredBlockParams || 0;
    return prog;
  }

  function resolvePartial(partial, context, options) {
    if (!partial) {
      if (options.name === '@partial-block') {
        partial = options.data['partial-block'];
      } else {
        partial = options.partials[options.name];
      }
    } else if (!partial.call && !options.name) {
      // This is a dynamic partial that returned a string
      options.name = partial;
      partial = options.partials[partial];
    }
    return partial;
  }

  function invokePartial(partial, context, options) {
    // Use the current closure context to save the partial-block if this partial
    var currentPartialBlock = options.data && options.data['partial-block'];
    options.partial = true;
    if (options.ids) {
      options.data.contextPath = options.ids[0] || options.data.contextPath;
    }

    var partialBlock = undefined;
    if (options.fn && options.fn !== noop) {
      (function () {
        options.data = base.createFrame(options.data);
        // Wrapper function to get access to currentPartialBlock from the closure
        var fn = options.fn;
        partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          // Restore the partial-block from the closure for the execution of the block
          // i.e. the part inside the block of the partial call.
          options.data = base.createFrame(options.data);
          options.data['partial-block'] = currentPartialBlock;
          return fn(context, options);
        };
        if (fn.partials) {
          options.partials = Utils.extend({}, options.partials, fn.partials);
        }
      })();
    }

    if (partial === undefined && partialBlock) {
      partial = partialBlock;
    }

    if (partial === undefined) {
      throw new _exception2['default']('The partial ' + options.name + ' could not be found');
    } else if (partial instanceof Function) {
      return partial(context, options);
    }
  }

  function noop() {
    return '';
  }

  function initData(context, data) {
    if (!data || !('root' in data)) {
      data = data ? base.createFrame(data) : {};
      data.root = context;
    }
    return data;
  }

  function executeDecorators(fn, prog, container, depths, data, blockParams) {
    if (fn.decorator) {
      var props = {};
      prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
      Utils.extend(prog, props);
    }
    return prog;
  }

  });

  unwrapExports(runtime);
  var runtime_1 = runtime.checkRevision;
  var runtime_2 = runtime.template;
  var runtime_3 = runtime.wrapProgram;
  var runtime_4 = runtime.resolvePartial;
  var runtime_5 = runtime.invokePartial;
  var runtime_6 = runtime.noop;

  var noConflict = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  exports['default'] = function (Handlebars) {
    /* istanbul ignore next */
    var root = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : window,
        $Handlebars = root.Handlebars;
    /* istanbul ignore next */
    Handlebars.noConflict = function () {
      if (root.Handlebars === Handlebars) {
        root.Handlebars = $Handlebars;
      }
      return Handlebars;
    };
  };

  module.exports = exports['default'];

  });

  unwrapExports(noConflict);

  var handlebars_runtime = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  // istanbul ignore next

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }



  var base$$1 = _interopRequireWildcard(base);

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)



  var _handlebarsSafeString2 = _interopRequireDefault(safeString);



  var _handlebarsException2 = _interopRequireDefault(exception);



  var Utils = _interopRequireWildcard(utils);



  var runtime$$1 = _interopRequireWildcard(runtime);



  var _handlebarsNoConflict2 = _interopRequireDefault(noConflict);

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  function create() {
    var hb = new base$$1.HandlebarsEnvironment();

    Utils.extend(hb, base$$1);
    hb.SafeString = _handlebarsSafeString2['default'];
    hb.Exception = _handlebarsException2['default'];
    hb.Utils = Utils;
    hb.escapeExpression = Utils.escapeExpression;

    hb.VM = runtime$$1;
    hb.template = function (spec) {
      return runtime$$1.template(spec, hb);
    };

    return hb;
  }

  var inst = create();
  inst.create = create;

  _handlebarsNoConflict2['default'](inst);

  inst['default'] = inst;

  exports['default'] = inst;
  module.exports = exports['default'];

  });

  unwrapExports(handlebars_runtime);

  var ast = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var AST = {
    // Public API used to evaluate derived attributes regarding AST nodes
    helpers: {
      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      helperExpression: function helperExpression(node) {
        return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
      },

      scopedId: function scopedId(path) {
        return (/^\.|this\b/.test(path.original)
        );
      },

      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      simpleId: function simpleId(path) {
        return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
      }
    }
  };

  // Must be exported as an object rather than the root of the module as the jison lexer
  // must modify the object to operate properly.
  exports['default'] = AST;
  module.exports = exports['default'];

  });

  unwrapExports(ast);

  var parser = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  var handlebars = (function () {
      var parser = { trace: function trace() {},
          yy: {},
          symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition_plus0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
          terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
          productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
          performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

              var $0 = $$.length - 1;
              switch (yystate) {
                  case 1:
                      return $$[$0 - 1];
                      break;
                  case 2:
                      this.$ = yy.prepareProgram($$[$0]);
                      break;
                  case 3:
                      this.$ = $$[$0];
                      break;
                  case 4:
                      this.$ = $$[$0];
                      break;
                  case 5:
                      this.$ = $$[$0];
                      break;
                  case 6:
                      this.$ = $$[$0];
                      break;
                  case 7:
                      this.$ = $$[$0];
                      break;
                  case 8:
                      this.$ = $$[$0];
                      break;
                  case 9:
                      this.$ = {
                          type: 'CommentStatement',
                          value: yy.stripComment($$[$0]),
                          strip: yy.stripFlags($$[$0], $$[$0]),
                          loc: yy.locInfo(this._$)
                      };

                      break;
                  case 10:
                      this.$ = {
                          type: 'ContentStatement',
                          original: $$[$0],
                          value: $$[$0],
                          loc: yy.locInfo(this._$)
                      };

                      break;
                  case 11:
                      this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                      break;
                  case 12:
                      this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
                      break;
                  case 13:
                      this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
                      break;
                  case 14:
                      this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
                      break;
                  case 15:
                      this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                      break;
                  case 16:
                      this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                      break;
                  case 17:
                      this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                      break;
                  case 18:
                      this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
                      break;
                  case 19:
                      var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                          program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
                      program.chained = true;

                      this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

                      break;
                  case 20:
                      this.$ = $$[$0];
                      break;
                  case 21:
                      this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
                      break;
                  case 22:
                      this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                      break;
                  case 23:
                      this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                      break;
                  case 24:
                      this.$ = {
                          type: 'PartialStatement',
                          name: $$[$0 - 3],
                          params: $$[$0 - 2],
                          hash: $$[$0 - 1],
                          indent: '',
                          strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                          loc: yy.locInfo(this._$)
                      };

                      break;
                  case 25:
                      this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                      break;
                  case 26:
                      this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
                      break;
                  case 27:
                      this.$ = $$[$0];
                      break;
                  case 28:
                      this.$ = $$[$0];
                      break;
                  case 29:
                      this.$ = {
                          type: 'SubExpression',
                          path: $$[$0 - 3],
                          params: $$[$0 - 2],
                          hash: $$[$0 - 1],
                          loc: yy.locInfo(this._$)
                      };

                      break;
                  case 30:
                      this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
                      break;
                  case 31:
                      this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
                      break;
                  case 32:
                      this.$ = yy.id($$[$0 - 1]);
                      break;
                  case 33:
                      this.$ = $$[$0];
                      break;
                  case 34:
                      this.$ = $$[$0];
                      break;
                  case 35:
                      this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
                      break;
                  case 36:
                      this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
                      break;
                  case 37:
                      this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
                      break;
                  case 38:
                      this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
                      break;
                  case 39:
                      this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
                      break;
                  case 40:
                      this.$ = $$[$0];
                      break;
                  case 41:
                      this.$ = $$[$0];
                      break;
                  case 42:
                      this.$ = yy.preparePath(true, $$[$0], this._$);
                      break;
                  case 43:
                      this.$ = yy.preparePath(false, $$[$0], this._$);
                      break;
                  case 44:
                      $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
                      break;
                  case 45:
                      this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
                      break;
                  case 46:
                      this.$ = [];
                      break;
                  case 47:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 48:
                      this.$ = [$$[$0]];
                      break;
                  case 49:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 50:
                      this.$ = [];
                      break;
                  case 51:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 58:
                      this.$ = [];
                      break;
                  case 59:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 64:
                      this.$ = [];
                      break;
                  case 65:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 70:
                      this.$ = [];
                      break;
                  case 71:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 78:
                      this.$ = [];
                      break;
                  case 79:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 82:
                      this.$ = [];
                      break;
                  case 83:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 86:
                      this.$ = [];
                      break;
                  case 87:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 90:
                      this.$ = [];
                      break;
                  case 91:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 94:
                      this.$ = [];
                      break;
                  case 95:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 98:
                      this.$ = [$$[$0]];
                      break;
                  case 99:
                      $$[$0 - 1].push($$[$0]);
                      break;
                  case 100:
                      this.$ = [$$[$0]];
                      break;
                  case 101:
                      $$[$0 - 1].push($$[$0]);
                      break;
              }
          },
          table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
          defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] },
          parseError: function parseError(str, hash) {
              throw new Error(str);
          },
          parse: function parse(input) {
              var self = this,
                  stack = [0],
                  vstack = [null],
                  lstack = [],
                  table = this.table,
                  yytext = "",
                  yylineno = 0,
                  yyleng = 0,
                  recovering = 0;
              this.lexer.setInput(input);
              this.lexer.yy = this.yy;
              this.yy.lexer = this.lexer;
              this.yy.parser = this;
              if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
              var yyloc = this.lexer.yylloc;
              lstack.push(yyloc);
              var ranges = this.lexer.options && this.lexer.options.ranges;
              if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
              function lex() {
                  var token;
                  token = self.lexer.lex() || 1;
                  if (typeof token !== "number") {
                      token = self.symbols_[token] || token;
                  }
                  return token;
              }
              var symbol,
                  preErrorSymbol,
                  state,
                  action,
                  r,
                  yyval = {},
                  p,
                  len,
                  newState,
                  expected;
              while (true) {
                  state = stack[stack.length - 1];
                  if (this.defaultActions[state]) {
                      action = this.defaultActions[state];
                  } else {
                      if (symbol === null || typeof symbol == "undefined") {
                          symbol = lex();
                      }
                      action = table[state] && table[state][symbol];
                  }
                  if (typeof action === "undefined" || !action.length || !action[0]) {
                      var errStr = "";
                      if (!recovering) {
                          expected = [];
                          for (p in table[state]) if (this.terminals_[p] && p > 2) {
                              expected.push("'" + this.terminals_[p] + "'");
                          }
                          if (this.lexer.showPosition) {
                              errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                          } else {
                              errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                          }
                          this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
                      }
                  }
                  if (action[0] instanceof Array && action.length > 1) {
                      throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                  }
                  switch (action[0]) {
                      case 1:
                          stack.push(symbol);
                          vstack.push(this.lexer.yytext);
                          lstack.push(this.lexer.yylloc);
                          stack.push(action[1]);
                          symbol = null;
                          if (!preErrorSymbol) {
                              yyleng = this.lexer.yyleng;
                              yytext = this.lexer.yytext;
                              yylineno = this.lexer.yylineno;
                              yyloc = this.lexer.yylloc;
                              if (recovering > 0) recovering--;
                          } else {
                              symbol = preErrorSymbol;
                              preErrorSymbol = null;
                          }
                          break;
                      case 2:
                          len = this.productions_[action[1]][1];
                          yyval.$ = vstack[vstack.length - len];
                          yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                          if (ranges) {
                              yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                          }
                          r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                          if (typeof r !== "undefined") {
                              return r;
                          }
                          if (len) {
                              stack = stack.slice(0, -1 * len * 2);
                              vstack = vstack.slice(0, -1 * len);
                              lstack = lstack.slice(0, -1 * len);
                          }
                          stack.push(this.productions_[action[1]][0]);
                          vstack.push(yyval.$);
                          lstack.push(yyval._$);
                          newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                          stack.push(newState);
                          break;
                      case 3:
                          return true;
                  }
              }
              return true;
          }
      };
      /* Jison generated lexer */
      var lexer = (function () {
          var lexer = { EOF: 1,
              parseError: function parseError(str, hash) {
                  if (this.yy.parser) {
                      this.yy.parser.parseError(str, hash);
                  } else {
                      throw new Error(str);
                  }
              },
              setInput: function setInput(input) {
                  this._input = input;
                  this._more = this._less = this.done = false;
                  this.yylineno = this.yyleng = 0;
                  this.yytext = this.matched = this.match = '';
                  this.conditionStack = ['INITIAL'];
                  this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
                  if (this.options.ranges) this.yylloc.range = [0, 0];
                  this.offset = 0;
                  return this;
              },
              input: function input() {
                  var ch = this._input[0];
                  this.yytext += ch;
                  this.yyleng++;
                  this.offset++;
                  this.match += ch;
                  this.matched += ch;
                  var lines = ch.match(/(?:\r\n?|\n).*/g);
                  if (lines) {
                      this.yylineno++;
                      this.yylloc.last_line++;
                  } else {
                      this.yylloc.last_column++;
                  }
                  if (this.options.ranges) this.yylloc.range[1]++;

                  this._input = this._input.slice(1);
                  return ch;
              },
              unput: function unput(ch) {
                  var len = ch.length;
                  var lines = ch.split(/(?:\r\n?|\n)/g);

                  this._input = ch + this._input;
                  this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                  //this.yyleng -= len;
                  this.offset -= len;
                  var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                  this.match = this.match.substr(0, this.match.length - 1);
                  this.matched = this.matched.substr(0, this.matched.length - 1);

                  if (lines.length - 1) this.yylineno -= lines.length - 1;
                  var r = this.yylloc.range;

                  this.yylloc = { first_line: this.yylloc.first_line,
                      last_line: this.yylineno + 1,
                      first_column: this.yylloc.first_column,
                      last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                  };

                  if (this.options.ranges) {
                      this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                  }
                  return this;
              },
              more: function more() {
                  this._more = true;
                  return this;
              },
              less: function less(n) {
                  this.unput(this.match.slice(n));
              },
              pastInput: function pastInput() {
                  var past = this.matched.substr(0, this.matched.length - this.match.length);
                  return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
              },
              upcomingInput: function upcomingInput() {
                  var next = this.match;
                  if (next.length < 20) {
                      next += this._input.substr(0, 20 - next.length);
                  }
                  return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
              },
              showPosition: function showPosition() {
                  var pre = this.pastInput();
                  var c = new Array(pre.length + 1).join("-");
                  return pre + this.upcomingInput() + "\n" + c + "^";
              },
              next: function next() {
                  if (this.done) {
                      return this.EOF;
                  }
                  if (!this._input) this.done = true;

                  var token, match, tempMatch, index, lines;
                  if (!this._more) {
                      this.yytext = '';
                      this.match = '';
                  }
                  var rules = this._currentRules();
                  for (var i = 0; i < rules.length; i++) {
                      tempMatch = this._input.match(this.rules[rules[i]]);
                      if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                          match = tempMatch;
                          index = i;
                          if (!this.options.flex) break;
                      }
                  }
                  if (match) {
                      lines = match[0].match(/(?:\r\n?|\n).*/g);
                      if (lines) this.yylineno += lines.length;
                      this.yylloc = { first_line: this.yylloc.last_line,
                          last_line: this.yylineno + 1,
                          first_column: this.yylloc.last_column,
                          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
                      this.yytext += match[0];
                      this.match += match[0];
                      this.matches = match;
                      this.yyleng = this.yytext.length;
                      if (this.options.ranges) {
                          this.yylloc.range = [this.offset, this.offset += this.yyleng];
                      }
                      this._more = false;
                      this._input = this._input.slice(match[0].length);
                      this.matched += match[0];
                      token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                      if (this.done && this._input) this.done = false;
                      if (token) return token;else return;
                  }
                  if (this._input === "") {
                      return this.EOF;
                  } else {
                      return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
                  }
              },
              lex: function lex() {
                  var r = this.next();
                  if (typeof r !== 'undefined') {
                      return r;
                  } else {
                      return this.lex();
                  }
              },
              begin: function begin(condition) {
                  this.conditionStack.push(condition);
              },
              popState: function popState() {
                  return this.conditionStack.pop();
              },
              _currentRules: function _currentRules() {
                  return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
              },
              topState: function topState() {
                  return this.conditionStack[this.conditionStack.length - 2];
              },
              pushState: function begin(condition) {
                  this.begin(condition);
              } };
          lexer.options = {};
          lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

              function strip(start, end) {
                  return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
              }
              switch ($avoiding_name_collisions) {
                  case 0:
                      if (yy_.yytext.slice(-2) === "\\\\") {
                          strip(0, 1);
                          this.begin("mu");
                      } else if (yy_.yytext.slice(-1) === "\\") {
                          strip(0, 1);
                          this.begin("emu");
                      } else {
                          this.begin("mu");
                      }
                      if (yy_.yytext) return 15;

                      break;
                  case 1:
                      return 15;
                      break;
                  case 2:
                      this.popState();
                      return 15;

                      break;
                  case 3:
                      this.begin('raw');return 15;
                      break;
                  case 4:
                      this.popState();
                      // Should be using `this.topState()` below, but it currently
                      // returns the second top instead of the first top. Opened an
                      // issue about it at https://github.com/zaach/jison/issues/291
                      if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
                          return 15;
                      } else {
                          yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
                          return 'END_RAW_BLOCK';
                      }

                      break;
                  case 5:
                      return 15;
                      break;
                  case 6:
                      this.popState();
                      return 14;

                      break;
                  case 7:
                      return 65;
                      break;
                  case 8:
                      return 68;
                      break;
                  case 9:
                      return 19;
                      break;
                  case 10:
                      this.popState();
                      this.begin('raw');
                      return 23;

                      break;
                  case 11:
                      return 55;
                      break;
                  case 12:
                      return 60;
                      break;
                  case 13:
                      return 29;
                      break;
                  case 14:
                      return 47;
                      break;
                  case 15:
                      this.popState();return 44;
                      break;
                  case 16:
                      this.popState();return 44;
                      break;
                  case 17:
                      return 34;
                      break;
                  case 18:
                      return 39;
                      break;
                  case 19:
                      return 51;
                      break;
                  case 20:
                      return 48;
                      break;
                  case 21:
                      this.unput(yy_.yytext);
                      this.popState();
                      this.begin('com');

                      break;
                  case 22:
                      this.popState();
                      return 14;

                      break;
                  case 23:
                      return 48;
                      break;
                  case 24:
                      return 73;
                      break;
                  case 25:
                      return 72;
                      break;
                  case 26:
                      return 72;
                      break;
                  case 27:
                      return 87;
                      break;
                  case 28:
                      // ignore whitespace
                      break;
                  case 29:
                      this.popState();return 54;
                      break;
                  case 30:
                      this.popState();return 33;
                      break;
                  case 31:
                      yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
                      break;
                  case 32:
                      yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
                      break;
                  case 33:
                      return 85;
                      break;
                  case 34:
                      return 82;
                      break;
                  case 35:
                      return 82;
                      break;
                  case 36:
                      return 83;
                      break;
                  case 37:
                      return 84;
                      break;
                  case 38:
                      return 81;
                      break;
                  case 39:
                      return 75;
                      break;
                  case 40:
                      return 77;
                      break;
                  case 41:
                      return 72;
                      break;
                  case 42:
                      yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
                      break;
                  case 43:
                      return 'INVALID';
                      break;
                  case 44:
                      return 5;
                      break;
              }
          };
          lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
          lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
          return lexer;
      })();
      parser.lexer = lexer;
      function Parser() {
          this.yy = {};
      }Parser.prototype = parser;parser.Parser = Parser;
      return new Parser();
  })();exports["default"] = handlebars;
  module.exports = exports["default"];

  });

  unwrapExports(parser);

  var visitor = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _exception2 = _interopRequireDefault(exception);

  function Visitor() {
    this.parents = [];
  }

  Visitor.prototype = {
    constructor: Visitor,
    mutating: false,

    // Visits a given value. If mutating, will replace the value if necessary.
    acceptKey: function acceptKey(node, name) {
      var value = this.accept(node[name]);
      if (this.mutating) {
        // Hacky sanity check: This may have a few false positives for type for the helper
        // methods but will generally do the right thing without a lot of overhead.
        if (value && !Visitor.prototype[value.type]) {
          throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
        }
        node[name] = value;
      }
    },

    // Performs an accept operation with added sanity check to ensure
    // required keys are not removed.
    acceptRequired: function acceptRequired(node, name) {
      this.acceptKey(node, name);

      if (!node[name]) {
        throw new _exception2['default'](node.type + ' requires ' + name);
      }
    },

    // Traverses a given array. If mutating, empty respnses will be removed
    // for child elements.
    acceptArray: function acceptArray(array) {
      for (var i = 0, l = array.length; i < l; i++) {
        this.acceptKey(array, i);

        if (!array[i]) {
          array.splice(i, 1);
          i--;
          l--;
        }
      }
    },

    accept: function accept(object) {
      if (!object) {
        return;
      }

      /* istanbul ignore next: Sanity code */
      if (!this[object.type]) {
        throw new _exception2['default']('Unknown type: ' + object.type, object);
      }

      if (this.current) {
        this.parents.unshift(this.current);
      }
      this.current = object;

      var ret = this[object.type](object);

      this.current = this.parents.shift();

      if (!this.mutating || ret) {
        return ret;
      } else if (ret !== false) {
        return object;
      }
    },

    Program: function Program(program) {
      this.acceptArray(program.body);
    },

    MustacheStatement: visitSubExpression,
    Decorator: visitSubExpression,

    BlockStatement: visitBlock,
    DecoratorBlock: visitBlock,

    PartialStatement: visitPartial,
    PartialBlockStatement: function PartialBlockStatement(partial) {
      visitPartial.call(this, partial);

      this.acceptKey(partial, 'program');
    },

    ContentStatement: function ContentStatement() /* content */{},
    CommentStatement: function CommentStatement() /* comment */{},

    SubExpression: visitSubExpression,

    PathExpression: function PathExpression() /* path */{},

    StringLiteral: function StringLiteral() /* string */{},
    NumberLiteral: function NumberLiteral() /* number */{},
    BooleanLiteral: function BooleanLiteral() /* bool */{},
    UndefinedLiteral: function UndefinedLiteral() /* literal */{},
    NullLiteral: function NullLiteral() /* literal */{},

    Hash: function Hash(hash) {
      this.acceptArray(hash.pairs);
    },
    HashPair: function HashPair(pair) {
      this.acceptRequired(pair, 'value');
    }
  };

  function visitSubExpression(mustache) {
    this.acceptRequired(mustache, 'path');
    this.acceptArray(mustache.params);
    this.acceptKey(mustache, 'hash');
  }
  function visitBlock(block) {
    visitSubExpression.call(this, block);

    this.acceptKey(block, 'program');
    this.acceptKey(block, 'inverse');
  }
  function visitPartial(partial) {
    this.acceptRequired(partial, 'name');
    this.acceptArray(partial.params);
    this.acceptKey(partial, 'hash');
  }

  exports['default'] = Visitor;
  module.exports = exports['default'];

  });

  unwrapExports(visitor);

  var whitespaceControl = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _visitor2 = _interopRequireDefault(visitor);

  function WhitespaceControl() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    this.options = options;
  }
  WhitespaceControl.prototype = new _visitor2['default']();

  WhitespaceControl.prototype.Program = function (program) {
    var doStandalone = !this.options.ignoreStandalone;

    var isRoot = !this.isRootSeen;
    this.isRootSeen = true;

    var body = program.body;
    for (var i = 0, l = body.length; i < l; i++) {
      var current = body[i],
          strip = this.accept(current);

      if (!strip) {
        continue;
      }

      var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
          _isNextWhitespace = isNextWhitespace(body, i, isRoot),
          openStandalone = strip.openStandalone && _isPrevWhitespace,
          closeStandalone = strip.closeStandalone && _isNextWhitespace,
          inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

      if (strip.close) {
        omitRight(body, i, true);
      }
      if (strip.open) {
        omitLeft(body, i, true);
      }

      if (doStandalone && inlineStandalone) {
        omitRight(body, i);

        if (omitLeft(body, i)) {
          // If we are on a standalone node, save the indent info for partials
          if (current.type === 'PartialStatement') {
            // Pull out the whitespace from the final line
            current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
          }
        }
      }
      if (doStandalone && openStandalone) {
        omitRight((current.program || current.inverse).body);

        // Strip out the previous content node if it's whitespace only
        omitLeft(body, i);
      }
      if (doStandalone && closeStandalone) {
        // Always strip the next node
        omitRight(body, i);

        omitLeft((current.inverse || current.program).body);
      }
    }

    return program;
  };

  WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
    this.accept(block.program);
    this.accept(block.inverse);

    // Find the inverse program that is involed with whitespace stripping.
    var program = block.program || block.inverse,
        inverse = block.program && block.inverse,
        firstInverse = inverse,
        lastInverse = inverse;

    if (inverse && inverse.chained) {
      firstInverse = inverse.body[0].program;

      // Walk the inverse chain to find the last inverse that is actually in the chain.
      while (lastInverse.chained) {
        lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
      }
    }

    var strip = {
      open: block.openStrip.open,
      close: block.closeStrip.close,

      // Determine the standalone candiacy. Basically flag our content as being possibly standalone
      // so our parent can determine if we actually are standalone
      openStandalone: isNextWhitespace(program.body),
      closeStandalone: isPrevWhitespace((firstInverse || program).body)
    };

    if (block.openStrip.close) {
      omitRight(program.body, null, true);
    }

    if (inverse) {
      var inverseStrip = block.inverseStrip;

      if (inverseStrip.open) {
        omitLeft(program.body, null, true);
      }

      if (inverseStrip.close) {
        omitRight(firstInverse.body, null, true);
      }
      if (block.closeStrip.open) {
        omitLeft(lastInverse.body, null, true);
      }

      // Find standalone else statments
      if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
        omitLeft(program.body);
        omitRight(firstInverse.body);
      }
    } else if (block.closeStrip.open) {
      omitLeft(program.body, null, true);
    }

    return strip;
  };

  WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
    return mustache.strip;
  };

  WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
    /* istanbul ignore next */
    var strip = node.strip || {};
    return {
      inlineStandalone: true,
      open: strip.open,
      close: strip.close
    };
  };

  function isPrevWhitespace(body, i, isRoot) {
    if (i === undefined) {
      i = body.length;
    }

    // Nodes that end with newlines are considered whitespace (but are special
    // cased for strip operations)
    var prev = body[i - 1],
        sibling = body[i - 2];
    if (!prev) {
      return isRoot;
    }

    if (prev.type === 'ContentStatement') {
      return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
    }
  }
  function isNextWhitespace(body, i, isRoot) {
    if (i === undefined) {
      i = -1;
    }

    var next = body[i + 1],
        sibling = body[i + 2];
    if (!next) {
      return isRoot;
    }

    if (next.type === 'ContentStatement') {
      return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
    }
  }

  // Marks the node to the right of the position as omitted.
  // I.e. {{foo}}' ' will mark the ' ' node as omitted.
  //
  // If i is undefined, then the first child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.
  function omitRight(body, i, multiple) {
    var current = body[i == null ? 0 : i + 1];
    if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
      return;
    }

    var original = current.value;
    current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
    current.rightStripped = current.value !== original;
  }

  // Marks the node to the left of the position as omitted.
  // I.e. ' '{{foo}} will mark the ' ' node as omitted.
  //
  // If i is undefined then the last child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.
  function omitLeft(body, i, multiple) {
    var current = body[i == null ? body.length - 1 : i - 1];
    if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
      return;
    }

    // We omit the last node if it's whitespace only and not preceeded by a non-content node.
    var original = current.value;
    current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
    current.leftStripped = current.value !== original;
    return current.leftStripped;
  }

  exports['default'] = WhitespaceControl;
  module.exports = exports['default'];

  });

  unwrapExports(whitespaceControl);

  var helpers$2 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.SourceLocation = SourceLocation;
  exports.id = id;
  exports.stripFlags = stripFlags;
  exports.stripComment = stripComment;
  exports.preparePath = preparePath;
  exports.prepareMustache = prepareMustache;
  exports.prepareRawBlock = prepareRawBlock;
  exports.prepareBlock = prepareBlock;
  exports.prepareProgram = prepareProgram;
  exports.preparePartialBlock = preparePartialBlock;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _exception2 = _interopRequireDefault(exception);

  function validateClose(open, close) {
    close = close.path ? close.path.original : close;

    if (open.path.original !== close) {
      var errorNode = { loc: open.path.loc };

      throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
    }
  }

  function SourceLocation(source, locInfo) {
    this.source = source;
    this.start = {
      line: locInfo.first_line,
      column: locInfo.first_column
    };
    this.end = {
      line: locInfo.last_line,
      column: locInfo.last_column
    };
  }

  function id(token) {
    if (/^\[.*\]$/.test(token)) {
      return token.substr(1, token.length - 2);
    } else {
      return token;
    }
  }

  function stripFlags(open, close) {
    return {
      open: open.charAt(2) === '~',
      close: close.charAt(close.length - 3) === '~'
    };
  }

  function stripComment(comment) {
    return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
  }

  function preparePath(data, parts, loc) {
    loc = this.locInfo(loc);

    var original = data ? '@' : '',
        dig = [],
        depth = 0;

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i].part,

      // If we have [] syntax then we do not treat path references as operators,
      // i.e. foo.[this] resolves to approximately context.foo['this']
      isLiteral = parts[i].original !== part;
      original += (parts[i].separator || '') + part;

      if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
        if (dig.length > 0) {
          throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
        } else if (part === '..') {
          depth++;
        }
      } else {
        dig.push(part);
      }
    }

    return {
      type: 'PathExpression',
      data: data,
      depth: depth,
      parts: dig,
      original: original,
      loc: loc
    };
  }

  function prepareMustache(path, params, hash, open, strip, locInfo) {
    // Must use charAt to support IE pre-10
    var escapeFlag = open.charAt(3) || open.charAt(2),
        escaped = escapeFlag !== '{' && escapeFlag !== '&';

    var decorator = /\*/.test(open);
    return {
      type: decorator ? 'Decorator' : 'MustacheStatement',
      path: path,
      params: params,
      hash: hash,
      escaped: escaped,
      strip: strip,
      loc: this.locInfo(locInfo)
    };
  }

  function prepareRawBlock(openRawBlock, contents, close, locInfo) {
    validateClose(openRawBlock, close);

    locInfo = this.locInfo(locInfo);
    var program = {
      type: 'Program',
      body: contents,
      strip: {},
      loc: locInfo
    };

    return {
      type: 'BlockStatement',
      path: openRawBlock.path,
      params: openRawBlock.params,
      hash: openRawBlock.hash,
      program: program,
      openStrip: {},
      inverseStrip: {},
      closeStrip: {},
      loc: locInfo
    };
  }

  function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
    if (close && close.path) {
      validateClose(openBlock, close);
    }

    var decorator = /\*/.test(openBlock.open);

    program.blockParams = openBlock.blockParams;

    var inverse = undefined,
        inverseStrip = undefined;

    if (inverseAndProgram) {
      if (decorator) {
        throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
      }

      if (inverseAndProgram.chain) {
        inverseAndProgram.program.body[0].closeStrip = close.strip;
      }

      inverseStrip = inverseAndProgram.strip;
      inverse = inverseAndProgram.program;
    }

    if (inverted) {
      inverted = inverse;
      inverse = program;
      program = inverted;
    }

    return {
      type: decorator ? 'DecoratorBlock' : 'BlockStatement',
      path: openBlock.path,
      params: openBlock.params,
      hash: openBlock.hash,
      program: program,
      inverse: inverse,
      openStrip: openBlock.strip,
      inverseStrip: inverseStrip,
      closeStrip: close && close.strip,
      loc: this.locInfo(locInfo)
    };
  }

  function prepareProgram(statements, loc) {
    if (!loc && statements.length) {
      var firstLoc = statements[0].loc,
          lastLoc = statements[statements.length - 1].loc;

      /* istanbul ignore else */
      if (firstLoc && lastLoc) {
        loc = {
          source: firstLoc.source,
          start: {
            line: firstLoc.start.line,
            column: firstLoc.start.column
          },
          end: {
            line: lastLoc.end.line,
            column: lastLoc.end.column
          }
        };
      }
    }

    return {
      type: 'Program',
      body: statements,
      strip: {},
      loc: loc
    };
  }

  function preparePartialBlock(open, program, close, locInfo) {
    validateClose(open, close);

    return {
      type: 'PartialBlockStatement',
      name: open.path,
      params: open.params,
      hash: open.hash,
      program: program,
      openStrip: open.strip,
      closeStrip: close && close.strip,
      loc: this.locInfo(locInfo)
    };
  }

  });

  unwrapExports(helpers$2);
  var helpers_1$1 = helpers$2.SourceLocation;
  var helpers_2 = helpers$2.id;
  var helpers_3 = helpers$2.stripFlags;
  var helpers_4 = helpers$2.stripComment;
  var helpers_5 = helpers$2.preparePath;
  var helpers_6 = helpers$2.prepareMustache;
  var helpers_7 = helpers$2.prepareRawBlock;
  var helpers_8 = helpers$2.prepareBlock;
  var helpers_9 = helpers$2.prepareProgram;
  var helpers_10 = helpers$2.preparePartialBlock;

  var base$2 = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.parse = parse;
  // istanbul ignore next

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _parser2 = _interopRequireDefault(parser);



  var _whitespaceControl2 = _interopRequireDefault(whitespaceControl);



  var Helpers = _interopRequireWildcard(helpers$2);



  exports.parser = _parser2['default'];

  var yy = {};
  utils.extend(yy, Helpers);

  function parse(input, options) {
    // Just return if an already-compiled AST was passed in.
    if (input.type === 'Program') {
      return input;
    }

    _parser2['default'].yy = yy;

    // Altering the shared object here, but this is ok as parser is a sync operation
    yy.locInfo = function (locInfo) {
      return new yy.SourceLocation(options && options.srcName, locInfo);
    };

    var strip = new _whitespaceControl2['default'](options);
    return strip.accept(_parser2['default'].parse(input));
  }

  });

  unwrapExports(base$2);
  var base_1$1 = base$2.parse;
  var base_2$1 = base$2.parser;

  var compiler = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.Compiler = Compiler;
  exports.precompile = precompile;
  exports.compile = compile;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _exception2 = _interopRequireDefault(exception);





  var _ast2 = _interopRequireDefault(ast);

  var slice = [].slice;

  function Compiler() {}

  // the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    equals: function equals(other) {
      var len = this.opcodes.length;
      if (other.opcodes.length !== len) {
        return false;
      }

      for (var i = 0; i < len; i++) {
        var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
        if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
          return false;
        }
      }

      // We know that length is the same between the two arrays because they are directly tied
      // to the opcode behavior above.
      len = this.children.length;
      for (var i = 0; i < len; i++) {
        if (!this.children[i].equals(other.children[i])) {
          return false;
        }
      }

      return true;
    },

    guid: 0,

    compile: function compile(program, options) {
      this.sourceNode = [];
      this.opcodes = [];
      this.children = [];
      this.options = options;
      this.stringParams = options.stringParams;
      this.trackIds = options.trackIds;

      options.blockParams = options.blockParams || [];

      // These changes will propagate to the other compiler components
      var knownHelpers = options.knownHelpers;
      options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true,
        'lookup': true
      };
      if (knownHelpers) {
        // the next line should use "Object.keys", but the code has been like this a long time and changing it, might
        // cause backwards-compatibility issues... It's an old library...
        // eslint-disable-next-line guard-for-in
        for (var _name in knownHelpers) {
          this.options.knownHelpers[_name] = knownHelpers[_name];
        }
      }

      return this.accept(program);
    },

    compileProgram: function compileProgram(program) {
      var childCompiler = new this.compiler(),
          // eslint-disable-line new-cap
      result = childCompiler.compile(program, this.options),
          guid = this.guid++;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;
      this.useDepths = this.useDepths || result.useDepths;

      return guid;
    },

    accept: function accept(node) {
      /* istanbul ignore next: Sanity code */
      if (!this[node.type]) {
        throw new _exception2['default']('Unknown type: ' + node.type, node);
      }

      this.sourceNode.unshift(node);
      var ret = this[node.type](node);
      this.sourceNode.shift();
      return ret;
    },

    Program: function Program(program) {
      this.options.blockParams.unshift(program.blockParams);

      var body = program.body,
          bodyLength = body.length;
      for (var i = 0; i < bodyLength; i++) {
        this.accept(body[i]);
      }

      this.options.blockParams.shift();

      this.isSimple = bodyLength === 1;
      this.blockParams = program.blockParams ? program.blockParams.length : 0;

      return this;
    },

    BlockStatement: function BlockStatement(block) {
      transformLiteralToPath(block);

      var program = block.program,
          inverse = block.inverse;

      program = program && this.compileProgram(program);
      inverse = inverse && this.compileProgram(inverse);

      var type = this.classifySexpr(block);

      if (type === 'helper') {
        this.helperSexpr(block, program, inverse);
      } else if (type === 'simple') {
        this.simpleSexpr(block);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('blockValue', block.path.original);
      } else {
        this.ambiguousSexpr(block, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    DecoratorBlock: function DecoratorBlock(decorator) {
      var program = decorator.program && this.compileProgram(decorator.program);
      var params = this.setupFullMustacheParams(decorator, program, undefined),
          path = decorator.path;

      this.useDecorators = true;
      this.opcode('registerDecorator', params.length, path.original);
    },

    PartialStatement: function PartialStatement(partial) {
      this.usePartial = true;

      var program = partial.program;
      if (program) {
        program = this.compileProgram(partial.program);
      }

      var params = partial.params;
      if (params.length > 1) {
        throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
      } else if (!params.length) {
        if (this.options.explicitPartialContext) {
          this.opcode('pushLiteral', 'undefined');
        } else {
          params.push({ type: 'PathExpression', parts: [], depth: 0 });
        }
      }

      var partialName = partial.name.original,
          isDynamic = partial.name.type === 'SubExpression';
      if (isDynamic) {
        this.accept(partial.name);
      }

      this.setupFullMustacheParams(partial, program, undefined, true);

      var indent = partial.indent || '';
      if (this.options.preventIndent && indent) {
        this.opcode('appendContent', indent);
        indent = '';
      }

      this.opcode('invokePartial', isDynamic, partialName, indent);
      this.opcode('append');
    },
    PartialBlockStatement: function PartialBlockStatement(partialBlock) {
      this.PartialStatement(partialBlock);
    },

    MustacheStatement: function MustacheStatement(mustache) {
      this.SubExpression(mustache);

      if (mustache.escaped && !this.options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },
    Decorator: function Decorator(decorator) {
      this.DecoratorBlock(decorator);
    },

    ContentStatement: function ContentStatement(content) {
      if (content.value) {
        this.opcode('appendContent', content.value);
      }
    },

    CommentStatement: function CommentStatement() {},

    SubExpression: function SubExpression(sexpr) {
      transformLiteralToPath(sexpr);
      var type = this.classifySexpr(sexpr);

      if (type === 'simple') {
        this.simpleSexpr(sexpr);
      } else if (type === 'helper') {
        this.helperSexpr(sexpr);
      } else {
        this.ambiguousSexpr(sexpr);
      }
    },
    ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
      var path = sexpr.path,
          name = path.parts[0],
          isBlock = program != null || inverse != null;

      this.opcode('getContext', path.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      path.strict = true;
      this.accept(path);

      this.opcode('invokeAmbiguous', name, isBlock);
    },

    simpleSexpr: function simpleSexpr(sexpr) {
      var path = sexpr.path;
      path.strict = true;
      this.accept(path);
      this.opcode('resolvePossibleLambda');
    },

    helperSexpr: function helperSexpr(sexpr, program, inverse) {
      var params = this.setupFullMustacheParams(sexpr, program, inverse),
          path = sexpr.path,
          name = path.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.options.knownHelpersOnly) {
        throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
      } else {
        path.strict = true;
        path.falsy = true;

        this.accept(path);
        this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
      }
    },

    PathExpression: function PathExpression(path) {
      this.addDepth(path.depth);
      this.opcode('getContext', path.depth);

      var name = path.parts[0],
          scoped = _ast2['default'].helpers.scopedId(path),
          blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

      if (blockParamId) {
        this.opcode('lookupBlockParam', blockParamId, path.parts);
      } else if (!name) {
        // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
        this.opcode('pushContext');
      } else if (path.data) {
        this.options.data = true;
        this.opcode('lookupData', path.depth, path.parts, path.strict);
      } else {
        this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
      }
    },

    StringLiteral: function StringLiteral(string) {
      this.opcode('pushString', string.value);
    },

    NumberLiteral: function NumberLiteral(number) {
      this.opcode('pushLiteral', number.value);
    },

    BooleanLiteral: function BooleanLiteral(bool) {
      this.opcode('pushLiteral', bool.value);
    },

    UndefinedLiteral: function UndefinedLiteral() {
      this.opcode('pushLiteral', 'undefined');
    },

    NullLiteral: function NullLiteral() {
      this.opcode('pushLiteral', 'null');
    },

    Hash: function Hash(hash) {
      var pairs = hash.pairs,
          i = 0,
          l = pairs.length;

      this.opcode('pushHash');

      for (; i < l; i++) {
        this.pushParam(pairs[i].value);
      }
      while (i--) {
        this.opcode('assignToHash', pairs[i].key);
      }
      this.opcode('popHash');
    },

    // HELPERS
    opcode: function opcode(name) {
      this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
    },

    addDepth: function addDepth(depth) {
      if (!depth) {
        return;
      }

      this.useDepths = true;
    },

    classifySexpr: function classifySexpr(sexpr) {
      var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

      var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

      // a mustache is an eligible helper if:
      // * its id is simple (a single part, not `this` or `..`)
      var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

      // if a mustache is an eligible helper but not a definite
      // helper, it is ambiguous, and will be resolved in a later
      // pass or at runtime.
      var isEligible = !isBlockParam && (isHelper || isSimple);

      // if ambiguous, we can possibly resolve the ambiguity now
      // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
      if (isEligible && !isHelper) {
        var _name2 = sexpr.path.parts[0],
            options = this.options;

        if (options.knownHelpers[_name2]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) {
        return 'helper';
      } else if (isEligible) {
        return 'ambiguous';
      } else {
        return 'simple';
      }
    },

    pushParams: function pushParams(params) {
      for (var i = 0, l = params.length; i < l; i++) {
        this.pushParam(params[i]);
      }
    },

    pushParam: function pushParam(val) {
      var value = val.value != null ? val.value : val.original || '';

      if (this.stringParams) {
        if (value.replace) {
          value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
        }

        if (val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', value, val.type);

        if (val.type === 'SubExpression') {
          // SubExpressions get evaluated and passed in
          // in string params mode.
          this.accept(val);
        }
      } else {
        if (this.trackIds) {
          var blockParamIndex = undefined;
          if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
            blockParamIndex = this.blockParamIndex(val.parts[0]);
          }
          if (blockParamIndex) {
            var blockParamChild = val.parts.slice(1).join('.');
            this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
          } else {
            value = val.original || value;
            if (value.replace) {
              value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
            }

            this.opcode('pushId', val.type, value);
          }
        }
        this.accept(val);
      }
    },

    setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
      var params = sexpr.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if (sexpr.hash) {
        this.accept(sexpr.hash);
      } else {
        this.opcode('emptyHash', omitEmpty);
      }

      return params;
    },

    blockParamIndex: function blockParamIndex(name) {
      for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
        var blockParams = this.options.blockParams[depth],
            param = blockParams && utils.indexOf(blockParams, name);
        if (blockParams && param >= 0) {
          return [depth, param];
        }
      }
    }
  };

  function precompile(input, options, env) {
    if (input == null || typeof input !== 'string' && input.type !== 'Program') {
      throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
    }

    options = options || {};
    if (!('data' in options)) {
      options.data = true;
    }
    if (options.compat) {
      options.useDepths = true;
    }

    var ast$$1 = env.parse(input, options),
        environment = new env.Compiler().compile(ast$$1, options);
    return new env.JavaScriptCompiler().compile(environment, options);
  }

  function compile(input, options, env) {
    if (options === undefined) options = {};

    if (input == null || typeof input !== 'string' && input.type !== 'Program') {
      throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
    }

    options = utils.extend({}, options);
    if (!('data' in options)) {
      options.data = true;
    }
    if (options.compat) {
      options.useDepths = true;
    }

    var compiled = undefined;

    function compileInput() {
      var ast$$1 = env.parse(input, options),
          environment = new env.Compiler().compile(ast$$1, options),
          templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
      return env.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    function ret(context, execOptions) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled.call(this, context, execOptions);
    }
    ret._setup = function (setupOptions) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled._setup(setupOptions);
    };
    ret._child = function (i, data, blockParams, depths) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled._child(i, data, blockParams, depths);
    };
    return ret;
  }

  function argEquals(a, b) {
    if (a === b) {
      return true;
    }

    if (utils.isArray(a) && utils.isArray(b) && a.length === b.length) {
      for (var i = 0; i < a.length; i++) {
        if (!argEquals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
  }

  function transformLiteralToPath(sexpr) {
    if (!sexpr.path.parts) {
      var literal = sexpr.path;
      // Casting to string here to make false and 0 literal values play nicely with the rest
      // of the system.
      sexpr.path = {
        type: 'PathExpression',
        data: false,
        depth: 0,
        parts: [literal.original + ''],
        original: literal.original + '',
        loc: literal.loc
      };
    }
  }

  });

  unwrapExports(compiler);
  var compiler_1 = compiler.Compiler;
  var compiler_2 = compiler.precompile;
  var compiler_3 = compiler.compile;

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  var encode = function (number) {
    if (0 <= number && number < intToCharMap.length) {
      return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + number);
  };

  /**
   * Decode a single base 64 character code digit to an integer. Returns -1 on
   * failure.
   */
  var decode = function (charCode) {
    var bigA = 65;     // 'A'
    var bigZ = 90;     // 'Z'

    var littleA = 97;  // 'a'
    var littleZ = 122; // 'z'

    var zero = 48;     // '0'
    var nine = 57;     // '9'

    var plus = 43;     // '+'
    var slash = 47;    // '/'

    var littleOffset = 26;
    var numberOffset = 52;

    // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
    if (bigA <= charCode && charCode <= bigZ) {
      return (charCode - bigA);
    }

    // 26 - 51: abcdefghijklmnopqrstuvwxyz
    if (littleA <= charCode && charCode <= littleZ) {
      return (charCode - littleA + littleOffset);
    }

    // 52 - 61: 0123456789
    if (zero <= charCode && charCode <= nine) {
      return (charCode - zero + numberOffset);
    }

    // 62: +
    if (charCode == plus) {
      return 62;
    }

    // 63: /
    if (charCode == slash) {
      return 63;
    }

    // Invalid base64 digit.
    return -1;
  };

  var base64 = {
  	encode: encode,
  	decode: decode
  };

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   *
   * Based on the Base 64 VLQ implementation in Closure Compiler:
   * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
   *
   * Copyright 2011 The Closure Compiler Authors. All rights reserved.
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are
   * met:
   *
   *  * Redistributions of source code must retain the above copyright
   *    notice, this list of conditions and the following disclaimer.
   *  * Redistributions in binary form must reproduce the above
   *    copyright notice, this list of conditions and the following
   *    disclaimer in the documentation and/or other materials provided
   *    with the distribution.
   *  * Neither the name of Google Inc. nor the names of its
   *    contributors may be used to endorse or promote products derived
   *    from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
   * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
   * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
   * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
   * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */



  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  var encode$1 = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string via the out parameter.
   */
  var decode$1 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (aIndex >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }

      digit = base64.decode(aStr.charCodeAt(aIndex++));
      if (digit === -1) {
        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      }

      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aIndex;
  };

  var base64Vlq = {
  	encode: encode$1,
  	decode: decode$1
  };

  var util = createCommonjsModule(function (module, exports) {
  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;

  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;

  function urlGenerate(aParsedUrl) {
    var url = '';
    if (aParsedUrl.scheme) {
      url += aParsedUrl.scheme + ':';
    }
    url += '//';
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + '@';
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port;
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;

  /**
   * Normalizes a path, or the path portion of a URL:
   *
   * - Replaces consecutive slashes with one slash.
   * - Removes unnecessary '.' parts.
   * - Removes unnecessary '<dir>/..' parts.
   *
   * Based on code in the Node.js 'path' core module.
   *
   * @param aPath The path or url to normalize.
   */
  function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
      if (!url.path) {
        return aPath;
      }
      path = url.path;
    }
    var isAbsolute = exports.isAbsolute(path);

    var parts = path.split(/\/+/);
    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
      part = parts[i];
      if (part === '.') {
        parts.splice(i, 1);
      } else if (part === '..') {
        up++;
      } else if (up > 0) {
        if (part === '') {
          // The first part is blank if the path is absolute. Trying to go
          // above the root is a no-op. Therefore we can remove all '..' parts
          // directly after the root.
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join('/');

    if (path === '') {
      path = isAbsolute ? '/' : '.';
    }

    if (url) {
      url.path = path;
      return urlGenerate(url);
    }
    return path;
  }
  exports.normalize = normalize;

  /**
   * Joins two paths/URLs.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be joined with the root.
   *
   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
   *   first.
   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
   *   is updated with the result and aRoot is returned. Otherwise the result
   *   is returned.
   *   - If aPath is absolute, the result is aPath.
   *   - Otherwise the two paths are joined with a slash.
   * - Joining for example 'http://' and 'www.example.com' is also supported.
   */
  function join(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    if (aPath === "") {
      aPath = ".";
    }
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || '/';
    }

    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }

    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }

    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }

    var joined = aPath.charAt(0) === '/'
      ? aPath
      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join;

  exports.isAbsolute = function (aPath) {
    return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
  };

  /**
   * Make a path relative to a URL or another path.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be made relative to aRoot.
   */
  function relative(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }

    aRoot = aRoot.replace(/\/$/, '');

    // It is possible for the path to be above the root. In this case, simply
    // checking whether the root is a prefix of the path won't work. Instead, we
    // need to remove components from the root one by one, until either we find
    // a prefix that fits, or we run out of components to remove.
    var level = 0;
    while (aPath.indexOf(aRoot + '/') !== 0) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0) {
        return aPath;
      }

      // If the only part of the root that is left is the scheme (i.e. http://,
      // file:///, etc.), one or more slashes (/), or simply nothing at all, we
      // have exhausted all components, so the path is not relative to the root.
      aRoot = aRoot.slice(0, index);
      if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
        return aPath;
      }

      ++level;
    }

    // Make sure we add a "../" for each component we removed from the root.
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  }
  exports.relative = relative;

  var supportsNullProto = (function () {
    var obj = Object.create(null);
    return !('__proto__' in obj);
  }());

  function identity (s) {
    return s;
  }

  /**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  function toSetString(aStr) {
    if (isProtoString(aStr)) {
      return '$' + aStr;
    }

    return aStr;
  }
  exports.toSetString = supportsNullProto ? identity : toSetString;

  function fromSetString(aStr) {
    if (isProtoString(aStr)) {
      return aStr.slice(1);
    }

    return aStr;
  }
  exports.fromSetString = supportsNullProto ? identity : fromSetString;

  function isProtoString(s) {
    if (!s) {
      return false;
    }

    var length = s.length;

    if (length < 9 /* "__proto__".length */) {
      return false;
    }

    if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
        s.charCodeAt(length - 2) !== 95  /* '_' */ ||
        s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
        s.charCodeAt(length - 4) !== 116 /* 't' */ ||
        s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
        s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
        s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
        s.charCodeAt(length - 8) !== 95  /* '_' */ ||
        s.charCodeAt(length - 9) !== 95  /* '_' */) {
      return false;
    }

    for (var i = length - 10; i >= 0; i--) {
      if (s.charCodeAt(i) !== 36 /* '$' */) {
        return false;
      }
    }

    return true;
  }

  /**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByOriginalPositions = compareByOriginalPositions;

  /**
   * Comparator between two mappings with deflated source and name indices where
   * the generated positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

  function strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) {
      return 0;
    }

    if (aStr1 === null) {
      return 1; // aStr2 !== null
    }

    if (aStr2 === null) {
      return -1; // aStr1 !== null
    }

    if (aStr1 > aStr2) {
      return 1;
    }

    return -1;
  }

  /**
   * Comparator between two mappings with inflated source and name strings where
   * the generated positions are compared.
   */
  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

  /**
   * Strip any JSON XSSI avoidance prefix from the string (as documented
   * in the source maps specification), and then parse the string as
   * JSON.
   */
  function parseSourceMapInput(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
  }
  exports.parseSourceMapInput = parseSourceMapInput;

  /**
   * Compute the URL of a source given the the source root, the source's
   * URL, and the source map's URL.
   */
  function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    sourceURL = sourceURL || '';

    if (sourceRoot) {
      // This follows what Chrome does.
      if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
        sourceRoot += '/';
      }
      // The spec says:
      //   Line 4: An optional source root, useful for relocating source
      //   files on a server or removing repeated values in the
      //   “sources” entry.  This value is prepended to the individual
      //   entries in the “source” field.
      sourceURL = sourceRoot + sourceURL;
    }

    // Historically, SourceMapConsumer did not take the sourceMapURL as
    // a parameter.  This mode is still somewhat supported, which is why
    // this code block is conditional.  However, it's preferable to pass
    // the source map URL to SourceMapConsumer, so that this function
    // can implement the source URL resolution algorithm as outlined in
    // the spec.  This block is basically the equivalent of:
    //    new URL(sourceURL, sourceMapURL).toString()
    // ... except it avoids using URL, which wasn't available in the
    // older releases of node still supported by this library.
    //
    // The spec says:
    //   If the sources are not absolute URLs after prepending of the
    //   “sourceRoot”, the sources are resolved relative to the
    //   SourceMap (like resolving script src in a html document).
    if (sourceMapURL) {
      var parsed = urlParse(sourceMapURL);
      if (!parsed) {
        throw new Error("sourceMapURL could not be parsed");
      }
      if (parsed.path) {
        // Strip the last path component, but keep the "/".
        var index = parsed.path.lastIndexOf('/');
        if (index >= 0) {
          parsed.path = parsed.path.substring(0, index + 1);
        }
      }
      sourceURL = join(urlGenerate(parsed), sourceURL);
    }

    return normalize(sourceURL);
  }
  exports.computeSourceURL = computeSourceURL;
  });
  var util_1 = util.getArg;
  var util_2 = util.urlParse;
  var util_3 = util.urlGenerate;
  var util_4 = util.normalize;
  var util_5 = util.join;
  var util_6 = util.isAbsolute;
  var util_7 = util.relative;
  var util_8 = util.toSetString;
  var util_9 = util.fromSetString;
  var util_10 = util.compareByOriginalPositions;
  var util_11 = util.compareByGeneratedPositionsDeflated;
  var util_12 = util.compareByGeneratedPositionsInflated;
  var util_13 = util.parseSourceMapInput;
  var util_14 = util.computeSourceURL;

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */


  var has = Object.prototype.hasOwnProperty;
  var hasNativeMap = typeof Map !== "undefined";

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = hasNativeMap ? new Map() : Object.create(null);
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Return how many unique items are in this ArraySet. If duplicates have been
   * added, than those do not count towards the size.
   *
   * @returns Number
   */
  ArraySet.prototype.size = function ArraySet_size() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
    var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      if (hasNativeMap) {
        this._set.set(aStr, idx);
      } else {
        this._set[sStr] = idx;
      }
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    if (hasNativeMap) {
      return this._set.has(aStr);
    } else {
      var sStr = util.toSetString(aStr);
      return has.call(this._set, sStr);
    }
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (hasNativeMap) {
      var idx = this._set.get(aStr);
      if (idx >= 0) {
          return idx;
      }
    } else {
      var sStr = util.toSetString(aStr);
      if (has.call(this._set, sStr)) {
        return this._set[sStr];
      }
    }

    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  var ArraySet_1 = ArraySet;

  var arraySet = {
  	ArraySet: ArraySet_1
  };

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2014 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */



  /**
   * Determine whether mappingB is after mappingA with respect to generated
   * position.
   */
  function generatedPositionAfter(mappingA, mappingB) {
    // Optimized for most common case
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA ||
           util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }

  /**
   * A data structure to provide a sorted view of accumulated mappings in a
   * performance conscious manner. It trades a neglibable overhead in general
   * case for a large speedup in case of mappings being added in order.
   */
  function MappingList() {
    this._array = [];
    this._sorted = true;
    // Serves as infimum
    this._last = {generatedLine: -1, generatedColumn: 0};
  }

  /**
   * Iterate through internal items. This method takes the same arguments that
   * `Array.prototype.forEach` takes.
   *
   * NOTE: The order of the mappings is NOT guaranteed.
   */
  MappingList.prototype.unsortedForEach =
    function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };

  /**
   * Add the given source mapping.
   *
   * @param Object aMapping
   */
  MappingList.prototype.add = function MappingList_add(aMapping) {
    if (generatedPositionAfter(this._last, aMapping)) {
      this._last = aMapping;
      this._array.push(aMapping);
    } else {
      this._sorted = false;
      this._array.push(aMapping);
    }
  };

  /**
   * Returns the flat, sorted array of mappings. The mappings are sorted by
   * generated position.
   *
   * WARNING: This method returns internal data without copying, for
   * performance. The return value must NOT be mutated, and should be treated as
   * an immutable borrow. If you want to take ownership, you must make your own
   * copy.
   */
  MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
      this._array.sort(util.compareByGeneratedPositionsInflated);
      this._sorted = true;
    }
    return this._array;
  };

  var MappingList_1 = MappingList;

  var mappingList = {
  	MappingList: MappingList_1
  };

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */



  var ArraySet$1 = arraySet.ArraySet;
  var MappingList$1 = mappingList.MappingList;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
    this._sources = new ArraySet$1();
    this._names = new ArraySet$1();
    this._mappings = new MappingList$1();
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }

        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }

        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }

      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }

      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }

      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }

      if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "sourceFile" relative if an absolute Url is passed.
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet$1();
      var newNames = new ArraySet$1();

      // Find mappings for the "sourceFile"
      this._mappings.unsortedForEach(function (mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            // Copy mapping
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile);
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      // When aOriginal is truthy but has empty values for .line and .column,
      // it is most likely a programmer error. In this case we throw a very
      // specific error message to try to guide them the right way.
      // For example: https://github.com/Polymer/polymer-bundler/pull/519
      if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
          throw new Error(
              'original.line and original.column are not numbers -- you probably meant to omit ' +
              'the original mapping entirely and only map the generated position. If so, pass ' +
              'null for the original mapping instead of an object with empty or null values.'
          );
      }

      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;

      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = '';

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ',';
          }
        }

        next += base64Vlq.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64Vlq.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;

          // lines are stored 0-based in SourceMap spec version 3
          next += base64Vlq.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          next += base64Vlq.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64Vlq.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }

        result += next;
      }

      return result;
    };

  SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };

  var SourceMapGenerator_1 = SourceMapGenerator;

  var sourceMapGenerator = {
  	SourceMapGenerator: SourceMapGenerator_1
  };

  var binarySearch = createCommonjsModule(function (module, exports) {
  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  exports.GREATEST_LOWER_BOUND = 1;
  exports.LEAST_UPPER_BOUND = 2;

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the index of
    //      the next-closest element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element than the one we are searching for, so we return -1.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      // Found the element we are looking for.
      return mid;
    }
    else if (cmp > 0) {
      // Our needle is greater than aHaystack[mid].
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
      }

      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (3) or (2) and return the appropriate thing.
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return aHigh < aHaystack.length ? aHigh : -1;
      } else {
        return mid;
      }
    }
    else {
      // Our needle is less than aHaystack[mid].
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
      }

      // we are in termination case (3) or (2) and return the appropriate thing.
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return mid;
      } else {
        return aLow < 0 ? -1 : aLow;
      }
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the index of the closest element if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) {
      return -1;
    }

    var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                                aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) {
      return -1;
    }

    // We have found either the exact element, or the next-closest element than
    // the one we are searching for. However, there may be more than one such
    // element. Make sure we always return the smallest of these.
    while (index - 1 >= 0) {
      if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
        break;
      }
      --index;
    }

    return index;
  };
  });
  var binarySearch_1 = binarySearch.GREATEST_LOWER_BOUND;
  var binarySearch_2 = binarySearch.LEAST_UPPER_BOUND;
  var binarySearch_3 = binarySearch.search;

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  // It turns out that some (most?) JavaScript engines don't self-host
  // `Array.prototype.sort`. This makes sense because C++ will likely remain
  // faster than JS when doing raw CPU-intensive sorting. However, when using a
  // custom comparator function, calling back and forth between the VM's C++ and
  // JIT'd JS is rather slow *and* loses JIT type information, resulting in
  // worse generated code for the comparator function than would be optimal. In
  // fact, when sorting with a comparator, these costs outweigh the benefits of
  // sorting in C++. By using our own JS-implemented Quick Sort (below), we get
  // a ~3500ms mean speed-up in `bench/bench.html`.

  /**
   * Swap the elements indexed by `x` and `y` in the array `ary`.
   *
   * @param {Array} ary
   *        The array.
   * @param {Number} x
   *        The index of the first item.
   * @param {Number} y
   *        The index of the second item.
   */
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y];
    ary[y] = temp;
  }

  /**
   * Returns a random integer within the range `low .. high` inclusive.
   *
   * @param {Number} low
   *        The lower bound on the range.
   * @param {Number} high
   *        The upper bound on the range.
   */
  function randomIntInRange(low, high) {
    return Math.round(low + (Math.random() * (high - low)));
  }

  /**
   * The Quick Sort algorithm.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   * @param {Number} p
   *        Start index of the array
   * @param {Number} r
   *        End index of the array
   */
  function doQuickSort(ary, comparator, p, r) {
    // If our lower bound is less than our upper bound, we (1) partition the
    // array into two pieces and (2) recurse on each half. If it is not, this is
    // the empty array and our base case.

    if (p < r) {
      // (1) Partitioning.
      //
      // The partitioning chooses a pivot between `p` and `r` and moves all
      // elements that are less than or equal to the pivot to the before it, and
      // all the elements that are greater than it after it. The effect is that
      // once partition is done, the pivot is in the exact place it will be when
      // the array is put in sorted order, and it will not need to be moved
      // again. This runs in O(n) time.

      // Always choose a random pivot so that an input array which is reverse
      // sorted does not cause O(n^2) running time.
      var pivotIndex = randomIntInRange(p, r);
      var i = p - 1;

      swap(ary, pivotIndex, r);
      var pivot = ary[r];

      // Immediately after `j` is incremented in this loop, the following hold
      // true:
      //
      //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
      //
      //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
      for (var j = p; j < r; j++) {
        if (comparator(ary[j], pivot) <= 0) {
          i += 1;
          swap(ary, i, j);
        }
      }

      swap(ary, i + 1, j);
      var q = i + 1;

      // (2) Recurse on each half.

      doQuickSort(ary, comparator, p, q - 1);
      doQuickSort(ary, comparator, q + 1, r);
    }
  }

  /**
   * Sort the given array in-place with the given comparator function.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   */
  var quickSort_1 = function (ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
  };

  var quickSort = {
  	quickSort: quickSort_1
  };

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */



  var ArraySet$2 = arraySet.ArraySet;

  var quickSort$1 = quickSort.quickSort;

  function SourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = util.parseSourceMapInput(aSourceMap);
    }

    return sourceMap.sections != null
      ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
      : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
  }

  SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
  };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    configurable: true,
    enumerable: true,
    get: function () {
      if (!this.__generatedMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    configurable: true,
    enumerable: true,
    get: function () {
      if (!this.__originalMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  SourceMapConsumer.prototype._charIsMappingSeparator =
    function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer.LEAST_UPPER_BOUND = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      mappings.map(function (mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    };

  /**
   * Returns all generated line and column information for the original source,
   * line, and column provided. If no column is provided, returns all mappings
   * corresponding to a either the line we are searching for or the next
   * closest line that has any mappings. Otherwise, returns all mappings
   * corresponding to the given line and either the column we are searching for
   * or the next closest column that has any offsets.
   *
   * The only argument is an object with the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number is 1-based.
   *   - column: Optional. the column number in the original source.
   *    The column number is 0-based.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *    line number is 1-based.
   *   - column: The column number in the generated source, or null.
   *    The column number is 0-based.
   */
  SourceMapConsumer.prototype.allGeneratedPositionsFor =
    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, 'line');

      // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
      // returns the index of the closest mapping less than the needle. By
      // setting needle.originalColumn to 0, we thus find the last mapping for
      // the given line, provided such a mapping exists.
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: line,
        originalColumn: util.getArg(aArgs, 'column', 0)
      };

      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }

      var mappings = [];

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    "originalLine",
                                    "originalColumn",
                                    util.compareByOriginalPositions,
                                    binarySearch.LEAST_UPPER_BOUND);
      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (aArgs.column === undefined) {
          var originalLine = mapping.originalLine;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we found. Since
          // mappings are sorted, this is guaranteed to find all mappings for
          // the line we found.
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, 'generatedLine', null),
              column: util.getArg(mapping, 'generatedColumn', null),
              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we were searching for.
          // Since mappings are sorted, this is guaranteed to find all mappings for
          // the line we are searching for.
          while (mapping &&
                 mapping.originalLine === line &&
                 mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, 'generatedLine', null),
              column: util.getArg(mapping, 'generatedColumn', null),
              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        }
      }

      return mappings;
    };

  var SourceMapConsumer_1 = SourceMapConsumer;

  /**
   * A BasicSourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The first parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * The second parameter, if given, is a string whose value is the URL
   * at which the source map was found.  This URL is used to compute the
   * sources array.
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = util.parseSourceMapInput(aSourceMap);
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    if (sourceRoot) {
      sourceRoot = util.normalize(sourceRoot);
    }

    sources = sources
      .map(String)
      // Some source maps produce relative source paths like "./foo.js" instead of
      // "foo.js".  Normalize these first so that future comparisons will succeed.
      // See bugzil.la/1090768.
      .map(util.normalize)
      // Always ensure that absolute sources are internally stored relative to
      // the source root, if the source root is absolute. Not doing this would
      // be particularly problematic when the source root is a prefix of the
      // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
      .map(function (source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
          ? util.relative(sourceRoot, source)
          : source;
      });

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet$2.fromArray(names.map(String), true);
    this._sources = ArraySet$2.fromArray(sources, true);

    this._absoluteSources = this._sources.toArray().map(function (s) {
      return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
    });

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this._sourceMapURL = aSourceMapURL;
    this.file = file;
  }

  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

  /**
   * Utility function to find the index of a source.  Returns -1 if not
   * found.
   */
  BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    if (this._sources.has(relativeSource)) {
      return this._sources.indexOf(relativeSource);
    }

    // Maybe aSource is an absolute URL as returned by |sources|.  In
    // this case we can't simply undo the transform.
    var i;
    for (i = 0; i < this._absoluteSources.length; ++i) {
      if (this._absoluteSources[i] == aSource) {
        return i;
      }
    }

    return -1;
  };

  /**
   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @param String aSourceMapURL
   *        The URL at which the source map can be found (optional)
   * @returns BasicSourceMapConsumer
   */
  BasicSourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);

      var names = smc._names = ArraySet$2.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet$2.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function (s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });

      // Because we are modifying the entries (by converting string sources and
      // names to indices into the sources and names ArraySets), we have to make
      // a copy of the entry or else bad things happen. Shared mutable state
      // strikes again! See github issue #191.

      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];

      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping;
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;

        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;

          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }

          destOriginalMappings.push(destMapping);
        }

        destGeneratedMappings.push(destMapping);
      }

      quickSort$1(smc.__originalMappings, util.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  BasicSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._absoluteSources.slice();
    }
  });

  /**
   * Provide the JIT with a nice shape / hidden class.
   */
  function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
  }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  BasicSourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;

      while (index < length) {
        if (aStr.charAt(index) === ';') {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        }
        else if (aStr.charAt(index) === ',') {
          index++;
        }
        else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;

          // Because each offset is encoded relative to the previous one,
          // many segments often have the same encoding. We can exploit this
          // fact by caching the parsed variable length fields of each segment,
          // allowing us to avoid a second parse if we encounter the same
          // segment again.
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);

          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end) {
              base64Vlq.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }

            if (segment.length === 2) {
              throw new Error('Found a source, but no line and column');
            }

            if (segment.length === 3) {
              throw new Error('Found a source and line, but no column');
            }

            cachedSegments[str] = segment;
          }

          // Generated column.
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;

          if (segment.length > 1) {
            // Original source.
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];

            // Original line.
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;

            // Original column.
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;

            if (segment.length > 4) {
              // Original name.
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }

          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            originalMappings.push(mapping);
          }
        }
      }

      quickSort$1(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;

      quickSort$1(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  BasicSourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator, aBias) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
  BasicSourceMapConsumer.prototype.computeColumnSpans =
    function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];

        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];

          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }

        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity;
      }
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.  The line number
   *     is 1-based.
   *   - column: The column number in the generated source.  The column
   *     number is 0-based.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the original source, or null.  The
   *     column number is 0-based.
   *   - name: The original identifier, or null.
   */
  BasicSourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._generatedMappings[index];

        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, 'source', null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, 'name', null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source: source,
            line: util.getArg(mapping, 'originalLine', null),
            column: util.getArg(mapping, 'originalColumn', null),
            name: name
          };
        }
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
    function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() &&
        !this.sourcesContent.some(function (sc) { return sc == null; });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  BasicSourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }

      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }

      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }

      var url;
      if (this.sourceRoot != null
          && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }

      // This function is used recursively from
      // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
      // don't want to throw if we can't find the source - we just want to
      // return null, so we provide a flag to exit gracefully.
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number
   *     is 1-based.
   *   - column: The column number in the original source.  The column
   *     number is 0-based.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the generated source, or null.
   *     The column number is 0-based.
   */
  BasicSourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, 'source');
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }

      var needle = {
        source: source,
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          };
        }
      }

      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };

  var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

  /**
   * An IndexedSourceMapConsumer instance represents a parsed source map which
   * we can query for information. It differs from BasicSourceMapConsumer in
   * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
   * input.
   *
   * The first parameter is a raw source map (either as a JSON string, or already
   * parsed to an object). According to the spec for indexed source maps, they
   * have the following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - file: Optional. The generated file this source map is associated with.
   *   - sections: A list of section definitions.
   *
   * Each value under the "sections" field has two fields:
   *   - offset: The offset into the original specified at which this section
   *       begins to apply, defined as an object with a "line" and "column"
   *       field.
   *   - map: A source map definition. This source map could also be indexed,
   *       but doesn't have to be.
   *
   * Instead of the "map" field, it's also possible to have a "url" field
   * specifying a URL to retrieve a source map from, but that's currently
   * unsupported.
   *
   * Here's an example source map, taken from the source map spec[0], but
   * modified to omit a section which uses the "url" field.
   *
   *  {
   *    version : 3,
   *    file: "app.js",
   *    sections: [{
   *      offset: {line:100, column:10},
   *      map: {
   *        version : 3,
   *        file: "section.js",
   *        sources: ["foo.js", "bar.js"],
   *        names: ["src", "maps", "are", "fun"],
   *        mappings: "AAAA,E;;ABCDE;"
   *      }
   *    }],
   *  }
   *
   * The second parameter, if given, is a string whose value is the URL
   * at which the source map was found.  This URL is used to compute the
   * sources array.
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
   */
  function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = util.parseSourceMapInput(aSourceMap);
    }

    var version = util.getArg(sourceMap, 'version');
    var sections = util.getArg(sourceMap, 'sections');

    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    this._sources = new ArraySet$2();
    this._names = new ArraySet$2();

    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map(function (s) {
      if (s.url) {
        // The url field will require support for asynchronicity.
        // See https://github.com/mozilla/source-map/issues/16
        throw new Error('Support for url field in sections not implemented.');
      }
      var offset = util.getArg(s, 'offset');
      var offsetLine = util.getArg(offset, 'line');
      var offsetColumn = util.getArg(offset, 'column');

      if (offsetLine < lastOffset.line ||
          (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
        throw new Error('Section offsets must be ordered and non-overlapping.');
      }
      lastOffset = offset;

      return {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
      }
    });
  }

  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

  /**
   * The version of the source mapping spec that we are consuming.
   */
  IndexedSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
    get: function () {
      var sources = [];
      for (var i = 0; i < this._sections.length; i++) {
        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      }
      return sources;
    }
  });

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.  The line number
   *     is 1-based.
   *   - column: The column number in the generated source.  The column
   *     number is 0-based.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the original source, or null.  The
   *     column number is 0-based.
   *   - name: The original identifier, or null.
   */
  IndexedSourceMapConsumer.prototype.originalPositionFor =
    function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      // Find the section containing the generated position we're trying to map
      // to an original position.
      var sectionIndex = binarySearch.search(needle, this._sections,
        function(needle, section) {
          var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }

          return (needle.generatedColumn -
                  section.generatedOffset.generatedColumn);
        });
      var section = this._sections[sectionIndex];

      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }

      return section.consumer.originalPositionFor({
        line: needle.generatedLine -
          (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn -
          (section.generatedOffset.generatedLine === needle.generatedLine
           ? section.generatedOffset.generatedColumn - 1
           : 0),
        bias: aArgs.bias
      });
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
    function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function (s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  IndexedSourceMapConsumer.prototype.sourceContentFor =
    function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number
   *     is 1-based.
   *   - column: The column number in the original source.  The column
   *     number is 0-based.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *     line number is 1-based. 
   *   - column: The column number in the generated source, or null.
   *     The column number is 0-based.
   */
  IndexedSourceMapConsumer.prototype.generatedPositionFor =
    function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        // Only consider this section if the requested source is in the list of
        // sources of the consumer.
        if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line +
              (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column +
              (section.generatedOffset.generatedLine === generatedPosition.line
               ? section.generatedOffset.generatedColumn - 1
               : 0)
          };
          return ret;
        }
      }

      return {
        line: null,
        column: null
      };
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  IndexedSourceMapConsumer.prototype._parseMappings =
    function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];

          var source = section.consumer._sources.at(mapping.source);
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          this._sources.add(source);
          source = this._sources.indexOf(source);

          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }

          // The mappings coming from the consumer for the section have
          // generated positions relative to the start of the section, so we
          // need to offset them to be relative to the start of the concatenated
          // generated file.
          var adjustedMapping = {
            source: source,
            generatedLine: mapping.generatedLine +
              (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn +
              (section.generatedOffset.generatedLine === mapping.generatedLine
              ? section.generatedOffset.generatedColumn - 1
              : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: name
          };

          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === 'number') {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }

      quickSort$1(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort$1(this.__originalMappings, util.compareByOriginalPositions);
    };

  var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

  var sourceMapConsumer = {
  	SourceMapConsumer: SourceMapConsumer_1,
  	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
  	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
  };

  /* -*- Mode: js; js-indent-level: 2; -*- */
  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var SourceMapGenerator$1 = sourceMapGenerator.SourceMapGenerator;


  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
  var REGEX_NEWLINE = /(\r?\n)/;

  // Newline character code for charCodeAt() comparisons
  var NEWLINE_CODE = 10;

  // Private symbol for identifying `SourceNode`s when multiple versions of
  // the source-map library are loaded. This MUST NOT CHANGE across
  // versions!
  var isSourceNode = "$$$isSourceNode$$$";

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // All even indices of this array are one line of the generated code,
      // while all odd indices are the newlines between two adjacent lines
      // (since `REGEX_NEWLINE` captures its match).
      // Processed fragments are accessed by calling `shiftNextLine`.
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        // The last line of a file might not have a newline.
        var newLine = getNextLine() || "";
        return lineContents + newLine;

        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ?
              remainingLines[remainingLinesIndex++] : undefined;
        }
      };

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[remainingLinesIndex] || '';
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            // No more remaining code, continue
            lastMapping = mapping;
            return;
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || '';
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          var source = aRelativePath
            ? util.join(aRelativePath, mapping.source)
            : mapping.source;
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator$1(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length; idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  var SourceNode_1 = SourceNode;

  var sourceNode = {
  	SourceNode: SourceNode_1
  };

  /*
   * Copyright 2009-2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE.txt or:
   * http://opensource.org/licenses/BSD-3-Clause
   */
  var SourceMapGenerator$2 = sourceMapGenerator.SourceMapGenerator;
  var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;
  var SourceNode$1 = sourceNode.SourceNode;

  var sourceMap = {
  	SourceMapGenerator: SourceMapGenerator$2,
  	SourceMapConsumer: SourceMapConsumer$1,
  	SourceNode: SourceNode$1
  };

  var codeGen = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var SourceNode = undefined;

  try {
    /* istanbul ignore next */
    {
      // We don't support this in AMD environments. For these environments, we asusme that
      // they are running on the browser and thus have no need for the source-map library.
      var SourceMap = sourceMap;
      SourceNode = SourceMap.SourceNode;
    }
  } catch (err) {}
  /* NOP */

  /* istanbul ignore if: tested but not covered in istanbul due to dist build  */
  if (!SourceNode) {
    SourceNode = function (line, column, srcFile, chunks) {
      this.src = '';
      if (chunks) {
        this.add(chunks);
      }
    };
    /* istanbul ignore next */
    SourceNode.prototype = {
      add: function add(chunks) {
        if (utils.isArray(chunks)) {
          chunks = chunks.join('');
        }
        this.src += chunks;
      },
      prepend: function prepend(chunks) {
        if (utils.isArray(chunks)) {
          chunks = chunks.join('');
        }
        this.src = chunks + this.src;
      },
      toStringWithSourceMap: function toStringWithSourceMap() {
        return { code: this.toString() };
      },
      toString: function toString() {
        return this.src;
      }
    };
  }

  function castChunk(chunk, codeGen, loc) {
    if (utils.isArray(chunk)) {
      var ret = [];

      for (var i = 0, len = chunk.length; i < len; i++) {
        ret.push(codeGen.wrap(chunk[i], loc));
      }
      return ret;
    } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
      // Handle primitives that the SourceNode will throw up on
      return chunk + '';
    }
    return chunk;
  }

  function CodeGen(srcFile) {
    this.srcFile = srcFile;
    this.source = [];
  }

  CodeGen.prototype = {
    isEmpty: function isEmpty() {
      return !this.source.length;
    },
    prepend: function prepend(source, loc) {
      this.source.unshift(this.wrap(source, loc));
    },
    push: function push(source, loc) {
      this.source.push(this.wrap(source, loc));
    },

    merge: function merge() {
      var source = this.empty();
      this.each(function (line) {
        source.add(['  ', line, '\n']);
      });
      return source;
    },

    each: function each(iter) {
      for (var i = 0, len = this.source.length; i < len; i++) {
        iter(this.source[i]);
      }
    },

    empty: function empty() {
      var loc = this.currentLocation || { start: {} };
      return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
    },
    wrap: function wrap(chunk) {
      var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

      if (chunk instanceof SourceNode) {
        return chunk;
      }

      chunk = castChunk(chunk, this, loc);

      return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
    },

    functionCall: function functionCall(fn, type, params) {
      params = this.generateList(params);
      return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
    },

    quotedString: function quotedString(str) {
      return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
      .replace(/\u2029/g, '\\u2029') + '"';
    },

    objectLiteral: function objectLiteral(obj) {
      var pairs = [];

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var value = castChunk(obj[key], this);
          if (value !== 'undefined') {
            pairs.push([this.quotedString(key), ':', value]);
          }
        }
      }

      var ret = this.generateList(pairs);
      ret.prepend('{');
      ret.add('}');
      return ret;
    },

    generateList: function generateList(entries) {
      var ret = this.empty();

      for (var i = 0, len = entries.length; i < len; i++) {
        if (i) {
          ret.add(',');
        }

        ret.add(castChunk(entries[i], this));
      }

      return ret;
    },

    generateArray: function generateArray(entries) {
      var ret = this.generateList(entries);
      ret.prepend('[');
      ret.add(']');

      return ret;
    }
  };

  exports['default'] = CodeGen;
  module.exports = exports['default'];

  });

  unwrapExports(codeGen);

  var javascriptCompiler = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





  var _exception2 = _interopRequireDefault(exception);





  var _codeGen2 = _interopRequireDefault(codeGen);

  function Literal(value) {
    this.value = value;
  }

  function JavaScriptCompiler() {}

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function nameLookup(parent, name /* , type*/) {
      if (name === 'constructor') {
        return ['(', parent, '.propertyIsEnumerable(\'constructor\') ? ', parent, '.constructor : undefined', ')'];
      }
      if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        return [parent, '.', name];
      } else {
        return [parent, '[', JSON.stringify(name), ']'];
      }
    },
    depthedLookup: function depthedLookup(name) {
      return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
    },

    compilerInfo: function compilerInfo() {
      var revision = base.COMPILER_REVISION,
          versions = base.REVISION_CHANGES[revision];
      return [revision, versions];
    },

    appendToBuffer: function appendToBuffer(source, location, explicit) {
      // Force a source as this simplifies the merge logic.
      if (!utils.isArray(source)) {
        source = [source];
      }
      source = this.source.wrap(source, location);

      if (this.environment.isSimple) {
        return ['return ', source, ';'];
      } else if (explicit) {
        // This is a case where the buffer operation occurs as a child of another
        // construct, generally braces. We have to explicitly output these buffer
        // operations to ensure that the emitted code goes in the correct location.
        return ['buffer += ', source, ';'];
      } else {
        source.appendToBuffer = true;
        return source;
      }
    },

    initializeBuffer: function initializeBuffer() {
      return this.quotedString('');
    },
    // END PUBLIC API

    compile: function compile(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options;
      this.stringParams = this.options.stringParams;
      this.trackIds = this.options.trackIds;
      this.precompile = !asObject;

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        decorators: [],
        programs: [],
        environments: []
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.aliases = {};
      this.registers = { list: [] };
      this.hashes = [];
      this.compileStack = [];
      this.inlineStack = [];
      this.blockParams = [];

      this.compileChildren(environment, options);

      this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
      this.useBlockParams = this.useBlockParams || environment.useBlockParams;

      var opcodes = environment.opcodes,
          opcode = undefined,
          firstLoc = undefined,
          i = undefined,
          l = undefined;

      for (i = 0, l = opcodes.length; i < l; i++) {
        opcode = opcodes[i];

        this.source.currentLocation = opcode.loc;
        firstLoc = firstLoc || opcode.loc;
        this[opcode.opcode].apply(this, opcode.args);
      }

      // Flush any trailing content that might be pending.
      this.source.currentLocation = firstLoc;
      this.pushSource('');

      /* istanbul ignore next */
      if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
        throw new _exception2['default']('Compile completed with content left on stack');
      }

      if (!this.decorators.isEmpty()) {
        this.useDecorators = true;

        this.decorators.prepend('var decorators = container.decorators;\n');
        this.decorators.push('return fn;');

        if (asObject) {
          this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
        } else {
          this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
          this.decorators.push('}\n');
          this.decorators = this.decorators.merge();
        }
      } else {
        this.decorators = undefined;
      }

      var fn = this.createFunctionContext(asObject);
      if (!this.isChild) {
        var ret = {
          compiler: this.compilerInfo(),
          main: fn
        };

        if (this.decorators) {
          ret.main_d = this.decorators; // eslint-disable-line camelcase
          ret.useDecorators = true;
        }

        var _context = this.context;
        var programs = _context.programs;
        var decorators = _context.decorators;

        for (i = 0, l = programs.length; i < l; i++) {
          if (programs[i]) {
            ret[i] = programs[i];
            if (decorators[i]) {
              ret[i + '_d'] = decorators[i];
              ret.useDecorators = true;
            }
          }
        }

        if (this.environment.usePartial) {
          ret.usePartial = true;
        }
        if (this.options.data) {
          ret.useData = true;
        }
        if (this.useDepths) {
          ret.useDepths = true;
        }
        if (this.useBlockParams) {
          ret.useBlockParams = true;
        }
        if (this.options.compat) {
          ret.compat = true;
        }

        if (!asObject) {
          ret.compiler = JSON.stringify(ret.compiler);

          this.source.currentLocation = { start: { line: 1, column: 0 } };
          ret = this.objectLiteral(ret);

          if (options.srcName) {
            ret = ret.toStringWithSourceMap({ file: options.destName });
            ret.map = ret.map && ret.map.toString();
          } else {
            ret = ret.toString();
          }
        } else {
          ret.compilerOptions = this.options;
        }

        return ret;
      } else {
        return fn;
      }
    },

    preamble: function preamble() {
      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = new _codeGen2['default'](this.options.srcName);
      this.decorators = new _codeGen2['default'](this.options.srcName);
    },

    createFunctionContext: function createFunctionContext(asObject) {
      var varDeclarations = '';

      var locals = this.stackVars.concat(this.registers.list);
      if (locals.length > 0) {
        varDeclarations += ', ' + locals.join(', ');
      }

      // Generate minimizer alias mappings
      //
      // When using true SourceNodes, this will update all references to the given alias
      // as the source nodes are reused in situ. For the non-source node compilation mode,
      // aliases will not be used, but this case is already being run on the client and
      // we aren't concern about minimizing the template size.
      var aliasCount = 0;
      for (var alias in this.aliases) {
        // eslint-disable-line guard-for-in
        var node = this.aliases[alias];

        if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
          varDeclarations += ', alias' + ++aliasCount + '=' + alias;
          node.children[0] = 'alias' + aliasCount;
        }
      }

      var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

      if (this.useBlockParams || this.useDepths) {
        params.push('blockParams');
      }
      if (this.useDepths) {
        params.push('depths');
      }

      // Perform a second pass over the output to merge content when possible
      var source = this.mergeSource(varDeclarations);

      if (asObject) {
        params.push(source);

        return Function.apply(this, params);
      } else {
        return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
      }
    },
    mergeSource: function mergeSource(varDeclarations) {
      var isSimple = this.environment.isSimple,
          appendOnly = !this.forceBuffer,
          appendFirst = undefined,
          sourceSeen = undefined,
          bufferStart = undefined,
          bufferEnd = undefined;
      this.source.each(function (line) {
        if (line.appendToBuffer) {
          if (bufferStart) {
            line.prepend('  + ');
          } else {
            bufferStart = line;
          }
          bufferEnd = line;
        } else {
          if (bufferStart) {
            if (!sourceSeen) {
              appendFirst = true;
            } else {
              bufferStart.prepend('buffer += ');
            }
            bufferEnd.add(';');
            bufferStart = bufferEnd = undefined;
          }

          sourceSeen = true;
          if (!isSimple) {
            appendOnly = false;
          }
        }
      });

      if (appendOnly) {
        if (bufferStart) {
          bufferStart.prepend('return ');
          bufferEnd.add(';');
        } else if (!sourceSeen) {
          this.source.push('return "";');
        }
      } else {
        varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

        if (bufferStart) {
          bufferStart.prepend('return buffer + ');
          bufferEnd.add(';');
        } else {
          this.source.push('return buffer;');
        }
      }

      if (varDeclarations) {
        this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
      }

      return this.source.merge();
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function blockValue(name) {
      var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
          params = [this.contextName(0)];
      this.setupHelperArgs(name, 0, params);

      var blockName = this.popStack();
      params.splice(1, 0, blockName);

      this.push(this.source.functionCall(blockHelperMissing, 'call', params));
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function ambiguousBlockValue() {
      // We're being a bit cheeky and reusing the options value from the prior exec
      var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
          params = [this.contextName(0)];
      this.setupHelperArgs('', 0, params, true);

      this.flushInline();

      var current = this.topStack();
      params.splice(1, 0, current);

      this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function appendContent(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      } else {
        this.pendingLocation = this.source.currentLocation;
      }

      this.pendingContent = content;
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function append() {
      if (this.isInline()) {
        this.replaceStack(function (current) {
          return [' != null ? ', current, ' : ""'];
        });

        this.pushSource(this.appendToBuffer(this.popStack()));
      } else {
        var local = this.popStack();
        this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
        if (this.environment.isSimple) {
          this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
        }
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function appendEscaped() {
      this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function getContext(depth) {
      this.lastContext = depth;
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function pushContext() {
      this.pushStackLiteral(this.contextName(this.lastContext));
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
      var i = 0;

      if (!scoped && this.options.compat && !this.lastContext) {
        // The depthed query is expected to handle the undefined logic for the root level that
        // is implemented below, so we evaluate that directly in compat mode
        this.push(this.depthedLookup(parts[i++]));
      } else {
        this.pushContext();
      }

      this.resolvePath('context', parts, i, falsy, strict);
    },

    // [lookupBlockParam]
    //
    // On stack, before: ...
    // On stack, after: blockParam[name], ...
    //
    // Looks up the value of `parts` on the given block param and pushes
    // it onto the stack.
    lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
      this.useBlockParams = true;

      this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
      this.resolvePath('context', parts, 1);
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function lookupData(depth, parts, strict) {
      if (!depth) {
        this.pushStackLiteral('data');
      } else {
        this.pushStackLiteral('container.data(data, ' + depth + ')');
      }

      this.resolvePath('data', parts, 0, true, strict);
    },

    resolvePath: function resolvePath(type, parts, i, falsy, strict) {
      // istanbul ignore next

      var _this = this;

      if (this.options.strict || this.options.assumeObjects) {
        this.push(strictLookup(this.options.strict && strict, this, parts, type));
        return;
      }

      var len = parts.length;
      for (; i < len; i++) {
        /* eslint-disable no-loop-func */
        this.replaceStack(function (current) {
          var lookup = _this.nameLookup(current, parts[i], type);
          // We want to ensure that zero and false are handled properly if the context (falsy flag)
          // needs to have the special handling for these values.
          if (!falsy) {
            return [' != null ? ', lookup, ' : ', current];
          } else {
            // Otherwise we can use generic falsy handling
            return [' && ', lookup];
          }
        });
        /* eslint-enable no-loop-func */
      }
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function resolvePossibleLambda() {
      this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function pushStringParam(string, type) {
      this.pushContext();
      this.pushString(type);

      // If it's a subexpression, the string result
      // will be pushed after this opcode.
      if (type !== 'SubExpression') {
        if (typeof string === 'string') {
          this.pushString(string);
        } else {
          this.pushStackLiteral(string);
        }
      }
    },

    emptyHash: function emptyHash(omitEmpty) {
      if (this.trackIds) {
        this.push('{}'); // hashIds
      }
      if (this.stringParams) {
        this.push('{}'); // hashContexts
        this.push('{}'); // hashTypes
      }
      this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
    },
    pushHash: function pushHash() {
      if (this.hash) {
        this.hashes.push(this.hash);
      }
      this.hash = { values: [], types: [], contexts: [], ids: [] };
    },
    popHash: function popHash() {
      var hash = this.hash;
      this.hash = this.hashes.pop();

      if (this.trackIds) {
        this.push(this.objectLiteral(hash.ids));
      }
      if (this.stringParams) {
        this.push(this.objectLiteral(hash.contexts));
        this.push(this.objectLiteral(hash.types));
      }

      this.push(this.objectLiteral(hash.values));
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function pushString(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function pushLiteral(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function pushProgram(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [registerDecorator]
    //
    // On stack, before: hash, program, params..., ...
    // On stack, after: ...
    //
    // Pops off the decorator's parameters, invokes the decorator,
    // and inserts the decorator into the decorators list.
    registerDecorator: function registerDecorator(paramSize, name) {
      var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
          options = this.setupHelperArgs(name, paramSize);

      this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function invokeHelper(paramSize, name, isSimple) {
      var nonHelper = this.popStack(),
          helper = this.setupHelper(paramSize, name),
          simple = isSimple ? [helper.name, ' || '] : '';

      var lookup = ['('].concat(simple, nonHelper);
      if (!this.options.strict) {
        lookup.push(' || ', this.aliasable('helpers.helperMissing'));
      }
      lookup.push(')');

      this.push(this.source.functionCall(lookup, 'call', helper.callParams));
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
      this.useRegister('helper');

      var nonHelper = this.popStack();

      this.emptyHash();
      var helper = this.setupHelper(0, name, helperCall);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

      var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
      if (!this.options.strict) {
        lookup[0] = '(helper = ';
        lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
      }

      this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function invokePartial(isDynamic, name, indent) {
      var params = [],
          options = this.setupParams(name, 1, params);

      if (isDynamic) {
        name = this.popStack();
        delete options.name;
      }

      if (indent) {
        options.indent = JSON.stringify(indent);
      }
      options.helpers = 'helpers';
      options.partials = 'partials';
      options.decorators = 'container.decorators';

      if (!isDynamic) {
        params.unshift(this.nameLookup('partials', name, 'partial'));
      } else {
        params.unshift(name);
      }

      if (this.options.compat) {
        options.depths = 'depths';
      }
      options = this.objectLiteral(options);
      params.push(options);

      this.push(this.source.functionCall('container.invokePartial', '', params));
    },

    // [assignToHash]
    //
    // On stack, before: value, ..., hash, ...
    // On stack, after: ..., hash, ...
    //
    // Pops a value off the stack and assigns it to the current hash
    assignToHash: function assignToHash(key) {
      var value = this.popStack(),
          context = undefined,
          type = undefined,
          id = undefined;

      if (this.trackIds) {
        id = this.popStack();
      }
      if (this.stringParams) {
        type = this.popStack();
        context = this.popStack();
      }

      var hash = this.hash;
      if (context) {
        hash.contexts[key] = context;
      }
      if (type) {
        hash.types[key] = type;
      }
      if (id) {
        hash.ids[key] = id;
      }
      hash.values[key] = value;
    },

    pushId: function pushId(type, name, child) {
      if (type === 'BlockParam') {
        this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
      } else if (type === 'PathExpression') {
        this.pushString(name);
      } else if (type === 'SubExpression') {
        this.pushStackLiteral('true');
      } else {
        this.pushStackLiteral('null');
      }
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function compileChildren(environment, options) {
      var children = environment.children,
          child = undefined,
          compiler = undefined;

      for (var i = 0, l = children.length; i < l; i++) {
        child = children[i];
        compiler = new this.compiler(); // eslint-disable-line new-cap

        var existing = this.matchExistingProgram(child);

        if (existing == null) {
          this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
          var index = this.context.programs.length;
          child.index = index;
          child.name = 'program' + index;
          this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
          this.context.decorators[index] = compiler.decorators;
          this.context.environments[index] = child;

          this.useDepths = this.useDepths || compiler.useDepths;
          this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
          child.useDepths = this.useDepths;
          child.useBlockParams = this.useBlockParams;
        } else {
          child.index = existing.index;
          child.name = 'program' + existing.index;

          this.useDepths = this.useDepths || existing.useDepths;
          this.useBlockParams = this.useBlockParams || existing.useBlockParams;
        }
      }
    },
    matchExistingProgram: function matchExistingProgram(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return environment;
        }
      }
    },

    programExpression: function programExpression(guid) {
      var child = this.environment.children[guid],
          programParams = [child.index, 'data', child.blockParams];

      if (this.useBlockParams || this.useDepths) {
        programParams.push('blockParams');
      }
      if (this.useDepths) {
        programParams.push('depths');
      }

      return 'container.program(' + programParams.join(', ') + ')';
    },

    useRegister: function useRegister(name) {
      if (!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    push: function push(expr) {
      if (!(expr instanceof Literal)) {
        expr = this.source.wrap(expr);
      }

      this.inlineStack.push(expr);
      return expr;
    },

    pushStackLiteral: function pushStackLiteral(item) {
      this.push(new Literal(item));
    },

    pushSource: function pushSource(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
        this.pendingContent = undefined;
      }

      if (source) {
        this.source.push(source);
      }
    },

    replaceStack: function replaceStack(callback) {
      var prefix = ['('],
          stack = undefined,
          createdStack = undefined,
          usedLiteral = undefined;

      /* istanbul ignore next */
      if (!this.isInline()) {
        throw new _exception2['default']('replaceStack on non-inline');
      }

      // We want to merge the inline statement into the replacement statement via ','
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        stack = [top.value];
        prefix = ['(', stack];
        usedLiteral = true;
      } else {
        // Get or create the current stack name for use by the inline
        createdStack = true;
        var _name = this.incrStack();

        prefix = ['((', this.push(_name), ' = ', top, ')'];
        stack = this.topStack();
      }

      var item = callback.call(this, stack);

      if (!usedLiteral) {
        this.popStack();
      }
      if (createdStack) {
        this.stackSlot--;
      }
      this.push(prefix.concat(item, ')'));
    },

    incrStack: function incrStack() {
      this.stackSlot++;
      if (this.stackSlot > this.stackVars.length) {
        this.stackVars.push('stack' + this.stackSlot);
      }
      return this.topStackName();
    },
    topStackName: function topStackName() {
      return 'stack' + this.stackSlot;
    },
    flushInline: function flushInline() {
      var inlineStack = this.inlineStack;
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        /* istanbul ignore if */
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          var stack = this.incrStack();
          this.pushSource([stack, ' = ', entry, ';']);
          this.compileStack.push(stack);
        }
      }
    },
    isInline: function isInline() {
      return this.inlineStack.length;
    },

    popStack: function popStack(wrapped) {
      var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();

      if (!wrapped && item instanceof Literal) {
        return item.value;
      } else {
        if (!inline) {
          /* istanbul ignore next */
          if (!this.stackSlot) {
            throw new _exception2['default']('Invalid stack pop');
          }
          this.stackSlot--;
        }
        return item;
      }
    },

    topStack: function topStack() {
      var stack = this.isInline() ? this.inlineStack : this.compileStack,
          item = stack[stack.length - 1];

      /* istanbul ignore if */
      if (item instanceof Literal) {
        return item.value;
      } else {
        return item;
      }
    },

    contextName: function contextName(context) {
      if (this.useDepths && context) {
        return 'depths[' + context + ']';
      } else {
        return 'depth' + context;
      }
    },

    quotedString: function quotedString(str) {
      return this.source.quotedString(str);
    },

    objectLiteral: function objectLiteral(obj) {
      return this.source.objectLiteral(obj);
    },

    aliasable: function aliasable(name) {
      var ret = this.aliases[name];
      if (ret) {
        ret.referenceCount++;
        return ret;
      }

      ret = this.aliases[name] = this.source.wrap(name);
      ret.aliasable = true;
      ret.referenceCount = 1;

      return ret;
    },

    setupHelper: function setupHelper(paramSize, name, blockHelper) {
      var params = [],
          paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
      var foundHelper = this.nameLookup('helpers', name, 'helper'),
          callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');

      return {
        params: params,
        paramsInit: paramsInit,
        name: foundHelper,
        callParams: [callContext].concat(params)
      };
    },

    setupParams: function setupParams(helper, paramSize, params) {
      var options = {},
          contexts = [],
          types = [],
          ids = [],
          objectArgs = !params,
          param = undefined;

      if (objectArgs) {
        params = [];
      }

      options.name = this.quotedString(helper);
      options.hash = this.popStack();

      if (this.trackIds) {
        options.hashIds = this.popStack();
      }
      if (this.stringParams) {
        options.hashTypes = this.popStack();
        options.hashContexts = this.popStack();
      }

      var inverse = this.popStack(),
          program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        options.fn = program || 'container.noop';
        options.inverse = inverse || 'container.noop';
      }

      // The parameters go on to the stack in order (making sure that they are evaluated in order)
      // so we need to pop them off the stack in reverse order
      var i = paramSize;
      while (i--) {
        param = this.popStack();
        params[i] = param;

        if (this.trackIds) {
          ids[i] = this.popStack();
        }
        if (this.stringParams) {
          types[i] = this.popStack();
          contexts[i] = this.popStack();
        }
      }

      if (objectArgs) {
        options.args = this.source.generateArray(params);
      }

      if (this.trackIds) {
        options.ids = this.source.generateArray(ids);
      }
      if (this.stringParams) {
        options.types = this.source.generateArray(types);
        options.contexts = this.source.generateArray(contexts);
      }

      if (this.options.data) {
        options.data = 'data';
      }
      if (this.useBlockParams) {
        options.blockParams = 'blockParams';
      }
      return options;
    },

    setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
      var options = this.setupParams(helper, paramSize, params);
      options = this.objectLiteral(options);
      if (useRegister) {
        this.useRegister('options');
        params.push('options');
        return ['options=', options];
      } else if (params) {
        params.push(options);
        return '';
      } else {
        return options;
      }
    }
  };

  (function () {
    var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

    var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

    for (var i = 0, l = reservedWords.length; i < l; i++) {
      compilerWords[reservedWords[i]] = true;
    }
  })();

  JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
    return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
  };

  function strictLookup(requireTerminal, compiler, parts, type) {
    var stack = compiler.popStack(),
        i = 0,
        len = parts.length;
    if (requireTerminal) {
      len--;
    }

    for (; i < len; i++) {
      stack = compiler.nameLookup(stack, parts[i], type);
    }

    if (requireTerminal) {
      return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
    } else {
      return stack;
    }
  }

  exports['default'] = JavaScriptCompiler;
  module.exports = exports['default'];

  });

  unwrapExports(javascriptCompiler);

  var handlebars = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _handlebarsRuntime2 = _interopRequireDefault(handlebars_runtime);

  // Compiler imports



  var _handlebarsCompilerAst2 = _interopRequireDefault(ast);







  var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(javascriptCompiler);



  var _handlebarsCompilerVisitor2 = _interopRequireDefault(visitor);



  var _handlebarsNoConflict2 = _interopRequireDefault(noConflict);

  var _create = _handlebarsRuntime2['default'].create;
  function create() {
    var hb = _create();

    hb.compile = function (input, options) {
      return compiler.compile(input, options, hb);
    };
    hb.precompile = function (input, options) {
      return compiler.precompile(input, options, hb);
    };

    hb.AST = _handlebarsCompilerAst2['default'];
    hb.Compiler = compiler.Compiler;
    hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
    hb.Parser = base$2.parser;
    hb.parse = base$2.parse;

    return hb;
  }

  var inst = create();
  inst.create = create;

  _handlebarsNoConflict2['default'](inst);

  inst.Visitor = _handlebarsCompilerVisitor2['default'];

  inst['default'] = inst;

  exports['default'] = inst;
  module.exports = exports['default'];

  });

  unwrapExports(handlebars);

  var printer = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.print = print;
  exports.PrintVisitor = PrintVisitor;
  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



  var _visitor2 = _interopRequireDefault(visitor);

  function print(ast) {
    return new PrintVisitor().accept(ast);
  }

  function PrintVisitor() {
    this.padding = 0;
  }

  PrintVisitor.prototype = new _visitor2['default']();

  PrintVisitor.prototype.pad = function (string) {
    var out = '';

    for (var i = 0, l = this.padding; i < l; i++) {
      out += '  ';
    }

    out += string + '\n';
    return out;
  };

  PrintVisitor.prototype.Program = function (program) {
    var out = '',
        body = program.body,
        i = undefined,
        l = undefined;

    if (program.blockParams) {
      var blockParams = 'BLOCK PARAMS: [';
      for (i = 0, l = program.blockParams.length; i < l; i++) {
        blockParams += ' ' + program.blockParams[i];
      }
      blockParams += ' ]';
      out += this.pad(blockParams);
    }

    for (i = 0, l = body.length; i < l; i++) {
      out += this.accept(body[i]);
    }

    this.padding--;

    return out;
  };

  PrintVisitor.prototype.MustacheStatement = function (mustache) {
    return this.pad('{{ ' + this.SubExpression(mustache) + ' }}');
  };
  PrintVisitor.prototype.Decorator = function (mustache) {
    return this.pad('{{ DIRECTIVE ' + this.SubExpression(mustache) + ' }}');
  };

  PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function (block) {
    var out = '';

    out += this.pad((block.type === 'DecoratorBlock' ? 'DIRECTIVE ' : '') + 'BLOCK:');
    this.padding++;
    out += this.pad(this.SubExpression(block));
    if (block.program) {
      out += this.pad('PROGRAM:');
      this.padding++;
      out += this.accept(block.program);
      this.padding--;
    }
    if (block.inverse) {
      if (block.program) {
        this.padding++;
      }
      out += this.pad('{{^}}');
      this.padding++;
      out += this.accept(block.inverse);
      this.padding--;
      if (block.program) {
        this.padding--;
      }
    }
    this.padding--;

    return out;
  };

  PrintVisitor.prototype.PartialStatement = function (partial) {
    var content = 'PARTIAL:' + partial.name.original;
    if (partial.params[0]) {
      content += ' ' + this.accept(partial.params[0]);
    }
    if (partial.hash) {
      content += ' ' + this.accept(partial.hash);
    }
    return this.pad('{{> ' + content + ' }}');
  };
  PrintVisitor.prototype.PartialBlockStatement = function (partial) {
    var content = 'PARTIAL BLOCK:' + partial.name.original;
    if (partial.params[0]) {
      content += ' ' + this.accept(partial.params[0]);
    }
    if (partial.hash) {
      content += ' ' + this.accept(partial.hash);
    }

    content += ' ' + this.pad('PROGRAM:');
    this.padding++;
    content += this.accept(partial.program);
    this.padding--;

    return this.pad('{{> ' + content + ' }}');
  };

  PrintVisitor.prototype.ContentStatement = function (content) {
    return this.pad("CONTENT[ '" + content.value + "' ]");
  };

  PrintVisitor.prototype.CommentStatement = function (comment) {
    return this.pad("{{! '" + comment.value + "' }}");
  };

  PrintVisitor.prototype.SubExpression = function (sexpr) {
    var params = sexpr.params,
        paramStrings = [],
        hash = undefined;

    for (var i = 0, l = params.length; i < l; i++) {
      paramStrings.push(this.accept(params[i]));
    }

    params = '[' + paramStrings.join(', ') + ']';

    hash = sexpr.hash ? ' ' + this.accept(sexpr.hash) : '';

    return this.accept(sexpr.path) + ' ' + params + hash;
  };

  PrintVisitor.prototype.PathExpression = function (id) {
    var path = id.parts.join('/');
    return (id.data ? '@' : '') + 'PATH:' + path;
  };

  PrintVisitor.prototype.StringLiteral = function (string) {
    return '"' + string.value + '"';
  };

  PrintVisitor.prototype.NumberLiteral = function (number) {
    return 'NUMBER{' + number.value + '}';
  };

  PrintVisitor.prototype.BooleanLiteral = function (bool) {
    return 'BOOLEAN{' + bool.value + '}';
  };

  PrintVisitor.prototype.UndefinedLiteral = function () {
    return 'UNDEFINED';
  };

  PrintVisitor.prototype.NullLiteral = function () {
    return 'NULL';
  };

  PrintVisitor.prototype.Hash = function (hash) {
    var pairs = hash.pairs,
        joinedPairs = [];

    for (var i = 0, l = pairs.length; i < l; i++) {
      joinedPairs.push(this.accept(pairs[i]));
    }

    return 'HASH{' + joinedPairs.join(', ') + '}';
  };
  PrintVisitor.prototype.HashPair = function (pair) {
    return pair.key + '=' + this.accept(pair.value);
  };
  /* eslint-enable new-cap */

  });

  unwrapExports(printer);
  var printer_1 = printer.print;
  var printer_2 = printer.PrintVisitor;

  var require$$1 = {};

  // USAGE:
  // var handlebars = require('handlebars');
  /* eslint-disable no-var */

  // var local = handlebars.create();

  var handlebars$2 = handlebars['default'];


  handlebars$2.PrintVisitor = printer.PrintVisitor;
  handlebars$2.print = printer.print;

  var lib = handlebars$2;

  // Publish a Node.js require() handler for .handlebars and .hbs files
  function extension(module, filename) {
    var fs = require$$1;
    var templateString = fs.readFileSync(filename, 'utf8');
    module.exports = handlebars$2.compile(templateString);
  }
  /* istanbul ignore else */
  if (typeof commonjsRequire !== 'undefined' && commonjsRequire.extensions) {
    commonjsRequire.extensions['.handlebars'] = extension;
    commonjsRequire.extensions['.hbs'] = extension;
  }

  const TEMPLATE_ID = 'thepress-template';

  // to allow string comparison
  lib.registerHelper('sameString', function(arg1, arg2, options) {
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
      this._articleCollection = null;
      this._pageCollection = null;
      this._template = lib.compile(document.getElementById(TEMPLATE_ID).innerHTML);
    }

    setArticleCollection (ac) {
      this._articleCollection = ac;
    }

    setPageCollection (pc) {
      this._pageCollection = pc;
    }

    /**
     * Remove all the non-<script> elements from document.body
     */
    flushNonScript() {
      let bodyChildren = document.body.children;
      for (let i=0; i<bodyChildren.length; i++){
        let el = bodyChildren[i];
        if (el.tagName !== 'SCRIPT') {
          document.body.removeChild(el);
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
      let that = this;
      this._articleCollection.getArticle(id, function(article){
        let articleData = {
          metadata: article.getMetadata(),
          body: article.getHtmlContent()
        };
        that._buildGenericPage(articleData, 'article');
      });
    }


    buildPage(id) {
      let that = this;
      this._pageCollection.getPage(id, function(page){
        let pageData = {
          metadata: page.getMetadata(),
          body: page.getHtmlContent()
        };
        that._buildGenericPage(pageData, 'page');
      });
    }


    buildArticleListChronological(pageIndex) {
      let that = this;
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
          };
          that._buildGenericPage(listData, 'list');
        }
      );
    }


    _buildGenericPage(contentData, type) {
      let allData = {
        site: getMainConfig().site,
        content: contentData,
        menu: this._pageCollection.getMenuMetadata(),
      };

      allData[type] = true;

      console.log(allData);

      let htmlCorpus = this._template(allData);
      this.flushBody();
      // this.flushNonScript()
      document.body.innerHTML += htmlCorpus;
    }


  }

  class ThePress extends EventManager{

    constructor () {
      super();
      let that = this;
      this._articleCollection = null;
      this._pageCollection = null;
      this._builder = new Builder();

      fetchJson([getAbsoluteURL('config.json')], function(url, data){
        if (!data[0])
          throw 'The config file is not available'

        setMainConfig(data[0]);
        that._init();
      });


    }


    _init () {
      let that = this;
      this._routeManager = new RouteManager();
      this._defineRoutingEvent();

      this._articleCollection = new ArticleCollection();
      console.log(this._articleCollection);
      // the first page of articles should be loaded
      this._articleCollection.on('ready', function(articles) {
        that._checkIsReady();
      });

      this._pageCollection = new PageCollection();
      console.log(this._pageCollection);
      this._pageCollection.on('ready', function(pages) {
        that._checkIsReady();
      });

      this._builder.setArticleCollection(this._articleCollection);
      this._builder.setPageCollection(this._pageCollection);
    }


    _defineRoutingEvent () {
      let that = this;

      this._routeManager.on('home', function(){
        console.log('GOTO: home');
        that._builder.buildArticleListChronological(0);
      });

      this._routeManager.on('articleListing', function(pageIndex){
        console.log('GOTO articleListing: ' + pageIndex);
        that._builder.buildArticleListChronological(pageIndex);
      });

      this._routeManager.on('specificArticle', function(articleId){
        console.log('GOTO article: ' + articleId);
        that._builder.buildArticle(articleId);
      });

      this._routeManager.on('specificPage', function(pageId){
        console.log('GOTO page: ' + pageId);
        try {
          that._builder.buildPage(pageId);
        } catch(e){
          console.error(`The page ${pageId} does not exist, redirecting to home.`);
          that._routeManager.goTo('about');
        }
      });
    }


    _checkIsReady () {
      let isReady = this._pageCollection.isReady() && this._articleCollection.isReady();

      if (!isReady)
        return

      this._routeManager.init();
    }

  }

  new ThePress();
  //export default ({ThePress})

})));
//# sourceMappingURL=thepress.js.map
