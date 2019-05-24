<template>
  <div class="project-manager">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div>
        <div class="project-managerList">
          <div v-for="(item,index) in projectManagerList" :key="index" class="piece" @click="handleOpen()">
            <div class="img-con"><img :src="item.img" class="img" alt=""></div>
            <div class="text">
              <span class="name">{{item.name}}<span class="num">{{item.num}}</span></span>
              <span class="department">{{item.department}}</span>
            </div>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '项目经理',
      data: '(9个)',
      linkName: '',
      projectManagerList: [
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '李凯', department: '北方区业务一部', num: '执行项目（4个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '符恩祖', department: '海南办事处', num: '执行项目（2个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '张小燕', department: '北方业务一部', num: '执行项目（3个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '洪琼', department: '湖南国脉原道数据科技有限公司（衡阳办事处、长沙）', num: '执行项目（5个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '阮晨光', department: '国脉集团研发中心', num: '执行项目（2个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '杜照鸿', department: '国脉集团研发中心', num: '执行项目（2个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '张兵', department: '国脉集团研发中心', num: '执行项目（1个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '何舟杰', department: '国脉先锋队', num: '执行项目（3个）' },
        { img: '//183.131.134.242:10060/upload/iep/201904/2cab9b7e-77cd-4e5c-9039-6c05f27e2529_20180709150516_jg3j6m3qre.jpg', name: '潘超巧', department: '国脉先锋队', num: '执行项目（4个）' },
      ],
    }
  },
  methods: {
    handleOpen () {
      this.$router.push({
        path: '',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.data-con {
  font-size: 12px;
}
.project-manager {
  .pieceDeletion {
    display: inline;
    padding: 2px 10px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    margin: 0 18px 0 6px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .color {
    background-color: #fef6f4;
    border: 1px solid #dc8687;
    color: #dc8687;
  }
  .name {
    font-size: 16px;
  }
  .num {
    margin-left: 5px;
    font-size: 14px;
    color: #999;
  }
}
.project-managerList {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 40px;
  grid-column-gap: 20px;
  padding: 20px 0 13px;
  .piece {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 60px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    .img-con {
      width: 60px;
      height: 60px;
      border: 1px solid #ebeef5;
      overflow: hidden;
    }
    .img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .text {
      margin-left: 20px;
      width: 70%;
    }
    .department {
      display: block;
      margin-top: 5px;
      color: #999;
    }
  }
}
.btn {
  float: right;
  padding: 5px 0;
  color: #cb3737;
  &:hover {
    color: #f56c6c;
  }
}
.cardTitle {
  font-size: 18px;
  .datas {
    color: #999;
  }
}
</style>
<style scoped>
.project-manager >>> .el-card {
  height: 408px;
}
</style>
