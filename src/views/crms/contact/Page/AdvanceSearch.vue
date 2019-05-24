<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="联系人姓名">
        <el-input v-model="form.contactName" placeholder="请输入联系人" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="对应客户">
        <!-- <el-input v-model="form.clientName" placeholder="请输入对应客户" :maxlength="30"></el-input> -->
        <el-autocomplete class="inline-input" v-model="form.clientName" :fetch-suggestions="querySearch" placeholder="请输入对应客户" @select="handleSelect" :hide-loading="isLoading"></el-autocomplete>
        <!-- <el-select v-model="form.clientIds" multiple placeholder="请选择">
          <el-option v-for="item in dictData" :key="item.clientId" :label="item.clientName" :value="item.clientId">
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm } from '../options'
import { getContactAssociate } from '@/api/crms/contact'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {},
      restaurants: [],
      clientList: [],
      isLoading: true,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created () {
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
    querySearch (queryString, cb) {
      getContactAssociate({ clientName: queryString }).then(res => {
        if (res.data.length > 0) {
          let data = res.data.map(m => {
            return { value: m.clientName }
          })
          cb(data)
        }
      })
    },
    handleSelect (item) {
      console.log(item)
    },
  },
}
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

