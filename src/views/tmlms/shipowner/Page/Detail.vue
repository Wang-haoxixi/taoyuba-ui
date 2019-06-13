<template>
  <div class="contract-box">
    <basic-container>
        <h1>{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}船东信息</h1>
        <el-form :model="shipowner" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:" prop="realName">
                <el-input v-model="shipowner.realName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ shipowner.realName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" prop="idcard">
                <el-input v-model="shipowner.idcard" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ shipowner.idcard }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址:" prop="address">
                <el-input v-model="shipowner.address" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ shipowner.address }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话:" prop="phone">
                <el-input v-model="shipowner.phone" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ shipowner.phone }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="所属渔村区:" prop="villageId">
                <el-cascader v-if="!$route.query.see" :options="options" @active-item-change="handleItemChange" :props="props" v-model="shipowner.villageId" ></el-cascader>
                <div v-else>{{ shipowner.villageId }}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.push({path: '/admin/list'})">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { getArea } from '@/api/post/address.js'
import { saveShipowner, getShipownerDetail, getAllArea, editShipowner, getAllAreaName } from '@/api/tmlms/shipowner'
export default {
  data () {
    // 验证
      var card = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号'))
        } else if (!value.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
          callback(new Error('请输入正确的身份证号码!'))
        } else {
          callback()
        }
      }
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系电话'))
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
          callback()
        }
      }
    return {
      shipowner:{
      },
      rules: {
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          idcard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: card, trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入联系地址', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
          villageId: [
            { required: true, message: '请输入所属渔村区', trigger: 'blur' },
          ],
      },
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        children: 'childList',
      },
      arr:[],
    }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            if(this.$route.query.edit){
              let data = JSON.parse(JSON.stringify(this.shipowner))
              data.villageId = data.villageId[data.villageId.length-1]
              editShipowner(data).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.push({
                    path: '/admin/list',
                  })  
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }else{
              let data = JSON.parse(JSON.stringify(this.shipowner))
              data.villageId = data.villageId[data.villageId.length-1]
              saveShipowner(data).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.push({
                    path: '/admin/list',
                  })  
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }
          } else {
          return false
        }
      })
    },
    // 5級聯動
    handleItemChange (val) {
      getArea(val[val.length-1]).then(res=>{
        let data = res.data.data
        this.getNode(this.options,val[val.length-1],data)
      })
    },
    // 循环找对应的节点
    getNode (node,val,data) {
      node.forEach(res=>{
        if(res.areaCode == val){
          res.childList = data
          if(res.level < 3){
              res.childList.forEach(item=>{
                if(item.childList === undefined){
                    this.$set(item,'childList',[])
                }
              })
          }
        }else{
          if(res.childList && res.childList.length !== 0){
            this.getNode(res.childList,val,data)
          }
        }
      })
    },
    // 遍历数组
    getarr (node) {
      if( this.$route.query.edit ){
        this.arr.push(node.areaCode)
        if(node.child){
          this.getarr(node.child)
        }
      }else if( this.$route.query.see ){
        if(this.arr instanceof Array) this.arr=''
        this.arr = `${this.arr}${this.arr? '/' : ''}${node.name}`
        if(node.child){
          this.getarr(node.child)
        }
      }
    },
  },
  computed: {
  },
  created () {
    // 编辑新增放同一个组件 判断分别
    if(this.$route.query.edit || this.$route.query.see){
      getAll.call(this)
    }else {
      getArea(0).then(res=>{
        this.options = res.data.data
        this.options.forEach(item=>{
          this.$set(item,'childList',[])
        })
      })
    }
    // 获取编辑数据
    async function getAll () {
      // 异步获取ID
      let data = await getShipownerDetail(this.$route.query.edit || this.$route.query.see).then( res=>{
        return res.data.data
      })
      // 拿到ID 同步获取地址和选中的地址
      getAllArea(data.villageId).then( res=>{
        this.options = res.data.data
      })
      getAllAreaName(data.villageId).then( res=>{
        // 处理后端数据变成我要用的数据
        if(this.$route.query.edit || this.$route.query.see){
          this.getarr(res.data.data,this.arr)
          data.villageId = this.arr
          this.shipowner = data
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.el-form {
  margin-right:16%;
}
</style>
