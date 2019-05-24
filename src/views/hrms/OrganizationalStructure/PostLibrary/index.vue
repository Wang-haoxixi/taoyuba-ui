<template>
  <div>
    <basic-container>
      <page-header title="岗位库"></page-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='PostLibrary'" v-slot:PostLibrary>
          <post-library v-loading="activeTab !=='PostLibrary'"></post-library>
        </template>
        <template v-if="activeTab ==='PostType'" v-slot:PostType>
          <post-type v-loading="activeTab !=='PostType'"></post-type>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import PostLibrary from './PostLibrary/'
import PostType from './PostType/'
export default {
  components: { PostLibrary, PostType },
  data () {
    return {
      tabList: [{
        label: '岗位库',
        value: 'PostLibrary',
      }, {
        label: '岗位分类',
        value: 'PostType',
      }],
      activeTab: 'PostLibrary',
    }
  },
}
</script>
