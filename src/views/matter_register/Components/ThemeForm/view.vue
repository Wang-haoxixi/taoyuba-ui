<template>
  <div>
    <el-form :model="themeForm" class="form-inline" label-width="120px" size="small" :disabled="true">
      <el-form-item label="主题名称：" class="formWidth">
        <el-input v-model="themeForm.themeName"></el-input>
      </el-form-item>
      <el-form-item label="实施机构：" class="formWidth">
        <el-input v-model="deptName"></el-input>
      </el-form-item>
      <el-form-item label="主题类型：" class="formWidth">
        <el-input v-model="themeForm.type"></el-input>
      </el-form-item>
      <el-form-item label="牵头部门：" class="formWidth">
        <el-input v-model="themeForm.leadDeptName"></el-input>
      </el-form-item>
      <el-form-item label="办事结果：" class="formWidth" prop="serviceResult">
        <el-input v-model="themeForm.serviceResult"></el-input>
      </el-form-item>
      <el-table :data="themeForm.themeGuideList" style="width: 100%" border>
        <el-table-column prop="name" label="事项名称" align="center">
        </el-table-column>
        <el-table-column prop="encrp" label="事项编码" align="center">
        </el-table-column>
        <el-table-column prop="deptName" label="实施机构" align="center">
        </el-table-column>
        <el-table-column label="顺序" align="center">
          <template slot-scope="scope">
            <el-input-number size="mini" v-model.number="scope.row.guideWeight"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      themeForm: this.form,
    }
  },
  computed: {
    deptName () {
      let deptNames = this.themeForm.themeGuideList.map((e) => e.deptName)
      deptNames = _.uniqWith(deptNames, _.isEqual)
      return deptNames.join('，')
    },
  },
}
</script>
