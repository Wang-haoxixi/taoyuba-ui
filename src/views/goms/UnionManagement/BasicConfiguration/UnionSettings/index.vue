<template>
  <div>
    <basic-container>
      <page-header title="联盟成员"></page-header>
      <div class="members">
        <div class="member" v-for="(item, index) in orgList" :key="index">
          <a-button @click="handleRemoveOrg(item.value)" block>{{ item.label }}</a-button>
        </div>
        <div class="member">
          <a-button type="dashed" @click="handleAddOrg" block>添加联盟成员</a-button>
        </div>
      </div>
      <el-row class="row-bg">
        <el-col :span="12" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>组织升级<i></i></span>
            </div>
            <div class="text item">
              组织创建者可将组织下属的一个部门分离为独立组织，默认子组织仍属于此创建人；转让后，该组织与母组织自动形成联盟，且通用母组织的各功能模块的标准配置。
            </div>
            <el-button type="warning" plain>升级</el-button>
          </div>
        </el-col>
        <el-col :span="12" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>组织合并<i></i></span>
            </div>
            <div class="text item">
              联盟状态下，组织创建者可定向邀请联盟的兄弟组织进行合并；合并后的组织各项模块配置和文档均以发起组织为主，被合并组织的部分内容将被吞并。
            </div>
            <el-button type="warning" plain>合并</el-button>
          </div>
        </el-col>
        <el-col :span="12" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>组织转让<i></i></span>
            </div>
            <div class="text item">
              组织创建者可将组织装让给组织现有的管理员之一；转让后，创建者自动退出组织管理。
            </div>
            <el-button type="warning" plain>转让</el-button>
          </div>
        </el-col>
        <el-col :span="12" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>组织解散<i></i></span>
            </div>
            <div class="text item">
              组织创建者可解散组织；解散后，组织内的所有消息记录和成员信息都会删除，成员将无法进入，请谨慎操作。
            </div>
            <el-button type="warning" plain>解散</el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
    <add-org-dialog-form ref="AddOrgDialogForm" @load-page="loadPage"></add-org-dialog-form>
  </div>
</template>
<script>
import { getUnionOrgList, removeOrgById, addOrgById } from '@/api/goms/union'
import AddOrgDialogForm from './AddOrgDialogForm'
import mixins from '@/mixins/mixins'
export default {
  components: { AddOrgDialogForm },
  mixins: [mixins],
  data () {
    return {
      orgList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRemoveOrg (id) {
      this._handleComfirm(id, removeOrgById, '移除组织')
    },
    handleAddOrg () {
      this.$refs['AddOrgDialogForm'].formRequestFn = addOrgById
      this.$refs['AddOrgDialogForm'].dialogShow = true
    },
    loadPage () {
      getUnionOrgList().then(({ data }) => {
        this.orgList = data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.organize-group {
  text-align: center;
  .el-button.is-circle {
    margin: 20px 60px;
    width: 120px;
    height: 120px;
    border-color: #f7f7f7;
    background-color: #f7f7f7;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    span {
      display: block;
      margin-top: 10px;
    }
    i {
      display: block;
      margin-bottom: 10px;
      font-size: 34px !important;
      color: #bf051a;
    }
    &:hover,
    &:focus {
      background-color: #bf051a;
      color: #fff;
      i {
        color: #fff;
      }
    }
  }
}
.organize-item {
  display: inline-block;
  .sub-title {
    text-align: center;
    span {
      display: block;
      i {
        display: block;
        margin: 0 auto;
        padding-top: 10px;
        width: 30px;
        font-style: normal;
        border-bottom: 1px solid #bf051a;
      }
    }
  }
  .organize-con {
    margin: 20px;
    padding: 25px;
    text-align: center;
    border: 1px solid #d7d7d7;
    background-color: #fff;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    .item {
      margin: 15px 0;
      min-height: 54px;
      text-align: left;
      text-align: justify;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #666;
    }
    &:hover,
    &:focus {
      box-shadow: 0px 1px 1px 1px #eee;
    }
    .el-button--warning.is-plain {
      color: #bf051a;
      border-color: #bf051a;
      background-color: #fff2f4;
      &:hover,
      &:focus {
        background-color: #bf051a;
        color: #fff;
      }
    }
  }
}
.members {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 20px;
  margin: 0 20px;
  .member {
    width: 100%;
    text-align: center;
  }
}
</style>
