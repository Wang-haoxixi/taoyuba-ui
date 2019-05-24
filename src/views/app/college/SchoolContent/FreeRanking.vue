<template>
  <div class="school-board">
    <IepAppRankingCard :dataList="dataList"></IepAppRankingCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { name: '数据驱动的政府服务创新', color: 'red' },
        { name: '数据赋能与政府组织升维', color: 'red' },
        { name: 'Tomcat服务配置与性能优化', color: 'red' },
        { name: '2018数字政府与政务大数据建设高', color: '' },
        { name: 'Kafka流处理平台', color: '' },
        { name: '解锁网络编程之NIO的前世今生', color: '' },
        { name: 'PHP+Mysql+Ajax实现分页', color: '' },
        { name: 'Tomcat服务配置与性能优化', color: '' },
        { name: '2018 AWS技术峰会  自动化运维.', color: '' },
        { name: 'Kafka流处理平台', color: '' },
      ],
    }
  },
}
</script>


