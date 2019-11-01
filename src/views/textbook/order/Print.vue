<template>
  <div>
    <div style="text-align:center;font-size:25px">全国渔业船员培训统编教材订购清单</div>
    <el-table
      :data="tableData"
      :span-method = "objectSpanMethod"
      border
      style="width: 100%">
      <el-table-column prop="createTime" label="日期" width="50" align="center"></el-table-column>
      <el-table-column prop="department" label="单位" width="70" align="center"></el-table-column>
      <el-table-column prop="address" label="收件地址" width="80" align="center"></el-table-column>
      <el-table-column prop="contactName" label="联系人" width="50" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机" width="70" align="center"></el-table-column>
      <el-table-column prop="title" label="书 目" width="120" align="center"></el-table-column>
      <el-table-column prop="price" label="定价（元）" width="70" align="center"></el-table-column>
      <el-table-column prop="quantity" label="订购数（册）" width="70" align="center"></el-table-column>
      <el-table-column prop="total" label="小计金额（元）" width="70" align="center"></el-table-column>
      <el-table-column prop="tso" label="大写合计（元）" width="70" align="center"></el-table-column>
    </el-table>
    <table style="border: 1px solid #EBEEF5">
      <tr >
        <th style="border: 1px solid #EBEEF5; width: 510px; text-align: center">合计</th>
        <th style="border: 1px solid #EBEEF5; width: 70px; text-align: center">{{tolmun}}</th>
        <th style="border: 1px solid #EBEEF5; width: 70px; text-align: center">{{tolmen}}</th>
      </tr>
    </table>
    <div style="border: 1px solid #EBEEF5; width: 360px; height:150px; float:left">
      <div>付款方信息</div>
      <div>名       称：  {{form.payerTitle}}</div>
      <div>纳税人识别号：{{form.payerTaxNum}}</div>
      <div>地 址、电 话：{{form.payerAddress}}，{{form.payerPhone}}</div>
      <div>开户行及账号：{{form.payerBank}}，{{form.payerAccount}}</div>
    </div>
    <div style="border: 1px solid #EBEEF5; width: 360px; height:150px; float:left">
      <div>收款方信息</div>
      <div>名       称：</div>
      <div>纳税人识别号：</div>
      <div>地 址、电 话：</div>
      <div>开户行及账号：</div>
    </div>
  </div>
</template>
<script>
import { getBookOrderDetail } from '@/api/bookorder'
export default {
  data () {
    return {
      tableData: [],
      rows: 0,
      tolmun: 0,
      tolmen: 0,
      form: {
        payerTitle: '',
        payerTaxNum: '',
        payerAddress: '',
        payerPhone: '',
        payerBank: '',
        payerAccount: '',
      },
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getBookOrderDetail(this.$route.params.id).then(data => {
        this.rows = data.data.data.tybBookOrderLists.length
        // this.form.payerTitle = data.data.data.payerTitle
        // this.form.payerTaxNum = data.data.data.payerTaxNum
        // this.form.payerAddress = data.data.data.payerAddress
        // this.form.payerAddress = data.data.data.payerAddress
        this.form = data.data.data
        data.data.data.tybBookOrderLists.forEach(v => {
          let obj = {
            createTime: data.data.data.createTime.substring(0, 10),
            department: data.data.data.department,
            address: data.data.data.address,
            contactName: data.data.data.contactName,
            phone: data.data.data.phone,
          }
          this.$set(obj, 'title', v.title)
          this.$set(obj, 'price', v.price)
          this.$set(obj, 'quantity', v.quantity)
          this.$set(obj, 'total', v.quantity*v.price)
          this.tableData.push(obj)
        })
        this.tableData.forEach(m => {
          this.tolmun += m.quantity
          this.tolmen += m.total
        })
        this.$set(this.tableData[0], 'tso', this.moneyTransilate(this.tolmen))
      })
    },
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
    objectSpanMethod ({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 9) {
        if (rowIndex === 0) {
          return {
            rowspan: this.rows,
            colspan: 1,
          }
        } else {
          return{
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    },
  },
}
</script>