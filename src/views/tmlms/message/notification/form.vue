<template>
  <basic-container>
    <page-header title="管理通报" :backOption="backOption"></page-header>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" :disabled="status === 'detail'">
        <el-form-item label="通报主题" prop="bulletinTitle">
          <el-input v-model.trim="form.bulletinTitle"></el-input>
        </el-form-item>
        <el-form-item label="通报船只">
          <el-input v-model="form.shipNames" v-if="status === 'detail'" style="width: 100%;"></el-input>
          <el-select
            v-else
            v-model="form.ids"
            style="width: 100%;"
            placeholder=""
            filterable
            remote
            multiple
            maxlength="20"
            @change="onChange"
            :remote-method="getShipNameList">
            <el-option v-for="item in shipNames" :key="item.shipId" :label="item.shipName" :value="item.shipId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通报内容" prop="content">
          <iep-froala-editor v-model="form.content" :disabled="status === 'detail'"></iep-froala-editor>
        </el-form-item>
    </el-form>
    <operation-wrapper v-if="status !== 'detail'">
      <iep-button type="primary" @click="handleSubmit" style="margin-left: 150px;">发送</iep-button>
    </operation-wrapper>
  </basic-container>
</template>
<script>
function initForm () {
  return {
    bulletinTitle: '',
    shipIds: '',
    ids: [],
    content: '',
  }
}
import { getShipNamesWithOutOrg } from '@/api/ships/index'
import { createPosPage, getPageById } from '@/api/tmlms/message/notification'
export default {
  data () {
    return {
      form: initForm(),
      shipNames: [],
      oldShipNames: [],
      status: '',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules: {
        bulletinTitle: [{ required: true, message: '请输入通报主题', trigger: 'blur' }],
        ids: [{ required: true, message: '请输入通报渔船', trigger: 'change' }],
        content: [{ required: true, message: '请输入通报内容', trigger: 'blur' }],
      },
    }
  },
  mounted () {
    let query = this.$route.query
    if (query.status) {
      this.status = query.status
      // console.log(this.status)
    }
    if (query.id) {
      this.getList(query.id)
    }
  },
  methods: {
    getList (id) {
      getPageById(id).then(({ data }) => {
        if (data.code === 0) {
          this.form = data.data
          if (this.form.ships && this.form.ships.length > 0) {
            let shipNames = []
            let shipIds = []
            this.form.ships.forEach((item) => {
              shipNames.push(item.shipName)
              shipIds.push(item.shipId)
            })
            this.form.shipNames = shipNames.join(',')
            this.form.shipIds = shipIds
          }
          // console.log('this.form', this.form)
        }
      })
    },
    getShipNameList (name) {
      if (name.length === 5) {
        getShipNamesWithOutOrg(name).then(({data}) => {
          if (data.code === 0) {
            let arr = this.oldShipNames.concat(data.data || [])
            this.shipNames = Array.from(new Set(arr))
          }
        })
      } else {
        this.shipNames = this.oldShipNames
      }
    },
    onChange (value) {
      // let arr = this.oldShipNames.concat(this.shipNames)
      this.oldShipNames = this.shipNames.filter((item) => {
        return value.includes(item.shipId)
      })
      // console.log('onChange', this.oldShipNames)
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
    handleSubmit () {
       this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            console.log(this.form)
            this.form.shipIds = this.form.ids.join(',')
            createPosPage(this.form).then(({ data }) => {
              if (data.code === 0) {
                this.$notify({
                  message: '发布成功',
                  type: 'success',
                })
                this.onGoBack()
              }
            })
          }
       })
    },
  },
}
</script>