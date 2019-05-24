<template>
    <el-collapse v-model="activeNames" class="appraise">
      <el-collapse-item :title="appraise.time" :name="index" v-for="(appraise,index) in appraiseList" :key="index">
        <el-card shadow="never" v-for="(child, index2) in appraise.childList" :key="index2">
          <div class="conList">
            <div class="img"><img :src="child.img" alt=""></div>
            <div class="con">
              <h4>
                <span class="name">{{child.name}}</span>
                <span class="department">{{child.department}}</span>
                <span class="time">
                  {{child.subTime}}
                </span>
              </h4>
               <div>{{child.con}}</div>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
</template>
<script>
export default {
  data () {
    return {
      textarea: '',
      activeNames: [0,1],
      appraiseList: [
        {
          time: '2019年4月',
          childList: [
            {
              img:'//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png',
              name: '何益挺',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img:'//183.131.134.242:10060/upload/iep/201905/6057ea69-63e7-4d1e-8510-11f0db4823c4_25e933aa-0b77-48fe-a2f8-a893be7278ee_20181218194521_ixb20x5efq.jpg',
              name: '丁斌',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '121可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img:'//183.131.134.242:10060/upload/iep/201905/5cbd2176-0ef8-4636-9e0b-e1761a5802c2_自己.jpg',
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '11可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
          ],
        },
        {
          time: '2019年3月',
          childList: [
            {
              img:'//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png',
              name: '何益挺',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '122可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img:'//183.131.134.242:10060/upload/iep/201905/6057ea69-63e7-4d1e-8510-11f0db4823c4_25e933aa-0b77-48fe-a2f8-a893be7278ee_20181218194521_ixb20x5efq.jpg',
              name: '丁斌',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '2可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img:'//183.131.134.242:10060/upload/iep/201905/5cbd2176-0ef8-4636-9e0b-e1761a5802c2_自己.jpg',
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '1可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleClose () {
    },
    handleEdit () {
      this.show = !this.show
      this.itShow = !this.itShow
    },
  },
}
</script>
<style lang="scss" scoped>
.appraise {
  padding: 20px;
  .el-timeline {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    .shrink {
      position: absolute;
      top: 5px;
      left: 70px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .department,
  .subTime {
    margin-left: 5px;
    font-weight: 400;
    color: #999;
  }
  .subTime {
    flex: 2;
  }
  .conList {
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #ebeef5;
    .con {
      flex: 2;
      margin-left: 20px;
      h4 {
        align-items: center;
      }
    }
  }
  .input {
    textarea {
      border: 0;
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #333;
  }
  .time {
    float: right;
    color:#999;
  }
  .img {
    width: 60px;
    height: 60px;
    border: 1px solid #ebeef5;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .el-card {
    border: 0;
  }
}
</style>

<style scoped>
.appraise >>> .el-collapse-item__arrow{
  margin: 0 auto 0 8px;
}
.appraise>>>.el-collapse-item__content{
  padding-bottom: 0;
}
.appraise>>>.el-collapse-item__wrap{
  border-bottom: none;
}
.appraise >>> .el-upload-dragger{
  padding: 30px 100px 38px;
  width:inherit;
  height:inherit;
}
.appraise >>> .el-upload__text{
  line-height: 22px;
  color:#999;
}
.appraise >>> .el-collapse-item__header{
  font-size: 16px;
  color:#333;
}
</style>
