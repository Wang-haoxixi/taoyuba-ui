<template>
  <div>
    <el-form :inline="true" size="small" disabled>
      <el-form-item label="清洗名称:">
        <el-input v-model="ruleDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <el-input v-model="ruleDetail.deptName"></el-input>
      </el-form-item>
      <el-form-item label="来源方式:">
        <el-select v-model="ruleDetail.methodId" placeholder="请选择">
          <el-option v-for="item in dicList['GDS_METHOD_NAME']" :label="item.label" :key="+item.value" :value="+item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!--
    <el-form :inline="true" size="small">
      <div class="button-wrapper">
        <div>
          <el-form-item v-if="isAnalysis">
            <el-button @click="handleDataFill()">数据补漏</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="load()">刷新</el-button>
          </el-form-item>
        </div>
        <div v-if="isAnalysis">
          <el-form-item>
            <el-button type="primary" @click="handleThreshold()">下一步 - 数据分析</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form> -->

    <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="columnMap" :is-index="true" :border="true" :stripe="true">
      <el-table-column prop="operation" label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="hanldeView(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
          <a-divider type="vertical" />
          <el-button @click="hanldeEdit(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
          <a-divider type="vertical" />
          <el-button @click="handleDelete(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </crud-table>

    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>

    <form-dialog :dialog-show="editDialogShow" title="数据项" @close="editDialogShow=false" width="60%" :is-need-confirm="false">
      <el-form :model="itemForm" class="form-inline" label-width="120px" ref="itemForm" size="small" :disabled="!isEdit">
        <el-form-item v-for="item in columnMap" :key="item.prop" :label="item.label">
          <el-input v-model="itemForm[item.prop]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </form-dialog>
    <form-dialog :dialog-show="thresholdDialogShow" title="数据分析" @close="thresholdDialogShow=false" width="40%" :is-need-confirm="false">
      <el-form :model="thresholdForm" class="form-threshold" label-width="120px" ref="thresholdForm" size="small">
        <el-form-item>
          <div slot="label">设置阈值
            <el-tooltip class="item" effect="dark" content="阀值：设置数据质量相似度标准（相似性越高，阀值越高）" placement="top">
              <i class="el-icon-info"></i>
            </el-tooltip>
            ：
          </div>
          <el-slider v-model="thresholdForm.threshold" :format-tooltip="_formatTooltip" show-input></el-slider>
        </el-form-item>
        <div class="btn-group">
          <el-tooltip class="item" effect="light" content="分析流程：机器学习→构建向量模型→计算数据质量→构建数据矩阵→分析数据间相似度→智能归类" placement="bottom">
            <el-button type="primary" size="small" @click="handleAnalysis(2)">深度分析</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="分析流程： 机器学习→加载短语模型→抽取规则中同义权重最高属性→计算属性同义相似度→智能归类" placement="bottom">
            <el-button type="success" size="small" @click="handleAnalysis(1)">快速分析</el-button>
          </el-tooltip>
        </div>
      </el-form>
    </form-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { setAnalysisThreshold } from '@/api/dataclean/analysis'
import CrudTable from '@/components/crud-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import {
  // getDataPoolPage,
  postDataPool, putDataPool, deleteDataPool} from '@/api/dataclean/data_pool'

const mockData = require('./mock.json')

function initThresholdForm () {
  return {
    degree: 1,
    fieldId: null,
    threshold: 0,
  }
}
export default {
  props: {
    isAnalysis: {
      type: Boolean,
      required: false,
      default: true,
    },
    option: {
      type: Array,
      required: true,
    },
    ruleDetail: {
      type: Object,
      required: true,
    },
  },
  components: {
    CrudTable,
  },
  mixins: [dialogMixins, paginationMixins],
  data () {
    const initForm = {}
    this.option.map(m => {
      initForm[m.prop] = null
    })
    return {
      isEdit: false,
      columnMap: this.option,
      editDialogShow: false,
      thresholdDialogShow: false,
      itemForm: { ...initForm },
      thresholdForm: initThresholdForm(),
    }
  },
  computed: {
    ...mapGetters(['dicList']),
  },
  created () {
    this.load()
  },
  methods: {
    _formatTooltip (val) {
      return val + '%'
    },
    handleAnalysis (degree) {
      const loading = this.$loading({
        lock: true,
        text: '正在分析中, 请耐心等待...在页面"分析状态刷新"按钮随时关注更新后分析结果...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        this.thresholdForm.degree = degree
        setAnalysisThreshold(this.thresholdForm)
        this.thresholdDialogShow = false
        loading.close()
        this.$emit('page-close')
      }, 3000)
    },
    handleThreshold () {
      this.thresholdForm.fieldId = this.ruleDetail.id
      this.thresholdDialogShow = true
    },
    _initForm () {
      const initForm = {}
      this.option.map(m => {
        initForm[m.prop] = null
      })
      this.itemForm = { ...initForm }
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row._id, deleteDataPool)
    },
    hanldeEdit () {
      // this.itemForm = { ...row }
      // this.isEdit = true
      // this.editDialogShow = true
      return
    },
    hanldeView (row) {
      this.itemForm = { ...row }
      this.isEdit = false
      this.editDialogShow = true
    },
    handleSave () {
      const id = this.itemForm._id
      delete this.itemForm._id
      if (id) {
        putDataPool(id, this.itemForm).then(() => {
          this.load()
          this.editDialogShow = false
          this._initForm()
        })
      } else {
        postDataPool(this.ruleDetail.id, this.itemForm).then(() => {
          this.load()
          this.editDialogShow = false
          this._initForm()
        })
      }
    },
    handleDataFill () {
      this.isEdit = true
      this.editDialogShow = true
    },
    load (pageOption = this.pageOption, params = this.param) {
      console.log(pageOption, params)
      this.isLoadTable = false
      const { data } = _.cloneDeep(mockData)
      let { records } = data
      records = records.map(m => {
        return {
          ...m.fieldValue,
          _id: m.id,
        }
      })
      data.records = records
      this.loadTable(data)
    },
  },
}
</script>
<style lang="scss" scoped>
.form-threshold {
  padding: 0 20px;
}
.button-wrapper {
  display: flex;
  justify-content: space-between;
}
.btn-group {
  display: flex;
  justify-content: center;
}
</style>
