<template>
  <div class="librarys-content">
    <div style="height: 100vh;" v-loading="loading" v-if="loading"></div>
    <div class="librarys-item" v-for="(item,index) in librarys" :key="index" v-else>
      <div class="handle-detail" @click="handleDetail(item)">
        <div class="title">
        <span class="type">{{item.districtTypeName}}</span>
        <h4 class="title-name">{{item.clientName}}</h4>
        <i :class="item.icon"></i>
      </div>
      <div class="links">
        <span>{{links.link}} {{item.contactNumber}} / </span>
        <span>{{links.Journal}} {{item.contactRecordNumber}} / </span>
        <span>{{links.programme}} {{item.programNumber}} / </span>
        <span>{{links.contract}} {{item.contractNumber}} / </span>
        <!-- <span>{{links.information}} {{num[4]}} / </span> -->
        <span>{{links.project}} {{item.projectNumber}}</span>
      </div>
      <div class="lib-info">
        <span>合作项目：{{item.projectName}}</span>
        <span>相关产品：{{item.productName}}</span>
        <span>项目合作伙伴：{{item.parterName}}</span>
      </div>
      </div>
      <div class="lib-bottom">
        <span>咨询/事项</span>
        <span>负责人：{{item.creatorName}}</span>
        <span><i class="icon-shijian"></i>{{item.createTime}}</span>
        <div class="tag">
            <span v-for='(item,index) in item.tagsName' :key="index">{{item}}</span>
        </div>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getCustomList } from '@/api/app/crms/'

export default {
  data () {
    return {
      num:[3,3,2,1,5,2],
      tags:['重新创业','浙江创业女杰','浙商'],
      librarys: [],
      links: {link:'联系人',Journal:'联系记录',programme:'方案',contract:'合同',information:'资讯',project:'合作项目'},
      loading: false,
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
      this.paramForm = val
      this.getCustomList()
    },
    handleDetail (row) {
      this.$router.push({
        path: `/app/resource/client/client_detail/${row.clientId}`,
      })
    },
    getCustomList () {
      this.loading = true
      getCustomList(Object.assign({}, this.paramForm, this.params)).then(({data}) => {
        this.loading = false
        this.librarys = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getCustomList()
    },
  },
  created () {
    this.getCustomList()
  },
}
</script>
<style scoped lang="scss">
.librarys-item{
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.title{
  .title-name{
    display:inline-block;
    font-size: 16px;
    color:#333;
    margin-right: 10px;
  }
  .type{
    margin-right: 10px;
    padding: 0 5px;
    font-size: 14px;
    color: #BA1B21;
    border: 1px solid #BA1B21;
    border-radius: 3px;
  }
  i{
    color: #BA1B21;
    vertical-align: baseline; 
  }
}
.links{
  margin-bottom: 10px;
  padding-left: 8px;
  font-size: 14px;
  color: #999;
}
.lib-info{
  padding:10px 20px;
  margin-bottom:10px;
  background-color: #fafafa;
  span{
    display: block;
    font-size: 14px;
    color:#666;
    line-height: 28px;
  }
}
.handle-detail{
  cursor: pointer;
}
.lib-bottom{
  &>span{
    margin-right:15px;
    color: #999;
    font-size: 12px;
    i{
      margin-right:5px;
      font-size: 18px!important;
      vertical-align: -1px;
    }
  }
  .tag{
    display:inline-block;
    font-size: 12px;
    span{
      margin-right: 8px;
      border: 1px solid #ccc;
      padding: 5px 8px;
      border-radius: 3px;
      color:#999;
      &:hover{
        background-color: #fef6f4;
        border: 1px solid #dc8687;
        color: #dc8687;
        cursor: pointer;
      }
    }
  }
}
</style>
