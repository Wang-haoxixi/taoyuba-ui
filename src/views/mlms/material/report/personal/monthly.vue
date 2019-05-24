<template>
  <div class="monthly">
    <div class="update-page" v-if="pageState">
      <div class="head">
        <div class="title">个人工作月报<span class="date">{{getYearMonth(formData.timeStamp)}}</span></div>
        <div class="tips" v-if="dislogState!=='detail'">记不清楚做什么？<a class="href" @click="changePage">参考本月周报</a></div>
        <div class="tips update" v-else @click="handleUpdate"><i class="el-icon-edit"></i></div>
      </div>
      <div class="content">
        <el-form ref="form" v-if="dislogState!=='detail'" :rules="rules" :model="formData">
          <div class="title">
              领导指示
              <iep-tip :content="tipContent2.leaderIndication"></iep-tip>
          </div>
          <el-form-item>
            <el-input type="textarea" v-model="formData.leaderIndication" rows=5 placeholder="此处填写领导指示" maxlength="500"></el-input>
          </el-form-item>
          <div class="title validate">
              本月工作总结
              <iep-tip :content="tipContent2.workSummary"></iep-tip>
          </div>
          <el-form-item prop="workSummary">
            <el-input type="textarea" v-model="formData.workSummary" rows=5 placeholder="此处填写本月工作总结" maxlength="1000"></el-input>
          </el-form-item>
          <div class="title validate">
              下月工作计划
              <iep-tip :content="tipContent2.workPlan"></iep-tip>
          </div>
          <el-form-item prop="workPlan">
            <el-input type="textarea" v-model="formData.workPlan" rows=5 placeholder="此处填写下月工作计划" maxlength="1000"></el-input>
          </el-form-item>
          <div class="title">
              总结与感悟
              <iep-tip :content="tipContent2.summarySentiment"></iep-tip>
          </div>
          <el-form-item>
            <el-input type="textarea" v-model="formData.summarySentiment" rows=5 placeholder="此处填写总结与感悟" maxlength="1000"></el-input>
          </el-form-item>
          <el-form-item>
            <iep-button @click="submit" type="primary" :loading="loadState">保存</iep-button>
          </el-form-item>
        </el-form>
        <div v-else class="detail">
          <div class="title">领导指示</div>
          <pre>{{formData.leaderIndication}}</pre>
          <div class="title">本月工作总结</div>
          <pre>{{formData.workSummary}}</pre>
          <div class="title">下月工作计划</div>
          <pre>{{formData.workPlan}}</pre>
          <div class="title">总结与感悟</div>
          <pre>{{formData.summarySentiment}}</pre>
        </div>
      </div>
    </div>
    <div class="detail-page" v-else>
      <el-table ref="dailyTable" :data="weeklyTableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="开始周期" width="150">
          <template slot-scope="scope">{{ getWeekStartAndEnd(scope.row.createTime).startTime }}</template>
        </el-table-column>
        <el-table-column label="结束周期" width="150">
          <template slot-scope="scope">{{ getWeekStartAndEnd(scope.row.createTime).endTime }}</template>
        </el-table-column>
        <el-table-column prop="workSummary" label="本周工作总结"></el-table-column>
        <el-table-column prop="workPlan" label="下周工作计划"></el-table-column>
      </el-table>
      <div class="footer">
        <iep-button type="primary" @click="submitForm">确定</iep-button>
        <iep-button @click="cancelPage">返回</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
    import { tipContent2 } from './option'
import { getDateStr, getWeekStartAndEnd } from '../util'
import { updateData, createData, getTableData } from '@/api/mlms/material/report/personal'

export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
  },
  data () {
    return {
      loadState: false,
      tipContent2,
      pageState: true,
      weeklyTableData: [],
      selectList: [],
      formData: {},
      dislogState: 'detail',
      rules: {
        workSummary: [{ required: true, message: '必填', trigger: 'blur' }],
        workPlan: [{ required: true, message: '必填', trigger: 'blur' }],
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
            this.formData.reportType = 1
            this.formData.createTime = getDateStr(this.formData.timeStamp)
          }
          delete this.formData.updateTime
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
        // 判断是否是这个月内
        let firstDay = +new Date(`${new Date().getFullYear()}-${new Date().getMonth()}`)
        if (this.formData.timeStamp !== firstDay) {
          this.submitMsg = '恭喜您完成月报补写，继续努力！'
        } else {
          this.submitMsg = '恭喜您完成本月月报，继续努力！'
        }
      }
    },
    getYearMonth (timeStamp) {
      let msg = '（'
      let date = new Date(timeStamp)
      msg += date.getFullYear() + '年' + (date.getMonth() + 1) + '月）'
      return msg
    },
    changePage () {
      this.pageState = false
      getTableData({
        yearMonthTime: this.formData.time,
      }).then(({ data }) => {
        this.weeklyTableData = data.data
      })
    },
    handleSelectionChange (val) {
      this.selectList = val
    },
    submitForm () {
      let workSummary = ''
      for (let item of this.selectList) {
        workSummary += item.workSummary + '\r\n'
      }
      this.formData.workSummary += workSummary
      this.selectList = []
      this.pageState = true
      this.dailyTableData = []
    },
    cancelPage () {
      this.selectList = []
      this.pageState = true
      this.weeklyTableData = []
    },
    getWeekStartAndEnd (day) {
      return getWeekStartAndEnd(day)
    },
  },
  watch: {
    data (newVal) {
      this.formData = {
        leaderIndication: '',
        workSummary: '',
        workPlan: '',
        summarySentiment: '',
      }
      this.formData = Object.assign({}, this.formData, newVal)
    },
  },
}
</script>

<style lang="scss" scoped>
.monthly {
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
        }
        .title {
          font-weight: 700;
          margin-top: 10px;
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
