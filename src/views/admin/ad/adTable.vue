<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleAdd">广告图片上传</el-button>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="pagedTable"
          stripe
          style="width: 100%">
          <el-table-column
            prop="title"
            label="广告名称">
          </el-table-column>
          <el-table-column
            prop="url"
            label="广告链接">
          </el-table-column>
          <el-table-column label="操作" fixed="right" label-width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <ad-dialog ref="adDialog" :status="status" @end="getList" :width="+width" :height="+height"></ad-dialog>
  </div>
</template>
<script>
import { getPicList, removePicPage } from '@/api/admin/ad'
import adDialog from './adDialog'
export default {
  components: {adDialog},
  props: {
    id: String,
    width: [Number, String],
    height: [Number, String],
  },
  data () {
    return {
      pagedTable: [],
      status: '',
    }
  },
  methods: {
    getList () {
      getPicList({posId: this.id}).then(({ data }) => {
        if (data.code === 0) {
          this.pagedTable = data.data.records
        }
      })
    },
    handleAdd () {
      this.status = 'create'
      this.$refs.adDialog.open({
        posId: this.id,
      })
    },
    handleEdit (row) {
      this.status = 'update'
      this.$refs.adDialog.open({
        id: row.id,
        posId: this.id,
      })
    },
    handleDelete (row) {
      this.$confirm('是否确认删除此条数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          removePicPage(row.id).then(({ data }) => {
            if (data.code === 0) {
              this.$notify({
                message: '删除成功',
                type: 'success',
              })
              this.getList()
            }
          })
        })
    },
  },
}
</script>