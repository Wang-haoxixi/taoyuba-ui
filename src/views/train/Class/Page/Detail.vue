<template>
  <div class="training_detail">
    <basic-container>
        <h1>{{ $route.query.edit ? '编辑' :'新增' }}培训开班信息</h1>
        <el-form :model="trainClass" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="12">        
              <el-form-item label="开班名称:" prop="title">
                <el-input v-model="trainClass.title" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="开班时间:" prop="openTime">
                <el-date-picker v-model="trainClass.openTime" type="date" value-format="yyyy-MM-dd" placeholder="选择开班日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="报名时间:" prop="applyTime">
                <el-date-picker v-model="applyTime" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="开班地点:" prop="address">
                <el-input v-model="trainClass.address" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="人数:" prop="persons">
                <el-input v-model="trainClass.persons" placeholder="" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="培训天数:" prop="trainDays">
                <el-input v-model="trainClass.trainDays" placeholder="" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">        
              <el-form-item label="内容:" prop="content">
                <el-input v-model="trainClass.content" placeholder="" type="textarea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">        
              <el-form-item label="注意事项:" prop="note">
                <el-input v-model="trainClass.note" placeholder="" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save">提交</el-button>
          <el-button @click="$router.push('/article_spa/class_list')">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { saveClass, detailClass, updateClass } from '@/api/train/class'
export default {
  data () {
    return {
        show: false,
        trainClass: {
          title: '',
          openTime: '',
          applyStartTime: '',
          applyEndTime: '',
          address: '',
          persons: '',
          trainDays: '',
          content: '',
          note: '',
        },
        rules: {
          title: [
            { required: true, message: '请输入开班名称', trigger: 'blur' },
          ],
        },
        applyTime: [],
    }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (this.applyTime.length > 0) {
           this.trainClass.applyStartTime = this.applyTime[0]
           this.trainClass.applyEndTime = this.applyTime[1]
        }
        if (valid) {
          if (+this.$route.query.add === 0) {
            saveClass(this.trainClass).then(() => {
              this.$message.success('提交成功！')
              this.$router.push('/article_spa/class_list') 
            }).catch(err => {
              this.$message.error(err.msg)
            })
          } else if(this.$route.query.edit) {
            updateClass(this.trainClass).then(() => {
              this.$message.success('修改成功！')
              this.$router.push('/article_spa/class_list') 
            }).catch(err => {
              this.$message.error(err.msg)
            })
          }
        } else {
          return false
        }
      })
    },
    getData () {
      detailClass(this.$route.query.edit).then(data => {
        this.trainClass = data.data.data
        this.applyTime.push(this.trainClass.applyStartTime)
        this.applyTime.push(this.trainClass.applyEndTime)
      })
    },
  },
  computed: {
  },
  created () {
    if (this.$route.query.edit) {
      this.getData()
    } 
  },
  // activated () {
  //   this.$refs.form.resetFields()
  // },
}
</script>
<style lang="scss">
.el-form {
  margin-right: 16%;
}
.training_detail {
    .amap-demo {
        height: 300px;
        margin-top: 60px;
    }
    .search-box {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
    }
    .amap-page-container {
        position: relative;
    }
    .amap-logo {
        display: none;
    }
    .el-vue-search-box-container .search-tips {
        position: absolute;
        top: 100%;
        border: 1px solid #dbdbdb;
        background: #fff;
        overflow: auto;
        height: 300px;
        overflow: auto;
    }
}
</style>
