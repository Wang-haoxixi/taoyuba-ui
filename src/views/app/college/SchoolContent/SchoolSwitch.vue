<template>
  <div class="school-switch">
    <school-left></school-left>
    <school-right></school-right>
  </div>
</template>

<script>
import SchoolLeft from './SchoolLeft'
import SchoolRight from './SchoolRight'
export default {
  name: 'School',
  components: { SchoolLeft, SchoolRight },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.school-switch {
  display: grid;
  margin: 0 auto 25px;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
</style>

