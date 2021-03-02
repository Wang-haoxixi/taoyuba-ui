<template>
  <div class="history-form-wrapper">
    <div class="content">排查记录：
      <span :class="data.flag === 0 ? 'error' : (data.flag === 1 ? 'success' : '')">
      {{data.flag === 0 ? '不合格' : (data.flag === 1 ? '合格' : '')}}</span>
    </div>
    <div class="img-content">
      <div class="img-item" v-for="(item, index) in data.img" :key="index">
        <img :src="item" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
  },
  data () {
    return {
      data: {
        flag: '',
        img: [],
      },
    }
  },
  watch: {
    value: {
      handler (newVal) {
        if (Object.keys(newVal).length) {
          this.data.flag = newVal.flag
          if (newVal.img) {
            this.data.img = newVal.img.split(',')
          }
        }
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss" scoped>
  .history-form-wrapper {
    padding: 20px;
    background-color: #f6f6f6;
    border-radius: 10px;
    .content {
      font-size: 16px;
      color: #333;
      margin-bottom: 20px;
      .success {
				color: #19be6b;
			}
			.error {
				color: #FF0000;
			}
    }
    .img-content {
      display: flex;
      .img-item {
        width: 150px;
        height: 150px;
        overflow: hidden;
        margin: 0 10px 10px 0;
      }
    }
  }
</style>