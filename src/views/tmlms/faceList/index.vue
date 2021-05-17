<template>
  <div class="contract-box">
    <basic-container v-if="detailType">
      <div class="shipowner_title">
        <el-button @click="getData" type="default" size="small">刷新</el-button>
        <div style="float:right">
          <span style="width:120px" v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1">
            <el-select v-model="params.villageId" filterable placeholder="请选择基层" size="small" clearable>
              <el-option
                v-for="item in options"
                :key="item.userId"
                :label="item.villageName"
                :value="item.userId">
              </el-option>
            </el-select>
          </span>
          <span style="width:120px"><el-input v-model.trim="params.idcard" placeholder="身份证" size="small" clearable></el-input></span>
          <span style="width:120px">
            <el-select v-model="params.gatherType" filterable placeholder="请选择类型" size="small" clearable>
              <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span style="width:120px"><el-input v-model.trim="params.realName" placeholder="姓名" size="small" clearable></el-input></span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="faceList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="status"
            label="头像"
          >
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.image" style="width:100px">
            </div>
          </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="渔船"
            width="200"
          >
          <template slot-scope="scope">
            <div>
                <el-tag
                  v-for="(tag,index) in scope.row.ships"
                  :key="index"
                  style="margin:5px">
                  {{tag.shipName}}
                </el-tag> 
            </div>
          </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="gatherType"
            label="类型"
          >
          <template slot-scope="scope">
            <div>{{ scope.row.gatherType === 0? '船东' : scope.row.gatherType === 1?'职务船员':'家属' }}</div>
          </template>
          </el-table-column>
          <el-table-column
            prop="villageName"
            label="合作社"
          >
          </el-table-column>
          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row.id)">查看
              </el-button>
              <el-button size="mini" @click="handleDel(scope.row.faceToken)" v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1">删除
              </el-button>
              <el-button size="mini" @click="handleSelect(scope.row)">关联渔船
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="page.total"
          :page-size="page.size"
          :current-page.sync="page.current"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </basic-container>
    <detail v-else ref="detail" @back="detailType = true"></detail>
    <el-dialog
      title="渔船信息"
      :visible.sync="dialogVisible"
      width="70%"
      :destroy-on-close="true"
      >
      <selects ref="selectIndex"></selects>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getList,delList,selectShip } from '@/api/tmlms/faceList'
import { getVillage } from '@/api/tmlms/bvillage/index'
import detail from './detail.vue'
import selects from './selects.vue'
export default {
  name: 'faceList',
  mixins: [],
  data () {
    return {
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      params: {},
      detailType: true,
      faceList: [],
      dialogVisible: false,
      id: 0,
      roleId: [],
      options:[],
      optionsType: [
        {
          value: 0,
          label: '船东',
        },
        {
          value: 1,
          label: '职务船员',
        },
        {
          value: 2,
          label: '家属',
        },
      ],
    }
  },
  created () {
    this.getData()
    this.roleId = JSON.parse(localStorage.getItem('user')).roles
    console.log(this.roleId)
    getVillage({size: 500,status: 2}).then(res=>{
      this.options = res.data.data.records
    })
  },
  methods: {
        // 分页
    currentChange (val) {
      this.page.current = val
      this.getData()
    },
    getData () {
      getList({...this.params,...this.page}).then(res=>{
        this.faceList = res.data.data.records
        this.page = {
          size: res.data.data.size,
          current: res.data.data.current,
          total: res.data.data.total,
        }
      })
    },
    handleDel (id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          delList({ userId:id }).then(res=>{
            if( res.data.code === 0 ){
              this.$message.success('删除成功!')
              this.getData()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
        })
    },
    handleView (id) {
      this.detailType = false
      this.$nextTick(()=>{
        this.$refs.detail.getDetail(id)
      })
    },
    // 关联渔船
    handleSelect (row) {
      this.dialogVisible = true
      this.$nextTick(()=>{
        this.$refs.selectIndex.multipleSelection = JSON.parse(JSON.stringify(row.ships))
        this.id = row.id
      })
    },
    sureSelect () {
      selectShip({ id: this.id,ships: this.$refs.selectIndex.multipleSelection }).then(res=>{
        console.log(res)
        this.$message.success('关联成功!')
        this.getData()
        this.dialogVisible = false
      })
    },
  },
  components: {
    detail,
    selects,
  },
  filters: {
  },
  watch: {
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
.export-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.export-btn {
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 10px;
}
</style>
