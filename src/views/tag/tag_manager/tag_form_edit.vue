<template>
  <gov-dialog
    ref="dialog"
    title="新增"
    @closed="handleClosed"
    @handleSubmit="handleSubmit"
    :is-btn-group="state!='detail'">
    <el-form :model="formData" class="form-inline" ref="form" :rules="rules" label-width="120px" size="small">
      <el-row :gutter="0">
        <el-col :span="12">
          <el-form-item label="标签名称：" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否审核：" class="formWidth">
            <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>

          <el-form-item label="是否启动：" class="formWidth">
            <el-switch v-model="formData.enable" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="标签级别名称：" class="formWidth">
        <el-select v-model="formData.levelId" clearable placeholder="请选择">
          <el-option v-for="item in levelNameOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签分类：" class="formWidth">
        <!-- <el-cascader v-model="formData.typeIds" :options="typeOptions" :props="typeProps" change-on-select></el-cascader> -->
        <tag-type-list v-model="formData.typeIds" :type-options="typeOptions" :type-list="typeNameOpts" :common-vo="formData.typeObjs"></tag-type-list>
      </el-form-item>

      <el-form-item v-if="tagFunction.tagRelation" label="关联标签：" prop="tagList">
        <mutiply-tag-select v-model="formData.tagList" :selectObjs="formData.tagsList"></mutiply-tag-select>
      </el-form-item>

      <el-form-item v-if="tagFunction.tagNotes" label="标签注释：">
        <el-input type="textarea" v-model="formData.description"></el-input>
      </el-form-item>

      <el-form-item v-if="tagFunction.tagNotes">
        <el-button type="primary" @click="handleEditTagDesc">修改标签注释</el-button>
      </el-form-item>

      <el-form-item label="标签优先级：" class="formWidth">
        <el-input-number v-model="formData.orderNum" :min="1" :max="9"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="handleBack">返回</el-button>
      </el-form-item>

      <el-form-item label="其他信息">
        <hr>
      </el-form-item>

      <el-col :span="12">
        <el-form-item label="引用次数：" class="formWidth">
          <label>{{formData.refers}}</label>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="更新时间：" class="formWidth">
          <label>{{formData.updateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</label>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="点击量：" class="formWidth">
          <label>{{formData.views}}</label>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="来源：" class="formWidth">
          <label>{{formData.system}}</label>
        </el-form-item>
      </el-col>

      <el-form-item label="标签合并：">
        <el-tag v-for="tag in mergeTag" size="medium" :key="tag.commonId">{{tag.commonName}}</el-tag>
      </el-form-item>

      <el-form-item label="标签归入：">
        <el-tag v-for="tag in includeTag" size="medium" :key="tag.commonId">{{tag.commonName}}</el-tag>
      </el-form-item>

      <el-form-item label="修改记录">
        <hr>
      </el-form-item>

      <li class="record-list" v-for="item in recordList" :key="item.createTime">
        <span>{{item.creatorRealName}}</span>
        <span>{{item.createTime | dateFormatLL}}</span>
        <span>{{item.description}}</span>
      </li>

      <el-form-item>
        <el-button v-if="showExpandBtn" type="primary" @click="handleExpand">展开</el-button>
      </el-form-item>
      <form-dialog :dialogShow="editDescDialogShow" title="标签注释管理" @close="editDescDialogShow=false" :isNeedConfirm="false" width="80%">
        <tag-desc :tag-id="formData.tagId"></tag-desc>
      </form-dialog>
    </el-form>
  </gov-dialog>
</template>

<script>
import { putTag } from '@/api/tms/tag'
import { getTagTypeParents } from '@/api/tms/tag-type'
import { getRecordMap, getRecordList } from '@/api/tms/record'
import dialogMixins from '@/mixins/dialog_mixins'
import { validTagName } from '@/api/tms/tag'
import tagDesc from './tag_desc'
import MutiplyTagSelect from '@/components/mutiply-tag-select'
import tagTypeList from './tag_type_list'

export default {
  mixins: [dialogMixins],
  props: ['formData', 'levelNameOpts', 'typeNameOpts', 'tagFunction'],
  components: { MutiplyTagSelect, tagDesc, tagTypeList },
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标签名称不能为空'))
      }
      if (this.beforeName !== value) {
          validTagName(value).then(res => {
          if (!res.data.data) {
            callback(new Error('标签名称重复，已存在。'))
          } else {
            callback()
          }
        })
      } else {
        return callback()
      }
    }
    return {
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
      },
      typeProps: {
        value: 'typeId',
        label: 'name',
      },
      showExpandBtn: true,
      editDescDialogShow: false,
      typeOptions: [],
      includeTag: [],
      mergeTag: [],
      recordList: [],
      beforeName: '',
    }
  },
  created () {
    this.load()
  },
  methods: {
    handleEditTagDesc () {
      this.editDescDialogShow = true
    },
    handleExpand () {
      getRecordList(this.formData.tagId, null).then(res => {
        this.recordList = res.data
        this.showExpandBtn = false
      })
    },
    // 获取详情数据
    loadMapAndlist () {
      getRecordMap(this.formData.tagId).then(res => {
        this.includeTag = res.data.include
        this.mergeTag = res.data.merge
      })
      getRecordList(this.formData.tagId).then(res => {
        this.recordList = res.data
      })
    },
    open () {
      this.$refs['dialog'].open()
      this.$nextTick(() => {
        this.loadMapAndlist()
        this.beforeName = this.formData.name
      })
      this.showExpandBtn = true
    },
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
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          putTag(this.formData).then(() => {
            this.$refs['dialog'].close()
            this.$emit('hideDialog', false)
          })
        }
      })
    },
    handleClosed () {
      this.$refs.form.resetFields()
      this.$set(this.formData, 'typeObjs', [])
    },
    handleBack () {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.form-inline {
  hr {
    margin-top: 16px;
  }
  .record-list {
    margin-left: 100px;
    line-height: 30px;
    span {
      margin-right: 10px;
    }
  }
}
</style>
