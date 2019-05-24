<template>
  <div class="person-right">
    <person-mark></person-mark>
    <feelings></feelings>
    <relation></relation>
  </div>
</template>

<script>
import PersonMark from './PersonMark'
import Feelings from './Feelings'
import Relation from './Relation'
export default {
  components: {
    PersonMark, Feelings, Relation,
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
