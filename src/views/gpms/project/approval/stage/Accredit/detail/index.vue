<template>
  <basic-container class="abs">
    <page-header title="详情" :backOption="backOption"></page-header>
    
    <detailPage ref="detail"></detailPage>
  </basic-container>
</template>

<script>
import detailPage from './detail'

export default {
  name: 'detail-dialog',
  components: { detailPage },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('close', false)
        },
      },
    }
  },
  methods: {
    open (author, project) {
      this.$refs['detail'].open(author, project)
    },
    close () {
      this.$emit('close',false)
    },
  },
}
</script>

<style scoped lang="scss">
  .abs{
    background: #fff;
    .contianBox{
      padding: 20px 25px;
      font-size: 14px;
      margin: 0 20px 15px;
      background-color: #f9f9f9;
      .topBot {
        margin-bottom: 15px;
      }
    }
  }
</style>