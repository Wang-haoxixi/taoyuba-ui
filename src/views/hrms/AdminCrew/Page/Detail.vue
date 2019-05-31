<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="查看船员信息" :backOption="backOption"></page-header>
      <el-form disabled ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="个人姓名：" prop="realName">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">   
              <el-radio v-model="form.gender" :label="1">男</el-radio>
              <el-radio v-model="form.gender" :label="2">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号码：" prop="idcard">
              <el-input v-model="form.idcard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="birthday" label-name="出生日期">
              <iep-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭地址：" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭联系人：" prop="contactName">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家庭联系电话" prop="ontactPhone">
              <el-input v-model="form.ontactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="船民证号码" prop="crewCert">
              <el-input v-model="form.crewCert"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="certExpDate" label-name="船民证有效期限">
              <iep-date-picker v-model="form.certExpDate" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>               
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="四小件上传：" prop="fourSmallCard">
            <iep-avatar v-model="form.fourSmallCard"></iep-avatar>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="positionId">
              <el-select
                v-model="form.positionId"
                placeholder="职位">
                <el-option
                  v-for="item in position"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="省：" prop="provinceId">
              <el-select
                v-model="form.provinceId"
                @change="choseProvince(form.provinceId)"
                placeholder="省级地区">
                <el-option
                  v-for="item in province"
                  :key="item.id"
                  :label="item.name"
                  :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item prop="cityId" label="市：">
              <el-select
                v-model="form.cityId"
                @change="choseCity(form.cityId)"
                placeholder="市级地区">
                <el-option
                  v-for="item in city"
                  :key="item.id"
                  :label="item.name"
                  :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="districtId" label="地区：">
              <el-select
                v-model="form.districtId"
                @change="choseDistrict(form.districtId)"
                placeholder="区级地区">
                <el-option
                  v-for="item in district"
                  :key="item.id"
                  :label="item.name"
                  :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="villageId" label="渔村：">
              <el-select
                  v-model="form.villageId"
                  @change="chosevillage(form.districtId)"
                  placeholder="渔村">
                  <el-option
                    v-for="item in village"
                    :key="item.id"
                    :label="item.name"
                    :value="item.areaCode">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="createTime" label-name="开始时间">
              <iep-date-picker v-model="form.createTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="updateTime" label-name="更新时间" tip="此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日">
              <iep-date-picker v-model="form.updateTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
        </el-row>
        <iep-form-item class="form-half" prop="remark" label-name="备注信息" tip="请输入备注信息">
          <iep-input-area v-model="form.remark"></iep-input-area>
        </iep-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getCrewByUserId,getWholeInfo} from '@/api/post/crew'
import { initForm , rules, dictsMap } from '../options'
export default {
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    userId () {
      return +this.$route.params.userId
    },
  },
  created () {
    if (this.userId) {
      getCrewByUserId(this.userId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
          let villageId = this.form.villageId
          let districtId = this.form.districtId
          let cityId = this.form.cityId
          let provinceId =this.form.provinceId
          this.getAllInfo(villageId,4)
          this.getAllInfo(districtId,3)
          this.getAllInfo(cityId,2) 
          this.getAllInfo(provinceId,1)
      })
    }
  },
  mounted () {
    if (this.$route.query.position) {
      const position = this.$route.query.position.map(m => +m) || []
      this.form.position = position || []
      setTimeout(() => {
        this.$refs['IepCascader'].handleChange(position)
      }, 2000)
    }
  },
  methods: {
    getAllInfo (id,type) {
      getWholeInfo(id).then(({ data }) => {
        if (type == 1){
           this.province.push(data.data)
        }else if (type == 2){
           this.city.push(data.data)
        }else if (type == 3){
          this.district.push(data.data)
        }else{
          this.village.push(data.data)
        }
      })  
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>