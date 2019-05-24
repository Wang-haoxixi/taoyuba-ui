<template>
  <div class="newest">
    <div class="classify">
      <span class="pieceDeletion" v-for="(name,index) in nameList" :key="index" :class="showClass==index?'color':''" @click="tab1(index)">{{name.name}}</span>
    </div>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div class="content">
          <div class="img">
            <span class="classTag">
              <el-tag type="white" v-for="tag in item.tags" :key="tag.id">{{tag.tag}}</el-tag>
            </span>
            <img :src="item.img" alt="">
          </div>
          <span class="title">{{item.title}}</span>
          <div class="detail">
            <span>{{item.grade}}</span>
            <span><i class="el-icon-view"></i>{{item.num}}</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showClass: 0,
      moduleList: [
        {
          img: require('../img/school1.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school2.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school3.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school4.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school5.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school6.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school7.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school8.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school9.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school10.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school11.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
        {
          img: require('../img/school12.png'),
          title: '关于举办“大数据建模与分析挖掘应用”实战培训',
          grade: '高级',
          num: '399',
          tags: [
            { tag: '数据政府' },
            { tag: '培训班' },
          ],
        },
      ],
      nameList: [
        {
          name: '全部',
        },
        {
          name: '收费',
        },
        {
          name: '免费',
        },
      ],
    }
  },
  methods: {
    tab1 (val) {
      this.showClass = val
    },
  },
}
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.classTag {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 10;
  .el-tag {
    margin-right: 5px;
    &:hover {
      opacity: 0.7;
    }
  }
}
.classify {
  position: absolute;
  top: -70px;
  right: 20px;
  .pieceDeletion {
    display: inline;
    padding: 2px 10px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    margin: 0 10px;
    cursor: pointer;
  }
  .color {
    background-color: #fef6f4;
    border: 1px solid #dc8687;
    color: #dc8687;
  }
}
.module {
  display: grid;
  margin-bottom: 30px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns:
    minmax(100px, 3fr) minmax(100px, 3fr) minmax(100px, 3fr)
    minmax(100px, 3fr);
  .content {
    margin-bottom: 25px;
    cursor: pointer;
  }
  .title {
    display: block;
    margin: 10px 0;
    padding: 0 10px;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .img {
    position: relative;
    width: 100%;
    height: 155px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .detail {
    display: flex;
    margin-top: 10px;
    padding: 0 10px;
    justify-content: flex-start;
    span {
      display: inline-block;
      color: #999;
      &:nth-child(2) {
        margin-left: 20px;
      }
    }
  }
}
.page {
  text-align: center;
}
</style>
<style scoped>
.header >>> .el-button {
  padding: 0;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
}
.module >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.module >>> .el-card__body {
  padding: 0;
}
.newest >>> .el-tag--white {
  border: 0;
  height: 28px;
  line-height: 26px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
