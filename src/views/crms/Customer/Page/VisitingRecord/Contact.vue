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
              {{scope.row.creatorName}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleDetail(scope.row)" type="warning" plain >查看</iep-button>
            <iep-button @click="handleEdit(scope.row)" :disabled="scope.row.creatorId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.creatorId !== userInfo.userId">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { fetchVisitList, deleteVisit, updateVisit, createVisit } from '@/api/crms/visiting_record'
import { columnsMap } from './options'
import EditDialog from './EditDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  props: ['record'],
  components: { EditDialog },
  data () {
    return {
      columnsMap,
      id: this.record.id,
      userId: '',
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
    loadPage (param = { ...this.searchForm, id: this.id }) {
      this.$emit('async')
      this.loadTable(param, fetchVisitList)
    },
    handleAdd () {
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].methodName = '新增'
      this.$refs['EditDialog'].submitFn = createVisit
      this.$refs['EditDialog'].id = this.id
      this.$refs['EditDialog'].disabled = false
    },
    handleEdit (row) {
      this.$refs['EditDialog'].formData = { ...row }
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].methodName = '编辑'
      this.$refs['EditDialog'].submitFn = updateVisit
      this.$refs['EditDialog'].isShow = true
      this.$refs['EditDialog'].disabled = false
    },
    handleDetail (row) {
      this.$refs['EditDialog'].formData = { ...row }
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].disabled = true
      this.$refs['EditDialog'].isShow = false
    },
    handleDeleteById (row) {
      this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteVisit(row.contactId).then(res => {
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
  },
}
</script>

<style lang="scss" scoped>
.el-tabs__item {
  height: 30px !important;
}
.line {
  display: inline-block;
  vertical-align: middle;
}
.create-name {
  vertical-align: middle;
  padding-left: 5px;
}
</style>
