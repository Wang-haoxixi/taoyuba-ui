<template>
    <div class="grid-content">
        <div class="logo-container" v-for="(item,index) in info" :key="index">
            <img :src="item.logoSrc" alt="">
            <p class="pv" v-text="item.pv"></p>
            <span class="day">日环比
                <i class="el-icon-caret-bottom down" v-if=0></i>
                <i class="el-icon-caret-top rise" v-if=1></i>
                {{item.day}}
            </span>
            <span class="week">周环比
                <i class="el-icon-caret-bottom down" v-if=1></i>
                <i class="el-icon-caret-top rise" v-if=0></i>
                {{item.week}}
            </span>
        </div>
    </div>
</template>  
<script>
export default {
  data () {
    return {
        info:[
            {logoSrc:require('./images/logo1.png'),pv:`PV：${6}次`,day:'6%',week:'8%'},
            {logoSrc:require('./images/logo2.png'),pv:`PV：${6}次`,day:'6%',week:'8%'},
            {logoSrc:require('./images/logo3.png'),pv:`PV：${6}次`,day:'6%',week:'8%'},
            {logoSrc:require('./images/logo4.png'),pv:`PV：${6}次`,day:'6%',week:'8%'},
            {logoSrc:require('./images/logo5.jpg'),pv:`PV：${6}次`,day:'6%',week:'8%'},
            {logoSrc:require('./images/logo6.png'),pv:`PV：${6}次`,day:'6%',week:'8%'},
        ],
    }
  },
}
</script>
<style lang='scss'  scoped>
  .grid-content{
    display: flex;
    padding: 15px;
    grid-column-start: 1;
    grid-column-end: 4;
    border: 1px solid #eee;
       .logo-container {
           text-align: center;
            padding:15px;
            width:20%;
            min-height: 36px;
            border-right: 1px solid #eee;
            img{
                width: 60%;
                height: 30px;
                margin-bottom: 15px;
            }
            span,p{
                display: block;
                text-align: center;
                font-size: 14px; 
                color:#aaa;
                margin-bottom: 0;
                line-height:1.8;
            }
            i{
                font-size: 20px!important;
                margin-right: 10px;
                vertical-align: -2px;
            }
            .rise{
                color:#de626a;
            }
            .down{
                color:#42d181
            }
        }
        .logo-container:nth-last-child(1){
             border-right: none;
        }
  }
</style>
