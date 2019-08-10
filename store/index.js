import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { createState, createMutations, createActions } from '@/common/js/utilModules'
import * as type from './type'
import getters from './getters'
import resetAction from './resetAction'
import api from './api'
import cookieparser from 'cookieparser'
const modules = {}
Object.keys(type.default).forEach(key=>{
  modules[key] = {
    namespaced : true,
    state: createState(type.default[key]),
    mutations: createMutations(type.default[key]),
    actions: createActions(type.default[key], api, resetAction[key]),
    getters: getters[key]
  }
})

console.log('modules', modules)
// import { loadLogin, loadImgCode } from "@/api/commonApi.js"

// const common = {
//   namespaced: true,
//   state: { 
//     login: {
//       data: {},
//       isLoading: false
//     },
//     imgCode: {
//       data: {},
//       isLoading: false
//     }
//   },
//   mutations: { 
//     loadLogin (state, payload = {}) {
//       state.login = {
//         ...state.login,
//         ...payload,
//       }
//     },
//     loadImgCode (state, payload = {}) {
//       state.imgCode = {
//         ...state.imgCode,
//         ...payload,
//       }
//     },
//   },
//   actions: {
//     async fetchLoadLogin ({ commit, state }, params) {
//       commit('login', { isLoading: true })
//       let res = await loadLogin(params)
//       commit('login', { data: res.response.data, isLoading: false })
//       return res
//     },
//     async fetchLoadImgCode ({ commit, state }, params) {
//       commit('imgCode', { isLoading: true })
//       let res = await loadImgCode(params)
//       commit('imgCode', { data: res.response.data, isLoading: false })
//       return res
//     }
//   },
//   getters: {

//   }
// }

Vue.use(Vuex)
export default function () {
  return new Vuex.Store({
    actions: {
      // 在每个服务器端渲染中运行
      nuxtServerInit ({ commit }, {store, req }) {
        let token = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            token = parsed.token
          } catch (err) {
            console.error('找不到有效的Cookie')
          }
        }
        if (token) {
          // 刷新时设置请求头 token
          axios.defaults.headers['x-auth-token'] = token;
        }
        console.log('执行了nuxtServerInit', token)
        store.commit('common/token', {data: {token: token}})
      }
    },
    modules: modules
  })
}