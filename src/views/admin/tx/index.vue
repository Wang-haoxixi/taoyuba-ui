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
            label: '属性名称',
            prop: 'key',
          },
          {
            label: '属性值',
            prop: 'value',
          },
        ],
      },
    }
  },
  created () {
    request({
      url: '/api/tx/admin/avueSetting',
      method: 'get',
    }).then(resp => {
      this.data = resp.data
      // console.log(resp.data)
    })
  },
}
</script>
