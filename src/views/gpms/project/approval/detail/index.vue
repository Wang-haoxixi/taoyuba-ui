<template>
  <div class="abs">
    
    <div class="plate">
      <div class="head">
        <p class="title">基本信息</p>
      </div>
      <div class="content">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="12" class="item" v-for="(item, index) in formList" :key="index">
              <el-form-item :label="item.label" v-if="item.type === 'dict'">
                {{getDictMap(form[item.value], dictMap[item.value])}}
              </el-form-item>
              <el-form-item :label="item.label" v-else-if="item.type === 'tag'">
                <el-tag type='info' v-for="(item, index) in form[item.value]" :key="index">{{item}}</el-tag>
              </el-form-item>
              <el-form-item :label="item.label" v-else>{{form[item.value]}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <teamPage :form="form"></teamPage>

    
  </div>
</template>

<script>
import { normyList, formList, dictMap } from './option.js'
import teamPage from './team'

export default {
  name: 'index',
  components: { teamPage },
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  data (){
    return {
      summaryList: normyList,
      list2: normyList,
      formList,
      dictMap,
    }
  },
  methods :{
    getDictMap (value, list) {
      for (let item of list) {
        if (item.value == value) {
          return item.label
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.abs {
  padding-left: 20px;
}
.plate {
  border: 1px solid #eee;
  padding: 20px 15px;
  margin-bottom: 20px;
  .head {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    height: 47px;
    .title {
      font-size: 18px;
      margin: 0;
    }
    .button {
      padding-bottom: 10px;
      .el-button {
        margin-right: 10px;
      }
      i {
        font-size: 16px !important;
      }
    }
  }
  .content {
    padding: 15px 0;
    .item {
      height: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>