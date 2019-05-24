<template>
  <gov-dialog
    ref="dialog"
    title="提交审核"
    width="80%"
    :btnGroup="btnGroup"
    @submitPass="handleSubmitPass"
    @submitReject="handleSubmitReject"
    @closed="handleClosed">
    <layout-form>
      <div class="detail-wrapper">
        <gov-detail-form v-model="formData" :option="detailOption"></gov-detail-form>
        <avue-crud :data="mainTableData" :option="tableOption">
          <template slot-scope="scope" slot="menu">
            <div class="table-btn-group">
              <gov-button type="text" @click="handleDetail(scope.row)">详情</gov-button>
            </div>
          </template>
        </avue-crud>
      </div>
    </layout-form>
    <info-dialog ref="infoDialog" :formData="infoData"></info-dialog>
  </gov-dialog>
</template>

<script>
import { tableOption } from './const'
import infoDialog from './infoDialog'
import {
  getDic,
  getDept,
} from '@/util/dic'

import { getSystemList, getInfoList } from '@/api/element/auditManagement/cancellation'

export default {
  components: { infoDialog },
  data () {
    return {
      mainTableData: [],
      infoData: {},
      systemList: [],
    }
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: [
              {label: '数据资源目录名称', prop: 'name', span: 12},
              {label: '资源提供方', prop: 'deptId', type: 'select', dicData: getDept(), span: 12},
              {label: '所属系统编码', prop: 'number', span: 12},
              {label: '信息资源摘要', prop: 'summ', span: 12},
              {label: '所属系统名称', prop: 'surveyIdList', type: 'select', multiple: true, dicData: this.systemList, span: 12 },
              {label: '信息资源格式', prop: 'fmtList', type: 'select', dicData: getDic('FMT'), span: 12},
              {label: '主题分类', prop: 'topicTypeList', type: 'select', multiple: true, dicData: getDic('TOPIC_TYPE'), span: 12},
              {label: '重点领域分类', prop: 'areaTypeList', type: 'select', dicData: getDic('AREA_TYPE'), span: 12},
              {label: '更新周期', prop: 'updCycle', type: 'select', dicData: getDic('UPD_CYCLE'), span: 12},
              {label: '共享类型', prop: 'sharingType', type: 'select', dicData: getDic('SHARING_TYPE'), span: 12},
              {label: '共享条件', prop: 'sharingCond', span: 12},
              {label: '共享方式', prop: 'sharingModeList', type: 'select', multiple: true, dicData: getDic('SHARING_MODE'), span: 12},
              {label: '是否向全社会开放', prop: 'isOpen', type: 'select', dicData: getDic('IS_NOT'), span: 12},
              {label: '开放条件', prop: 'openCond', span: 12},
              {label: '关联资源代码', prop: 'rescode', type: 'input', span: 12},
              {label: '发布日期', prop: 'createTime', type: 'input', span: 12},
            ],
          },
        ],
      }
    },
    tableOption () {
      return tableOption
    },
    btnGroup () {
      return [
        {
          label: '审核通过',
          type: 'primary',
          fn: 'submitPass',
          loading: this.loading,
        }, {
          label: '审核驳回',
          type: 'warning',
          fn: 'submitReject',
          loading: this.loading,
        }, {
          label: '取消',
          type: 'default',
          fn: 'handleCancel',
        },
      ]
    },
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    open () {
      this.$nextTick(()=>{
        getInfoList(this.formData.id).then(res=>{
          this.mainTableData = res.data.data.records
        })
        this.$refs['dialog'].open()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.$emit('closed')
    },
    handleDetail (row) {
      this.infoData = row
      this.$refs['infoDialog'].open()
    },
    // 审核通过
    handleSubmitPass () {
      this.$confirm('是否审核通过?', '审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // type: 'error',
        }).then(() => {
          this.$emit('submitPass', this.formData.id)
        }).catch(() => {})
    },
    // 审核驳回
    handleSubmitReject () {
      this.$prompt('请输入驳回理由', '驳回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputValidator: (val) => {
          if (val.length > 100) {
            return '请控制驳回理由长度在100个字符内'
          }
        },
        inputErrorMessage: '驳回理由不能为空',
      }).then(({ value }) => {
        this.$emit('submitReject', {id: this.formData.id, reason: value})
      }).catch(() => {})
    },
  },
  created () {
    // 获取系统列表
    getSystemList().then(res=>{
      let obj = res.data
      let list = []
      for (let i in obj) {
        list.push({
          label: obj[i],
          value: i,
        })
      }
      this.systemList = list
    })
  },
}
</script>