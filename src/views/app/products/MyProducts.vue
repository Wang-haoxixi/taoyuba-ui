<template>
  <div class="my-products">
    <div class="title">我的产品<span>（{{num[0]}}）</span></div>
    <div class="products-btn">
      <el-button size="small">产品官网</el-button>
      <el-button size="small">代理政策</el-button>
      <el-button size="small">我要代理</el-button>
      <el-button size="small">申请技术服务</el-button>
      <el-button size="small">联合开发</el-button>
    </div>
    <div class="deletion-box">
      <div class="codule-deletion">
        按分类：
        <div :class="moduleType==''?'color':''" class="piece-deletion" @click="tabModuleType('')">全部</div>
        <div v-for="(item) in cpmsModuleType" :key="item.value" :class="moduleType==item.value?'color':''" class="piece-deletion" @click="tabModuleType(item.value)">{{item.label}}</div>
      </div>
      <div class="products-deletion">
        按产品：
        <div v-for="(item) in productList" :key="item.id" :class="productId==item.id?'color':''" class="piece-deletion" @click="tabProductId(item.id)">{{item.name}}</div>
      </div>
    </div>
    <iep-no-data v-if="!moduleList.length"></iep-no-data>
    <div class="my-products-box">
      <el-card shadow="never" v-for="(item) in moduleList" :key="item.id" class="module-list">
        <iep-img :src="item.imageUrl" style="width: 100px;height:100px;"></iep-img>
        <hr>
        <span class="name">{{item.name}}</span>
        <p class="desc">{{item.synopsis}}</p>
        <RouterLink class="inline change" :to="`/app/module_details/${item.id}`">详情介绍>
        </RouterLink>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getProductList } from '@/api/app/cpms/product'
import { getModuleList } from '@/api/app/cpms/module'
export default {
  data () {
    return {
      moduleType: '',
      productId: 0,
      num: [18],
      productList: [],
      moduleList: [],
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    cpmsModuleType () {
      return this.dictGroup['cpms_module_type']
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      this.loadProductList()
      this.loadModuleList()
    },
    async loadModuleList () {
      const { data } = await getModuleList({
        type: this.moduleType,
        productId: this.productId || undefined,
      })
      const moduleList = data.data
      this.moduleList = moduleList.slice(0, 8)
    },
    async loadProductList () {
      const { data } = await getProductList()
      const productList = data.data
      productList.unshift({
        id: 0,
        name: '全部',
      })
      this.productList = productList.slice(0, 4)
    },
    tabModuleType (val) {
      this.moduleType = val
      this.loadModuleList()
    },
    tabProductId (val) {
      this.productId = val
      this.loadModuleList()
    },
  },
}
</script>
<style lang="scss" scoped>
.my-products {
  grid-column-start: 1;
  grid-column-end: 4;
  text-align: center;
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #333;
    span {
      font-size: 14px;
      color: #999;
    }
  }
  .products-btn {
    width: 100%;
  }
  .codule-deletion,
  .products-deletion {
    width: 50%;
    float: left;
    text-align: left;
    margin: 20px 0;
    .piece-deletion {
      display: inline;
      padding: 2px 10px;
      border-radius: 12px;
      border: 1px solid #ffffff;
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        background-color: #fef6f4;
        border: 1px solid #dc8687;
        color: #dc8687;
      }
    }
    .color {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .my-products-box {
    width: 100%;
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns:
      minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)
      minmax(100px, 1fr);
    .module-list {
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #fafafa;
      }
      .iconfont {
        font-size: 46px;
        color: #999;
        display: block;
      }
      hr {
        margin: 20px 0 10px;
      }
      .name {
        font-size: 16px;
        color: #333;
        line-height: 55px;
      }
      .desc {
        line-height: 22px;
        height: 44px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .change {
        padding: 4px 20px;
        border-radius: 3px;
        font-size: 14px;
        text-align: center;
        color: #cb3737;
        margin-left: 10px;
        border: 1px solid #cb3737;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        &:focus,
        &:hover {
          cursor: pointer;
          background-color: #cb3737;
          color: #fff;
          outline: none;
        }
      }
    }
  }
}
</style>
