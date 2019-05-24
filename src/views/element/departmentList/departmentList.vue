<template>
  <div class="content-container">
    <template v-if="tableData.length > 0">
      <div class="item" v-for="item in tableData" :key="item">
        <div class="top-wrapper clearfix">
          <div class="item-header">
            <span class="text">{{item.name}}</span>
            <div class="item-type">
              <el-tooltip :content="getOptionValue('sharingType', item.sharingType)" placement="top">
                <span>共享属性：<i class="icon iconfont" :class="item.sharingType == 1 ? 'blue icon-yuan1' : item.sharingType == 2 ? 'green icon-trues' : 'red icon-jinzhi'"></i></span>
              </el-tooltip>
              <el-tooltip :content="(item.isOpen == null || item.isOpen === '') ? '' : (item.isOpen == 1 ? '可对社会开放' : '不可对社会开放')" placement="top">
                <span>开放属性：<i class="icon iconfont" :class="item.isOpen == 1 ? 'green icon-trues' : 'red icon-jinzhi'"></i></span>
              </el-tooltip>
            </div>
            <div class="item-btn">
              <gov-button  size="small" permission="ele_department_see" class="btn-default open" @click="handleDetail(item)">详情</gov-button>
              <gov-button  size="small" permission="ele_department_Interface" class="btn-default open" @click="handleInterface(item)">接口</gov-button>
            </div>
          </div>
          <div class="item-body">
            <el-row>
              <el-col :span="8">来源：{{item.deptIdForShow}}</el-col>
              <el-col :span="8">信息资源代码：{{item.number}}</el-col>
              <el-col :span="8">目录更新时间：{{item.createTime}}</el-col>
            </el-row>
          </div> 
          <div class="item-footer">
            <span>信息项:</span>
            <span class="infoSpan" v-for="(i, index) in item.elements" :key="i">
              <i class="item-name">{{i.chName}}</i>
              <i class="fu" v-if="item.elements.length - 1 !== index">/</i>
            </span>
          </div>       
        </div>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChange"
          @current-change="currentChange"
          :total="pagination.total">
       </el-pagination>
      </div>
    </template>
    <template v-else>
      <no-data/>
    </template>
    <information-dialog
      :options="options"
      status="detail"
      ref="formDialog"/>
    <inter-dialog
      status="detail"
      ref="interDialog"/>
  </div>
</template>
<script>
import mixin from '@/mixins/mixin'
import informationDialog from '@/views/element/information/informationDialog'
import { getTagTypePage } from "@/api/element/interface"
import interDialog from './interDialog'
import noData from '@/components/noData'
import {
  getSysId,
} from '@/api/element/element'
export default {
  name: 'departmentList',
  components: {informationDialog, noData, interDialog},
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
      refNameDialog: 'formDialog',
      options: {},
      status: 'detail',
    }
  },
  watch: {
    page: {
      handler (newVal) {
        this.pagination = newVal
      },
      deep: true,
    },
  },
  computed: {
    tipData () {
      return {
        sharingType: this.getDic('SHARING_TYPE'), // 共享類型
      }
    },
  },
  created () {
    this.getSysId()
    this.getIsOpen()
  },
  methods: {
    getIsOpen () {
      this.options.isOpen = this.getDic('IS_NOT')
    },
    // 所属系统名称
    getSysId () {
      getSysId().then((response) => {
        let res = response.data
        let arr = []
        for (let key in res) {
          arr.push({value: String(key), label: res[key]})
        }
        // this.options.surveyIdList = arr
        this.$set(this.options, 'surveyIdList', arr)
        this.options.surveyId = arr
      })
    },
    getOptionValue (name, value) {
      let data = ''
      this.tipData[name].forEach((item) => {
        if (value === item.value) {
          data = item.label
          return false
        }
      })
      return data
    },
    handleDetail (row) {
      this.status = 'detail'
      this.$refs['formDialog'].open(row)
    },
    handleInterface (row){
      getTagTypePage({infoId:row.id,auditState:3}).then(({ data }) => {
        if(data.records.length>0){
          this.interData=data.records
          this.$refs['interDialog'].open(data.records,row.id)
        }else{
          this.$confirm('该信息资源没有关联已审核的接口！', '接口', {
            // showCancelButton:false,
          }).catch(() => { })
        }
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
        color: #999;
        font-size: 14px;
      }
      .top-wrapper {
        border-bottom: 1px solid #d7d7d7;
        padding: 10px 0 20px;
        .item-header {
          margin-right: 150px;
          position: relative;
          padding: 10px 0;
          .text {
            color: #333;
            margin-right: 20px;
          }
          .item-btn {
            position: absolute;
            top: 0;
            right: -120px;
          }
          .item-type {
            display: inline-block;
            .red {
              color: #ff0000;
            }
            .blue {
              color: #0000ff;
            }
            .green {
              color: green;
            }
            i {
              font-size: 18px;
              vertical-align: text-bottom;
            }
          }
        }
        .item-body {
          padding: 5px 0;
          font-size: 13px;
          color: #999;
        }
        .item-footer {
          padding: 5px 0;
          span {
            color: #666;
          }
          i {
            font-style: normal;
            &.fu {
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
</style>
