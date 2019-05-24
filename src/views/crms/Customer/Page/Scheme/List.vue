<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="primary" plain @click="handleAdd"><i class="el-icon-plus"></i> 添加方案</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" :cell-style="mixinsCellPointerStyle" @row-click="handleDetail">
      <el-table-column label="方案名称">
        <template slot-scope="scope">
          <el-col>
            <div class="program-name">{{scope.row.programName}} <span class="fujian" @click.stop="lookFile" v-if="scope.row.atchUpload==''?false:true"> <i class="icon-fujian"></i></span></div>
          </el-col>
        </template>
      </el-table-column>
      <el-table-column label="附件" width="250px">
        <template slot-scope="scope">
          <el-button :class="scope.row.atchUpload==''?'cyan':'download'" @click="download(scope.row)" :disabled="scope.row.atchUpload==''?true:false">下载<i class="icon-download1"></i></el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="250px">
        <template slot-scope="scope">
          <div class=' line'>
            <iep-img-avatar :size="30" :src="scope.row.avatar" alt="头像"></iep-img-avatar>
          </div>
          <div class='create-name line'>
            {{scope.row.realName}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="relateEdit(scope.row)" type="warning" plain v-if="!scope.row.status" v-show="scope.row.creatorId===userInfo.userId">保存至材料库</iep-button>
            <iep-button @click="scope.row.status==0?localEdit(scope.row):relateEdit(scope.row)" type="warning" plain v-if="scope.row.creatorId===userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" v-if="scope.row.creatorId===userInfo.userId">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <el-row class="recommend">
      <el-col class="title">为您推荐以下参考材料： <span v-if="recommendList.length==0">无</span></el-col>
      <div class="meterial">
        <span class="item" v-for="(item, index) in recommendList" :key="index" @click="toDetail">{{item}}</span>
      </div>
    </el-row>
    <add-drawer ref="AddDrawer" @load-page="loadPage" @add="add" @on-add="OnAdd"></add-drawer>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getSchemePage, createScheme, updateScheme, deleteSchemeById, getSchemeById, getMaterial } from '@/api/crms/scheme'
import { deleteData } from '@/api/mlms/material/datum/material'
import { mapGetters } from 'vuex'
import AddDrawer from './AddDrawer'
import Detail from './Detail'
import { downloadModel } from '@/api/crms/download'
import { getDataById } from '@/api/mlms/material/datum/material'
export default {
  name: 'contacts',
  mixins: [mixins],
  components: { AddDrawer, Detail },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },

  data () {
    return {
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      dialogVisible: false,
      deleteAll: '',
      id: '',
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
      ],
      recommendList: [],
      submitFn: () => { },
      tags: ['政务网', '智慧城市'],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
    getMaterial({ clientId: this.record.id }).then((res) => {
      this.recommendList = res.data.data
    })
  },
  methods: {
    handleDetail (row, column) {
      if (column.label == '方案名称') {
        if (row.status === 0) {
          this.$refs['detail'].hide = true
          this.$refs['detail'].drawerShow = true
          getSchemeById(row.programId).then((res) => {
            this.$refs['detail'].detailForm.programName = row.programName
            this.$refs['detail'].detailForm.realName = row.realName
            this.$refs['detail'].detailForm.attachFileList = res.data.data.attachs
          })
        } else {
          this.$refs['detail'].show = true
          this.$refs['detail'].drawerShow = true
          getDataById(row.materialId).then((res) => {
            this.$refs['detail'].detailForm = res.data.data
          })
        }
      } else {
        return false
      }
    },
    //新增方案函数
    OnAdd () {
      this.$refs['AddDrawer'].drawerShow = false
      this.$emit('onEdit', { newAdd: true })
    },
    loadPage (param = this.searchForm) {
      this.$emit('load-page')
      this.loadTable({ ...param, clientId: this.record.id }, getSchemePage)
    },
    handleAdd () {
      this.$refs['AddDrawer'].formData.clientId = this.record.id
      this.$refs['AddDrawer'].id = this.record.id
      this.$refs['AddDrawer'].drawerShow = true
      this.$refs['AddDrawer'].methodName = '新增'
      this.$refs['AddDrawer'].submitFn = createScheme
      this.$refs['AddDrawer'].tabList = [{
        label: '关联材料库',
        value: 'Meterials',
      }, {
        label: '方案上传',
        value: 'upload',
      }]
      this.$refs['AddDrawer'].activeTab = 'Meterials'
    },
    //本地修改
    localEdit (row) {
      getSchemeById(row.programId).then((res) => {
        this.$refs['AddDrawer'].formData = res.data.data
      })
      this.$refs['AddDrawer'].drawerShow = true
      this.$refs['AddDrawer'].methodName = '编辑'
      this.$refs['AddDrawer'].submitFn = updateScheme
      this.$refs['AddDrawer'].tabList = [{ label: '方案上传', value: 'upload' }]
      this.$refs['AddDrawer'].activeTab = 'upload'
    },
    //保存至材料库/关联修改
    relateEdit (row) {
      if (row.materialId !== 0) {
        getDataById(row.materialId).then((res) => {
          this.$emit('onEdit', { data: res.data.data, programId: row.programId, save: false })
        })
      } else {
        this.$emit('onEdit', { data: row, programId: row.programId, save: true })
      }

    },
    handleDeleteById (row) {
      if (row.status && row.creatorId === this.userInfo.userId) {
        this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteData(row.materialId).then(() => {
          })
          deleteSchemeById(row.programId).then(res => {
            if (res.data.data) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.$emit('load-page')
            } else {
              this.$message({
                type: 'info',
                message: `删除失败，${res.data.msg}`,
              })
            }
            this.loadPage()
          })
        })
      } else {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteSchemeById(row.programId).then(res => {
            if (res.data.data) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.$emit('load-page')
            } else {
              this.$message({
                type: 'info',
                message: `删除失败，${res.data.msg}`,
              })
            }
            this.loadPage()
          })
        })
      }
    },
    download (row) {
      downloadModel(row.attachs[0].url, row.attachs[0].name)
    },
    add (val) {
      this.formData.programName = val.name
      this.formData.clientId = this.record.id
      this.formData.materialId = val.id
      this.formData.realName = val.creatorRealName
      this.formData.creator = val.creator
      this.formData.atchUpload = val.attachFile
      createScheme(this.formData).then(() => {
        this.$message({
          message: '添加方案成功',
          type: 'success',
        })
        this.loadPage()
        this.$emit('load-page')
      })
    },
    toDetail () {
      this.$message.success('功能开发中')
    },
    lookFile () {
      this.$message.success('功能开发中')
    },
  },

}
</script>

<style lang="scss" scoped>
.program-name {
  padding: 10px 0;
}
.download {
  border: 0;
  padding: 0;
  color: #409eff;
  cursor: pointer;
  i {
    margin-left: 5px;
  }
}
.cyan {
  border: 0;
  padding: 0;
  i {
    margin-left: 5px;
  }
}
.item {
  margin-top: 10px;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #d4d4d4;
  padding: 3px 10px;
  margin-right: 10px;
  &:hover {
    color: #ba1b21;
    border: 1px solid #ba1b21;
  }
}
.line {
  display: inline-block;
}
.create-name {
  padding-left: 10px;
}
.fujian {
  padding-left: 20px;
  &:hover {
    color: #409eff;
  }
}
</style>
