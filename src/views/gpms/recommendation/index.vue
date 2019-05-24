<template>
  <div>
    <basic-container>
      <div class="box">
        <operation-container class="clearmagin">
          <template slot="left">
            <p class="sixsix">我的推荐</p>
          </template>
        </operation-container>
        <el-row>
          <el-col :span="24" class="padLeft">
            <el-radio-group v-model="radio1" class="groupBottom">
              <span>我的项目是哪种类型：</span>
              <el-radio class="rads" :label="1">不限</el-radio>
              <el-radio class="rads" :label="2">咨询类</el-radio>
              <el-radio class="rads" :label="3">产品类</el-radio>
              <el-radio class="rads" :label="4">数据类</el-radio>
              <el-radio class="rads" :label="5">外包类</el-radio>
              <el-radio class="rads" :label="6">会议培训类</el-radio>
              <el-radio class="rads" :label="7">平台类</el-radio>
              <el-radio class="rads" :label="8">技术服务类</el-radio>
              <el-radio class="rads" :label="9">其他类</el-radio>
            </el-radio-group>
            <el-radio-group v-model="radio2" class="groupBottom">
              <span>我的项目有多少预算：</span>
              <el-radio class="rads" :label="1">不限</el-radio>
              <el-radio class="rads" :label="2">50万以下</el-radio>
              <el-radio class="rads" :label="3">50万（含）-100万（不含）以下</el-radio>
              <el-radio class="rads" :label="4">100万（含）-500万（不含）以下</el-radio>
              <el-radio class="rads" :label="5">500万（含）-1000万（不含）以下</el-radio>
              <el-radio class="rads" :label="6">1000万以上</el-radio>
            </el-radio-group>
            <!-- 标签组件 -->
            <el-col :span="24">
              <span>我的项目有什么标签：</span>
              <el-tag
                      :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)"
              >{{tag}}</el-tag>
              <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-col>
          </el-col>
        </el-row>
        <!-- 推荐学习的部门 -->
        <department></department>
        <!-- 推荐参考项目 -->
        <el-row class="Secondtab">
          <el-col class="SecondtBox" :span="24">
            <p class="borbomes">推荐参考的项目</p>
            <div class="Reference">
              <el-row>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="Secondtab">
          <el-col class="SecondtBox" :span='24'>
            <p class="borbomes">
              推荐参考的材料
              <span class="padL sixsix">
                <span class="postit" :class="{'grays':index==isgrays}" @click='handlebtnclick(index)' v-for="(item,index) in bt" :key='index'>{{item.name}}</span>
              </span>
            </p>
            <el-row class="posbox" style="padding-top:0;">
              <!-- <el-col :span='3'>
                <el-button class="postit" :class="{'grays':index==isgrays}" @click='handlebtnclick(index)' v-for="(item,index) in bt" :key='index'>{{item.name}}</el-button>
              </el-col> -->
              <el-col class="posmenu" :span='23'>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import department from './components/department'

export default {
  mixins: [mixins],
  components: { department },
  data () {
    return {
      radio1: 1,
      radio2: 1,
      // 标签组件
      dynamicTags: ['互联网+政务服务'],
      inputVisible: false,
      inputValue: '',
      bt:[
        {name:'方案'},
        {name:'报告 · 清单'},
        {name:'制度 · 规范 · 领导讲话'},
        {name:'说明书 · 白皮书 · 模板'},
        {name:'招投标 · 专利 · 软著'},
        {name:'培训材料'},
      ],
      isgrays:0,
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
  created () {},
  methods: {
    // 标签组件
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 按钮点击
    handlebtnclick (index){
      this.isgrays = index
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #fff;
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
  .el-row{
    margin-top: 10px;
  }
  .clearmagin {
    margin: auto 0;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
    p {
      font-size: 18px;
      color: #404040;
    }
  }
  .padLeft {
    padding-left: 25px;
    color: #717276;
  }
  .groupBottom {
    margin-bottom: 30px;
  }
  .groupBottom span {
    font-size: 14px;
    
  }
}
// 标签组件
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.Secondtab{
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
  .SecondtBox{
    border: 1px solid #f6f6f6;
    position: relative;
    padding-bottom: 10px; 
    .borbomes{
      padding: 15px;
      margin: 0 auto;
      border-bottom: 1px solid #f6f6f6;
      font-size: 16px;
      position: relative;
      width: 96%;
      padding-left: 0;
    }
    .Reference{
      width: 100%;
      .Referencetit{
        padding: 10px 0 0 25px;
        box-sizing: border-box;
        p{
          margin: 0;
        }
        .smallfonts{
          font-size: 12px;
          padding-top: 5px;
          margin-bottom: 0;
          color: #B8B8B8;
        }
        .mbs{
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
.posbox{
  padding: 10px 10px 5px 10px;
}
.postit{
  cursor: pointer;
}
.postit::after{
  content: ' / '
}
.posmenu{
  // border: 1px solid #ccc;
  height: 325px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  // padding-right: 15px;
}
.mbss{
  margin: 0;
  line-height: 23px;
}
.smallfontss{
  font-size: 12px;
  padding-top: 5px;
  margin-bottom: 0;
  color: #B8B8B8;
}
.Referencetits{
  padding: 10px 0 0 20px;
  box-sizing: border-box;
}
.Referencetits p{
  margin: 0;
}
.grays{
  // background-color: #E4E4E4;
  color:#BA1B21;
}
.sixsix{
  color: #717276;
}
.padL{
  padding-left: 30px;
}
.coles{
  color: #B8B8B8;
}
.rads{
  color: #717276;
}
</style>


