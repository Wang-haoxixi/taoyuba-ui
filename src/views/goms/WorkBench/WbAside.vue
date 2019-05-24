<template>
  <a-card :bordered="false" class="aside-card">
    <div class="account-center-avatarHolder">
      <div class="avatar">
        <iep-img style="width:100%" :src="form.logo"></iep-img>
      </div>
      <div class="username">{{form.name}}</div>
      <div class="bio">{{form.abrName}}</div>
    </div>
    <div class="account-center-detail">
      <p>
        <i class="icon-huiyikaihuitaolun"></i>联盟所属：{{form.unionName}}
      </p>
      <p>
        <i class="icon-rencai"></i>成员数量：{{form.memberNum}}
      </p>
      <p>
        <i class="icon-bumen"></i>部门数量：{{form.deptNum}}
      </p>
    </div>
    <a-divider :dashed="true" />

    <div class="account-center-team">
      <div class="teamTitle">
        管理员
      </div>
      <a-spin :spinning="pageLoading">
        <div class="members">
          <a-row>
            <a-col :span="12" v-for="(item, index) in form.adminList" :key="index">
              <div class="member">
                <iep-img-avatar size="small" :src="item.avatar"></iep-img-avatar>
                <span class="member-name">
                  {{ item.name }}
                  <a-icon class="close" type="close" @click="handleUnsetAdmin(item.id)" />
                </span>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="member">
                <a-button type="dashed" size="small" icon="plus" @click="handleAddAdmin" block>管理员</a-button>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-spin>
    </div>
    <a-divider />
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{ item.description }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a-switch slot="actions" :loading="pageLoading" checkedChildren="开" unCheckedChildren="关" :checked="form[item.propName]" @change='item.actions.callback' />
        </template>
      </a-list-item>
    </a-list>
    <add-admin-dialog ref="AddAdminDialog" @load-page="loadPage"></add-admin-dialog>
  </a-card>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getOrgBySelf, unSetOrgAdmin, setOrgAdmin, toggleOrgOpen } from '@/api/goms/org'
import AddAdminDialog from './AddAdminDialog'
import { initAddAdminForm } from './options'
export default {
  mixins: [mixins],
  components: { AddAdminDialog },
  data () {
    return {
      pageLoading: true,
      form: {
        logo: '',
        name: '',
        managerList: [],
        memberNum: 0,
        deptNum: 0,
        isOpen: true,
        isUserLocked: true,
      },
      data: [
        {
          title: '允许加入',
          propName: 'isOpen',
          description: '允许用户申请加入组织',
          actions: {
            callback: () => {
              toggleOrgOpen().then(({ data }) => {
                if (!data.data) {
                  this.$message.success(data.msg)
                }
                this.loadPage()
              })
            },
          },
        },
        // {
        //   title: '开启审理员审核',
        //   propName: 'isUserLocked',
        //   description: '用户加入组织需通过管理员审核',
        //   actions: { callback: () => { this.$message.success('This is a message of success') } },
        // },
        // {
        //   title: '组织邀请码',
        //   propName: 'isUserLocked',
        //   description: '下载二维码邀请用户加入',
        //   actions: { callback: () => { this.$message.error('This is a message of error') } },
        // },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAddAdmin () {
      this.$refs['AddAdminDialog'].dialogShow = true
      this.$refs['AddAdminDialog'].formRequestFn = setOrgAdmin
      this.$refs['AddAdminDialog'].form = initAddAdminForm()
    },
    handleUnsetAdmin (id) {
      this._handleComfirm(id, unSetOrgAdmin, '撤销其管理员')
    },
    loadPage () {
      this.pageLoading = true
      getOrgBySelf().then((res) => {
        this.form = res.data.data
        this.pageLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-card {
  background-color: #fafafa;
}
.teamTitle {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 12px;
}
.account-center-avatarHolder {
  text-align: center;
  margin-bottom: 24px;

  & > .avatar {
    margin: 0 auto;
    width: 200px;
    height: 104px;
    margin-bottom: 20px;
    /* border-radius: 50%; */
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .username {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 4px;
  }
}
.account-center-detail {
  p {
    margin-bottom: 8px;
    padding-left: 26px;
    position: relative;
    i {
      margin-right: 5px;
      font-size: 14px;
    }
  }
}
.account-center-team {
  .members {
    .member {
      display: block;
      margin: 12px 0;
      // line-height: 24px;
      // height: 24px;
      .member-name {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        // line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
        &:hover {
          color: #999;
          .close {
            cursor: pointer;
            color: red;
          }
        }
      }
    }
  }
}
</style>
