<template>
  <div>
    <basic-container>
      <page-header title="专题考试" :data="[10, 5]"></page-header>
      <el-form :model="searchForm">
        <el-form-item label="科目：" prop="field">
          <el-radio-group size="small" v-model="searchForm.field" style="width: 90%;">
            <el-radio-button v-for="item in res.exms_subjects" :key="item.value" :label="item.label"
              :value="item.value" @change.native="handleSubject (item)">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：" prop="states" class="statesShow">
          <el-radio-group size="small" v-model="searchForm.states">
            <el-radio-button v-for="item in states" :key="item.value" :label="item.label" :value="item.value"
              @change.native="handleStates (item)">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="gird-product">
        <div class="leaderBoard">
          <iep-tabs v-model="activeTab" :tab-list="tabList">
            <template v-if="activeTab ==='testRecordTab'" v-slot:testRecordTab>
              <div class="record">
                <div class="module">
                  <el-card class="module-item" v-for="(item,index) in testListRes" :key="index"
                    shadow="hover">
                    <div class="content">
                      <div class="img">
                        <img src="../img/1.jpg" alt="">
                      </div>
                      <div class="message" style="overflow: hidden; padding-bottom: 10px;">
                        <span class="title" style="font-size:15px;font-weight:bold;">{{item.title}}</span>

                        <div class="detail" style="margin-bottom: 4px">
                          <template v-if="item.examStatus === 5">
                            <span style="float:left;width: 40%;">报名日期</span>
                            <span class="timeShow">{{registDate(item)}}</span>
                          </template>
                          <template v-else>
                            <span style="float:left;width: 40%;">考试日期</span>
                            <span class="timeShow">{{examDate(item)}}</span>
                          </template>
                        </div>

                        <!-- <div class="detail" v-if="item.examStatus === 5" style="margin-bottom: 4px">
                          <span style="float:left;width: 40%;">报名日期</span>
                          <span class="timeShow">{{registDate(item)}}</span>
                        </div>

                        <div class="detail" v-if="item.examStatus === 1 || item.examStatus === 0 || item.examStatus === 4 || item.examStatus === 2 || item.examStatus === 7"
                          style="margin-bottom: 4px">
                          <span style="float:left;width: 40%;">考试日期</span>
                          <span class="timeShow">{{examDate(item)}}</span>
                        </div> -->

                        <!-- <div v-if="item.examStatus !== 1 && item.examStatus !== 2 && item.examStatus !== 3 && item.examStatus !== 4"
                          class="title" style="float:left;">已有 {{item.totalEnrollment}} 人报名</div>
                        <div v-if="item.examStatus === 2 || item.examStatus === 3" class="title"
                          style="float:left;">已有 {{item.totalExam}} 人完成考试</div> -->

                        <div class="detail" style="float:left">
                          <span v-if="item.examStatus === 2 || item.examStatus === 3 || item.examStatus === 4 || item.examStatus === 7 || item.examStatus === 8">
                            <em>{{item.totalExam}}</em>人完成
                          </span>
                          <span v-else><em>{{item.totalEnrollment}}</em>人报名</span>
                        </div>

                        <div class="title" style="float:right;margin:0">
                          <div v-if="item.status !== 1 && item.examStatus === 7  && item.status!==3">
                            <div class="circleG"></div>
                            <div class="states">已报名</div>
                          </div>

                          <div v-if="(item.status === 1 && item.examStatus === 7) || item.examStatus === 0">
                            <div class="circleR"></div>
                            <div class="states">进行中</div>
                          </div>

                          <div v-if="item.examStatus === 5 && item.status!==3">
                            <div class="circleY"></div>
                            <div class="states">未报名</div>
                          </div>

                          <div v-if="item.status === 3 ">
                            <div class="circleGray"></div>
                            <div class="states">已结束</div>
                          </div>

                          <div v-if="item.examStatus === 2 && item.status!==3">
                            <div class="circleB"></div>
                            <div class="states">已完成</div>
                          </div>

                          <div v-if="item.examStatus === 1 && item.status === 1 && item.status!==3">
                            <div class="circleR"></div>
                            <div class="states">已撤销考试资格</div>
                          </div>

                        </div>
                      </div>
                      <div class="handleButton">
                        <iep-button type="primary" @click="handleStart(item)" v-if="item.status === 1 && item.examStatus === 7 && item.status!==3">开始考试</iep-button>
                        <iep-button type="success" @click="handleSign(item)" v-if="item.status === 0 && item.examStatus === 5 && item.status!==3">开始报名</iep-button>
                        <iep-button type="primary" disabled v-if="item.status !== 1 && item.examStatus === 7 && item.status!==3">等待考试</iep-button>
                        <iep-button type="info" disabled v-if="item.status === 2 && item.examStatus === 5 && item.status!==3">报名结束</iep-button>
                        <iep-button type="info" disabled v-if="item.status === 3 && item.examStatus !== 8 ">考试结束</iep-button>
                        <iep-button type="info" disabled v-if="item.examStatus === 2 && item.status!==3">考试完成</iep-button>
                        <iep-button type="success" disabled v-if="item.examStatus === 0 && item.status!==3">报名审核中</iep-button>
                        <iep-button type="danger" disabled v-if="item.examStatus === 1 && item.status === 1 && item.status!==3">报名审核不通过</iep-button>
                        <iep-button type="info" disabled v-if="item.examStatus === 3 && item.status!==3">已交卷</iep-button>
                        <iep-button type="primary" v-if="item.examStatus === 8 " @click="handleExamine(item)">查看成绩</iep-button>
                      </div>
                    </div>
                  </el-card>
                </div>
                <div class="pagination">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="paginationOption.current" :page-sizes="[12, 16, 20, 24]"
                    :page-size="paginationOption.size" layout="total, sizes, prev, pager, next, jumper"
                    :total="paginationOption.total">
                  </el-pagination>
                </div>
              </div>
            </template>
          </iep-tabs>
        </div>
      </div>
    </basic-container>
    <sign-dialog ref="SignDialog" @reload="reload"></sign-dialog>
  </div>
</template>

<script>
import { getTestOption, getTestList } from '@/api/exam/testPage/subjectTest/subjectTest'
import mixins from '@/mixins/mixins'
import SignDialog from './SignDialog'
export default {
  mixins: [mixins],
  components: { SignDialog },
  data () {
    return {
      field: null,
      pageSize: 0,
      pageTotal: 0,
      res: {},
      testListRes: {},
      fields: { value: null, label: '全部' },
      tabList: [{
        label: '我的考试记录',
        value: 'testRecordTab',
      }],
      activeTab: 'testRecordTab',
      states: [
        { value: null, label: '全部' },
        { value: 0, label: '已报名' },
        { value: 1, label: '进行中' },
        { value: 8, label: '已完成' },
        { value: 3, label: '批卷中' },
        { value: 4, label: '已结束' },
        { value: 5, label: '未报名' },
      ],
      searchForm: {
        field: '全部',
        states: '全部',
      },
      total: null,
      paginationOption: {
        current: 1,
        size: 12,
      },
      pageOption: {
        field: null,
        state: null,
        current: 1,
        size: 12,
      },
      reloadPaginationOption: {
        current: 1,
        size: 12,
      },
      reloadPageOption: {
        field: null,
        state: null,
        current: 1,
        size: 12,
      },
      choosedPaginationOption: {
        current: 1,
        size: 12,
      },
    }
  },
  created () {
    this.getTestOption()
    this.getList()
  },
  methods: {
    /**
     * 报名时间
     */
    registDate (item) {
      return `${this.dateFormat(item.signBeginTime)} - ${this.dateFormat(item.signEndTime)}`
    },
    /**
     * 考试时间
     */
    examDate (item) {
      return `${this.dateFormat(item.beginTime)} - ${this.dateFormat(item.endTime)}`
    },
    /**
     * 格式化日期
     */
    dateFormat (date) {
      return date.substr(0, 10).replace(/-/g, '/')
    },
    handleSizeChange (val) {
      this.paginationOption.size = val
      this.load()
    },
    handleCurrentChange (val) {
      this.paginationOption.current = val
      this.load()
    },
    /**
     * 选择科目
     */
    handleSubject (item) {
      this.pageOption.field = item.id
      getTestList({ ...this.pageOption, ...this.choosedPaginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
    /**
     * 选择状态
     */
    handleStates (item) {
      this.pageOption.state = item.value
      getTestList({ ...this.pageOption, ...this.choosedPaginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
    /**
     * 获取试题数据
     */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
          'exms_question_type',//题型
          'exms_question_category',//题类
          'exms_difficulty',//难度
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
      this.res.exms_subjects.reverse()
      this.res.exms_subjects.unshift(this.fields)
    },
    /**
     * 获取试题列表
     */
    getList () {
      getTestList({ ...this.pageOption, ...this.paginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
    load () {
      this.getList()
    },
    /**
     * 开始考试
     */
    handleStart (item) {
      this.$confirm('此操作将开始考试, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '开始考试!',
        })
        this.$emit('onStart', item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消考试',
        })
        // this.$emit('onStart', item)
      })
      // console.log(item)
    },
    /**
     * 开始报名
     */
    handleSign (item) {
      this.$refs['SignDialog'].dialogShow = true
      this.$refs['SignDialog'].explainList = item.description
      this.$refs['SignDialog'].consume = item.consume
      this.$refs['SignDialog'].examId = item.id
    },

    /**
     * 查看成绩
     */
    handleExamine (item) {
      this.$emit('onExamine', item)
    },
    /**
     * 报名成功重新加载
     */
    reload () {
      getTestList({ ...this.reloadPageOption, ...this.reloadPaginationOption }).then(response => {
        const { records, size, total, current } = response.data.data
        this.testListRes = records
        this.total = total
        this.paginationOption = {
          current,
          size,
          total,
        }
      })
    },
  },
}
</script>
<style scoped lang="scss">
.gird-product {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
  .leaderBoard {
    grid-column-start: 1;
    grid-column-end: 4;
    margin-top: -12px;
  }
}
.circleB {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #419eff;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-top: 5px;
}
.circleGray {
  position: absolute;
  width: 10px;
  height: 10px;
  background: gray;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-top: 5px;
}
.circleG {
  position: absolute;
  width: 10px;
  height: 10px;
  background: green;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-top: 5px;
}
.circleR {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #ff6666;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-top: 5px;
}
.circleY {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #67c23a;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin-top: 5px;
}
.module {
  display: grid;
  margin-bottom: 30px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns:
    minmax(100px, 3fr) minmax(100px, 3fr) minmax(100px, 3fr)
    minmax(100px, 3fr);
  .module-item {
    cursor: pointer;
  }
  .module-item:hover {
    .img {
      img {
        transform: scale(1.1);
      }
    }
    .message {
      display: none;
    }
    .handleButton {
      display: block;
    }
  }
  .handleButton {
    line-height: 98px;
    text-align: center;
    display: none;
    width: 100%;
    height: 98px;
  }
  .title {
    display: block;
    margin: 10px 0;
    padding: 0 10px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .img {
    position: relative;
    width: 100%;
    height: 155px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
    }
  }
  .detail {
    display: flex;
    padding: 0 10px;
    justify-content: flex-start;
    span {
      display: inline-block;
      color: #999;
    }
  }
}
.pagination {
  text-align: center;
}
</style>
<style scoped>
.header >>> .el-button {
  padding: 0;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
}
.module >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.module >>> .el-card__body {
  padding: 0;
}
.record >>> .el-tag--white {
  border: 0;
  height: 28px;
  line-height: 26px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
<style scoped>
/* TODO:scoped */
.el-radio-button__inner {
  margin-right: 10px;
  border-radius: 5px !important;
  border: 1px solid #dde0e7;
}
.statesShow {
  margin-top: -12px;
}
.timeShow {
  float: right;
  text-align: right;
  width: 60%;
}
.states {
  font-size: 13px;
  padding-left: 15px;
}
</style>

