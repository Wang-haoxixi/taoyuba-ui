<template>
  <div>
    <video width="900" height="500" controls>
      <source :src="video" controls poster="" alt="">
    </video>
  </div>
</template>
<script>
export default {
  data () {
    return {
      video: '',
    }
  },
}
</script>