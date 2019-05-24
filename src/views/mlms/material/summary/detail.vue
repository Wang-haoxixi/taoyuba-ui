<template>
  <basic-container>
    <el-col class="left">
      <page-header :title="formData.title" :backOption="backOption">
        <!-- <div slot="sub" class="tags">
          <el-tag type="info" v-for="(item, index) in formData.tagKeyWords" :key="index">{{item}}</el-tag>
        </div> -->
        <div slot="sub" class="tags">
          <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail>
        </div>
      </page-header>

      <div class="detail">
        <div class="content">
          <h3 class="title">会议内容</h3>
          <!-- <pre>{{formData.meetingContent}}</pre> -->
          <iep-html v-model="formData.meetingContent"></iep-html>
        </div>
        <div class="content">
          <h3 class="title">会议总结</h3>
          <pre>{{formData.meetingCon}}</pre>
        </div>
        <div class="content">
          <h3 class="title">感想与困惑</h3>
          <pre>{{formData.thoughtsProblem}}</pre>
        </div>
      </div>

      <div class="comment" v-if="formData.status !== 1 && !previewState">
        <div class="button-list" v-if="isDelete">
          <IepFiveKay>
            <IepKeyItem icon="icon-aixin" name="已收藏" @click.native="handleCollect" isChecked v-if="formData.collection == 1"></IepKeyItem>
            <IepKeyItem icon="icon-heart" name="收藏" @click.native="handleCollect" v-else></IepKeyItem>
            <IepKeyItem icon="icon-share" name="分享" @click.native="handleShare"></IepKeyItem>
            <IepKeyItem icon="icon-chakantiezigengduojubao" name="纠错" @click.native="handleWrong"></IepKeyItem>
            <IepKeyItem icon="icon-xiaoxi" name="评论" @click.native="handleComment"></IepKeyItem>
            <IepKeyItem icon="icon-yuanbao" name="打赏" @click.native="handleReward"></IepKeyItem>
            <IepKeyItem icon="icon-piyue" name="领导批示" @click.native="Instructions" v-if="permission_instruct"></IepKeyItem>
          </IepFiveKay>
        </div>
        <div class="form" v-if="isCommentShow">
          <h2 class="title">补充或评论</h2>
          <el-input type="textarea" rows=5 v-model="commentForm.commentContent" maxlength="500"></el-input>
          <div class="button">
            <iep-button type="primary" @click="submit">发送</iep-button>
          </div>
        </div>
        <div class="list" v-for="(item, index) in commentList" :key="index">
          <div class="img">
            <img :src="item.avatar" alt="">
          </div>
          <div class="info">
            <div class="name">{{item.realName}}</div>
            <p>{{item.commentContent}}</p>
            <div class="footer">
              <div class="time">{{item.createTime}}</div>
              <!-- <div class="button"><i class="icon-pinglun1"></i>回复（2）</div> -->
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
    </el-col>

    <el-col class="right">
      <div class="icon">
        <i class="icon-huiyikaihuitaolun"></i>
      </div>
      <h3 class="title">会议时间</h3>
      <p class="content" v-text="formData.meetingTime"></p>
      <h3 class="title">会议地点</h3>
      <p class="content" v-text="formData.meetingLocation"></p>
      <h3 class="title">发送人</h3>
      <p class="content" v-text="formData.realName"></p>
      <h3 class="title">主持人</h3>
      <p class="content" v-text="formData.hostName"></p>
      <h3 class="title">参会人</h3>
      <p class="content" v-text="formData.attendeeName"></p>
      <h3 class="title">抄送人</h3>
      <p class="content" v-text="formData.receiverName"></p>
    </el-col>
    <wrongDialog ref="wrong"></wrongDialog>
    <instr-dialog ref="instrDialog"></instr-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="meeting" :requestFn="createCollect"></collection-dialog>
    <share-dialog ref="share" type="summary"></share-dialog>
    <!-- <div class="top">
      <i class="icon-fanhuidingbu"></i>
    </div> -->
  </basic-container>
</template>
<script>
import { getDataById } from '@/api/mlms/material/summary'
import InstrDialog from './instrDialog'
import { commentMaterial, getCommentPage } from '@/api/mlms/index'
import { createCollect } from '@/api/mlms/material/summary'
import ShareDialog from '@/views/mlms/material/components/shareDialog'
import CollectionDialog from '@/views/mlms/material/components/collectionDialog'
import wrongDialog from '@/views/mlms/material/components/wrongDialog'
import { mapGetters } from 'vuex'

function commentForm () {
  return {
    objectType: 2,
    commentObjectId: 0,
    commentContent: '',
    score: 0,
  }
}

const pageSize = {
  size: 10,
  current: 1,
  total: 0,
}

export default {
  components: { InstrDialog, ShareDialog, CollectionDialog, wrongDialog },
  props: {
    detailState: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  data () {
    return {
      formData: {
        meetingContent: '',
        list: [
          { id: 1, name: '项目管理' },
          { id: 2, name: '营商环境' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          if (this.detailState) {
            this.$emit('backPage', false)
          } else {
            this.$router.go(-1)
          }
        },
      },
      commentForm: commentForm(),
      commentList: [],
      createCollect,
      isCommentShow: false,
      pageSize,
      isDelete: true,
      previewState: false,
    }
  },
  methods: {
    submit () {
      if (this.commentForm.commentContent == '') {
        this.$message.error('请填写评论的内容！')
        return
      }
      this.commentForm.commentObjectId = this.formData.id
      commentMaterial(this.commentForm).then(() => {
        this.getComment(this.formData.id)
        this.commentForm = commentForm()
      })
    },
    // 获取评论列表
    getComment (id) {
      getCommentPage({
        id: id,
        objectType: 2,
        size: this.pageSize.size,
        current: this.pageSize.current,
      }).then(({ data }) => {
        this.commentList = data.data.records
        this.pageSize.total = data.data.total
      })
    },
    // 领导批示
    Instructions () {
      this.$refs['instrDialog'].open(this.formData)
    },
    open (id) {
      this.loadDetail(id)
    },
    loadDetail (id) {
      getDataById(id).then(({ data }) => {
        if (!data.data) {
          this.$message.error(data.msg)
          this.isDelete = false
          return
        }
        this.handleDealData(data.data)
        this.getComment(data.data.id)
      })
    },
    // 处理数据，展示数据
    handleDealData (data, state) {
      this.previewState = state
      this.formData = data
      this.formData.hostName = this.formData.host.length > 0 ? this.formData.host[0].name : '无'
      // 获取人物
      let fn = (obj) => {
        let msg = ''
        for (let key in obj) {
          if (obj[key] !== null) {
            for (let item of obj[key]) {
              msg += item.name + '、'
            }
          }
        }
        if (msg === '') {
          return '无'
        } else {
          return msg.slice(0, msg.length - 1)
        }
      }
      this.formData.attendeeName = fn(this.formData.attendee) // 参会人
      this.formData.receiverName = fn(this.formData.receiver) // 参会人
    },
    // 收藏
    handleCollect () {
      if (this.formData.collection == 1) {
        this.$message.warning('该纪要已收藏，请勿重复操作！')
        return
      }
      let row = { ...this.formData }
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 分享
    handleShare () {
      this.$refs['share'].open([this.formData], `关于 ${this.formData.title} 材料的分享`)
    },
    // 纠错
    handleWrong () {
      this.$refs['wrong'].open({
        subject: `纠错：${this.formData.title}`,
        receiverIds: [this.formData.userId],
        receiverName: this.formData.realName,
      })
    },
    // 评论
    handleComment () {
      this.isCommentShow = !this.isCommentShow
    },
    // 打赏
    handleReward () {
      this.$message.info('抱歉，此功能正在开发中')
    },
    // 收藏和分享的返回函数
    loadPage () {
      this.formData.collection = 1 // 收藏成功后，将是否收藏改为已收藏
      this.$emit('load-page', true)
    },
    // 评论翻页
    handleCurrentChange (val) {
      this.pageSize.current = val
      this.getComment(this.formData.id)
    },
  },
  created () {
    let params = this.$route.params
    if (params.id && this.$route.name == '查看纪要') {
      this.loadDetail(params.id)
    }
    this.permission_instruct = this.permissions['mlms_summary_instruct']
  },
}
</script>

<style lang="scss" scoped>
.left {
  width: calc(100% - 370px);
  margin-right: 20px;
  .tags {
    .el-tag {
      margin-right: 10px;
    }
  }
  .detail {
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
    .content {
      margin-bottom: 30px;
      .title {
        font-size: 18px;
        color: #000;
      }
      pre {
        line-height: 25px;
        color: #666;
        white-space: pre-wrap; /* css3.0 */
        white-space: -moz-pre-wrap; /* Firefox */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word; /* Internet Explorer 5.5+ */
      }
    }
  }
  .comment {
    .button-list {
      text-align: right;
      .el-button {
        margin-left: 10px;
      }
    }
    .form {
      .button {
        text-align: right;
        margin-top: 15px;
      }
    }
    .list {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
      padding: 10px 0;
      .img {
        width: 50px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .info {
        width: 100%;
        .name {
          color: #5473b6;
          margin-bottom: 10px;
        }
        p {
          margin: 0 0 10px 0;
          word-break: break-all;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          .time {
            color: #999;
          }
        }
        .button {
          height: 20px;
          line-height: 20px;
          cursor: pointer;
          i {
            font-size: 16px !important;
            margin-right: 5px;
            color: #999;
          }
        }
        .button-chosen {
          color: #f00;
        }
      }
      .reply {
        padding: 15px;
        background-color: #f3f3f3;
        .title {
          height: 50px;
          line-height: 30px;
          display: flex;
          .img {
            width: 40px;
            img {
              width: 30px;
              height: 30px;
            }
          }
          span {
            margin: 0 5px;
            color: #5473b6;
          }
        }
        .info {
          margin-bottom: 10px;
        }
      }
    }
    .pagination {
      text-align: right;
    }
    .footer-button {
      margin-top: 20px;
      text-align: right;
    }
  }
}
.right {
  border: 1px solid #eee;
  width: 350px;
  padding: 20px 10px;
  text-align: center;
  .icon {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    text-align: center;
    margin-left: 115px;
    i {
      font-size: 66px !important;
      color: #bbb;
    }
  }
  .title {
    font-weight: 700;
    font-size: 16px;
    margin: 20px 0 10px;
  }
  .content {
    margin-bottom: 50px;
  }
}
.top {
  position: fixed;
  bottom: 100px;
  right: 250px;
  z-index: 100;
  background-color: #f3f3f3;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  opacity: 0.5;
  border-radius: 50%;
  cursor: pointer;
  -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 0px 3px 3px #c8c8c8;
  i {
    width: 20px;
    height: 20px;
  }
}
</style>
