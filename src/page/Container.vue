<template>
  <div class="login-container pull-height">
    <div class="login-weaper">
      <div class="login-border animated fadeInRight">
        <div class="login-main">
          <div class="title-image">
            <img src="/img/logo.png" class="top-image">
            <div class="login-title">{{title}}</div>
          </div>
          <slot name="tab-panel"></slot>
        </div>
        <div class="login-menu">
          <slot name="tab-footer"></slot>
        </div>
        <div class="login-bottom">
          <div class="bottom-text">Copyright©GOVMADE 版权所有 2018-2020</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.login-weaper {
  width: 100%;
  height: 100%;
  background: url("/img/bg/bg.jpg") no-repeat;
  background-size: cover;
}
.login-container::before {
  z-index: -1024;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("/img/bg/bg.jpg") no-repeat;
  background-size: cover;
}
.login-border {
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -270px;
  min-width: 540px;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6);
}
.login-main {
  margin: 30px;
  box-sizing: border-box;
  .title-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    margin-top: 40px;
    .top-image {
      width: 90px;
      border-right: 1px solid #eee;
      padding: 2px 0;
      padding-right: 20px;
      margin-right: 20px;
    }
    .login-title {
      font-size: 18px;
    }
  }
}
.login-menu {
  width: 100%;
  text-align: center;
}
.login-bottom {
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  color: rgb(153, 153, 153);
  position: absolute;
  bottom: 15px;
  margin-top: -50px;
  .bottom-text {
    border-top: 1px solid #d7d7d7;
    margin: 0 30px;
    padding-top: 15px;
    font-size: 13px;
    text-align: center;
  }
}
@media (max-width: 1169px) {
  .login-container {
    position: inherit;
    .login-border {
      position: inherit;
      top: inherit;
      left: inherit;
      right: inherit;
      margin: 0 auto;
      max-width: 520px;
      min-width: auto;
    }
    .login-main {
      margin: 0;
      padding: 30px 30px 0;
    }
    .login-bottom {
      margin-left: 0;
      max-width: 520px;
      min-width: auto;
    }
  }
}
@media (max-width: 767px) {
  .login-main {
    .title-image {
      margin-top: 0;
    }
  }
  .login-bottom {
    width: 100%;
    .bottom-text {
      font-size: 12px;
    }
  }
}
@media (max-width: 320px) {
  .login-bottom {
    width: 100%;
  }
  .login-main {
    .title-image {
      margin: 0;
    }
  }
}
</style>