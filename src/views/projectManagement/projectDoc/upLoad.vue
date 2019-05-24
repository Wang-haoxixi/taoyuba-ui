<template>
  <div class="wrap_item">
    <div class="title">
      {{title}}
    </div>
    <div class="upload_wrap" :style="{background:list.length>0?'none':'#f5f5f5'}">
      <el-upload
        class="upload-demo"
        :action="action"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :headers="httpHeaders"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="list">
        <el-button size="small" class="upload" v-if="list.length>0?true:false">+</el-button>
        <el-button size="small" type="primary" v-else>点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          <el-button size="small" type="primary" class="simulateBtn" v-if="list.length>0?false:true">请上传相关材料</el-button>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  import { headers } from '../projectWeekly/const/header'
  export default {
    data (){
      return{
        list:[],
      }
    },
    methods:{
      handleSuccess (res, file, fileList){
        this.list = [...fileList]
        this.$emit('handle-change',{fileList, field:this.field})
      },
      handleRemove (file, fileList){
        this.list = [...fileList]
        this.$emit('handle-change',{fileList, field:this.field})
      },
    },
    watch:{
      fileList :{
        handler (newVal){
          this.list = []
          newVal.forEach((v) => {
            this.list.push({
              name:v.name,
              response:{
                url:v.url,
              },
            })
          })
        },
        deep:true,
        immediate: true,
      },
    },
    props:{
      title: {
        type: String,
        default: '1-1.项目会议纪要',
      },
      fileList: {
        type: Array,
        default: () => [],
      },
      action: {
        type: String,
        default: 'https://jsonplaceholder.typicode.com/posts/',
      },
      field: {
        type: String,
        default: 'field',
      },
    },
    computed: {
      httpHeaders () {
        return headers
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap_item{
    width: 100%;
    position: relative;
    .title{
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      box-sizing: border-box;
      padding-left: 8px;
      border-bottom: 1px solid #ccc;
      .up_load_btn{
        float: right;
        margin-right: 20px;
        width: 20px;
        height: 20px;
        border: 1px solid #ccc;
        line-height: 15px;
        text-align: center;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        margin-top: 10px;
        font-size: 18px;
      }
    }
    .upload_wrap{
      width: calc(100% - 20px);
      height: 120px;
      overflow: scroll;
      box-sizing: border-box;
      margin: 15px 10px;
      padding-top: 10px;
      text-align: center;
      background: #f5f5f5;
      .simulateBtn{
        width: 100%;
        height: 60px;
        background: none;
        border: 1px dashed #666;
        color: #666;
      }
      .upload{
        position: absolute;
        right: 20px;
        top: 10px;
        width: 20px;
        height: 20px;
        padding: 0;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
    }
  }
</style>
