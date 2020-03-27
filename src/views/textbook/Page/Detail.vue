<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>                                                           
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="small">    
        <el-row>          
          <el-col :span="12">            
            <el-form-item label="分类：" prop="type">
              <el-cascader v-model="typeVal" :options="typeList" @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">         
            <el-form-item label="教材名称：" prop="title">       
              <el-input v-model="form.title"></el-input>                    
            </el-form-item>
          </el-col>
        </el-row>   
        <el-row>                                          
          <el-col :span="12">
            <el-form-item label="定价：" prop="price">                                                                                                                                                                                         
              <el-input v-model="form.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>                                          
            <el-col :span="12">
              <el-form-item  label="教材封面：" prop="bookImg">
                <el-upload
                  class="avatar-uploader"
                  action="/api/admin/file/upload/avatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessFront" :headers="headers"  accept="image/*">
                  <img v-if="form.bookImg" :src="form.bookImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">                                    
            <el-form-item label="教材介绍：" prop="info">                                                                                                            
              <el-input v-model="form.info" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
import { createBook, getBookDetail, updateBook }  from '@/api/book'
import { mapGetters } from 'vuex' 
import { getDict, getChild, getById } from '@/api/tmlms/contract'      
import store from '@/store'                                               
export default {            
  data () {     
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },    
      },
      form: {
        type: '',
        title: '',
        price: '',
        info: '',
        bookImg:'',
      },                           
      init: false,
      rules: {
        type: [
          { required: true, message: '请输入分类', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入教材名称', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入定价', trigger: 'blur' },
        ],
        info: [
          { required: true, message: '请输入具体适用对象', trigger: 'blur' },
        ],
        bookImg: [
          { required: true, message: '请上传教材封面', trigger: 'blur' }, 
        ],
      },
      typeVal: [],
      typeList: [
        {
        value: 1,
        label: '内陆普通船员',
        children: [],
        }, {
        value: 2,
        label: '内陆渔业职务船员',
        children: [],
        }, {
        value: 3,
        label: '海洋普通船员',
        children: [],
        }, {
        value: 4,
        label: '海洋渔业职务船员',
        children: [],
        },
        {
          value:5,
          label:'教材新增', 
          children: [],
        },
      ],
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  computed: {                                                                                       
    type () {
      return this.$route.params.type            
    },
    textBookId () {
      return this.$route.params.id        
    },
    getTitle () {   
      return `教材信息${this.type === 'create' ? '新增' : this.type === 'update' ? '编辑' : ''}`
    },
    ...mapGetters(['dictGroup']),
  },
  created () {        
    if (this.type !== 'create' && this.textBookId) {                        
      this.getTextbookDetail()        
    }
    this.getTypeList()
  },
  mounted () {                
  },
  methods: {      
    getTextbookDetail () {
      getBookDetail(this.$route.params.id).then(data => {
        this.form = data.data.data
        getChild(this.form.type).then(res => {
          getById(res.data.data.dictId).then(m => {
            this.typeList.forEach(k => {
              if (k.label === m.data.data.name) {
                this.typeVal.push(k.value)
                if(this.typeVal[0]) {
                  this.typeVal.push(res.data.data.id)
                }
              }
            })
          })
        })
      })                        
    },
    getTypeList () {
      getDict('tyb_inland_pricrew').then(data => {
        let obj = { value: data.data.data[0].id, label: data.data.data[0].label }
        this.typeList[0].children.push(obj)
      })
      getDict('tyb_inland_positioncrew').then(data => {
        data.data.data.forEach(v => {
          this.typeList[1].children.push({ value: v.id, label: v.label})
        })
      })
      getDict('tyb_ocean_pricrew').then(data => {
        let obj = { value: data.data.data[0].id, label: data.data.data[0].label }
        this.typeList[2].children.push(obj)
      })
      getDict('tyb_ocean_positioncrew').then(data => {
        data.data.data.forEach(v => {
          this.typeList[3].children.push({ value: v.id, label: v.label})
        })
      })
      getDict('tyb_textbook_new').then(data => {
        data.data.data.forEach(v => {
          this.typeList[4].children.push({ value: v.id, label: v.label})
        })
      })

    },
    handleSubmit () {
      this.$refs.form.validate(valid => {                   
        if (valid) {
          if (this.type === 'create') {
            createBook(this.form).then(() => {
              this.$message.success('新增成功！')
              this.$router.go(-1)
            }).catch(err => {
              this.$message.error(err.data.msg)
            })
          } 
          else if (this.type === 'update') {
            updateBook(this.form).then(() => {
              this.$message.success('修改成功！')
              this.$router.go(-1)
            }).catch(err => {
              this.$message.error(err.data.msg)
            }) 
          }
        } else {
          this.$message.error('请按规则输入填写表单！')
        }
      })
    },
    onGoBack () {
      this.$router.push({
        path: '/textbook_spa/textbook_list',
      })
      // this.$router.go(-1)
    },
    handleChange (val) {
      this.form.type = val[1]
    },
    handleAvatarSuccessFront (response) {
      this.form.bookImg = response.data.url
    },
  },
  watch: {
  },
}
</script>
<style lang="scss">
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
</style>