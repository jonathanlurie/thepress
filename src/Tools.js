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
    urls = [urls]
  }

  // separate function to make code more clear
  const grabContent = url => fetch(url)
    .then(res => res.json())
    .catch(function(error) {
      return null
    })

  Promise
  .all(urls.map(grabContent))
  .then(function(res){
    if (urls.length === 1) {
      cb(urls[0], res[0])
    } else {
      cb(urls, res)
    }
  })
}



function fetchText(urls, cb) {

  if (typeof cb !== 'function') {
    throw 'The callback provided must be a function'
  }

  // if a single url is provided, we make it an array
  if (typeof urls === 'string') {
    urls = [urls]
  }

  // separate function to make code more clear
  const grabContent = url => fetch(url)
    .then(res => res.text())
    .catch(function(error) {
      return null
    })

  Promise
  .all(urls.map(grabContent))
  .then(function(res){
    if (urls.length === 1) {
      cb(urls[0], res[0])
    } else {
      cb(urls, res)
    }
  })
}



export { fetchJson, fetchText }
