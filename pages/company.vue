<template>
  <div class="loginForm">
    公司页面
    数据：{{level.data && level.data.phoneRecoNumber}}
    <nuxt-link to="/">回首页</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cookieparser from 'cookieparser'

export default {
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    // if (process.server) {
    //   const parsed = cookieparser.parse(req.headers.cookie)
    //   console.log('parsed', parsed)
    //   const token = parsed.token
    //   await store.dispatch('company/fetchLoadLevel', {headers: {'x-auth-token': token}})
    // } else {
    //   await store.dispatch('company/fetchLoadLevel')
    // }
    await store.dispatch('company/fetchLoadLevel')
  },
  computed: {
    ...mapState('company', ['level'])
  },
  mounted () {
    console.log('level', this.level)
  },
}
</script>

<style lang="less" scoped>
    .loginForm {
        width: 500px;
        margin: 0 auto;
        margin-top: 100px;
    }
</style>
