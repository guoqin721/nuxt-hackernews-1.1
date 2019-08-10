<template>
  <div class="loginForm">
    <a-form :form="form">
      <a-form-item label="账号"
                   :labelCol="{ span: 7 }"
                   :wrapperCol="{ span: 12 }"
                   >
        <a-input v-decorator="['account']" />
      </a-form-item>
      <a-form-item label="密码"
                   :labelCol="{ span: 7 }"
                   :wrapperCol="{ span: 12 }"
                   >
        <a-input type="password" v-decorator="['password']" />
      </a-form-item>
      <!-- <a-form-item label="验证码"
                   :labelCol="{ span: 7 }"
                   :wrapperCol="{ span: 12 }"
                    >
        <a-input style="width: 124px" v-decorator="['checkCode']" />
        <div class="authCodeBoxBtn">
          <a-spin :spinning="false"
                  style="float:left">
            <img v-if="imgCode.data.checkImg"
                 :src="`data:image/png;base64,`+imgCode.data.checkImg"
                 class="authCodeBtn">
          </a-spin>
        </div>
      </a-form-item> -->
      <a-row>
        <a-col :span="7"></a-col>
        <a-col :span="12">
          <a-button v-if="!token.data.token" class="loginBtn"
                    style="width:100%"
                    :loading="login.isLoading"
                    type='primary'
                    @click="check">登录login</a-button>
          <a-button v-else class="loginBtn"
                    style="width:100%"
                    type='primary'
                    @click="logout">退出</a-button>
        </a-col>
      </a-row>
    </a-form>
    <nuxt-link to="/">回首页</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cookieparser from 'cookieparser'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    async asyncData  ({ req, store, params }) {
        // 服务端渲染时需要手动去获取cookie内的token
        // console.log(cookieparser.parse(req.headers.cookie))
        // await store.dispatch('common/fetchLoadImgCode', {time: Date.now()})
    },

    data () {
        return {
            form: this.$form.createForm(this),
        }
    },

    computed: {
        ...mapState('common', ["login", "token"])
    },

    async mounted () {
        // let res = await this.$store.dispatch('common/fetchLoadImgCode', {time: Date.now()})
        console.log('token', this.token)
    },

    methods: {
        check () {
            console.log('登录')
            this.form.validateFields(
                (err, values) => {
                    if (!err) {
                        this.$store.dispatch('common/fetchLoadLogin', values).then(res => {
                          this.$store.commit('common/token', {data: {token: res.response.data.token}})
                          Cookie.set('token', res.response.data.token)
                          this.$router.push({path: '/company'})
                        })
                    }
                },
            )
        },
        logout () {
          Cookie.remove('token')
          window.location.href = "/";
        }
    } 
}
</script>

<style lang="less" scoped>
    .loginForm {
        width: 500px;
        margin: 0 auto;
        margin-top: 100px;
    }
</style>
