<template>
    <div class="bannerInfo">
        <div class="banner-container">
            <div class="banner-item" v-for="(item,index) in info" :key="index">
                <span>
                    <span class="options">
                        {{item.options}} 
                        <span class="num">{{item.num}}</span>
                        {{item.company}}
                    </span>
                </span>
                <p class="enterprise" v-text="item.enterprise"></p>
                <p class="qualifications" v-text="item.qualifications"></p>
            </div>
        </div>
    </div>
</template>  
<script>
export default {
  data () {
    return {
        info:[
            {options:'荣誉资质',num:23,company:'项',enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:'品牌活动',num:22,company:'场',enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:'智库成果',num:26,company:'项',enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:'内外专家',num:23,company:'位',enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:'业务平台',num:23,company:'个',enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
            {options:'渠道资源',num:23,company:'个',enterprise:`高新企业${6}家`,qualifications:`软件资质${6}项`},
        ],
    }  
  },
}
</script>
<style lang='scss' scoped>
  .bannerInfo{
    display: flex;
    justify-content: space-around;
    background-color: #f8f8f8;
    .banner-container{
        display: flex;
        padding: 10px 0;
        justify-content: space-around;
        width:1200px;
        .banner-item {
            border-right: 1px dashed #ccc;
            min-height: 36px;
            width:18%;
            text-align: center;
            p ,span{
                text-align: center;
                font-size: 16px; 
                color:#333;
                margin-bottom: 0;
                line-height:1.8;
            }
            .enterprise{
                font-size: 14px;
                color: #aaa;
            }
            .qualifications{
                font-size: 14px;
                color: #aaa;
            }
            .num{
                font-size: 18px;
            }
        }
        .banner-item:nth-last-child(1){
            width:15%;
            border-right: none;
            text-align: right;
            p{
               text-align: right;
            }
        }
        .banner-item:nth-child(1){
            width:15%;
            text-align: left;
            p{
               text-align: left;
            }
        }
  
    }
}
</style>
