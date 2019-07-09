<template>
  <div id="contract-print">
    <div id="contract" class="body-width">
      <div class="con-cover">
        <p class="cover-num">合同编号：{{formData.contractNumber}}</p>
        <h1>渔船劳务（雇员）合同</h1>
        <!-- <h2>模 板</h2> -->
        <div class="cover-tip">
          <p>象山县渔业船员综合服务中心 &nbsp;&nbsp;编制</p>
          <p>2019年版</p>
        </div>
      </div>
      <table class="contract-table">
        <tr>
          <th rowspan="6">甲方<p>(雇主)</p></th>
          <td><label>船名</label></td>
          <td>{{formData.shipName}}</td>
          <td colspan="2"><label>所有权登记号</label></td>
          <td>{{formData.shipLicenses}}</td>
        </tr>
        <tr>
          <td><label>性质</label></td>
          <td colspan="4">
            <span v-for="item in shipAttrDict" :key="item.value">
              <input v-if="item.value == formData.shipAttr" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              {{item.label}}
            </span>
            <span>(请"√"选)</span>
          </td>
        </tr>
        <tr>
          <td><label>船舶所有人</label></td>
          <td>{{formData.shipowner}}</td>
          <td colspan="2"><label>身份证号</label></td>
          <td>{{formData.shipownerIdcard}}</td>
        </tr>
        <tr>
          <td><label>联系电话</label></td>
          <td>{{formData.shipownerPhone}}</td>
          <td colspan="2"><label>家庭地址</label></td>
          <td>{{formData.shipownerAddr}}</td>
        </tr>
        <tr>
          <td><label>委托代理人</label></td>
          <td>{{formData.shipownerAgent}}</td>
          <td colspan="2"><label>身份证号</label></td>
          <td>{{formData.shipownerAgentIdcard}}</td>
        </tr>
        <tr>
          <td><label>联系电话</label></td>
          <td>{{formData.shipownerAgentPhone}}</td>
          <td colspan="2"><label>家庭地址</label></td>
          <td>{{formData.shipownerAgentAddr}}</td>
        </tr>
        <tr>
          <th rowspan="4">乙方<p>(雇员)</p></th>
          <td><label>姓名</label></td>
          <td>{{formData.employeeName}}</td>
          <td colspan="2"><label>身份证号</label></td>
          <td>{{formData.employeeIdcard}}</td>
        </tr>
        <tr>
          <td><label>联系电话</label></td>
          <td>{{formData.employeePhone}}</td>
          <td colspan="2"><label>现有资格证书</label></td>
          <td>{{formData.employeeCert}}</td>
        </tr>
        <tr>
          <td><label>经常居住地/家庭地址</label></td>
          <td>{{formData.employeeAddr}}</td>
          <td colspan="2"><label>联系人及联系电话</label></td>
          <td>{{formData.employeeLinkMan + `(${formData.employeeLinkPhone})`}}</td>
        </tr>
        <tr class="paylist">
          <td><label>劳动报酬支付账户</label></td>
          <td colspan="4" class="textL10">
            <span v-for="item in employeePayTypeDict" :key="item.value">
              <input v-if="item.value == formData.employeePayType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              {{item.label}}
            </span>
           <span>（请在选项“ □” 上打“ √” 并下面填写相关内容）</span>
           <p class="margint10 class="textL10"">支付账号：523653542</p>
          </td>
        </tr>
        <tr>
          <th rowspan="4">合同期限(请"√"选)</th>
          <td rowspan="2" class="check">
            <span>
              <input v-if="1 == formData.periodType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              期限
            </span>
          </td>
          <td>
            <div v-if="1 == formData.periodType">
              <p>开始时间</p>
              <p>{{formData.periodDateStart}}</p>
            </div>
          </td>
          <td rowspan="2" colspan="2" class="check">
            <span>
              <input v-if="2 == formData.periodType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              航次
            </span>
          </td>
          <td rowspan="2">
            <div v-if="2 == formData.periodType">
              <p>{{formData.periodPortStart}}登船起</p>
              <p>{{formData.periodPortEnd}}下船止</p>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div v-if="1 == formData.periodType">
              <p>结束时间</p>
              <p>{{formData.periodDateEnd}}</p>
            </div>
          </td>
        </tr>
        <tr>                                                                                              
          <td rowspan="2" class="check">
            <span>
              <input v-if="3 == formData.periodType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              以工作任务计
            </span>
          <td colspan="2">工作任务内容及时间</td>
          <td colspan="2">任务完成标志</td>
        </tr>
        <tr>
          <td colspan="2">
            {{formData.periodWorkContent}}
          </td>
          <td colspan="2">
            {{formData.periodWorkSuccess}}
          </td>
        </tr>
        <tr>
          <th>工作内容</th>
          <td colspan="5">
            <p>{{formData.workContent}}</p>
          </td>
        </tr>
        <tr>
          <th rowspan="7">劳务报酬</th>
          <td rowspan="4"><label>计算方式</label></td>
          <td class="check">
            <span>
              <input v-if="1 == formData.payComputeType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              按自然月计算
            </span>
          <td colspan="3" class="check">
            <span v-if="1 == formData.payComputeType">每月人民币{{formData.payMoney}}元(大写：{{moneyTransilate(formData.payMoney)}})</span>
          </td>
        </tr>
        <tr>
          <td class="check">                                      
            <span>
              <input v-if="2 == formData.payComputeType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              按雇佣天数计算
            </span>
          <td colspan="3" class="check">
          <span v-if="2 == formData.payComputeType">每天人民币{{formData.payMoney}}元(大写：{{moneyTransilate(formData.payMoney)}})</span>
          </td>
        </tr>
        <tr>
          <td class="check">
            <span>
              <input v-if="3 == formData.payComputeType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              按登船至下船日期计算
            </span>
          <td colspan="3" class="check">        
          <span v-if="3 == formData.payComputeType">每天人民币{{formData.payMoney}}元(大写：{{moneyTransilate(formData.payMoney)}})</span>
          </td>
        </tr>
        <tr>
          <td class="check">
            <span>
              <input v-if="4 == formData.payComputeType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              按工作任务计算
            </span>
          <td colspan="3" class="check set-width">
          <span v-if="3 == formData.payComputeType">{{formData.payMoney}}元(大写：{{moneyTransilate(formData.payMoney)}})</span>
          </td>
        </tr>
        <tr>
          <td rowspan="3"><label>支付方式</label></td>
          <td class="check">
            <span>
              <input v-if="1 == formData.payType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              定期支付
            </span>
          <td colspan="3" class="check set-width">
            <span v-if="1 == formData.payType">
              每月{{formData.payTypeValue}}号支付
            </span>
          </td>
        </tr>
        <tr>
          <td class="check">
            <span>
              <input v-if="2 == formData.payType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              一次性支付
            </span>
          <td colspan="3" class="check">
            <span v-if="2 == formData.payType">
              期限结束、航次完成或工作任务完成后的{{formData.payTypeValue}}日内支付
            </span>
          </td>
        </tr>
        <tr>
          <td class="check">
             <span>
              <input v-if="3 == formData.payType" checked="true" type="checkbox"/>
              <input v-else type="checkbox"/>
              不定期支付
            </span>
          <td colspan="3" class="check">
          </td>
        </tr>
      </table>
      <div class="con-detail" >
        <h2>一般条款</h2>
        <h3>一、甲方权利与义务</h3>
        <p>1.甲方营运渔船应具备船舶有效证件，并按照法律法规、行业规范配备救生、消防、无线电等应急设备，确保应急设备的正常使用和船舶的安全适航。</p>
        <p>2.甲方应依法依规组织航行、捕捞等生产作业，不得从事走私等违法违规
          活动。如遇自然灾害等不可抗力事件、禁渔期等法定情形、或其他不适宜开展生
          产作业的情形时，应当及时停止作业或返航。</p>
        <p>3.甲方应严格执行国家劳动安全规定和标准，为乙方提供符合国家、行业
          规定的安全生产作业条件和必要的防护用品，并为乙方投保相应的人身伤害保险。</p>
        <p>4.甲方应告知乙方作业渔船和工作任务存在的足以影响乙方人身安全的危
          险因素以及防范应急措施。甲方应当不定期组织开展技术和安全培训，为乙方提
          供技术和安全指导。</p>
        <p>5.乙方在从事雇佣活动中遭受人身损害的，甲方应当承担赔偿责任。乙方
          因本人故意造成的自身伤害，甲方不负赔偿责任。</p>
        <p>6.甲方应按照合同约定及时支付乙方现金劳务报酬或将乙方劳务报酬支付
          乙方提供的劳务报酬支付账户。</p>
        <h3>二、乙方的权利和义务</h3>
        <p>1.乙方有权按照合同约定领取劳务报酬。</p>
        <p>2.乙方在进行生产作业前，应具备船员四项基本技能证书（四小证）及相
          应工作任务必备的适任证书，并确保提供的证件和信息的真实、准确、有效。乙
          方如患有严重疾病的，应在签订本合同前，如实告知甲方。</p>
        <p>3.乙方同意根据甲方生产需求和自身技能情况从事船舶相应的工作任务。
          乙方应当掌握生产作业技能，了解渔业生产工作环境特性，尽责完成捕捞生产及
          甲方安排的其他生产作业。</p>
        <p>4.乙方在从事生产作业时，应穿戴相应防护用具。乙方有义务及时报告事
          故隐患和不安全因素，对渔船存在的安全隐患提出改正意见。在安全隐患未排除
          前，有权拒绝上船作业。对甲方违章指挥和强令冒险作业，发现直接危及人身安全的紧急情况时，可以停止作业。
        </p>
        <p>5.乙方在合同期间非经甲方同意、或非因合同约定、法律规定，不得擅自
          旷工、离船或终止生产作业。如乙方有上述行为，给甲方造成损失的，应当予以
          赔偿。</p>
        <p>6.乙方应当依法依规从事生产作业活动。在生产作业期间，不得从事酗酒、
          赌博、盗窃、斗殴、擅自带无关人员上船及其他严重影响生产作业的活动。非经
          甲方同意，不得要求停产回港，在船舶返航靠岸时不得擅自离船或上岸。</p>
        <h3>三、合同终止与解除</h3>
        <p>1.当出现以下特殊情形时，甲方可以提前 10日通知乙方终止合同：（1）
          甲方因故超过 30日不能继续投入生产的；（2）甲方难以继续经营的。</p>
        <p>2.当乙方出现下列情形之一时，甲方有权解除合同：（1）乙方不具备船员
          四项基本技能证书（四小证）及相应工作任务必备的适任证书的； （2）乙方违规
          操作，导致财产损失、人员伤亡的，或者经甲方提出，拒不改正的； （3）乙方无
          法胜任相应工作任务的；（4）故意或重大过失，给甲方造成重大损失的；（5）
          负有刑事责任尚未执行完毕或处于通缉中的； （6）在签订合同时，隐瞒足以影响
          生产工作的病情的； （7）乙方从事酗酒、赌博、盗窃、斗殴、擅自带无关人员上
          船及其他严重影响生产作业的活动；（8）乙方擅自旷工、离船或终止生产作业；
          （9）其他对完成本合同约定的工作任务造成严重影响。</p>
        <p>3.当甲方出现以下情形之一时，乙方有权解除合同：（1）甲方以暴力、威
          胁等其他足以强迫乙方劳动的手段强迫乙方劳动； （2）甲方强迫乙方从事非法活
          动的；（3）甲方未按照合同约定支付劳务报酬或提供劳动条件；（4）甲方签订
          合同时未告知乙方作业渔船和工作任务存在的足以影响乙方人身安全危险因素
          以及防范应急措施。</p>
        <h3>四、其他约定</h3>
        <p>1.本合同项下的通知和法律文书的送达，均应根据甲方和乙方在前表格中
          记载的地址进行并应以书面通知的方式进行变更。任何非上述方式的通知、送达
          均不视为本合同下有效的通知和/ 或送达。</p>
        <p>2.甲方应按照乙方提供的劳务报酬支付账户支付报酬，如乙方要求变更账
          户信息，则应提前 5个工作日将账户信息变更情况书面通知甲方，否则甲方不承
          担汇款失误的责任。</p>
        <p>3.凡因本合同引起的或与本合同有关的任何争议，双方应友好协商解决；
          无法协商或协商不成的，任何一方均有权向宁波海事法院提起诉讼。
        </p>
        <p>4.本合同一式四份，甲、乙、见证人及主管部门各存一份，自甲乙双方或
          其代理人签章或按指印之日起生效。
        </p>
        <p>5.本合同未尽事宜，可由双方在合同“ 特别约定” 处明示约定；如 “ 特别约定”
          内容与本合同其他部分产生冲突，以 “ 特别约定” 为准。
        </p>
        <h3>五、特别约定</h3>
        <p class="special" v-if="formData.content.length > 0">{{formData.content}}</p>
        <p v-else> 无 </p>
      </div>
      <div class="sign">
        <h3>签署：</h3>
        <ul class="sign-name">
          <li>甲方：</li>
          <li>乙方：</li>
          <li>签署日期：<span><i>年</i><i>月</i><i>日</i></span></li>
          <li>签署日期：<span><i>年</i><i>月</i><i>日</i></span></li>
        </ul>
        <ul class="sign-see">
          <li>见证人：</li>
          <li>签署日期：<span><i>年</i><i>月</i><i>日</i></span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'print',
  props: {
    formData: {},
    shipAttrDict: {},
    employeePayTypeDict: {},
    periodTypeDict: {},
    payComputeTypeDict: {},
    payTypeDict: {},
  },
  methods: {
    moneyTransilate (number) {
      if (number == '') {
        return ''
      }
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(number)) {
        return '数据非法'
      }
      let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分'
      let str = ''
      number += '00'
      var p = number.indexOf('.')
      if (p >= 0) {
        number = number.substring(0, p) + number.substr(p + 1, 2)
      }
      unit = unit.substr(unit.length - number.length)
      for (var i=0; i < number.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(number.charAt(i)) + unit.charAt(i)
      }
      return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|元)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟').replace(/^元零?|零分/g, '').replace(/(元|角)$/g, '$1整')
    },
  },
}
</script>