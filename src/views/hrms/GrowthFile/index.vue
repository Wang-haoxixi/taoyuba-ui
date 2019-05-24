<template>
  <div>
    <basic-container>
      <page-header title="员工成长档案" :backOption="backOption"></page-header>
      <el-card class="staff-headers" shadow="hover">
        <div class="left">
          <span class="img-header zoom">
            <iep-img :src="form.avatar" alt=""></iep-img>
          </span>
          <div class="name-info">
            <span class="name">{{form.name}}<a class="state" href="#">（{{simpleEmployeeStatus[form.status]}}）</a></span>
            <span class="num">{{form.staffNo}}</span>
          </div>
        </div>
        <div class="right">
          <div class="list">
            <span>部门：国脉集团、国脉先锋队</span>
          </div>
          <div class="list">
            <span>岗位：{{form.position}}</span>
            <span>职务：{{form.job}}</span>
            <span>职称：{{form.title}}</span>
          </div>
          <div class="list">
            <span>卓越标签：</span>
            <iep-tag-detail style="display: inline;" :value="form.abilityTag"></iep-tag-detail>
          </div>
          <div class="list">
            <span>专业标签：</span>
            <iep-tag-detail style="display: inline;" :value="form.projectTag"></iep-tag-detail>
          </div>
          <div class="list">
            <span>进步标签：</span>
            <iep-tag-detail style="display: inline;" :value="form.learningTag"></iep-tag-detail>
          </div>
        </div>
      </el-card>
      <el-checkbox-group class="check-group" v-model="checkList">
        <el-checkbox v-for="(item) in recordType" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
      <iep-no-data v-if="!timeLineList.length" message="暂无成长时间线数据"></iep-no-data>
      <div class="block">
        <el-timeline>
          <el-timeline-item v-for="item in timeLineList" :timestamp="item.date" placement="top" :key="item.id">
            <el-card>
              <h4>{{item.msg}}</h4>
              <p>时间：{{item.time}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { simpleEmployeeStatus, recordType, initForm } from './options'
import { getGrowthFile } from '@/api/hrms/employee_profile'
export default {
  data () {
    return {
      recordType,
      simpleEmployeeStatus,
      form: initForm(),
      checkList: [1, 2, 3, 4, 5],
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  computed: {
    timeLineList () {
      return this.form.timeLineList.filter(m => this.checkList.includes(m.type))
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getGrowthFile(this.$route.params.id).then(({ data }) => {
        this.form = data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.check-group {
  padding: 20px 50px;
}
.block {
  padding: 0 50px;
  margin-top: 20px;
}
.staff-headers {
  margin: 0 20px;
  .left {
    display: inline-flex;
    padding-right: 20px;
    width: 20%;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    vertical-align: middle;
  }
  .right {
    display: inline-block;
    padding-left: 35px;
    width: 73%;
    font-size: 14px;
    vertical-align: middle;
    border-left: 1px dashed #d7d7d7;
    .list {
      margin-bottom: 15px;
      span {
        margin-right: 5px;
      }
      .list-right {
        margin-left: 30px;
      }
    }
  }
  .img-header {
    display: inline-block;
    width: 70px;
    height: 70px;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 50%;
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: all 1s ease 0s;
    }
  }
  .name-info {
    display: inline-block;
    vertical-align: middle;
    .name,
    .num {
      display: block;
      margin-top: 8px;
    }
    .num {
      font-size: 14px;
    }
  }
  .state {
    color: #999;
  }
}
</style>
