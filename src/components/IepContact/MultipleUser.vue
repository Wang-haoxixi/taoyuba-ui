<template>
  <div class="multiple-box">
    <operation-wrapper v-if="disabled">
      <el-tag v-if="!users.length" type="info">暂无</el-tag>
      <el-tag type="info" v-for="user in users" :key="user.id">{{user.name}}</el-tag>
    </operation-wrapper>
    <operation-wrapper v-if="!disabled" class="contact-wrapper">
      <a-select mode="multiple" labelInValue :value="usersValue" placeholder="请输入姓名或姓名拼音" style="width: 100%" :filterOption="false" @search="handleSearch" @change="handleChange" :notFoundContent="fetching ? undefined : null" dropdownClassName="iep-contact-dropdown" :getPopupContainer="getPopupContainer" ref="a-select">
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />
        <a-select-option v-for="item in userResults" :key="item.id+''">{{item.name}}</a-select-option>
      </a-select>
      <a-button v-if="isClear && !disabled" icon="close" @click="clearAll"></a-button>
      <a-button @click="openContact()">通讯录</a-button>
    </operation-wrapper>
    <iep-drawer :drawer-show="dialogShow" title="通讯录" width="300" @close="close" :z-index="3000">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
      <el-tree ref="tree" class="filter-tree" :filter-node-method="filterNode" :props="props" :data="treeData" :default-expanded-keys="[1]" node-key="value">
        <span v-if="node.value!==1" class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{level1:node.level===1,level2:node.level===2,level3:node.level===3}">{{ node.label }}</span>
          <span v-if="node.level===3">
            <el-button :disabled="isDisabled(data, node)" type="text" size="mini" @click="() => selectGroup(data, node)">选择</el-button>
          </span>
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
  name: 'IepContactMultipleUser',
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
      type: Array,
      required: true,
    },
  },
  data () {
    this.handleSearch = debounce(this.handleSearch, 800)
    return {
      filterText: '',
      dialogShow: false,
      fetching: false,
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
    isClear () {
      return this.userIds.length !== 0 ? true : false
    },
    users: {
      get: function () { return this.value },
      set: function (value) { this.$emit('input', value) },
    },
    userIds: function () { return this.value.map(m => m.id) },
    usersValue () {
      return this.users.map(m => {
        return {
          key: m.id + '',
          label: m.name,
        }
      })
    },
  },
  created () {
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
  methods: {
    getPopupContainer () {
      return this.$refs['a-select'].$el
    },
    close () {
      this.filterText = ''
      this.dialogShow = false
    },
    openContact () {
      this.dialogShow = true
      this.loadNode()
    },
    clearAll () {
      this.users = []
    },
    isDisabled (data, node) {
      if (node.level === 3 && (this.userIds.includes(data.value) || this.filterUserList.includes(data.value))) {
        return true
      }
      return false
    },
    handleClose (tag) {
      const newData = this.users.filter(item => item.id !== tag.id)
      this.users = newData
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectGroup (data, node) {
      if (node.level === 3) {
        if (!this.userIds.includes(data.value)) {
          this.users.push({
            id: data.value,
            name: data.label,
          })
        }
      }
    },
    handleChange (value) {
      const users = value.map(m => {
        return {
          id: this.contactsPyGroup[+m.key].id,
          name: this.contactsPyGroup[+m.key].name,
        }
      })
      Object.assign(this, {
        users,
        userResults: [],
        fetching: false,
      })
    },
    handleSelect (item) {
      this.users.push({
        id: item.id,
        name: item.name,
      })
      this.username = ''
    },
    async handleSearch (query) {
      this.fetching = true
      const name = query.toLowerCase().trim()
      const { data } = await loadContactsPyList({ name })
      this.userResults = data.data.filter(m => !this.filterUserList.includes(m.id))
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
}
</script>
<style scoped>
.filter-tree {
  margin-top: 10px;
}
.contact-wrapper {
  display: flex;
}
.contact-wrapper
  >>> .ant-select-selection__choice__content
  > span:nth-child(2) {
  display: none;
}
.multiple-box > .el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>