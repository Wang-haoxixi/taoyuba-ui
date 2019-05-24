<template>
  <div class="introduction">
    <introduction-top></introduction-top>
    <introduction-content></introduction-content>
  </div>
</template>
<script>
import IntroductionContent from './IntroductionContent/'
import IntroductionTop from './IntroductionTop'
export default {
  name: 'Introduction',
  components: { IntroductionContent, IntroductionTop },
}
</script>
<style lang="scss" scoped>
.introduction {
  margin: 20px;
}
</style>
