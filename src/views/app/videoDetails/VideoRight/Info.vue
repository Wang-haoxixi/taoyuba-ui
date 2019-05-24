<template>
  <div class="video-right">
    <span class="sub-title">{{title}}</span>
    <span class="up">上传人：<span class="img"><img :src="img" alt=""></span></span>
    <span class="num">浏览器：<span>{{num}}</span></span>
    <span class="time">上传时间：<span>{{time}}</span></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉集团宣传片',
      img: require('../img/p1.jpg'),
      num: '88',
      time: '2019-04-17',
    }
  },
}
</script>
<style lang="scss" scoped>
.video-right {
  display: flex;
  padding-bottom: 20px;
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid #dcdfe6;
  .sub-title {
    display: block;
    font-size: 18px;
    height: 50px;
  }
  .num,
  .up,
  .time {
    margin-bottom: 18px;
    span {
      color: #999;
    }
  }
  .up {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .img {
    display: inline-block;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
      height: 100%;
      transition: 0.5s;
      border-radius: 50%;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
