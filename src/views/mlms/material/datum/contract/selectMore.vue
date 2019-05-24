<template>
  <el-popover
    placement="right"
    width="250"
    v-model="visible">
    <slot>
      <div class="content">
        <div class="seach">
          <el-input placeholder="请输入关键字" v-model="params.clientName" class="input-with-select" @keyup.enter.native="seachParams">
            <el-button slot="append" icon="el-icon-search" @click="seachParams"></el-button>
          </el-input>
        </div>
        <div class="list">
          <iep-scroll :load="projectState" @load-page="loadProject">
            <div class="item" v-for="item in relationlist" :key="item.clientId" @click="selectFn(item)" :class="activeIndex == item.clientId ? 'active' : ''">{{item.clientName}}</div>
          </iep-scroll>
        </div>
      </div>
    </slot>
    <el-input readonly slot="reference" v-model="formData" @click="visible = !visible"></el-input>
  </el-popover>
</template>

<script>
import IepScroll from '@/components/IepScroll/index'
import { getCommonPage } from '@/api/common'

export default {
  props: {
    prefixUrl: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  components: { IepScroll },
  data () {
    let clientId = this.value.id
    let clientName = this.value.name
    return {
      visible: false,
      relationlist: [],
      projectState: 0,
      params: {
        current: 1,
        size: 10,
        clientName: '',
      },
      formData: clientName,
      activeIndex: clientId,
    }
  },
  methods: {
    // 加载更多
    loadProject () {
      this.projectState = 4
      ++this.params.current
      this.getListFn()
    },
    getListFn () {
      getCommonPage(this.prefixUrl, this.params).then(({data}) => {
        if (data.data.records.length > 0) {
          this.projectState = 0
          this.relationlist = this.relationlist.concat(data.data.records)
        } else {
          this.projectState = 7
        }
      })
    },
    selectFn (row) {
      this.activeIndex = row.clientId
      this.formData = row.clientName
      this.$emit('input', {
        id: row.clientId,
        name: row.clientName,
      })
      this.$emit('change', row.clientId)
    },
    seachParams () {
      this.params.current = 1
      this.relationlist = []
      this.getListFn()
    },
  },
  created () {
    this.getListFn()
  },
}
</script>

<style lang="scss" scoped>
.content {
  .list {
    height: 350px;
    padding: 5px 0 0 10px;
    .item {
      cursor: pointer;
      height: 35px;
      line-height: 35px;
    }
    .active {
      color: #BA1B21;
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

