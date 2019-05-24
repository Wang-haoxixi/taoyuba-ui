<template>
  <div>
    
    <div class="plate">
      <div class="head">
        <p class="title">材料说明</p>
        <div class="button">
          <i class="icon-bianji" style="cursor: pointer;"></i>
        </div>
      </div>
      <div class="content">
        
      </div>
    </div>
    <div class="plate" v-for="(item, index) in list" :key="index">
      <div class="head">
        <p class="title">{{item.name}}</p>
        <div class="button">
          <iep-button size="small" type="primary"><i class="el-icon-plus"></i> 新增</iep-button>
          <iep-button size="small"><i class="icon-guanlian"></i> 关联</iep-button>
        </div>
      </div>
      <div class="content">
        <div v-if="item.materials.length">
          <div class="item" v-for="(t, i) in item.materials" :key="i">
            <i class="icon-guanlian"></i>{{t.materialName}} <i class="close el-icon-close"></i>
          </div>
        </div>
        <div v-else style="color: #999;">暂无数据</div>
      </div>
    </div>

  </div>
</template>

<script>
import { getMaterialList } from '@/api/gpms/material'

export default {
  name: 'index',
  props: {
    projectId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      list: [],
    }
  },
  methods :{
    loadList () {
      getMaterialList({id: this.projectId}).then(({data}) => {
        this.list = data.data
      })
    },
  },
  mounted () {
    this.loadList()
  },
}
</script>

<style lang="scss" scoped>
.plate {
  border: 1px solid #eee;
  padding: 20px 15px;
  margin-bottom: 20px;
  .head {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
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
      margin-bottom: 15px;
      i {
        margin-right: 10px;
      }
      .close {
        cursor: pointer;
      }
    }
  }
}
</style>