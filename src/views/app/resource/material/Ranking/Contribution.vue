<template>
  <div class="contribution">
    <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
  </div>
</template>

<script>
import { getContributeList } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      dataList: [],
    }
  },
  created () {
    getContributeList().then(({data}) => {
      this.dataList = data.data.map((m) => {return {name: m.name, grade: m.value}})
      for (let index = 0; index < 3; ++index) {
        this.dataList[index].color = 'red'
      }
    })
  },
}
</script>


