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
            <el-tag type="info" class="tag-dot" v-for="(item,index) in formData.tags" :key="index">{{item.commonName}}</el-tag>
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
        <div class="item">
          <div class="label">转移状态：</div>
          <div class="value">
            <div class="dot">{{formData.transferFlagName}}</div>
          </div>
        </div>
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
    <div class="info-block">
      <h3 class="title">联系人</h3>
      <el-card class="box-card" shadow="never"  v-for="(item,index) in linksList" :key="index">
        <div class="box-head">
          <span class="name">张三风</span>
          <span class="job">(市场经理)</span>
        </div>
        <div class="box-body">
          <div class="body-item">
            <span>电话：</span>
            <span>手机：</span>
            <span>传真：</span>
          </div>
          <div class="body-item">
            <span>QQ：</span>
            <span>微信：</span>
            <span>邮箱：</span>
          </div>
          <div class="body-item">
            <span>客户关注：</span>
          </div>
          <div class="body-item">
            <span>地址：</span>
          </div>
        </div>
      </el-card>
    </div>
    <visit></visit>
    <div>
      <el-collapse  v-model="activeNames">
        <el-collapse-item title="方案" name="1">
          <div class="programme">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="方案名称"
                width="700">
                <template slot-scope="scope">
                  <div style="width:600px;display:inline-block;">
                    <span class="title" style="margin-left: 10px">{{ scope.row.programme }}</span>
                    <div class="tags">
                      <span v-for="(item,index) in tagsList" :key="index">{{item}}</span>
                    </div>
                  </div>
                  <i class="icon-fujian"></i>
                </template>
              </el-table-column>
              <el-table-column
                label="上传时间">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.time }}</span>  
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="合同" name="2">
          <div class="contract">
             <el-table
              :data="tableData1"
              style="width: 100%">
              <el-table-column
                label="合同名称"
                width="400">
                <template slot-scope="scope">
                  <div style="width:350px;display:inline-block;">
                    <span class="title" style="margin-left: 10px">{{ scope.row.contract }}</span>
                    <div class="tags">
                      <span v-for="(item,index) in tagsList" :key="index">{{item}}</span>
                    </div>
                  </div>
                  <i class="icon-fujian"></i>
                </template>
              </el-table-column>
              <el-table-column
                label="业务类型">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.type }}</span>  
                </template>
              </el-table-column>
               <el-table-column
                label="合同金额">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.money }}</span>  
                </template>
              </el-table-column>
               <el-table-column
                label="合同状态">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.status }}</span>  
                </template>
              </el-table-column>
               <el-table-column
                label="回款率">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>  
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="资讯" name="3">
          <div class="information" v-for="(item,index) in informationList" :key="index">
            <p>这是xxxx的资讯</p>
            <span>资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要资讯摘要</span>
            <div class="tags">
              <i class="icon-shijian"></i>
              <span class="time"> 2019-02-19 </span> 
              <span>政务服务</span> 
              <span>网站测评</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Visit from './Visit'
export default {
  components:{
    Visit,
  },
  data () {
    return {
       tableData: [{
          programme: '20180412象山县电子政务办公室象山县政府网站及政务公开评测与咨询服务项目方案',
          time: '2016-05-02',
        }, {
          programme: '20180412象山县电子政务办公室象山县政府网站及政务公开评测与咨询服务项目方案',
          time: '2016-05-02',
        }],
        tableData1: [{
          contract: '20180412象山县电子政务办公室象山县政府网站及政务公开评测与咨询服务项目方案',
          type: '外包',
          money: '30000',
          status: '执行中',
          rate: '40%',
        }, {
          contract: '20180412象山县电子政务办公室象山县政府网站及政务公开评测与咨询服务项目方案',
          type: '外包',
          money: '30000',
          status: '执行中',
          rate: '40%',
        }],
      activeNames:['1'],
      linksList:[
        {},
        {},
        {},
      ],
      programmeList:[
        {},
        {},
      ],
      tagsList:['创业创新','浙江创业女杰','浙商'],
      informationList:[
        {},
        {},
        {},
      ],
      formData: {},
    }
  },
}
</script>

<style lang="scss" scoped>
.programme{
  .title{
    display: block;
    margin-bottom: 15px;
  }
  i{
    font-size: 20px!important;
    vertical-align: 17px;
    color:#999;
  }
  .tags{
    margin-left: 10px;
    span{
      padding: 5px 8px;
      margin-right: 8px;
      border: 1px solid #eee;
    }
  }
}
.contract{
  @extend .programme;
  i{
    vertical-align: 27px;
  }
}
.information{
  padding: 15px 10px;
  border-bottom: 1px solid #eee;
  p{
    margin-bottom:5px;
    font-size: 16px;
    color:#333;
  }
  &>span{
    display:block;
    margin-bottom:10px;
    color:#666;
    line-height: 28px;  
  }
  .tags{
    i{
      margin-right: 5px;
      font-size: 16px!important;
      vertical-align: -2px;
    }
    .time{
      padding:inherit;
      border: none;
    }
    span{
      margin-right:10px;
      padding: 5px 8px;
      border: 1px solid #eee;
      border-radius: 3px;
    }
  }
}
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
    .box-card{
      margin-bottom: 15px;
    }
    .box-head{
      .name{
        margin-right: 3px;
        color:#333;
      }
      .job{
        color: #999;
      }
    }
    .box-body{
      padding: 15px;
      line-height:28px;
      color:#666;
      .body-item:nth-child(1),
      .body-item:nth-child(2){
         span{
           display: inline-block;
           width: 33.3%;
           text-align: left;
         } 
      }
    }
  }
}
.customer {
  margin-right: 10px;
}
</style>
<style scoped>
.info>>>.el-collapse-item__header{
  padding: 0 10px;
  background-color: #f8f8f8;
}
.info>>>.el-collapse-item{
  margin-bottom: 15px;
}
</style>
