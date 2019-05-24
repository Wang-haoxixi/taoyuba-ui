<template>
  <div class="training-top">
    <training-topleft></training-topleft>
    <training-topright></training-topright>
  </div>
</template>
<script>
import TrainingTopright from './TrainingTopright'
import TrainingTopleft from './TrainingTopleft'
export default {
  components: { TrainingTopleft, TrainingTopright },
  data () {
    return {
    }
  },
}
</script>
