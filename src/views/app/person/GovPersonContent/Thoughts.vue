<template>
  <div class="thoughts">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="thoughts-list">
        <div v-for="(item, index) in thoughtsList" :key="index" class="piece">
          <div class="img-con"><img :src="item.avatar" class="img"></div>
          <div class="box">
            <div class="piece-title">
              <span class="name">{{item.userName}}</span>
              <span class="time">{{item.createTime}}</span>
            </div>
            <p class="feed">{{item.content}}</p>
          </div>
        </div>
      </div>
    </IepAppTabCard>

    <IepAppTabCard :title="titleStar" :linkName="linkName" class="mutual-card">
      <el-button class="important" type="text" slot="right">申请互助基金</el-button>
      <div class="star-list">
        <div v-for="(item, index) in starList" :key="index" class="piece">
          <div class="img-con"><img :src="item.avatar" class="img"></div>
          <div class="box">
            <div class="piece-title">
              <span class="name">{{item.name}}</span>
            </div>
            <p class="job" v-for="(item, index) in item.orgList" :key="index">{{item}}</p>
          </div>
          <div class="btn">
            <el-button type="danger" plain @click="sendBlessing(item)">送上祝福</el-button>
          </div>
        </div>
      </div>
    </IepAppTabCard>
    <blessing-dialog ref="blessing"></blessing-dialog>
  </div>
</template>

<script>
import { getRecruitBirthday } from '@/api/app/hrms/'
import { getThoughtsList } from '@/api/app/cpms/channel'
import BlessingDialog from './Blessing'

export default {
  components: { BlessingDialog },
  data () {
    return {
      title: '员工感想',
      titleStar: '今日寿星',
      thoughtsList: [],
      starList: [],
      linkName: '',
    }
  },
  methods: {
    sendBlessing (row) {
      this.$refs['blessing'].open({ id: row.id, name: row.name })
    },
    getBirthdayList () {
      getRecruitBirthday().then(({ data }) => {
        this.starList = data.data
        this.starList = [data.data[0], data.data[0], data.data[0], data.data[0], data.data[0]]
      })
    },
    getThoughtsList () {
      getThoughtsList().then(({data}) => {
        this.thoughtsList = data.data
      })
    },
  },
  created () {
    this.getBirthdayList()
    this.getThoughtsList()
  },
}
</script>
<style lang="scss" scoped>
.star-list {
  height: 100%;
  overflow-y: scroll;
}
.thoughts-list,
.star-list {
  width: 100%;
  .piece {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    overflow: hidden;
    .img-con {
      float: left;
      margin-right: 15px;
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
    .box {
      float: left;
      width: 224px;
      height: 64px;
      .piece-title {
        .name {
          font-size: 16px;
          margin-right: 8px;
        }
        .time {
          color: #999;
        }
      }
      .feed,
      .job {
        line-height: 1.4;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #666;
        &:hover {
          color: #ba1b21;
        }
      }
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
}
.star-list {
  .piece {
    .box {
      width: 150px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.btn {
  display: flex;
  align-items: center;
}
.thoughts {
  .mutual-card {
    margin-top: -1px;
    border-top-color: #fff;
  }
}
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>
<style scoped>
.thoughts >>> .el-button {
  float: right;
  padding: 5px 0;
  color: #999;
}
.star-list >>> .el-button {
  padding: 5px 15px;
  font-size: 12px;
  color: #cb3737;
}
.star-list >>> .el-button:hover,
.star-list >>> .el-button:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
.mutual-card >>> .el-card__body {
  display: flex;
  align-items: center;
  height: 131px;
}
</style>