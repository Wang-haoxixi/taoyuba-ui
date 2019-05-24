<template>
  <!-- 接口注册 -->
  <gov-dialog
    ref="dialog"
    width="80%"
    :isBtnGroup="false"
    title="接口"
    @closed="handleClosed">
    <avue-crud
      :table-loading="tableLoading"
      :data="tableList"
      :option="interFace"
      :page="pagination"
      @size-change="sizeChange"
      @current-change="currentChange">
      <!-- 表格插槽按钮 -->
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
        </div>
      </template>
    </avue-crud>
    <!-- 弹窗 -->
    <interface-dialog 
      :exportApi="handleExportApi"
      :formData="formData"
      :status="dialogStatus"
      :informationList="informationList"
      @closed="handleClosed"
      ref="formDialog"/>
    </gov-dialog>
</template>
<script>
import mixin from "@/mixins/mixin"
import { getTagTypePage, getDeptList, informationList } from "@/api/element/interface"
import interfaceDialog from "../Interface/interfaceDialog"
import { getDic } from '@/util/dic'
export default {
  mixins: [mixin],
  components: {interfaceDialog},
  data () {
    return {
      deptList: [],
      informationList:[],
      connectId:0,
    }
  },
  computed: {
    // 三个按钮信息
    formProps () {
      return [
        {
          label: "状态",
          prop: "auditState",
          type: "select",
          data: getDic('AUDIT_STATE'),
        }, {
          label: "部门名称",
          prop: "deptId",
          props: {
            label: 'name',
            value: 'id',
          },
          type: "select",
          data: this.deptList,
        }, { 
          label: "服务中文名称", 
          prop: "nameCn", 
          type: "input",
        },
      ]
    },
    // 表单信息
    interFace (){
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        page: true,
        index: true,
        indexLabel:'序号',
        // expand:true,
        column: [
          {
            label: "部门名称",
            prop: "deptIdForShow",
          },
          {
            label: "服务中文名称",
            prop: "nameCn",
          },
          {
            label: "服务英文名称",
            prop: "nameEn",
          },
          {
            label: "接入类型",
            prop: "linkType",
            type: 'dic',
            dicData: getDic('ELEMENT_ACCESS_TYPE'),
          },
          {
            label: "资源目录",
            prop: "infoId",
            type: 'dic',
            props: {
              value: "id",
              label: 'name',
            },
            dicData: this.informationList,
          },
          {
            label: "状态",
            prop: "auditState",
            type: 'dic',
            dicData: getDic('AUDIT_STATE'),
          },
        ],
      }
    },
  },
  created () {
    this.getList()
    getDeptList().then(res=>{
      this.deptList = res.data
    })
    informationList().then(res => {
      this.informationList = res.data.data
    })
  },
  methods: {
    // 查看方法
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.formData = {...row}
      this.$refs.formDialog.openDialog()
    },
    // 获取列表
    getList () {
      this.tableLoading = true
      this.listQuery.infoId = this.connectId
      this.listQuery.auditState = 3
      getTagTypePage(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 退出弹框后数据清空
    handleClosed () {
      this.formData = {}
    },
    open (row,id) {
      this.pagination.total = row.length
      this.tableList = row
      this.connectId = id
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
  },
}
</script>

