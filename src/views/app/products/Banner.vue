<template>
    <div class="banner">
        <el-carousel :interval="5000">
            <el-carousel-item v-for="(item,index) in banerImg" :key="index">
                <img :src="item" class="baner-img">
            </el-carousel-item>
        </el-carousel>
        <div class="new-dynamic">
            最新动态：
            <div v-for="(item,index) in newDynamic" :key="index" class="new-dynamic-list">
                <span class="time">{{item.time}}</span>
                <span class="dsec">{{item.dsec}}</span>
                <i class="iconfont icon-dingyue"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            banerImg: [
                require('./img/baner1.jpg'),
                require('./img/baner2.jpg'),
                require('./img/baner3.jpg'),
            ],
            newDynamic:[
                {time:'03.10',dsec:'191内网2.0项目正式启动'},
                {time:'03.10',dsec:'营商通微服务版专家评审上海通过'},
                {time:'03.10',dsec:'北京新城区正式进入需求调研'},
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.banner{
    width: 100%;
    background-color: #f8f8f8;
    img{
        width: 100%;
        height: 100%;
    }
    .new-dynamic{
        width: 1200px;
        height: 60px;
        line-height: 60px;
        margin: 0 auto;
        .new-dynamic-list{
            display: inline;
            margin:  0 150px 0 20px;
            cursor: pointer;
            .dsec{
                color: #333;
                margin: 0 6px 0 8px;
            }
        }
    }
}
</style>
<style scoped>
.el-carousel >>> .el-carousel__container{
  height: 400px;
}
</style>
