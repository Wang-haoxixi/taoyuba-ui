<template>
  <el-dialog  title="当前进度"   :width="width" :visible="dialogCertvisible" :list="list" @close="close"  append-to-body>       
     <el-tabs v-model="activeName" >
  <el-tab-pane label="出售方进度" name="first">
   <el-card class="box-card" v-for="(item, idx) in list.sellers" :key="idx">
     <div slot="header" class="clearfix">
       <div class="right"> {{item.name}} {{ arrType[Number(item.type)] }}</div>
       <div :class="item.agreeState === '1' ? 'agree-gr' : item.agreeState === '0' ? 'agree-re' :'agree-df'">
				{{ item.agreeState === '1' ? '同意' : item.agreeState === '0' ? '反对' :'未操作' }}</div>
     </div>
    <div  class="text item">
      <div> {{'联系电话：' + item.phone }}</div>
      <div> {{'身份证号：' + item.idCard }}</div>
      
    </div>
   </el-card>
    </el-tab-pane>
  <el-tab-pane label="买受方进度" name="second">
    <el-card class="box-card" v-for="(item, idx) in list.buyers" :key="idx">
     <div slot="header" class="clearfix">
       <div class="right"> {{item.name}} {{ arrType[Number(item.type)] }}</div>
       <div :class="item.agreeState === '1' ? 'agree-gr' : item.agreeState === '0' ? 'agree-re' :'agree-df'">
				{{ item.agreeState === '1' ? '同意' : item.agreeState === '0' ? '反对' :'未操作' }}</div>
     </div>
    <div  class="text item">
      <div> {{'联系电话：' + item.phone }}</div>
      <div> {{'身份证号：' + item.idCard }}</div>
    </div>
   </el-card>
  </el-tab-pane>
  </el-tabs>
  </el-dialog>
</template>
<script>
export default {          
  name: 'CertStandardArchar',   
  props: {          
    dialogCertvisible: {        
      default: false,
      type: Boolean,
    },
    width: {
      default: '70%',
      type: String,
    },
    list: {
      // type: Object,
    },
    crewcertStandard: {
      type: String,
    },
    realCert: {
      type: String,
    },
    lackCert: {
      type: String,
    },
  },
  data () {
    return {
      // 
        activeName: 'first',
        arrType: ['管理员','持证人','卖方共有人','买方发起人','买方合伙人'],
    }
  },
  methods: {
    close () {
        this.$emit('close',false)
    },    //
  },
}
</script>

<style lang="scss" scoped>      
.certDiv{   
      font-weight: bold;
      .lackCert{    
          color: red;
      }
}
.box-card{
  margin-top: 16px;
}
.agree-gr {
		color: #19be6b;
	}
	.agree-re {
		color:#fa3534;
	}
  .clearfix{
    display: flex;
  }
  .right{
    margin-right: 10px;
  }
</style>
