<template>
  <div class="librarys-content">
    <div v-for="(item,index) in dataList" :key="index" class="piece" >
      <div style="cursor: pointer;" @click="handleOpen(item)">
        <div class="title">
          <h4 class="name">{{item.name}}</h4>
          <i class="iconfont icon-caifu" v-if="item.downloadCost !== '0'"></i>
          <i class="iconfont icon-fujian" v-if="item.attachFile !== ''"></i>
        </div>
        <p>{{item.intro}}</p>
        <div class="box">
          <span class="uploaded">上传者：{{item.creatorRealName}}</span>
          <span><i class="iconfont icon-shijian"></i>{{item.createTime}}</span>
          <span><i class="iconfont icon-yanjing"></i>{{item.views}}人浏览</span>
          <span><i class="iconfont icon-download1"></i>{{item.downloadTimes}}人下载</span>
        </div>
      </div>
      <div v-for="(item,index) in item.tagKeyWords" :key="index" class="label">
        <span>{{item}}</span>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import { getMaterialLPage } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      dataList: [],
      secondClass: '',
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
    }
  },
  methods:{
    searchData (val) {
      this.params.current = 1
      this.paramForm = Object.assign({}, this.paramForm, val)
      this.loadPage()
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/resource/material/material_detail/${row.id}`,
      })
    },
    loadPage () {
      getMaterialLPage(Object.assign({}, this.paramForm, this.params)).then(({data}) => {
        this.dataList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
.piece {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  & > p {
    font-size: 14px;
    color: #666;
    line-height: 28px;
  }
}
.title {
  .name {
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
    color:#333;
  }
  i {
    margin-right: 10px;
    font-size: 22px;
    color: #aaa;
    vertical-align: -2px;
  }
}
.box {
  margin-bottom: 15px;
  span {
    margin-right: 20px;
    color: #aaa;
    i {
      margin-right: 5px;
      font-size: 18px;
      color: #aaa;
      vertical-align: -2px;
    }
  }
}
.label {
  display: inline-block;
  margin-bottom: 15px;
  & > span {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 12px;
    color: #666;
    &:hover{
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
      cursor: pointer;
    }
  }
}
</style>
