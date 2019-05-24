<template>
  <div class="librarys-content">
    <div class="librarys-item" v-for="(item,index) in list" :key="index" @click="handleDetail(item.opportunityId)">
      <div class="title">
        <h4 class="name">{{item.projectName}}</h4>
        <i :class="item.icon" v-if="item.icon"></i>
      </div>
      <p class="desc" v-text="item.opportunityDes">
      </p>
      <div class="librarys-bottom">
        <span class="reserve">对接人：{{item.publisherName}}</span>
        <span><i class="icon-shijian"></i>{{item.updateTime}}</span>
        <span><i class="icon-yanjing"></i>{{item.views}} 人浏览</span>
        <!-- <span><i class="icon-download"></i>{{item.download}} 人下载</span> -->
        <div class="tags">
          <span v-for="(item,index) in item.tagsName" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getBusinessPage } from '@/api/app/crms/'

export default {
  data () {
    return {
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
      list: [],
    }
  },
  methods: {
    searchData (val) {
      this.params.current = 1
      this.paramForm = val
      this.getBusinessPage()
    },
    getBusinessPage () {
      getBusinessPage(Object.assign({}, this.paramForm, this.params)).then(({data}) => {
        this.total = data.data.total
        this.list = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getBusinessPage()
    },
    handleDetail (id) {
      this.$router.push(`/app/resource/business/business_detail/${id}`)
    },
  },
  created () {
    this.getBusinessPage()
  },
}
</script>
<style scoped lang="scss">
.librarys-item{
  padding: 20px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.title{
  height: 40px;
  line-height: 40px;
  .name{
    display:inline-block;
    margin-right: 10px;
    color: #333;
    font-size: 16px;
  }
  i{
    color: #666;
    font-size: 20px!important;
    vertical-align: -2px;
  }
}
.desc{
  margin-bottom: 15px;
  font-size: 14px;
  color:#666;
  line-height: 28px;
}
.librarys-bottom{
  &>span{
    margin-right: 15px;
    color:#999;
    font-size: 12px;
    i{
      margin-right: 5px;
      font-size: 18px!important;
      vertical-align: -2px;
    }
  }
  .reserve{
    font-size: 14px;
  }
  .tags{
    display: inline-block;
    span{
      padding: 3px 5px;
      margin-right: 8px;
      font-size: 12px;
      color:#999;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
  }
}

</style>
