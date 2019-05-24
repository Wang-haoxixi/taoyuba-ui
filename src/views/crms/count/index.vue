<template>
  <div>
    <basic-container>
      <div class="title">keep calm,stay passinate. 激情是效率和质量的催化剂，创新是品质和价值的源动力</div>
      <iep-tabs v-model="tabName" :tab-list="tabList">
        <template v-if="tabName ==='MyCustomTab'" v-slot:MyCustomTab>
          <my-custom-tab ref="myCustom"></my-custom-tab>
        </template>
        <template v-if="tabName ==='AllCustomTab'" v-slot:AllCustomTab>
          <all-custom-tab ref="allCustom"></all-custom-tab>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import MyCustomTab from './MyCustom/'
import AllCustomTab from './AllCustom/'
export default {
  name: 'count',
  components: { MyCustomTab, AllCustomTab },
  data () {
    return {
      tabName: 'MyCustomTab',
      tabList: [
        {
          label: '我的客户',
          value: 'MyCustomTab',
        }, {
          label: '全部客户',
          value: 'AllCustomTab',
        },
      ],
    }
  },
  methods: {
    change () { },
  },
}
</script>
<style lang="scss" scoped>
.title {
  padding: 10px 0;
  font-size: 18px;
  color: #be2c31;
  text-align: center;
  background: #f8f8f8;
  line-height: 40px;
  margin: 5px 0;
}
</style>

