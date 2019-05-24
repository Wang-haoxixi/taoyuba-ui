<template>
  <div class="app-container pull-auto">
    <gov-layout-main>
      <avue-crud :data="data" :option="option" />
    </gov-layout-main>
  </div>
</template>
<script>
import request from '@/router/request'
export default {
  data () {
    return {
      obj: {},
      data: [],
      option: {
        menu: false,
        page: false,
        addBtn: false,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '模块名称',
            prop: 'model',
          },
          {
            label: '唯一标示',
            prop: 'uniqueKey',
          },
          {
            label: '模块地址',
            prop: 'ipAddress',
          },
          {
            label: '管道名称',
            prop: 'channelName',
          },
        ],
      },
    }
  },
  created () {
    request({
      url: '/api/tx/admin/onlines',
      method: 'get',
    }).then(resp => {
      this.data = resp.data
    })
  },
}
</script>
