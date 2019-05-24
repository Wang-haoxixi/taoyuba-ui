<template>
  <div class="warp">
    <ve-bar :data="chartData" :settings="chartSettings" :extend="chartExtend" :height="height"></ve-bar>
  </div>

</template>

<script>
import { getAllManager } from '@/api/crms/count'
export default {
  data () {
    this.chartSettings={
         labelMap: {
          'clientQuantity': '客户',
          'contactQuantity':'联系人',
        },
        itemStyle:{
          barBorderRadius: 30,
        },
    }
    this.chartExtend={
      color:['#D56368','#DDDDDD'],
      barWidth:10,
      grid: {
          left: '20px',
          right: '40px',
          bottom: '20px',
          top: '20px',
          containLabel: true,
        },
         legend: {
          bottom: 0,
        },
    }
    return {
       chartData: {
          columns: [ 'marketManager', 'clientQuantity', 'contactQuantity'],
          rows: [],
        },
        height:'',
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getAllManager().then((res) => {
        let arr = res.data.data
        this.height = 200 * Math.ceil(arr.length / 5) + 'px'
        for (var index in arr) {
          if (!arr[index].hasOwnProperty('contactQuantity')) {
            arr[index].contactQuantity = 0
          }
        }
        this.chartData.rows = arr
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.warp::-webkit-scrollbar {
  height: 6px;
}
.warp::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e5e5e5;
}
.warp::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: transparent;
}
</style>
