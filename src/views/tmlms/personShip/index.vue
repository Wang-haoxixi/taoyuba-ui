.<template>
  <basic-container>
      <page-header title="人船联动"></page-header>
     <operation-container v-if="!roles.includes(112)">
        <template slot="right">
          <el-form :inline="true" :model="params" size="small">
            <el-form-item>
              <el-input v-model="params.shipName" placeholder="请输入船名">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-select clearable style="width: 120px !important;" v-model="params.villageId" placeholder="基层组织" size="small">
                <el-option
                  v-for="item in orgSearchList"
                  :key="item.index"
                  :label="item.villageName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item>
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
            </el-form-item> -->
            <el-form-item>
              <el-button type="default" @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-form>
        </template>
      </operation-container>
      <div class="title">
          未联系渔船船名号
      </div>
      <div class="content" v-if="tableData.records.length>0">
          <div class="contentItem" 
            :class="item.isResolved==2?'active':''" 
            :style="index%8==0?'border-left:1px solid #efefef':''" 
            v-for="(item,index) of tableData.records" :key="index"
            @click="showDialog(item)">
              {{item.shipName}}
          </div>
      </div>
      <div class="empty" v-else>暂无数据</div>
    <div style="text-align: center;margin: 20px 0;">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="params.size"
          :current-page.sync="params.current"
          @current-change="currentChange">
        </el-pagination>
    </div>
    <dialog-form-relation ref="dialogFormRelation" @closeDialog="close" v-model="formRelation"></dialog-form-relation>
  </basic-container>
</template>

<script>
import { getPage} from '@/api/tmlms/personShip'
import dialogFormRelation from '@/views/tmlms/relation/dialogForm'
import { getVillageByOrg} from '@/api/tmlms/bvillage/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    dialogFormRelation,
  },
    data (){
        return{
            tableData:{
              records:[],
            },
            params:{
                current: 1,
                size: 80,
                villageId:'',
                shipName:'',
                // rangeTime:[],
            },
            total:0,
            orgSearchList: [],
            formRelation: {},
            id:'',
        }
    },
    created (){
        this.getList()
        this.getVillageOrg()
    },
    computed: {
    ...mapGetters(['roles']),
  },
    methods:{
        getVillageOrg () {
            getVillageByOrg().then(res=>{
                let orgList = res.data.data
                this.orgSearchList = orgList.slice()
                this.orgSearchList.unshift({userId:'',villageName:'全部'})
            })
        },
        showDialog (item){
          if(item.isResolved==2){
            // console.log(item)
            this.id = item.shipId
            this.formRelation.shipName = item.shipName
            this.formRelation.shipownerName = item.shipowner
            this.formRelation.shipownerPhone =item.mobile
            this.$refs.dialogFormRelation.open()
          }
        },
        getList () {
          let params = Object.assign({}, this.params)
          getPage(params).then(({ data }) => {
            if (data.code === 0) {
              this.tableData = data.data
              this.total = data.data.total
            }
          })
        },
        currentChange (val){
          this.params.current = val
          this.getList()
        },
        close (){
          //新增成功
          // this.tableData.records.forEach(item=>{
          //   if(item.shipId==this.id){
          //     item.isResolved =1
          //     this.id = ''
          //   }
          // })
          this.getList()
        },
        onSearch (){
          this.params.current = 1
          this.getList()
        },
    },
}
</script>

<style lang="scss" scoped>
.title{
    width: 100%;
    border: 1px solid #efefef;
    padding:12px;
    font-size: 14px;
    line-height: 23px;
    color:rgb(0 0 0);
    font-weight: bold;
    background: rgb(242, 244, 245);
}
.content{
    display: grid;
    grid-template-columns: repeat(8,1fr);
    color: #606266;
    .contentItem{
        border-right:1px solid #efefef ;
        border-bottom:1px solid #efefef ;
        padding: 12px;
        font-size: 14px;
        line-height: 28px;
    }
}
.active{
    color:red;
    cursor: pointer;
}
.empty{
  font-size: 14px;
  line-height: 60px;
  color: #909399;
  text-align: center;
  border-bottom:1px solid #efefef ;
}
</style>