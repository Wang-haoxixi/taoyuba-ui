<template>
  <div>
    <govHeader :mainMenuShow='false'></govHeader>
    <div class="main-content">
      <div class="side-bar">
        <side-bar/>
      </div>
      <div class="main-right">
        <main-menu ref="mainMenu" :menuList="menuList"></main-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { setTheme } from '@/util/util'
import govHeader from '../index/top'
import { validatenull } from '@/util/validate'
import { initMenu } from '@/util/util'
import { mapGetters } from 'vuex'
import menuMixin from '@/mixins/menu'
import sideBar from './sideBar'
// import menuList from './menu'
import mainMenu from './menu.vue'
import {getDic} from '@/util/dic'
//项目管理角色展示不同的菜单
//import { selectUserMenu,selectUserPermission } from '@/api/projectManagement/projectRole'
export default {
  name: 'routeCatalog',
  mixins: [menuMixin],
  computed: {
    ...mapGetters(['menuAll', 'dicList', 'themeName']),
  },
  components: {
    govHeader,
    sideBar,
    mainMenu,
  },
  data () {
    return {
      menuList: [],
    }
  },
  mounted () {
    setTheme(this.themeName)
    this.$store.dispatch('GetDepartmentList')
  },
  methods: {
    //替换项目管理中显示的内容
    // getSelectUserMenu (res,index) {
    //   //菜单
    //   selectUserMenu({id:res[index].id}).then(({data}) => {
    //     if (data.length > 0) {
    //       res[index].children = data
    //       this.$store.commit('SET_MENU_ALL', res)
    //     } else {
    //       res.splice(index,1)
    //       this.$store.commit('SET_MENU_ALL', res)
    //     }
    //     initMenu(this.$router, res)
    //     this.menuLoading().close()
    //     this.getCurrentMenu()
    //   })
    //   //权限
    //   selectUserPermission({id:res[index].id}).then(({data}) => {
    //     this.$store.commit('SET_PERMISSIONS', data)
    //   })
    // },
    getDicData () {
      let loading = this.menuLoading()
      this.$store.dispatch('GetDicList').then(() => {
        if (validatenull(this.menu)) {
          this.$store.dispatch('GetMenu').then(({res}) => {
            //有项目管理模块时才替换
            // let flag = true
            // res.forEach((item,index) => {
            //   if (item.label == '项目管理') {
            //     flag = false
            //     this.getSelectUserMenu(res,index)                    
            //   }
            // })
            // if (flag) {
              initMenu(this.$router, res)
              loading.close()
              this.getCurrentMenu()
            //}
          }).catch((err) => {
            console.log(err)
            loading.close()
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getCurrentMenu () {
      let systemType = getDic('SYSTEM_TYPE')
      if (systemType == null) {
        return
      }
      let menuAll = this.menuAll
      for (let i = 0 , len = menuAll.length; i < len; i++) {
        let data = menuAll[i]
        if (data.systemType) {
          for (let j = 0, len = systemType.length; j < len; j++) {
            if (data.systemType === systemType[j].value) {
              if (!systemType[j].children) {
                systemType[j].children = []
              }
              systemType[j].children.push(data)
            }
          }
        }
      }
      this.menuList = (systemType || []).reverse()
    },
    menuLoading () {
      return this.$loading({
        lock: true,
        text: '菜单加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)',
      })
    },
  },
  created () {
    if (this.menuAll && this.menuAll.length > 0) {
      this.getCurrentMenu()
      return
    }
    this.getDicData()
  },
}
</script>

<style lang="scss" scoped>
  .main-content {
    height: calc(100% - 65px);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
    align-items: flex-start;
    .side-bar {
      position: relative;
      z-index: 10;
      width: 220px;
      height:100vh;
      background-color: #2B333E;
      -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
    .main-right {
      padding: 10px 10px 80px;
      height: 100vh;
      background-color: #f0f2f5;
      flex: 1;
      overflow: auto;
      .menu-cate {
        position: relative;
        padding-left: 25px;
        width: 100%;
        line-height: 40px;
        font-size: 16px;
        float: left;
        display: block;
        &::before {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 3px;
          height: 20px;
          background-color: #3C8CE5;
          content: '';
        }
      }
      .route-catalog {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        .menu-container {
          &:nth-child(10n+1) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #00a0ff;
          }
          &:nth-child(10n+2) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #4385ce;
          }
          &:nth-child(10n+3) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #f57825;
          }
          &:nth-child(10n+4) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #6abd4d;
          }
          &:nth-child(10n+5) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #46b7bb;
          }
          &:nth-child(10n+6) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #cea452;
          }
          &:nth-child(10n+7) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #88b38b;
          }
          &:nth-child(10n+8) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #6a7fce;
          }
          &:nth-child(10n+8) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #a387af;
          }
          &:nth-child(10n+9) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #a387af;
          }
          &:nth-child(10n+10) .menu-con .menu-top .menu-icon{
            color: #fff;
            background-color: #a387af;
          }
        }
        .menu {
          box-sizing: border-box;
          padding:10px;
          width: 100%;
          .menu-con {
            cursor: pointer;
            width:100%;
            box-sizing: border-box;
            background-color: #fff;
            border: 1px solid #ddd;
            .menu-top {
              padding:10px;
              box-sizing: border-box;
              width:100%;
              display: flex;
              height: 88px;
              .menu-icon {
                margin-right: 10px;
                height: 50px;
                width: 50px;
                text-align: center;
                line-height: 50px;
                border-radius: 3px;
                font-size: 2.5em;
                transition: 0.5s;
                color: #3C8CE5;
              }
              .menu-text {
                margin-left: 5px;
                line-height: 24px;
                flex: 1;
                .menu-title {
                  font-size: 16px;
                  color: #333
                }
                .menu-desc {
                  font-size: 14px;
                }
                .menu-desc {
                  margin-bottom: 4px;
                  line-height: 20px;
                  font-size: 12px;
                  color: rgb(156, 156, 156);
                }
              }
            }
            .menu-peo {
              box-sizing: border-box;
              padding:10px;
              width: 100%;
              font-size: 12px;
              height: 39px;
              color: #444;
              background-color: #f7f9fa;
              border-top: 1px solid #e8e8e8;
              span {
                display: inline-block;
                text-align: left;
                &:nth-child(1){
                  padding-right:10px
                }
                a {
                  display: inline-block;
                  margin-right: 5px;
                }
              }
            }
            &:hover {
              box-shadow: 0 2px 8px rgba(0,0,0,.09);
              border-color: rgba(0,0,0,.09);
              .menu-icon {
                background: #3C8CE5;
                color: #FFFFFF;
              }
            }

            &.menu-disabled {
              background-color: rgba(255,255,255,.4);
              cursor: auto;
              .menu-top {
                .menu-icon {
                  opacity: .5;
                }
                .menu-text {
                  .menu-title {
                    color: #999;
                  }
                }
              }
              .menu-peo{
                text-align: center;
                .deving {
                  color: #888
                }
                a {
                  margin-right: 5px;
                  display: inline-block;
                }
              }

              &:hover {
                .menu-icon {
                  background: inherit;
                  color: inherit;
                }
              }
            }
          }
          &.disabled .menu-con{
            background-color: #f6f6f6;
            cursor: auto;
            .menu-top .menu-icon {
              background-color: #aaa;
            }
            &:hover {
              -webkit-box-shadow: 0 2px 8px #f6f6f6;
              box-shadow: 0 2px 8px #f6f6f6;
              border-color: rgba(0, 0, 0, 0.09);
            }
          }
        }
      }
    }
  }
</style>
