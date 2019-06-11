<template>
  <div>
    <el-table :data="data" style="width: 100%" border size="small">
      <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columns" :key="idx">
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <iep-date-picker v-if="item.type === 'date'" type="date" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-date-picker>
            <iep-date-range-select v-else-if="item.type === 'daterange'" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-date-range-select>
            <iep-upload-select v-else-if="item.type === 'file'" size="mini" v-model="scope.row[item.prop]"></iep-upload-select>
            <iep-dict-select v-else-if="item.type === 'dict'" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" :dict-name="item.dictName"></iep-dict-select>
            <iep-input-area v-else-if="item.type === 'area'" :maxlength="1000" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" :autosize="{minRows: 1}"></iep-input-area>
            <iep-select v-else-if="item.type === 'list'" size="mini" :prefixUrl="item.prefixUrl" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-select>
            <el-input v-else :maxlength="100" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" clearable></el-input>
          </template>
          <template v-else>
            <iep-dict-detail v-if="item.type === 'dict'" size="mini" :value="scope.row[item.prop]" :dict-name="item.dictName"></iep-dict-detail>
            <iep-date-range-select v-else-if="item.type === 'daterange'" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" disabled></iep-date-range-select>
            <iep-upload-select v-else-if="item.type === 'file'" size="mini" :value="scope.row[item.prop]" disabled></iep-upload-select>
            <iep-div-detail v-else-if="item.type === 'date'" :value="scope.row[item.prop] | parseTime('{y}-{m}-{d}')"></iep-div-detail>
            <iep-select v-else-if="item.type === 'list'" size="mini" disabled :prefixUrl="item.prefixUrl" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-select>
            <iep-div-detail v-else :value="scope.row[item.prop]"></iep-div-detail>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <span v-if="scope.row.isNew">
              <iep-button type="text" size="mini" @click="saveRow(scope.row)">添加</iep-button>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此数据？" okText="确认" cancelText="取消" @confirm="remove(scope.row)">
                <iep-button type="text" size="mini">删除</iep-button>
              </a-popconfirm>
            </span>
            <span v-else>
              <iep-button type="text" size="mini" @click="saveRow(scope.row)">更新</iep-button>
              <a-divider type="vertical" />
              <iep-button type="text" size="mini" @click="cancel(scope.row)">取消</iep-button>
            </span>
          </template>
          <span v-else>
            <iep-button v-if="!(onlyLastCanEdit && columns.length-1 === idx)" type="text" size="mini" @click="toggle(scope.row)">编辑</iep-button>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此数据？" okText="确认" cancelText="取消" @confirm="remove(scope.row)">
              <iep-button type="text" size="mini">删除</iep-button>
            </a-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <iep-button v-if="!onlyLastCanEdit" style="width: 100%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" @click="newMember" plain>新增</iep-button>
  </div>
</template>
<script>
import { post, put, del } from '@/api/post/cert'
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    onlyLastCanEdit: {
      type: Boolean,
      default: false,
    },
    crewId: {
      type: Number,
      default: 0,
    },
    crewData: {
      type: Array,
      default: ()=>[],
    },
  },
  data () {
    return {
      data: [],
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.data = this.crewData.map(m => {
        return {
          ...m,
          editable: false,
          isNew: false,
        }
      })
    },
    newMember () {
      const length = this.data.length
      const newObj = {}
      this.columns.forEach(m => {
        newObj[m.prop] = ''
      })
      this.data.push({
        id: length ? (parseInt(this.data[length - 1].id) + 1).toString() : '0',
        ...newObj,
        editable: true,
        isNew: true,
      })
    },
    saveRow (row) {
      const target = row
      if (target.isNew) {
        post(target).then(({ data }) => {
          if (data.data) {
            this.$emit('load-page')
            // this.data.certId = data.data.certId
            // console.log(this.data)
          } else {
            this.$message(data.msg)
          }
        })
      } else {
        put(target).then(({ data }) => {
          if (data.data) {
            this.$emit('load-page')
          } else {
            this.$message(data.msg)
          }
        })
      }
      target.userId = this.crewId
      target.editable = false
      target.isNew = false
    },
    remove (row) {
      del(row.certId).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
      })
      // location.reload()
    },
    cancel (row) {
      const target = row
      target.editable = false
    },
    toggle (row) {
      const target = row
      target.editable = !target.editable
    },
  },
  watch: {
    crewData: {
        deep:true,
        handler: function (){
            this.initData()
        },
    },
    // crewData () {
    //   this.initData()
    // },
  },
}
</script>
