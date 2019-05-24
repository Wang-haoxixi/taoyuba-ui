<template>
  <div>
    <basic-container>
      <page-header title="组织基本信息">
        <template>
          <el-button class="modify" size="small" @click="handleEdit">修改</el-button>
        </template>
      </page-header>
      <div class="org-detail-wrapper">
        <div class="content">
          <div class="top">
            <div class="img-wrapper">
              <iep-img :src="form.logo" slot="cover"></iep-img>
            </div>
            <div class="info-wrapper">
              <div class="title">{{form.name}}</div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">创始人：</label>
                  <span class="value">{{form.creator.name}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">成立时间：</label>
                  <span class="value">{{form.establishTime}}</span>
                </div>
              </div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">联系方式：</label>
                  <span class="value">{{form.contactMethod}}</span>
                </div>
              </div>
            </div>
          </div>
          <a-divider dashed />
          <div class="bottom">
            <div class="title">
              联盟标签
            </div>
            <div class="tag-wrapper">
              <div class="tag-item">
                卓越标签：<iep-tag-detail :value="form.abilityTag"></iep-tag-detail>
              </div>
              <div>
                进步标签：<iep-tag-detail :value="form.learningTag"></iep-tag-detail>
              </div>
            </div>
          </div>
          <a-divider dashed />
          <div class="bottom">
            <div class="title">
              联盟简介
            </div>
            <p>{{form.intro}}</p>
          </div>
          <a-divider dashed />
          <div class="bottom">
            <div class="title">
              联盟架构
            </div>
            <p>{{form.structure}}</p>
          </div>
          <a-divider dashed />
          <div class="bottom">
            <div class="title">
              核心优势
            </div>
            <p>{{form.coreAdvantage}}</p>
          </div>
        </div>
        <a-divider />
        <div class="content"></div>
        <div class="content"></div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUnionBySelf, putUnion } from '@/api/goms/union'
import { initForm } from './options'
export default {
  data () {
    return {
      form: initForm(),
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
        formRequestFn: putUnion,
        row: this.form,
      })
    },
    loadPage () {
      getUnionBySelf().then(({ data }) => {
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
          font-size: 20px;
          margin-bottom: 10px;
        }
        .col {
          display: flex;
          font-size: 16px;
          .form-item-wrapper {
            padding: 10px 0;
            margin-right: 10px;
          }
        }
      }
    }
    .bottom {
      padding: 20px;
      .title {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
