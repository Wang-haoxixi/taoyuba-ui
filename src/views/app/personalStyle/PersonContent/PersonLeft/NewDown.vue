<template>
  <div class="new-down">
    <IepAppTabCard :title="title">
      <div class="item" v-for="item in itemList" :key="item.id">
        <div class="img">
          <img :src="item.img" alt="" />
        </div>
        <span>{{item.name}}</span>
      </div>
    </IepAppTabCard>
    <el-card class="classTag-con" shadow="never">
      <div slot="header" class="clearfix">
        <span class="title">{{effect}}</span>
      </div>
      <div class="classTags">
        <div class="classTag" v-for="tag in tagList" :key="tag.id">
          <el-tag type="white">{{tag.tag}}</el-tag>
        </div>
      </div>
      <div class="append" style="margin-top: 15px;">
        <el-input class="append-input" placeholder="添加新标记" v-model="input3" size="small">
          <el-button slot="append" icon="el-icon-search">添加</el-button>
        </el-input>
        <el-select class="prepend" v-model="select" slot="prepend" placeholder="常用印象" size="small">
          <el-option label="技术达人" value="1"></el-option>
          <el-option label="优秀" value="2"></el-option>
          <el-option label="任劳任怨" value="3"></el-option>
        </el-select>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '看了他的人还看了',
      effect: '人物印象',
      input3: '',
      select: '',
      tagList: [
        {
          tag: '任劳任怨 2',
        },
        {
          tag: '技术达人 2',
        },
      ],
      itemList: [
        {
          img: require('../../img/p012.jpg'),
          name: '钟乙乔',
        },
        {
          img: require('../../img/p09.jpg'),
          name: '潘超巧',
        },
        {
          img: require('../../img/p8.jpg'),
          name: '邵奇凯',
        },
        {
          img: require('../../img/p02.jpg'),
          name: '符恩祖',
        },
        {
          img: require('../../img/p07.jpg'),
          name: '张兵',
        },
        {
          img: require('../../img/p013.jpg'),
          name: '杨冰之',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.new-down {
  margin-bottom: 30px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  .title {
    margin: 0 4px;
    font-size: 16px;
  }
  .classTags {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .classTag {
    .el-tag {
      margin: 0 5px 5px 0;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 10px 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    .img {
      margin-bottom: 5px;
      width: 50px;
      height: 50px;
      border: 1px solid #ebeef5;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
.append {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 450px;
  .prepend {
    margin-left: -1px;
    border-radius: 0 4px 4px 0;
    width: 140px !important;
  }
}
</style>
<style scoped>
.prepend >>> .el-input__inner {
  border-radius: 0 4px 4px 0;
}
.append-input >>> .el-input-group__append {
  border-radius: 4px 0 0 4px;
}
.new-down >>> .el-card__body {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.new-down >>> .classTag-con .el-card__body {
  display: block;
}
.new-down >>> .el-card {
  border: 0;
  margin: 0 5px;
  padding: 0 20px;
}
.new-down >>> .el-card__header {
  padding: 18px 0 10px;
}
.new-down >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>
