import { getcookiesInServer, getcookiesInClient } from '~/utils/auth'

export default function ({route, req, store, redirect}) {
  let token = '';
  let routePath = '';
  const extraPath = ['/login', '/']

  if (process.server && !req) return
  //服务端获取token
  if (process.server) {
    let cookies = getcookiesInServer(req)
    routePath = req.originalUrl;
    token = cookies['token'] ? cookies['token'] : ''
  }
  //客户端获取token
  if (process.client) {
    token = getcookiesInClient('token')
    routePath = route.path;
  }
  
  store.commit('common/token', {data: {token: token}})
  //token验证
  if (!token && extraPath.indexOf(routePath) === -1) {
      redirect('/login')
  }
}