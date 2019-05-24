<template>
  <div class="content-container">
    <template v-if="tableData.length > 0">
      <div class="item" v-for="item in tableData" :key="item.id">
        <div class="top-wrapper clearfix">
          <div class="item-title" @click="handleDetail(item.id)">{{item.sysDsgt}}</div>
          <div class="item-body">
            <el-row>
              <el-col :span="8">所属信息资源数量：{{item.resrcList ? item.resrcList.length : 0}}</el-col>
              <el-col :span="8">数据规模（G）：{{item.dataSize}}</el-col>
              <el-col :span="8">数据总量（条）：{{item.dataAggr}}</el-col>
            </el-row>
          </div>
          <div class="item-footer" v-if="item.resrcList.length > 0">
            <span>信息资源:</span>
            <span class="infoSpan" v-for="(i, index) in item.resrcList" :key="i">
              <i class="choose-name" @click="infoDetail(i.id)">{{i.name}}</i>
              <i class="fu" v-if="item.resrcList.length - 1 !== index">/</i>
            </span>
          </div>
        </div>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pagination.currentPage"
          :total="pagination.total">
       </el-pagination>
      </div>
    </template>
    <template v-else>
      <no-data/>
    </template>
    <!-- 信息资源 -->
    <information-dialog
      :options="options"
      @success="informationSuccess"
      :temp="infoData"
      :status="dialogStatus"
      ref="formDialog"/>
    <main-dialog ref="mainDialog" :formData="formData"></main-dialog>
  </div>
</template>
<script>
import mixin from '@/mixins/mixin'
import mainDialog from './mainDialog'
import informationDialog from '../../element/information/informationDialog'
import noData from '@/components/noData'
import {
  informationTableList,
  getSysId,
} from '@/api/element/element'
import {
  getSearchDetail,
} from '@/api/infoSystem'
export default {
  name: 'systemSearchList',
  components: {mainDialog,informationDialog, noData},
  mixins: [mixin],
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      id: 1,
      refNameDialog: 'formDialog',
      dialogStatus: 'detail',
      options: [],
    }
  },
  created () {
    this.getSysIdData()
  },
  watch: {
    page: {
      handler (newVal) {
        this.pagination = newVal
      },
      deep: true,
    },
  },
  methods: {
    getSysIdData () {
      getSysId().then(({data}) => {
        let res = data
        let arr = []
        for (let key in res) {
          arr.push({value: String(key), label: res[key]})
        }
        this.$set(this.options, 'surveyIdList', arr)
      })
    },
    changePage (page) {
      this.pagination.currentPage = page
    },
    //查看目录资源详情
    infoDetail (res){
      informationTableList({page:1,limit:10,id:res}).then(({data}) => {
        this.dialogStatus = 'detail'
        this.$refs['formDialog'].open(data.data.records[0])
      })
    },
    // 查看系统详情
    handleDetail (id) {
      getSearchDetail(id).then(res=>{
        this.formData = res.data.data
        this.$refs['mainDialog'].open()
      })
    },
    sizeChange (value) {
      this.$emit('sizeChange', value)
    },
    currentChange (value) {
      this.$emit('currentChange', value)
    },
  },
}
</script>
<style lang="scss" scoped>
  .content-container {
    margin-bottom: 20px;
    .pagination-wrapper {
      margin-top: 20px;
      text-align: right;
    }
    .icon {
      line-height: 18px;
    }
    .item {
      span {
        margin-right: 10px;
        // color: #999;
        font-size: 14px;
      }
      .top-wrapper {
        border-bottom: 1px solid #d7d7d7;
        padding: 10px 0 20px;
        .item-title {
          padding: 5px 0;
          font-size: 14px;
          color: #555;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .item-body {
          padding: 5px 0;
          font-size: 13px;
          color: #999;
        }
        .item-footer {
          padding: 5px 0;
          color: #777;
          font-size: 13px;
          .infoSpan {
            cursor: pointer;
            i {
              font-style: normal;
              &.fu {
                margin-left: 8px;
              }
            }
            i.choose-name {
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
</style>
