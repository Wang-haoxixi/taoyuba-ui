<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="methodName+'方案'" width="40%" @close="close">
    <iep-tabs v-model="activeTab" :tab-list="tabList">
      <template v-if="activeTab ==='Meterials'" v-slot:Meterials>
        <div class="header">
          <iep-button type="primary" plain size="mini" @click="handleAdd"><i class="el-icon-plus"></i>新增方案</iep-button>
          <el-input placeholder="请输入内容" v-model="materialName" :maxlength="100" size="small" class="search">
            <template slot="append">
              <el-button @click="search" size="mini">搜索</el-button>
            </template>
          </el-input>
        </div>
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          <template slot="before-columns">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <div class="custom-name">{{scope.row.name}}</div>
                <el-col class="custom-tags">
                  <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
                </el-col>
              </template>
            </el-table-column>
          </template>
          <el-table-column prop="operation" label="操作" width="100px">
            <template slot-scope="scope">
              <operation-wrapper>
                <iep-button type="warning" plain @click="select(scope.row)">添加</iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
        </iep-table>
      </template>
      <template v-if="activeTab ==='upload'" v-slot:upload>
        <el-form :model="formData" :rules="rules" ref="formName" label-width="100px" size="small">
          <el-form-item label="方案名称：" prop="programName">
            <el-input v-model="formData.programName"></el-input>
          </el-form-item>
          <el-form-item label="附件上传：" prop="attach">
            <iep-upload v-model="formData.attachs" :limit="1">
              <span>可上传任意类型的文件，每次上传数量不超过一个</span>
            </iep-upload>
            <el-input v-model="formData.attach" v-show="false" class="msg"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </iep-tabs>
    <template slot="footer" v-if="activeTab ==='upload'">
      <iep-button class="btn" @click="close">取消</iep-button>
      <iep-button type="primary" @click="submitForm('formName')">提交</iep-button>
    </template>
  </iep-drawer>
</template>

<script>
import { initForm } from './options'
import { checkName } from '@/api/crms/scheme'
import mixins from '@/mixins/mixins'
import { tableOption } from './options'
import { mapGetters } from 'vuex'
import { getTableData } from '@/api/mlms/material/datum/material'
export default {
  mixins: [mixins],
  data () {
    const check = (rules, value, callback) => {
      if (value == '') {
        callback(new Error('方案名称不能为空'))
      } else {
        checkName({ name: value, id: this.id }).then(res => {
          if (res.data.data) {
            callback()
            return false
          }
          callback(new Error('您输入的方案名称已存在，请重新输入！'))
        })

      }
    }
    const attachment = (rules, value, callback) => {
      if (value == '') {
        callback(new Error('请选择上传的文件'))
      } else {
        callback()
        return false
      }
    }
    return {
      id: '',
      showMterial: true,
      drawerShow: false,
      submitFn: () => { },
      columnsMap: tableOption,
      methodName: '',
      formData: initForm(),
      tabList: '',
      activeTab: '',
      materialName: '',
      demo: '',
      rules: {
        programName: [
          { required: true, validator: check, trigger: 'blur' },
        ],
        attach: [
          { required: true, validator: attachment, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.formData.avatar = this.userInfo.avatar
    this.formData.realName = this.userInfo.realName
    this.loadPage()
  },
  methods: {
    //新增方案
    handleAdd () {
      this.$emit('on-add')
    },
    close () {
      this.formData = initForm()
      this.drawerShow = false
    },
    submitForm (formName) {
      if (this.formData.attachs.length !== 0) {
        this.$set(this.formData, 'attach', '已上传文件')
        this.formData.atchUpload = this.formData.attachs[0].url
      } else {
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.$emit('load-page')
            this.formData = initForm()
            this.drawerShow = false
          })
        } else {
          return false
        }
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTableData)
    },

    select (row) {
      this.$confirm('此操作将关联该材料至方案, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        checkName({ name: row.materialName, id: this.formData.clientId }).then((res) => {
          console.log(res.data.data)
          if (res.data.data) {
            this.$emit('add', row)
            this.drawerShow = false
          } else {
            this.$message.error('改则材料已经存在，无法添加！')
          }
        })

      })
    },
    search () {
      this.loadTable({ name: this.materialName }, getTableData)
    },
  },
}
</script>

<style scoped>
.msg {
  margin-top: 10px;
}
.custom-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header {
  padding-bottom: 10px;
}
.search {
  width: 200px;
  float: right;
}
</style>
