<template>
    <div class="visualization">
        <img :src="img">
        <div class="visualization-list">
            <div v-for="(item,index) in visualizationList" :key="index" class="piece">
                <div class="name">{{item.name}}<i class="iconfont icon-wenhao"></i></div>
                <div class="data">{{item.data}}</div>
                <div class="chart">
                    <ve-histogram v-if="index == 0" :extend="chartExtend3" :colors="colors1" width="240px" height="60px"></ve-histogram>
                    <ve-line v-if="index == 1" :extend="chartExtend2" :colors="colors2" width="240px" height="60px"></ve-line>
                    <ve-histogram v-if="index == 2" :extend="chartExtend3" :colors="colors3" width="240px" height="60px"></ve-histogram>
                    <ve-histogram v-if="index == 3" :extend="chartExtend3" :colors="colors4" width="240px" height="60px"></ve-histogram>
                </div>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        this.colors1 = ['#db474f']
        this.colors2 = ['#deab8c']
        this.colors3 = ['#3aa1fe']
        this.colors4 = ['#8cc48d']
        this.chartExtend2 = {
            xAxis: {
                show: false,
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            },
            yAxis: {
                show: false,
                type: 'value',
            },
            series: [{
                data: [100, 60, 54, 80, 70, 110, 50, 70, 110, 20, 70, 92, 130, 70, 10],
                type: 'line',
                areaStyle: {},
            }],
            grid: {
                left: '-15%',
                right: '4%',
                top: '0%',
                bottom: '0%',
                containLabel: true,
            },
        }
        this.chartExtend3 = {
            xAxis: {
                show: false,
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            },
            yAxis: {
                show: false,
                type: 'value',
            },
            series: [{
                show: false,
                data: [100, 60, 54, 80, 70, 110, 50, 70, 110, 20, 70, 92, 130, 70, 10],
                type: 'bar',
            }],
            grid: {
                left: '-15%',
                right: '4%',
                top: '0%',
                bottom: '0%',
                containLabel: true,
            },
            barWidth: '10',
        }
        return{
            img:[require('./img/date.jpg')],
            visualizationList: [
                { name: '产品售额', data: '956340元' },
                { name: '项目数量', data: '128个' },
                { name: '荣誉资质', data: '59项' },
                { name: '技术能力', data: '159项' },
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.visualization{
    width: 100%;
    position: relative;
    img{
        width: 100%;
        height: 205px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .visualization-list{
        width: 1200px;
        margin: 0 auto;
        padding: 30px 15px;
        display: grid;
        grid-auto-flow: row dense;
        grid-template-columns:1fr 1fr 1fr 1fr;
        .piece{
            padding: 0 20px;
            .name{
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                i{
                    height: 40px;
                    line-height: 40px;
                    color: #999;
                    float: right;
                }
            }
            .data{
                font-size: 30px;
            }
        }
    }
}
</style>
<style>
</style>


