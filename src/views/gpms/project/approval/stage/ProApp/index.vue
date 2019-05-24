<template>
  <div>
    <!-- 审批信息 -->
    <div class="contianBox">
      <el-row class="title">
        <el-col :span="24" class="data">审批信息</el-col>
      </el-row>
      <el-row class="topBot">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="12" class="item" v-for="(item, index) in infoList" :key="index">
              <el-form-item :label="item.label" v-if="item.type === 'dict'">
                {{getDictMap(setUpData[item.value], dictMap[item.value])}}
              </el-form-item>
              <el-form-item :label="item.label" v-else>{{setUpData[item.value]}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="footer" v-if="setUpData.approvalStatus == 1">
          <iep-button type="danger" @click="sumbit">提交</iep-button>
        </div>
      </el-row>
    </div>
    <!-- 立项信息 -->
    <div class="contianBox">
      <el-row class="title">
        <el-col :span="20" class="data">立项信息</el-col>
        <el-col class="edit"><i class="icon-bianji"></i></el-col>
      </el-row>
      <el-row class="topBot">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="12" class="item" v-for="(item, index) in setUpList" :key="index">
              <el-form-item :label="item.label" v-if="item.type === 'dict'">
                {{getDictMap(setUpData[item.value], dictMap[item.value])}}
              </el-form-item>
              <el-form-item :label="item.label" v-else-if="item.type === 'tag'">
                <el-tag type='info' v-for="(item, index) in setUpData[item.value]" :key="index">{{item}}</el-tag>
              </el-form-item>
              <el-form-item :label="item.label" v-else>{{setUpData[item.value]}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        
      </el-row>
    </div>
    <!-- 立项申请 -->
    <transfer-dialog ref="form" @close="submitSuccess"></transfer-dialog>
  </div>
</template>

<script>
import TransferDialog from './TransferDialog'
import { infoList, setUpList, getDictMap, dictMap } from './option'

export default {
  components: { TransferDialog },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    setUpData () {
      let formData = this.form
      return formData
    },
  },
  data () {
    return {
      infoList,
      setUpList,
      dictMap,
    }
  },
  methods:{
    sumbit () {
      this.$refs['form'].open(this.form)
    },
    submitSuccess () {
      this.$emit('submitSuccess', true)
    },
    getDictMap,
  },
}
</script>

<style lang="scss" scoped>
.contianBox {
  .title {
    background-color: #f5f5f5;
    border-radius: 5px;
    .data {
      padding: 10px 15px;
    }
    .edit {
      float: right;
      right: 0;
      width: 30px;
      line-height: 40px;
      cursor: pointer;
    }
  }
  .topBot {
    margin: 20px 0 30px;
    .el-tag {
      margin-right: 10px;
    }
  }
  .item {
    height: 30px;
    margin-bottom: 10px;
  }
  .footer {
    margin: 20px 0 0 60px;
  }
}
</style>