import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it/dist/markdown-it.js'
import MditFootnote from 'markdown-it-footnote'
import MditSub from 'markdown-it-sub'
import MditSup from 'markdown-it-sup'

const mdit = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
})

// plugin
mdit.use(MditFootnote)
mdit.use(MditSub)
mdit.use(MditSup)


// TODO: add syntax highlighter

function md2html (md) {
  return mdit.render(md)
}

export default md2html
