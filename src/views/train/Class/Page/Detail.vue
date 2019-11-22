<template>
  <div class="training_detail">
    <basic-container>
      <div style="display: flex">
        <h1 style="flex: 1">{{ $route.query.edit ? '编辑' :'新增' }}培训开班信息</h1>
        <el-button size="mini" style="width: 60px; height:35px" @click="$router.push('/article_spa/class_list')">返回</el-button>
      </div>
        <el-form :model="trainClass" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="12">        
              <el-form-item label="开班名称:" prop="title">
                <el-input v-model="trainClass.title" placeholder="" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="培训时间:" prop="classTime">
                <!-- <el-date-picker v-model="trainClass.openTime" type="date" value-format="yyyy-MM-dd" placeholder="选择开班日期"></el-date-picker> -->
                <el-date-picker v-model="classTime" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开班日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>  
            <el-col :span="12">        
              <el-form-item label="报名时间:" prop="applyTime">
                <el-date-picker v-model="applyTime" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="开班地点:" prop="address">
                <el-input v-model="trainClass.address" placeholder="" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">        
              <el-form-item label="人数:" prop="persons">
                <el-input v-model="trainClass.persons" placeholder="" type="number" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="培训天数:" prop="trainDays">
                <el-input v-model="trainClass.trainDays" placeholder="" type="number" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>  
            <el-col :span="12">        
              <el-form-item label="注意事项:" prop="note">
                <el-input v-model="trainClass.note" placeholder="" type="textarea"></el-input>
                <!-- <iep-froala-editor v-model="trainClass.note"></iep-froala-editor> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">        
              <el-form-item label="内容:" prop="content">
                <!-- <el-input v-model="trainClass.content" placeholder="" type="textarea"></el-input> -->
                <iep-froala-editor v-model="trainClass.content"></iep-froala-editor>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <page-header style="margin-top:50px" title="课程项目"></page-header>
        <div v-for="(item, index) in trainClass.tybTrainLessonList" :key="index">
          <el-form label-width="150px" size="small">
            <el-row>
              <el-col :span="12">
                <el-form-item label="课程标题：" prop="title">
                  <el-input v-model="item.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程时间：" prop="lessonTime">
                  <el-date-picker v-model="item.lessonTime" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="课程内容：" prop="content">
                  <el-input type="textarea" v-model="item.content"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="4" style="text-align:center">
                  <el-button type="primary" size="small" plain @click="remove(index)">删除</el-button>
                </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="text-align:center">
          <iep-button style="width: 86%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" plain @click="newMember">新增</iep-button>
        </div>
        <div style="margin-left: 150px">
          <el-button size="mini" type="primary" @click="save">提交</el-button>
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
          finishTime: '',
          applyStartTime: '',
          applyEndTime: '',
          address: '',
          persons: '',
          trainDays: '',
          content: '',
          note: '',
          tybTrainLessonList: [],
          listOfIds: [],
        },
        rules: {
          title: [
            { required: true, message: '请输入开班名称', trigger: 'blur' },
          ],
        },
        applyTime: [],
        classTime: [],
        dels: [],
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
        if (this.classTime.length > 0) {
           this.trainClass.openTime = this.classTime[0]
           this.trainClass.finishTime = this.classTime[1]
        }
        if (this.trainClass.tybTrainLessonList.length > 0) {
          this.trainClass.tybTrainLessonList.forEach(m => {
            m.lessonStart = m.lessonTime[0]
            m.lessonEnd = m.lessonTime[1]
          })
        }
        if (this.dels.length > 0) {
          this.trainClass.listOfIds = this.dels
        }
        this.trainClass.tybTrainLessonList.forEach(v => {
          if(typeof(v.lid) === 'string') {
            v.flag = 'ad'
          } else {
            v.flag = 'up'
          }
        })
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
        this.classTime.push(this.trainClass.openTime)
        this.classTime.push(this.trainClass.finishTime)
        if (this.trainClass.tybTrainLessonList) {
          let i = 0
          this.trainClass.tybTrainLessonList.forEach(v => {
            this.$set(v, 'lessonTime', [])
            v.lessonTime.push(v.lessonStart)
            v.lessonTime.push(v.lessonEnd)
            this.$set(v, 'lid', i++)
          })
        }
      })
    },
    newMember () {
      if (!this.trainClass.tybTrainLessonList) {
        this.$set(this.trainClass, 'tybTrainLessonList',[])
      }
      const length = this.trainClass.tybTrainLessonList.length
      this.trainClass.tybTrainLessonList.push({
        lid: length ? (parseInt(this.trainClass.tybTrainLessonList[length - 1].lid) + 1).toString() : '0',
      })
      // this.addList.push(this.trainClass.tybTrainLessonList.length)
      // const length = this.form.certList.length
      // if (length < 2) {
      //   this.form.certList.push({
      //     id: length ? (parseInt(this.form.certList[length - 1].id) + 1).toString() : '0',
      //   })
      // } else {
      //   this.$message({
      //     message: '最多两个证书',
      //     type: 'warning',
      //   })
      // }
    },
    remove (index) {
      if (this.trainClass.tybTrainLessonList) {
        let i = 0
        this.trainClass.tybTrainLessonList.forEach(v => {
          this.$set(v, 'lid', i++)
        })
      }
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(index)
        console.log(this.trainClass.tybTrainLessonList)
        if (this.trainClass.tybTrainLessonList.length > 1) {
          const newCase = this.trainClass.tybTrainLessonList.filter(item => item.lid != index)
          this.dels.push(this.trainClass.tybTrainLessonList[index].id)
          this.trainClass.tybTrainLessonList = newCase
        } else if (this.trainClass.tybTrainLessonList.length === 1) {
          const newCase = this.trainClass.tybTrainLessonList.filter(item => item.lid == 2)
          this.dels.push(this.trainClass.tybTrainLessonList[index].id)
          this.trainClass.tybTrainLessonList = newCase   
        }
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
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
