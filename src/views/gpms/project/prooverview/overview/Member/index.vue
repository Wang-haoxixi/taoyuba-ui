<template>
    <div>
        <el-row>
            <div class="being" v-if="!pro.isHas">
                暂无数据！
            </div>
            <div v-else>
                <el-col :span="12" class="col" v-for="(item,index) in pro.num" :key='index'>
                    <div class="head"></div>
                    <div class="detail">
                        <div class="name">{{pro.name}}</div>
                        <div class="section">所在部门：{{pro.section}}</div>
                        <div style="clear: both">
                            <el-button v-for="(value, index) in pro.tag" :key="index" class="btns">{{value}}</el-button>
                        </div>
                    </div>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data (){
            return {
                pro:{
                    isHas:true,//推荐项目成员选项卡 显示数据还是 暂无数据字段
                    src: '',
                    name:'殷亚增',
                    section: '国脉海洋信息发展有限公司',
                    tag:['数据基因', '互联网+政务服务', '数据服务', '产品设计', '项目管理', '微服务'],
                    num: 10,
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    .col{
        overflow: hidden;
        margin-bottom: 14px;
    }
    .being{
        font-weight: normal;
        font-size: 18px;
        text-align: center;
        height: 300px;
        line-height: 300px;
    }
    .head{
        width: 60px;
        height: 60px;
        border: 1px solid #ccc;
        float: left;
        margin-right: 5px;
    }
    .detail{
        float: left;
    }
    .name{
        float: left;
        font-weight: normal;
        font-size: 18px;
        margin-top: 3px;
        margin-left: 5px;
        margin-right: 20px;
        line-height: 20px;
    }
    .section{
        float: left;
        font-weight: normal;
        line-height: 20px;
        margin-top: 3px;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .btns{
        padding: 6px 8px;
        border-radius: 0;
        margin: 0 0 0 5px;
        font-size: 12px;
    }
</style>