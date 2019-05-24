<template>
  <container title="欢迎注册">
    <template v-slot:tab-panel>
      <user-login v-if="activeName === 'user'"></user-login>
    </template>
    <template v-slot:tab-footer>
      <p>已有账号？<a href="#" @click.prevent="loadLoginPage">立即登录</a></p>
    </template>
  </container>
</template>
<script>
import Container from '../Container'
import userLogin from './userlogin'
import { setStore } from '@/util/store'
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  name: 'Login',
  components: {
    Container,
    userLogin,
  },
  data () {
    return {
      active: 1,
      activeName: 'user',
    }
  },
  methods: {
    loadLoginPage () {
      this.$router.push('/login')
    },
  },
  watch: {
    $route () {
      const params = this.$route.query
      this.socialForm.state = params.state
      this.socialForm.code = params.code
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: '登录中,请稍后。。。',
          spinner: 'el-icon-loading',
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
        this.handleSocialLogin()
      }
    },
  },
  created () {
    setStore({ name: 'tenantId', content: 1 })
  },
  mounted () { },
  computed: {
    ...mapGetters(['website']),
  },
  props: [],
}
</script>

<style lang="scss" scoped>
p {
  font-size: 14px;
  color: #666;
}
a {
  color: #ba1b20;
  margin: 0px 8px;
  &:hover {
    color: #f56c6c;
  }
}
</style>
