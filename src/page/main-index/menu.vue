<template>
  <div class="index-menu">
    <template v-for="item in menuList">
      <div class="route-catalog" v-if="item.children && item.children.length > 0" :key="item.label">
        <div class="menu-cate">{{item.label}}</div>
        <el-row style="width: 100%;">
          <template v-if="item.children && item.children.length > 0">
            <el-col class="menu-container" :span="6" v-for="(menu, index) in item.children" :key="index">
              <div class="menu" :class="menu.isShow === 1 ? '' : 'disabled'">
                <div class="menu-con">
                  <div class="menu-top" @click="routeToPage(menu)">
                    <div class="menu-icon iconfont" :class="menu.icon"></div>
                    <div class="menu-text">
                      <div class="menu-title">{{ menu.label }}</div>
                      <div class="menu-desc">{{ menu.describe }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['menuAll']),
  },
  created () {
  },
  methods: {
    routeToPage (menu) {
      if (!menu.path) {
        return
      }
      if (menu.isBlank === 1) {
        window.open(menu.path, '_blank')
        return
      }
      // if (menu.isLink === 1) {
      //   window.location.href = ''
      //   return
      // }
      this.$store.commit('SET_ACTIVE_MAIN_MENU', menu.name)
      this.setCurrentMenu(menu.name)
      if (!~menu.redirectUrl.indexOf('myiframe')) {
        this.$router.push({name: menu.name})
      } else {
        this.$router.push({path: menu.redirectUrl})
      }
    },
    setCurrentMenu (name) {
      var menu = [].concat(this.menuAll)
      menu.forEach((item) => {
        if (name === item.name) {
          // this.$router.push({name: name})
          this.$store.commit('SET_MENU', item.children)
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  .index-menu {
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
</style>
