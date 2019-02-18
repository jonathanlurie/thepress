

let mainConfig = null

function setMainConfig (data) {
  mainConfig = data
  console.log(mainConfig)
}

function getMainConfig () {
  return mainConfig
}

export {
  setMainConfig,
  getMainConfig
}
