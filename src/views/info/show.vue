<template>
  <div class="content">
    <div class="content-header">
      <el-container>
        <el-aside width="200px"> <img src="" alt="照片" /> </el-aside>
        <el-container>
          <el-main>
            <el-row>
              <span class="name">姓名</span>
              <span class="worknumber">G122111</span>
              <el-button type="danger" class="message" size="small">我的私信</el-button>
            </el-row>
            <el-row>
              <span>职位：前端开发工程师</span>
              <el-button type="danger" class="worker" size="small">推荐师傅</el-button>
            </el-row>
            <el-row> <span>部门：重庆研发中心</span> </el-row>
            <el-row>
              <span>卓越：</span>
              <el-tag v-for="tag in excellent" :key="tag.name" :type="tag.type">
                {{ tag.name }}
              </el-tag>
            </el-row>
            <el-row>
              <span>专业：</span>
              <el-tag v-for="tag in major" :key="tag.name" :type="tag.type">
                {{ tag.name }}
              </el-tag>
            </el-row>
            <el-row>
              <span>进步：</span>
              <el-tag v-for="tag in progress" :key="tag.name" :type="tag.type">
                {{ tag.name }}
              </el-tag>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <div class="same">
        <i class="el-icon-tickets"></i> <span>职位职务</span>
        <div class="line"></div>
      </div>
      <el-row type="flex" justify="end">
        <el-col :span="7">
          <span class="typeface">技术职称</span>
          <span class="describe">前端开发</span>
        </el-col>
        <el-col :span="7">
          <span class="typeface">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7">
          <span class="typeface">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</span>
          <span class="describe">无</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="7">
          <span class="typeface">入职时间</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7">
          <span class="typeface">对外头衔</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7"> <span></span> </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="7">
          <span class="typeface">&nbsp;委&nbsp;员&nbsp;会</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7"> <span></span> </el-col>
        <el-col :span="7"> <span></span> </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" :offset="3">
          <span class="typeface">我的师徒</span>
          <span class="describe">无</span>
        </el-col>
      </el-row>
    </div>
    <div class="content-main">
      <el-tabs type="border-card">
        <el-tab-pane label="优秀材料">暂无数据</el-tab-pane>
        <el-tab-pane label="参与项目">暂无数据</el-tab-pane>
        <el-tab-pane label="运营平台">暂无数据</el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-footer">
      <div class="same">
        <i class="el-icon-phone"></i> <span>联系方式</span>
        <div class="line"></div>
      </div>
      <el-row type="flex" justify="end">
        <el-col :span="7">
          <span class="typeface">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7">
          <span class="typeface">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7">
          <span class="typeface">微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信</span>
          <span class="describe">无</span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="7">
          <span class="typeface">Q&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7">
          <span class="typeface">应急电话</span>
          <span class="describe">无</span>
        </el-col>
        <el-col :span="7">
          <span class="typeface">个人主页</span>
          <span class="describe">无</span>
        </el-col>
      </el-row>
      <div class="same">
        <i class="el-icon-date"></i> <span>工作经历</span>
        <div class="line"></div>
      </div>
      <el-row>
        <el-col :span="21" :offset="3"> 20XX年在xx公司。。。。。 </el-col>
      </el-row>
      <div class="same">
        <i class="el-icon-view"></i> <span>学习经历</span>
        <div class="line"></div>
      </div>
      <el-row>
        <el-col :span="21" :offset="3"> 学习微信开发 </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      excellent: [
        { name: '标签一', type: '' },
        { name: '标签二', type: '' },
        { name: '标签三', type: '' },
        { name: '标签四', type: '' },
        { name: '标签五', type: '' },
      ],
      major: [
        { name: '标签一', type: '' },
        { name: '标签二', type: '' },
        { name: '标签三', type: '' },
        { name: '标签四', type: '' },
        { name: '标签五', type: '' },
      ],
      progress: [
        { name: '标签一', type: '' },
        { name: '标签二', type: '' },
        { name: '标签三', type: '' },
        { name: '标签四', type: '' },
        { name: '标签五', type: '' },
      ],
    }
  },
}
</script>

<style>
.content {
  padding: 20px;
}
.el-aside {
  /* background: #ccc; */
  padding: 10px;
}
.el-header {
  background: #fff;
}
.el-main {
  background: #fff;
  padding: 0 20px 0 60px;
}
.message {
  float: right;
}
.worker {
  float: right;
}
.el-row {
  padding: 5px 0;
}
.el-tag {
  margin: 0 5px;
}
.typeface {
  font-size: 14px;
  font-weight: 800;
}
.describe {
  padding-left: 20px;
}
.same {
  background: #fff;
  padding: 20px 0;
  font-size: 18px;
}
.content-header {
  padding: 30px;
  background: #fff;
}
.content-main {
  margin-top: 10px;
}
.content-footer {
  margin-top: 10px;
  padding: 30px;
  background: #fff;
}
.line {
  float: right;
  height: 1px;
  background: #eeeeee;
  width: 90%;
  margin-top: 17px;
}
.name {
  font-size: 20px;
}
.worknumber {
  padding-left: 10px;
}
</style>
