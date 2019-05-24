<template>
  <div>
    <search @load-page="searchPage"></search>
    <div class="person" v-loading="loading">
      <div class="person-item" v-for="(item,index) in personList" :key="index" @click="handleDetail(item.id)">
        <div class="img"><img :src="item.avatar" alt=""></div>
        <div class="text">
          <span class="name">{{item.name}}<span class="dn show1 show" v-if="item.isExpert == 1">V</span></span>
          <span class="job">{{item.externalTitle}}</span>
          <span class="sign">
            <span v-for="(sign, index) in item.abilityTag" :key="index">{{sign}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './ExpertSearch'
import { getRecruitDetailPage } from '@/api/app/hrms/'

export default {
  data () {
    return {
      loading: false,
      personList: [],
      total: 0,
      params: {
        current: 1,
        size: 12,
      },
      paramData: {},
    }
  },
  components: {
    Search,
  },
  methods: {
    searchPage (params) {
      this.paramData = params
      this.loadPage()
    },
    loadPage () {
      this.loading = true
      let obj = Object.assign({}, this.params, this.paramData)
      getRecruitDetailPage(obj).then(({data}) => {
        this.loading = false
        this.personList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    handleDetail (id) {
      this.$router.push(`/app/personal_style/${id}`)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style scoped lang="scss">
.person {
  min-height: 100px;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .person-item {
    cursor: pointer;
    display: flex;
    .img {
      margin-right: 15px;
      margin-bottom: 25px;
      width: 90px;
      height: 90px;
      border: 1px solid #dcdfe6;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .text {
      width: 60%;
      .job {
        color: #888;
      }
      .sign {
        color: #aaa;
        span {
          position: relative;
          display: inline-block;
          padding: 0 10px;
          cursor: pointer;
          &:hover {
            color: #ba1b21;
          }
          &:nth-child(1) {
            padding-left: 0;
          }
          &::before {
            position: absolute;
            content: "";
            top: 15px;
            right: -7px;
            width: 15px;
            height: 1px;
            background-color: #aaa;
            transform: rotate(125deg);
            -o-transform: rotate(125deg);
            -moz-transform: rotate(125deg);
            -webkit-transform: rotate(125deg);
          }
          &:last-child::before {
            background-color: #fff;
          }
        }
      }
      .name,
      .job,
      .sign {
        min-height: 30px;
        display: block;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
        font-size: 14px;
        margin-bottom: 0;
      }
      .name {
        font-size: 16px;
        color: #333;
        .dn {
          opacity: 0;
        }
        .show {
          opacity: 1;
        }
        .show1 {
          display: inline-block;
          margin: 0 5px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          font-size: 12px;
          line-height: 15px;
          text-align: center;
          background-color: #cb3737;
          color: #fff;
        }
        .show2 {
          display: inline-block;
          border-radius: 2px;
          width: 15px;
          height: 15px;
          line-height: 12px;
          font-size: 12px;
          text-align: center;
          border: 1px solid #cb3737;
          color: #cb3737;
        }
      }
    }
  }
}
.page {
  text-align: center;
}
</style>
