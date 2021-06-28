<template>
  <div>
    <page-header title="渔船档案"></page-header>
    <div class="flex">
      <div></div>
      <div></div>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="渔船" name="first">
        <ship ref="ship" :shipName="row.shipName" @back="back"></ship>
      </el-tab-pane>
      <el-tab-pane label="人员" name="second">
        <people :shipName="row.shipName" ref="people" @back="back"></people>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ship from './Ship.vue'
import people from './People.vue'
export default {
  name: 'prot',
  data () {
    return {
      activeName: 'first',
    }
  },
  created () {
  },
  mounted () {
    this.$refs.ship.getList()
  },
  props: {
    row: {
      default: ()=>{},
      type: Object,
    },
  },
  methods: {
    handleClick () {
      if( this.activeName === 'first' ){
        this.$refs.ship.getList()
      }else{
        this.$refs.people.getList()
      }
    },
    back () {
      this.$emit('back')
    },
  },
  components: {
    people,
    ship,
  },
}
</script>
<style scoped lang="scss">
.flex {
  display: flex;
}
</style>