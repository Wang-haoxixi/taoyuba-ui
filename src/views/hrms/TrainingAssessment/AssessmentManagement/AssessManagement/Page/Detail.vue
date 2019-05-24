<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="****的转正申请" :backOption="backOption"></page-header>
      <div class="base-msg">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <div class="img zoom"><img id="information-avatar" alt="头像"></div>
            </div>
          </el-col>
          <el-col :span="21">
            <div class="grid-content bg-purple">
              <el-form ref="form" :model="form" label-width="100px">
                <el-col :span="7">
                  <el-form-item label="申请人：">
                    <span>{{form.name}}</span>
                  </el-form-item>
                  <el-form-item label="入职时间：">
                    <span>{{form.time}}</span>
                  </el-form-item>
                  <el-form-item label="岗位：">
                    <span>{{form.position}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="所属部门：">
                    <span>{{form.department}}</span>
                  </el-form-item>
                  <el-form-item label="转正日期：">
                    <span>{{form.date}}</span>
                  </el-form-item>
                  <el-form-item label="薪资：">
                    <span>{{form.salary}}</span>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="review">
        <el-form ref="form" :model="form" label-width="280px">
          <div class="title"> {{form.review.title}}</div>
          <el-form-item :label="item.label+'：'" v-for="(item,index) in form.review.list" :key="index">
            <span>{{item.value}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="review">
        <el-form ref="form" :model="form" label-width="280px">
          <div class="title"> {{form.opinion.title}}</div>
          <el-form-item :label="item.label+'：'" v-for="(item,index) in form.opinion.list" :key="index">
            <span>{{item.value}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="review">
        <div class="prompt"> 抄送人：{{form.sourceName}}</div>
        <div class="prompt color" readonly> 注：（审批通过后，通知抄送人）</div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      form: {
        name: '李颖',
        sourceName: '黄磊',
        time: '2019-01-20',
        position: '产品助理',
        department: '产品中心',
        date: '2019-06-20',
        salary: 3000,
        review: { title: '自我评述', list: [{ label: '服从领导安排情况', value: '绝对服从领导安排' }, { label: '完成交办任务情况', value: '基本能完成领导交办的任务' }, { label: '工作态度表现情况', value: '工作努力认真' }, { label: '工作能力与技巧', value: '现在一般在不断的进步与提升中' }, { label: '自身有点与缺点', value: '工作认真负责，不善于表达' }, { label: '其他', value: '继续学习，以人为本，数据赋能' }] },
        opinion: { title: '部门班长意见', list: [{ label: '优缺点评价', value: '绝对服从领导安排' }, { label: '试用期内工作完成情况以及存在的问题', value: '基本能完成领导交办的任务' }, { label: '下一步工作安排', value: '工作努力认真' }, { label: '转正职称考试题目以及完成情况', value: '现在一般在不断的进步与提升中' }, { label: '建议职务', value: '工作认真负责，不善于表达' }, { label: '建议职称', value: '继续学习，以人为本，数据赋能' }, { label: '审批人', value: '007' }, { label: '审批结果', value: '001' }] },
      },
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.base-msg {
  width: 100%;
  color: #606266;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 15px 0 7px 0;
  border: 1px solid #eee;
  box-shadow: 0 0 1px 1px #eee;
  .img {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
.basic-container {
  border: none;
}
.review {
  border-bottom: 1px solid #eee;
  color: #606266;
  padding: 20px;
  .title {
    padding: 15px 20px;
    font-weight: 600;
  }
  .prompt {
    padding: 0 20px 10px 20px;
  }
  .color {
    color: #ccc;
  }
}
.el-form-item {
  margin: 0;
}
</style>
