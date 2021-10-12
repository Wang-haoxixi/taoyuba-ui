<template>
  <div>
    <el-table v-bind="$attrs" ref="table" class="table" v-loading="isLoadTable" :data="formatData" style="width: 100%;" :header-cell-style="headerCellStyle" :cell-class-name="cellClassName" :row-style="rowStyle" @row-click="rowClick" @select="selectLine" @select-all="selectAll" :empty-text="emptyText">
      <el-table-column v-if="isMutipleSelection" type="selection" :selectable="checkboxInit" width="55" :align="align">
      </el-table-column>
      <el-table-column v-if="isIndex" type="index" width="50" :align="align">
      </el-table-column>
      <!-- 为了实行点击查看的规定 -->
      <slot name="before-columns"></slot>
      <el-table-column :label="item.label" :width="item.width" :min-width="item.minWidth" v-for="(item, idx) in columnsMap" :key="idx" :align="align">
        <template slot-scope="scope">
          <template v-if="isTree && idx === 0">
            <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          </template>
          <template v-if="isTree && iconShow(idx,scope.row)">
            <span class="tree-ctrl" @click="toggleExpanded(scope)">
              <i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
              <i v-else class="el-icon-caret-bottom"></i>
            </span>
          </template>
          <template v-if="item.type==='dict'">
            <div>{{dictsMap[item.prop][scope.row[item.prop]]}}</div>
          </template>
          <template v-else-if="item.type==='dictGroup'">
            <div>{{dictJS(item, scope)}}</div>
          </template>
          <template v-else-if="item.type==='areaCode'">
            <div>{{getAreaCode(item, scope)}}</div>
          </template>
           <template v-else-if="item.type==='ldate'">
            <div >{{getLdata(item, scope)}}</div>
          </template>
          <template v-else-if="item.type==='shipStatus'">
            <iep-button size="mini" :type="scope.row[item.css]" >{{getShipStatus (item, scope)}}</iep-button>
            <!-- <div><span :class="[tableLabel,shipColor]">{{getShipStatus (item, scope)}}</span></div> -->
          </template>
          <template v-else-if="item.type==='tag'">
            <iep-tag-detail :value="scope.row[item.prop]"></iep-tag-detail>
          </template>
          <template v-else-if="item.type==='image'">
            <a @click="openImage(scope.row[item.prop])">查看保单图片</a>
          </template>
          <template v-else>
            <iep-table-detail :value="scope.row[item.prop]"></iep-table-detail>
          </template>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <iep-pagination v-if="isPagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :pagination-option="pagination" :page-sizes="initPageSize" layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" background></iep-pagination>
  </div>
</template>

<script>
import { pageOption } from '@/const/pageConfig'
import treeToArray from './eval'
import keyBy from 'lodash/keyBy'
import { mapGetters } from 'vuex'
import { getInfo } from '@/api/post/address'
export default {
  name: 'IepTable',
  inheritAttrs: false,
  props: {
    isLoadTable: {
      type: Boolean,
      required: true,
    },
    isMutipleSelection: {
      type: Boolean,
      default: false,
    },
    isTree: {
      type: Boolean,
      default: false,
    },
    isIndex: {
      type: Boolean,
      default: false,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      default: () => pageOption(),
    },
    pagedTable: {
      type: Array,
      required: true,
    },
    columnsMap: {
      type: Array,
      default: () => [],
    },
    dictsMap: {
      type: Object,
      default: () => { },
    },
    align: {
      type: String,
      default: 'left',
    },
    checkboxInit: {
      type: Function,
      default: null,
    },
    evalFunc: {
      type: Function,
      default: null,
    },
    evalArgs: {
      type: Array,
      default: () => [],
    },
    expandAll: {
      type: Boolean,
      default: true,
    },
    pageOptionSize: {
      type: Number,
      default: 10,
    },
    cellClassName: {
      type: Function,
      default: ({ row }) => {
        const { _level } = row
        if (_level === 1) {
          return 'cell-master'
        }
        if (_level == 2) {
          return 'cell-child'
        }
        if (_level == 3) {
          return 'cell-sub'
        }
      },
    },
    rowStyle: {
      type: Function,
      default: (row) => {
        const show = row.row.parent ? row.row.parent._expanded && row.row.parent._show : true
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
    },
    headerCellStyle: {
      type: Function,
      default: ({ rowIndex }) => {
        if (rowIndex == 0) {
          return 'background:#F2F4F5;color:#000'
        } else {
          return ''
        }
      },
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
  },
  data () {
    return{
      area:[],
      color:'',
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    initPageSize () {
      const { pageOptionSize } = this
      return [pageOptionSize, pageOptionSize * 2, pageOptionSize * 3, pageOptionSize * 4]
    },
    // 格式化数据源
    formatData () {
      let tmp
      if (!Array.isArray(this.pagedTable)) {
        tmp = [this.pagedTable]
      } else {
        tmp = this.pagedTable
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? [tmp, this.expandAll, ...this.evalArgs] : [tmp, this.expandAll]
      return func.apply(null, args)
    },
  },
  methods: {
    dictJS (item, scope) {
      if(scope.row[item.prop]){
      return keyBy(this.dictGroup[item.dictName], 'value')[scope.row[item.prop]].label
      }else{
        return '暂无'
      }
    },
    getLdata (item, scope) {
      // console.log(scope.row[item.prop])
      // console.log('scope.row[item.prop]')
      // var strtime = scope.row[item.prop].replace('/-/g', '/')//时间转换
      //      //时间
      // var date1=new Date(strtime)
      //     //现在时间
      // var date2=new Date()
      //   // / /判断时间是否过期
      // if(date2>date1){
      //  this.color='red'
      // }else if(parseInt(Math.abs(date1-date2)/1000/60/60/24) < 183){
      //   this.color='yel'
      // }else {
      //   this.color=''
      // }
     if(scope.row[item.prop]){
       let date = new Date(scope.row[item.prop])
        scope.row[item.prop]=this.dateFormat('YYYY-mm-dd', date)
        // console.log(scope.row[item.prop])
     }
      return scope.row[item.prop]
    },
     dateFormat (fmt, date) {
    let ret 
    const opt = {
        'Y+' :  date.getFullYear().toString()    ,  // 年
        'm+' : (date.getMonth() + 1).toString()  ,  // 月
        'd+' : date.getDate().toString()     ,      // 日
        'H+' : date.getHours().toString()     ,     // 时
        'M+' : date.getMinutes().toString()    ,    // 分
        'S+' : date.getSeconds().toString()    ,   // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
    };
    return fmt
    },
    getShipStatus (item, scope) {
      if(scope.row[item.prop]==0){
        scope.row[item.prop] = '证书已过期'
        scope.row[item.css] = 'danger'
      }else if(scope.row[item.prop]==1){
        scope.row[item.prop] = '正常'
        scope.row[item.css] = 'success'
      }
      return scope.row[item.prop]
    },
    //  getCrewCert
    getAreaCode (item, scope) {
      if(scope.row[item.prop]){
        if(scope.row[item.prop]!= 0 && scope.row[item.prop]){
          getInfo(scope.row[item.prop]).then(res=>{
            if(res.data.data){
              scope.row[item.prop]=res.data.data.name
            }else{
              scope.row[item.prop]='暂无'
            }
          })
        }
        return scope.row[item.prop]
      }else{
        return '暂无'
      }
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    // 切换下级是否展开
    toggleExpanded (scope) {
      const record = this.formatData[scope.$index]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow (index, record) {
      return index === 0 && record.childrenLength > 0
    },
    // 整行点击事件
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    // 选择单行回调事件
    selectLine (selection, row) {
      this.$emit('select', selection, row)
    },
    // 全选回调事件
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    // 切换某一行的选中状态
    toggleRowSelection (row, selected) {
      this.$refs['table'].toggleRowSelection(row, selected)
    },
    openImage (url) {
      window.open(url, '_blank')
    },
  },
}
</script>
<style scoped>
.red{
 color: #ff0000;
} 
.yel{
 color: #ff9900;

}
.table >>> .th {
  background: #ccc;
}
.table >>> .ms-tree-space {
  position: relative;
  top: 1px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.table >>> .cell {
  display: flex;
  flex-wrap: wrap;
}
.table >>> .cell-master {
  background-color: #fff;
}
.table >>> .cell-child {
  background-color: #fafafa;
}
span.ms-tree-space {
  display: block;
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: #666;
  margin-left: -18px;
}
.table-label{
  width:100px;
  color:#fff;
  padding:10px;
}
.red 
  >>>el-button--primary{
    background:#c7535a;
  }

.green {
  background:#3eaf7c;
}
</style>
