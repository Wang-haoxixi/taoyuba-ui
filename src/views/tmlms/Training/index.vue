<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="培训机构"></page-header>
      <div class="shipowner_title">
        <el-button type="primary" size="small" @click="addShipowner">新增</el-button>
        <div style="float:right">
          <span><el-input v-model.trim="params.deptName" placeholder="请输入机构名称" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.contactName" placeholder="请输入联系人" size="small" clearable></el-input></span>
          <span><el-input v-model.trim="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>   
          <span><el-input v-model.trim="params.address" placeholder="请输入机构地址" size="small" clearable></el-input></span>
          <span>
              <el-select v-model="params.trainScope" placeholder="请输入选择培训范围" size="small" clearable>
                <el-option
                  v-for="item in trainScopeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>   
          <el-button plain size="small"  @click="onSearch">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="shipownerList"
          :header-cell-style="{background:'#eef1f6', color:'#606266'}"
          stripe
          style="width: 100%;margin-top: 30px">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"
            :label="item.text"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button plain type="warning" size="small" @click="handleView(scope.row.userId)">查看
              </el-button>
              <el-button plain size="small" @click="handleEdit(scope.row.userId)">编辑
              </el-button>
              <el-button plain icon="el-icon-delete" size="small" @click="handleDel(scope.row.userId)">
              </el-button>
            </template>
          </el-table-column>
             <el-table-column label="排序" style="width:40px;" prop="sort">
              <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.sort"
                 controls-position="right"
                 @change="handleChange(scope.row)"
                 @blur="handleChange(scope.row)"
                  :min="1"
                 :max="100"
                 size="mini">
              </el-input-number>
               </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          :current-page.sync="params.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getTraining,deleteTraining,editSort } from '@/api/tmlms/Training'
import queryMixin from '@/mixins/query'
export default {
  mixins: [queryMixin],
  data () {
    return {
      shipownerList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        deptName: '',
        contactName: '',
        phone: '',
        address: '',
        trainScope:'',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '机构名称',
            value: 'deptName',
          },
          {
            text: '联系人',
            value: 'contactName',
          },
          {
            text: '联系电话',
            value: 'phone',
          },
          {
            text: '机构地址',
            value: 'address',
          },
           {
            text: '培训范围',
            value: 'trainScope',
          },
        ],
      },
      trainScopeOptions:[
        {
          value: '各类各级渔业职务船员培训',
          label: '各类各级渔业职务船员培训',
        }, {
          value: 'GMDSS无线电操作员培训、电机员培训',
          label: 'GMDSS无线电操作员培训、电机员培训',
        }, {
          value: '外海二级及以下渔业职务船员岗位适任培训',
          label: '外海二级及以下渔业职务船员岗位适任培训',
        }, {
          value: '国内一级及以下渔业职务船员培训',
          label: '国内一级及以下渔业职务船员培训',
        }, {
          value: '普通船员培训',
          label: '普通船员培训',
        },
         {
          value: '机驾长培训',
          label: '机驾长培训',
        },
      ],
    }
  },
  methods: {
    onSearch () {
      this.params.current = 1
      this.setQuery()
      this.getData()
    },
    // 分页
    currentChange (val) {
      this.params.current = val
      this.setQuery({ current: this.params.current })
      this.getData()
    },
    // 跳转新增页面
    addShipowner () {
      this.$router.push({name: 'detailTraining'})
    },
    // 查看
    handleView (val) {
      this.$router.push({name: 'detailTraining',query:{ see: val }})
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({name: 'detailTraining',query:{ edit: val }})
    },
    // 获取列表数据
    getData () {
      getTraining(this.params).then(res=>{
        this.shipownerList = res.data.data.records
        this.total = res.data.data.total
      })
    },
    // 删除
    handleDel (id) {
        this.$confirm('此操作将永久删除该培训机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteTraining(id).then(res=>{
            this.$message({
              type: 'success',
              message: res.data.msg,
            })
            this.getData()
          }).catch(err=>{
            this.$message.error(err.data.msg)
          })
        }).catch(() => {         
        })
    },
   handleChange (row) {                        
       let newDept = { userId:row.userId,sort:row.sort }    
        editSort(newDept).then(data => {
          if(data.data.data){                    
              this.getData()        
          }
      })      
    },
  },
  computed: {
  },
  created () {
    this.getQuery()
    this.getData()
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        1: '审核中',
        2: '审核通过',
        3: '审核失败',
      }
      return typeMap[type]
    },
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
