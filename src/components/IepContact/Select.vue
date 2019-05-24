<template>
  <div>
    <operation-wrapper v-if="disabled">
      <el-tag v-if="![user].length" type="info">暂无</el-tag>
      <el-tag type="info" v-for="item in [user]" :key="item.id">{{item.name}}</el-tag>
    </operation-wrapper>
    <operation-wrapper v-if="!disabled" class="contact-wrapper">
      <a-select showSearch labelInValue :value="userValue" placeholder="请输入姓名或姓名拼音" :showArrow="false" :filterOption="false" @search="handleSearch" @change="handleChange" :notFoundContent="null" dropdownClassName="iep-contact-dropdown" :getPopupContainer="getPopupContainer" ref="a-select">
        <a-select-option v-for="user in userResults" :key="user.id">{{user.name}}</a-select-option>
      </a-select>
      <a-button @click="openContact()">通讯录</a-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="300" @close="dialogShow = false" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" class="filter-tree" :filter-node-method="filterNode" :props="props" :data="treeData" @node-click="selectUser" :default-expanded-keys="[1]" node-key="value">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{'is-disabled':isDisabled(data, node)}" @click="() => selectUser(data, node)">{{ node.label }}</span>
        </span>
      </el-tree>
    </iep-drawer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserListTree } from '@/api/admin/contacts'
import { loadContactsPyList } from '@/api/admin/contacts'
import debounce from 'lodash/debounce'
export default {
  name: 'IepContactSelect',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    filterUserList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data () {
    this.handleSearch = debounce(this.handleSearch, 800)
    return {
      dialogShow: false,
      fetching: false,
      filterText: '',
      props: {
        isLeaf: 'leaf',
      },
      treeData: [],
      userResults: [],
    }
  },
  computed: {
    ...mapGetters([
      'contactsPyGroup',
    ]),
    user: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (value) {
        this.$emit('input', value)
      },
    },
    userValue () {
      return {
        key: this.user.id + '',
        label: this.user.name,
      }
    },
  },
  created () {
    // this.loadPyList()
  },
  methods: {
    getPopupContainer () {
      return this.$refs['a-select'].$el
    },
    handleClear () {
      this.user = {
        id: '',
        name: '',
      }
    },
    handleChange (value) {
      const user = {
        id: this.contactsPyGroup[+value.key].id,
        name: this.contactsPyGroup[+value.key].name,
      }
      Object.assign(this, {
        user,
        userResults: [],
        fetching: false,
      })
    },
    onFilterMethod (query) {
      const queryToLower = query.toLowerCase()
      if (query !== '') {
        setTimeout(() => {
          this.userPyListOptions = this.userPyList.filter(item => {
            return item.name.toLowerCase().indexOf(queryToLower) > -1
              || item.pinyin.toLowerCase().indexOf(queryToLower) > -1
              || item.py.toLowerCase().indexOf(queryToLower) > -1
          })
        }, 200)
      } else {
        this.userPyListOptions = [...this.userPyList]
      }
    },
    openContact () {
      this.dialogShow = true
      this.loadNode()
    },
    isDisabled (data, node) {
      if (node.level === 3 && this.filterUserList.includes(data.value)) {
        return true
      }
      return false
    },
    selectUser (data, node) {
      if (this.isDisabled(data, node)) {
        return
      }
      if (node.level === 3) {
        this.user = {
          id: data.value,
          name: data.label,
        }
        this.filterText = ''
        this.dialogShow = false
      }
    },
    filterNode (value, data, node) {
      console.log(value, data, node)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    async handleSearch (query) {
      this.fetching = true
      const name = query.toLowerCase().trim()
      const { data } = await loadContactsPyList({ name })
      this.userResults = data.data
      this.fetching = false
    },
    loadNode () {
      if (this.treeData.length) {
        return
      }
      getUserListTree().then(({ data }) => {
        this.treeData = data.data
      })
    },
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
}
</script>
<style lang="scss" scoped>
.filter-tree {
  margin-top: 10px;
}
.contact-wrapper {
  display: flex;
}
.is-disabled {
  cursor: not-allowed;
  color: #aaa;
}
</style>
