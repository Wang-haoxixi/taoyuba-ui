<template>
  <div class="contract-box port-detail">
    <page-header title="补签操作" :backOption="backOption"></page-header>
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small" :rules="rules">
        <el-row :gutter="80">
          <el-col :span="13">
              <el-form-item label="姓名：" prop="realName">
                <el-row>
                  <el-col :span="13">
                    <el-input v-model="form.realName"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <div style="text-align:left;margin-left:5px">
                      <el-button @click="selectPeople">选择人员</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
          </el-col>
          <el-col :span="13">
              <el-form-item label="身份证号：" prop="idcard">
                <el-input v-model="form.idcard" maxlength="18"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="13">
              <el-form-item label="类型：" prop="userType">
                <el-select v-model="form.userType" placeholder="请选择">
                  <el-option label="船东" :value="0"></el-option>
                  <el-option label="职务船员" :value="1"></el-option>
                  <el-option label="家属" :value="2"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="会议：" prop="trainMeetId">
              <el-button @click="selectMeet">选择会议</el-button>
              <span> {{ form.trainMeetName || '' }} </span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="sumbit">补签</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
    <el-dialog
      title="会议信息"
      :visible.sync="dialogVisible"
      width="70%"
      :destroy-on-close="true"
      >
      <selects ref="selectIndex" @sumbit="sureSelect"></selects>
    </el-dialog>
    <el-dialog
      title="人员信息"
      :visible.sync="dialogVisibles"
      width="70%"
      :destroy-on-close="true"
      >
      <faceList ref="faceList" @selectPeople="sureSelectPeople" :isSelect="true"></faceList>
    </el-dialog>
  </div>
</template>
<script>
import selects from '../equipment/selects.vue'
import faceList from '../faceList/index.vue'
import VueSocketio from 'vue-socket.io'
import Vue from 'vue'
import { sign } from '@/api/tmlms/faceList'
Vue.use(new VueSocketio({
    debug: false,
    connection: 'http://localhost:5000', //地址+端口，由后端提供
    options: { autoConnect: false },
}))
export default {
  mixins: [],
  data () {
    return {
      form: {},
      dialogVisible: false,
      dialogVisibles: false,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.back() },
      },
      rules: {
        realName: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        idcard: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        userType: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        trainMeetId: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    back () {
      this.$emit('back')
    },
    selectMeet () {
      this.dialogVisible = true
    },
    selectPeople () {
      this.dialogVisibles = true
    },
    sureSelect (obj) {
      this.$set(this.form,'trainMeetId',obj.id)
      this.$set(this.form,'trainMeetName',obj.meetName)
      this.dialogVisible = false
    },
    sureSelectPeople (obj) {
      console.log(obj)
      this.$set(this.form,'realName',obj.realName)
      this.$set(this.form,'idcard',obj.idcard)
      this.dialogVisibles = false
    },
    sumbit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            sign(this.form).then(res=>{
              console.log(res)
              this.$message.success('补签成功！')
              this.back()
            })
          } else {
            return false
          }
        })
    },
  },
  computed: {
  },
  components: {
    selects,
    faceList,
  },
  created () {
    this.$socket.open()
  },
  beforeDestroy () {
    this.sockets.unsubscribe('card message')
  },
  mounted () {
              //添加socket事件监听
        this.$socket.emit('connect')
        this.$socket.emit('startRead')
        this.$socket.on('connect_error', (error) => {
          console.log(error)
          this.$socket.close()
        })
        this.sockets.subscribe('card message', (msg) => {
            var base = new Base64()  			  
            //2.解密后是json字符串
            var result1 = base.decode(msg)
            var data = eval('('+result1+')')
            // 将数据录入
            this.$set(this.form,'realName',data.name)
            this.$set(this.form,'idcard',data.cardno)
        })
            //格式化拿到的數據
        function Base64 () { 
            // private property 
            var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            // public method for decoding 
            this.decode = function (input) { 
                var output = ''
                var chr1, chr2, chr3 
                var enc1, enc2, enc3, enc4 
                var i = 0 
                input = input.replace(/[^A-Za-z0-9+/=]/g, '') 
                while (i < input.length) { 
                    enc1 = _keyStr.indexOf(input.charAt(i++)) 
                    enc2 = _keyStr.indexOf(input.charAt(i++)) 
                    enc3 = _keyStr.indexOf(input.charAt(i++)) 
                    enc4 = _keyStr.indexOf(input.charAt(i++)) 
                    chr1 = (enc1 << 2) | (enc2 >> 4) 
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2) 
                    chr3 = ((enc3 & 3) << 6) | enc4 
                    output = output + String.fromCharCode(chr1) 
                    if (enc3 != 64) { 
                        output = output + String.fromCharCode(chr2) 
                    } 
                    if (enc4 != 64) { 
                        output = output + String.fromCharCode(chr3) 
                    } 
                } 
                output = _utf8_decode(output) 
                return output 
            }  
            
            // private method for UTF-8 decoding 
            var _utf8_decode = function (utftext) { 
                var string = '' 
                var i = 0 
                var c = 0
                var c2 = 0 
                var c3 = 0 
                while ( i < utftext.length ) { 
                    c = utftext.charCodeAt(i) 
                    if (c < 128) { 
                        string += String.fromCharCode(c) 
                        i++ 
                    } else if((c > 191) && (c < 224)) { 
                        c2 = utftext.charCodeAt(i+1) 
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)) 
                        i += 2 
                    } else { 
                        c2 = utftext.charCodeAt(i+1) 
                        c3 = utftext.charCodeAt(i+2) 
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)) 
                        i += 3 
                    } 
                } 
                return string 
            } 
        }
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
#container {
  width: 500px;
  height: 500px;
}
.contract-box {
  padding: 20px;
}
</style>
