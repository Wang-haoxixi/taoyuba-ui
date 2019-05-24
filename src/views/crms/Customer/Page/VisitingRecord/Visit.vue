<template>
  <div>
    <operation-wrapper>
      <iep-button class="btn" type="primary" plain @click="handleAdd"><i class="el-icon-plus"></i>新增</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column label="创建人" width="250px" v-if="record.collaborations.length !==0">
        <template slot-scope="scope">
          <div>
            <div class="line">
              <iep-img-avatar :size="30" :src="scope.row.avatar" alt="头像"></iep-img-avatar>
            </div>
            <div class="create-name line">
              {{scope.row.realName}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleDetail(scope.row)" type="warning" plain>查看</iep-button>
            <iep-button @click="handleEdit(scope.row)" :disabled="scope.row.userId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.userId !== userInfo.userId">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
    <visit-dialog ref="VisitDialog" @load-page="loadPage"></visit-dialog>
  </div>
</template> 

<script>
import mixins from '@/mixins/mixins'
import { fetchVisitLog, deleteVisitLog, updateVisitLog, createVisitLog, fetchVisitLogById } from '@/api/crms/visiting_record'
import { visitColumnsMap } from './options'
import EditDialog from './EditDialog'
import VisitDialog from './VisitDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  props: ['record'],
  components: { EditDialog, VisitDialog },
  data () {
    return {
      id: this.record.id,
      columnsMap: visitColumnsMap,
      dialogShow: false,
      data: '',
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    handleAdd () {
      this.$refs['VisitDialog'].dialogShow = true
      this.$refs['VisitDialog'].methodName = '保存'
      this.$refs['VisitDialog'].formRequestFn = createVisitLog
      this.$refs['VisitDialog'].id = this.id
      this.$refs['VisitDialog'].created = true
      this.$refs['VisitDialog'].disabled = false
    },
    handleEdit (row) {
      fetchVisitLogById({ id: row.id }).then(res => {
        this.$refs['VisitDialog'].formData = res.data.data
      })
      this.$refs['VisitDialog'].dialogShow = true
      this.$refs['VisitDialog'].methodName = '保存'
      this.$refs['VisitDialog'].id = this.id
      this.$refs['VisitDialog'].formRequestFn = updateVisitLog
      this.$refs['VisitDialog'].isShow = true
      this.$refs['VisitDialog'].disabled = false
      this.$refs['VisitDialog'].created = false
    },
    handleDetail (row) {
      fetchVisitLogById({ id: row.id }).then(res => {
        this.$refs['VisitDialog'].formData = res.data.data
      })
      this.$refs['VisitDialog'].dialogShow = true
      this.$refs['VisitDialog'].disabled = true
      this.$refs['VisitDialog'].isShow = false
    },
    handleDeleteById (row) {
      this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteVisitLog(row.id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$emit('async')
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    loadPage (param = { ...this.searchForm, id: this.id }) {
      this.$emit('async')
      this.loadTable(param, fetchVisitLog)
    },
  },
}
</script>

<style lang="scss" scoped>
.line {
  display: inline-block;
  vertical-align: middle;
}
.create-name {
  vertical-align: middle;
  padding-left: 5px;
}
</style>
