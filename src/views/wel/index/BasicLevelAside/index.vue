<template>
    <div class="main-aside">
        <h3>消息管理</h3>
        <div class="message-p">您有<span style="color: #0185D8">{{ info.totalInfo }}</span>消息尚未查看，请及时查看处理！</div>
        <div class="button-message">
            <el-badge :value="info.sysInfo" class="item" type="warning" :max="99">
                <el-button size="mini">系统消息</el-button>
            </el-badge>
            <el-badge :value="info.contractInfo" class="item" type="warning" :max="99">
                <el-button size="mini">合同消息</el-button>
            </el-badge>
            <el-badge :value="info.otherInfo" class="item" type="warning" :max="99">
                <el-button size="mini">其他消息</el-button>
            </el-badge>
        </div>
        <hr>
        <h3>证书消息提醒</h3>
        <div class="message-p">当前有<span style="color: #0185D8">{{ info.crewCert }}</span>份证书即将于6月28号过期，请及时做好联系工作！</div>
        <div><el-button size="mini">查看详情</el-button></div>
        <hr>
        <h3>船东联系记录与进出港数据对比</h3>
        <div class="message-p">浙岱渔<span style="color: #0185D8">00001</span>上下船员与进出港不匹配，请及时核查。</div>
        <div class="message-p">浙岱渔<span style="color: #0185D8">06761</span>上下船员与进出港不匹配，请及时核查。</div>
        <hr>
        <h3>渔船越界提醒</h3>
        <div class="message-p">浙岱渔<span style="color: #0185D8">00036</span>在东经30度，北纬50度，请及时与船东联系进行核实。</div>
    </div>
</template>

<script>
import { countInfo } from '@/api/wel/index'
export default {
   data () {
    return {
        info: {},
    }
  },
  components: { },
  created () {
        countInfo().then(({ data })=>{
          this.info = data.data
        })
  },
  computed: {
  },
}
</script>
<style scoped lang="scss">
.main-aside {
    padding: 80px 16px 0 16px;
    .message-p {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: #666666;
        margin-bottom: 16px;
    }
    .button-message {
        display: flex;
        justify-content: space-between;
    }
    ::v-deep .el-badge__content.is-fixed{
        position: absolute;
        top: 0;
        right: 20px;
    }
    h3 {
        font-size: 15px;
        font-weight: 800;
        line-height: 24px;
        color: #333333;
    }
}
</style>
