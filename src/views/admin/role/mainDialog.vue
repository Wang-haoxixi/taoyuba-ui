<template>
  <gov-dialog 
    ref="dialog" 
    @open="handleOpen"
    @closed="handleClosedDialog"
    title="编辑"
    isBtnGroup
    @handleSubmit="dialogSubmit">
    <layout-form>
      <div class="detail-wrapper">
        <el-form :model="form" :rules="rules" ref="rule" label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色标识" prop="roleCode">
            <el-input v-model="form.roleCode"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="roleDesc">
            <el-input v-model="form.roleDesc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptName">
            
          </el-form-item>
        </el-form>
      </div>
    </layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import {ruleOption} from './const'
export default {
  mixins: [mixin],
  data () {
    return {
      form: {
        id: '',
        roleName: '',
        roleCode: '',
        roleDesc: '',
        deptName: '',
        roleDeptId: '',
      },
      rule: ruleOption,
    }
  },
}
</script>
