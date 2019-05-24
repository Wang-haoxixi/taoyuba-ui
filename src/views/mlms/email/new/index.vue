<template>
  <div class="new iep-page-form">
    <basic-container>
      <page-header title="新建邮件" :backOption="backOption"></page-header>
      <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="100px" class="form">
        <el-form-item label="邮件类型：">
          <el-radio-group v-model="formData.type">
            <el-radio-button v-for="(item, index) in emailType" :key="index" :label="item.value">{{item.name}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收件人：" prop="receiverList" class="validate">
          <span slot="label">
            收件人
            <iep-tip :content="tipContent.receiverList"></iep-tip>：
          </span>
          <!-- <iep-tag v-model="formData.receiverIds"></iep-tag> -->
          <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
        </el-form-item>
        <el-form-item label="主题：" prop="subject">
          <span slot="label">
            主题
            <iep-tip :content="tipContent.subject"></iep-tip>：
          </span>
          <el-input v-model="formData.subject" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item class="relation">
          <div class="item">
            <el-form-item label="附件列表：" label-width="90px">
              <span slot="label">
                附件列表
                <iep-tip :content="tipContent.attachmentList"></iep-tip>
              </span>
              <iep-upload v-model="formData.attachmentList" :limit='limit'></iep-upload>
              <!-- <ul class="list">
              <li class="li" v-for="(item, index) in formData.materialIds" :key="index">
                <i class="icon-fujian"></i> {{item.name}}
                <iep-button type='text'>删除</iep-button>
              </li>
            </ul> -->
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item>
          <iep-button @click="addRelation">添加关联</iep-button>
        </el-form-item>
        <el-form-item class="relation">
          <div class="item">
            <!-- <el-form-item label="关联任务：" label-width="90px">
            <ul class="list">
              <li class="li">显示关联任务1号</li>
              <li class="li">显示关联任务2号</li>
            </ul>
          </el-form-item> -->
            <el-form-item label="关联资源：" label-width="90px">
              <span slot="label">
                关联资源
                <iep-tip :content="tipContent.transferList"></iep-tip>
              </span>
              <ul class="list" v-if="this.formData.transferList.projectIds.length > 0">
                <li class="li" v-for="(item, index) in this.formData.transferList.projectIds" :key="index">{{item.name}} <i class="el-icon-close" @click="deleteRelatios('projectIds', index)"></i></li>
              </ul>
              <ul class="list" v-if="this.formData.transferList.materialIds.length > 0">
                <li class="li" v-for="(item, index) in this.formData.transferList.materialIds" :key="index">{{item.name}} <i class="el-icon-close" @click="deleteRelatios('materialIds', index)"></i></li>
              </ul>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="邮件标签：" prop="tagKeyWords">
          <span slot="label">
            邮件标签
            <iep-tip :content="tipContent.tagKeyWords"></iep-tip>：
          </span>
          <iep-tag v-model="formData.tagKeyWords" plus @selectTags="selectTags"></iep-tag>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <span slot="label">
            正文
            <iep-tip :content="tipContent.content"></iep-tip>：
          </span>
          <!-- <el-input type="textarea" rows=5 v-model="formData.content" :maxlength="2000"></el-input> -->
          <iep-froala-editor v-model="formData.content"></iep-froala-editor>
        </el-form-item>
        <el-form-item>
          <operation-wrapper>
            <iep-button type="primary" @click="submitForm('form')">发送</iep-button>
            <iep-button @click="submitDraft('form')">保存为草稿</iep-button>
            <iep-button @click="resetForm('form')">重置表单</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
    <main-dialog ref="relation" @relativeSubmit="relativeSubmit"></main-dialog>
  </div>
</template>

<script>
// import MainDialog from './mainDialog'
import MainDialog from './relationDialog'
import { createEmail, updateEmail } from '@/api/mlms/email/index'
import { initFormData, rules, tipContent } from './option'

export default {
  components: { MainDialog },
  data () {
    return {
      formData: initFormData(),
      tipContent,
      rules,
      pageState: 'new',
      backOption: {
        isBack: false,
        backPath: null,
        backFunction: () => {
          this.$emit('load-page', this.backType)
        },
      },
      limit: 99,
      emailType: [
        { name: '普通', value: 0 },
        { name: '批示', value: 1 },
      ],
      backType: 'list',
    }
  },
  methods: {
    open (row) {
      this.pageState = 'draft'
      this.backOption.isBack = true
      row.receiverIds = row.receivers.map(m => m.receiverId)
      row.receiverList = {
        unions: [],
        orgs: [],
        users: this.dealWithList(row.receivers, [{ O: 'id', X: 'receiverId' }, { O: 'name', X: 'receiverRealName' }]),
      }
      row.transferList = {
        projectIds: this.dealWithList(row.projectRelatios, [{ O: 'id', X: 'relatiionId' }, { O: 'name', X: 'relatiionName' }]),
        summaryIds: [],
        materialIds: this.dealWithList(row.materialRelatios, [{ O: 'id', X: 'relatiionId' }, { O: 'name', X: 'relatiionName' }]),
        reportIds: [],
      }
      row.attachmentList = this.dealWithList(row.attachmentRelatios, [{ O: 'url', X: 'attachmentUrl' }, { O: 'id', X: 'relatiionId' }, { O: 'name', X: 'relatiionName' }])
      this.formData = row
      this.relativeSubmit(row.transferList)
    },
    dealWithList (row, field) {
      let list = []
      for (let item of row) {
        let obj = {}
        for (let t of field) {
          obj[t.O] = item[t.X]
        }
        list.push(obj)
      }
      return list
    },
    resetForm () {
      this.$refs['form'].resetFields()
      this.formData = initFormData()
    },
    // 处理数据
    dealReceiverList () {
      this.relativeSubmit(this.formData.transferList)
      this.formData.receiverIds = this.formData.receiverList.users.map(m => m.id) // 接收人
      this.formData.orgIds = this.formData.receiverList.orgs.map(m => m.id) // 组织
      this.formData.attachmentIds = this.formData.attachmentList.map(m => m.id)
    },
    // 发送
    submitForm (formName) {
      this.dealReceiverList()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.status = 1
          let fn = this.pageState == 'draft' ? updateEmail : createEmail
          fn(this.formData).then(() => {
            this.$message({
              message: '发送邮件成功',
              type: 'success',
            })
            this.formData = initFormData()
            if (this.pageState !== 'new') {
              console.log('new')
              this.$emit('load-page', 'list')
            } else {
              console.log('sent')
              this.$router.push('/wel/mail/sent')
            }
            if (this.$route.query.back) {
              this.$router.push(this.$route.query.back)
            }
          })
        } else {
          return false
        }
      })
    },
    // 保存草稿
    submitDraft () {
      this.dealReceiverList()
      this.formData.status = 0
      let fn = this.pageState == 'draft' ? updateEmail : createEmail
      fn(this.formData).then(() => {
        this.$message({
          message: '保存草稿成功',
          type: 'success',
        })
        this.formData = initFormData()
        if (this.pageState !== 'new') {
          this.$emit('load-page', 'list')
        } else {
          this.$router.push('/wel/mail/draft')
        }
      }).catch((res) => {
        this.$message.error(res.toString())
      })
    },
    addRelation () {
      this.$refs['relation'].dialogShow = true
      this.$refs['relation'].loadData(this.formData.transferList)
    },
    // 选择标签
    selectTags () { },
    // 关联项
    relativeSubmit (val) {
      this.formData.materialIds = val.materialIds.map(m => m.id)
      this.formData.projectIds = val.projectIds.map(m => m.id)
      this.formData.transferList = val
    },
    // 删除关联
    deleteRelatios (key, index) {
      this.formData.transferList[key].splice(index, 1)
    },
  },
  created () {
    this.formData = initFormData()
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 80%;
  .material {
    .list {
      margin: 0;
      border: 1px dashed #ddd;
      padding: 5px 10px;
      .li {
        height: 30px;
        line-height: 30px;
        list-style: none;
      }
    }
  }
  .relation {
    .item {
      border: 1px dashed #ddd;
      border-radius: 5px;
      .list {
        margin: 0;
        padding: 5px 0 0;
        .li {
          height: 30px;
          line-height: 30px;
          color: #999;
          list-style: none;
          i {
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
<style>
.validate label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>

