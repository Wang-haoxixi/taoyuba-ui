<template>
  <el-card shadow="hover">
    <el-row class="remind">
      <el-col class="head" :span='24'>预警提醒
        <div class="more">
          <span class="border">
            <iep-button plain size="small" @click="left" :disabled="leftDisabled"><i class="el-icon-arrow-left"></i></iep-button>
          </span>
          <span class="border">
            <iep-button plain size="small" @click="right" :disabled="rightDisabled"><i class="el-icon-arrow-right"></i></iep-button>
          </span>
        </div>
      </el-col>
      <div v-for="(item, index) in infoList" :key="index" class="tip" @mouseenter="tipsSelect=index" @mouseleave="tipsSelect=-1">
        <i class="icon-tongzhi"></i>
        <span>{{item.qarningMessage}}</span>
        <iep-button type="primary" class="btn" size="mini" v-if="index==tipsSelect" @click="clear">忽略</iep-button>
      </div>
    </el-row>
  </el-card>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getMyWarning } from '@/api/crms/count'
export default {
  mixins: [mixins],
  data () {
    return {
      infoList: '',
      tipsSelect: -1,
      current: 1,
      total: '',
      flag: '',
      leftDisabled: false,
      rightDisabled: false,
    }
  },
  created () {
    this.load()

  },
  methods: {
    load () {
      getMyWarning({ current: this.current, size: 5 }).then((res) => {
        this.infoList = res.data.data.records
        this.total = res.data.data.total
        this.flag = Math.ceil(this.total / 5) - 1
      })
    },
    clear () {
      this.$message.success('功能开发中')
    },
    left () {
      this.rightDisabled = false
      if (this.current > 1) {
        this.leftDisabled = false
        this.current -= 1
        this.load()
      } else {
        this.leftDisabled = true
        this.$message.info('当前已是第一页')
        return false
      }

    },
    right () {
      this.leftDisabled = false
      if (this.current > this.flag) {
        this.rightDisabled = true
        this.$message.info('当前已是最后一页')
        return false
      } else {

        this.rightDisabled = false
        this.current += 1
        this.load()
      }

    },
  },
}
</script>

<style lang="scss" scoped>
.remind {
  height: 220px;
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .more {
      float: right;
      .border {
        margin-left: 10px;
        .el-button {
          padding: 0;
        }
        i {
          display: inline-block;
          padding: 5px;
        }
      }
    }
  }
  .tip {
    line-height: 24px;
    margin-top: 10px;
    cursor: pointer;
    i {
      float: left;
    }
    span {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 80%;
      flex: 1;
      margin: 0;
      padding-left: 10px;
    }
    .btn {
      float: right;
    }
  }
  .tip:hover {
    color: #f00;
  }
}
.el-card {
  margin-right: 20px;
}
</style>
