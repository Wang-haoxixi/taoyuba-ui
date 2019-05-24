<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="formData.clientName" :backOption="backOption"></page-header>
      <!-- <div class="head-button">
        <iep-button class="tabs" type="primary" size="small">暂无需求</iep-button>
        <iep-button class="tabs" type="primary" size="small" @click="transfer">转移给他人</iep-button>
        <iep-button class="tabs" type="primary" size="small" @click="handleUpdate">编辑</iep-button>
        <iep-button class="tabs" type="primary" size="small" @click="handleDelete">删除</iep-button>
      </div> -->
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='CustomerPanorama'" v-slot:CustomerPanorama>
          <customer-panorama :formData="formData" v-loading="activeTab !=='CustomerPanorama'"></customer-panorama>
        </template>
        <template v-if="activeTab ==='Contacts'" v-slot:Contacts>
          <contacts @load-page="loadPage" v-loading="activeTab !=='Contacts'" :record="record"></contacts>
        </template>
        <template v-if="activeTab ==='VisitingRecord'" v-slot:VisitingRecord>
          <visiting-record v-loading="activeTab !=='VisitingRecord'" :record="record" @load-page="loadPage"></visiting-record>
        </template>
        <template v-if="activeTab ==='Scheme'" v-slot:Scheme>
          <scheme v-loading="activeTab !=='Scheme'" :record="record" @load-page="loadPage"></scheme>
        </template>
        <template v-if="activeTab ==='Agreement'" v-slot:Agreement>
          <agreement v-loading="activeTab !=='Agreement'" :record="record" @load-page="loadPage"></agreement>
        </template>
        <template v-if="activeTab ==='Information'" v-slot:Information>
          <information v-loading="activeTab !=='Information'" @load-page="loadPage"></information>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import CustomerPanorama from './CustomerPanorama/'
import Contacts from './Contacts/'
import VisitingRecord from './VisitingRecord/'
import Scheme from './Scheme/'
import Agreement from './Agreement/'
import Information from './Information/'
import mixins from '@/mixins/mixins'
import { getCustomerById } from '@/api/crms/customer'
export default {
  // beforeRouteUpdate (to, from, next) {
  //   this.$nextTick(() => {
  //     this.loadPage()
  //   })
  //   next()
  // },
  name: 'detail',
  mixins: [mixins],
  components: { CustomerPanorama, Contacts, VisitingRecord, Scheme, Agreement, Information },
  data () {
    return {
      id: this.$route.params.id,
      record: {
        id: this.$route.params.id,
        type: this.$route.query.type,
        flag: this.$route.query.flag,
        collaborations: '',
      },
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      count: [],
      formData: {},
      tabList: [{
        label: '客户全景',
        value: 'CustomerPanorama',
      }, {
        label: '联系人',
        value: 'Contacts',
      }, {
        label: '拜访记录',
        value: 'VisitingRecord',
      }, {
        label: '方案',
        value: 'Scheme',
      }, {
        label: '合同',
        value: 'Agreement',
      }, {
        label: '资讯',
        value: 'Information',
      }],
      activeTab: 'CustomerPanorama',
      routerBack: false,
      formRequestFn: () => { },
    }
  },
  created () {
    this.loadPage()
    this.dealNum()
    this.getRouter()
    if (this.routerBack) {
      this.activeTab = 'Scheme'
    }
  },
  methods: {
    getRouter () {
      this.routerBack = this.$route.query.routerBack
    },
    dealNum () {
      // console.log(this.count)

    },
    loadPage () {
      getCustomerById(this.id).then(({ data }) => {
        this.count = []
        this.tabList = [{
          label: '客户全景',
          value: 'CustomerPanorama',
        }, {
          label: '联系人',
          value: 'Contacts',
        }, {
          label: '拜访记录',
          value: 'VisitingRecord',
        }, {
          label: '方案',
          value: 'Scheme',
        }, {
          label: '合同',
          value: 'Agreement',
        }, {
          label: '资讯',
          value: 'Information',
        }],
          this.formData = data.data
        this.record.collaborations = this.formData.collaborations
        this.record.clientName = this.formData.clientName
        if (this.formData.preMarketManagerName == '') {
          this.formData.preMarketManagerName = '暂无'
        }
        else if (this.formData.preDeptName == '') {
          this.formData.preDeptName = '暂无'
        }
        else if (!this.formData.hasOwnProperty('preMarketManagerName')) {
          this.formData.preMarketManagerName = '暂无'
        }
        else if (!this.formData.hasOwnProperty('preDeptName')) {
          this.formData.preDeptName = '暂无'
        }
        this.count.push(data.data.contactNumber, data.data.contactRecordNumber, data.data.programNumber, data.data.contractNumber, 0)
        for (var i = 1; i < this.tabList.length; i++) {
          this.tabList[i].label = this.tabList[i].label + '(' + this.count[i - 1] + ')'
        }

      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
  watch: {
    '$route': 'getRouter',
  },
}
</script>
<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    .department {
      font-weight: 600;
      font-size: 18px;
    }
    .back {
      height: 30px;
      float: right;
      margin-left: auto;
    }
  }
}
</style>