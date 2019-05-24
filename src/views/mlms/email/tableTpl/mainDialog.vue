<template>
  <div class="inbox">
    <basic-container>
      <div class="head">
        <page-header :title="formData.subject" class="title" :backOption="backOption">
          <div slot="sub" class="tags">
            <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail>
          </div>
        </page-header>
      </div>
      <div class="info">
        <!-- <div class="title">{{formData.subject}}</div> -->
        <!-- <el-tag type="info" class="tags" v-for="(item, index) in formData.tagKeyWords" :key="index">{{item}}</el-tag> -->
        <div class="msg">发件人：{{formData.sendRealName}}</div>
        <div class="msg">收件人：<span v-for="(item, index) in formData.receivers" :key="index">{{item.receiverRealName}}{{index==formData.receivers.length-1?'':'；'}}</span></div>
        <div class="msg">时<span style="width: 14px;display: inline-block;"></span>间：{{formData.createTime}}</div>
      </div>
      <div class="content">
        <!-- <pre>{{formData.content}}</pre> -->
          <iep-html v-model="formData.content"></iep-html>
      </div>
      <div class="appendix" v-if="formData.attachmentRelatios.length">
        <h3>附件</h3>
        <ul class="list">
          <li v-for="(item, index) in formData.attachmentRelatios" :key="index">
            <i class="icon-fujian"></i>{{item.relatiionName}} <iep-button type="text" @click="downloadFile(item)">下载</iep-button><!-- <iep-button type="text">转存</iep-button> -->
          </li>
        </ul>
        <iep-button type="text" @click="downloadFileAll"><i class="icon-download1"></i> 全部下载</iep-button>
      </div>
      <div class="relation" v-if="(formData.projectRelatios.length > 0 || formData.materialRelatios.length > 0 || formData.summaryRelatios.length > 0)">
        <h3>关联</h3>
        <div class="item" v-if="formData.projectRelatios.length > 0">
          <div class="title">关联项目：</div>
          <div>
            <ul class="list">
              <li v-for="(item, index) in formData.projectRelatios" :key="index">{{item.relatiionName}}</li>
            </ul>
          </div>
        </div>
        <div class="item" v-if="formData.summaryRelatios.length > 0">
          <div class="title">关联纪要：</div>
          <div>
            <ul class="list">
              <li v-for="(item, index) in formData.summaryRelatios" :key="index" @click="handleMaterialDetail(item, 'summary')">{{item.relatiionName}}</li>
            </ul>
          </div>
        </div>
        <div class="item" v-if="formData.materialRelatios.length > 0">
          <div class="title">关联材料：</div>
          <div>
            <ul class="list">
              <li v-for="(item, index) in formData.materialRelatios" :key="index" @click="handleMaterialDetail(item, 'material')">{{item.relatiionName}}</li>
            </ul>
          </div>
        </div>
        <!-- <div class="item" v-if="formData.type == 0">
          <div class="title">关联报表：</div>
          <ul class="list">
            <li>
              <h5>报表1：研发中心项目进度表</h5>
              <el-table :data="tableData" border style="width: 80%">
                <el-table-column v-for="(item, index) in reportTableOption" :key="index" :prop="item.prop" :label="item.label">
                </el-table-column>
              </el-table>
            </li>
          </ul>
        </div> -->
      </div>
      <div class="footer">
        <operation-wrapper>
          <iep-button type="primary" @click="back">返回</iep-button>
          <iep-button @click="reply">回复</iep-button>
          <iep-button @click="allReply">回复全部</iep-button>
          <iep-button @click="forward">转发</iep-button>
          <iep-button @click="handleDelete">删除</iep-button>
        </operation-wrapper>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { initFormData, reportTableOption } from './option'
import {
  deleteEmailById, // 发送-删除
  deleteEmailReceiverById, // 收件-删除
  emailStarById, // 星标-删除
  getEmailById} from '@/api/mlms/email/index'
import { downloadFile } from '@/api/common'

export default {
  components: {},
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.back()
        },
      },
      formData: initFormData(),
      reportTableOption,
      tableData: [
        { name: '任务A', shuoming: '内网2.0前端页面制作', jindu: '60%', fuzeren: '张超', beizhu: '以人为本，数据赋能' },
      ],
      deleteList: {
        inbox: {
          name: '收件箱',
          request: deleteEmailReceiverById,
        },
        send: {
          name: '发送',
          request: deleteEmailById,
        },
        star: {
          name: '星标',
          request: emailStarById,
        },
      },
    }
  },
  props: {
    emailType: {
      type: String,
      default: 'inbox',
    },
  },
  methods: {
    back () {
      let params = this.$route.params
      if (params.id) {
        this.$router.go(-1)
      } else {
        this.$emit('backWeb', true)
      }
    },
    // 删除
    handleDelete () {
      this.deleteList[this.emailType].request(this.formData.emailId).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.$emit('backWeb', true)
      })
    },
    // 转发
    forward () {
      this.$emit('forward', this.formData)
    },
    // 回复
    reply () {
      this.formData.receiverList = {
        unions: [],
        orgs: [],
        users: [{
          id: this.formData.sendId,
          name: this.formData.sendRealName,
        }],
      }
      this.$emit('reply', this.formData)
    },
    // 全部回复
    allReply () {
      let receiverList = {
        unions: [],
        orgs: [],
        users: [{
          id: this.formData.sendId,
          name: this.formData.sendRealName,
        }],
      }
      for (let item of this.formData.receivers) {
        receiverList.users.push({
          id: item.receiverId,
          name: item.receiverRealName,
        })
      }
      this.formData.receiverList = receiverList
      this.$emit('reply', this.formData)
    },
    // 下载附件
    downloadFile (obj) {
      console.log('obj: ', obj)
      downloadFile({
        url: obj.attachmentUrl,
        name: obj.relatiionName,
      })
    },
    // 下载全部
    downloadFileAll () {
      for (let item of this.formData.attachmentRelatios) {
        this.downloadFile(item)
      }
    },
    handleMaterialDetail (row, type) {
      this.$emit('materialDetail', row, type)
    },
  },
  created () {
    let params = this.$route.params
    if (params.id) {
      // 通过工作台进入
      getEmailById(params.id).then(({ data }) => {
        this.formData = data.data
      })
    }
  },
  watch: {
    '$route.params.id': function (v) {
      getEmailById(v).then(({ data }) => {
        this.formData = data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.inbox {
  .head {
    display: flex;
    .title {
      flex: 1;
      margin: 0;
    }
  }
  .info {
    background-color: #f6f6f6;
    padding: 25px 30px;
    margin-top: 20px;
    .title {
      font-size: 18px;
      margin-bottom: 15px;
    }
    .tags {
      margin-right: 10px;
      background-color: #fbfbfb;
      margin-bottom: 15px;
    }
    .msg {
      color: #666;
      margin-bottom: 15px;
    }
  }
  .content {
    line-height: 20px;
    border-bottom: 1px solid #eee;
    padding: 25px 30px;
    pre {
      white-space: pre-wrap; /* css-3 */
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-word;
      font-size: 14px;
      color: #333;
      font-weight: 500;
      line-height: 26px;
    }
  }
  .appendix {
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 16px;
    }
    .list {
      padding: 0 0 0 10px;
      margin: 0;
      li {
        list-style: none;
        font-size: 14px;
        i {
          margin-right: 10px;
        }
      }
    }
  }
  .relation {
    padding: 15px 30px;
    h3 {
      font-size: 16px;
    }
    .item {
      font-size: 14px;
      display: flex;
      .title {
        width: 80px;
      }
      .list {
        padding: 0 0 0 10px;
        margin: 0;
        flex: 1;
        margin-bottom: 10px;
        li {
          list-style: none;
          line-height: 22px;
          cursor: pointer;
          h5 {
            margin: 0 0 5px;
            font-weight: 500;
            font-size: 14px;
          }
        }
      }
    }
  }
  .footer {
    padding: 25px 30px;
  }
}
</style>
