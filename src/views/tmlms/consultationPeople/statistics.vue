<template>
  <div class="contract-box port-detail">
    <page-header title="面对面培训统计" :backOption="backOption"></page-header>
    <basic-container>
      <div class="title-information">
        <h1>基本情况展示</h1>
        <div class="base-information">
          <div>
            <p>参会人员</p>
            <p><span>444</span>人</p>
            <i class="base-right"></i>
          </div>
          <div>
            <p>船东</p>
            <p><span>444</span>人</p>
            <i class="base-right"></i>
          </div>
          <div>
            <p>渔船监护人</p>
            <p><span>444</span>人</p>
            <i class="base-right"></i>
          </div>
          <div>
            <p>培训次数</p>
            <p><span>444</span>人</p>
          </div>
        </div>
      </div>
      <div class="title-information">
        <div class="search-table-information">
          <h3>合作社</h3>
          <div class="search-table-information">
            <div style="width: 100px">
              <span>
                <i class="el-icon-arrow-left"></i>
              </span>
              <span>
                <i class="el-icon-arrow-right"></i>
              </span>
            </div>
              <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="input1">
              </el-input>
          </div>
        </div>
        <el-table
            :data="list"
            stripe
            style="width: 100%">
            <el-table-column
              prop="realName"
              label="排名"
            >
            </el-table-column>
            <el-table-column
              prop="合作社"
              label="合作社"
            >
            </el-table-column>
            <el-table-column
              prop="船东"
              label="船东"
            >
            </el-table-column>
            <el-table-column
              prop="职务船员"
              label="职务船员"
            >
            </el-table-column>
            <el-table-column
              prop="渔船监护人"
              label="渔船监护人"
            >
            </el-table-column>
          </el-table>
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total="page.total"
            :page-size="page.size"
            :current-page.sync="page.current"
            @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
      <div class="title-information">
        <div style="text-align: right">
          <el-button size="mini">船东</el-button>
          <el-button size="mini">职务船员</el-button>
          <el-button size="mini">渔船监护人</el-button>
        </div>
        <div id="mapZhe" style="width: 100%;height:400px;"></div>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
export default {
  mixins: [],
  data () {
    return {
      form: {},
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.back() },
      },
      input1: '',
      list: [],
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
    }
  },
  methods: {
    getDetail () {},
    back () {
      this.$emit('back')
    },
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {},
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.mapZhe = this.$echarts.init(document.getElementById('mapZhe'))
    let option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            lineStyle:{
              color:'#f84436',
            },
        }],
    }
    this.mapZhe.setOption(option)
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.contract-box {
  padding: 20px;
  .search-table-information {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: inline-block;
      padding: 0px 5px;
      margin-right: 10px;
      border: 1px solid #ccc;
    }
  }
  .title-information {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 12px;
    margin-bottom: 30px;
  }
  .base-information {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    padding: 20px 40px 0;
    div {
      width: 25%;
      position: relative;
      text-align: center;
      i {
        display: block;
        position: absolute;
        right: 0;
        top: 25px;
        width: 1px;
        height: 40px;
        background: #ccc;
      }
    }
    p {
      span {
        color: #3b3b3b;
        font-size: 20px;
        margin-right: 5px;
        display: inline-block;
        letter-spacing: 2px;
      }
      color: #a2a2a2;
    }
  }
}
</style>
