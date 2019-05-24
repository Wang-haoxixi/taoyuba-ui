<template>
  <gov-dialog
    title="导出"
    ref="dialog"
    width="60%"
    @open="handleOpen"
    @closed="handleClosed"
    :btnGroup="btnGroup"
    @handleClose="close"
    @handleSubmit="handleSubmit">
    <el-alert class="alertToast" title="如导出数据量大，下载请耐心等待！" type="warning" :closable="false"></el-alert>
    <div class="export-wrapper" v-for="item in data" :key="item.prop">
      <p class="title" v-if="item.title">{{item.title}}：</p>
      <el-checkbox-group v-model="listQuery[item.prop]" v-loading="item.data && item.data.length === 0">
        <el-row>
          <el-col :span="6" v-for="item1 in item.data" :key="item1.value" class="checkbox-wrapper">
            <el-checkbox :label="item1[defaultProps.value]">
              <span class="text">{{item1[defaultProps.label]}}</span>
            </el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </div>
  </gov-dialog>
</template>
<script>
import exportDownload from './js/download'
export default {
  name: 'GovDialogExport',
  data () {
    return {
      btnGroup: [{
        label: '取消',
        fn: 'handleClose',
      }, {
        label: '确认',
        loading: false,
        type: 'primary',
        fn: 'handleSubmit',
      }],
    }
  },
  props: {
    title: {
      type: String,
      default: '模板',
    },
    url: {
      type: String,
      default: '',
    },
    // 是否全选中
    checkAll: {
      type: Boolean,
      default: true,
    },
    defaultProps: {
      type: Object,
      default () {
        return {
          label: 'label',
          value: 'value',
        }
      },
    },
    // 忽略值
    ignoreParame: {
      type: Array,
      default () {
        return ['limit', 'page']
      },
    },
    // model
    listQuery: {
      type: Object,
      default () {
        return {}
      },
    },
    params: {
      type: Object,
      default () {
        return {}
      },
    },
    /*
      [
        {
          prop: 'fields'
          title: '标题', // 可无
          data: [
            {
              label: '名字',
              value: 1 // id
            }
          ]
        }
      ]
    */
    data: {
      type: Array,
      default () {
        return []
      },
    },
  },
  methods: {
    handleOpen () {
      this.data.forEach((item) => {
        this.listQuery[item.prop] = []
        if (this.checkAll && item.data && Array.isArray(item.data)) {
          item.data.forEach(a => {
            this.listQuery[item.prop].push(a[this.defaultProps.value])
          })
        }
      })
    },
    handleClosed () {
      this.data.forEach((item) => {
        this.listQuery[item.prop] = []
      })
    },
    // 打开弹窗
    open () {
      this.$refs['dialog'].open()
    },
    // 关闭弹窗
    close () {
      this.$refs['dialog'].close()
    },
    // 提交
    handleSubmit () {
      let data = {}
      data = {...this.listQuery, ...this.params}
      delete data.limit
      delete data.page
      this.btnGroup[1].loading = true
      exportDownload({url: this.url, data: data, title: this.title}).then(() => {
        this.btnGroup[1].loading = false
        this.close()
      }).catch(()=>{
        this.btnGroup[1].loading = false
        this.close()
        this.$message.error('未知异常')
      }).finally(()=>{
        this.btnGroup[1].loading = false
        this.close()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.alertToast{
  margin-bottom: 15px;
}
.export-wrapper {
  &:last-child {
    margin-bottom: 0;
  }
  margin-bottom: 20px;
  .checkbox-wrapper {
    margin-bottom: 10px;
  }
  .title {
    position: relative;
    padding-left: 10px;
    padding-bottom: 10px;
    width: 100%;
    color: #333;
    line-height: 22px;
    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 3px;
      width: 3px;
      height: 16px;
      background-color: #3981d9;
    }
  }
}
</style>
