<template>
  <div>
    <gov-dialog
      ref="dialog"
      :title="'数据库连接'"
      @closed="handleClosedDialog"
      @handleCancel="close"
      @handleNext="handleNext"
      @handleTest="handleTest"
      :btnGroup="btnGroup"
      :isBtnGroup="true"
      width="80%">
      <layout-form >
        <!-- 编辑 -->
        <template>
          <avue-form ref="connectForm" :option="dbConnectTestFormOption" v-model="form"></avue-form>
        </template>
      </layout-form>
    </gov-dialog>
    <chose-dialog ref="choseDialog" @success="success"></chose-dialog>
  </div>
</template>
<script>
import mixin from '@/mixins/mixin'
import formMixin from './const/dbMixin'
import { getDic, getDept } from '@/util/dic'
import { connectForm } from '../database/const/index'
import choseDialog from '../database/choseDialog'
import { getChoseTableData } from '@/api/infoSystem/dataBase'
import {
  getSysId,
} from '@/api/element/element'
export default {
  name: 'connectDialog',
  mixins: [mixin, formMixin],
  components:{choseDialog},
  data () {
    return {
      refNameDialog: 'dialog',
      connectForm,
      btnGroup: [
        {
          label: '下一步',
          type: 'primary',
          fn: 'handleNext',
        },
        {
          label: '测 试',
          type: 'default',
          fn: 'handleTest',
        },
        {
          label: '取 消',
          type: 'default',
          fn: 'handleCancel',
        },
      ],
      form: {
        // dbType: 'MYSQL',
        // user: 'root',
        // cryptogram: 'root',
        // host: '192.168.12.199',
        // port: '12315',
        // nameEn: 'dips_cloud_core',
        // nameCn: 'dips_cloud_core',
        // deptId: 1,
        // systemId: 5,
      },
      sysList: [],
    }
  },
  computed: {

  },
  props: {
    currentData: {
      type: Object,
      default () {
        return {}
      },
    },
    id: {
      type: [Number, String],
      dafault: '',
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    isElement: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    temp: {
      handler (newVal) {
        this.form.id = ''
        this.copyData(this.form, newVal)
      },
      deep: true,
    },
  },
  created () {
    getSysId().then(({data})=>{
      let dicData = []
      for (let item in data) {
        dicData.push({
          value: item,
          label: data[item],
        })
      }
      this.sysList = dicData
    })
    console.log('aaa',this.form)
  },
  methods: {
    open (row) {
      // let formData = {
      //   dbType: 'MYSQL',
      //   user: 'root',
      //   cryptogram: 'root',
      //   host: '192.168.12.199',
      //   port: '12315',
      //   nameEn: 'dips_cloud_core',
      //   nameCn: 'dips_cloud_core',
      //   deptId: 1,
      //   systemId: 5,
      // }
      // for (let i in formData) {
      //   this.$set(this.form, i, formData[i])
      // }
      // let formData = {
      //   dbType: 'MYSQL',
      //   user: 'root',
      //   cryptogram: 'root',
      //   host: '192.168.12.199',
      //   port: '12315',
      //   nameEn: 'dips_cloud_core',
      //   nameCn: 'dips_cloud_core',
      //   deptId: 1,
      //   systemId: 5,
      // }
      // for (let i in formData) {
      //   this.$set(this.form, i, formData[i])
      // }
      //
      this.$set(this.form, 'deptId', row.sysDept)
      this.$set(this.form, 'systemId', row.id)
      this.$nextTick(()=>{
        console.log('row',row,this.form)
        this.openDialog()
      })
    },
    close () {
      this.closeDialog()
    },
    // 下一步
    handleNext (){
      this.$refs.connectForm.validate().then(() => {
        getChoseTableData(this.form).then(({data})=>{
          if (data.msg === 'success') {
            // 成功
            this.$refs['choseDialog'].open(data.data)
            this.$refs.dialog.close()
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    // 测试数据库连接
    handleTest (){
      // let formData = {
      //   dbType: 'MYSQL',
      //   user: 'root',
      //   cryptogram: 'root',
      //   host: '192.168.12.199',
      //   port: '12315',
      //   nameEn: 'dips_cloud_core',
      //   nameCn: 'dips_cloud_core',
      //   deptId: 1,
      //   systemId: 5,
      // }
      // for (let i in formData) {
      //   this.$set(this.form, i, formData[i])
      // }
      this.$refs['connectForm'].validate().then(()=>{
        this.$emit('connectTest', this.form)
      })
    },
    // 弹窗关闭时操作
    handleClosedDialog () {
      this.$refs['connectForm'].resetForm()
    },
    handleDeleteQuery () {
      var arr = []
      this.queryData.forEach((item) => {
        arr.push(item.$index)
      })
      this.deleteArrayData(this.tableList, arr)
    },
    elementSuccess (row) {
      if (this.elementCurrentIndex !== '') {
        this.tableList.splice(this.elementCurrentIndex, 1, row)
      } else {
        this.tableList.splice(this.tableList.length, 0, row)
      }
    },
    getDic (dicName) {
      return getDic(dicName)
    },
    getDept () {
      return getDept()
    },
    success () {
      this.$emit('successForm', true)
    },
  },
}

</script>
<style lang="scss">
.form-btn-group-container {
  margin: 10px 0;
}
</style>
