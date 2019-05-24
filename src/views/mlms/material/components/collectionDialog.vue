<template>
  <iep-dialog :dialog-show="dialogShow" title="收藏至" width="40%" @close="resetForm">
    
    <!-- <el-radio-group v-model="formData.collectionId">
      <el-radio v-for="(item, index) in list" :key="index" :label="item.value" class="radio">{{item.name}}</el-radio>
    </el-radio-group> -->
    <div class="tree-box">
      <div class="left box-item">
        <div v-if="list.length == 0" style="color: #999; margin: 10px;">暂无收藏夹，系统将默认创建收藏列表</div>
        <ul class="list" v-else>
          <li v-for="(item, index) in list" :key="index" @click="selectIndexFn(index, item)" :class="index==selectIndex?'select':''">{{item.name}}</li>
        </ul>
      </div>
      <div class="middle">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <div class="right box-item">
        <ul class="list" v-if="list[selectIndex]">
          <li v-for="(item, index) in list[selectIndex].childrens" :key="index" @click="()=>{selectItem=item.id}" :class="item.id==selectItem?'select':''">{{item.name}}</li>
        </ul>
      </div>
    </div>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { collectList } from '@/api/mlms/material/summary'

export default {
  components: {  },
  props: {
    type: {
      type: String,
      defalut: false,
    },
    requestFn: {
      type: Function,
      default: () => {},
    },
  },
  data () {
    return {
      selectIndex: 0,
      selectId: -1,
      selectItem: -1,
      dialogShow: false,
      list: [{childrens:[]}],
      formData: [],
    }
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    loadCollectList (list) {
      this.formData = list
      collectList().then((res) => {
        this.list = res.data.data
        this.selectIndex = 0
        this.selectId = this.list[this.selectIndex].id
      })
    },
    submitForm () {
      // if (this.selectItem == -1) {
      //   this.$message.error('请至少选择一项收藏项')
      //   return
      // }
      // 处理数据
      let list = []
      for (let item of this.formData) {
        let obj = {
          name: item.title === undefined ? item.name : item.title,
          type: this.type ? this.type : item.type,
          targetId: item.targetId ? item.targetId : item.id,
          collectionId: this.selectItem == -1 ? this.selectId : this.selectItem,
        }
        if (this.type === undefined) {
          obj.id = item.id
        }
        list.push(obj)
      }
      this.requestFn(list).then(() => {
        this.$message({
          message: '收藏成功',
          type: 'success',
        })
        this.$emit('load-page')
        this.dialogShow = false
      })
    },
    selectIndexFn (index, item) {
      this.selectId = item.id
      this.selectIndex = index
      this.selectItem = -1
    },
  },
}
</script>

<style lang="scss" scoped>
.tree-box {
  display: flex;
  margin-bottom: 25px;
  .left {
    margin: 0 10px 0 20px;
  }
  .right {
    margin: 0 20px 0 10px;
  }
  .box-item {
    border: 1px solid #ddd;
    flex: 1;
    margin: 0 10px 0 20px;
    min-height: 200px;
    .list {
      margin: 0;
      padding: 20px 30px;
      li {
        list-style: none;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .select {
        color: #bc1b20;
      }
    }
  }
  .middle {
    width: 100px;
    line-height: 200px;
    text-align: center;
    font-size: 26px;
  }
}
</style>
