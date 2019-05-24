<template>
  <div class="wel-content">
    <user @on-finish.once="handleWelcome"></user>
    <pending></pending>
    <project></project>
    <customer></customer>
    <contract></contract>
    <material></material>
    <!-- <grades></grades> -->
    <relationship></relationship>
    <a-modal title="欢迎您加盟国脉内部智慧平台" v-model="visible">
      <p>欢迎登录国脉内部智慧平台，我们将为您提供工作、学习、（自我）管理、协作、个人财富增值和服务创新等一系列服务，将为你的工作与学习带来系列惊喜的变化。请您准确、全面填写好相关信息，了解好平台运营规则，学习新生必读相关材料。本平台是内部资源的汇聚与分享，许多材料和功能限于您个人使用，请注意保密，保管好您的账号密码和财富。</p>
      <p>祝您通过平台获得观念进步、技能提升和财富增值!</p>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="visible=false">
          好的
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import User from './User'
import Pending from './Pending'
import Project from './Project'
import Customer from './Customer'
import Material from './Material'
// import Grades from './Grades'
import Relationship from './Relationship'
import Contract from './Contract'

export default {
  components: { User, Pending, Project, Customer, Material, Relationship, Contract },
  data () {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState({
      isWelcome: state => state.common.isWelcome,
    }),
  },
  methods: {
    ...mapMutations({
      setWelcomeu: 'SET_WELCOME',
    }),
    handleWelcome () {
      if (!this.isWelcome) {
        this.setWelcomeu(true)
        this.visible = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wel-content {
  width: 100%;
  height: auto;
  background: white;
  font-size: 12px;
}
</style>