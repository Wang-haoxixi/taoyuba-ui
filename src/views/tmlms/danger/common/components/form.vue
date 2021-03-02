<template>
  <div>
    <basic-container>
      <!-- <page-info v-model="form"></page-info> -->
      <div class="content-wrapper">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
          <div class="title">船员配置</div>
          <div class="sub-title">驾驶职务船员最低配员标准</div>
          <div class="item-title">{{driveStandardTitle}}</div>
          <u-row gutter="16">
			      <u-col span="12">
              <el-form-item label="排查要点" prop="driveStandardResult">
                <el-input v-model="form.driveStandardResult"></el-input>
              </el-form-item>
            </u-col>
            <u-col span="12">
              <el-form-item label="照片" prop="driveStandardImage">
                <el-input v-model="form.driveStandardImage"></el-input>
              </el-form-item>
            </u-col>
          </u-row>
          <div class="title">船员配置</div>
          <div class="sub-title">轮机职务船员最低配员标准</div>
          <div class="item-title">{{turbineStandardTitle}}</div>
          <u-row gutter="16">
			      <u-col span="12">
              <el-form-item label="排查要点" prop="turbineStandardResult">
                <el-input v-model="form.turbineStandardResult"></el-input>
              </el-form-item>
            </u-col>
            <u-col span="12">
              <el-form-item label="照片" prop="turbineStandardImage">
                <el-input v-model="form.turbineStandardImage"></el-input>
              </el-form-item>
            </u-col>
          </u-row>
        </el-form>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getPageById } from '@/api/tmlms/danger'
// import pageInfo from './info'
import formMixin from './form.js'
export default {
  mixins: [formMixin],
  components: {
    // pageInfo,
  },
  data () {
    return {
      form: {},
      historyData: {},
      rules: {},
    }
  },
  methods: {
    getList (id) {
      if (id) {
        getPageById(id).then(({ data }) => {
          if (data.code === 0) {
            this.form = data.data
          }
        })
      }
    },
    getHistoryData (id) {
      if (id) {
        getPageById(id).then(({ data }) => {
          if (data.code === 0) {
            this.historyData = data.data
          }
        })
      }
    },
  },
}
</script>
<style scoped lang="scss"></style>