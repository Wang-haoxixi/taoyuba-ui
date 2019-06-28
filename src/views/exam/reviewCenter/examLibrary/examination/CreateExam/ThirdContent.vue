<template>
  <div style="margin-top:40px">
    <div class="steps-content">
      <el-card shadow="never" class="content-wrapper">
        <div slot="header">
          <span>试卷信息</span>
          <iep-button type="primary" @click="handleEdit(testPaper.id)" v-if="readOnly===false"
            style="float:right; margin-top: -5px;">编辑试卷</iep-button>
        </div>
        <el-form size="small" :model="data" label-width="100px">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="试卷名称">
                <el-input readonly v-model="testPaper.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属科目">
                <el-input readonly v-model="testPaper.fieldName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="试题数量">
                    <el-input v-model="testPaper.choiceNum" readonly>
                      <template slot="append">道</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="总分">
                    <el-input v-model="testPaper.score" readonly>
                      <template slot="append">分</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <!-- <el-col :span="4">
              <el-form-item label="试题难度:">
                <el-input v-model="testPaper.difficulty" readonly></el-input>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="创建者" style="margin-bottom: 0">
                <el-input readonly v-model="testPaper.createName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间" style="margin-bottom: 0">
                <el-input readonly v-model="testPaper.creatTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card shadow="never" class="content-wrapper">
        <div slot="header">
          <span>考试信息</span>
        </div>
        <el-form label-width="100px" :model="examForm" ref="examForm" :rules="examFormRules">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="考试名称" prop="title">
                <el-input v-model="examForm.title" placeholder="请输入考试名称" :readonly="readOnly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属科目" prop="field">
                <el-select placeholder="请选择所属科目" v-model="examForm.field" :disabled="readOnly"
                  style="width:100%">
                  <el-option v-for="(item, index) in res.exms_subjects" :key="index" :label="item.label"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="报名时间" required>
                <el-row>
                  <el-col :span="11" style="padding:0">
                    <el-form-item prop="signBeginTime">
                      <iep-date-picker v-model="examForm.signBeginTime" type="datetime" placeholder="开始时间"
                        style="width:100%" :readonly="readOnly" :picker-options="pickerOptionsSignBegin"
                        value-format="yyyy-MM-dd HH:mm:ss"></iep-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11" style="padding:0">
                    <el-form-item prop="signEndTime">
                      <iep-date-picker v-model="examForm.signEndTime" type="datetime" placeholder="结束时间"
                        style="width:100%" :readonly="readOnly" :picker-options="pickerOptionsSignEnd"
                        value-format="yyyy-MM-dd HH:mm:ss"></iep-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报名消耗" prop="consume">
                <el-input v-model.number="examForm.consume" :readonly="readOnly">
                  <template slot="append">贝</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="考试时间" required>
                <el-row>
                  <el-col :span="11" style="padding:0">
                    <el-form-item prop="signBeginTime">
                      <iep-date-picker v-model="examForm.beginTime" type="datetime" placeholder="开始时间"
                        style="width:100%" :picker-options="pickerOptionsBegin" :readonly="readOnly"></iep-date-picker>
                    </el-form-item>

                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11" style="padding:0">
                    <el-form-item prop="endTime">
                      <iep-date-picker v-model="examForm.endTime" type="datetime" placeholder="结束时间"
                        style="width:100%" :picker-options="pickerOptionsEnd" :readonly="readOnly"></iep-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="答卷时长" prop="timeLong">
                <el-input v-model="examForm.timeLong" :readonly="readOnly">
                  <template slot="append">
                    分
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="及格线" prop="passScore">
                <iep-input-number controls-position="right" :min="0" :max="testPaper.score-1"
                  v-model="examForm.passScore" style="width:100%"></iep-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="优秀线" prop="excellentLine">
                    <iep-input-number controls-position="right" :min="0" :max="testPaper.score-1"
                      v-model="examForm.excellentLine" style="width:100%"></iep-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="奖励" prop="reward">
                    <el-input v-model.number="examForm.reward" :readonly="readOnly">
                      <template slot="append">
                        贝
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-form-item label="考试说明" prop="description">
            <iep-input-area v-model="examForm.description" :readonly="readOnly"></iep-input-area>
          </el-form-item>
          <hr>
          <el-form-item>
            <el-col :span="6">
              <el-form-item prop="showResult">
                <el-switch active-text="考后显示成绩" v-model="examForm.showResult" :active-value="1"
                  :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="showAnswer">
                <el-switch active-text="考后显示答案和解析" v-model="examForm.showAnswer" :active-value="1"
                  :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="addInterview">
                <el-switch active-text="添加面试判分" v-model="examForm.addInterview" :active-value="1"
                  :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="registrationState">
                <el-switch active-text="报名自动审核通过" v-model="examForm.registrationState"
                  :active-value="1" :inactive-value="0" :disabled="readOnly"></el-switch>
              </el-form-item>
            </el-col>

          </el-form-item>
          <el-form-item label="证书信息" prop="iepCertiFicate">
            <dialog-certificate v-model="examForm.iepCertiFicate" :is-show-contact-btn="readOnly"></dialog-certificate>
          </el-form-item>
          <el-form-item label="结束语" prop="oncludingRemarks">
            <iep-input-area v-model="examForm.oncludingRemarks" :readonly="readOnly"></iep-input-area>
          </el-form-item>
          <hr>
          <el-form-item label="权限设置" required>
            <div class="permissionSettings">
              <el-form-item prop="operateIds" label="报名管理&考卷管理" label-width="150px" ref="operateValidate">
                <!-- <iep-contact-multiple-user v-model="examForm.operateUserids" :filter-user-list="filterUserList"
                  :disabled="readOnly"></iep-contact-multiple-user> -->
                <operation-wrapper class="contact-wrapper">
                    <el-select v-model="operateIds" multiple filterable  placeholder="请输入关键词" @change="clearOperate()">
                      <el-option class="dis" v-for="item in treeData" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  <el-button @click="openOperateContact()">通讯录</el-button>
                </operation-wrapper>
              </el-form-item>
              <el-form-item prop="writeIds" label="试卷审阅权限" label-width="150px" ref="writeValidate">
                <!-- <iep-contact-multiple-user v-model="examForm.writeUserids" :filter-user-list="filterUserList"
                  :disabled="readOnly"></iep-contact-multiple-user> -->
                <operation-wrapper class="contact-wrapper">
                    <el-select v-model="writeIds" multiple filterable  placeholder="请输入关键词" @change="clearWrite()">
                      <el-option class="dis" v-for="item in treeData" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  <el-button @click="openWriteContact()">通讯录</el-button>
                </operation-wrapper>
              </el-form-item>
              <el-form-item prop="faceUserIds" label="面试判分权限" label-width="150px" v-if="examForm.addInterview===1">
                <iep-contact-multiple-user v-model="examForm.faceUserIds" :filter-user-list="filterUserList"
                  :disabled="readOnly"></iep-contact-multiple-user>
              </el-form-item>
              <iep-drawer :drawer-show="dialogWriteShow" title="通讯录" width="300" @close="closeWrite" :z-index="3000">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
                  <el-tree :data="treeData">
                    <span  class="custom-tree-node" slot-scope="{ node, data }">
                      <span>{{ node.label }}</span>
                      <span>
                        <el-button :disabled="isDisabled(data)" type="text" size="mini" @click="() => selectWriteGroup(data, node)">选择</el-button>
                      </span>
                    </span>         
                  </el-tree>
              </iep-drawer>
              <iep-drawer :drawer-show="dialogOperateShow" title="通讯录" width="300" @close="closeOperate" :z-index="3000">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
                  <el-tree :data="treeData">
                    <span  class="custom-tree-node" slot-scope="{ node, data }">
                      <span>{{ node.label }}</span>
                      <span>
                        <el-button :disabled="isDisabled(data)" type="text" size="mini" @click="() => selectOperateGroup(data, node)">选择</el-button>
                      </span>
                    </span>         
                  </el-tree>
              </iep-drawer>
            </div>
          </el-form-item>

        </el-form>
      </el-card>
    </div>
    <div class="steps-action">
      <el-button style="margin-left: 8px" :loading="saveLoading" @click="handleSave()" v-if="data.methodName != '查看'">
        保存
      </el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleRelease()" v-if="data.methodName != '查看'">
        发布
      </el-button>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import DialogCertificate from '../DialogCertificate'
import { examForm, examFormRules, toDtoForm, selfToVo } from '../option'
import { save, release, getTestOption, getExam, updateSave, updateRelease } from '@/api/exam/createExam/newTest/newTest'
import { initForm } from '../../../testPaperLibrary/option'
import { getTestPaperById } from '@/api/examPaper/examPaperApi'
import { getTybListTree } from '@/api/admin/contacts'
// import { getObj } from '@/api/admin/user'
export default {
  mixins: [mixins],
  props: ['data'],
  components: { DialogCertificate },
  data () {
    return {
      submitLoading: false,
      saveLoading: false,
      examFormRules,
      examForm: examForm(),
      testPaper: initForm(),//试卷信息
      res: [],
      formRequestFn: () => { },
      pickerOptionsSignBegin: this.signBeginDate(),
      pickerOptionsSignEnd: this.signEndDate(),
      pickerOptionsBegin: this.beginDate(),
      pickerOptionsEnd: this.endDate(),
      dialogWriteShow: false,
      dialogOperateShow: false,
      filterText: '',
      treeData: [],
      filterUserList: [],
      operateIds: [],
      writeIds: [],
    }
  },
  created () {
    this.loadNode()
  },
  computed: {
    //新增/编辑
    isEdit () {
      return this.data.id ? true : false
    },
    //是否只读
    readOnly () {
      if (this.isEdit) {
        return this.data.methodName === '查看' ? true : false
      } else {
        return false
      }
    },
    ...mapGetters([
      'userInfo',
    ]),
  },
  watch: {
    'data': {
      handler () {
        this.loadSelf()
        this.getTestOption()
      },
      immediate: true,
    },
    // 'operateIds': {
    //   handler () {
    //     console.log(this.operateIds)
    //     console.log(this.treeData)
    //   },
    //   immediate: true,
    // },
    // 'writeIds': {
    //   handler () {
    //     console.log(this.writeIds)
    //     console.log(this.treeData)
    //   },
    //   immediate: true,
    // },
  },
  methods: {

    /**
     * 报名开始时间
     */
    signBeginDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.signEndTime) {
            return new Date(self.examForm.signEndTime) < time.getTime()
          }
        },
      }
    },

    /**
     * 报名结束时间
     */
    signEndDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.signBeginTime) {
            return new Date(self.examForm.signBeginTime) > time.getTime()
          }
        },
      }
    },

    /**
     * 考试开始时间
     */
    beginDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.endTime) {
            return new Date(self.examForm.endTime) < time.getTime()
          }
        },
      }
    },

    /**
     * 考试结束时间
     */
    endDate () {
      const self = this
      return {
        disabledDate (time) {
          if (self.examForm.beginTime) {
            return new Date(self.examForm.beginTime) > time.getTime()
          }
        },
      }
    },

    /**
    * 获取科目数据
    */
    async getTestOption () {
      const params = {
        numberList: [
          'exms_subjects',//考试科目
        ],
      }
      const { data } = await getTestOption(params)
      this.res = data
    },

    async loadSelf () {
      if (this.isEdit) {
        await getExam({ id: this.data.id }).then(({ data }) => {
          this.examForm = selfToVo(data.data)
          this.writeIds = this.examForm.writeUserids.map(m => m.id)
          this.operateIds = this.examForm.operateUserids.map(m => m.id)
          this.testPaper = data.data.iepTestPaperVO
        })
      } else {
        this.examForm = examForm()
        this.testPaper = this.data.iepTestPaperVO
      }

    },

    /**
     * 编辑/查看试卷
     */
    handleEdit (id) {
      getTestPaperById({ id: id }).then(({ data }) => {
        data.data[0].resource = 0
        let _exam = {
          iepTestPaperVO: data.data[0],
          methodName: this.data.methodName,
          id: this.data.id,
        }
        this.$emit('prev', _exam)
      })
    },


    /**
     * 保存
     */
    handleSave () {
      this.saveLoading = true
      this.$refs['examForm'].validate((valid) => {
        if (valid) {
          this.examForm.testPaperId = this.testPaper.id
          if (this.isEdit) {
            this.formRequestFn = updateSave
          } else {
            this.formRequestFn = save
          }
          this.formRequestFn(toDtoForm(this.examForm)).then(() => {
            this.$message({
              message: '考试保存成功',
              type: 'success',
            })
            this.$emit('on-data')
          })
        } else {
          this.saveLoading = false
        }
      })
    },

    /**
     * 发布
     */
    handleRelease () {
      this.submitDisabled = true
      this.$refs['examForm'].validate((valid) => {
        if (valid) {
          this.examForm.testPaperId = this.testPaper.id
          if (this.isEdit) {
            this.formRequestFn = updateRelease
          } else {
            this.formRequestFn = release
          }
          this.formRequestFn(toDtoForm(this.examForm)).then(() => {
            this.$message({
              message: '考试发布成功',
              type: 'success',
            })
            this.$emit('on-data')
          })
        } else {
          this.submitDisabled = false
        }
      })
    },
    loadNode () {
      if (this.treeData.length) {
        return
      }
      getTybListTree().then(({ data }) => {
        this.treeData = data.data[0].children[2].children
      })
    },
    openWriteContact () {
      this.dialogWriteShow = true
    },
    openOperateContact () {
      this.dialogOperateShow = true
    },
    closeWrite () {
      this.filterText = ''
      this.dialogWriteShow = false
    },
    closeOperate () {
      this.filterText = ''
      this.dialogOperateShow = false
    },
    selectWriteGroup (data) {
      if (!this.writeIds.includes(data.value)) {
        this.writeIds.push(data.value)
        this.examForm.writeUserids.push({
          id: data.value,
          name: data.label,
        })
      }
      this.$refs['writeValidate'].clearValidate()
    },
    selectOperateGroup (data) {
      if (!this.operateIds.includes(data.value)) {
        this.operateIds.push(data.value)
        this.examForm.operateUserids.push({
          id: data.value,
          name: data.label,
        })
      }
      this.$refs['operateValidate'].clearValidate()
    },
    isDisabled (data) {
      if(this.writeIds.includes(data.value) || this.operateIds.includes(data.value)) {
        return true
      }
      return false
    },
    // isWriteDisabled (data) {
    //   if(this.examForm.writeUserids.includes(data.value)) {
    //     return true
    //   }
    //   return false
    // },
    clearOperate () {
      // console.log(this.examForm.operateUserids)
      let operates = []
      operates = this.examForm.operateUserids.map(m => m.id)
      // console.log(operates)
      // getObj(operates).then((data) => {
      //   console.log(data)
      // })
      operates.forEach(v => {
        if (!this.operateIds.includes(v)) {
          // this.examForm.operateUserids.forEach(k => {
          //   if (v === k.id) {
          //     console.log(k)
          //     console.log('111')
          //     this.examForm.operateUserids.splice(k, 1)              
          //   }
          // })
          for (let i=0; i<this.examForm.operateUserids.length; i++) {
            if (v === this.examForm.operateUserids[i].id) {
              this.examForm.operateUserids.splice(i, 1) 
            }
          }
        }
      })
    },
    clearWrite () {
      let writes = []
      writes = this.examForm.writeUserids.map(m => m.id)
      writes.forEach(v => {
        if (!this.writeIds.includes(v)) {
          for (let i=0; i<this.examForm.writeUserids.length; i++) {
            if (v === this.examForm.writeUserids[i].id) {
              this.examForm.writeUserids.splice(i, 1) 
            }
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.steps-content {
  margin-top: 16px;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.steps-action {
  margin-top: 24px;
  text-align: center;
}

.content-wrapper {
  width: 100%;
  &:first-child {
    margin-bottom: 15px;
  }

  .el-form {
    .el-form-item {
      .el-row {
        .line {
          text-align: center;
        }
      }
      .permissionSettings {
        border: 1px solid #c0c4cc;
        padding: 20px;
        .el-form-item {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

<style scoped>
.permissionSettings >>> .el-form-item__label {
  line-height: 32px;
}
.contact-wrapper {
  display: flex;
}
.contact-wrapper
  >>> .ant-select-selection__choice__content
  > span:nth-child(2) {
  display: none;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.dis {
  display:none;
}
</style>
