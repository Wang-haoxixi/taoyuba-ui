<template>
  <div class="contract-box port-detail">
    <page-header title="新增电子台账栏目" :backOption="backOption"></page-header>
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small" :rules="rules">
        <el-row :gutter="80">
          <el-col :span="12">
              <el-form-item label="栏目名称：" prop="name">
                <el-input v-model="form.name" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="排序：" prop="sort">
                  <el-select v-model="form.sort" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="栏目描述：" >
                  <el-input v-model="form.description" type="textarea" autosize></el-input>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="sumbit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { addColumn,detail } from '@/api/admin/ad.js'
export default {
  mixins: [],
  data () {
    return {
      form: {
      },
      options: [0,1,2,3,4,5,6,7,8,9],
      loading: false,
      rules: {
        name: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
        sort: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.back() },
      },
    }
  },
  methods: {
    getDetail (id) {
      if( id ){
        detail(id).then(res=>{
          this.form = res.data.data
        })
      }else{
        this.form = {}
      }
    },
    back () {
      this.$emit('back')
    },
    // 提交
    sumbit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let form = JSON.parse(JSON.stringify(this.form))
            addColumn(form).then(res=>{
              // console.log(res)
              if(res.data.code === 0){
                this.$message.success('操作成功!')
                this.$emit('back')
              }
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
#container {
  width: 500px;
  height: 500px;
}
.contract-box {
  padding: 20px;
}
.time-consultation {
  display: flex;
  align-items: center;
  height: 45px;
  ::v-deep .el-date-editor.el-input {
    margin: 10px;
  }
  ::v-deep .el-switch {
    margin: 10px;
  }
}
.span-consultation {
  display: inline-block;
  width: 105px;
}
</style>
