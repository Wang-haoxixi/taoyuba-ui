<template>
  <div class="wrapper">
    <div class="content-wrapper" :style="{marginRight: isShow300px}">
      <slot></slot>
    </div>
    <aside-wrapper class="aside-wrapper" :class="{inactive:!showAside }" @aside-hide="toggleShowAside">
      <slot name="aside"></slot>
    </aside-wrapper>
  </div>
</template>

<script>
import AsideWrapper from './AsideWrapper'
import displayMixins from '@/mixins/displayMixins'
export default {
  name: 'BasicAsideContainer',
  mixins: [displayMixins],
  components: { AsideWrapper },
  data () {
    return {
      showAside: true,
    }
  },
  created () {
    this.showAside = this.isDesktop()
  },
  computed: {
    isShow300px () {
      if (!this.isTablet()) { return this.showAside ? '300px' : '0' } else { return '0' }
    },
  },
  methods: {
    toggleShowAside () {
      this.showAside = !this.showAside
    },
  },
}
</script>

<style scoped="scoped" lang="scss">
.wrapper {
  display: flex;
  position: relative;
  .content-wrapper {
    width: 100%;
    box-sizing: border-box;
    transition: 1000 all ease-in;
  }
  .aside-wrapper {
    width: 300px;
    height: 100%;
    position: fixed;
    right: 0;
    z-index: 102;
    transition: left 0.5s cubic-bezier(0.82, 0.085, 0.395, 0.895);
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  .inactive {
    right: -300px;
  }
}
</style>
