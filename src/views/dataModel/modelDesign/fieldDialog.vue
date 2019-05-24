<template>
  <gov-dialog
    ref="dialog"
    :title="title"
    width="70%"
    @handleSubmit="submit"
    @closed="handleClosed"
    >
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      label-position="right"
      :disabled="operationStatus">
      <el-form-item label="字段中文名" prop="fieldCn">
        <el-input v-model="form.fieldCn" :maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="字段英文名" prop="fieldEn">
        <el-input v-model="form.fieldEn" :maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="字段类型" prop="fieldTypeItem">
        <el-cascader 
          expand-trigger="hover"
          v-model="form.fieldTypeItem" 
          :options="modelDataType">
        </el-cascader>
      </el-form-item>
      <el-row v-if="computedNumberFields">
        <el-col span="8">
          <el-form-item label="自动递增">
            <el-select
              v-model="form.isAutoIncrease"
              :disabled="hideAutoIncrease"
            >
              <el-option
                v-for="item in getDic('IS_NOT')"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="无符号" prop="isUnsigned">
            <el-select v-model="form.isUnsigned">
              <el-option
                v-for="item in getDic('IS_NOT')"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="填充零" prop="isFillZero">
            <el-select v-model="form.isFillZero">
              <el-option
                v-for="item in getDic('IS_NOT')"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="小数点" v-if="fieldDecimal" prop="fieldDecimal">
        <el-input type="number" v-model="form.fieldDecimal"></el-input>
      </el-form-item>
      <el-form-item label="默认值" v-if="fieldDefault">
        <el-select v-model="form.fieldDefault" allow-create filterable default-first-option clearable>
          <el-option
            v-for="item in getDic('FIELD_DEFAULT')"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字符集" v-if="characterSet">
        <el-select v-model="form.characterSet" filterable default-first-option clearable>
          <el-option
            v-for="item in getDic('CHARACTER_SET')"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="根据当前时间更新" labelWidth="150px" v-if="isUpdateTimestamp">
        <el-select v-model="form.isUpdateTimestamp">
          <el-option
            v-for="item in getDic('IS_NOT')"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否主键" prop="isPrimaryKey">
            <el-select v-model="form.isPrimaryKey">
              <el-option
                v-for="item in getDic('IS_NOT')"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否为空" prop="isNull">
            <el-select v-model="form.isNull" :disabled="isNullDisabled">
              <el-option
                v-for="item in getDic('IS_NOT')"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="长度">
            <el-input-number v-model="form.fieldLength" :min="0" :max="9000000000" :style="{width: '100%'}"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="排序" prop="sort">
        <el-input type="number" v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="注释">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          placeholder="请输入注释"
          :maxlength="100"
          v-model="form.fieldNotes">
        </el-input>
      </el-form-item>
    </el-form>
  </gov-dialog>
</template>

<script>
import { getDic } from '@/util/dic'
// import { fieldFromOption } from './const/index'
export default {
  props: ['title', 'state', 'pid','operationStatus'],
  data () {
    var validateFieleName = (rule, value, callback) => {
      let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
      if (!reg.test(value)) {
        callback(new Error('您输入的字段名称格式不正确'))
      } else {
        callback()
      }
    }
    return {
      form: {   
      },
      props: {children: 'children', label: 'label', value: 'value'},
      rules: {
        fieldCn: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        fieldEn: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateFieleName, trigger: 'blur' },
        ],
        fieldTypeItem: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        isUnsigned: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        isFillZero: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        isPrimaryKey: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        fieldDecimal: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        // sort: [
        //   { required: true, message: '不能为空', trigger: 'blur' },
        // ],
        isNull: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
      },
      openCount: 0,
      isNullDisabled: false,
      modelDataType: getDic('MODEL_DATA_TYPE'),
    }
  },
  computed: {
    // 清除自动递增
    hideAutoIncrease () {
      if (this.form.fieldTypeItem) {
        let fieldTypeItem = this.form.fieldTypeItem.toString()
        if (fieldTypeItem === '2,1' || fieldTypeItem === '2,2' || fieldTypeItem === '2,3' ) {
          // this.form.isAutoIncrease = null
          return true
        } else if (fieldTypeItem === '2,4' || fieldTypeItem === '2,5') {
          // this.form.isAutoIncrease = null
          return true
        }
        this.clearFields(["isAutoIncrease"])
        return false
      }
      return null
    },
    // 无符号 填充零 自动递增
    computedNumberFields () {
      if (this.form.fieldTypeItem) {
        let fieldTypeItem = this.form.fieldTypeItem.toString()
        if(fieldTypeItem === '1,1' || fieldTypeItem === '2,1' || fieldTypeItem === '2,2' || fieldTypeItem === '2,3' || fieldTypeItem === '1,3') {
          return true
        } else if (fieldTypeItem === '1,4' || fieldTypeItem === '1,5' || fieldTypeItem === '2,4' || fieldTypeItem === '2,5' || fieldTypeItem === '1,6') {
          return true
        } else if (fieldTypeItem === '1,7') {
          return true
        } else {
          this.clearFields(["isAutoIncrease", "isUnsigned", "isFillZero"])
          return false
        }
      }
      return null
    },
    // 默认值
    fieldDefault () {
      if (this.form.fieldTypeItem) {
        let fieldTypeItem = this.form.fieldTypeItem.toString()
        if(fieldTypeItem === '3,2' || fieldTypeItem === '5,1' || fieldTypeItem === '5,2' || fieldTypeItem === '5,3' || fieldTypeItem === '5,5') {
          return false
        } else if (fieldTypeItem === '3,4' || fieldTypeItem === '3,5' || fieldTypeItem === '3,6' || fieldTypeItem === '3,7' || fieldTypeItem === '5,6') {
          return false
        } else if (fieldTypeItem === '5,7' || fieldTypeItem === '5,8' || fieldTypeItem === '5,9' || fieldTypeItem === '5,10' || fieldTypeItem === '3,8') {
          return false
        } else if (fieldTypeItem === '3,9' || fieldTypeItem === '4,5') {
          return false
        } else {
          this.clearFields(["fieldDefault"])
          return true
        }
      }
      return null
    },
    // 小数长度
    fieldDecimal () {
      if (this.form.fieldTypeItem) {
        let fieldTypeItem = this.form.fieldTypeItem.toString()
        if(fieldTypeItem === '2,1' || fieldTypeItem === '2,2' || fieldTypeItem === '2,3' || fieldTypeItem === '2,4' || fieldTypeItem === '2,5') {
          return true
        } else {
          return false
        }
      }
      return null
    },
    // 字符集
    characterSet () {
      if (this.form.fieldTypeItem) {
        let fieldTypeItem = this.form.fieldTypeItem.toString()
        if(fieldTypeItem === '3,3' || fieldTypeItem === '5,1' || fieldTypeItem === '3,5' || fieldTypeItem === '3,7' || fieldTypeItem === '5,11') {
          return true
        } else if (fieldTypeItem === '3,8' || fieldTypeItem === '3,10' || fieldTypeItem === '3,12') {
          return true
        } else {
          this.clearFields(["characterSet"])
          return false
        }
      }
      return null
    },
    // 根据当前时间更新
    isUpdateTimestamp () {
      if (this.form.fieldTypeItem) {
        let fieldTypeItem = this.form.fieldTypeItem
        if(fieldTypeItem === '4,2' || fieldTypeItem === '4,4') {
          return true
        } else {
          this.clearFields(["isUpdateTimestamp"])
          return false
        }
      }
      return null
    },
  },
  watch: {
    // "form.fieldType" () {
    //   this.openCount += 1
    // },
    "form.isPrimaryKey": {
      deep: true,
      handler (val) {
        if (val === '1') {
          this.form.isNull = "2"
          this.isNullDisabled = true
        } else {
          this.isNullDisabled = false
        }
      },
    },
  },
  methods: {
    changeFieldType () {

    },
    getDic (name) {
      return getDic(name)
    },
    handleClosed () {
      this.$emit('closed')
      this.$nextTick(()=>{
        this.$refs['form'].resetFields()
      })
    },
    open (formData) {
      this.form = formData
      if (formData.fieldType) {
        var item = formData.fieldType.split(",")
        this.form.fieldType = item
      }
      this.$refs['dialog'].open()
      this.$nextTick(()=>{
        this.$refs['form'].clearValidate()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.fieldType = this.form.fieldTypeItem.toString()
          this.$emit('submit', this.form, this.pid)
        } else {
          return false
        }
      })
    },
    clearFields () {
      // console.log(fields)
    },
  },
}
</script>
