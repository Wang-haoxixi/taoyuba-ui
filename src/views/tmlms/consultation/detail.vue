<template>
  <div class="contract-box port-detail">
    <page-header title="面对面教育" :backOption="backOption"></page-header>
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small" :rules="rules">
        <el-row :gutter="80">
          <!-- <el-col :span="12">
              <el-form-item label="区域：" prop="orgId">
                    <el-select v-model="form.orgId" placeholder="请选择">
                      <el-option label="象山区域" :value="1"> </el-option>
                      <el-option label="衢山区域" :value="21"> </el-option>
                      <el-option label="普陀区域" :value="32"> </el-option>
                    </el-select>
              </el-form-item>
          </el-col> -->
          <el-col :span="12">
              <el-form-item label="主题：" prop="meetName">
                <el-input v-model="form.meetName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="培训讲师：" prop="lecturer">
                  <el-input v-model="form.lecturer" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="时间：" prop="meetStartTime">
                <el-date-picker
                  v-model="form.meetStartTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="合作社：">
                  <el-select v-model="form.cooperateIds" multiple filterable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.userId"
                      :label="item.villageName"
                      :value="item.userId">
                    </el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="参会人员及时间点：" class="amap-page-container is-required">
                <el-row>
                  <el-col :span="5">
                    <div class="time-consultation" v-for="(item,index) in form.list" :key="index"><span class="span-consultation">{{ arr[item.userType] }}参加:</span> <el-switch v-model="item.status" active-color="#13ce66" inactive-color="#ff4949" :disabled="setDisabled(item)"></el-switch></div>
                  </el-col>
                  <el-col :span="12">
                    <div class="time-consultation" v-for="(item,index) in form.list" :key="index">
                        <el-time-select
                          placeholder="起始时间"
                          v-model="item.meetStartTime"
                          :disabled="!item.status"
                          :picker-options="{
                            start: '00:00',
                            step: '00:05',
                            end: '23:59'
                          }">
                        </el-time-select>
                        <el-time-select
                          placeholder="结束时间"
                          :disabled="!item.status"
                          v-model="item.meetEndTime"
                          :picker-options="{
                            start: '00:00',
                            step: '00:05',
                            end: '23:59',
                            minTime: item.meetStartTime
                          }">
                        </el-time-select>
                    </div>
                  </el-col>
                </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="培训地点：" prop="address" class="amap-page-container">
                <div>
                  <el-input id="tipinput" v-model="form.address"></el-input>
                    <div id="GDMap" style="height:400px;margin-top: 20px"></div>
                    <div id="panel"></div>
                    <!-- <input id="tipinput" type="text" /> -->
                  </div>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="培训内容：" class="amap-page-container is-required" prop="content">
              <iep-froala-editor v-model="form.content" :value="form.content"></iep-froala-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="sumbit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getVillage } from '@/api/tmlms/bvillage/index'
import { create,detail,edit } from '@/api/tmlms/consultation/index'
import loadMap from '@/util/loadMap'
import map from '@/mixins/map.js'
export default {
  mixins: [map],
  data () {
    return {
      form: {
        content: '',
        list:[{
          userType: 0,
          meetStartTime: '',
          meetEndTime: '',
          status: false,
        },{
          userType: 1,
          meetStartTime: '',
          meetEndTime: '',
          status: false,
        },{
          userType: 2,
          meetStartTime: '',
          meetEndTime: '',
          status: false,
        }],
      },
      arr: ['船东','职务船员','渔船监护人'],
      startTime: '',
      endTime: '',
      time: [],
      options:[],
      loading: false,
      rules: {
        meetName: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
        lecturer: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
        meetStartTime: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
        orgId: [
          { required: true, message: '此项不能为空', trigger: 'blur' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.back() },
      },
    }
  },
  methods: {
    getDetail (id) {
      if( id ){
        detail(id).then(res=>{
          // 数据拿到后需要进行一系列的转化
          this.form = res.data.data
          // 合作社的转化 经纬度的转化 还要转成数字
          this.form.cooperateIds = JSON.parse(this.form.cooperateIds)
          // this.form.cooperateIds.map(s => +s)
          this.form.location = JSON.parse(this.form.location)
          this.form.meetStartTime = this.form.meetStartTime.slice(0,10)
          // this.form.location.map(s => +s)
          // console.log(this.form)
          this.showCityInfo(this.form.location)
        })
      }else{
        this.showCityInfo()
      }
    },
    back () {
      this.$emit('back')
    },
    remoteMethod () {
      getVillage({size: 500,status: 2}).then(res=>{
        this.options = res.data.data.records
      })
    },
    showCityInfo (val) {
      /* eslint-disable */
      loadMap(this.key, this.plugins, this.v)
        .then(AMap => {
          this.GDMap = new AMap.Map("GDMap", {
            zoom: 18,
            center: val || [122.106691,30.015136],
          });
          if( val ){
            this.marker = new AMap.Marker({
              position: val,
              map: this.GDMap,
            })
          }
          this.GDMap.on("click", this.showInfoClick);
          this.GDMap.on("complete", () => {
            var auto = new AMap.Autocomplete({
              input: "tipinput"
            });

            var placeSearch = new AMap.PlaceSearch({
              map: this.GDMap
            }); //构造地点查询类
            AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
            let that = this
            function select(e) {
              placeSearch.setCity(e.poi.adcode);
              placeSearch.search(e.poi.name,()=>{
                  that.marker = new AMap.Marker({
                    position: [e.poi.location.lng,e.poi.location.lat ],
                    map: that.GDMap,
                  })
                  that.form.location = [e.poi.location.lng,e.poi.location.lat ]
                setTimeout(() => {
                  placeSearch.render.markerList.clear()
                }, 300)
              }); //关键字查询查询
            }
          });
        })
        .catch(() => {
          console.log("地图加载失败！");
        });
      /* eslint-enable */
    },
    showInfoClick (e) {
      /* eslint-disable */
      if (this.marker) {
        this.GDMap.remove(this.marker)
      }
      this.form.location = [e.lnglat.getLng(), e.lnglat.getLat()]
      this.marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
        map: this.GDMap,
      })
         /* eslint-enable */
    },
    // 提交
    sumbit () {
      // 解决有的时候地图插件的信息没有赋值  手动赋值下
      this.form.address = document.getElementById('tipinput').value
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 进行一系列的判断 和为了给后端的数据格式 进行转化 
          let form = JSON.parse(JSON.stringify(this.form))
          // 后端需要我将关闭的开关全部踢掉 并且判断时间不能为空
          for(var i = form.list.length - 1; i >= 0; i--){
            if( !form.list[i].status ){
              form.list.splice(i,1)
            }else{
              if( !form.list[i].meetStartTime || !form.list[i].meetEndTime ){
                this.$message.warning('参会具体时间不能为空!')
                return false
              }
              form.list[i].meetStartTime =form.list[i].meetStartTime.length > 10 ? `${ form.meetStartTime.slice(0,10) }${ form.list[i].meetStartTime.slice(10,22) }` :  `${ form.meetStartTime.slice(0,10) } ${ form.list[i].meetStartTime }:00`
              form.list[i].meetEndTime =form.list[i].meetEndTime.length > 10 ? `${ form.meetStartTime.slice(0,10) }${ form.list[i].meetStartTime.slice(10,22) }` : `${ form.meetStartTime.slice(0,10) } ${ form.list[i].meetEndTime }:00`
            }
          }
          // 后端的时间 开始和结束是同一个
          form.meetStartTime = `${form.meetStartTime} 00:00:00`
          form.meetEndTime = form.meetStartTime
          // 后端需要我吧数组转成字符串给他 这个是多个合作社
          form.cooperateIds = JSON.stringify(form.cooperateIds)
          // 这个是转成经纬度给他
          form.location = JSON.stringify(form.location)
          if( !form.location ){
            this.$message.warning('请在地图选取具体地点!')
            return false
          }
          console.log(localStorage.getItem('orgId'))
          form.orgId = localStorage.getItem('orgId') || 1
          // 有机会要找个理由吧后端打死
          if( form.id ){
            edit(form).then(res=>{
              console.log(res)
              if(res.data.code === 0){
                this.$message.success('操作成功!')
                this.$emit('back')
              }
            })
          }else{
            create(form).then(res=>{
              console.log(res)
              if(res.data.code === 0){
                this.$message.success('操作成功!')
                this.$emit('back')
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setDisabled (val) {
      if( val.userType === 1 ){
        if( this.form.list[0].status || this.form.list[2].status ){
          return true
        }else{
          return false
        }
      }else{
        if( this.form.list[1].status ){
          return true
        }else{
          return false
        }
      }
    },
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.remoteMethod()
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
#container {
  width: 500px;
  height: 500px;
}
.contract-box {
  padding: 20px;
}
.time-consultation {
  display: flex;
  align-items: center;
  height: 45px;
  ::v-deep .el-date-editor.el-input {
    margin: 10px;
  }
  ::v-deep .el-switch {
    margin: 10px;
  }
}
.span-consultation {
  display: inline-block;
  width: 105px;
}
</style>
