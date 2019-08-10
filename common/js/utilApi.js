import axios from 'axios'
import qs from 'qs'
import Cookie from 'js-cookie'

let host = process.env.NODE_ENV === 'production' ? '' : '/api'

// 服务端渲染时走不到代理，填'/api'会404
if (process.server) {
  host = 'http://dev1.51zouchuqu.com'
}

// receive store and data by options
axios.interceptors.response.use(
  response => {
    var { data } = response
    // 未登陆和在其他设备上登陆
    if (data.code === 9003 || data.code === 9002) {
      window.sessionStorage.clear()
    }
    if (data.code === 9999) {
      console.log('接口请求失败')
    }
    if (data.isShowMessage) {
      if (data.code === 10000) {
        console.log(data.message)
      } else {
        console.log(data.message)
      }
    }
    return response
  },
  error => {
    /* eslint-disable no-console */
    return error
  }
)
var callApi = config => {
  let newConfig = {
    ...config,
    headers: {
      // 'x-auth-token': process.server ? cookieparser.parse(req.headers.cookie).token : (cookie.get('token') || ''),  // 服务端渲染无window对象
      'Content-Type': 'application/x-www-form-urlencoded',
      "p": '3',
      "v": '10001',
      ...config.headers
    }
  }
  return axios(newConfig).then(response => {

    return { response: response.data }
  }).catch(error => ({ error: error }))
}

var formDataInitParams = data => {
  if (!data) return '{}'
  for (let item in data) {
    if (typeof (data[item]) === 'object') {
      data[item] = JSON.stringify(data[item])
    }
  }
  return data
}

var initHeaders = params => {
  // 客户端设置请求头 token
  if (process.client) {
    params.headers = {
      'x-auth-token': Cookie.get('token'),
      ...params.headers
    }
  }
  if (params.type && (params.type).toLocaleLowerCase() === 'json') {
    params.data = JSON.stringify(params.data)
    params.headers = {
      'Content-Type': 'application/json',
      ...params.headers
    }
  } else {
    params.data = qs.stringify(formDataInitParams(params.data))
    params.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...params.headers
    }
  }
  console.log('params.headers', params.headers)
  return params
}


/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 * withCredentials: true 是否开启跨域cors跨域设置
 */
var createdConfig = ({ url, data, headers, others, config, type }, method) => callApi({
  url: `${host}${url}`,
  // url: `${host}${config.prefix}${config.version}${config.afterfix}${url}`,
  method: method,
  params: method === 'GET' ? data : '',
  data: method !== 'GET' ? data : '',
  withCredentials: true,
  others,
  headers
})

export const get = (params) => {
  params = initHeaders(params)
  return createdConfig(params, 'GET')
}

export const post = (params) => {
  params = initHeaders(params)
  return createdConfig(params, 'POST')
}
// post({
//   url: '/user/login',
//   data: {
//     checkCode: data.checkCode,
//     account: data.account,
//     password: data.password,
//     checkToken: data.checkToken
//   },
//   config: {
//     api: api,
//     prefix: mainApiConfig.prefix,
//     version: version,
//     afterfix: mainApiConfig.afterfix
//   }
// })
export const put = (params) => {
  params = initHeaders(params)
  return createdConfig(params, 'PUT')
}

export const del = (params) => {
  params = initHeaders(params)
  return createdConfig(params, 'DELETE')
}
