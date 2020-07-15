<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>
      <el-form :disabled="type === 1" ref="form" :model="form" :rules="rules" label-width="150px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔船名：" prop="shipName">
              <el-input maxlength="20" placeholder="请输入渔船名" v-model="form.shipName"></el-input>
              <!-- <el-select v-model="form.shipName" placeholder="请选择渔船名" :disabled="type === 2" @change="shipNameChange">
                <el-option
                  v-for="item in shipNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渔船编号：" prop="shipNo">
              <template v-if='form.shipNo'>
              <el-input maxlength="50"  v-model="form.shipNo" ></el-input>
              </template>
              <template v-else>
              <el-input maxlength="50"  v-model="form.shipNo" ></el-input>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="持证人：" prop="shipowner">
              <el-input maxlength="20" v-model="form.shipowner" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="持证人身份证号码：" prop="shipownerIdcard">
              <template v-if="form.shipownerIdcard">
              <el-input maxlength="18" v-model="form.shipownerIdcard"></el-input>
              </template>
              <template v-else>
                <el-input maxlength="18" v-model="form.shipownerIdcard"></el-input>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮政编码：" prop="zipcode">
              <el-input maxlength="6" v-model="form.zipcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码：" prop="mobile">
              <el-input maxlength="13" v-model="form.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系地址：" prop="address">
              <el-input maxlength="100" v-model="form.address"></el-input>
            </el-form-item>
          </el-col> 
          <el-col :span="12">
            <el-form-item label="渔船股份性质：" prop="shipShare">
              <el-select v-model="form.shipShare">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_contract_ship_attr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔船所有权登记证书：" prop="licensesOwnerShip">
              <el-input maxlength="30" v-model="form.licensesOwnerShip"></el-input>
            </el-form-item>
          </el-col>  
          <el-col :span="12">
            <el-form-item label="捕捞许可证编号：" prop="licensesFishingNo">
              <el-input maxlength="50" v-model="form.licensesFishingNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  v-if="this.$route.query.see">
          <el-col :span="12">
            <el-form-item label="所属基层：" prop="villageName">
                <el-input maxlength="50" v-model="form.villageName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <iep-form-item class="form-half" prop="licensesDateExpire" label-name="证书有效期">
                <iep-date-picker v-model="form.licensesDateExpire" type="date" placeholder="选择日期"></iep-date-picker>
              </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="国籍证书编号：" prop="licensesNationalNo">
              <el-input maxlength="50" v-model="form.licensesNationalNo"></el-input>
            </el-form-item>
          </el-col>   
          <el-col :span="12">
            <el-form-item label="船舶检验证书编号：" prop="licensesInspectionNo">
              <el-input maxlength="50" v-model="form.licensesInspectionNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主机总功率(kw)：" prop="engineTotalPower">
              <el-input maxlength="6" v-model="form.engineTotalPower"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机功率(kw)：" prop="mainEnginePower">
              <el-input maxlength="6" v-model="form.mainEnginePower"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="双控功率(kw)：" prop="dualPower">
              <el-input maxlength="6" v-model="form.dualPower"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机型号：" prop="mainEngineModel">
              <el-input maxlength="50" v-model="form.mainEngineModel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总吨位：" prop="grossTonnage">
              <el-input maxlength="3" v-model="form.grossTonnage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船长（m）：" prop="hullLength">
              <el-input maxlength="6" v-model="form.hullLength"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="船体材料：" prop="hullMaterial">
              <el-select v-model="form.hullMaterial">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_ship_material"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船籍港：" prop="portRegister">
              <el-select v-model="form.portRegister">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_ship_port"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔具名称：" prop="fishingGear">
              <el-select v-model="form.fishingGear">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_fishing_gear"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建造完工日期：" prop="buildDate">
              <iep-date-picker v-model="form.buildDate" type="date" placeholder="选择日期"></iep-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业类型：" prop="activityType">
              <el-select v-model="form.activityType">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_resume_worktype"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业方式1：" prop="workMode">
              <el-select v-model="form.workMode">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_work_mode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业方式2：" prop="workMode">
              <el-select v-model="form.workMode2">
                <el-option
                        v-for="item in $store.getters.dictGroup.tyb_work_mode"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主捕种类：" prop="fishType">
              <el-input maxlength="100" v-model="form.fishType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="型宽：" prop="mouldedBreadth">
              <el-input maxlength="6" v-model="form.mouldedBreadth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型深：" prop="mouldedDepth">
              <el-input maxlength="6" v-model="form.mouldedDepth"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="净吨位：" prop="netTonnage">
              <el-input maxlength="3" v-model="form.netTonnage"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!this.$route.query.see">
              <iep-form-item class="form-half" prop="licensesDateExpire" label-name="证书有效期">
                <iep-date-picker v-model="form.licensesDateExpire" type="date" placeholder="选择日期"></iep-date-picker>
              </iep-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="所属行政村：" prop="regionId">
              <el-cascader v-model="form.regionId" :options="options" @active-item-change="handleItemChange" :props="props"></el-cascader>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-form-item label="" v-if="type !== 1">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>        
import {  createShip, updateShip, getShipDetail,
// getRogionList, 
findMyship } from '@/api/ships/index'
import { initForm , rules } from '../options'
import { getVillageshipinfoByuser, getVillageshipinfoById } from '@/api/tmlms/bvillage/villageship'
import { detailVillage } from '@/api/tmlms/bvillage/index'
import { getUserInfo } from '@/api/login'
import { getArea, 
// getAllArea, 
// getAllAreaName 
} from '@/api/post/address'
export default {
  data () {
    return {                  
      backOption: {         
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),
      regions: {                              
        province: [],
        city: [],
        district: [],
        town: [],
        village: [],
      },
      regionChosen: {         
        province: '',
        city: '',
        district: '',
        town: '',
        village: '',
      },
      init: false,
      shipNameList: [],
      userId: '',
      shipnameInfo:'',
      isState: true, 
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        children: 'childList',
      },
      arr:[],
      manager: false,
      villageName:'',
    }                               
  },
  computed: {                                                                                                                                                               
    type () {     
      // return this.$route.query
      if (this.$route.query.see) {
        return 1
      } else if (this.$route.query.edit) {
        return 2
      }
      return 3
    },
    shipId () {
      if(this.$route.query.see) {
        return this.$route.query.see
      } else if (this.$route.query.edit) {
        return this.$route.query.edit
      }
      return 0
    },
    getTitle () {                                                                    
      return `${ this.$route.query.see ? '查看' : this.$route.query.edit ? '编辑' :'新增' }渔船信息`
    },
  },
  created () {                                    
    // this.getRogionList(0, 'province')   
    this.getshipNameList() 
    if ((this.$route.query.see || this.$route.query.edit)&& this.shipId) {                              
      this.getShipDetail()
    } else {       
      getArea(330000000000).then(res=>{
        this.options = res.data.data
        this.options.forEach(item=>{
          this.$set(item,'childList',[])
        })
      })
    } 
  },
  mounted () {                    
  },
  methods: {
    handleItemChange (val) {
      getArea(val[val.length-1]).then(res=>{
        let data = res.data.data
        this.getNode(this.options,val[val.length-1],data)
      })
    },
    getNode (node,val,data) {
      node.forEach(res=>{
        if(res.areaCode == val){
          res.childList = data
          if(res.level < 3){
              res.childList.forEach(item=>{
                if(item.childList === undefined){
                    this.$set(item,'childList',[])
                }
              })
          }
        }else{
          if(res.childList && res.childList.length !== 0){
            this.getNode(res.childList,val,data)
          }
        }
      })
    },                                                                                                                                                                                                                                                                                                     
    // getRogionList (pid, target) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    //   getRogionList(pid).then(({data}) =>   {                                  
    //     if (data.code === 0) {
    //       this.regions[target] = data.data
    //     }
    //   }, (error) => {       
    //     this.$message.error(error.message)
    //   })                                                                                                                                              
    // },                                      
    getShipDetail () {                                      
      getShipDetail(this.shipId).then(({data}) => {
        if(data.data.villageId){
          detailVillage(data.data.villageId).then(res=>{
          // console.log(res.data.data)
          this.villageName = res.data.data.villageName
          }).then(()=>{
            this.form = data.data
            this.form.villageName = this.villageName
            console.log(this.form)
          })
        }
        
        // if (data.code === 0) {
        //   // this.regionChosen.province = data.data.province
        //   // this.regionChosen.city = data.data.city
        //   // this.regionChosen.district = data.data.district
        //   // this.regionChosen.town = data.data.town
        //   // this.regionChosen.village = data.data.villageId
        //   if(data.data.regionId !== 0){
        //     getAllArea(data.data.regionId).then( res=>{
        //       this.options = res.data.data
        //     })
        //   }
        //   if(data.data.regionId === 0){
        //     this.form = data.data  
        //     getArea(330000000000).then(res=>{
        //       this.options = res.data.data
        //       this.options.forEach(item=>{
        //         this.$set(item,'childList',[])
        //       })
        //     })
        //     this.form.regionId = this.options        
        //   }else {
        //     getAllAreaName(data.data.regionId).then( res=>{
        //       // 处理后端数据变成我要用的数据
        //       this.getarr(res.data.data,this.arr)
        //       data.data.regionId = this.arr
        //       this.form = data.data
        //     })
        //   }
        // }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    // handleSubmit () {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       if (this.type === 'create') {
    //         createShip(this.form).then(({data}) => {
    //           if (data.code === 0) {
    //             this.$message.success('添加成功！')
    //             this.onGoBack()
    //           }
    //         }, (error) => {
    //           this.$message.error(error.message)
    //         })
    //       } else if (this.type === 'update') {
    //         updateShip(this.form).then(({data}) => {
    //           if (data.code === 0) {
    //             this.$message.success('修改成功！')
    //             this.onGoBack()
    //           }
    //         }, (error) => {
    //           this.$message.error(error.message)
    //         })
    //       }
    //     } else {
    //       this.$message.error('请按规则输入填写表单！')
    //     }
    //   })
    // },
    getarr (node) {
      this.arr.push(node.areaCode)
      if(node.child){
        this.getarr(node.child)
      }
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {
        // this.form.regionId = this.form.regionId[this.form.regionId.length - 1]
        if (valid) {
          if (this.$route.query.add) {
            createShip(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('添加成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          } else if (this.$route.query.edit) {
            updateShip(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('修改成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          }
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)       
    },
    getshipNameList () {
      getUserInfo().then(data => {
        this.userId = data.data.data.sysUser.userId
        if(data.data.data.roles.includes(112)){
          this.form.villageId = this.userId
        }
        if (data.data.data.roles.includes(111)) {
          this.manager = false
        } else {
          this.manager = true
        }
        if(this.userId=='4113' || this.userId=='4114' || this.userId=='4115'){
          this.manager = false
        }
        getVillageshipinfoByuser(this.userId).then(data => {
          this.shipNameList = data.data.data.map(item => {
            return {
              label: item.shipname,
              value: item.id,
            }
          })
        })
      })
    },
    showManager () {
      for(let item of this.shipNameList){
        if(!item.shipNo){
          this.manager=false
        }
      }
    },
    shipNameChange (val) {
      getVillageshipinfoById(val).then(data => {
        this.shipnameInfo = data.data.data.shipname
        findMyship(this.shipnameInfo).then(res => {
          if (res.data.data === false) {
            this.form = {}
            this.form.shipName = this.shipnameInfo
            this.isState = false
          } else {  
            this.form = res.data.data
            this.isState = true
          }       
        })
      })
    },
  },
  watch: {
    // 'regionChosen.province': function (val) {
    //   if (this.init) {
    //     this.regionChosen.city = ''
    //     this.regionChosen.district = ''
    //     this.regionChosen.town = ''
    //     this.regionChosen.village = ''
    //   }
    //   this.regions.city = []
    //   this.regions.district = []
    //   this.regions.town = []
    //   this.regions.village = []
    //   if (val) this.getRogionList(val, 'city')
    // },
    // 'regionChosen.city': function (val) {
    //   if (this.init) {
    //     this.regionChosen.district = ''
    //     this.regionChosen.town = ''
    //     this.regionChosen.village = ''
    //   }
    //   this.regions.district = []
    //   this.regions.town = []
    //   this.regions.village = []
    //   if (val) this.getRogionList(val, 'district')
    // },
    // 'regionChosen.district': function (val) {
    //   if (this.init) {
    //     this.regionChosen.town = ''
    //     this.regionChosen.village = ''
    //   }
    //   this.regions.town = []
    //   this.regions.village = []
    //   if (val) this.getRogionList(val, 'town')
    // },
    // 'regionChosen.town': function (val) {
    //   if (this.init) {
    //     this.regionChosen.village = ''
    //   }
    //   this.regions.village = []
    //   if (val) this.getRogionList(val, 'village')
    // },
    // 'regionChosen.village': function (val) {
    //   this.form.villageId = val
    // },
  },
}
</script>