<template>
  <iep-dialog :dialog-show="dialogShow" title="添加关联" width="60%" @close="resetForm">
    <!-- transfer -->
    <div class="iep-transfer">
      <!-- 第一栏 -->
      <div class="transfer box-list">
        <ul class="list">
          <li class="item" :class="activitIndex === index ? 'selectItem' : ''" v-for="(item, index) in firstList" :key="index" @click="firstClick(item, index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="arrow"><i class="el-icon-d-arrow-right"></i></div>
      <!-- 第二栏 -->
      <div class="transfer box-list">
        <!-- <el-input class="search" placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="searchVal"></el-input> -->
        <!-- <ul class="list">
          <li class="item" :class="selectFn(item.id) ? 'selectItem' : ''" v-for="(item, index) in secondList" :key="index" @click="selectFn(item.id) ? '' : secondClick(item)">{{item.name}}</li>
        </ul> -->
        <iep-scroll :load="projectState" @load-page="loadProject">
          <ul class="list">
            <li class="item" :class="selectFn(item.id) ? 'selectItem' : ''" v-for="(item, index) in secondList" :key="index" @click="selectFn(item.id) ? '' : secondClick(item)">{{item.name}}</li>
          </ul>
        </iep-scroll>
      </div>
      <div class="arrow"><i class="el-icon-d-arrow-right"></i></div>
      <!-- 第三栏 -->
      <div class="transfer box-list">
        <ul class="list">
          <h3 class="item-title">关联项目：</h3>
          <li class="item last-item" v-for="(item, index) in transferList.projectIds" :key="index">
            <p>{{item.name}}</p>
            <i class="el-icon-close" @click="cancel(index, 'projectIds')"></i>
          </li>
        </ul>
        <ul class="list">
          <h3 class="item-title">关联材料：</h3>
          <li class="item last-item" v-for="(item, index) in transferList.materialIds" :key="index">
            <p>{{item.name}}</p>
            <i class="el-icon-close" @click="cancel(index, 'materialIds')"></i>
          </li>
        </ul>
      </div>
    </div>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">添加</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getMaterialList } from '@/api/mlms/material/datum/material'
import { getProjectList } from '@/api/gpms/index'
import IepScroll from '@/components/IepScroll/index'

export default {
  components: { IepScroll },
  data () {
    return {
      dialogShow: false,
      firstList: [
        { id: 1, name: '报表', requestFn: '' },
        { id: 2, name: '项目', requestFn: getProjectList, type: 'projectIds' },
        { id: 3, name: '材料', requestFn: getMaterialList, type: 'materialIds' },
        { id: 4, name: '日程', requestFn: '' },
        { id: 5, name: '可关联的事项分类', requestFn: '' },
      ],
      secondList: [],
      thirdList: [],
      transferList: {
        projectIds: [], // 项目
        summaryIds: [], // 纪要
        materialIds: [], // 材料
        reportIds: [], // 报表
      },
      activitIndex: -1, // 目前关联的类型
      searchVal: '',
      params: {
        current: 1,
        size: 10,
        name: '',
      },
      projectState: 0,
    }
  },
  methods: {
    loadData (list) {
      this.transferList = list
    },
    submitForm () {
      console.log('transferList: ', this.transferList)
      this.dialogShow = false
      this.$emit('relativeSubmit', this.transferList)
    },
    // 重置穿梭框
    resetForm () {
      this.secondList = [],
        this.thirdList = [],
        this.dialogShow = false
    },
    // 选择关联的类型
    firstClick (item, index) {
      this.params = {
        current: 1,
        size: 10,
        name: '',
      }
      if (!item.type) {
        this.$message.error('对不起，这块功能还未实现！')
        return
      }
      this.activitIndex = index
      this.secondList = []
      this.getListFn()
    },
    getListFn () {
      let item = this.firstList[this.activitIndex]
      item.requestFn(this.params).then(({ data }) => {
        if (data.data.records.length > 0) {
          this.projectState = 0
          if (item.name == '项目') {
            for (let t of data.data.records) {
              t.name = t.projectName
            }
          }
          this.secondList = this.secondList.concat(data.data.records)
        } else {
          this.projectState = 7
        }
      })
    },
    secondClick (item) {
      if (this.selectFn(this.thirdList, item.id)) {
        return
      }
      // 判断是由什么类型关联选中的，然后放到对应的数组中
      this.transferList[this.firstList[this.activitIndex].type].push(item)
    },
    // 判断是否已经选中
    selectFn (id) {
      for (let item of this.transferList[this.firstList[this.activitIndex].type]) {
        if (item.id === id) {
          return true
        }
      }
      return false
    },
    // 删除第三个框选中的数据
    cancel (index, type) {
      this.transferList[type].splice(index, 1)
    },
    // 加载更多
    loadProject () {
      this.projectState = 4
      ++this.params.current
      this.getListFn()
    },
  },
}
</script>

<style lang="scss" scoped>
.iep-transfer {
  margin-bottom: 25px;
  display: flex;
  .box-list::-webkit-scrollbar {
    border-radius: 10px;
    width: 6px;
    background-color: #fff;
  }
  .box-list::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
    -webkit-transition: 0.3s background-color;
    transition: 0.3s background-color;
  }
  .box-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ddd;
    -webkit-transition: 0.3s background-color;
    transition: 0.3s background-color;
    display: none;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  .box-list:hover ::-webkit-scrollbar-thumb {
    display: block;
  }
  .transfer {
    flex: 1;
    overflow-y: scroll;
    height: 300px;
    border: 1px solid #ddd;
    padding: 15px 20px;
    .list {
      .item-title {
        position: relative;
        left: -20px;
      }
      .item {
        list-style: none;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .selectItem {
        color: #409eff;
        cursor: not-allowed;
      }
      .last-item {
        cursor: text;
        position: relative;
        display: flex;
        p {
          width: calc(100% - 20px);
          margin: 0;
        }
        i {
          width: 20px;
          text-align: right;
          cursor: pointer;
          position: absolute;
          right: 10px;
          line-height: 30px;
        }
      }
    }
    .search {
      margin-bottom: 20px;
    }
  }
  .arrow {
    width: 60px;
    text-align: center;
    line-height: 300px;
    font-size: 20px;
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
