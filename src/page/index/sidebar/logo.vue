<template>
  <div class="logo" @click="openIndex">
    <transition name="fade">
      <span v-if="isCollapse" class="logo_title is-bold " key="0" :class="{ 'is-text': !type, 'is-img': type }">
        <template>
          <img src="/img/logo.png" width="40" />
        </template>
        <!--
          <template v-else>
            {{website.logo}}
          </template>
        -->
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <span class="logo_title is-bold" key="1">{{ website.title }} </span>
        <span class="logo_subtitle" key="2">{{ website.author }}</span>
      </template>
    </transition-group>
  </div>
</template>

<script>
/* eslint-enable */
import { mapGetters } from 'vuex'
export default {
  name: 'logo',
  data () {
    return {}
  },
  props: ['isCollapse'],
  created () { },
  computed: {
    ...mapGetters(['website']),
    type: function () {
      return this.website.logo.indexOf('static') !== -1
    },
  },
  methods: {
    openIndex () {
      window.open('http://ioa.govmade.com/node/457', '_blank')
    },
  },
}
/* eslint-enable */
</script>
<style scoped="scoped" lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  line-height: 64px;
  background: #002140;
  color: #fdfdfd;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  box-sizing: border-box;
}
.logo_title {
  padding: 0 5px 0 0;
  color: #409eff;
  font-size: 28px;
  &.is-bold {
    font-weight: 700;
  }
}
.is-text {
  position: absolute;
  top: 0;
  left: 10px;
}
.is-img {
  position: absolute;
  top: 10px;
  left: 10px;
}
.logo_subtitle {
  font-size: 16px;
  padding-top: 5px;
}
</style>
