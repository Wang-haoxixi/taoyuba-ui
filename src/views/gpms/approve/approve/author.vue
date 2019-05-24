<template>
  <div class="author">
    <page-header title="我的审批" :backOption="backOption"></page-header>

    <authorApprove ref="approve"></authorApprove>

    <footer-tool-bar>
      <iep-button @click="resetForm">返回</iep-button>
      <iep-button @click="handleNotAgree">不同意</iep-button>
      <iep-button type="primary" @click="handleAgree">同意</iep-button>
    </footer-tool-bar>

    <agreeDailog ref="agree" @close="closeDialog" @submitAgree="submitAgree"></agreeDailog>
    <notAgreeDialog ref="notAgree" @close="closeDialog" @submitNotAgree="submitNotAgree"></notAgreeDialog>
  </div>
</template>

<script>
import agreeDailog from './agreeDialog'
import notAgreeDialog from './notAgreeDialog'
import { updateData } from '@/api/gpms/author'
import authorApprove from '../../project/approval/stage/Accredit/detail/detail'

export default {
  components: { agreeDailog, notAgreeDialog, authorApprove },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.resetForm()
        },
      },
      authorId: '',
    }
  },
  methods: {
    open (author, project) {
      this.authorId = author
      this.$refs['approve'].open(author, project)
    },
    resetForm () {
      this.$emit('close', true)
    },
    // 同意
    handleAgree () {
      this.$refs['agree'].dialogShow = true
    },
    // 不同意
    handleNotAgree () {
      this.$refs['notAgree'].dialogShow = true
    },
    closeDialog (state) {
      if (state) {
        this.$emit('close', true)
      }
    },
    submitAgree (guideSugges) {
      let form = {
        id: this.authorId,
        guideSugges: guideSugges,
        approvalStatus: 3,
      }
      updateData(form).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.$emit('close', true)
      })
    },
    submitNotAgree (approvalFailReason) {
      let form = {
        id: this.authorId,
        approvalFailReason: approvalFailReason,
        approvalStatus: 4,
      }
      updateData(form).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        })
        this.$emit('close', true)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.author {
  padding-bottom: 35px;
  .contianBox {
    margin-bottom: 20px;
    .title {
      background-color: #f5f5f5;
      border-radius: 5px;
      .data {
        padding: 10px 15px;
      }
      .edit {
        float: right;
        right: 0;
        width: 30px;
        line-height: 40px;
        cursor: pointer;
      }
    }
    .topBot {
      margin: 20px 0 30px;
      .summary {
        margin-left: 20px;
      }
    }
    .item {
      height: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>
