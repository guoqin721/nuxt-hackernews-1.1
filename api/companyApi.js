import { post } from '@/common/js/utilApi'
import { get } from '@/common/js/utilApi'

import { mainApiConfig, version, api } from '@/config'
let config = {
  api: api,
  prefix: mainApiConfig.prefix,
  version: version,
  afterfix: mainApiConfig.afterfix
}

const postWithConfig = params => {
  return post({
    ...params,
    config
  })
}

export const loadLevel = async data => get({
  url: '/us/v1/company/level',
  headers: data && data.headers
})