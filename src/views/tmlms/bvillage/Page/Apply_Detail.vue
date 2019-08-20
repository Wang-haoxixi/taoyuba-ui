<template>
  <div class="bvillage_detail">
    <basic-container>
        <h1>申请基层组织</h1>
        <el-form :model="bvillage" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="基层名称:" prop="villageName">
                <el-input v-model="bvillage.villageName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人:" prop="contactName">
                <el-input v-model="bvillage.contactName" placeholder="" :disabled="haveInfo.realName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="bvillage.phone" placeholder="" :disabled="haveInfo.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基层组织类型:" prop="type">
                <el-radio-group v-model="bvillage.type">
                  <el-radio :label="1">公司</el-radio>
                  <el-radio :label="2">服务站</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="基层地址:" prop="address" class="amap-page-container">
                <!-- <el-amap-search-box class="search-box bvillage" :search-option="searchOption" :on-search-result="onSearchResult" ></el-amap-search-box>
                <el-amap vid="amapDemoD" :center="mapCenter" :zoom="15" class="amap-demo" :plugin="plugin">
                    <el-amap-marker :position="marker"></el-amap-marker>
                </el-amap> -->
                <el-input v-model="bvillage.address" placeholder="请输入地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="介绍:" prop="content">
                <el-input v-model="bvillage.content" type="textarea" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="16">
              <el-form-item label="所属渔村区:" prop="villageId">
                <el-cascader  :options="options" @active-item-change="handleItemChange" :props="props" v-model="bvillage.villageId" ></el-cascader>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { saveVillage,detailVillage,editVillage } from '@/api/tmlms/bvillage'
import { getAllArea, getAllAreaName } from '@/api/tmlms/shipowner'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import { getArea } from '@/api/post/address.js'
// import { addUserRole } from '@/api/admin/user'
import information from '@/mixins/information'
export default {
  mixins: [information],
  data () {
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系电话'))
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
           callback()
        }
      }
    return {
        bvillage:{
            address: '',
            phone: '',
            contactName: '',
            content: '',
            villageId: '',
            villageName: '',
            type: 1,
        },
        rules: {
            villageName: [
                { required: true, message: '请输入机构名称', trigger: 'blur' },
            ],
            contactName: [
                { required: true, message: '请输入联系人', trigger: 'blur' },
            ],
            phone: [
                { required: true, message: '请输入联系电话', trigger: 'blur' },
                { validator: checkPhone, trigger: 'blur' },
            ],
            // content: [
            //     { required: true, message: '请输入介绍', trigger: 'blur' },
            // ],
            // villageId: [
            //     { required: true, message: '请输入社区', trigger: 'blur' },
            // ],
        },
        options: [],
        // 地图配置
        marker: [121.59996, 31.197646],
        searchOption: {
            city: '全国',
            citylimit: false,
        },
        mapCenter: [121.59996, 31.197646],
        plugin: [
            // {
            //   pName: 'Geolocation', //定位插件
            //   showMarker: true,
            //   events: {
            //     init (o) {
            //         console.log(o)
            //       定位成功 自动将marker和circle移到定位点
            //       o.getCurrentPosition( (status, result) => {
            //         if (!vm.edit) {
            //           vm.center = [result.position.lng, result.position.lat];
            //         }
            //       });
            //     },
            //   },
            // },
        ],
        props: {
          value: 'areaCode',
          label: 'name',
          children: 'childList',
        },
        arr: [],
        // userRole: {
        // userId: '',
        // roleId: 105,
        // },
        isDetail:{},
      }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let type = 2
            let data = JSON.parse(JSON.stringify(this.bvillage))
            data.lat = this.marker[1]
            data.lng = this.marker[0]
            data.villageId = data.villageId[data.villageId.length-1]
            // data.address = document.getElementsByClassName(
            //     'bvillage'
            // )[0].childNodes[0].childNodes[0].value
            // if(!data.address){
            //     this.$message.error('地址不能为空!')
            //     return false
            // }
            console.log(this.isDetail)
            if (!this.isDetail) {
                console.log('1111')
                saveVillage(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.go(-1)  
                }).catch(err=>{
                    this.$message.error(err.message)
                })
            } else {
                console.log('2222')
                editVillage(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.go(-1) 
                }).catch(err=>{
                    this.$message.error(err.message)
                })
            }

          } else {
          return false
        }
      })
    },
    onSearchResult (pois) {
        this.mapCenter = [pois[0].lng, pois[0].lat]
        this.marker = [pois[0].lng, pois[0].lat]
    },
    // 5級聯動
    handleItemChange (val) {
      getArea(val[val.length-1]).then(res=>{
        let data = res.data.data
        this.getNode(this.options,val[val.length-1],data)
      })
    },
    // 循环找对应的节点
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
    // 遍历数组 变成我需要的数据结构
    getarr (node) {
        this.arr.push(node.areaCode)
        if(node.child){
          this.getarr(node.child)
        }
    },
    async getAll () {
      // 异步获取ID
      let data = await detailVillage(this.$route.query.userId).then( res=>{
        return res.data.data
      })
      this.isDetail = data
      // 拿到ID 同步获取地址和选中的地址
      if(data) {       
        getAllAreaName(data.villageId).then(res=>{
          getAllArea(data.villageId).then( res=>{
            this.options = res.data.data
        })
        // 处理后端数据变成我要用的数据
        this.getarr(res.data.data, this.arr)
        data.villageId = this.arr
        this.bvillage = data
        // document.getElementsByClassName(
        //         'bvillage'
        // )[0].childNodes[0].childNodes[0].value = this.bvillage.address
        this.mapCenter = [this.bvillage.lng,this.bvillage.lat]
        this.marker = [this.bvillage.lng,this.bvillage.lat]
        })
      } else {
        getArea(0).then(res=>{
          this.options = res.data.data
          this.options.forEach(item=>{
            this.$set(item,'childList',[])
          })
        }) 
      }
    },
  },
  computed: {
  },
  created () {
    lazyAMapApiLoaderInstance.load().then(() => {
        setTimeout(()=>{ 
        // 编辑新增放同一个组件 判断分别
            this.$nextTick(() => {
              this.getAll.call(this)
            }) 
        }, 100)
    })
    // this.getInformation('bvillage',['phone','contactName'])
    // 获取编辑数据
  },
}
</script>
<style lang="scss">
.el-form {
  margin-right: 16%;
}
.bvillage_detail {
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
