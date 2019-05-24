<template>
  <div class="gender-age">
    <div class="title">{{title}}</div>
    <ve-scatter :data="chartData"></ve-scatter>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '员工性别年龄分布',
        chartData: {
          columns: ['年龄', '男', '女'],
          rows: [
            { '年龄': '19-22', '男': 13, '女': 24 },
            { '年龄': '23-26', '男': 13, '女': 34 },
            { '年龄': '27-30', '男': 73, '女': 25 },
            { '年龄': '34-34', '男': 43, '女': 35 },
            { '年龄': '35-38', '男': 33, '女': 54 },
            { '年龄': '39-42', '男': 33, '女': 54 },
            { '年龄': '43-46', '男': 33, '女': 54 },
            { '年龄': '47-50', '男': 33, '女': 54 },
            { '年龄': '51-54', '男': 33, '女': 54 },
          ],        
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
.gender-age {
  border: 1px solid #eee;
  padding: 20px;
  position: relative;
  .title{
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 16px;
    color: #333;
  }
}
</style>