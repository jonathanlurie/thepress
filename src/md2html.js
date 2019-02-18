import MarkdownIt from 'markdown-it/dist/markdown-it.js'

const mdit = new MarkdownIt({
  html: true,
  linkify: true
})

// TODO: add syntax highlighter

function md2html (md) {
  return mdit.render(md)
}

export default md2html
