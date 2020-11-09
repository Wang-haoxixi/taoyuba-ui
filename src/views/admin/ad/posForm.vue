<template>
  <basic-container>
    <page-header :title="title" :backOption="backOption"></page-header>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" :disabled="status === 'createAd'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="广告名称" prop="title">
            <el-input v-model.trim="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户端" prop="client">
            <el-select v-model="form.client">
              <el-option v-for="item in maps.client" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="广告宽度">
            <el-input v-model.trim="form.width" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="广告长度">
            <el-input v-model.trim="form.height" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ad-table ref="adTable" v-if="status === 'createAd'" :id="posId"></ad-table>
    <operation-wrapper v-if="status !== 'createAd'">
      <iep-button type="primary" @click="handleSubmit" style="margin-left: 150px;">保存</iep-button>
    </operation-wrapper>
  </basic-container>
</template>
<script>
import maps from './maps'
import { createPosPage, updatePosPage, getPosById } from '@/api/admin/ad'
import adTable from './adTable'
export default {
  components: {adTable},
  data () {
    return {
      maps,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules: {
        client: [{ required: true, message: '请选择客户端', trigger: 'change' }],
        title: [{ required: true, message: '请输入广告名', trigger: 'blur' }],
      },
      status: '',
      form: {},
      posId: '',
    }
  },
  computed: {
    title () {
      if (this.status === 'create') {
        return '新增广告位管理'
      } else if (this.status === 'update') {
        return '编辑广告位管理'
      }
      return '广告位管理'
    },
  },
  mounted () {
    let query = this.$route.query
    if (query.status) {
      this.status = query.status
    }
    let id = query.id
    if (id && this.status === 'update') {
      this.getList(id)
    } else if (id && this.status === 'createAd') {
      this.getList(id)
      this.posId = id
      this.$refs.adTable.getList()
    }
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    getList (id) {
      getPosById(id).then(({ data }) => {
        if (data.code === 0) {
          this.form = data.data
        }
      })
    },
    handleSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let api = this.status === 'create' ? createPosPage : updatePosPage
            api(this.form).then(({ data }) => {
              if (data.code === 0) {
                this.$notify({
                  message: this.status === 'create' ? '新增成功' : '编辑成功',
                  type: 'success',
                })
                this.onGoBack()
              } else {
                this.$notify({
                  message: this.status === 'create' ? '新增失败' : '编辑失败',
                  type: 'warning',
                })
              }
            })
          }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>