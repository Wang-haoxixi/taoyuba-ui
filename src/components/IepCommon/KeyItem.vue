<template>
  <div class="icon-box" :class="isChecked !==false ? 'red' : ''">
    <div class="item">
      <i :class="icon"></i>
      <span>{{name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IepKeyItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    isChecked: {
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-box {
  display: inline-block;
  margin: 10px 5px;
  padding: 0 10px;
  cursor: pointer;
  color: #333;
  border-right: 1px solid #ddd;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  i {
    display: inline-block;
    text-align: center;
    font-size: 18px !important;
    margin-right: 5px;
  }
  span {
    display: inline-block;
    font-size: 14px;
  }
}
.icon-box:last-of-type {
  border: 0;
}
.icon-box:hover {
  color: #f56c6c !important;
}
.red {
  color: #f56c6c;
}
</style>
