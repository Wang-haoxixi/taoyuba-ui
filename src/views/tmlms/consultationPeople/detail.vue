<template>
  <div class="contract-box port-detail">
    <page-header title="培训人员管理" :backOption="backOption"></page-header>
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small">
        <el-row :gutter="80">
          <el-col :span="12">
              <el-form-item label="姓名：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="手机号码：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="船名号：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="身份证号：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="角色：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="职务：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="会议名称：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="时间：" prop="realName">
                <el-input v-model="form.realName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="人脸头像：" prop="realName">
                <el-image
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="form.image" 
                  :preview-src-list="[form.image]">
                </el-image>
              </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="培训地点:" prop="address" class="amap-page-container is-required">
                <div>
                  <el-input id="tipinput" v-model="form.address"></el-input>
                    <div id="GDMap" style="height:400px;margin-top: 20px"></div>
                    <div id="panel"></div>
                    <!-- <input id="tipinput" type="text" /> -->
                  </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
import loadMap from '@/util/loadMap'
import map from '@/mixins/map.js'
export default {
  mixins: [map],
  data () {
    return {
      form: {},
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.back() },
      },
    }
  },
  methods: {
    // 获取详情
    getDetail () {

    },
    showCityInfo () {
      /* eslint-disable */
      loadMap(this.key, this.plugins, this.v)
        .then(AMap => {
          this.GDMap = new AMap.Map("GDMap", {
            zoom: 10
            //center: [119.947, 31.7728]
          });
          this.GDMap.on("complete", () => {
            var auto = new AMap.Autocomplete({
              input: "tipinput"
            });

            var placeSearch = new AMap.PlaceSearch({
              map: this.GDMap
            }); //构造地点查询类
            AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
            function select(e) {
              placeSearch.setCity(e.poi.adcode);
              placeSearch.search(e.poi.name,()=>{
                placeSearch.render.markerList.clear()
              }); //关键字查询查询
            }
          });
        })
        .catch(() => {
          console.log("地图加载失败！");
        });
      /* eslint-enable */
    },
    back () {
      this.$emit('back')
    },
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.showCityInfo()
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
</style>
