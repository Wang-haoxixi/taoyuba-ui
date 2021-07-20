<template>
  <div class="agent-add">
    <basic-container>
        <h1>完善船员信息</h1>                
              <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="small">
                <el-row>
                <el-col :span="12">
                    <el-form-item label="个人姓名：" prop="realName">
                    <el-input v-model="form.realName" disabled></el-input>
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
                    <el-input v-model="form.idcard" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                    <iep-form-item class="form-half" prop="birthday" label-name="出生日期">
                    <iep-date-picker v-model="form.birthday" type="date" placeholder="选择日期" readonly></iep-date-picker>
                    </iep-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="籍贯地区：" prop="districtId">
                    <el-select
                        v-model="form.provinceId"
                        @change="choseProvince(form.provinceId)"
                        placeholder="省级地区" style="width: 33%!important">
                        <el-option
                        v-for="item in province"
                        :key="item.id"
                        :label="item.name"
                        :value="item.areaCode" prop="provinceId">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="form.cityId"
                        @change="choseCity(form.cityId)"
                        placeholder="市级地区" style="width: 33%!important">
                        <el-option
                        v-for="item in city"
                        :key="item.id"
                        :label="item.name"
                        :value="item.areaCode" prop="cityId">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="form.districtId"
                        placeholder="区级地区" style="width: 33%!important">
                        <el-option
                        v-for="item in district"
                        :key="item.id"
                        :label="item.name"
                        :value="item.areaCode" prop="districtId">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="国籍" prop="nationality">
                    <el-input v-model="form.nationality"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="民族" prop="nation">
                    <el-select v-model="form.nation" placeholder="请输入民族">
                        <el-option v-for="item in nationals" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                    </el-form-item> 
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
                    <el-form-item label="家庭联系电话" prop="contactPhone">
                    <el-input v-model="form.contactPhone"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                      <el-form-item label="职位：" prop="positionId">
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
                  <el-col :span="8">
                      <el-form-item label="是否需要培训" prop="isTrain">
                      <el-radio-group v-model="form.isTrain">
                          <el-radio  :label="0">否</el-radio>
                          <el-radio  :label="1">是</el-radio>
                      </el-radio-group>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="申请类别" prop="applyType">
                      <el-select v-model="form.applyType" placeholder="请输入申请类别">
                          <el-option v-for="item in applyTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                      </el-form-item> 
                  </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="特长：" prop="speciality">
                        <el-input v-model="form.speciality"></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>           
                <iep-form-item class="form-half" prop="remark" label-name="备注信息" tip="请输入备注信息">
                  <iep-input-area v-model="form.remark"></iep-input-area>
                </iep-form-item>
                <h1 style="font-size: 18px;">资质证书: </h1> 
                <div v-for="(item, index) in form.certList" :key="index">
                  <el-form label-width="150px" size="small">
                    <el-row>
                        <el-col :span="9">
                          <el-form-item label="证书编码：" prop="certNo">
                            <el-input v-model="item.certNo"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="证书类型：" prop="certType">
                            <iep-dict-select v-model="item.certType" dict-name="tyb_crew_cert_type"></iep-dict-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label="证书等级：" prop="certLevel">
                            <iep-dict-select v-model="item.certLevel" dict-name="tyb_crew_cert_level"></iep-dict-select>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                          <el-form-item label="证书职务：" prop="certTitle">
                            <iep-dict-select v-model="item.certTitle" dict-name="tyb_crew_cert_title"></iep-dict-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="证书起始日期：" prop="certDateIssue">
                            <el-date-picker v-model="item.certDateIssue" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker> 
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="证书结束日期：" prop="certDateExpire">
                            <el-date-picker v-model="item.certDateExpire" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker> 
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                          <el-form-item label="扫描件：" prop="certFile">
                            <el-upload class="upload-demo" action="/api/admin/file/upload/avatar" :show-file-list="false"
                            :on-success="handleAvatarSuccessFile" :limit="1"  :headers="headers" accept="image/*">
                            <el-button size="mini" type="primary" @click="fileUpload(index)">点击上传</el-button>
                            <img v-if="item.certFile" :src="item.certFile" class="certAvatar">
                            <i v-else class="el-icon-picture-outline"></i>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4" style="text-align:center">
                          <el-button type="primary" size="small" plain @click="remove(index)">删除</el-button>
                        </el-col>
                    </el-row>
                  </el-form>
                </div>               
                <div style="text-align:center">
                  <iep-button style="width: 86%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" plain @click="newMember">新增</iep-button>
                </div>
            </el-form>
        <div style="text-align:center">
          <el-button type="primary" @click="save" >提交</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { getArea,getPosition} from '@/api/post/admin'
import { detailCrew, editCrew } from '@/api/tmlms/boatMan'
import { certificateColumns } from '@/views/hrms/ComponentsNew/options'
import { getUserInfo } from '@/api/login'
// import { addUserRole } from '@/api/admin/user'
import information from '@/mixins/information'
import store from '@/store'
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
      certificateColumns,
      form: {
          address: '',
          idcard: '',
          realName: '',
          birthday: '',
          nation: '',
          gender: 1,
          isTrain: 0,
          districtId: '',
          remark:'',
          positionId: '',
          nationality: '中国',
          speciality: '',
          photoFront: '',
          photoReverse: '',
          idcardPhoto: '',
          facePhoto: '',
          cityId:'',
          contactPhone: '',
          contactName: '',
          phone: '',
          applyType: '',
          certList: [],
      },
      position: [],
      province:[],
      city:[],
      district:[],
      nationals: [
        {id:1 ,name:'汉族'}, {id:2 ,name:'蒙古族'}, {id:3 ,name:'回族'}, {id:4 ,name:'藏族'}, {id:5 ,name:'维吾尔族'},
		    {id:6 ,name:'苗族'}, {id:7 ,name:'彝族'}, {id:8 ,name:'壮族'}, {id:9 ,name:'布依族'}, {id:10,name:'朝鲜族'},
        {id:11,name:'满族'}, {id:12,name:'侗族'}, {id:13,name:'瑶族'}, {id:14,name:'白族'}, {id:15,name:'土家族'},
        {id:16,name:'哈尼族'}, {id:17,name:'哈萨克族'}, {id:18,name:'傣族'}, {id:19,name:'黎族'},{id:20,name:'傈僳族'},
        {id:21,name:'佤族'}, {id:22,name:'畲族'}, {id:23,name:'高山族'}, {id:24,name:'拉祜族'}, {id:25,name:'水族'},
        {id:26,name:'东乡族'}, {id:27,name:'纳西族'}, {id:28,name:'景颇族'}, {id:29,name:'柯尔克孜族'},{id:30,name:'土族'}, 
        {id:31,name:'达翰尔族'}, {id:32,name:'么佬族'}, {id:33,name:'羌族'}, {id:34,name:'布朗族'}, {id:35,name:'撒拉族'}, 
        {id:36,name:'毛南族'}, {id:37,name:'仡佬族'}, {id:38,name:'锡伯族'}, {id:39,name:'阿昌族'}, {id:40,name:'普米族'}, 
        {id:41,name:'塔吉克族'}, {id:42,name:'怒族'}, {id:43,name:'乌孜别克族'}, {id:44,name:'俄罗斯族'}, {id:45,name:'鄂温克族'},
        {id:46,name:'德昂族'}, {id:47,name:'保安族'}, {id:48,name:'裕固族'}, {id:49,name:'京族'}, {id:50,name:'塔塔尔族'},
        {id:51,name:'独龙族'}, {id:52,name:'鄂伦春族'}, {id:53,name:'赫哲族'}, {id:54,name:'门巴族'}, {id:55,name:'珞巴族'},
        {id:56,name:'基诺族'},{id:57,name:'穿青人'},
      ],
      rules: {
        realName: [
            { required: true, message: '请填写个人姓名', trigger: 'blur' },
        ],
        contactName: [
            { required: true, message: '请填联系人', trigger: 'blur' },
        ],
        gender: [
            { required: true, message: '请填写性别', trigger: 'blur' },
        ],
        idcard: [
            { required: true, message: '请填写身份证信息', trigger: 'blur' },
        ],
        birthday: [
            { required: true, message: '请填写生日信息', trigger: 'blur' },
        ],
        districtId: [
            { required: true, message: '请填写地区', trigger: 'blur' },
        ],
        nationality: [
            { required: true, message: '请填写国籍', trigger: 'blur' },
        ],
        contactPhone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
        ],
        positionId: [
            { required: true, message: '请填写职位', trigger: 'blur' },
        ],
        applyType: [
            { required: true, message: '请填写申请类别', trigger: 'blur' },
        ],
        address:[
            { required: true, message: '请填写地址', trigger: 'blur' },
        ],
        phone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
        ],
      },
      applyTypes: [
        {id:1, name:'以旧换新'}, {id:2, name:'普通船员'}, {id:3, name:'职务船员'}, {id:4, name:'证书换发'}, 
        {id:5, name:'证书补发'}, {id:6, name:'其他'}, 
      ],
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      isIdcard: false,
      idx:'',
      userCard: '',
    }
  },
  methods: {
    async getData () {
      this.userCard = await getUserInfo().then(res => {
        return res.data.data.sysUser.idCard
      })
      let data = await detailCrew(this.userCard).then(res => {
        return res.data.data
      })
      this.choseProvince(data.provinceId)
      this.choseCity(data.cityId)
      if(data.certList) {
        let id = 0
        data.certList.forEach(item => {
          item.id = id
          id ++
        })
      }
      this.form = data
      getArea(0).then(({ data }) => {
        this.province = data.data
      })
      getPosition('tyb_resume_position').then(({ data }) => {
        this.position = data.data
      })
    },
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let type = 2
          editCrew(this.form, type).then(() => {
            this.$message.success('提交成功！')
            this.$router.go(-1) 
          }).catch(() => {
            this.message.error('提交失败！')
          })
        } else {
        return false
        }
      })
    },
    // 选择城市
    choseProvince (id) {
      this.form.cityId = ''
      this.form.districtId = ''
      this.form.villageId = ''
      this.district = []
      getArea(id).then(({ data }) => {
          this.city = data.data
      })
    },
    // 获取子组件数据
    setData (val) {
      this.form.certList = val
    },
    // 改变城市
    choseCity (id) {
      getArea(id).then(({ data }) => {
        this.district = data.data
      })
    },
    newMember () {
      if (!this.form.certList) {
        this.$set(this.form, 'certList',[])
      }
      const length = this.form.certList.length
      if (length < 2) {
        this.form.certList.push({
          id: length ? (parseInt(this.form.certList[length - 1].id) + 1).toString() : '0',
        })
      } else {
        this.$message({
          message: '最多两个证书',
          type: 'warning',
        })
      }
    },
    remove (index) {
      this.$confirm('此操作将永久删除该证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (this.form.certList.length === 2) {
          const newCase = this.form.certList.filter(item => item.id != index)
          this.form.certList = newCase
        } else if (this.form.certList.length === 1) {
          const newCase = this.form.certList.filter(item => item.id == 2)
          this.form.certList = newCase
        }
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    handleAvatarSuccessFile (response) {
      this.$set(this.form.certList[this.idx],'certFile', response.data.url)
    },
    fileUpload (index) {
      this.idx = index
    },
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    'form.idcard': {
      handler: function (val) {
        if ( val !== undefined && val.length === 18) {
          var bri = val.substr(6,8).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
          this.form.birthday = bri
        }
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss">
.el-form {
  margin-right:16%;
}
.agent-add {
  .avatar-uploader .el-upload {
    border: 1px solid #CCC;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 356px;
    height: 178px;
    display: block;
  }
  .certAvatar {
    width: 80px;
    height: 30px;
    display: block;
  }
}
</style>