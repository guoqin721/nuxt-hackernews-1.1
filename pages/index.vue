<template>
  <section class="container">
    <div>
      <logo />
      <div><nuxt-link to="/login">登录</nuxt-link></div>
      <div><nuxt-link to="/company">去公司页</nuxt-link></div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { resolve } from 'q';

let delay = (time) => new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, time)
})
export default {
  async fetch ({ store, params }) {
    // var data = await store.dispatch('common/login', {test: 'testStore'})
    // await delay(1000)
    // store.commit('common/fetchLogin', { test: 'testStore' })
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
