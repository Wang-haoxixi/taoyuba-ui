<template>
  <el-dialog
    v-if="dialogVisible"
    :title="title"
    :visible.sync="dialogVisible"
    width="60%" >
    <edit-form :status="status" ref="editForm" :span="12" @end="close" v-model="value" shipNameDisabled></edit-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>

</template>
<script>
import { initNow } from '@/util/date'
import editForm from './edit'
export default {
  components: {
    editForm,
  },
  props: {
    status: {
      type: String,
      default: 'add',
    },
    id: String,
    value: Object,
  },
  data () {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    title () {
      if (this.status === 'add') {
        return '新增联系记录'
      } else if (this.status === 'detail') {
        return '联系记录详情'
      } else if (this.status === 'update') {
        return '编辑联系记录'
      }
      return '联系记录'
    },
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.$nextTick(() => {
        if (this.id) {
          this.$refs.editForm.getList(this.id)
        }
        if (this.status === 'add') {
          this.$set(this.$refs.editForm.form, 'relationshipTime', initNow())
        }
      })
    },
    close () {
      this.dialogVisible = false
      this.$emit('closeDialog')
    },
    handleSubmit () {
      this.$refs.editForm.handleSubmit()
    },
  },
}
</script>