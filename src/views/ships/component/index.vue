<template>
  <el-dialog  title="职务船员配置情况"   :width="width" :visible="dialogCertvisible" @close="close"  append-to-body>       
     <div  class="certDiv">
          <p>最低配员标准: {{crewcertStandard }}</p>
          <p>实际配员: {{realCert }}</p>
          <p class="lackCert">缺少配员: {{lackCert }}</p>   
      </div>          
  </el-dialog>
</template>
<script>
export default {          
  name: 'CertStandard',   
  props: {          
    dialogCertvisible: {        
      default: false,
      type: Boolean,
    },
    width: {
      default: '70%',
      type: String,
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
    }
  },
  methods: {
    close () {
        this.$emit('close',false)
    },
          //
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

</style>
