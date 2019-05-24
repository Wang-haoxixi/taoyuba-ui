<template>
  <div class="complex-form">
    <div class="form-wrapper">
      <el-form :model="formData" ref="guideForm" class="form-inline" label-width="140px" size="small" :disabled="disabled">
        <h2 id="essential-elements">基本要素</h2>
        <section>
          <el-form-item v-if="!disabled" label="办事指南模板：">
            <template-select v-if="!disabled" v-model="formData.tmplName" @fillData="handleFillData" :guide-type="guideType"></template-select>
            <el-input v-if="disabled" v-model="formData.tmplName" readonly></el-input>
          </el-form-item>
          <el-form-item v-if="isTemplate" label="原事项名称：">
            <el-input v-model="formData.oldMatName" readonly></el-input>
          </el-form-item>
          <!-- 模板一次性给, 其他就自己获取 -->
          <el-form-item v-if="!isTemplate" label="选择事项：" prop="matId" :rules="{ required: true, message: '请选择事项', trigger: 'change' }">
            <input type="hidden" v-model="formData.matId" />
            <matter-select v-if="!disabled && !isEdit" v-model="matForm.name" @fillData="handleFillMatterData" :guide-type="guideType"></matter-select>
            <el-input v-if="disabled || isEdit" v-model="matForm.name" readonly></el-input>
          </el-form-item>
          <el-form-item v-if="isTemplate" label="事项模板名称：">
            <el-input v-model="matForm.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="事项代码：" class="formWidth">
            <el-input v-model="matForm.encrp" disabled placeholder="新增事项所对应的唯一代码"></el-input>
          </el-form-item>
          <el-form-item label="事项类别：" class="formWidth">
            <el-cascader :options="dicList['MAT_ITEM_TYPE']" v-model="matForm.type" disabled>
            </el-cascader>
          </el-form-item>
          <el-form-item label="实施机构名称：" prop="operDept" :rules="{ required: true, message: '请选择实施机构', trigger: 'change' }">
            <dept-select v-model="formData.operDept" placeholder="选择办理具体政务服务的机构名称"></dept-select>
          </el-form-item>
          <!-- 模板一次性给, 其他就自己获取 -->
          <el-form-item label="事项原代码：" prop="matCode" :rules="{ required: true, message: '请输入事项原代码', trigger: 'blur' }">
            <el-input v-model="formData.matCode" :maxlength="50" placeholder="新增事项所对应的唯一原代码"></el-input>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="服务对象：" prop="svrObjList" :rules="{ type: 'array', required: true, message: '请选择服务对象', trigger: 'change' }">
            <el-checkbox-group v-model="formData.svrObjList">
              <el-checkbox v-for="item in dicList['MAT_OBJECT']" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="办件类型：" prop="docType" :rules="{ required: true, message: '请选择办件类型', trigger: 'change' }">
            <el-radio-group v-model="formData.docType">
              <el-radio v-for="item in dicList['MAT_OFFICE_TYPE']" :label="+item.value" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="通办范围：" prop="operScope" :rules="{ required: true, message: '请选择通办范围', trigger: 'change' }">
            <el-radio-group v-model="formData.operScope">
              <el-radio v-for="item in dicList['MAT_HANDLE_RANGE']" :label="+item.value" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="设定依据：" prop="setGuide" :rules="{ required: true, message: '请输入设定依据', trigger: 'blur' }">
            <el-input type="textarea" :rows="3" v-model="formData.setGuide" :maxlength="200" placeholder="设定该事项的法律、办法、规定等依据"></el-input>
          </el-form-item>
          <el-form-item label="责任处（科）室或单位：" label-width="180px" prop="accoDept" :rules="{ required: true, message: '请选择实施机构', trigger: 'blur' }">
            <el-input v-model="formData.accoDept" :maxlength="50" placeholder="该行政权力所对应的认责单位"></el-input>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="实施主体性质：" prop="operSubject" :rules="{ required: true, message: '请选择实施主体性质', trigger: 'change' }">
            <el-radio-group v-model="formData.operSubject">
              <el-radio v-for="item in dicList['MAT_ORGANIZATION_NAME']" :label="+item.value" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="存在联办机构：">
            <el-switch v-model="formData.isJoint" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力' && formData.isJoint===2" label="联办机构：" prop="jointDept" :rules="{ required: true, message: '请选择联办机构', trigger: 'change' }">
            <dept-select v-model="formData.jointDept" placeholder="选择办理具体政务服务的联办机构名称"></dept-select>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="行使类型：" prop="enforceType" :rules="{ required: true, message: '请选择行使类型', trigger: 'change' }">
            <el-radio-group v-model="formData.enforceType">
              <el-radio v-for="item in dicList['MAT_EXERCISE_TYPE']" :label="+item.value" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="行使层级：" prop="enforceLevelList" :rules="{ type: 'array',required: true, message: '请选择行使层级', trigger: 'change' }">
            <el-checkbox-group v-model="formData.enforceLevelList">
              <el-checkbox v-for="item in dicList['MAT_EXERCISE_LEVEL']" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="运行系统：" prop="runSys" :rules="{required: true, message: '请选择运行系统', trigger: 'change' }">
            <el-radio-group v-model="formData.runSys">
              <el-radio v-for="item in dicList['MAT_SYSTEM_LEVEL']" :label="+item.value" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="权限划分：" prop="authDiv" :rules="{ required: true, message: '请输入权限划分', trigger: 'blur' }">
            <el-input type="textarea" v-model="formData.authDiv" :maxlength="200" placeholder="依照宪法和法律对政府权利的分配方式"></el-input>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="行使内容：" prop="enforceCont" :rules="{ required: true, message: '请输入行使内容', trigger: 'blur' }">
            <el-input type="textarea" v-model="formData.enforceCont" :maxlength="200" placeholder="该行政权力具体内容"></el-input>
          </el-form-item>
          <el-form-item label="数量限制：" prop="ctLim" :rules="{ required: true, message: '请输入数量限制', trigger: 'blur' }">
            <el-input type="textarea" v-model="formData.ctLim" :maxlength="200" placeholder="行政权力的数量限制"></el-input>
          </el-form-item>
          <el-form-item label="结果名称：" prop="rsName" :rules="{ required: true, message: '请输入结果名称', trigger: 'blur' }">
            <el-input v-model="formData.rsName" :maxlength="200" placeholder="事项结果名称"></el-input>
          </el-form-item>
          <el-form-item label="结果样本：" class="formWidth" prop="rsSamp" :rules="{ required: true, message: '请输入结果样本', trigger: 'blur' }">
            <el-input v-model="formData.rsSamp" :maxlength="200" placeholder="事项结果样本"></el-input>
          </el-form-item>
          <el-form-item label="结果文件：" class="formWidth" prop="file3" :rules="{ type: 'array',required: true, message: '请上传结果文件', trigger: 'blur' }">
            <mat-file-uploader-list :disabled="disabled" v-model="formData.file3" samp-type-name="结果样本"></mat-file-uploader-list>
          </el-form-item>
          <el-form-item label="法定办结时限：" class="formWidth" prop="legalTime" :rules="{ required: true, message: '请输入法定办结时限', trigger: 'blur' }">
            <div style="display: flex;">
              <el-input-number v-model="formData.legalTime" style="width: inherit;" type="number" :min="1" :max="99"></el-input-number>
              <el-select v-model="formData.legalUnit" placeholder="请选择">
                <el-option v-for="item in dicList['MAT_TIME_UNIT']" :label="item.label" :key="item.value" :value="+item.value"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="承诺办结时限：" class="formWidth" prop="promiseTime" :rules="{ required: true, message: '请输入承诺办结时限', trigger: 'blur' }">
            <div style="display: flex;">
              <el-input-number v-model="formData.promiseTime" style="width: inherit;" type="number" :min="1" :max="99"></el-input-number>
              <el-select v-model="formData.promiseUnit" placeholder="请选择">
                <el-option v-for="item in dicList['MAT_TIME_UNIT']" :label="item.label" :key="item.value" :value="+item.value"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="咨询电话：" class="formWidth" prop="consultTel" :rules="[{ required: true, message: '请输入咨询电话', trigger: 'blur' },{
            validator: validateNumber,
            trigger: ['change','blur'],
          }]">
            <el-input v-model="formData.consultTel" :maxlength="100" placeholder="对应责任部门咨询电话"></el-input>
          </el-form-item>
          <el-form-item label="监督电话：" class="formWidth" prop="supTel" :rules="[{ required: true, message: '请输入监督电话', trigger: 'blur' },{
            validator: validateNumber,
            trigger: ['change','blur'],
          }]">
            <el-input v-model="formData.supTel" :maxlength="100" placeholder="对应责任部门监督电话"></el-input>
          </el-form-item>
        </section>
        <h2 id="acceptance-link">受理环节</h2>
        <section>
          <el-form-item label="受理条件：" prop="admiss" :rules="{ required: true, message: '请输入受理条件', trigger: 'blur' }">
            <el-input type="textarea" v-model="formData.admiss" :maxlength="200" placeholder="受理该事项应具备的条件"></el-input>
          </el-form-item>
          <el-form-item label="是否窗口办理流程：" label-width="180px">
            <el-switch v-model="formData.isWindowProc" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="formData.isWindowProc===2" label="窗口办理流程描述：" class="formWidth" label-width="180px" prop="windowProc" :rules="{ required: true, message: '请输入窗口办理流程描述', trigger: 'blur' }">
            <el-input v-model="formData.windowProc" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item v-if="formData.isWindowProc===2" label="文件：" class="formWidth" prop="file2" :rules="{ required: true, message: '请上传窗口办理流程文件', trigger: 'change' }">
            <mat-file-uploader-list :disabled="disabled" v-model="formData.file2" samp-type-name="窗口办理流程"></mat-file-uploader-list>
          </el-form-item>
          <el-form-item label="是否网上办理流程：" label-width="180px">
            <el-switch v-model="formData.isOnlineProc" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="formData.isOnlineProc===2" label="网上办理流程描述：" class="formWidth" label-width="180px" prop="onlineProc" :rules="{ required: true, message: '请输入网上办理流程描述', trigger: 'blur' }">
            <el-input v-model="formData.onlineProc" :maxlength="200"></el-input>
          </el-form-item>
          <el-form-item v-if="formData.isOnlineProc===2" label="文件：" class="formWidth" prop="file1" :rules="{ required: true, message: '请上传网上办理流程文件', trigger: 'change' }">
            <mat-file-uploader-list :disabled="disabled" v-model="formData.file1" samp-type-name="网上办理流程"></mat-file-uploader-list>
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="是否特殊环节：" label-width="180px">
            <el-switch v-model="formData.isSpec" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <template v-if="formData.isSpec===2 && guideType==='行政权力'">
            <el-form-item v-if="formData.isSpec===2" label="特殊程序名称：" label-width="180px" prop="specProcList" :rules="{ type: 'array',required: true, message: '请选择特殊程序名称', trigger: 'change' }">
              <el-checkbox-group v-model="formData.specProcList">
                <el-checkbox v-for="item in dicList['MAT_SPECIAL_PROCEDURES']" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="formData.isSpec===2" label="特殊程序办理人：" class="formWidth" label-width="180px" prop="specProcer" :rules="{ required: true, message: '请输入特殊程序办理人', trigger: 'blur' }">
              <el-input v-model="formData.specProcer" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.isSpec===2" label="特殊程序建议时间：" class="formWidth" label-width="180px" prop="procSuggTime" :rules="{ required: true, message: '请输入特殊程序建议时间', trigger: 'blur' }">
              <el-input v-model="formData.procSuggTime" :maxlength="50"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="是否收费：" label-width="180px">
            <el-switch v-model="formData.isChg" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="formData.isChg===2" label="收费标准：" label-width="180px" prop="chgStd" :rules="{ required: true, message: '请输入收费标准', trigger: 'blur' }">
            <el-input v-model="formData.chgStd" :maxlength="100"></el-input>
          </el-form-item>
          <el-form-item v-if="formData.isChg===2" label="收费依据：" label-width="180px" prop="chgBasis" :rules="{ required: true, message: '请输入收费依据', trigger: 'blur' }">
            <el-input v-model="formData.chgBasis" :maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="是否窗口办理形式：" label-width="180px">
            <el-switch v-model="formData.isWindow" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <template v-if="formData.isWindow===2">
            <el-form-item label="窗口办理地点：" class="formWidth" label-width="180px" prop="windowLoc" :rules="{ required: true, message: '请输入窗口办理地点', trigger: 'blur' }">
              <el-input v-model="formData.windowLoc" :maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="窗口办理时间：" class="formWidth" label-width="180px" prop="windowTime" :rules="{ required: true, message: '请输入窗口办理时间', trigger: 'blur' }">
              <el-input v-model="formData.windowTime" :maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="窗口办理交通指导：" label-width="180px" prop="trafficGuide" :rules="{ required: true, message: '请输入窗口办理交通指导', trigger: 'blur' }">
              <el-input v-model="formData.trafficGuide" :maxlength="200"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="是否网上办理形式：" label-width="180px">
            <el-switch v-model="formData.isOnline" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="formData.isOnline===2" label="网上办理形式描述：" label-width="180px" prop="onlineLink" :rules="{ required: true, message: '请输入网上办理形式描述', trigger: 'blur' }">
            <el-input v-model="formData.onlineLink" :maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="是否电话办理形式：" label-width="180px">
            <el-switch v-model="formData.isTelDeal" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="formData.isTelDeal===2" label="电话办理形式描述：" label-width="180px" prop="detailTel" :rules="{ required: true, message: '请输入电话办理形式描述', trigger: 'blur' }">
            <el-input v-model="formData.detailTel" :maxlength="100"></el-input>
          </el-form-item>
        </section>
        <h2 id="application-materials">申请材料</h2>
        <section>
          <material-table :disabled="disabled" :materials="formData.materiaList" :is-template="isTemplate" @save="handleSaveMaterials" @view="handleViewMaterials" @load="load()"></material-table>
        </section>
        <h2 id="rights-and-obligations" v-if="guideType==='行政权力'">权利义务救济</h2>
        <section v-if="guideType==='行政权力'">
          <el-form-item label="申请人权力和义务：">
          </el-form-item>
          <el-form-item label="依法享有的权利：" prop="legalRight" :rules="{ required: true, message: '请输入依法享有的权利', trigger: 'blur' }">
            <el-input type="textarea" :rows="3" v-model="formData.legalRight" :maxlength="5000" placeholder="依据相关法律公民享有的权利"></el-input>
          </el-form-item>
          <el-form-item label="依法履行的义务：" prop="legalDuty" :rules="{ required: true, message: '请输入依法履行的义务', trigger: 'blur' }">
            <el-input type="textarea" :rows="3" v-model="formData.legalDuty" :maxlength="5000" placeholder="依据相关法律公民应履行的义务"></el-input>
          </el-form-item>
          <el-form-item label="法律救济 - 行政复议：" label-width="160px">
          </el-form-item>
          <el-form-item label="部门：" class="formWidth" prop="reconDept" :rules="{ required: true, message: '请输入行政复议部门', trigger: 'blur' }">
            <el-input v-model="formData.reconDept" :maxlength="100" placeholder="提供法律救济部门名称"></el-input>
          </el-form-item>
          <el-form-item label="地址：" class="formWidth" prop="reconAddr" :rules="{ required: true, message: '请输入行政复议地址', trigger: 'blur' }">
            <el-input v-model="formData.reconAddr" :maxlength="100" placeholder="提供法律救济部门地址"></el-input>
          </el-form-item>
          <el-form-item label="电话：" class="formWidth" prop="reconTel" :rules="[{ required: true, message: '请输入行政复议电话', trigger: 'blur' },{
            validator: validateNumber,
            trigger: ['change','blur'],
          }]">
            <el-input v-model="formData.reconTel" :maxlength="100" placeholder="提供法律救济部门电话"></el-input>
          </el-form-item>
          <el-form-item label="网址：" class="formWidth" prop="reconUrl" :rules="[{ required: true, message: '请输入行政复议网址', trigger: 'blur' },{
            validator: validateUrl,
            trigger: ['change','blur'],
          }]">
            <el-input v-model="formData.reconUrl" :maxlength="100" placeholder="提供法律救济部门网址"></el-input>
          </el-form-item>
          <el-form-item label="法律救济 - 行政诉讼：" label-width="160px">
          </el-form-item>
          <el-form-item label="部门：" class="formWidth" prop="ltgtDept" :rules="{ required: true, message: '请输入行政诉讼部门', trigger: 'blur' }">
            <el-input v-model="formData.ltgtDept" :maxlength="100" placeholder="提供法律救济部门名称"></el-input>
          </el-form-item>
          <el-form-item label="地址：" class="formWidth" prop="ltgtAddr" :rules="{ required: true, message: '请输入行政诉讼地址', trigger: 'blur' }">
            <el-input v-model="formData.ltgtAddr" :maxlength="100" placeholder="提供法律救济部门地址"></el-input>
          </el-form-item>
          <el-form-item label="电话：" class="formWidth" prop="ltgtTel" :rules="[{ required: true, message: '请输入行政诉讼电话', trigger: 'blur' },{
            validator: validateNumber,
            trigger: ['change','blur'],
          }]">
            <el-input v-model="formData.ltgtTel" :maxlength="100" placeholder="提供法律救济部门电话"></el-input>
          </el-form-item>
          <el-form-item label="网址：" class="formWidth" prop="ltgtUrl" :rules="[{ required: true, message: '请输入行政诉讼网址', trigger: 'blur' },{
            validator: validateUrl,
            trigger: ['change','blur'],
          }]">
            <el-input v-model="formData.ltgtUrl" :maxlength="100" placeholder="提供法律救济部门网址"></el-input>
          </el-form-item>
        </section>
        <h2 id="other-service">其他服务</h2>
        <section>
          <el-form-item v-if="guideType==='行政权力'" label="中介服务：" label-width="180px">
          </el-form-item>
          <el-form-item v-if="guideType==='行政权力'" label="是否存在中介服务：" label-width="180px">
            <el-switch v-model="formData.isAgcy" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <template v-if="formData.isAgcy===2">
            <el-form-item label="中介名称：" class="formWidth" label-width="180px" prop="agcyDept" :rules="{ required: true, message: '请输入中介名称', trigger: 'blur' }">
              <el-input v-model="formData.agcyDept" :maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="服务内容：" class="formWidth" label-width="180px" prop="agcyCont" :rules="{ required: true, message: '请输入服务内容', trigger: 'blur' }">
              <el-input v-model="formData.agcyCont" :maxlength="200"></el-input>
            </el-form-item>
          </template>
          <template v-if="formData.isAgcy===2">
            <el-form-item v-if="guideType==='行政权力'" label="是否收费：" label-width="180px">
              <el-switch v-model="formData.isAgcyChg" :active-value="2" :inactive-value="1">
              </el-switch>
            </el-form-item>
          </template>
          <template v-if="formData.isAgcy===2 && formData.isAgcyChg===2">
            <el-form-item label="收费标准：" class="formWidth" label-width="180px" prop="agcyChgStd" :rules="{ required: true, message: '请输入收费标准', trigger: 'blur' }">
              <el-input v-model="formData.agcyChgStd" :maxlength="200"></el-input>
            </el-form-item>
            <el-form-item label="收费金额：" class="formWidth" label-width="180px" prop="agcyChgAmt" :rules="{ required: true, message: '请输入收费金额', trigger: 'blur' }">
              <el-input-number style="width:200px;" v-model="formData.agcyChgAmt" :precision="2" :step="0.1" :min="0" :max="20000"></el-input-number>
            </el-form-item>
          </template>
          <el-form-item label="创新服务：" label-width="180px">
          </el-form-item>
          <el-form-item label="预约办理：" label-width="180px">
            <el-switch v-model="formData.isApptProc" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <template v-if="formData.isApptProc===2">
            <el-form-item label="预约网址：" label-width="180px" prop="apptUrl" :rules="[{ required: true, message: '请输入预约网址', trigger: 'blur' },{
              validator: validateUrl,
              trigger: ['change','blur'],
            }]">
              <el-input v-model="formData.apptUrl" :maxlength="100"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="网上支付：" label-width="180px">
            <el-switch v-model="formData.isOnlinePay" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <template v-if="formData.isOnlinePay===2">
            <el-form-item label="支付方式：" label-width="180px" prop="payment" :rules="{ required: true, message: '请选择支付方式', trigger: 'change' }">
              <el-radio-group v-model="formData.payment">
                <el-radio v-for="item in dicList['MAT_PAYMENT_TYPE']" :label="+item.value" :key="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
          <el-form-item label="物流快递：" label-width="180px">
            <el-switch v-model="formData.isEps" :active-value="2" :inactive-value="1">
            </el-switch>
          </el-form-item>
          <template v-if="formData.isEps===2">
            <el-form-item label="快递选择：" label-width="180px" prop="epsChoose" :rules="{ required: true, message: '请选择快递', trigger: 'change' }">
              <el-radio-group v-model="formData.epsChoose">
                <el-radio v-for="item in dicList['MAT_EXPRESS_CHOOSE']" :label="+item.value" :key="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
        </section>
        <h2 id="common-problem">常见问题</h2>
        <section>
          <el-form-item label="常见问题：" prop="faq" :rules="{ required: true, message: '请输入常见问题', trigger: 'blur' }">
            <el-input type="textarea" :rows="3" v-model="formData.faq" :maxlength="250" placeholder="申请该事项的常见问题清单"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!disabled" type="primary" @click="handleSubmit('guideForm')">保存</el-button>
          </el-form-item>
        </section>
      </el-form>
    </div>
    <a-anchor class="anchor-wrapper" :get-container="getContainer">
      <a-anchor-link href="#essential-elements" title="1. 基本要素" />
      <a-anchor-link href="#acceptance-link" title="2. 受理环节" />
      <a-anchor-link href="#application-materials" title="3. 申请材料" />
      <a-anchor-link v-if="guideType==='行政权力'" href="#rights-and-obligations" title="4. 权利义务救济" />
      <a-anchor-link href="#other-service" :title="`${guideType==='行政权力' ? '5' : '4'}. 其他服务`" />
      <a-anchor-link href="#common-problem" :title="`${guideType==='行政权力' ? '6' : '5'}. 常见问题`" />
    </a-anchor>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import dialogMixins from '@/mixins/dialog_mixins'
import matFileUploaderList from '@/components/mat-file-uploader-list'
// import relationSelect from '@/components/relation-select'
import { initForm } from './initForm'
import templateSelect from './template-select'
import matterSelect from './matter-select'
import materialTable from './material-table'
import deptSelect from '../DeptSelect'
import { putGuide, postGuide, getGuideById } from '@/api/cbs/guide'
import { getMatterById as getCbsMatterById } from '@/api/cbs/matter'
import { getMatterById as getMdlMatterById } from '@/api/mdl/matter'
function initMatForm () {
  return {
    name: '',
    encrp: '',
    type: [],
  }
}
export default {
  mixins: [dialogMixins],
  components: {
    templateSelect,
    matterSelect,
    materialTable,
    matFileUploaderList,
    deptSelect,
  },
  props: {
    isTemplate: {
      type: Boolean,
      required: false,
      default: false,
    },
    isMatter: {
      type: Boolean,
      required: false,
      default: false,
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    form: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  // mounted () {
  //   console.log('form',this.formData,this.formData.结果样本,this.formData.ltgtDept)
  // },
  data () {
    const getContainer = () => {
      return document.querySelector('.form-wrapper')
    }
    return {
      currentMatId: null,
      getContainer,
      formData: this.form,
      matForm: initMatForm(),
      materialNrTableForm: [],
      validateNumber: (rule, value, callback) => {
        let reg = /^[0-9-]+$/g
        if(value === ''){
          callback()
        }else if(!reg.test(value)){
          callback(new Error("只能输入数字"))
        }else{
          callback()
        }
      },
      validateUrl: (rule, value, callback) =>{
        var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
        + '|' // 允许IP和DOMAIN（域名）
        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
        + '[a-z]{2,6})' // first level domain- .com or .museum
        + '(:[0-9]{1,4})?' // 端口- :80
        + '((/?)|' // a slash isn't required if there is no file name
        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
        var reg =new RegExp(strRegex)
        if(!reg.test(value)){
          callback(new Error("输入格式有误，参照https://www.baidu.com"))
        }else{
          callback()
        }
      },
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    fileTypeNameMap () {
      // console.log("我要开始转义的",this.dicList['MAT_UPLOAD_FILE_TYPE'],_.keyBy(this.dicList['MAT_UPLOAD_FILE_TYPE'], o=>'file'+o.value))
      return _.keyBy(this.dicList['MAT_UPLOAD_FILE_TYPE'], o=>'file'+o.value)
    },
    guideType () {
      if (this.formData.type === 1) {
        return '行政权力'
      } else {
        return '公共服务'
      }
    },
  },
  created () {
    this.loadMat()
    this.loadFiles()
    this.$nextTick(()=>{
      this.$refs['guideForm'] ? this.$refs['guideForm'].clearValidate(): ''
    })
  },
  watch : {
    'formData.file3': {
      // deep: true,
      handler () {
        this.$refs['guideForm'] ? this.$refs['guideForm'].validateField('file3'): ''
      },
    },
    'formData.file2': {
      // deep: true,
      handler () {
        this.$refs['guideForm'] ? this.$refs['guideForm'].validateField('file2'): ''
      },
    },
    'formData.file1': {
      // deep: true,
      handler () {
        this.$refs['guideForm'] ? this.$refs['guideForm'].validateField('file1'): ''
      },
    },
  },
  methods: {
    load () {
      getGuideById(this.formData.id).then(res => {
        this.formData = _.merge(initForm(), res.data)
      })
    },
    loadFiles () {
      const fileTypeNameMap = { ...this.fileTypeNameMap }
      const sampFileGroupMap = _.groupBy(this.formData.fileList, 'sampType')
      if (this.formData.fileList.length) {
        for (const key in fileTypeNameMap) {
          if (fileTypeNameMap.hasOwnProperty(key)) {
            const fileGroup =
              sampFileGroupMap[fileTypeNameMap[key].value] || []
            this.$set(this.formData, key, fileGroup)
          }
        }
      } else {
        for (const key in fileTypeNameMap) {
          if (fileTypeNameMap.hasOwnProperty(key)) {
            this.$set(this.formData, key, [])
          }
        }
      }
    },
    loadMat () {
      if (this.formData.matId) {
        if (this.isTemplate) {
          getMdlMatterById(this.formData.matId).then(res => {
            this.matForm = res.data
          })
        } else {
          getCbsMatterById(this.formData.matId).then(res => {
            this.matForm = res.data
          })
        }
      }
    },
    handleFillData (data) {
      data.materiaList = []
      this.formData = { ...this.formData, ...data }
      if (this.currentMatId) {
        this.formData.matId = this.currentMatId
      } else {
        this.formData.matId = null
      }
    },
    handleFillMatterData (data) {
      this.matForm = data
      this.formData.matId = data.id
      this.formData.type = +data.type[0]
      this.formData.operDept = data.deptId
      this.currentMatId = data.id
    },
    _makeFids () {
      const fileTypeNameMap = { ...this.fileTypeNameMap }
      const fids = []
      for (const key in fileTypeNameMap) {
        if (fileTypeNameMap.hasOwnProperty(key)) {
          if (this.formData[key]) {
            const ids = this.formData[key].map(m => m.id)
            fids.push(...ids)
          }
        }
      }
      this.$set(this.formData, 'fids', fids)
    },
    handleSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._makeFids()
          // TODO: 提交时只传材料ID数组
          if (this.isMatter) {
            this.$emit('saveEditor', this.formData)
          } else {
            if (this.isEdit) {
              putGuide(this.formData).then(() => {
                this.$emit('hideDialog')
                this.$message({
                  message: '保存成功',
                  type: 'success',
                })
              })
            } else {
              postGuide(this.formData).then(() => {
                this.$emit('hideDialog')
                this.$message({
                  message: '保存成功',
                  type: 'success',
                })
              })
            }
          }
        } else {
          this.$message({
            message: '警告, 表单未通过验证或者字段未补全',
            type: 'warning',
          })
        }
      })
    },
    handleSaveMaterials (materialList) {
      this.$set(this.formData, 'materiaList', materialList)
    },
    handleViewMaterials (materialList) {
      this.$set(this.formData, 'materiaList', materialList)
    },
  },
}
</script>
<style lang="scss" scoped>
.formWidth3 {
  width: 33.3%;
}
.complex-form {
  display: flex;
  justify-content: space-between;
  .form-wrapper {
    height: calc(100vh - 245px);
    overflow-y: scroll;
    flex: 1;
    padding-right: 20px;
    &::-webkit-scrollbar {
      display: none;
    }
    h2 {
      border-left: 3px solid #1e90ff;
      padding-left: 16px;
      font-size: 24px;
      line-height: 32px;
      color: #333333;
      font-family: Lato, Chinese Quote, -apple-system, BlinkMacSystemFont,
        Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue,
        Helvetica, Arial, sans-serif;
      margin: 1em 0 1em;
      font-weight: 500;
      clear: both;
    }
  }
  .anchor-wrapper {
    margin-right: 30px;
  }
}
</style>
