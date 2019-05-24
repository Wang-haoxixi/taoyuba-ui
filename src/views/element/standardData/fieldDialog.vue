<template>
  <gov-dialog
    ref="dialog"
    :title="title"
    width="70%"
    @handleSubmit="submit"
    @closed="handleClosed">
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      :rules="rules"
      label-position="right">
      <el-form-item label="字段名称" prop="fieldName">
        <el-input v-model="form.fieldName" :maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="字段类型" prop="fieldType">
        <el-select v-model="form.fieldType" filterable default-first-option>
          <el-option
            v-for="item in getDic('FIELD_TYPE')"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row v-if="computedNumberFields">
        <el-col span="8">
          <el-form-item label="自动递增">
            <el-select
              v-model="form.isAutoIncrease"
              :disabled="this.form.fieldType === '8' || this.form.fieldType === '9' || this.form.fieldType === '11' || this.form.fieldType === '26' || this.form.fieldType === '29'"
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
          <el-form-item label="长度" prop="fieldLength">
            <el-input-number v-model="form.fieldLength" :min="0" :max="9000000000" maxlength=9 :style="{width: '100%'}"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="排序" prop="sort">
        <el-input type="number" v-model="form.sort" :min="0"></el-input>
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
  props: ['title', 'state', 'pid'],
  data () {
    var numberVerification = (rule, value, callback)=>{
      if(value && value.length>0){
        let boll = new RegExp("^[0-9][0-9]*$").test(value)
        if(!boll){
          callback(new Error('请输入正整数'))
        }
      }else{
        callback()
      }
    }

    var isNums = (rule, value, callback)=>{
      if(value && value.length>0){
        let numbers = new RegExp("^[0-9]*$")
        if(!numbers.test(value)){
          callback(new Error('请输入正整数'))
        }
      }else{
        callback()
      }
    }

    var validateFieleName = (rule, value, callback) => {
      let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
      if (!reg.test(value)) {
        callback(new Error('您输入的字段名称格式不正确'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        fieldName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validateFieleName, trigger: 'blur' },
        ],
        fieldType: [
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
        sort: [
          { validator: numberVerification,trigger: 'blur'},
        ],
        isNull: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        fieldLength: [
          { validator: isNums,trigger: 'blur'},
        ],
      },
      openCount: 0,
      isNullDisabled: false,
    }
  },
  computed: {
    // 无符号 填充零 自动递增
    computedNumberFields () {
      let fieldType = this.form.fieldType
      if(fieldType === '1' || fieldType === '8' || fieldType === '9' || fieldType === '11' || fieldType === '14') {
        return true
      } else if (fieldType === '15' || fieldType === '21' || fieldType === '26' || fieldType === '29' || fieldType === '31') {
        return true
      } else if (fieldType === '36') {
        return true
      } else {
        this.clearFields(["isAutoIncrease", "isUnsigned", "isFillZero"])
        return false
      }
    },
    // 默认值
    fieldDefault () {
      let fieldType = this.form.fieldType
      if(fieldType === '4' || fieldType === '10' || fieldType === '12' || fieldType === '13' || fieldType === '17') {
        return false
      } else if (fieldType === '18' || fieldType === '19' || fieldType === '20' || fieldType === '22' || fieldType === '23') {
        return false
      } else if (fieldType === '24' || fieldType === '25' || fieldType === '27' || fieldType === '28' || fieldType === '32') {
        return false
      } else if (fieldType === '35' || fieldType === '40') {
        return false
      } else {
        this.clearFields(["fieldDefault"])
        return true
      }
    },
    fieldDecimal () {
      let fieldType = this.form.fieldType
      if(fieldType === '8' || fieldType === '9' || fieldType === '11' || fieldType === '26' || fieldType === '29') {
        return true
      } else {
        return false
      }
    },
    // 字符集
    characterSet () {
      let fieldType = this.form.fieldType
      if(fieldType === '5' || fieldType === '10' || fieldType === '19' || fieldType === '22' || fieldType === '30') {
        return true
      } else if (fieldType === '32' || fieldType === '37' || fieldType === '39') {
        return true
      } else {
        this.clearFields(["characterSet"])
        return false
      }
    },
    // 根据当前时间更新
    isUpdateTimestamp () {
      let fieldType = this.form.fieldType
      if(fieldType === '34') {
        return true
      } else {
        this.clearFields(["isUpdateTimestamp"])
        return false
      }
    },
  },
  watch: {
    "form.fieldType" () {
      this.openCount += 1
    },
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
      this.$nextTick(()=>{
        this.$refs['dialog'].open()
      })
    },
    close () {
      this.$refs['dialog'].close()
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
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
