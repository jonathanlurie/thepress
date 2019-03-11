import { getAbsoluteURL } from './Tools'

let mainConfig = null

function setMainConfig (data) {
  mainConfig = data

  if('logo' in mainConfig.site) {
    mainConfig.site.logo = getAbsoluteURL(mainConfig.site.logo)
  }

  if('logoAlternative' in mainConfig.site) {
    mainConfig.site.logoAlternative = getAbsoluteURL(mainConfig.site.logoAlternative)
  }

  if('cover' in mainConfig.site) {
    mainConfig.site.cover = getAbsoluteURL(mainConfig.site.cover)
  }

  console.log(mainConfig)
}

function getMainConfig () {
  return mainConfig
}

export {
  setMainConfig,
  getMainConfig
}
