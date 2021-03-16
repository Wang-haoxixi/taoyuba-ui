<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>
      <el-form :disabled="type === 'view'" ref="form" :model="form" :rules="rules" label-width="150px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="渔船名：" prop="shipName">
              <el-input maxlength="20" v-model="form.shipName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渔船编号：" prop="shipNo">
              <el-input maxlength="50" v-model="form.shipNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="持证人：" prop="shipowner">
              <el-input maxlength="20" v-model="form.shipowner"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="持证人身份证号码：" prop="shipownerIdcard">
              <el-input maxlength="18" v-model="form.shipownerIdcard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
          <el-col :span="12">
            <!-- <el-form-item label="所属渔村区域：" prop="villageId">
              <span v-for="(region, key) in regions" :key="key">
                <el-select v-model="regionChosen[key]" v-show="region.length > 0">
                  <el-option v-for="item in region"
                             :key="item.areaCode"
                             :value="item.areaCode"
                             :label="item.name"></el-option>
                </el-select>
              </span>
            </el-form-item> -->
            <el-form-item label="所属行政区域：" prop="regionId">
              <el-cascader v-model="form.regionId" :options="options" @active-item-change="handleItemChange" :props="props"></el-cascader>
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
            <el-form-item label="渔船所有权登记证书：" prop="licensesOwnerShip">
              <el-input maxlength="30" v-model="form.licensesOwnerShip"></el-input>
            </el-form-item>
          </el-col>          
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="捕捞许可证编号：" prop="licensesFishingNo">
              <el-input maxlength="50" v-model="form.licensesFishingNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国籍证书编号：" prop="licensesNationalNo">
              <el-input maxlength="50" v-model="form.licensesNationalNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="船舶检验证书编号：" prop="licensesInspectionNo">
              <el-input maxlength="50" v-model="form.licensesInspectionNo"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <iep-form-item class="form-half" prop="licensesDateIssue" label-name="签发日期">
              <iep-date-picker v-model="form.licensesDateIssue" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col> -->
          <el-col :span="12">
            <iep-form-item class="form-half" prop="licensesDateExpire" label-name="证书有效期">
              <iep-date-picker v-model="form.licensesDateExpire" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
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
            <el-form-item label="实际作用方式：" prop="workMode">
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
        </el-row>
        <el-form-item label="" v-if="type !== 'view'">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>        
import { getShipDetail, createShip, updateShip, 
  // getRogionList
} from '@/api/ships/index'
import { getArea, getAllArea, getAllAreaName } from '@/api/post/address'
import { initForm , rules } from '../options'
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
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        children: 'childList',
      },
      arr:[],
    }                               
  },
  computed: {                                                                                                                                                               
    type () {
      return this.$route.params.type
    },
    shipId () {
      return this.$route.params.id
    },
    getTitle () {                                                                     
      return `渔船信息${this.type === 'create' ? '新增' : this.type === 'update' ? '编辑' : ''}`
    },
  },
  created () {                                    
    // this.getRogionList(0, 'province')                         
    if (this.type !== 'create' && this.shipId) {                                      
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
        if (data.code === 0) {
          // this.regionChosen.province = data.data.province
          // this.regionChosen.city = data.data.city
          // this.regionChosen.district = data.data.district
          // this.regionChosen.town = data.data.town
          // this.regionChosen.village = data.data.villageId
          if(data.data.regionId !== 0){
            getAllArea(data.data.regionId).then( res=>{
              this.options = res.data.data
            })
          }
          if(data.data.regionId === 0){
            this.form = data.data  
            getArea(330000000000).then(res=>{
              this.options = res.data.data
              this.options.forEach(item=>{
                this.$set(item,'childList',[])
              })
            })
            this.form.regionId = this.options        
          }else {
            getAllAreaName(data.data.regionId).then( res=>{
              // 处理后端数据变成我要用的数据
              this.getarr(res.data.data,this.arr)
              data.data.regionId = this.arr
              this.form = data.data
            })
          }
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    getarr (node) {
      this.arr.push(node.areaCode)
      if(node.child){
        this.getarr(node.child)
      }
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.regionId = this.form.regionId[this.form.regionId.length - 1]
          if (this.type === 'create') {
            createShip(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('添加成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          } else if (this.type === 'update') {
            updateShip(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('修改成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          }
        } else {
          this.$message.error('请按规则输入填写表单！')
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)       
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