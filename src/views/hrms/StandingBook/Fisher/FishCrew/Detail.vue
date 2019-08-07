<template>
  <div class="agent-add">
    <basic-container>
        <h1 v-if="!$route.query.idcard">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}船员信息</h1>
        <h1 v-if="$route.query.idcard">完善个人信息</h1>                
        <el-form :model="form" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:" prop="realName">
                <el-input v-model="form.realName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ form.realName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item label="身份证号码:" prop="idcard">
                <el-input v-model="form.idcard" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ form.idcard }}</div>
              </el-form-item> -->
              <el-form-item label="身份证号:" prop="idcard">
                <el-select v-if="!$route.query.see" v-model="form.idcard"
                           placeholder="请选择"
                           filterable
                           remote
                           maxlength="20"
                           :loading="loading"
                           allow-create
                           clearable
                           @change="idcardChange"
                           :remote-method="getidcardList">
                  <el-option v-for="item in idcards" :key="item.id" :label="item.idcard + '(手机号：' + item.phone + ')'" :value="item"></el-option>
                </el-select>
                <div v-else>{{ form.idcard }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="form.phone" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ form.phone }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位:" prop="positionId">
                <iep-dict-select  v-if="!$route.query.see" v-model="form.positionId" dict-name="tyb_resume_position">></iep-dict-select>
                <div v-else>{{ form.positionId }}</div>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { addShipCrew, detailShipCrew } from '@/api/ships/shipcrew/index'
import { getIdcardCheck } from '@/api/tmlms/boatMan/index'
import debounce from 'lodash/debounce'
export default {
  data () {
      this.getidcardList = debounce(this.getidcardList, 800)
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
      form:{
        realName:'',
        idcard: '',
        phone: '',
        positionId: '',
      },
      rules: {
          realName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          idcard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
      },
      idcards: [],
      loading: false,
    }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        this.form.shipId = this.$route.query.edit
        if (valid) {
          if (this.$route.query.edit){
            addShipCrew (this.form).then(() => {
              this.$message.success('新增成功!')
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    },
    idcardChange (card) {
      if (typeof card === 'object') {
        this.refreshCard(card)
      } else {
        this.refreshCard({idcard: card})
      }
      this.idcards = []
    },
    refreshCard (card) {
      if(card !== null) {
        let { idcard = '', phone = '', realName ='', positionId ='' } = card
        this.form.phone = phone
        this.form.idcard = idcard
        this.form.positionId = positionId
        this.form.realName = realName      
      } else {
        this.form.phone = ''
        this.form.idcard = ''
        this.form.positionId = ''
        this.form.realName = ''  
      }
    },
    getidcardList (number) {
      this.loading = false
      if (number !== '') {
        getIdcardCheck(number).then(({data}) => {
          if (data.data !== true) {
            this.idcards.push(data.data)
          } else {
            this.form.idcard = number
          }
        })
      } else {
        this.idcards = []
      }
      this.loading = false
    },
  },
  computed: {
  },
  created () {
    if(this.$route.query.see){
      detailShipCrew(this.$route.query.see).then( res=>{
        this.form = res.data.data
      })
    }
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
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
