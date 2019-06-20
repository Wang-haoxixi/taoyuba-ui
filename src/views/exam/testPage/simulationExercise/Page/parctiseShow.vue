<template>
  <div>
    <basic-container>
      <page-header title="模拟练习" :data="[10, 5]"></page-header>
      <el-form :model="searchForm">
        <el-form-item label="科目：" prop="subjectList">
          <el-radio-group size="small" v-model="searchForm.subjectList" style="width: 90%;">
            <el-radio-button v-for="item in res.exms_subjects" :key="item.value" :label="item.label" :value="item.value">
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：" prop="statesList" class="statesShow">
          <el-radio-group size="small" v-model="searchForm.statesList" style="width: 90%;">
            <el-radio-button v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
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
                  <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
                    <div class="content">
                      <div class="img">
                        <img :src="item.img" alt="">
                      </div>
                      <div class="message">
                        <span class="title" style="font-size:15px;font-weight:bold;">{{item.title}}</span>
                        <div class="title" style="float:left;">共有 {{signUp}} 道题</div>
                        <div class="title" style="float:right;text-align:right;">
                          <div class="circle"></div>
                          <div style="font-size: 14px;padding-left: 15px;color: #CE3737;">新！</div>
                        </div>
                      </div>
                      <div class="handleButton">
                        <iep-button type="primary" @click="handleStart">开始练习</iep-button>
                      </div>
                    </div>
                  </el-card>
                </div>
                <div class="pagination">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[12, 24, 36, 48]" :page-size="12" layout="total, sizes, prev, pager, next, jumper" :total="20">
                  </el-pagination>
                </div>
              </div>
            </template>
          </iep-tabs>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getTestOption } from '@/api/exam/testPage/subjectTest/subjectTest'
export default {
  data () {
    return {
      res: {},
      subjects: { value: '0', label: '全部' },
      signUp: '123',
      moduleList: [
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
        {
          img: require('../img/1.jpg'),
          title: '考试名称',
          grade: '考试日期',
          date: '2019.03.10-2019.03.30',
        },
      ],
      tabList: [{
        label: '我的练习题库',
        value: 'testRecordTab',
      }],
      activeTab: 'testRecordTab',
      states: [
        { value: '0', label: '全部' },
        { value: '1', label: '已报名' },
        { value: '2', label: '进行中' },
        { value: '3', label: '未报名' },
        { value: '4', label: '已完成' },
        { value: '5', label: '批卷中' },
        { value: '6', label: '已结束' },
      ],
      searchForm: {
        subjectList: '全部',
        statesList: '全部',
      },
    }
  },
  created () {
    this.getTestOption()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    /**
     * 科目点击
     */
    handleSubject (item) {
      console.log('handleSubject => ' + item.value)
    },
    /**
     * 状态点击
     */
    handleStates (item) {
      console.log('handleStates => ' + item.value)
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
      this.res.exms_subjects.unshift(this.subjects)
      // console.log(this.res.exms_subjects)
    },
    /**
     * 开始练习
     */
    handleStart () {
      this.$confirm('此操作将开始练习, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '开始练习!',
        })
        this.$emit('onStart')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消练习',
        })
      })
      // console.log('123')
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
.circle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #ce3737;
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
    padding: 40px 0;
    text-align: center;
    display: none;
    width: 100%;
    height: 70px;
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
</style>
