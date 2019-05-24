<template>
  <div class="feedback">
    <IepAppTabCard :title="title" :linkName="linkName">
        <el-button style="float: right; padding: 5px 0;" type="text" slot="right">我要发表</el-button>
        <div class="feedback-list">
            <div v-for="(item,index) in feedbackList" :key="index" class="piece">
                <img :src="item.photo" class="photo">
                <div class="box">
                    <div class="piece-title">
                        <span class="name">{{item.name}}</span>
                        <span class="time">{{item.time}}</span>
                    </div>
                    <p class="feed">{{item.feed}}</p>
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
        title:'意见反馈',
        linkName:'',
        feedbackList: [
            {photo:require('./img/people1.png'),name:'姚静',time:'2019-04-08',feed:'版权所有应该改为“2004-2019”'},
            {photo:require('./img/people2.jpg'),name:'邵佳欢',time:'2019-04-03',feed:'内网的内部材料库，选择按上传者姓名搜索，搜索结果是空白的；选择按条件搜索，也是不全面的。比如选择人力学习类型，出来的列表是不全面的，有很多都没有，有时搜索结果是从2018年开始的列表。'},
            {photo:require('./img/people3.jpeg'),name:'林毅宁',time:'2019-04-03',feed:'协作组织内新增内容后，建议在相关位置有提醒，比如可以类似微信又新增内容就相应位置上有个红圈圈表示新增了多少条内容，这样子可以及时提醒到组员能查看，并能准确知道哪个地方新增了多少内容，更能提高工作效率。'},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.feedback-list{
    .piece{
        margin-bottom: 20px;
        overflow: hidden;
        .photo{
            width: 68px;
            height: 68px;
            margin-right: 10px;
            float: left;
            border:1px solid #eee;
        }
        .box{
            float: left;
            width: 445px;
            height: 68px;
            .piece-title{
                .name{
                    font-size: 16px;
                    margin-right: 8px;
                }
                .time{
                    color: #999;
                }
            }
            .feed{
                cursor: pointer;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                &:hover{
                    color: #ba1b21;
                }
            }
        }
        &:last-child{
            margin-bottom: 12px;
        }
    }
}
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 13px 0;
}
.index-card >>> .el-card__body{
  padding: 16px 0 2px;
}
.el-card{
  padding: 0 20px;
}
</style>
