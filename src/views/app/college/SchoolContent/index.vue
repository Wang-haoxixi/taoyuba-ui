<template>
  <div>
    <school-switch></school-switch>
    <school-list></school-list>
  </div>
</template>

<script>
import SchoolSwitch from './SchoolSwitch'
import SchoolList from './SchoolList'
export default {
  name: 'School',
  components: { SchoolSwitch, SchoolList },
  data () {
    return {
    }
  },
}
</script>

