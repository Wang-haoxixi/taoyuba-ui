// import merge from 'lodash/merge'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['permissions', 'dicList']),
  },
  props: {
    // 弹窗状态值
    status: {
      type: String,
      default: 'create',
    },
    // 传过来的formdata
    temp: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      // 弹框状态
      dialogStatus: '',
      // 弹窗
      dialog: {
        textMap: {
          create: '创建',
          update: '编辑',
          detail: '详情',
        },
        visible: false,
        textName: {
          create: 'create',
          update: 'update',
          detail: 'detail',
        },
      },
      // 表单id
      refNameForm: 'form',
      // 弹窗id
      refNameDialog: 'formDialog',
      // 弹窗
      refDialog: 'dialog',
      // 分页
      pagination: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 显示多少条
        total: 0, // 总条数
        pageSizes: [10, 20, 30, 40, 50],
      },
      // 列表数据
      tableList: [],
      // 搜索参数
      listQuery: {},
      // 列表多选数据
      queryData: [],
      // 按钮权限控制
      permissionsBtn: [],
      tableLoading: false,
      isSearch: false,
      dicData: [],
      formData: {},
    }
  },
  created () {
    this.permissionsControl()
  },
  watch: {
    'pagination.currentPage': {
      handler (newVal) {
        this.listQuery.page = cloneDeep(newVal)
      },
      deep: true,
      immediate: true,
    },
    'pagination.pageSize': {
      handler (newVal) {
        this.listQuery.limit = cloneDeep(newVal)
      },
      deep: true,
      immediate: true,
    },
    temp: {
      handler (newVal) {
        this.form.id = ''
        this.copyData(this.form, newVal)
      },
      deep: true,
    },
  },
  methods: {
    // 按钮权限控制
    permissionsControl () {
      this.permissionsBtn.forEach((item) => {
        this[item] = this.permissions[item]
      })
    },
    openDialog (refName) {
      this.$refs[refName || this.refNameDialog].open()
    },
    closeDialog (refName) {
      this.$refs[refName || this.refNameDialog].close()
    },
    // 打开弹窗
    open () {
      this.dialog.visible = true
    },
    // 关闭弹窗
    close () {
      this.dialog.visible = false
    },
    // 列表
    getList () {},
    // 提醒提示
    warningNotify (msg = '提醒', duration) {
      let type = 'warning'
      this.notify({ msg, type, duration })
    },
    // 成功提示
    successNotify (msg = '成功', duration) {
      this.notify({ msg, duration })
    },
    // 失败提示
    errorNotify (msg = '失败', duration) {
      let type = 'error'
      this.notify({ msg, type, duration })
    },
    // 提示
    notify ({ msg = '', type = 'success', duration = 1500 }) {
      this.$message({
        message: msg,
        type: type,
        duration: duration,
      })
    },
    // 清除验证
    clearValidate: function (refName) {
      if (!refName && !this.refNameForm) {
        return
      }
      this.$nextTick(() => {this.$refs[refName || this.refNameForm].clearValidate(valid => {
        if (valid) {
          return new Promise((resolve) => {
            resolve()
          })
        }
      })})
    },
    // 验证
    validate: function (refName) {
      if (!refName && !this.refNameForm) {
        return
      }
      this.$nextTick(() => {this.$refs[refName || this.refNameForm].validate()})
    },
    resetForm: function (refName) {
      if (!refName && !this.refNameForm) {
        return
      }
      this.$refs[refName || this.refNameForm].resetForm()
    },
    // 重新验证
    afreshValidate: function (refName) {
      this.clearValidate(refName || this.refNameForm)
      this.validate(refName || this.refNameForm)
    },
    // 数据重置
    resetFormData (data = {}, string = false, ignore = ['limit', 'page']) {
      for (let key in data) {
        if (ignore.indexOf(key) > -1) {
          continue
        }
        let value = data[key]
        let result = string ? '' : undefined
        if (isBoolean(value) || isNumber(value) || isString(value)) {
          result = string ? '' : undefined
        } else if (isArray(value)) {
          result = []
        } else if (isPlainObject(value)) {
          result = {}
        } else {
          result = string ? '' : undefined
        }
        this.$set(data, key, result)
      }
    },
    // 批量删除
    hanldeDeleteQueryBefore (paramName = 'queryData') {
      if (this[paramName].length > 0) {
        this.$confirm(this.IS_DELETE).then(() => {
          return new Promise((resolve) => {
            resolve()
          })
        }).catch(() => {})
      } else {
        this.warningNotify(this.MULTIPLE_DELETE_EMPTY)
      }
    },
    // 列表搜索
    handleFilter () {
      this.pagination.currentPage = 1
      this.getList()
    },
    // 分页显示个数
    sizeChange (val) {
      // this.pagination.currentPage = 1
      this.pagination.pageSize = val
      this.getList()
    },
    // 分页当前页
    currentChange (val) {
      this.pagination.currentPage = val
      this.getList()
    },
    // 过滤空字段包括[],{},'',undefined, null
    filterData (param) {
      if (!isPlainObject(param)) {
        console.warning('只过滤对象数据')
        return
      }
      let data = Object.assign({}, param)
      for (let key in data) {
        if ((isArray(data) && data.length === 0)
          || (isPlainObject(data) && Object.keys(data).length === 0)
          || (isString(data) && data === '')
          || data == null) {
          delete data[key]
        }
      }
    },
    // 删除数组中数据
    deleteArrayData (data, index) {
      if (isArray(index) && index.length > 0) {
        index.forEach((value) => {
          data.splice(value, 1)
        })
      } else if (isString(index) || isNumber(index)) {
        data.splice(index, 1)
      }
    },
    // 获取字典
    getDic (name = '') {
      if (name === '') {
        console.warn('字典名不能为空')
        return []
      }
      return this.dicList[name]
    },
    // 添加全部
    setAll (data, {value = 'value', label = 'label'}) {
      if (!isArray(data)) {
        console.warn('数据类型不正确，需数组类型')
        return
      }
      const getData = data.findIndex((item) => {
        return !item.value
      })
      if (getData) {
        return
      }
      let all = {}
      all[value] = ''
      all[label] = '全部'
      data.unshift(all)
    },
    // form表单添加字典
    setDicList (options, arr) {
      arr.forEach((item) => {
        this.$set(options, item.name, this.getDic(item.dicName))
      })
    },
    // table添加字典
    setTableDicList (tableData, dicList) {
      for (let j = 0, len1 = dicList.length; j < len1; j++) {
        for (let i = 0, len = tableData.length; i < len; i++) {
          if (tableData[i].prop === dicList[j].name) {
            this.$set(tableData[i], 'dicData', this.getDic(dicList[j].dicName))
            break
          }
        }
      }
    },
    // 数据拷贝
    copyData (form, data) {
      if (Object.keys(data).length > 0) {
        for (let key in form) {
          this.$set(form, key, data[key])
        }
      }
    },
    // 设置avue column字典值
    setDicColumn (data, options, type = 'type') {
      for (let i = 0 , len = data.length; i < len; i++) {
        let currentData = data[i]
        if (currentData[type] === 'dic') {
          if (currentData.dicData) {
            return
          }
          if (currentData.dicName && (!currentData.dicData)) {
            this.$set(currentData, 'dicData', this.getDic(currentData.dicName))
          } else {
            this.$set(currentData, 'dicData', options[currentData.prop])
          }
        } else {
          if (currentData.dicName) {
            if (currentData.dicData) {
              return
            }
            this.$set(currentData, 'dicData', this.getDic(currentData.dicName))
          }
        }
      }
    },
  },
}
