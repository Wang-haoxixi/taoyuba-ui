<template>
  <div>
    <div class="pro_infor" v-for="(item,index) in pros" :key="index">
      <div class="pro_infor_nam">
        <div class="pro_infor_icon"></div>
        <span>{{item.name}}</span>
      </div>
      <div class="pro_infor_detial">
        <ul>
          <li v-for="(item1,index1) in item.docList" :key="index1" class="stdDocFileList">
            <span :class="{red:item.rul}">
              {{item1.docName}} <span v-if="item1.rul" :class="{red:item1.rul}">（必填）</span>  
            </span>：
            <span>
              <a>{{item1.fileName}}</a>
              <i
                v-if="item1.url "
                element-loading-background="rgba(0, 0, 0, 0.6)"
                element-loading-text="正在导出数据..."
                class="el-icon-download icon-download"
                @click="downloadFile(item1)"
                v-loading.fullscreen.lock="fullscreenLoading"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  
</template>

<script>
import { getProjectDoc } from '@/api/projectManagement/projectDoc'
import { downloadFile } from '@/api/projectManagement/projectList'
export default {
  data (){
    return{
      pros: [],
    }
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getDoc () {
      var params = {projectId:this.id}
      getProjectDoc(params).then(({data}) => {
        this.pros = [...data]
      })
    },
    // 下载上传的文件
    downloadFile (data) {
      let params = {
        fileAddress: data.url,
      }
      this.fullscreenLoading = true
      downloadFile({params,title: data.fileName.split('.')[0]}).then(()=>{
        this.fullscreenLoading = false
        this.$message.info('正在导出数据...')
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.pro_infor{
  padding: 10px 0 15px 0;
  border-bottom: 1px dashed #e4e4e4;
  .pro_infor_nam{
    width: 125px;
    height: 25px;
    font-size: 16px;
    color: #333;
    display: inline-block;
    vertical-align: top;
    .pro_infor_icon{
      display: inline-block;
      vertical-align: top;
      padding-right: 10px;
      color: #aaa;
      width: 35px;
      height: 24px;
    }
    span{
      vertical-align: middle;
    }
  }
  .pro_infor_detial{
    width: 85%;
    overflow: hidden;
    margin-top: 5px;
    display: inline-block;
    vertical-align: top;
    ul>li{
      line-height: 25px;
      padding-left: 30px;
      padding-bottom: 5px;
      font-size: 14px;
      a:hover{
        text-decoration: none;
      }
      span{
        color:#888888;
      }
      .red{
        color: red;
      }
    }
    ul>li::before{
      content: '★';
      margin-right: 8px;
      color: #ccc;
    }
  }
}
.pro_infor:last-child{
  border-bottom: none;
}
.stdDocFileList {
  position: relative;
  .icon-download {
    position: absolute;
    top: 12px;
    right: 0;
    cursor: pointer;
    color: #999;
    :hover {
      color: #333;
    }
  }
}
</style>
