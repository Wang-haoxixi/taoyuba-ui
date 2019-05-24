<template>
  <div class="avue-contail">
    <el-container style="height: 100vh;">
      <el-header style="height: 60px;padding: 0;z-index: 500;">
        <!-- 顶部导航栏 -->
        <top />
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
          <!-- 左侧导航栏 -->
          <sidebar />
        </el-aside>
        <el-main>
          <!-- 主体视图层 -->
          <el-scrollbar style="height:100%">
            <keep-alive>
              <router-view class="avue-view" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <router-view class="avue-view" v-if="!$route.meta.keepAlive" />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <dialog-group></dialog-group>
  </div>
</template>

<script>
import displayMixins from '@/mixins/displayMixins'
import DialogGroup from './DialogGroup'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import top from './top/'
import sidebar from './sidebar/'
import admin from '@/util/admin'
import { validatenull } from '@/util/validate'
// import { calcDate } from '@/util/date.js'
import { getStore } from '@/util/store.js'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'
// import store from '@/store'

export default {
  mixins: [displayMixins],
  components: {
    top,
    sidebar,
    DialogGroup,
  },
  name: 'Index',
  data () {
    return {
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: '',
    }
  },
  created () {
    //实时检测刷新token
    // this.handleRefreshToken()
  },
  destroyed () {
    // console.log("销毁")
    // console.log(this.refreshTime)
    clearInterval(this.refreshTime)
    // this.disconnect()
  },
  mounted () {
    // this.init()
    this.LoadAllDictMap()
    this.LoadContactsPyGroup()
    this.LoadFamsConfig()
    // this.initWebSocket()
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'isLock',
      'website',
      // 'expires_in',
    ]),
    asideWidth () {
      if (this.$route.matched[0].path === '/app') {
        return '0px'
      }
      if (this.isDesktop()) {
        return '200px'
      } else {
        return '64px'
      }
    },
  },
  methods: {
    ...mapActions(['LoadAllDictMap', 'LoadContactsPyGroup', 'LoadFamsConfig', 'RefreshToken']),
    ...mapMutations({ setScreen: 'SET_SCREEN', setExpiresIn: 'SET_EXPIRES_IN' }),
    handleOk () {
      this.visible = false
    },
    // 屏幕检测
    init () {
      this.setScreen(admin.getScreen())
      window.onresize = () => {
        setTimeout(() => {
          this.setScreen(admin.getScreen())
        }, 0)
      }
    },
    // 实时检测刷新token
    handleRefreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: 'access_token',
          debug: true,
        })
        if (validatenull(token)) {
          return
        }
        if (this.expires_in <= 1000 && !this.refreshLock) {
          this.refreshLock = true
          this.RefreshToken().catch(() => {
            clearInterval(this.refreshTime)
          })
          this.refreshLock = false
        }
        this.setExpiresIn(this.expires_in - 10)
      }, 10000)
    },
    // initWebSocket () {
    //   this.connection()
    //   let self = this
    //   //断开重连机制,尝试发送消息,捕获异常发生时重连
    //   this.timer = setInterval(() => {
    //     try {
    //       self.stompClient.send('test')
    //     } catch (err) {
    //       console.log('断线了: ' + err)
    //       self.connection()
    //     }
    //   }, 5000)
    // },
    // connection () {
    //   let token = store.getters.access_token
    //   let TENANT_ID = getStore({ name: 'tenantId' })
    //   let headers = {
    //     Authorization: 'Bearer ' + token,
    //   }
    //   // 建立连接对象
    //   this.socket = new SockJS('/api/act/ws') //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
    //   // 获取STOMP子协议的客户端对象
    //   this.stompClient = Stomp.over(this.socket)

    //   // 向服务器发起websocket连接
    //   this.stompClient.connect(
    //     headers,
    //     () => {
    //       this.stompClient.subscribe(
    //         '/task/' + this.userInfo.username + '-' + TENANT_ID + '/remind',
    //         msg => {
    //           // 订阅服务端提供的某个topic;
    //           this.$notify({
    //             title: '协同提醒',
    //             type: 'warning',
    //             dangerouslyUseHTMLString: true,
    //             resources: msg.body + '任务，请及时处理',
    //             offset: 60,
    //           })
    //         }
    //       )
    //     },
    //     () => { }
    //   )
    // },
    // disconnect () {
    //   if (this.stompClient != null) {
    //     this.stompClient.disconnect()
    //     console.log('Disconnected')
    //   }
    // },
  },
}
</script>
<style lang="scss" scoped>
.el-aside {
  overflow: hidden;
  background-color: #fafafa;
  border-right: 1px solid #e5e5e5;
}
</style>
<style lang="css" scoped>
.avue-contail >>> .el-main {
  padding: 0;
  overflow-x: hidden;
  height: calc(100vh - 60px);
}
.avue-contail >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.avue-contail >>> .el-scrollbar {
  width: 100%;
}
.avue-contail >>> .el-scrollbar__view {
  height: 100%;
}
</style>
