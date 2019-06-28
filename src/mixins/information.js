
import { getUserInfo } from '@/api/login'
  export default {
    data () {
      return {
        haveInfo: {},
      }
    },
    methods: {
        // 封装一下获取详情
        getInformation (name,type) {
            getUserInfo().then(res=>{
                if(res.data.data.roles.indexOf(1) === -1 && res.data.data.roles.indexOf(111) === -1){
                    if(res.data.data.sysUser.phone){
                      this.$set(this.haveInfo,'phone',true)
                      this[name][type[0]] = res.data.data.sysUser.phone
                    }
                    if(res.data.data.sysUser.realName){
                      this.$set(this.haveInfo,'realName',true)
                      this[name][type[1]] = res.data.data.sysUser.realName
                    }
                    if(res.data.data.sysUser.idCard && [type[2]]){
                        this.$set(this.haveInfo,'idcard',true)
                        this[name].idcard = res.data.data.sysUser.idCard
                    }
                }
            })
        },
    },
  }
  