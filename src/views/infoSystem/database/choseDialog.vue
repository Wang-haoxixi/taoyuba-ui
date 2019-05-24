<template>
  <div>
    <gov-dialog
      ref="chosedialog"
      @open="handleOpenDialog"
      @closed="handleClosedDialog"
      @handleCancel="close"
      @handleSubmit="handleSubmit"
      :title="'数据表选择'"
      :isBtnGroup="true"
      width="80%">
      <template>
        <avue-crud @selection-change="selectionChange" :option="choseTableOption" :data="tableDataList"></avue-crud>
      </template>
    </gov-dialog>
  </div>

</template>
<script>
import mixin from '@/mixins/mixin'
import { saveChoseDB } from '@/api/infoSystem/dataBase'
import { choseTableOption } from './const'

export default {
  name: 'choseDialog',
  mixins: [mixin],
  data () {
    return {
      choseTableOption,
      checkList: [],
      formData: {},
      tableDataList: [],
    }
  },
  methods: {
    open (list) {
      this.tableDataList = list
      this.openDialog('chosedialog')
    },
    close () {
      this.$refs.chosedialog.close()
    },
    handleSubmit (){
      if(this.checkList.length === 0){
        this.$message.error('请至少选择一张数据表')
      }else{
        const loading = this.$loading({
          lock: true,
          text: '正在上传数据',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        saveChoseDB(this.checkList).then((res)=>{
          loading.close()
          if (res.data) {
            this.$message.success('保存成功')
            this.$emit('success', true)
          } else {
            this.$message.error(res.data.msg)
          }
          this.$refs.chosedialog.close()
          
        }).catch(() => {
          loading.close()
          this.$message.error('保存失败！请重新尝试')
        })
      }
    },
    selectionChange (list) {
      this.checkList = list
    },
    // 弹窗打开时操作
    handleOpenDialog () {

    },
    // 弹窗关闭时操作
    handleClosedDialog () {
      
    },
  },
}

</script>
<style lang="scss">
.form-btn-group-container {
  margin: 10px 0;
}
.el-checkbox-group{
  .el-checkbox{
    display:block;
    margin-left: 30px;
  }
}
</style>
