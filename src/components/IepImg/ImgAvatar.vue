<template>
  <a-avatar icon="user" :src="src" v-bind="$attrs" v-on="$listeners">USER</a-avatar>
</template>
<script>
export default {
  name: 'IepImgAvatar',
  inheritAttrs: false,
  props: ['src'],
}
</script>
