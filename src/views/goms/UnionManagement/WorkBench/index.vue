<template>
  <BasicAsideContainer>
    <template>
      <wb-content></wb-content>
    </template>
    <template v-slot:aside>
      <wb-aside></wb-aside>
    </template>
  </BasicAsideContainer>
</template>

<script>
import WbAside from './WbAside'
import WbContent from './WbContent'
export default {
  name: 'GomsWB',
  components: { WbAside, WbContent },
}
</script>
