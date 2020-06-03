<template>
  <div class="port-detail">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>
      <el-form :disabled="type === 'view'" ref="form" :model="form" :rules="rules" label-width="150px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="港口名称：" prop="portName">
              <el-input maxlength="20" v-model="form.portName"></el-input>
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
            <el-form-item label="所属区域：" prop="areaCode">
              <el-cascader v-model="form.areaCode" :options="options" @active-item-change="handleItemChange" :props="props"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="24">           
            <el-form-item label="港口地址:" prop="address" class="amap-page-container is-required">
            <el-amap-search-box class="search-box training" v-model="form.address" :search-option="searchOption" :on-search-result="onSearchResult" style="width: 450px; height:30px;margin-top: 10px"></el-amap-search-box>
            <el-amap vid="amapDemo" :center="mapCenter" :zoom="15" class="amap-demo">
                <el-amap-marker :position="marker"></el-amap-marker>
            </el-amap>
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
// import { getShipDetail, createShip, updateShip} from '@/api/ships/index'
import { getArea, getAllArea, getAllAreaName } from '@/api/post/address'
import { addPort,updatePort,getPortById} from '@/api/ships/port'
import { initForm , rules } from '../options'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
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
      // 地图配置
        marker: [121.59996, 31.197646],
        searchOption: {
            city: '全国',
            citylimit: false,
        },
        mapCenter: [121.59996, 31.197646],
    }                               
  },
  computed: {                                                                                                                                                               
    type () {
      return this.$route.params.type
    },
    portId () {
      return this.$route.params.id
    },
    getTitle () {                                                                     
      return `${this.type === 'create' ? '新增' : this.type === 'update' ? '编辑' : ''}港口信息`
    },
  },
  created () {
      lazyAMapApiLoaderInstance.load().then(() => {
              setTimeout(()=>{ 
                  this.show = true
                  getPortById(this.portId).then( res=>{
                    let portdetail = res.data.data
                    document.getElementsByClassName(            
                      'search-box-wrapper'
                    )[0].childNodes[0].value = portdetail.address
                    this.mapCenter = [portdetail.lng,portdetail.lat]
                    this.marker = [portdetail.lng,portdetail.lat]
                    this.show = true
                  })
                //   if(this.$route.query.edit || this.$route.query.see || this.$route.query.userId){                                                    
                //   detailTraining(this.$route.query.edit || this.$route.query.see || this.$route.query.userId).then( res=>{
                //     this.training = res.data.data
                //     //checkbox
                //     if(this.training.trainScope){
                //           this.trainGroup = this.training.trainScope.split(',')
                //     }
                //     document.getElementsByClassName(            
                //       'search-box-wrapper'
                //     )[0].childNodes[0].value = this.training.address
                //     this.mapCenter = [this.training.lng,this.training.lat]
                //     this.marker = [this.training.lng,this.training.lat]
                //     this.show = true
                //   })
                // }
              }, 100)
        })                              
    // this.getRogionList(0, 'province')                         
    if (this.type !== 'create' && this.portId) {                                      
      this.getportDetail()
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
    getportDetail () {                                      
      getPortById(this.portId).then(({data}) => {
        if (data.code === 0) {
          if(data.data.areaCode !== 0){
            getAllArea(data.data.areaCode).then( res=>{
              this.options = res.data.data
            })
          }
          if(data.data.areaCode === 0){
            this.form = data.data  
            getArea(330000000000).then(res=>{
              this.options = res.data.data
              this.options.forEach(item=>{
                this.$set(item,'childList',[])
              })
            })
            this.form.areaCode = this.options      
          }else {
            getAllAreaName(data.data.areaCode).then( res=>{
              // 处理后端数据变成我要用的数据
              this.getarr(res.data.data,this.arr)
              data.data.areaCode = this.arr
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
        //   this.form.regionId = this.form.regionId[this.form.regionId.length - 1]
          if (this.type === 'create') {
            this.form.areaCode = this.form.areaCode[this.form.areaCode.length-1]
            addPort(this.form).then(({data}) => {
              if (data.code === 0) {
                this.$message.success('添加成功！')
                this.onGoBack()
              }
            }, (error) => {
              this.$message.error(error.message)
            })
          } else if (this.type === 'update') {
             this.form.areaCode = this.form.areaCode[this.form.areaCode.length-1]
            updatePort(this.form).then(({data}) => {
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
    onSearchResult (pois) {
        this.form.address = pois[0].address
        this.form.lng = pois[0].lng
        this.form.lat = pois[0].lat
        this.mapCenter = [pois[0].lng, pois[0].lat]
        this.marker = [pois[0].lng, pois[0].lat]
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
<style lang="scss">
.port-detail {
    .amap-demo {
        height: 300px;
        margin-top: 60px;
    }
    .search-box {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
    }
    .amap-page-container {
        position: relative;
    }
    .amap-logo {
        display: none;
    }
    .el-vue-search-box-container .search-tips {
        position: absolute;
        top: 100%;
        border: 1px solid #dbdbdb;
        background: #fff;
        overflow: auto;
        height: 300px;
        overflow: auto;
    }
}
</style>