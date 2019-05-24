<template>
  <div class="five-key">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'IepFiveKay',
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.five-key {
  display: inline-block;
  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 5px;
}
</style>
