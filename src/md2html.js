import MarkdownIt from 'markdown-it/dist/markdown-it.js'

const mdit = new MarkdownIt()

function md2html (md) {
  return mdit.render(md)
}

export default md2html
