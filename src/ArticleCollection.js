import { getMainConfig } from './Config'
import { fetchJson } from './Tools'

class ArticleCollection {
  constructor() {
    this._mainConfig = getMainConfig()

    let pathToArticleList = this._mainConfig.content.articleDir + 'list.json'

    fetchJson(pathToArticleList, function(url, data){
      if (!data)
        throw 'The list of articles is not available'

      console.log(data)
      
    })


  }
}

export default ArticleCollection
