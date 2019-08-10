import { post } from '@/common/js/utilApi'

import { mainApiConfig, version, api } from '@/config'
let config = {
  api: api,
  prefix: mainApiConfig.prefix,
  version: version,
  afterfix: mainApiConfig.afterfix
}

const postWithConfig = params => post({
  ...params,
  config
})

export const loadLogin = data => postWithConfig({
  url: '/us/v1/login/password',
  // url: '/us/v1/tools/phoneCodeList',
  data: {
    username: 15010452673,
    password: 'qqq111',
    areaCode: 86
  }
  // headers: {
  //   "Content-Type": 'application/json'
  // }
})

export const loadImgCode = data => postWithConfig({
  url: '/user/getImgCode',
  data: {
    time: data.time
  }
})