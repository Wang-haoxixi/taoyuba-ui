<template>
  <basic-container v-loading="pageLoading">
    <page-header :title="form.name" :backOption="backOption"></page-header>
    <div class="detail-container">
      <div class="item-title">
        <ul>
          <li>
            <operation-wrapper>
              <span>发布人：</span>
              <iep-hover-card disabled :obj="form.sender"></iep-hover-card>
            </operation-wrapper>
          </li>
          <!-- <li>
            <operation-wrapper>
              <span>接收方：</span>
              <iep-hover-card disabled type="danger" v-for="item in form.receivers.orgs" :key="item.id" :obj="item"></iep-hover-card>
              <iep-hover-card v-for="item in form.receivers.users" :key="item.id" :obj="item"></iep-hover-card>
            </operation-wrapper>
          </li> -->
          <li><span>时间：</span><span>{{form.time}}</span></li>
        </ul>
        <el-button-group>
          <el-button icon="iconfont icon-biaoqian" size="mini"></el-button>
          <el-button icon="iconfont icon-shanchu" size="mini"></el-button>
        </el-button-group>
      </div>
      <div class="item-con">
        <div class="paragraph">
          <iep-html v-model="form.content"></iep-html>
        </div>
      </div>
    </div>
  </basic-container>
</template>
<script>
import { getAnnouncementById } from '@/api/ims/announcement'
import { initForm } from './options'
export default {
  beforeRouteUpdate (to, from, next) {
    console.log(to, from)
    this.$nextTick(() => {
      this.loadPage()
    })
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      pageLoading: true,
      form: initForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      this.pageLoading = true
      getAnnouncementById(this.$route.params.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-container {
  ul,
  li,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .item-title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #fafafa;
    color: #666;
    li {
      margin-bottom: 10px;
    }
    .el-button-group {
      .el-button {
        display: flex;
        align-items: flex-end;
      }
    }
  }
  .item-con {
    padding: 20px;
    border-bottom: 1px solid #d7d7d7;
    color: #666;
    .paragraph {
      margin-bottom: 20px;
      text-indent: 2em;
      line-height: 24px;
      .sub-title {
        display: block;
        text-indent: 2em;
      }
      &:nth-child(1) {
        margin-top: 10px;
      }
    }
  }
  .comment {
    .con {
      display: flex;
      justify-content: space-between;
      .img {
        display: flex;
        flex: 0 0 100px;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          border-radius: 50%;
          padding: 2px;
          width: 40px;
          height: 40px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
      }
      .name {
        color: #2558a9;
        cursor: pointer;
        &:hover {
          color: #4689f3;
        }
      }
      .text {
        flex: 1;
        .text-bottom {
          display: flex;
          justify-content: space-between;
          p {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
