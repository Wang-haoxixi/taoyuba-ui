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
    ...mapGetters(['permissions', 'dicList', 'userInfo']),
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
          create: '新增',
          update: '编辑',
          detail: '详情',
        },
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
      tableLoading: false,
      dicData: [],
      formData: {},
    }
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
    'pagination.total': {
      handler (newVal) {
        let total = newVal
        let currentPage = this.pagination.currentPage
        let pageSize = this.pagination.pageSize
        if (total !== 0 && !(total > pageSize * (currentPage - 1))) {
          let result = total / pageSize
          let v = total <= pageSize * currentPage && total > pageSize * (currentPage - 1)
          if (total / pageSize === 0 && !v) {
            this.pagination.currentPage = Math.ceil(result)
          } else if (!v) {
            this.pagination.currentPage = Math.ceil(result)
          }
          setTimeout(() => {

            this.getList(this.index)
          }, 50)
        }
      },
      deep: true,
    },
    temp: {
      handler (newVal) {
        if (Object.keys(newVal).length > 0) {
          for (let key in this.form) {
            this.$set(this.form, key, newVal[key] || '')
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 打开弹窗
    openDialog (refName) {
      this.$refs[refName || this.refNameDialog].open()
    },
    // 关闭弹窗
    closeDialog (refName) {
      this.$refs[refName || this.refNameDialog].close()
    },
    // 打开弹窗
    open (refName) {
      this.$refs[refName || this.refNameDialog].open()
    },
    // 关闭弹窗
    close (refName) {
      this.$refs[refName || this.refNameDialog].close()
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
    clearValidate (refName) {
      if (!refName && !this.refNameForm) {
        return
      }
      this.$nextTick(() => {this.$refs[refName || this.refNameForm].clearValidate()})
    },
    // 验证
    validate (refName) {
      if (!refName && !this.refNameForm) {
        return
      }
      this.$nextTick(() => {this.$refs[refName || this.refNameForm].validate()})
    },
    resetForm (refName) {
      if (!refName && !this.refNameForm) {
        return
      }
      this.$refs[refName || this.refNameForm].resetForm()
    },
    // 重新验证
    afreshValidate (refName) {
      this.clearValidate(refName)
      this.validate(refName)
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
    deleteQuery (paramName = 'queryData') {
      return new Promise((resolve) => {
        if (this[paramName].length > 0) {
          this.$confirm(this.IS_DELETE).then(() => {
            resolve()
          }).catch(() => {})
        } else {
          this.warningNotify(this.MULTIPLE_DELETE_EMPTY)
        }
      })

    },
    // 列表搜索
    handleFilter () {
      for (let key in this.listQuery) {
        if (this.listQuery[key] === '' || this.listQuery[key] === null) {
          this.listQuery[key] = undefined
        }
      }
      this.pagination.currentPage = 1
      setTimeout(() => {
        this.getList(this.index)
      }, 10)
    },
    // 分页显示个数
    sizeChange (val) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = val
      setTimeout(() => {
        this.getList(this.index)
      }, 10)
    },
    // 分页当前页
    currentChange (val) {
      this.pagination.currentPage = val
      setTimeout(() => {
        this.getList(this.index)
      }, 10)
    },
    // 多选
    selectionChange (val, prop) {
      this.queryData = val.map((item) => {
        return item[prop || 'id']
      })
    },
    // 重置搜索數據
    handleReset () {
      this.resetFormData(this.listQuery)
      this.listQuery.page = this.pagination.currentPage
      this.listQuery.limit = this.pagination.pageSize
    },
    // 过滤空字段包括[],{},'',undefined, null
    filterData (param) {
      if (!isPlainObject(param)) {
        // console.warning('只过滤对象数据')
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
    setAll (data) {
      const name = {key: '', value: '全部'}
      data.unshift(name)
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
          if (currentData.dicData && currentData.dicData.length > 0) {
            continue
          }
          if (currentData.dicName) {
            this.$set(currentData, 'dicData', this.getDic(currentData.dicName))
          } else {
            if (!options[currentData.prop]) {
              continue
            }
            console.log('options', currentData.prop, options[currentData.prop])
            if (options[currentData.prop] && options[currentData.prop].length > 0) {
              this.$set(currentData, 'dicData', options[currentData.prop])
            }
          }
        } else {
          if (currentData.dicName) {
            if (currentData.dicData && currentData.dicData.length > 0) {
              continue
            }
            this.$set(currentData, 'dicData', this.getDic(currentData.dicName))
          }
        }
      }
    },
    // 改变数据的值
    changeCurrentData (column, name, obj) {
      for (let i = 0, len = column.length; i < len; i++) {
        if (column[i].prop === name) {
          for (let key in obj) {
            this.$set(column[i], key, obj[key])
          }
        }
      }
    },
    // 在column中插入数据
    changeColumn ({column = [], data = [], type = 'dicData', name = ''}) {
      if (name == null || name === '') {
        return
      }
      for (let i = 0, len = column.length; i < len; i++) {
        if (column[i].prop === name) {
          this.$set(column[i], type, data)
          break
        }
      }
    },
  },
}
