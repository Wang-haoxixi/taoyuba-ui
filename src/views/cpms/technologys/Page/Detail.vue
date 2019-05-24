<template>
  <div>
    <basic-container>
      <iep-page-header is-advance :backOption="backOption">
        <template slot="custom">
          <el-row>
            <el-col :span="4" class="img">
              <iep-img :src="form.imageUrl" alt=""></iep-img>
            </el-col>
            <el-col :span="14" class="title">
              <div>
                <div class="tags">
                  <span class="weight">{{form.name}}</span>
                </div>
                <div class="tags">
                  <iep-tag-detail :value="form.tagKeywords"></iep-tag-detail>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </iep-page-header>
      <iep-tab-scroll :tab-list="tabList" :height="270">
        <div>
          <div class="base" :id="item.value" v-for="item in tabList" :key="item.value">
            <div class="title">{{item.label}}</div>
            <div class="context">
              <component :form="form" :is="item.value"></component>
            </div>
          </div>
        </div>
      </iep-tab-scroll>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import BaseInfo from './BaseInfo'
import TeamInfo from './TeamInfo'
import Modules from '@/views/cpms/Components/Modules'
import Technologys from '@/views/cpms/Components/Technologys'
import Materials from '@/views/cpms/Components/Materials'
import { initForm, dictsMap } from '../options'
import { getTechnologyById } from '@/api/cpms/technology'
export default {
  name: 'detail',
  components: { BaseInfo, TeamInfo, Modules, Technologys, Materials },
  mixins: [mixins],
  props: ['record'],
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      form: initForm(),
      tabList: [{
        label: '基本信息',
        value: 'BaseInfo',
      }, {
        label: '团队信息',
        value: 'TeamInfo',
      }, {
        label: '应用模块',
        value: 'Modules',
      }, {
        label: '相关技术',
        value: 'Technologys',
      }, {
        label: '相关材料',
        value: 'Materials',
      }],
    }
  },
  computed: {
    id () {
      return this.$route.params.id || this.record.id
    },
  },
  created () {
    getTechnologyById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
    })
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>

<style lang="scss" scoped>
.img {
  width: 80px;
  height: 80px;
  padding: 5px;
  border: 1px solid #eee;
  margin: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}
.title {
  margin-left: 10px;
  display: flex;
  height: 80px;
  align-items: center;
  .weight {
    font-size: 22px;
    font-weight: 600;
    margin-right: 10px;
  }
  .tags {
    margin: 10px 0;
  }
}

.base {
  border-bottom: 1px solid #eee;
  .title {
    padding: 20px 20px 0 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .context {
    padding: 20px 40px;
  }
}
.el-form {
  margin: 0;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
