<template>
  <div>
    <el-card class="myTeam-box" shadow="hover">
      <div slot="header" class="clearfix">
        <span>我的团队</span>
        <iep-button type="primary" icon="el-icon-edit" plain style="float: right;">我的权限</iep-button>
      </div>

      <ul>
        <li>
          <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>&nbsp;某某某
        </li>
        <li>
          <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>&nbsp;某某某
        </li>
        <li>
          <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>&nbsp;某某某
        </li>
        <li>
          <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>&nbsp;某某某
        </li>
        <li>
          <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>&nbsp;某某某
        </li>
        <li>
          <iep-img-avatar :size="30" :src="userInfo.avatar" alt="头像"></iep-img-avatar>&nbsp;某某某
        </li>
        <li>
          <iep-button type="primary" icon="el-icon-plus">添加</iep-button>
        </li>
      </ul>
    </el-card>
    <el-card class="examinationCount-box" shadow="hover">
      <div slot="header">
        <span>试题库统计</span>
      </div>
      <ul>
        <li>
          <span>试题库</span>
          <span>132</span>
        </li>
        <li>
          <span>试卷库</span>
          <span>132</span>
        </li>
        <li>
          <span>考试库</span>
          <span>132</span>
        </li>
        <li>
          <span>证书库</span>
          <span>132</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
}
</script>
<style lang="scss" scoped>
.myTeam-box {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    li {
      cursor: pointer;
      padding: 10px 0px;
      &:hover {
        color: #cb3737;
      }
    }
  }
}

.examinationCount-box {
  ul {
    li {
      font-size: 20px;
      line-height: 40px;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #ebeef5;
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>