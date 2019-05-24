<template>
  <div class="info">
    <div class="info-block line">
      <h3 class="title">基本信息</h3>
      <div class="base">
        <el-row>
          <el-col :span=12 class="item">
            <div class="label">单位网址：</div>
            <div class="value">{{formData.companyUrl}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">联系地址：</div>
            <div class="value">{{formData.contractAddress}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">业务类型：</div>
            <div class="value customer" v-for="(item,index) in formData.businessTypeKey" :key="index">{{item.commonName}}</div>
            <div>{{formData.specificBusinessType}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">单位职能：</div>
            <div class="value">{{formData.companyFunction}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">区域类型：</div>
            <div class="value">{{formData.districtTypeName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">客户类型：</div>
            <div class="value customer" v-for="(item,index) in formData.clientTypeKey" :key="index">{{item.commonName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">客户关系：</div>
            <div class="value">{{formData.clientRelaName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">其他说明：</div>
            <div class="value">{{formData.otherDesc}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="other">
        <div class="item">
          <div class="label">合作项目：</div>
          <div class="value">
            <div class="dot" v-for="(item, index) in formData.collaborations" :key="index">{{item.name}}<span>（合同金额：{{item.money}}）</span></div>
          </div>
        </div>
        <div class="item">
          <div class="label">客户标签：</div>
          <div class="value">
            <!-- <el-tag type="info" class="tag-dot" v-for="(item,index) in formData.tags" :key="index">{{item.commonName}}</el-tag> -->
            <iep-tag-detail v-model="formData.tagsName"></iep-tag-detail>
          </div>
        </div>
        <div class="item">
          <div class="label">相关产品：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.products" :key="index">{{item}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">相关方案：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.programs" :key="index">{{item.commonName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">相似客户：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.similarClient" :key="index">{{item.commonName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">项目合作伙伴：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.partners" :key="index">{{item}}<span>（市场经理：{{item.marketManager}}）</span></div>
          </div>
        </div>
        <div class="item">
          <div class="label">市场经理：</div>
          <div class="value">
            <div class="dot">{{formData.marketManagerName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">协作人：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.collaborations" :key="index">{{item.commonName}}</div>
          </div>
        </div>
        <!-- <div class="item">
          <div class="label">转移状态：</div>
          <div class="value">
            <div class="dot">{{formData.transferFlagName}}</div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="info-block">
      <h3 class="title">系统信息</h3>
      <div class="other">
        <el-row>
          <el-col :span=12 class="item">
            <div class="label">发布人：</div>
            <div class="value">{{formData.creatorName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">负责部门：</div>
            <div class="value">{{formData.deptName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前市场经理：</div>
            <div class="value">{{formData.preMarketManagerName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前所属部门：</div>
            <div class="value">{{formData.preDeptName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">创建时间：</div>
            <div class="value">{{formData.createTime}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">更新于：</div>
            <div class="value">{{formData.updateTime}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      tagsName: [],
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => { },
    },
  },
}
</script>

<style lang="scss" scoped>
.info {
  .line {
    border-bottom: 1px solid #e4e7ed;
  }
  .info-block {
    .title {
      font-size: 16px;
      margin: 10px 0;
    }
    .base {
      background-color: #f9f9f9;
      padding: 10px 20px;
    }
    .other {
      padding: 10px 20px;
    }
    .item {
      margin-bottom: 15px;
      div {
        display: inline-block;
      }
      .dot {
        border-right: 1px solid #999;
        padding: 0 10px;
      }
      .tag-dot {
        margin-left: 10px;
      }
      .dot:last-child {
        border: 0;
      }
    }
  }
}
.customer {
  margin-right: 10px;
}
.value {
  word-break: break-all;
}
</style>
