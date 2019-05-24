<template>
  <iep-dialog :dialog-show="dialogShow" title="选择项目" width="40%" @close="resetForm('form')">
    
    
    <div class="search" style="margin-right: 10px;">
      <el-input placeholder="请输入内容" v-model="params.projectName" class="input-with-select" maxlength="20">
        <el-button slot="append" icon="el-icon-search" @click="searchProject"></el-button>
      </el-input>
    </div>
    <div class="scroll" style="height: 300px;">
      <iep-scroll :load="projectState" @load-page="loadProject">
        <div class="form">
          <div class="select-content">
            <div class="title">请从列表中选择项目</div>
            <div class="select-ul">
              <div class="select-li" v-for="(item, index) in list" :key="index">
                <el-radio v-model="selectId" :label="item.id" @change="changeVal(item.id, item.projectName)">{{item.projectName}}</el-radio>
              </div>
            </div>
          </div>
        </div>
      </iep-scroll>
    </div>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import IepScroll from '@/components/IepScroll/index'
import { getTableData } from '@/api/gpms/index'

export default {
  components: { IepScroll },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '确定',
      list: [],
      selectId: '',
      selectName: '',
      projectState: 0,
      params: { current: 1, size: 10, projectName: '' },
    }
  },
  methods: {
    open () {
      this.dialogShow = true
      this.selectId = ''
      this.selectName = ''
      this.list = []
      this.params = { current: 1, size: 10, projectName: '' }
      this.loadProject()
    },
    loadPage () {
      this.$emit('load-page')
    },
    resetForm () {
      this.dialogShow = false
    },
    submitForm () {
      if (this.selectId == '') {
        this.$message.error('请至少选择一个项目进行创建')
        return
      }
      this.$emit('selectProject', this.selectId, this.selectName)
      this.resetForm()
    },
    changeVal (id, name) {
      this.selectId = id
      this.selectName = name
    },
    // 获取项目列表
    loadProject () {
      getTableData(this.params).then(({data}) => {
        let res = data.data.records
        if (res.length > 0) {
          this.params.current++
          this.projectState = 0
          this.list = this.list.concat(res)
        } else {
          this.projectState = 7
        }
      })
    },
    searchProject () {
      this.projectState = 4
      this.list = []
      this.params.current = 1
      this.loadProject()
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.scroll {
  padding: 20px 0 0;
  .form {
    padding: 0 20px 0 30px;
    .select-content {
      .title {
        margin-bottom: 20px;
      }
      .select-ul {
        .select-li {
          margin-bottom: 15px;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>
