<template>
  <el-select filterable remote placeholder="请输入合同关键词" :remote-method="remoteMethod" :loading="loading" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in contractOptions" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { getContractListByName } from '@/api/mlms/material/datum/contract'
export default {
  name: 'IepContractSelect',
  inheritAttrs: false,
  data () {
    return {
      contractOptions: [],
      loading: false,
    }
  },
  methods: {
    async remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        try {
          const { data } = await getContractListByName({ name: query })
          this.contractOptions = data.data
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      } else {
        this.contractOptions = []
      }
    },
  },
}
</script>
