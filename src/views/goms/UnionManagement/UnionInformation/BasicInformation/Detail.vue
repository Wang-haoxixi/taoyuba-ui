<template>
  <div>
    <basic-container>
      <el-button style="float:right" class="modify" size="small" @click="handleEdit">修改</el-button>
      <div class="org-detail-wrapper">
        <div class="content">
          <div class="top">
            <div class="img-wrapper">
              <iep-img :src="form.logo" slot="cover"></iep-img>
            </div>
            <div class="info-wrapper">
              <div class="title">{{form.name}}{{form.subName}}</div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">创建人：</label>
                  <span class="value">{{form.creatorName}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">成立时间：</label>
                  <span class="value">{{form.establishTime}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">人员规模：</label>
                  <span class="value">{{form.scale}}</span>
                </div>
              </div>
              <div class="labs-con">
                <div class="data-lab" v-for="lab in labList" :key="lab.id">
                  <div class="count">{{lab.data}}</div>
                  <div class="labTitle"><span>{{lab.labTitle}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="introduction-details">
          <div class="tags-detail">
            <span class="details-title">{{subTitle1}}</span>
            <div class="tags-con">
              <span>卓越：</span>
              <span class="tags" v-for="item in tags" :key="item.id">
                {{item.tag}}
              </span>
            </div>
            <div class="tags-con">
              <span>专业：</span>
              <span class="tags" v-for="item2 in tags2" :key="item2.id">
                {{item2.tag}}
              </span>
            </div>
          </div>
          <div class="brief">
            <span class="details-title">{{subTitle2}}</span>
            <p class="con">{{con}}</p>
          </div>
          <div class="contact">
            <span class="details-title">{{subTitle3}}</span>
            <span class="con"><span>官网地址 ：{{website}}</span>
              <span>官方新浪微博：{{blog}}</span></span>
          </div>
          <framework></framework>
          <business-layout></business-layout>
          <div class="opex">
            <span class="details-title">{{subTitle4}}</span>
            <div class="con">
              <div class="opex-item" v-for="opex in opexList" :key="opex.id">
                <div class="img">
                  <span class="bgb">{{opex.name1}}</span><img :src="opex.img" alt=""></div>
                <span class="name">{{opex.name}}</span>
              </div>
            </div>
          </div>
          <div class="opex">
            <span class="details-title">{{subTitle5}}</span>
            <div class="con">
              <div class="opex-item" v-for="opex2 in opexList2" :key="opex2.id">
                <div class="img">
                  <span class="bgb">{{opex2.name1}}</span><img :src="opex2.img" alt=""></div>
                <span class="name">{{opex2.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getOrgBySelf, putOrg } from '@/api/goms/org'
import { initForm } from './options'
import Framework from './Framework'
import BusinessLayout from './BusinessLayout'
export default {
  components: { Framework, BusinessLayout },
  data () {
    return {
      form: initForm(),
      labList: [
        {
          data: '670',
          labTitle: '信用值',
        },
        {
          data: '1455',
          labTitle: '贡献',
        },
        {
          data: '5',
          labTitle: '综合排名',
        },
        {
          data: '19',
          labTitle: '业绩排名',
        },
      ],
      subTitle1: '联盟标签',
      subTitle2: '联盟简介',
      subTitle3: '联系方式',
      subTitle4: '联盟客服人员',
      subTitle5: '系统联络人员',
      opexList: [
        {
          img: require('./img/people1.png'),
          name1: '陈珊',
          name: '客服一',
        },
        {
          img: require('./img/people2.jpg'),
          name1: '邵佳欢',
          name: '客服二',
        },
        {
          img: require('./img/people3.jpg'),
          name1: '章佩瑜',
          name: '客服三',
        },
      ],
      opexList2: [
        {
          img: require('./img/people1.png'),
          name1: '邵佳欢',
          name: '业务产品',
        },
        {
          img: require('./img/people2.jpg'),
          name1: '章佩瑜',
          name: '技术支持',
        },
      ],
      tags: [
        {
          tag: '中高层任免',
        },
        {
          tag: '文化深化',
        },
        {
          tag: '组织架构',
        },
        {
          tag: '管理规范',
        },
        {
          tag: '战略合作',
        },
        {
          tag: '制度制定',
        },
        {
          tag: '战略设计与管理',
        },
        {
          tag: '股权设计',
        },
        {
          tag: '员工激励',
        },
        {
          tag: '种子培养',
        },
      ],
      tags2: [
        {
          tag: '数据能力',
        },
        {
          tag: '内部协作',
        },
        {
          tag: '内网建设',
        },
        {
          tag: '战略合作',
        },
        {
          tag: '资本运作',
        },
      ],
      con: '国脉集团是中国领先的大数据治理和数据服务专业机构。创新提出“软件+咨询+平台+数据+创新业务”五位一体的服务模型，拥有数据基因（DNA）和水巢（DIPS）两大系列几十项软件产品。',
      website: 'www.bing.com',
      blog: '@国脉研发中心',
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit () {
      this.$emit('onEdit', {
        formRequestFn: putOrg,
        row: this.form,
      })
    },
    loadPage () {
      getOrgBySelf(this.orgId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-wrapper {
  margin-left: 20px;
  .tag-item {
    margin-bottom: 10px;
  }
}
.org-detail-wrapper {
  margin: 0 20px;
  .labs-con {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    .count {
      font-size: 18px;
    }
    .data-lab {
      padding: 0 20px;
      border-right: 1px solid #eee;
      text-align: center;
      &:nth-child(1) {
        padding-left: 0;
      }
      &:last-child {
        border: 0;
      }
    }
  }
  .content {
    margin-bottom: 20px;
    .top {
      display: flex;
      .img-wrapper {
        width: 250px;
        height: 150px;
        border: 1px solid #eee;
        padding: 5px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .info-wrapper {
        margin-left: 20px;
        padding: 10px;
        .title {
          font-size: 18px;
        }
        .col {
          display: flex;
          font-size: 16px;
          .form-item-wrapper {
            padding: 10px 0;
            margin-right: 10px;
            font-size: 14px;
          }
        }
      }
    }
    .bottom {
      padding: 20px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
  }
}
.tags-detail,
.brief,
.contact,
.framework,
.business-layout,
.opex {
  margin-bottom: 30px;
}
.contact {
  .con {
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
  }
}

.tags-con {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.tags {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    color: #ba1b21;
  }
  &:nth-child(1) {
    padding-left: 0;
  }
  &::before {
    position: absolute;
    content: "";
    top: 10px;
    right: -7px;
    width: 15px;
    height: 1px;
    background-color: #666;
    transform: rotate(125deg);
    -o-transform: rotate(125deg);
    -moz-transform: rotate(125deg);
    -webkit-transform: rotate(125deg);
  }
  &:last-child::before {
    display: none;
  }
}
.opex {
  .con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .name {
      display: block;
      margin-top: 10px;
      padding: 2px 10px;
      font-size: 12px;
      border-radius: 10px;
      background-color: #eee;
    }
    .opex-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .img {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ebeef5;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .bgb {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 50px;
      font-size: 12px;
      text-align: center;
      display: block;
      border-radius: 50%;
      color: #fff;
      z-index: 100;
      opacity: 0;
      -webkit-transition: all 0.5s;
      transition: all 0.5s;
    }
    &:hover .bgb {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
}
</style>
<style scoped>
.introduction-details >>> .details-title {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
}
</style>