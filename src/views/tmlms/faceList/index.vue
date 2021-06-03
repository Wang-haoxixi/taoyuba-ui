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
              <el-button size="mini" @click="handleView(scope.row.id)" v-if="!isSelect">编辑
              </el-button>
              <span v-if="!isSelect">
                <el-button size="mini" @click="handleDel(scope.row.faceToken)" v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1">删除
                </el-button>
              </span>
              <el-button size="mini" @click="handleSelect(scope.row)" v-if="!isSelect">关联渔船
              </el-button>
              <el-button size="mini" @click="selectRow(scope.row)" v-if="isSelect">选择
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
    <detail v-else ref="detail" @back="detailType = true;getData()"></detail>
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
  props: {
    isSelect: {
      type: Boolean,
      default: false,
    },
  },
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
    selectRow (row) {
      this.$emit('selectPeople',row)
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
    mounted () {
            //添加socket事件监听
        this.$socket.emit('connect')
        this.$socket.emit('startRead')
        this.sockets.subscribe('card message', (msg) => {
          var base = new Base64()
          //2.解密后是json字符串
          var result1 = base.decode(msg)
          var data = eval('('+result1+')')
          // 将数据录入
          this.form.realName = data.name
          this.form.idcard = data.cardno
        })
            //格式化拿到的數據
    function Base64 () { 
      // private property 
      var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      // public method for decoding 
      this.decode = function (input) { 
          var output = ''
          var chr1, chr2, chr3 
          var enc1, enc2, enc3, enc4 
          var i = 0 
          input = input.replace(/[^A-Za-z0-9+/=]/g, '') 
          while (i < input.length) { 
              enc1 = _keyStr.indexOf(input.charAt(i++)) 
              enc2 = _keyStr.indexOf(input.charAt(i++)) 
              enc3 = _keyStr.indexOf(input.charAt(i++)) 
              enc4 = _keyStr.indexOf(input.charAt(i++)) 
              chr1 = (enc1 << 2) | (enc2 >> 4) 
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2) 
              chr3 = ((enc3 & 3) << 6) | enc4 
              output = output + String.fromCharCode(chr1) 
              if (enc3 != 64) { 
                  output = output + String.fromCharCode(chr2) 
              } 
              if (enc4 != 64) { 
                  output = output + String.fromCharCode(chr3) 
              } 
          } 
          output = _utf8_decode(output) 
          return output 
      }  
      
      // private method for UTF-8 decoding 
      var _utf8_decode = function (utftext) { 
          var string = '' 
          var i = 0 
          var c = 0
          var c2 = 0 
          var c3 = 0 
          while ( i < utftext.length ) { 
              c = utftext.charCodeAt(i) 
              if (c < 128) { 
                  string += String.fromCharCode(c) 
                  i++ 
              } else if((c > 191) && (c < 224)) { 
                  c2 = utftext.charCodeAt(i+1) 
                  string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)) 
                  i += 2 
              } else { 
                  c2 = utftext.charCodeAt(i+1) 
                  c3 = utftext.charCodeAt(i+2) 
                  string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)) 
                  i += 3 
              } 
          } 
          return string 
      } 
   }
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
