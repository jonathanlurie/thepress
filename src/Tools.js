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


function pathJoin_ORIG(parts, separator = '/'){
   let replace   = new RegExp(separator+'{1,}', 'g');
   return parts.join(separator).replace(replace, separator);
}


function pathJoin (parts, separator = '/') {
  let cleanParts = []

  for (let i=0; i<parts.length; i++) {
    let part = parts[i]
    if (i > 0) {
      if (part[0] === separator) {
        part = part.substring(1)
      }
    }

    if (part[part.length - 1] === separator) {
      part = part.substring(0, part.length - 1)
    }

    cleanParts.push(part)
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
  })
  return mdMod
}


export { fetchJson, fetchText, pathJoin, getURL, getAbsoluteURL, markdownReplaceImageURL }
