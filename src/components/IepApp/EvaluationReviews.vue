<template>
  <div class="evaluation-review">
    <div class="evaluation">
      评价评论 <el-rate v-model="comment.score" show-text></el-rate>
    </div>
    <div class="review">
      <el-input v-model="comment.commentContent" placeholder=" " maxlength='200' type="textarea" :rows="4"></el-input>
      <iep-button type="danger" plain size="medium" style="float:right;margin-top:10px;" @click="submit">发送</iep-button>
    </div>
    <div class="no" v-if="commentList.length==0">目前还没有人评论，来发表自己的看法吧~</div>
    <div v-else v-for="(item,index) in commentList" :key="index" class="box">
      <div class="left"><img :src="item.avatar" :alt="item.realName"></div>
      <div class="right">
        <div class="title">
          <span class="name">{{item.realName}}</span>
          <el-rate v-model="item.score" :disabled="true"></el-rate>
        </div>
        <div class="desc">
          {{item.commentContent}}
          <span class="delete" v-if="item.name=='姓名'">删除</span>
        </div>
        <div class="time">
          {{item.createTime}}
        </div>
      </div>
    </div>
    <div class="pagination" v-if="commentList.length > 0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="pageSize.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCommentPage, commentMaterial } from '@/api/mlms/index'

function commentForm () {
  return {
    objectType: 0,
    commentObjectId: 0,
    commentContent: '',
    score: 5,
  }
}

export default {
  name: 'IepAppEvaluationReviews',
  props: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    objectType: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      pageSize: {
        current: 1,
        size: 10,
        total: 0,
      },
      commentList: [],
      comment: commentForm(),
    }
  },
  methods:{
    // 获取评论列表
    getComment () {
      getCommentPage({
        id: this.id,
        objectType: this.objectType,
        size: this.pageSize.size,
        current: this.pageSize.current,
      }).then(({ data }) => {
        this.commentList = data.data.records
        this.pageSize.total = data.data.total
      })
    },
    handleCurrentChange (val) {
      this.pageSize.current = val
      this.getComment()
    },
    submit () {
      if (this.comment.commentContent == '') {
        this.$message.error('请先填写评论的内容！')
        return
      }
      this.comment.commentObjectId = this.id
      this.comment.objectType = this.objectType
      commentMaterial(this.comment).then(() => {
        this.getComment()
        this.comment = commentForm()
      })
    },
  },
  watch: {
    id () {
      this.getComment()
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
    padding-bottom: 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
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
  .pagination {
    text-align: right;
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

