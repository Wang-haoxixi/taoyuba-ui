<template>
  <div>
    <basic-container>
      <div v-if="!dialogTableVisible">
        <page-header title="我的定位">
          <template>
            <el-button class="modify" size="small" @click="handleClicks">PK对比</el-button>
          </template>
        </page-header>
        <div class="box">
          <!-- 定位分析 -->
          <el-row>
            <el-col class="borders pos">
              <el-col class="fontcontent" >
                <p v-show="evaluate">感谢你为公司创造了财富价值，你是一个擅长
                  <span style="color: #616266; font-weight: bolder" > {{objects.projects}} </span>
                  项目的国脉人，具备
                  <span style="color: #616266; font-weight: bolder">
                  {{objects.Labels.join('、')}}
                </span>
                  相关知识。继续加油！</p>
                <p v-show="!evaluate">鉴于你当前未参与任何项目，因此无法开展定位分析。</p>
              </el-col>
            </el-col>
          </el-row>
          <!-- 项目分析 -->
          <el-row>
            <el-col class="borders promess">
              <el-row class="bolds">
                项目信息
                <div style="float: right;">
                  <el-tooltip placement="right">
                    <div slot="content" class="Blackwindow">
                      参与项目总数（个）：{{TotalNumProjects.objectsnum.Total}}<br />
                      项目合同总金额（万元）：{{TotalNumProjects.TotalContractAmount.TCA}}<br />
                      担任项目经理次数（次）：{{TotalNumProjects.projectManager.frequency}}<br />
                      担任项目成员次数（次）：{{TotalNumProjects.ProjectMembers.frequency}}<br />
                      分享项目材料总数（个）：{{TotalNumProjects.SharingProjects.frequency}}<br />
                      平均水平：国脉人的平均数据<br />
                      同期水平：与当前用户入司时间相近的国脉人的平均数据
                    </div>
                    <i class='el-icon-picture-outline Explain'>统计说明</i>
                  </el-tooltip>
                </div>
              </el-row>

              <el-row type="flex" justify="space-between" :gutter="30">
                <el-col :span="8">
                  <div class="pro">
                    <!--top-->
                    <div class="promess_con">
                      <div class="hadFont">
                        <div class="icon">
                          <i class="icon-shenqing"></i>
                        </div>
                        <div class="font">
                          <p>参与项目总数(个)</p>
                          <span>{{TotalNumProjects.objectsnum.Total}}</span>
                        </div>
                      </div>
                      <!--center-->
                      <div class="list">
                        <div>
                          <p>
                            咨询类项目
                            <span>{{TotalNumProjects.objectsnum.Consultation}}</span>
                          </p>
                          <p>
                            产品类项目
                            <span>{{TotalNumProjects.objectsnum.product}}</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            数据类项目
                            <span>{{TotalNumProjects.objectsnum.datas}}</span>
                          </p>
                          <p>
                            外包类项目
                            <span>{{TotalNumProjects.objectsnum.outsource}}</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            会议培训类项目
                            <span>{{TotalNumProjects.objectsnum.Meeting}}</span>
                          </p>
                          <p>
                            平台类项目
                            <span>
                            {{TotalNumProjects.objectsnum.platform}}
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            技术服务类项目
                            <span>{{TotalNumProjects.objectsnum.technology}}</span>
                          </p>
                          <p>
                            其它类项目
                            <span>{{TotalNumProjects.objectsnum.Others}}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!--bottom-->
                    <div class="con_bot">
                    <span>
                      平均水平：{{TotalNumProjects.projectManager.Average}}
                    </span>
                      <span>
                      同期水平：{{TotalNumProjects.projectManager.Contemporaneous}}
                    </span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="pro">
                    <!--top-->
                    <div class="promess_con">
                      <div class="hadFont">
                        <div class="icon" style="background:#619f74">
                          <i class="icon-custom"></i>
                        </div>
                        <div class="font">
                          <p>项目合同总金额（万元）</p>
                          <span>{{TotalNumProjects.TotalContractAmount.TCA}}</span>
                        </div>
                      </div>
                      <!--center-->
                      <div class="list">
                        <div class="contin">
                          <p>
                            50万以下项目：
                            <span>{{TotalNumProjects.TotalContractAmount.FiftyDown}}</span>
                          </p>
                        </div>
                        <div class="contin">
                          <p>
                            50万(含)-100万(不含)项目：
                            <span>{{TotalNumProjects.TotalContractAmount.FiftyUp}}</span>
                          </p>
                        </div>
                        <div class="contin">
                          <p>
                            100万(含)-500万(不含)项目：
                            <span>{{TotalNumProjects.TotalContractAmount.OnehundredUp}}</span>
                          </p>
                        </div>
                        <div class="contin">
                          <p>
                            500万(含)-1000万(不含)项目：
                            <span>{{TotalNumProjects.TotalContractAmount.FivehundredUp}}</span>
                          </p>
                        </div>
                        <div class="contin">
                          <p>
                            1000万以上(含)项目：
                            <span>{{TotalNumProjects.TotalContractAmount.OnethousandUp}}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!--bottom-->
                    <div class="con_bot">
                    <span>
                      平均水平：{{TotalNumProjects.TotalContractAmount.Average}}
                    </span>
                      <span>
                      同期水平：{{TotalNumProjects.TotalContractAmount.Contemporaneous}}
                    </span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="pro">
                    <!--top-->
                    <div class="promess_con">
                      <div class="hadFont">
                        <div class="icon" style="background:#449fba">
                          <i class="icon-custom"></i>
                        </div>
                        <div class="font">
                          <p>参与项目总数(个)</p>
                          <span>45</span>
                        </div>
                      </div>
                      <!--center-->
                      <div class="list">
                        <div>
                          <p>
                            咨询类项目
                            <span>{{TotalNumProjects.objectsnum.Consultation}}</span>
                          </p>
                          <p>
                            产品类项目
                            <span>{{TotalNumProjects.objectsnum.product}}</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            数据类项目
                            <span>{{TotalNumProjects.objectsnum.datas}}</span>
                          </p>
                          <p>
                            外包类项目
                            <span>{{TotalNumProjects.objectsnum.outsource}}</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            会议培训类项目
                            <span>{{TotalNumProjects.objectsnum.Meeting}}</span>
                          </p>
                          <p>
                            平台类项目
                            <span>
                            {{TotalNumProjects.objectsnum.platform}}
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            技术服务类项目
                            <span>{{TotalNumProjects.objectsnum.technology}}</span>
                          </p>
                          <p>
                            其它类项目
                            <span>{{TotalNumProjects.objectsnum.Others}}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!--bottom-->
                    <div class="con_bot">
                    <span>
                      平均水平：{{TotalNumProjects.projectManager.Average}}
                    </span>
                      <span>
                      同期水平：{{TotalNumProjects.projectManager.Contemporaneous}}
                    </span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <el-row type="flex" justify="space-between" :gutter="30">
                <el-col :span="12">
                  <div class="pro">
                    <!--top-->
                    <div class="promess_con">
                      <div class="hadFont marPro">
                        <div class="icon" style="background: #cb7f83;">
                          <i class="icon-shoucang1"></i>
                        </div>
                        <div class="font">
                          <p>担任项目经理次数（次）</p>
                          <span>{{TotalNumProjects.projectManager.frequency}}</span>
                        </div>
                      </div>
                      <!--center-->
                      <div class="list">
                        <!--position-->
                        <div class="position"></div>
                        <div>
                          <p>
                            50万以下项目
                            <span>{{TotalNumProjects.projectManager.FiftyDown}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            咨询类项目
                            <span>{{TotalNumProjects.projectManager.Consultation}}</span>
                          </span>
                            <span>
                            产品类项目
                            <span>{{TotalNumProjects.projectManager.product}}</span>
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            50万(含)-100万(不含)项目
                            <span>{{TotalNumProjects.projectManager.FiftyUp}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            数据类项目
                            <span>{{TotalNumProjects.projectManager.datas}}</span>
                          </span>
                            <span>
                            外包类项目
                            <span>{{TotalNumProjects.projectManager.outsource}}</span>
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            100万(含)-500万(不含)项目
                            <span>{{TotalNumProjects.projectManager.OnehundredUp}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            会议培训类项目
                            <span>{{TotalNumProjects.projectManager.Meeting}}</span>
                          </span>
                            <span>
                            平台类项目
                            <span>{{TotalNumProjects.projectManager.platform}}</span>
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            1000万以上(含)项目
                            <span>{{TotalNumProjects.projectManager.OnethousandUp}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            技术服务类项目
                            <span>{{TotalNumProjects.projectManager.technology}}</span>
                          </span>
                            <span>
                            其它类项目
                            <span>{{TotalNumProjects.projectManager.Others}}</span>
                          </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!--bottom-->
                    <div class="con_bot">
                    <span>
                      平均水平：{{TotalNumProjects.projectManager.Average}}
                    </span>
                      <span>
                      同期水平：{{TotalNumProjects.projectManager.Contemporaneous}}
                    </span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="pro">
                    <!--top-->
                    <div class="promess_con">
                      <div class="hadFont marPro">
                        <div class="icon" style="background: #cb9662">
                          <i class="icon-xiaoxi"></i>
                        </div>
                        <div class="font">
                          <p>担任项目成员次数（次）</p>
                          <span>{{TotalNumProjects.ProjectMembers.frequency}}</span>
                        </div>
                      </div>
                      <!--center-->
                      <div class="list">
                        <!--position-->
                        <div class="position"></div>
                        <div>
                          <p>
                            50万以下项目
                            <span>{{TotalNumProjects.ProjectMembers.FiftyDown}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            咨询类项目
                            <span>{{TotalNumProjects.ProjectMembers.Consultation}}</span>
                          </span>
                            <span>
                            产品类项目
                            <span>{{TotalNumProjects.ProjectMembers.product}}</span>
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            50万(含)-100万(不含)项目
                            <span>{{TotalNumProjects.ProjectMembers.FiftyUp}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            数据类项目
                            <span>{{TotalNumProjects.ProjectMembers.datas}}</span>
                          </span>
                            <span>
                            外包类项目
                            <span>{{TotalNumProjects.ProjectMembers.outsource}}</span>
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            100万(含)-500万(不含)项目
                            <span>{{TotalNumProjects.ProjectMembers.OnehundredUp}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            会议培训类项目
                            <span>{{TotalNumProjects.ProjectMembers.Meeting}}</span>
                          </span>
                            <span>
                            平台类项目
                            <span>{{TotalNumProjects.ProjectMembers.platform}}</span>
                          </span>
                          </p>
                        </div>
                        <div>
                          <p>
                            1000万以上(含)项目
                            <span>{{TotalNumProjects.ProjectMembers.OnethousandUp}}</span>
                          </p>
                          <p class="cont-cont">
                          <span class="marRit">
                            技术服务类项目
                            <span>{{TotalNumProjects.ProjectMembers.technology}}</span>
                          </span>
                            <span>
                            其它类项目
                            <span>{{TotalNumProjects.ProjectMembers.Others}}</span>
                          </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <!--bottom-->
                    <div class="con_bot">
                    <span>
                      平均水平：{{TotalNumProjects.ProjectMembers.Average}}
                    </span>
                      <span>
                      同期水平：{{TotalNumProjects.ProjectMembers.Contemporaneous}}
                    </span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 弹窗 -->
        </div>
      </div>
      <div v-else>
        <el-row class="Labelesname">
          <el-row>
            <div class="pkCont">
              PK对比
              <el-button class="calls" type="small" @click='handleClicks'>返回</el-button>
            </div>
          </el-row>
          <el-col :span='24'>
            <!-- 标签组件 -->
            <span style="padding-left: 40px">对比人：</span>
            <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-col>
        </el-row>
        <el-row class="head-t" type="flex" justify="center">
          <div class="head">
            <div class="Himg">
              <a href="javascript:;">
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=622258600,2063348875&fm=26&gp=0.jpg" alt="未加载">
              </a>
            </div>
            <div class="fontP">PK</div>
            <div class="Himg rt">
              <a href="javascript:;" style="">
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=622258600,2063348875&fm=26&gp=0.jpg" alt="未加载">
              </a>
            </div>
          </div>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <table>
              <tr>
                <td>对比项</td>
                <td :key="name" v-for="name in dynamicTags">{{name}}</td>
              </tr>
              <tr class="bg-gray">
                <td :colspan="dynamicTags.length+1"  >基础信息</td>
              </tr>
              <tr>
                <td>岗位</td>
                <td>
                  {{userMessage[0].post}}
                </td>
                <td>
                  {{userMessage[1].post}}
                </td>
              </tr>
              <tr>
                <td>职务</td>
                <td>
                  {{userMessage[0].duty}}
                </td>
                <td>
                  {{userMessage[1].duty}}
                </td>
              </tr>
              <tr>
                <td   >职称</td>
                <td>
                  {{userMessage[0].title}}
                </td>
                <td>
                  {{userMessage[1].title}}
                </td>
              </tr>
              <tr>
                <td>卓越标签</td>
                <td>
                  {{userMessage[0].brllTag}}
                </td>
                <td>
                  {{userMessage[1].brllTag}}
                </td>
              </tr>
              <tr>
                <td>专业标签</td>
                <td>
                  {{userMessage[0].specialtyTag}}
                </td>
                <td>
                  {{userMessage[1].specialtyTag}}
                </td>
              </tr>
              <tr>
                <td>进步标签</td>
                <td>
                  {{userMessage[0].progressTag}}
                </td>
                <td>
                  {{userMessage[1].progressTag}}
                </td>
              </tr>
              <tr class="bg-gray">
                <td :colspan="dynamicTags.length+1"  >项目信息-概要</td>
              </tr>
              <tr>
                <td   >参与项目总数（个）</td>
                <td>
                  {{userMessage[0].takePartProject}}
                </td>
                <td>
                  {{userMessage[1].takePartProject}}
                </td>
              </tr>
              <tr>
                <td   >项目合同总金额（万元）</td>
                <td>
                  {{userMessage[0].projectContract}}
                </td>
                <td>
                  {{userMessage[1].projectContract}}
                </td>
              </tr>
              <tr>
                <td   >担任项目经理次数（次）</td>
                <td>
                  {{userMessage[0].projectMar}}
                </td>
                <td>
                  {{userMessage[1].projectMar}}
                </td>
              </tr>
              <tr>
                <td>咨询类项目</td>
                <td>
                  {{userMessage[0].consultProject}}
                </td>
                <td>
                  {{userMessage[1].consultProject}}
                </td>
              </tr>
              <tr>
                <td   >担任项目成员次数（次）</td>
                <td>
                  {{userMessage[0].projectMember}}
                </td>
                <td>
                  {{userMessage[1].projectMember}}
                </td>
              </tr>
              <tr>
                <td   >分享项目材料总数（个）</td>
                <td>
                  {{userMessage[0].shareProject}}
                </td>
                <td>
                  {{userMessage[1].shareProject}}
                </td>
              </tr>
              <tr class="bg-gray">
                <td :colspan="dynamicTags.length+1"  >项目信息-详细【参与项目总数（个）】</td>
              </tr>
              <tr>
                <td>咨询类项目</td>
                <td>
                  {{userMessage[0].Dconsult}}
                </td>
                <td>
                  {{userMessage[1].Dconsult}}
                </td>
              </tr>
              <tr>
                <td   >产品类项目</td>
                <td>
                  {{userMessage[0].Dproduct}}
                </td>
                <td>
                  {{userMessage[1].Dproduct}}
                </td>
              </tr>
              <tr>
                <td   >数据类项目</td>
                <td>
                  {{userMessage[0].Ddate}}
                </td>
                <td>
                  {{userMessage[1].Ddate}}
                </td>
              </tr>
              <tr>
                <td   >外包类项目</td>
                <td>
                  {{userMessage[0].Depiboly}}
                </td>
                <td>
                  {{userMessage[1].Depiboly}}
                </td>
              </tr>
              <tr>
                <td   >会议培训类项目</td>
                <td>
                  {{userMessage[0].Dmeeting}}
                </td>
                <td>
                  {{userMessage[1].Dmeeting}}
                </td>
              </tr>
              <tr>
                <td   >平台类类项目</td>
                <td>
                  {{userMessage[0].Dplatform}}
                </td>
                <td>
                  {{userMessage[1].Dplatform}}
                </td>
              </tr>
              <tr>
                <td   >技术服务类项目</td>
                <td>
                  {{userMessage[0].Dskill}}
                </td>
                <td>
                  {{userMessage[1].Dskill}}
                </td>
              </tr>
              <tr>
                <td   >其他类项目</td>
                <td>
                  {{userMessage[0].Drest}}
                </td>
                <td>
                  {{userMessage[1].Drest}}
                </td>
              </tr>
              <tr class="bg-gray">
                <td :colspan="dynamicTags.length+1"  >项目信息-详细【项目合同总金额（万元）】</td>
              </tr>
              <tr>
                <td   >50万以下项目</td>
                <td>
                  {{userMessage[0].Fbottom}}
                </td>
                <td>
                  {{userMessage[1].Fbottom}}
                </td>
              </tr>
              <tr>
                <td   >50万(含)-100万(不含)项目</td>
                <td>
                  {{userMessage[0].FOne}}
                </td>
                <td>
                  {{userMessage[1].FOne}}
                </td>
              </tr>
              <tr>
                <td   >100万(含)-500万(不含)项目</td>
                <td>
                  {{userMessage[0].OneF}}
                </td>
                <td>
                  {{userMessage[1].OneF}}
                </td>
              </tr>
              <tr>
                <td   >500万(含)-1000万(不含)项目</td>
                <td>
                  {{userMessage[0].FOneOne}}
                </td>
                <td>
                  {{userMessage[1].FOneOne}}
                </td>
              </tr>
              <tr>
                <td   >1000万以上(含)项目</td>
                <td>
                  {{userMessage[0].OneOne}}
                </td>
                <td>
                  {{userMessage[1].OneOne}}
                </td>
              </tr>

              <tr class="bg-gray">
                <td :colspan="dynamicTags.length+1" >项目信息-详细【担任项目经理次数（次）】</td>
              </tr>
              <tr>
                <td   >50万以下项目</td>
                <td>
                  {{userMessage[0].PFbottom}}
                </td>
                <td>
                  {{userMessage[1].PFbottom}}
                </td>
              </tr>
              <tr>
                <td   >50万(含)-100万(不含)项目</td>
                <td>
                  {{userMessage[0].PFOne}}
                </td>
                <td>
                  {{userMessage[1].PFOne}}
                </td>
              </tr>
              <tr>
                <td   >100万(含)-500万(不含)项目</td>
                <td>
                  {{userMessage[0].POneF}}
                </td>
                <td>
                  {{userMessage[1].POneF}}
                </td>
              </tr>
              <tr>
                <td   >500万(含)-1000万(不含)项目</td>
                <td>
                  {{userMessage[0].PFOneOne}}
                </td>
                <td>
                  {{userMessage[1].PFOneOne}}
                </td>
              </tr>
              <tr>
                <td   >1000万以上(含)项目</td>
                <td>
                  {{userMessage[0].POneOne}}
                </td>
                <td>
                  {{userMessage[1].POneOne}}
                </td>
              </tr>
              <tr>
                <td   >咨询类项目</td>
                <td>
                  {{userMessage[0].PDconsult}}
                </td>
                <td>
                  {{userMessage[1].PDconsult}}
                </td>
              </tr>
              <tr>
                <td   >产品类项目</td>
                <td>
                  {{userMessage[0].PDproduct}}
                </td>
                <td>
                  {{userMessage[1].PDproduct}}
                </td>
              </tr>
              <tr>
                <td   >数据类项目</td>
                <td>
                  {{userMessage[0].PDdate}}
                </td>
                <td>
                  {{userMessage[1].PDdate}}
                </td>
              </tr>
              <tr>
                <td   >外包类项目</td>
                <td>
                  {{userMessage[0].PDepiboly}}
                </td>
                <td>
                  {{userMessage[1].PDepiboly}}
                </td>
              </tr>
              <tr>
                <td   >会议培训类项目</td>
                <td>
                  {{userMessage[0].PDmeeting}}
                </td>
                <td>
                  {{userMessage[1].PDmeeting}}
                </td>
              </tr>
              <tr>
                <td   >平台类类项目</td>
                <td>
                  {{userMessage[0].PDplatform}}
                </td>
                <td>
                  {{userMessage[1].PDplatform}}
                </td>
              </tr>
              <tr>
                <td   >技术服务类项目</td>
                <td>
                  {{userMessage[0].PDplatform}}
                </td>
                <td>
                  {{userMessage[1].PDplatform}}
                </td>
              </tr>
              <tr>
                <td   >其它类项目</td>
                <td>
                  {{userMessage[0].PDrest}}
                </td>
                <td>
                  {{userMessage[1].PDrest}}
                </td>
              </tr>

              <tr class="bg-gray">
                <td :colspan="dynamicTags.length+1"  >项目信息-详细【分享项目材料总数（个）】</td>
              </tr>
              <tr>
                <td   >咨询类项目</td>
                <td>
                  {{userMessage[0].Mconsult}}
                </td>
                <td>
                  {{userMessage[1].Mconsult}}
                </td>
              </tr>
              <tr>
                <td   >产品类项目</td>
                <td>
                  {{userMessage[0].Mproduct}}
                </td>
                <td>
                  {{userMessage[1].Mproduct}}
                </td>
              </tr>
              <tr>
                <td   >数据类项目</td>
                <td>
                  {{userMessage[0].Mdate}}
                </td>
                <td>
                  {{userMessage[1].Mdate}}
                </td>
              </tr>
              <tr>
                <td   >外包类项目</td>
                <td>
                  {{userMessage[0].Mepiboly}}
                </td>
                <td>
                  {{userMessage[1].Mepiboly}}
                </td>
              </tr>
              <tr>
                <td   >会议培训类项目</td>
                <td>
                  {{userMessage[0].Mmeeting}}
                </td>
                <td>
                  {{userMessage[1].Mmeeting}}
                </td>
              </tr>
              <tr>
                <td   >平台类类项目</td>
                <td>
                  {{userMessage[0].Mplatform}}
                </td>
                <td>
                  {{userMessage[1].Mplatform}}
                </td>
              </tr>
              <tr>
                <td   >技术服务类项目</td>
                <td>
                  {{userMessage[0].Mskill}}
                </td>
                <td>
                  {{userMessage[1].Mskill}}
                </td>
              </tr>
              <tr>
                <td   >其它类项目</td>
                <td>
                  {{userMessage[0].Mrest}}
                </td>
                <td>
                  {{userMessage[1].Mrest}}
                </td>
              </tr>
              <tr>
                <td   >被下载总量</td>
                <td>
                  {{userMessage[0].Mdownload}}
                </td>
                <td>
                  {{userMessage[1].Mdownload}}
                </td>
              </tr>
              <tr>
                <td   >被浏览总量</td>
                <td>
                  {{userMessage[0].Mbrowse}}
                </td>
                <td>
                  {{userMessage[1].Mbrowse}}
                </td>
              </tr>
            </table>

          </el-col>
        </el-row>

      </div>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      // 标签组件
      dynamicTags: ['毛莹莹', '何益挺'],
      userMessage:[
      {
          // 基础信息
           post:'产品技术类-产品助理', //岗位
           duty:'初级咨询师',
           title:'初级经理',
           brllTag:'电子政务|营商环境|项目管理',
           specialtyTag:'数据基因|DIPS|项目管理',
           progressTag:'电子政务|营商环境|项目管理',
          // 项目信息-概要
          takePartProject:32,
          projectContract:400,
          projectMar:50,
          consultProject:12,
          projectMember:54,
          shareProject:123,
          // 项目信息-详细【参与项目总数（个）】
          Dconsult:10,
          Dproduct:21,
          Ddate:14,
          Depiboly:1,
          Dmeeting:12,
          Dplatform:9,
          Dskill:4,
          Drest:5,
          // 项目信息-详细【项目合同总金额（万元）】
          Fbottom:21,
          FOne:13,
          OneF:8,
          FOneOne:2,
          OneOne:0,
          // 项目信息-详细【担任项目经理次数（次）】
          PFbottom:18,
          PFOne:10,
          POneF:5,
          PFOneOne:4,
          POneOne:3,
          PDconsult:12,
          PDproduct:14,
          PDdate:11,
          PDepiboly:8,
          PDmeeting:7,
          PDplatform:9,
          PDskill:2,
          PDrest:0,
          // 项目信息-详细【分享项目材料总数（个）】
          Mconsult:19,
          Mproduct:13,
          Mdate:11,
          Mepiboly:8,
          Mmeeting:13,
          Mplatform:6,
          Mskill:2,
          Mrest:3,
          Mdownload:312,
          Mbrowse:668,
       },
       {
           post:'产品技术类-产品经理',
           duty:'中级咨询师',
           title:'高级主管',
           brllTag:'数据基因|DIPS|项目管理',
           specialtyTag:'电子政务|营商环境|项目管理',
           progressTag:'数据基因|DIPS|项目管理',
           takePartProject:45,
           projectContract:512,
           projectMar:61,
           consultProject:16,
           projectMember:48,
           shareProject:321,
           Dconsult:18,
           Dproduct:22,
           Ddate:31,
           Depiboly:2,
           Dmeeting:23,
           Dplatform:10,
           Dskill:2,
           Drest:5,
           Fbottom:30,
           FOne:22,
           OneF:11,
           FOneOne:6,
           OneOne:3,
           PFbottom:25,
           PFOne:12,
           POneF:14,
           PFOneOne:9,
           POneOne:10,
           PDconsult:32,
           PDproduct:21,
           PDdate:12,
           PDepiboly:10,
           PDmeeting:8,
           PDplatform:4,
           PDskill:2,
           PDrest:1,
           Mconsult:31,
           Mproduct:22,
           Mdate:23,
           Mepiboly:12,
           Mmeeting:19,
           Mplatform:12,
           Mskill:4,
           Mrest:9,
           Mdownload:568,
           Mbrowse:1011,
       },
      ],
      inputVisible: false,
      inputValue: '',
      // 评价标语
      evaluate: true,
      objects: {
        'projects': '产品类',
        'Labels': ['数据基因', '营商环境', '产品设计'],
      },
      TotalNumProjects: {
        // 参与项目data
        objectsnum: {
          'Total': '40',
          'Average': '8.1',
          'Contemporaneous': '13.2',
          'Consultation': '3',
          'product': '15',
          'datas': '15',
          'outsource': '2',
          'Meeting': '2',
          'platform': '1',
          'technology': '2',
          'Others': '0',
        },
        // 合同总金额
        TotalContractAmount: {
          'TCA': '500.6',
          'Average': '23.5',
          'Contemporaneous': '12.5',
          'FiftyDown': '30',
          'FiftyUp': '7',
          'OnehundredUp': '2',
          'FivehundredUp': '1',
          'OnethousandUp': '0',
        },
        // 担任项目经理次数
        projectManager: {
          'frequency': '15',
          'Average': '10.2',
          'Contemporaneous': '6.1',
          'FiftyDown': '10',
          'FiftyUp': '3',
          'OnehundredUp': '1',
          'FivehundredUp': '1',
          'OnethousandUp': '0',
          'Consultation': '2',
          'product': '10',
          'datas': '7',
          'outsource': '1',
          'Meeting': '1',
          'platform': '0',
          'technology': '2',
          'Others': '0',
        },
        // 担任项目成员次数
        ProjectMembers: {
          'frequency': '25',
          'Average': '34.2',
          'Contemporaneous': '180.8',
          'FiftyDown': '20',
          'FiftyUp': '4',
          'OnehundredUp': '1',
          'FivehundredUp': '0',
          'OnethousandUp': '0',
          'Consultation': '1',
          'product': '5',
          'datas': '8',
          'outsource': '1',
          'Meeting': '1',
          'platform': '1',
          'technology': '0',
          'Others': '0',
        },
        // 分享项目材料
        SharingProjects: {
          'frequency': '105',
          'Average': '34.2',
          'Contemporaneous': '180.4',
          'Consultation': '10',
          'product': '30',
          'datas': '40',
          'outsource': '10',
          'Meeting': '5',
          'platform': '5',
          'technology': '5',
          'Others': '0',
          'Downloads': '430',
          'browses': '561',
        },
      },
      dialogTableVisible: false,
    }
  },
  methods: {
    handleClicks () {
      this.dialogTableVisible = !this.dialogTableVisible
    },
    // 标签组件
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.head-t{
  width: 100%;
  height: 180px;
  border: 1px solid #ccc;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow:0px 0px 2px #ccc;
  margin-bottom: 20px;
  .head{
    margin-top: 40px;
    width: 250px;
    height: 80px;
    overflow: hidden;
    div{
      float:left;
    }
    .Himg{
      width: 80px;
      height: 80px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      overflow: hidden;

      a{
        width: 100%;
        height: 100%;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .rt{
      float: right;
    }
    .fontP{
      line-height: 80px;
      width: 85px;
      font-size: 20px;
      text-align: center;
    }
  }
}
.pro{
  margin-bottom: 30px;
  border: 1px solid #cccccc;
  color: #6d7173;
  &>div{
    box-sizing: border-box;
  }
  .promess_con{
    padding: 0 30px;
    font-size: 14px;

    .list {
      padding: 15px 3px 0;
      position: relative;
      .position {
        position: absolute;
        width: 0;
        height: 80%;
        left: 43%;
        top: 0;
        bottom: 0;
        margin: auto;
        border-left: 1px dashed #ccc;
      }
      .cont-cont {
        width: 57%;
        padding-left: 20px;
        span{
          width: 46%;
          float: left;
          overflow: hidden;
          span{
            float: right;
            width: auto;
            text-align: right;
          }
        }
        .marRit{
          margin-right: 15px;
        }
      }
      .contin {
        height: 31px;
        p {
          width: 100%;
        }
      }
      div {
        width: 100%;
        overflow: hidden;
        p {
          float: left;
          width: 40%;
          overflow: hidden;
          span {
            float: right;
          }
        }
        & > p:nth-child(2) {
          float: right;
        }
      }
    }
    .hadFont{
      height: 142px;
      padding: 42px 8px;
      overflow: hidden;
      border-bottom: 1px solid #cccccc;
      div{
        float: left;
      }
      .icon{
        width: 62px;
        height: 62px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background: #5b77a6;
        margin-right: 10px;
        color: #fff;
        text-align: center;
        line-height: 60px;
      }
      .font{
        span{
          display: block;
          font-size: 30px;
          margin-top: -15px;
        }
      }
    }
    .marPro{
      display: flex;
      justify-content: center;
    }
  }
  .con_bot{
    height: 61px;
    background: #fafafa;
    padding:0 43px;
    line-height: 61px;
    &>span:last-child{
      margin-left: 8px;
    }
  }
}
.pos{
    background: #fafafa;
  }
.box {
  width: 100%;
  background-color: #fff;
  position: relative;
  .clearmagin {
    margin: auto 0;
    box-sizing: border-box;
    padding: 0 20px;
    p {
      font-size: 18px;
      font-weight: bold;
    }
    .pk {
      margin-top: 11px;
    }
  }
  .el-row {
    padding-top: 10px;
  }
  .borders {
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding: 10px 15px 20px 15px;
    .bolds {
      margin: 20px 0;
      font-weight: bold;
      font-size: 15px;
      color: #666666;
      .Explain {
        cursor: pointer;
        font-size: 13px;
        color: gray;
        padding-left: 5px;
      }
      .Blackwindow {
        line-height: 2px;
      }
    }
    .leftBox {
      margin-right: 8px;
      .leftBoxone {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        .ones {
          width: 50%;
          display: inline-block;
          .onesSmallTop {
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
          }
        }
        .twos {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          border-left: 1px dashed #ccc;
          .twosSmallUp {
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
          }
        }
      }
      .leftBoxtwo {
        border: 1px solid #ccc;
        .firsts {
          width: 50%;
          display: inline-block;
        }
        .seconds {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          border-left: 1px solid #ccc;
          .secondsTop {
            border-bottom: 1px dashed #ccc;
          }
        }
      }
    }
    .rightBox {
      background-color: goldenrod;
      .rightBoxone {
        width: 98%;
        border: 1px solid #ccc;
        display: inline-block;
        .solids {
          border-bottom: 1px solid #ccc;
        }
        .dashed {
          border-bottom: 1px dashed #ccc;
        }
      }
      .rightBoxtwo {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        display: inline-block;
        .solids {
          border-bottom: 1px solid #ccc;
        }
        .dashed {
          border-bottom: 1px dashed #ccc;
        }
      }
    }
    .fontname {
      font-size: 13px;
      margin-top: 10px;
      padding-left: 40px;
    }
    .fontcontent {
      height: 30px;
      p{
        margin: 8px;
        font-size: 14px;
        height: 14px;
        text-align: center;
      }
    }
  }
  .promess{
    border: none;
    padding: 0;
  }
}
.centers {
  text-align: center;
  color: #666666;
}
.cle {
  margin: 0 0 20px 0;
  font-size: 35px;
}
.twoFonts {
  width: 50%;
  display: inline-block;
  font-size: 11px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 9px;
}
.money {
  font-size: 13px;
  padding: 5px 0 5px 10px;
}
.twoFontsbut {
  padding-bottom: 11px;
}
.mright {
  padding-top: 5px;
  padding-bottom: 10px;
}
.marbFonts {
  margin-bottom: 5px;
}
.twoFontsBox {
  padding-top: 1px;
}
table {
  width: 100%;
  color: #9c9c9c;
  tr{
    border-bottom: 1px solid #f7f7f7;
    td{
      color: #8a8a8a;
    }
    td:first-child{
      width: 40%;
      color: #9c9c9c;
    }
  }
  .bg-gray{
    background: #f8f8f8;
    td{
      font-weight: normal;
      color: #565656;
    }
  }
}
.titl {
  text-align: left;
  padding-left: 10px;
  font-weight: bold;
}
td,th{
  padding: 10px 15px;
}
.Fields {
  text-align: left;
  padding-left: 10px;
}
.pkCont{
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 40px;
}
.calls {
  float: right;
}
// 标签组件
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.Labelesname {
  margin-bottom: 20px;
}
</style>


