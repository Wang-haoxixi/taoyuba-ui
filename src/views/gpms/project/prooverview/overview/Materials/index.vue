<template>
    <div>
        <el-row class="posbox">
            <el-col :span='3'>
                <el-button class="postit"  v-for="(item,index) in bt" :key='index'>{{item.name}}</el-button>
            </el-col>
            <el-col class="posmenu" :span='21'>
                <el-col class="Referencetits" :span='12' v-for="i in pro.num" :key="i">
                    <p><strong>{{pro.title}}</strong></p>
                    <el-col class="smallfontss" :span='24'>
                        <el-col :span='5' class="mbss">上传者：{{pro.proStage}}</el-col>
                        <el-col :span='19'>
                            材料标签：
                            <el-button v-for="(value, index) in pro.tag" :key="index" class="btns">{{value}}</el-button>
                        </el-col>
                    </el-col>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data (){
            return{
                bt:[
                    {name:'方案'},
                    {name:'报告/清单'},
                    {name:'制度/规范/领导讲话'},
                    {name:'说明书/白皮书/模板'},
                    {name:'招投标/专利/软著'},
                    {name:'培训材料'},
                ],
                pro:{
                    title:'2018年度无锡市年度网站群考核评测及调研项目',
                    proStage: '项目立项',
                    tag:['数据基因', '互联网+政务服务', '数据服务'],
                    num: 10,
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    .Referencetit{
        padding: 10px 0 0 25px;
        box-sizing: border-box;
        p{
            margin: 0;
        }
        .smallfonts{
            font-size: 12px;
            padding-top: 5px;
            margin-bottom: 0;
        }
        .mbs{
            margin: 0;
            line-height: 23px;
        }
    }
    .btns{
        padding: 5px;
        margin: 0 0 0 5px;
        font-size: 12px;
    }
    .posbox{
        padding: 10px 10px 5px 10px;
    }
    .postit{
        display: block;
        border-radius: 0;
        width: 100%;
        margin: 0;
        border-color: gray;
        font-weight: bold;
        color: gray;
    }
    .posmenu{
        border: 1px solid gray;
        height: 360px;
        overflow: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        padding-right: 15px;
    }
    .mbss{
        margin: 0;
        line-height: 23px;
    }
    .smallfontss{
        font-size: 12px;
        padding-top: 5px;
        margin-bottom: 0;
    }
    .Referencetits{
        padding: 10px 0 0 25px;
        box-sizing: border-box;
    }
    .Referencetits p{
        margin: 0;
    }
    .grays{
        background-color: #E4E4E4;
    }
</style>