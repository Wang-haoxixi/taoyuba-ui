<template>
  <div class="honor">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
        <span slot="statistics" class="statistics">（{{replaceText[0]}}个软件著作权，{{replaceText[1]}}个A级企业认证，{{replaceText[2]}}个行业贡献企业奖）</span>
        <img :src="firstImg" alt="" class="img">
        <div class="honor-list">
            <div v-for="(item,index) in HonorList" :key="index" class="piece">
                {{item}}
            </div>
        </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
        title:'荣誉资质',
        linkName:'',
        replaceText:[24,3,5],
        firstImg:require('./img/copyright.jpg'),
        HonorList: [
            '软著|DIPS站群管理系统V2.0',
            '软著|DIPS模型管理系统V2.0',
            '软著|DIPS栏目及内容管理软件V2.0',
            '软著|DIPS绩效管理系统V2.0',
            '软著|数据基因交换共享平台',
            '软著|数据基因资产登记管理软件',
            '软著|数据基因数据模型设计软件',
            '软著|数据基因数据元池清洗比对分析软件',
            '软著|数据基因资源目录管理系统',
            '软著|数据基因资源模板生成系统',
            '软著|数据基因数据元标准化管理系统',
            '软著|数据基因基于应用场景的数据架构管理系统',
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.statistics{
  color: #999;
}
.honor{
    grid-column-start: 1;
    grid-column-end: 3; 
    .img{
        width: 175px;
        height: 200px;;
        float: left;
        margin:0 25px 26px 0;
    }
    .honor-list{
        width: 540px;
        float: left;
        display: grid;
        grid-auto-flow: row dense;
        grid-template-columns: 1fr 1fr;
        .piece{
            cursor: pointer;
            height: 32px;
            line-height: 32px;
            overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
        }
    }
}
</style>
