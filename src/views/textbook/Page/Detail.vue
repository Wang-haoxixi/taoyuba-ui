<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="getTitle" :backOption="backOption"></page-header>                                                           
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="small">    
        <el-row>          
          <el-col :span="12">            
            <el-form-item label="分类：" prop="type">
              <el-cascader v-model="typeVal" :options="typeList" :props="{ expandTrigger: 'hover' }">
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
            <el-form-item label="具体适用对象：" prop="info">                                                                                                            
              <el-input v-model="form.info"></el-input>
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
import { mapGetters } from 'vuex'                                                       
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
      },                           
      init: false,
      rules: {},
      typeVal: [],
      typeList: [{
        value: '',
        label: '',
        children: [{
          value: '',
          label: '',
        }],
      }],
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
    console.log(this.dictGroup.tyb_inland_pricrew)
    console.log(this.dictGroup.tyb_inland_positioncrew)
    console.log(this.dictGroup.tyb_ocean_pricrew)
    console.log(this.dictGroup.tyb_ocean_positioncrew)
  },
  mounted () {                
  },
  methods: {      
    getTextbookDetail () {                            
    },
    getTypeList () {
      // this.typeList.push(this.dictGroup.tyb_inland_pricrew[0])
      // this.$set(this.typeList, 'inlandPricrew', this.dictGroup.tyb_inland_pricrew)
      // this.$set(this.typeList, 'inlandPositioncrew', this.dictGroup.tyb_inland_positioncrew)
      // this.$set(this.typeList, 'oceanPricrew', this.dictGroup.tyb_ocean_pricrew)
      // this.$set(this.typeList, 'oceanPositioncrew', this.dictGroup.tyb_ocean_positioncrew)
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {                   
        if (valid) {
          // if (this.type === 'create') {
          // } else if (this.type === 'update') {       
          // }
        } else {
          this.$message.error('请按规则输入填写表单！')
        }
      })
    },
    onGoBack () {
      // this.$router.push({
      //   path: '/textbook_spa/textbook_list',
      // })
      this.$router.go(-1)
    },
  },
  watch: {
  },
}
</script>