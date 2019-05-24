<template>
  <el-row class="Firsttable" :gutter="20" style="margin:10px 0 0;">
    <el-col class="padclear" :span="12" style="padding:0;">
      <div class="firstbox">
        <p class="borbom sixsix">推荐学习的部门</p>
        <div style="width:100%;height:240px;overflow:auto;">
          <div class="Studys">
            <el-row>
              <el-col class="mbs">
                <p class="sixsix">上海国脉互联知政信息咨询有限公司</p>
                <el-col class="smallfont" :span='24'>
                  <el-col :span='4' class="mb">班长：张三</el-col>
                  <el-col :span='20'>
                    部门标签：
                    <el-button class="btns">数据基因</el-button>
                    <el-button class="btns">营商环境</el-button>
                    <el-button class="btns">规划咨询</el-button>
                    <el-button class="btns">DIPS</el-button>
                    <el-button class="btns">产品设计</el-button>
                    <el-button class="btns">规划与咨询</el-button>
                  </el-col>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div class="Studys">
            <el-row>
              <el-col class="mbs">
                <p class="sixsix">上海国脉互联知政信息咨询有限公司</p>
                <el-col class="smallfont" :span='24'>
                  <el-col :span='4' class="mb">班长：张三</el-col>
                  <el-col :span='20'>
                    部门标签：
                    <el-button class="btns">数据基因</el-button>
                    <el-button class="btns">营商环境</el-button>
                    <el-button class="btns">规划咨询</el-button>
                    <el-button class="btns">DIPS</el-button>
                    <el-button class="btns">产品设计</el-button>
                    <el-button class="btns">规划与咨询</el-button>
                  </el-col>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div class="Studys">
            <el-row>
              <el-col class="mbs">
                <p class="sixsix">上海国脉互联知政信息咨询有限公司</p>
                <el-col class="smallfont" :span='24'>
                  <el-col :span='4' class="mb">班长：张三</el-col>
                  <el-col :span='20'>
                    部门标签：
                    <el-button class="btns">数据基因</el-button>
                    <el-button class="btns">营商环境</el-button>
                    <el-button class="btns">规划咨询</el-button>
                    <el-button class="btns">DIPS</el-button>
                    <el-button class="btns">产品设计</el-button>
                    <el-button class="btns">规划与咨询</el-button>
                  </el-col>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="padclear" :span="12" style="padding-right:0;">
      <div class="firstbox" style="padding-bottom:3px;">
        <p class="borboms sixsix">推荐请教的国脉人</p>
        <div class="Recommend" style="width:100%;height:240px;overflow:auto;">
          <el-row :gutter="20">
            <el-col :span="12" class="clemr" v-for="(item,index) in boss" :key="index">
              <!-- https://ioa.govmade.com/uploads/2/image/public/201812/20181228133004_x5eaosqf7y.png -->
              <img class="imgs" :src="item.url" alt="未加载">
              <div class="offdiv">
                <p class="bigfon sixsix">{{item.name}}</p>
                <p class="coles">{{item.company}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getDepartmentList } from '@/api/gpms/recommend'

export default {
  data () {
    return {
      boss:[
        {
          id:1,
          url:'https://ioa.govmade.com/uploads/2/image/public/201806/20180613132622_36g2wcsum1.jpg',
          name:'杨冰之',
          company:'北京国脉互联信息顾问有限公司',
        },
        {
          id:2,
          url:'https://ioa.govmade.com/uploads/2/image/public/201806/20180613132726_f73x92rxqx.jpg',
          name:'郑爱军',
          company:'北京仓颉数源网络有限公司',
        },
        {
          id:3,
          url:'https://ioa.govmade.com/uploads/2/image/public/201807/20180711133414_5p2xxp0oft.png',
          name:'李凯',
          company:'北京区业务一部',
        },
        {
          id:4,
          url:'https://ioa.govmade.com/uploads/2/image/public/201806/20180613133008_elbcrpj4uh.jpg',
          name:'黄磊',
          company:'北京仓颉数源网络有限公司',
        },
        {
          id:5,
          url:'https://ioa.govmade.com/uploads/2/image/public/201807/20180713091722_f1hj7qt0to.png',
          name:'谢海燕',
          company:'北京国脉互联信息顾问有限公司',
        },
        {
          id:6,
          url:'https://ioa.govmade.com/uploads/2/image/public/201804/20180412223734_afni46vbiw.jpg',
          name:'王路燕',
          company:'北京国脉互联信息顾问有限公司',
        },
        {
          id:6,
          url:'https://ioa.govmade.com/uploads/2/image/public/201812/20181217181100_rj5ie4iop1.jpg',
          name:'刘佳',
          company:'北京国脉互联信息顾问有限公司',
        },
      ],
    }
  },
  methods: {
    getDepartment () {
      getDepartmentList().then(({data}) => {
        console.log('data: ', data)
      })
    },
  },
  created () {
    this.getDepartment()
  },
}
</script>

<style lang="scss" scoped>
.Firsttable{
  padding: 0 15px 10px 15px;
  box-sizing: border-box;
  .firstbox{
    border: 1px solid #f6f6f6;
    padding: 0 0 5px 0;
    overflow: hidden;
    height: 300px;
    .borbom{
      padding: 13px;
      margin: 0 auto;
      border-bottom: 1px solid #f6f6f6;
      font-size: 16px;
      position: relative;
      width: 92%;
      padding-left: 0;
      color: #444444;
    }
    
    .borboms{
      padding: 13px;
      margin: 0 auto;
      border-bottom: 1px solid #f6f6f6;
      font-size: 16px;
      position: relative;
      width: 92%;
      padding-left: 0;
      color: #444444;
    }
    .Recommend{
      width: 100%;
      padding: 14px 20px 0 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      // background-color: yellow;
      .clemr{
        margin-bottom: 18px;
      }
      p{
        margin: 0;
      }
      .imgs{
        width: 53px;
        height: 53px;
        display: inline-block;
        border-radius: 30px;
      }
      .offdiv{
        display: inline-block;
        vertical-align: top;
        font-size: 11px;
        padding-left: 10px;
        line-height: 25px;
        padding-top: 2px;
        .bigfon{
          font-size: 18px;
        }
      }
    }
    .Studys{
      width: 100%;
      // background-color: yellow;
      padding: 10px 10px 0 25px;
      box-sizing: border-box;
      .mbs{
        margin-bottom: 0;
      }
      p{
        margin: 0;
      }
      .smallfont{
        font-size: 12px;
        padding-top: 5px;
        margin-bottom: 0;
        color: #B8B8B8;
        .mb{
          margin: 0;
          line-height: 23px;
        }
      }
    }
  }
}
.btns{
  padding: 5px;
  margin: 0 0 0 5px;
  font-size: 12px;
  color: #B8B8B8;
}
.sixsix{
  color: #717276;
}
.coles{
  color: #B8B8B8;
}
</style>
