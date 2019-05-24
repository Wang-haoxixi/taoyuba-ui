<template>
  <div class="edit-wrapper">
    <basic-container>
      <el-card class="edit-card" shadow="never">
        <div slot="header" class="title">
          <span>人才详情</span>
          <iep-button style="float: right; padding: 3px 0" type="text" @click="handleGoBack">返回</iep-button>
        </div>
        <el-card class="base-card" shadow="hover">
          <el-row>
            <el-col :span="5">
              <div class="name-con">
                <!-- <div class="img zoom"><img id="information-avatar" alt="头像"></div> -->
                <div class="name-info">
                  <span class="name">{{form.name}}</span>
                  <span class="time">{{form.birthday}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="detail">
                <el-form ref="form" :model="form" label-width="100px">
                  <el-col :span="8">
                    <el-form-item label="联系电话：">
                      <span>{{form.phone}}</span>
                    </el-form-item>
                    <el-form-item label="政治面貌：">
                      <iep-dict-detail :value="form.politics" dict-name="hrms_politics_face"></iep-dict-detail>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电子邮箱：">
                      <span>{{form.email}}</span>
                    </el-form-item>
                    <el-form-item label="毕业学校：">
                      <span>{{form.university}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="外部头衔：">
                      <span>{{form.title}}</span>
                    </el-form-item>
                    <el-form-item label="最高学历：">
                      <iep-dict-detail :value="form.education" dict-name="hrms_highest_educational"></iep-dict-detail>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="现住地址：">
                      <span>{{form.address}}</span>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <div class="review basic-info">
          <el-form ref="form" :model="form" label-width="120px">
            <div class="title">基础信息</div>
            <div class="con">
              <el-form-item label="身高：">
                <span>{{form.height}}</span>
              </el-form-item>
              <el-form-item label="体重：">
                <span>{{form.weight}}</span>
              </el-form-item>
              <el-form-item label="民族：">
                <span>{{form.nation}}</span>
              </el-form-item>
              <el-form-item label="健康状况：">
                <span>{{form.health}}</span>
              </el-form-item>
              <el-form-item label="婚姻状况：">
                <iep-dict-detail :value="form.marriage" dict-name="hrms_marriage_status"></iep-dict-detail>
              </el-form-item>
              <el-form-item label="生育状况：">
                <iep-dict-detail :value="form.bear" dict-name="hrms_birth_status"></iep-dict-detail>
              </el-form-item>
              <el-form-item label="员工关系：">
                <span>{{form.relation}}</span>
              </el-form-item>
              <el-form-item label="推荐人：">
                <span>{{form.referrer}}</span>
              </el-form-item>
              <el-form-item label="应聘渠道：">
                <iep-dict-detail :value="form.appWay" dict-name="hrms_app_way"></iep-dict-detail>
              </el-form-item>
              <el-form-item label="来源类型：">
                <iep-dict-detail :value="form.source" dict-name="hrms_resume_source"></iep-dict-detail>
              </el-form-item>
              <el-form-item label="兴趣爱好：">
                <span>{{form.hobbies}}</span>
              </el-form-item>
              <el-form-item label="特长及优势：">
                <span>{{form.advantage}}</span>
              </el-form-item>
              <el-form-item label="荣誉奖励：">
                <span>{{form.honor}}</span>
              </el-form-item>
              <el-form-item label="其他成果：">
                <span>{{form.result}}</span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <!-- <div class="review basic-info">
        <el-form ref="form" :model="form" label-width="110px">
          <div class="title"> {{form.opinion.title}}</div>
          <div class="con">
            <el-form-item :label="item.label+'：'" v-for="(item,index) in form.opinion.list" :key="index">
              <span>{{item.value}}</span>
            </el-form-item>
          </div>
        </el-form>
      </div> -->
        <!-- <div class="review basic-info">
        <el-form ref="form" :model="form" label-width="110px">
          <div class="title"> {{form.study.title}}</div>
          <div class="sub-title"> {{form.study.subtitle}}</div>
          <div class="con">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="unit" label="学习教育单位" width="180">
              </el-table-column>
              <el-table-column prop="time" label="起始日期" width="180">
              </el-table-column>
              <el-table-column prop="con" label="学习内容">
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div> -->
        <!-- <div class="review">
        <div class="prompt"> 抄送人：{{form.sourceName}}</div>
        <div class="prompt color" readonly> 注：（审批通过后，通知抄送人）</div>
      </div> -->
      </el-card>
    </basic-container>
  </div>
</template>
<script>

import { initForm } from '../options'
import { getTalentPoolById } from '@/api/hrms/talent_pool'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      form: initForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      getTalentPoolById(this.record.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.base-card {
  color: #606266;
  padding: 15px 0 7px 0;
  margin: 20px 20px;
  .el-row {
    display: flex;
    align-items: center;
  }
  .detail {
    padding: 0 30px;
  }
  .name-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .name-info {
      .name {
        display: block;
        margin-bottom: 10px;
        font-size: 20px;
      }
      .time {
        display: block;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
.basic-info {
  .sub-title {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
  .con {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 25%;
      &:nth-child(13),
      &:nth-child(14) {
        width: 100%;
      }
    }
  }
}
.review {
  border-bottom: 1px solid #eee;
  color: #606266;
  padding: 20px;
  .title {
    padding: 15px 20px;
    font-weight: 600;
  }
  .prompt {
    padding: 0 20px 10px 20px;
  }
  .color {
    color: #ccc;
  }
}
.el-form-item {
  margin: 0;
}
</style>
<style scoped>
.basic-info >>> .con .el-table th {
  background-color: #fafafa;
}
.basic-info >>> .el-table thead,
.basic-info >>> .el-table tbody {
  border: 1px solid #eee;
}
</style>

