<template>
  <div class="thoughts">

    <div class="fillin">
      <el-input type="textarea" rows=5 v-model="formData.content" placeholder="工作之余，分享一下今天的感想吧" maxlength="200"></el-input>
      <div class="footer">
        <div class="state">
          <p>是否公开：</p>
          <el-switch
            v-model="formData.status"
            active-color="#13ce66"
            inactive-color="#bbb"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
        </div>
        <div class="button">
          <div class="error" v-if="createValidate">感想内容不能为空</div>
          <iep-button type="primary" @click="submit" :loading="loadState">保存</iep-button>
        </div>
      </div>
    </div>

    <div class="timeline">
      <el-col class="search">
        <div class="item">
          <el-date-picker v-model="searchData.createTime" value-format="yyyy-MM-dd 23:59:59" type="date" placeholder="选择日期" size="small" :picker-options="pickerOptions"></el-date-picker>
        </div>
        <iep-button @click="search">搜索</iep-button>
      </el-col>
      <el-col>
        <time-line :list="list" ref="timeline" @getMore="getMore" @getUpMore="getUpMore">
          <template #content="{row, index, today}">
            <div class="content">
              <div class="left">
                <pre>{{row.content}}</pre>
              </div>
              <div class="right">
                <i class="el-icon-delete" @click="handleDelete(row, index)"></i>
                <i class="icon-suoding" v-if="row.status == 1"></i>
              </div>
            </div>
          </template>
        </time-line>
      </el-col>
    </div>

  </div>
</template>

<script>
import TimeLine from './timeline'
import { thoughtsCreate, getThoughtsPage, thoughtsDelete } from '@/api/hrms/thoughts'

function initFormData () {
  return {
    content: '',
    status: 0, // 0开放、1不开放
  }
}

export default {
  name: 'thoughts',
  components: { TimeLine },
  data () {
    return {
      activeIndex: [0],
      formData: initFormData(),
      createValidate: false,
      searchData: {
        createTime: '',
      },
      loadState: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
      },
      list: [],
      params: {
        current: 1,
        size: 10,
      },
    }
  },
  methods: {
    submit () {
      if (this.formData.content == '') {
        this.createValidate = true
        return
      }
      this.createValidate = false
      this.loadState = true
      thoughtsCreate(this.formData).then(() => {
        this.$message.success('保存成功！')
        this.loadState = false
        this.params.current = 1
        this.list = []
        this.loadPage()
        this.formData = initFormData()
      })
    },
    // 获取更多
    getMore () {
      ++this.params.current
      this.loadPage()
    },
    // 向上取更多
    getUpMore () {
      
    },
    // 展开
    activeChange (val) {
      this.activeIndex = [val[val.length - 1]]
      this.$refs['timeline'].active = this.activeIndex[0]
      this.dailyState = 'detail'
      this.updateValidate = ''
    },
    search () {
      this.list = []
      this.params.current = 1
      this.loadPage()
    },
    loadPage () {
      getThoughtsPage(Object.assign({}, this.params, this.searchData)).then(({data}) => {
        if (data.data.records.length == 0) {
          this.$message.info('暂无更多数据')
          return
        }
        this.list = this.list.concat(data.data.records)
      })
    },
    handleDelete (row, index) {
      this.$confirm('是否删除此条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        thoughtsDelete([row.thoughtsId]).then(() => {
          // 判断删除的是第几页的数据，重新开始获取
          let page = parseInt(index / this.params.size)
          this.list = this.list.splice(0, page*10)
          this.params.current = page+1
          this.loadPage()
          this.$message.success('删除成功')
        })
      })
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.thoughts {
  margin-right: 16%;
  .fillin {
    padding: 10px 0 20px;
    border-bottom: 1px solid #ddd;
    .footer {
      margin-top: 20px;
      display: flex;
      div {
        width: 50%;
      }
      .state {
        text-align: left;
        p {
          display: inline;
          font-size: 14px;
          line-height: 20px;
        }
      }
      .button {
        text-align: right;
        .error {
          display: inline-block;
          font-size: 12px;
          color: red;
          margin-right: 10px;
        }
      }
    }
  }
  .timeline {
    padding: 20px 0 0;
    .search {
      margin-bottom: 20px;
      .item {
        display: inline-block;
        width: 150px;
        margin-right: 15px;
      }
    }
    .writing {
      color: #e47e33;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 5px 20px 20px;
      .left {
        width: calc(100% - 50px);
      }
      .right {
        text-align: right;
        padding-right: 4px;
        width: 30px;
        i {
          cursor: pointer;
          font-size: 18px;
        }
      }
      .footer {
        width: 100%;
        margin-top: 20px;
        .error {
          display: inline-block;
          font-size: 12px;
          color: red;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
