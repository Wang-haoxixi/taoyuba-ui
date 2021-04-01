<template>
  <basic-container>
    <div v-show="!show">
      <page-header title="联系记录"></page-header>
      <operation-container>
        <template slot="left">
          <!-- roles.indexOf(112) !== -1" -->
          <iep-button @click="handleAdd" type="primary" v-if="relation_ship_add && roles.indexOf(112) !== -1">新增</iep-button>
          <iep-button @click="handleStatistics" type="default" v-if="relation_ship_statistics && (roles.indexOf(111) !== -1)">联系记录统计</iep-button>
          <!-- <iep-button @click="handleExport" v-if="relation_ship_export" :loading="exportBtnLoading" type="default" plain>导出</iep-button> -->
        </template>
        <template slot="right">
          <el-form :inline="true" :model="params" size="small">
            <el-form-item v-if="roles.includes(111)">
              <el-select clearable style="width: 120px !important;" v-model="params.villageId" placeholder="基层组织" size="small">
                <el-option
                  v-for="item in orgSearchList"
                  :key="item.index"
                  :label="item.villageName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input style="width: 120px !important;" v-model.trim="params.shipName" placeholder="船名号" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input style="width: 120px !important;" v-model.trim="params.shipownerName" placeholder="联系人" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-select style="width: 120px !important;" v-model="params.relationshipType" placeholder="联系设备" clearable>
                <el-option :label="item.label" :value="item.value" v-for="item in map.relationshipType" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div style="width: 320px;">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="params.rangeTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-form>
        </template>
      </operation-container>
      <div v-show="showCount" class="count-wrapper">
        <div class="title-count">基层联系数量统计</div>
        <el-table
          :data="countList"
          stripe
          border
          :loading="loadingCount"
          style="width: 100%">
          <el-table-column
            prop="village_id"
            label="基层名">
            <template slot-scope="scope">
              {{getVillageLabel(scope.row.village_id)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="总数（帆张网）">
            <template slot-scope="scope">
              {{scope.row.totalNumber}}({{scope.row.totalWorkNumber}})
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="已联系数量（帆张网）">
            <template slot-scope="scope">
              {{scope.row.number}}({{scope.row.workNumber}})
            </template>
          </el-table-column>
          <el-table-column
            prop="readyNumber"
            label="未联系数量（帆张网）">
            <template slot-scope="scope">
              {{scope.row.readyNumber}}({{scope.row.readyWorkNumber}})
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-table
        :data="pagedTable"
        stripe
        :loading="tableLoading"
        style="width: 100%">
        <el-table-column
          v-if="roles.indexOf(111) !== -1 || roles.indexOf(1) !== -1"
          prop="villageName"
          label="基层名">
        </el-table-column>
        <el-table-column
          prop="shipName"
          label="渔船名">
        </el-table-column>
        <el-table-column
          prop="relationshipType"
          label="联系设备">
          <template slot-scope="scope">
            <span>
              {{scope.row.relationshipType === 3 ? getLabel(map.relationshipType, scope.row.relationshipType) : getLabel(map.relationshipType, scope.row.relationshipType) + '(' + scope.row.relationshipNumber + ')'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="relationshipReason"
          label="联系事由">
          <template slot-scope="scope">
            <span>{{scope.row.relationshipReason}}</span>
            <!-- <span>{{getLabel(map.relationshipReason, scope.row.relationshipReason)}}</span> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="workMode"
          label="工作方式">
          <template slot-scope="scope">
            {{getWorkModeLabel(scope.row.workMode2)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="relationshipTime"
          label="联系时间">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="290">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.row)">详情</el-button>
            <el-button
              v-if="relation_ship_edit && roles.indexOf(112) !== -1"
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              v-if="relation_ship_delete && roles.indexOf(112) !== -1"
              size="mini"
              @click="handleDelete(scope.row)">删除</el-button>
            <el-button
              v-if="scope.row.relationshipImages && scope.row.relationshipImages.length > 0"
              size="mini"
              @click="handleImg(scope.row)">图片</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          :current-page.sync="params.current"
          @current-change="currentChange">
        </el-pagination>
        <dialog-statistics ref="dialogStatistics"/>
      </div>
    </div>
    <div v-if="show">
      <form-container ref="formContainer" :status="status" @go-back="onGoBack"></form-container>
    </div>
    <el-dialog
      title="图片"
      :visible.sync="dialogVisible"
      width="40%">
      <div style="max-height: 350px;overflow: auto;">
        <div style="text-align: center;margin-bottom: 10px;" v-for="(item, index) in imgList" :key="index">
          <img :src="item" width="100%">
        </div>
      </div>
    </el-dialog>
</basic-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { getPage, removePage, exportPage, getCountByTime } from '@/api/tmlms/relation'
import { getVillageByOrg } from '@/api/tmlms/bvillage/index'
import dialogStatistics from './dialogStatistics'
import formContainer from './form'
import map from './map'
export default {
  components: {
    dialogStatistics,
    formContainer,
  },
  data () {
    return {
      loadingCount: false,
      showCount: false,
      countList: [],
      dialogVisible: false,
      imgList: [],
      status: '',
      id: '',
      show: false,
      exportBtnLoading: false,
      orgSearchList: [],
      map,
      pagedTable: [],
      params: {
        current: 1,
        size: 10,
        // shipName: '',
        // shipownerName: '',
        // relationshipType: '',
        // rangeTime: [],
      },
      total: 0,
      relation_ship_add: false,
      relation_ship_edit: false,
      relation_ship_delete: false,
      relation_ship_export: false,
      relation_ship_statistics: false,
      tableLoading: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
      'roles',
      'dictGroup',
    ]),
  },
  created () {
    this.getList()
    this.getVillageOrg()
    this.relation_ship_add = this.permissions['relation_ship_add']
    this.relation_ship_edit = this.permissions['relation_ship_edit']
    this.relation_ship_delete = this.permissions['relation_ship_delete']
    this.relation_ship_export = this.permissions['relation_ship_export']
    this.relation_ship_statistics = this.permissions['relation_ship_statistics']
  },
  methods: {
    getVillageLabel (value) {
      let maps = this.orgSearchList || []
      let result = ''
      for (let i = 0, len = maps.length; i < len; i++) {
        if (value === maps[i].userId) {
          result = maps[i].villageName
          break
        }
      }
      return result
    },
    getWorkModeLabel (value) {
      let maps = this.dictGroup.tyb_work_mode
      let result = ''
      for (let i = 0, len = maps.length; i < len; i++) {
        if (value === maps[i].value) {
          result = maps[i].label
          break
        }
      }
      return result
    },
    onSearch () {
      this.params.current = 1
      let params = this.params
      if (Array.isArray(params.rangeTime) && params.rangeTime.length > 0) {
        params.startDate = params.rangeTime[0]
        params.endDate = params.rangeTime[1]
      } else {
        params.startDate = undefined
        params.endDate = undefined
      }
      // console.log(`
      //   startDate:${params.startDate},
      //   endDate:${params.endDate},
      //   villageId:${params.villageId},
      //   shipName:${params.shipName},
      //   shipownerName:${params.shipownerName},
      //   relationshipType:${params.relationshipType},
      // `)
      if (params.startDate
        && params.endDate
        && !params.villageId
        && (params.shipName === '' || params.shipName == null)
        && (params.shipownerName === '' || params.shipownerName == null)
        && !params.relationshipType) {
          this.loadingCount = true
          getCountByTime({ startDate: params.startDate, endDate: params.endDate }).then(({ data }) => {
            if (data.code === 0) {
              this.countList = data.data
            }
            this.showCount = true
            this.loadingCount = false
          }).catch(() => {
            this.loadingCount = false
            this.showCount = true
          })
        } else {
          this.showCount = false
        }
      this.getList()
    },
    onGoBack () {
      this.show = false
      this.getList()
    },
    handleStatistics () {
      this.$refs.dialogStatistics.open()
    },
    handleExport () {
      this.exportBtnLoading = true
      exportPage().then(() => {
        this.exportBtnLoading = false
      }).catch(() => {
        this.exportBtnLoading = false
      })
    },
    getVillageOrg () {
      getVillageByOrg().then(res=>{
        this.orgList = res.data.data
        this.orgSearchList = this.orgList.slice()
        this.orgSearchList.unshift({userId:'',villageName:'全部'})
      })
    },
    getLabel (data, value) {
      let label = ''
      data.forEach((item) => {
        if (item.value === value) {
          label = item.label
          return false
        }
      })
      return label
    },
    getList () {
      let params = Object.assign({}, this.params)
      if (Array.isArray(params.rangeTime) && params.rangeTime.length > 0) {
        params.startDate = params.rangeTime[0]
        params.endDate = params.rangeTime[1]
      }
      delete params.rangeTime
      this.tableLoading = true
      getPage(params).then(({ data }) => {
        if (data.code === 0) {
          this.pagedTable = data.data.records
          this.total = data.data.total
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    },
    handleImg (row) {
      this.imgList = row.relationshipImages || []
      this.dialogVisible = true
    },
    handleAdd () {
      this.show = true
      this.status = 'add'
      this.$nextTick(() => {
        this.$refs.formContainer.open()
      })
      // this.$router.push({
      //   path: '/relation_ship/form',
      //   query: {
      //     status: 'add',
      //   },
      // })
    },
    handleDetail (row) {
      this.show = true
      this.status = 'detail'
      this.$nextTick(() => {
        this.$refs.formContainer.open(row.id)
      })
      // this.$router.push({
      //   path: '/relation_ship/form',
      //   query: {
      //     id: row.id,
      //     status: 'detail',
      //   },
      // })
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        removePage({id: row.id}).then(({ data }) => {
          if (data.code === 0) {
            this.params.current = 1
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    handleEdit (row) {
      this.show = true
      this.status = 'update'
      this.$nextTick(() => {
        this.$refs.formContainer.open(row.id)
      })
      // this.$router.push({
      //   path: '/relation_ship/form',
      //   query: {
      //     id: row.id,
      //     status: 'update',
      //   },
      // })
    },
    currentChange (val) {
      this.params.current = val
      this.getList()
    },
  },
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom:0 !important;
}
.count-wrapper {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #f6f6f6;
}
.title-count {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
  font-weight: 700;
}
</style>