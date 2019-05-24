<template>
  <gov-dialog
      ref="dialog"
      title="新增"
      @closed="handleClosed"
      @handleSubmit="handleSubmit"
      :is-btn-group="state!='detail'">
      <gov-layout-form>
        <el-form ref="form" :model="formData" class="form-inline" :rules="rules" label-width="120px" size="small">
          <el-form-item label="标签名称" prop="name">
            <el-input :maxlength="16" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item label="标签级别名称">
            <el-select v-model="formData.levelId" clearable placeholder="请选择">
              <el-option v-for="item in levelNameOpts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="标签分类">
            <!-- <el-cascader v-model="formData.typeIds" :options="typeOptions" :props="typeProps" change-on-select></el-cascader> -->
            <tag-type-list v-model="formData.typeIds" :type-options="typeOptions" :type-list="typeNameOpts" :common-vo="formData.typeObjs"></tag-type-list>
          </el-form-item>

          <el-form-item v-if="tagFunction.tagRelation" label="关联标签" prop="tagList">
            <mutiply-tag-select v-model="formData.tagList" :selectObjs="formData.tagsList"></mutiply-tag-select>
          </el-form-item>

          <el-form-item v-if="tagFunction.tagNotes" label="标签描述">
            <el-input type="textarea" v-model="formData.description"></el-input>
          </el-form-item>

          <el-form-item label="标签优先级" class="formWidth">
            <el-input-number v-model="formData.orderNum" :min="1" :max="9"></el-input-number>
          </el-form-item>

          <!-- <el-form-item class="text-right">
            <el-button type="primary" @click="handleSubmit" size="middle">保存</el-button>
          </el-form-item> -->
        </el-form>
      </gov-layout-form>
    </gov-dialog>
  
</template>

<script>
import { validTagName, postTag } from '@/api/tms/tag'
import { getTagTypeParents } from '@/api/tms/tag-type'
import MutiplyTagSelect from '@/components/mutiply-tag-select'
import tagTypeList from './tag_type_list'

export default {
  components: { MutiplyTagSelect, tagTypeList },
  props: ['formData', 'levelNameOpts', 'typeNameOpts', 'tagFunction'],
  data () {
    const name = this.formData.name
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标签名称不能为空'))
      }
      validTagName(value).then(res => {
        if (name !== value && !res.data.data) {
          callback(new Error('标签名称重复，已存在。'))
        } else {
          callback()
        }
      })
    }
    return {
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
      },
      typeProps: {
        value: 'typeId',
        label: 'name',
      },
      typeOptions: [],
    }
  },
  computed: {
  },
  methods: {
    load () {
      getTagTypeParents().then(res => {
        const typeOptions = res.data
        typeOptions.map(m => {
          if (!m.children.length) {
            delete m.children
          } else {
            m.children.map(mm => {
              if (!mm.children.length) {
                delete mm.children
              } else {
                mm.children.map(mmm => {
                  if (!mmm.children.length) {
                    delete mmm.children
                  } else {
                    mmm.children.map(mmmm => {
                      if (!mmmm.children.length) {
                        delete mmmm.children
                      }
                    })
                  }
                })
              }
            })
          }
        })
        this.typeOptions = typeOptions
      })
    },
    open () {
      this.$refs['dialog'].open()
    },
    handleClosed () {
      this.$refs.form.resetFields()
      this.$set(this.formData, 'typeObjs', [])
    },
    handleSubmit () {
      this.$refs['form'].validate(t=>{
        if(t) {
          this.formData.typeId = this.formData.typeIds.reverse()[0]
          postTag(this.formData).then(() => {
            this.$refs['dialog'].close()
            this.$emit('hideDialog', false)
          })
        } else {
          this.$message.error('请确认表单数据无误后提交')
          return false
        }
      })
    },
  },
  created () {
    this.load()
  },
}
</script>

