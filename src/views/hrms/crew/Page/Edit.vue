<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}船员信息`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
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
          <!-- <el-col :span="12">
            <el-form-item label="四小件上传：" prop="fourSmallCard">
            <iep-avatar v-model="form.fourSmallCard"></iep-avatar>
          </el-form-item>
          </el-col> -->
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
import { getCrewByUserId, addPosition, putPosition,getArea,getPosition,getWholeInfo } from '@/api/post/crew'
import { initForm, formToDto, rules, dictsMap } from '../options'
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
      province:[],
      city:[],
      district:[],
      village:[],
      parentCode:0,
      position:[],
      dicID:'tyb_resume_position',
    }
  },
  computed: {
    userId () {
      return +this.$route.params.userId
    },
    methodName () {
      console.log()
      return this.userId ? '编辑' : '发布'
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
    getArea(this.parentCode).then(({ data }) => {
        this.province=data.data
      })
    getPosition(this.dicID).then(({ data }) => {
        this.position=data.data
    })
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
    choseProvince (id) {
      this.form.cityId = ''
      this.form.districtId = ''
      this.form.villageId = ''
      getArea(id).then(({ data }) => {
          this.city=data.data
      })
    },
    choseCity (id) {
      getArea(id).then(({ data }) => {
        this.district=data.data
      })
    },
    choseDistrict (id) {
      getArea(id).then(({ data }) => {
        this.village=data.data
      })
    },
    chosevillage () {
      console.log(111)
    },
    onGoBack () {
      this.$router.push({
        path: '/hrms/crew',
      })
    },
    handleSubmit () {
      const submitFunction = this.userId ? putPosition : addPosition
      this.$refs['form'].validate((valid) => {
        if (valid) {
          submitFunction(formToDto(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.onGoBack()
            }
          })
        }
      })

    },
  },
}
</script>
<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
