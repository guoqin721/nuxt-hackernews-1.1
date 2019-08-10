import Cookie from 'js-cookie'
  //获取服务端cookie
  export function getcookiesInServer (req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  }
  //获取客户端cookie
  export function getcookiesInClient (key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  }
