<template>
  <div class="weekly">
    <div class="update-page">
      <div class="head">
        <div class="title" v-show="formData.index">{{`第${formatDig(formData.index)}周组织工作周报`}}<span class="date">（{{`${formData.startTime} ~ ${formData.endTime}`}}）</span></div>
        <!-- <div class="tips" v-if="dislogState!=='detail'">记不清楚做什么？<a class="href" @click="changePage">参考本周日报</a></div> -->
        <div class="tips update" @click="handleUpdate"><i class="el-icon-edit"></i></div>
      </div>
      <div class="content">
        <el-form ref="form" v-if="dislogState!=='detail'" :rules="rules" :model="formData">
          <div class="title">领导指示</div>
          <el-form-item>
            <el-input type="textarea" v-model="formData.leaderIndication" rows=5 placeholder="此处填写领导指示" maxlength="500"></el-input>
          </el-form-item>
          <div class="title validate">本周工作总结</div>
          <el-form-item prop="workSummary">
            <el-input type="textarea" v-model="formData.workSummary" rows=5 placeholder="此处填写本周工作总结" maxlength="1000"></el-input>
          </el-form-item>
          <div class="title validate">下周工作计划</div>
          <el-form-item prop="workPlan">
            <el-input type="textarea" v-model="formData.workPlan" rows=5 placeholder="此处填写下周工作计划" maxlength="1000"></el-input>
          </el-form-item>
          <div class="title">总结与感悟</div>
          <el-form-item>
            <el-input type="textarea" v-model="formData.summarySentiment" rows=5 placeholder="此处填写总结与感悟" maxlength="1000"></el-input>
          </el-form-item>
          <div class="relation-item">
            <div class="relation-head">市场拓展：</div>
            <div class="relation-list">
              <iep-button @click="getRelation('summary')"><i class="el-icon-plus"></i></iep-button>
              <ul>
                <li v-for="(item, index) in formData.meetingSummary" :key="index">{{item.name}} <i class="el-icon-close" style="cursor: pointer;" @click="formData.meetingSummary.splice(index, 1)"></i></li>
              </ul>
            </div>
          </div>
          <div class="relation-item">
            <div class="relation-head">相关产品：</div>
            <div class="relation-list">
              <iep-button @click="getRelation('product')"><i class="el-icon-plus"></i></iep-button>
              <ul>
                <li v-for="(item, index) in formData.productList" :key="index">{{item.name}} <i class="el-icon-close" style="cursor: pointer;" @click="formData.productList.splice(index, 1)"></i></li>
              </ul>
            </div>
          </div>
          <div class="relation-item">
            <div class="relation-head">相关项目：</div>
            <div class="relation-list">
              <iep-button @click="getRelation('project')"><i class="el-icon-plus"></i></iep-button>
              <ul>
                <li v-for="(item, index) in formData.projectList" :key="index">{{item.name}} <i class="el-icon-close" style="cursor: pointer;" @click="formData.projectList.splice(index, 1)"></i></li>
              </ul>
            </div>
          </div>
          <el-form-item>
            <iep-button @click="submit" type="primary" :loading="loadState">保存</iep-button>
          </el-form-item>
        </el-form>
        <div v-else class="detail">
          <div class="title">领导指示</div>
          <pre>{{formData.leaderIndication}}</pre>
          <div class="title">本周工作总结</div>
          <pre>{{formData.workSummary}}</pre>
          <div class="title">下周工作计划</div>
          <pre>{{formData.workPlan}}</pre>
          <div class="title">总结与感悟</div>
          <pre>{{formData.summarySentiment}}</pre>
          <div class="title">市场拓展</div>
          <pre><el-tag v-for="(item, index) in formData.meetingSummary" :key="index" type="info">{{item.name}}</el-tag></pre>
          <div class="title">相关产品</div>
          <pre><el-tag v-for="(item, index) in formData.productList" :key="index" type="info">{{item.name}}</el-tag></pre>
          <div class="title">相关项目</div>
          <pre><el-tag v-for="(item, index) in formData.projectList" :key="index" type="info">{{item.name}}</el-tag></pre>
        </div>
      </div>
    </div>

    <relation-dialog ref="relation" :type="relationType" @submit-success="relationSuccess"></relation-dialog>

  </div>
</template>

<script>
import { toChinesNum, getDateStr, getWeekStartAndEnd } from '../util'
import { updateData, createData } from '@/api/mlms/material/report/organize'
import RelationDialog from './relationDialog'

export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  components: { RelationDialog },
  data () {
    return {
      loadState: false,
      formData: {},
      dislogState: 'detail',
      rules: {
        workSummary: [{ required: true, message: '必填', trigger: 'blur' }],
        workPlan: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      relationType: 'summary',
      relationObj: {
        summary: 'meetingSummary',
        project: 'projectList',
        product: 'productList',
      },
      submitMsg: '',
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loadState = true
          // 判断这条数据是否在系统中已经生成
          let fn = () => { }
          if (this.formData.createTime) {
            fn = updateData
          } else {
            fn = createData
            this.formData.createTime = getDateStr(this.formData.timeStamp)
          }
          delete this.formData.updateTime
          this.formData.title = `第${this.formatDig(this.formData.index)}周个人工作周报`
          this.formData.meetingSummaryId = this.formData.meetingSummary.map(m => m.id)
          this.formData.projectIds = this.formData.projectList.map(m => m.id)
          this.formData.productIds = this.formData.productList.map(m => m.id)
          fn(this.formData).then(() => {
            this.loadState = false
            this.$message.success(this.submitMsg)
            this.pageState = true
            this.$emit('success-submit', true)
          })
        } else {
          return false
        }
      })
    },
    handleUpdate () {
      this.dislogState = 'update'
      // 需要根据当前时间和内容判断提示语言
      if (this.formData.workSummary !== '') { // 首先判断是新增还是修改
        this.submitMsg = '保存成功'
      } else {
        let date = getWeekStartAndEnd(new Date())
        if ((this.formData.timeStamp + 7*24*3600*1000) < +new Date(date.startYear)) { // 在本周时间内 - 正在填写的结束时间小于本周的开始时间
          this.submitMsg = '恭喜您完成周报补写，继续努力！'
        } else {
          this.submitMsg = '恭喜您完成本周周报，继续努力！'
        }
      }
    },
    formatDig (index) {
      return toChinesNum(index)
    },
    handleSelectionChange (val) {
      this.selectList = val
    },
    getRelation (type) {
      this.relationType = type
      this.$nextTick(() => {
        this.$refs['relation'].open(this.formData[this.relationObj[type]])
      })
    },
    // 提交关联
    relationSuccess (list, type) {
      this.formData[this.relationObj[type]] = list
    },
  },
  watch: {
    data (newVal) {
      this.pageState = true
      this.formData = {
        leaderIndication: '',
        workSummary: '',
        workPlan: '',
        summarySentiment: '',
        meetingSummaryId: [],
        meetingSummary: [],
        projectIds: [],
        projectList: [],
        productIds: [],
        productList: [],
      }
      this.formData = Object.assign({}, this.formData, newVal)
    },
  },
}
</script>

<style lang="scss" scoped>
.weekly {
  .update-page {
    .head {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 20px 0;
      font-size: 18px;
      .title {
        font-weight: 700;
        .date {
          font-size: 14px;
          color: #999;
          font-weight: 500;
        }
      }
      .tips {
        font-size: 14px;
        line-height: 24px;
        margin-right: 3px;
        color: #999;
        .href {
          color: #ba1b21;
          cursor: pointer;
        }
      }
      .update {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .content {
      .title {
        margin-bottom: 20px;
      }
      .detail {
        pre {
          padding-left: 20px;
          line-height: 20px;
          margin: 0;
          min-height: 50px;
          .el-tag {
            margin: 0 10px 10px 0;
          }
        }
        .title {
          font-weight: 700;
          margin-top: 10px;
        }
      }
      .relation-item {
        display: flex;
        .relation-head {
          width: 80px;
        }
        .relation-list {
          ul {
            padding: 15px 0 0;
            li {
              list-style: none;
              margin-bottom: 15px;
              i {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .detail-page {
    .footer {
      margin-top: 20px;
    }
  }
}
.validate::before {
  content: "*";
  color: #F56C6C;
  margin-right: 4px;
}
</style>
