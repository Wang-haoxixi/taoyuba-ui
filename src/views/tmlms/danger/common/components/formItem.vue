<template>
  <div class="form-item-wrapper">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
      <div v-for="(item, index) in options" :key="index">
        <div class="title">{{item.title}}</div>
        <!-- 一级标题 -->
        <div v-for="(item1, index1) in item.column" :key="index1">
          <div class="sub-title">{{item1.title}}</div>
          <!-- 二级标题 -->
          <div v-for="(item2, index2) in item1.prop" :key="index2">
            <div class="item-title">{{item2.title}}</div>
            <!-- 三级标题 -->
            <u-row gutter="16">
              <u-col span="12">
                <el-form-item label="排查要点" :prop="`${item2.value}Result`">
                  <el-radio-group v-model="value[`${item2.value}Result`]">
                    <el-radio :label="radio.label" v-for="(radio, i) in isNot" :key="i" :value="radio.value"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </u-col>
              <u-col span="12">
                <el-form-item label="照片" :prop="`${item2.value}Image`">
                  <el-upload
                    :limit="2"
                    action="/api/admin/file/upload/avatar"
                    list-type="picture-card"
                    :file-list="value[`${item2.value}Image`]"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </u-col>
            </u-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
    historyData: Object,
    options: {
      type: Object,
      default: () => {
        return []
      },
    },
  },
  data () {
    return {
      isNot: [
        { label: '合格', value: 1 },
        { label: '不合格', value: 0 },
      ],
    }
  },
  methods: {
    handlePictureCardPreview () {},
    handleRemove () {},
  },
}
</script>
<style lang="scss" scoped>
  .form-item-wrapper {
    color: #333;
    font-size: 16px;
    .title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .sub-title {
      margin-bottom: 10px;
    }
    .item-title {
      margin-bottom: 10px;
      color: #666;
    }
  }
</style>