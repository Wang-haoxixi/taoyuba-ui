<template>
  <div class="evaluation-review">
    <div class="evaluation">
      评价评论 <el-rate v-model="evaluation" show-text></el-rate>
    </div>
    <div class="review">
      <el-input v-model="inputFirst" placeholder=" " maxlength='200' type="textarea" :rows="4"></el-input>
      <iep-button type="danger" plain size="medium" style="float:right;margin-top:10px;">发送</iep-button>
    </div>
    <div class="no" v-if="dataList.length==0">目前还没有人评论，来发表自己的看法吧~</div>
    <div v-else v-for="(item,index) in dataList" :key="index" class="box">
      <div class="left"><img :src="item.img" :alt="item.name"></div>
      <div class="right">
        <div class="title">
          <span class="name">{{item.name}}</span>
          <el-rate v-model="item.evaluation" :disabled="true"></el-rate>
        </div>
        <div class="desc">
          {{item.desc}}
          <span class="delete" v-if="item.name=='姓名'">删除</span>
        </div>
        <div class="down">
          <span class="time">{{item.time}}</span>
          <div class="reply" @click="handleShow1(index)"><i class="iconfont icon-pinglun1"></i>回复（{{item.replyData}}）</div>
        </div>
        <div class="review" v-if="reviewShow1==index">
          <el-input v-model="input" placeholder=" " maxlength='200' type="textarea" :rows="4"></el-input>
          <iep-button type="danger" plain size="medium" style="float:right;margin-top:10px;">发送</iep-button>
          <iep-button plain size="medium" style="float:right;margin:10px 5px 0 0;" @click="handleCancel()">取消回复</iep-button>
        </div>
        <div class="reply-box" v-for="(item,index) in item.reply" :key="index">
          <div class="title">
            <img :src="item.img" :alt="item.responder">
            <span>{{item.responder}}</span>
            回复
            <span>{{item.reviewers}}</span>
          </div>
          <div class="desc">
            {{item.desc}}
            <span class="delete" v-if="item.responder=='响应者'">删除</span>
          </div>
          <div class="down">
            <span class="time">{{item.time}}</span>
            <div class="reply" @click="handleShow2(index)"><i class="iconfont icon-pinglun1"></i>回复（{{item.replyData}}）</div>
            <div class="like"><i class="iconfont icon-like-b"></i>点赞（{{item.likeData}}）</div>
          </div>
          <div class="review" v-if="reviewShow2==index">
            <el-input v-model="input" placeholder=" " maxlength='200' type="textarea" :rows="4"></el-input>
            <iep-button type="danger" plain size="medium" style="float:right;margin-top:10px;">发送</iep-button>
            <iep-button plain size="medium" style="float:right;margin:10px 5px 0 0;" @click="handleCancel()">取消回复</iep-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppEvaluationReview',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {
      evaluation:null,
      inputFirst:'',
      input:'',
      reviewShow1:null,
      reviewShow2:null,
    }
  },
  methods:{
    handleShow1 (row){
      this.reviewShow1=row
      this.reviewShow2=null
    },
    handleShow2 (row){
      this.reviewShow2=row
      this.reviewShow1=null
    },
    handleCancel (){
      this.reviewShow1=null
      this.reviewShow2=null
    },
  },
}
</script>
<style lang="scss" scoped>
.evaluation-review{
  margin: 20px 0;
  .evaluation{
    height: 30px;
    line-height: 30px;
    display: flex;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .review{
    overflow: hidden;
  }
  .no{
    color: #999;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
  .box{
    display: flex;
    .left{
      width: 60px;
      height: 100%;
      text-align: center;
      > img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .right{
      width: 100%;
      .title{
        display: flex;
        .name{
          color: #2658a9;
          font-size: 16px;
          margin-right: 10px;
        }
      }
      .desc{
        height: 30px;
        line-height: 30px;
        color: #666;
        .delete{
          color: #2658a9;
          margin-left: 10px;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .down{
        overflow: hidden;
        .time{
          float: left;
          color: #999;
        }
        .reply,.like{
          float: right;
          color: #999;
          margin-right: 5px;
          > i{
            margin: 5px 5px 0 0;
            font-size: 18px;
          }
          &:hover{
            cursor: pointer;
            color: #d56368;
          }
        }
      }
      .reply-box{
        padding:20px 10px 10px 20px;
        margin: 10px 0 20px;
        background-color: #fafafa;
        .title{
          display: flex;
          color: #999;
          height: 40px;
          line-height: 40px;
          > img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          > span{
            color: #2658a9;
            margin: 0 5px;
          }
        }
      }
    }
  }
}
</style>
<style scoped>
.evaluation >>> .el-rate{
  margin-left: 20px;
  line-height: 1.6;
}
.evaluation >>> .el-rate__icon{
  font-size: 22px;
}
.evaluation >>> .el-textarea__inner{
  margin: 5px 0;
}
.box >>> .el-rate{
  line-height: 1.4;
}
.box >>> .el-rate__icon{
  font-size: 16px;
}
</style>

