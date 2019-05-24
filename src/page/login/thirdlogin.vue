<template>
  <div class="social-container">
    <div class="box wechat" @click="handleClick('wechat')">
      <span class="container">
        <i icon-class="wechat" class="iconfont icon-weixin"></i>
      </span>
      <p class="title">微信</p>
    </div>
    <div class="box qq" @click="handleClick('tencent')">
      <span class="container">
        <i icon-class="qq" class="iconfont icon-qq"></i>
      </span>
      <p class="title">QQ</p>
    </div>
  </div>
</template>

<script>
import { openWindow } from '@/util/util'

export default {
  name: 'SocialSignin',
  methods: {
    handleClick (thirdpart) {
      let appid, client_id, redirect_uri, url
      redirect_uri = encodeURIComponent(
        window.location.origin + '/#/authredirect'
      )
      if (thirdpart === 'wechat') {
        appid = 'wxd1678d3f83b1d83a'
        url =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&state=WX&response_type=code&scope=snsapi_login#wechat_redirect'
      } else if (thirdpart === 'tencent') {
        client_id = '101322838'
        url =
          'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=' +
          client_id +
          '&redirect_uri=' +
          redirect_uri
      }
      openWindow(url, thirdpart, 540, 540)
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.social-container {
  margin: 20px 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .box {
    cursor: pointer;
    &:hover, &:focus {
      .title {
        opacity: .8;
      }
    }
  }
  .iconfont {
    color: #fff;
    font-size: 30px;
  }
  .container {
    $height: 50px;
    display: inline-block;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .wechat{
    .container {
      background-color: #8bd430; 
    }
    &:hover, &:focus {
      .container {
        background-color: #a3e254;
      }
    }
  }
  .qq {
    .container {
      background-color: #03a9f4;
    }
    &:hover, &:focus {
        .container {
          background-color: #46c3fb;
        }
      }
  }
  .title {
    margin-top: 0;
    text-align: center;
  }
}
@media (max-width:767px){
  .social-container {
    margin: 20px;
  }
}

</style>
