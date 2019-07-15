<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <div>   
          <span><el-select v-model="params.sn" placeholder="请选择机器码" size="big">
              <el-option
                v-for="item in usersnList"
                :key="item.snvalue"
                :label="item.snuserId"
                :value="item.snvalue">
              </el-option>
            </el-select>
          </span>     
          <el-button type="primary" size="small" icon="el-icon-edit" @click="bindSn">绑定机器</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="cancel">解绑机器</el-button>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { searshSn,bindSn,cancelSn } from '@/api/tmlms/bindsn'   
export default {
  data () {
    return {
      usersnList: [],
      // 查询数据
      params: {
        sn: '',
      },
    }
  },
  methods: {
    // 获取所有机器码
    getSn () {
        searshSn ().then(({data}) => {
             this.usersnList   =  data.data
        })
    },
    //绑定机器
    bindSn () {
        bindSn ({sn:this.params.sn}).then(({data}) => {
            if(data.code === 0){
                this.$message.success('设备码绑定成功')
                this.getSn()
            }
        }).catch(err=>{
                this.$message.error(err.message)
       })
    },
    cancel () {
      cancelSn ().then(({data}) => {
              if(data.code === 0){
                this.$message.success('设备解绑成功')
                this.getSn()
            }
        }).catch(err=>{
                this.$message.error(err.message)
       })
  },
  },
  created () {
    this.getSn()
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
