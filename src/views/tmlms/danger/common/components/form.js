const MAPS = {
  driveStandard: {
    'value1': '长度≥45米非远洋渔业船舶配备一级船长、一级船副和助理船副各1名',
    'value2': '36米≤长度<45米船舶配备二级船长、二级船副和助理船副各1名',
    'value3': '24米<长度<36米船舶配备二级船长和二级船副各1名',
    'value4': '12米≤长度<24米船舶配备三级船长和助理船副各1名',
  },
  turbineStandard: {
    'value1': '主机总功率≥3000千瓦渔业船舶一级轮机长和一级管轮各1名，助理管轮2名',
    'value2': '750千瓦≤主机总功率<3000千瓦渔业船舶-级轮机长、一级管轮和助理管轮各1名',
    'value3': '450千瓦≤主机总功率<750千瓦渔业船舶二级轮机长、二级管轮和助理管轮各1名',
    'value4': '250千瓦≤主机总功率<450千瓦渔业船舶配备二级轮机长和二级管轮各1名',
  },
  crew: '普通船员持有普通船员证书',
}
import constText from '../text'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      shipInfo: {},
      form: {
        shipName: '',
        enterprise: '',
        registrant: '',
        shipNo: '',
        address: '',
        // 船员配置
        driveStandardResult: '', //驾驶职务船员最低配员标准
        driveStandardImage: [],
        turbineStandardResult: '', //轮机职务船员最低配员标准
        turbineStandardImage: [],
        crewResult: '',
        crewImage: [],
        // 救生设备
        lifeRaftResult: '',
        lifeRaftImage: [],
        ringBuoyFirstResult: '',
        ringBuoyFirstImage: [],
        ringBuoySecondResult: '',
        ringBuoySecondImage: [],
        ringBuoyThirdResult: '',
        ringBuoyThirdImage: [],
        ringBuoyFourthResult: '',
        ringBuoyFourthImage: [],
        ringBuoyFifthResult: '',
        ringBuoyFifthImage: [],
        lifeJackFirstResult: '',
        lifeJackFirstImage: [],
        lifeJackSecondResult: '',
        lifeJackSecondImage: [],
        lifeJackThirdResult: '',
        lifeJackThirdImage: [],
        lifeJackFourthResult: '',
        lifeJackFourthImage: [],
        otherPreserverFirstResult: '',
        otherPreserverFirstImage: [],
        otherPreserverSecondResult: '',
        otherPreserverSecondImage: [],
        otherPreserverThirdResult: '',
        otherPreserverThirdImage: [],
        // 消防设备
        extinguisherFirstResult: '',
        extinguisherFirstImage: [],
        extinguisherSecondResult: '',
        extinguisherSecondImage: [],
        extinguisherThirdResult: '',
        extinguisherThirdImage: [],
        waterFireFightingFirstResult: '',
        waterFireFightingFirstImage: [],
        // 信号设备
        signalLampResult: '',
        signalLampImage: [],
        signalLampTypeResult: '',
        signalLampTypeImage: [],
        signalLampStatusResult: '',
        signalLampStatusImage: [],
        // 通道设备
        communicationEquipmentResult: '',
        communicationEquipmentImage: [],
        navigationalAidsResult: '',
        navigationalAidsImage: [],
        // 其他情况
        escapeTrunkResult: '',
        escapeTrunkImage: [],
        fishHoldResult: '',
        fishHoldImage: [],
        wireResult: '',
        wireImage: [],
        liquefiedBottleResult: '',
        liquefiedBottleImage: [],
        behaviorResult: '',
        behaviorImage: [],
        regulationResult: '',
        regulationImage: [],
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    options () {
      return [
        {
          title: '基本信息',
          type: 'info',
          column: [
            { label: '船名号', value: 'shipName', disabled: true },
            { label: '排查单位', value: 'enterprise', disabled: true },
            { label: '排查人员', value: 'registrant', disabled: true },
            { label: '排查地点', value: 'address', required: true, spanHistory: 6 },
            { label: '排查时间', value: 'updateTime', type: 'text', spanHistory: 6 },
          ],
        },
        {
          title: '船员配置',
          column: [
            {
              title: '驾驶职务船员最低配员标准',
              props: [
                { title: this.driveStandardTitle || '', value: 'driveStandard', required: true },
              ],
            },
            {
              title: '轮机职务船员最低配员标准',
              props: [
                { title: this.turbineStandardTitle || '', value: 'turbineStandard', required: true },
              ],
            },
            {
              title: '普通船员',
              props: [
                { title: MAPS.crew || '', value: 'crew', required: true },
              ],
            },
          ],
        },
        {
          title: '救生设备',
          column: [
            {
              title: '救生筏',
              props: [
                { title: constText.lifeRaft, value: 'lifeRaft', required: true },
              ],
            },
            {
              title: '救生圈',
              props: [
                { title: constText.ringBuoyFirst, value: 'ringBuoyFirst', required: true },
                { title: constText.ringBuoySecond, value: 'ringBuoySecond', required: true },
                { title: constText.ringBuoyThird, value: 'ringBuoyThird', required: true },
                { title: constText.ringBuoyFourth, value: 'ringBuoyFourth', required: true },
                { title: constText.ringBuoyFifth, value: 'ringBuoyFifth', required: true },
              ],
            },
            {
              title: '救生衣',
              props: [
                { title: constText.lifeJackFirst, value: 'lifeJackFirst', required: true },
                { title: constText.lifeJackSecond, value: 'lifeJackSecond', required: true },
                { title: constText.lifeJackThird, value: 'lifeJackThird', required: true },
                { title: constText.lifeJackFourth, value: 'lifeJackFourth', required: true },
              ],
            },
            {
              title: '其他救生设备',
              props: [
                { title: constText.otherPreserverFirst, value: 'otherPreserverFirst', required: true },
                { title: constText.otherPreserverSecond, value: 'otherPreserverSecond', required: true },
                { title: constText.otherPreserverThird, value: 'otherPreserverThird', required: true },
              ],
            },
          ],
        },
        {
          title: '消防设备',
          column: [
            {
              title: '灭火器',
              props: [
                { title: constText.extinguisherFirst, value: 'extinguisherFirst', required: true },
                { title: constText.extinguisherSecond, value: 'extinguisherSecond', required: true },
                { title: constText.extinguisherThird, value: 'extinguisherThird', required: true },
              ],
            },
            {
              title: '水消防',
              props: [
                { title: constText.waterFireFightingFirst, value: 'waterFireFightingFirst', required: true },
              ],
            },
          ],
        },
        {
          title: '信号设备',
          column: [
            {
              title: '航行基本号灯',
              props: [
                { title: constText.signalLamp, value: 'signalLamp', required: true },
              ],
            },
            {
              title: '号型',
              props: [
                { title: constText.signalLampType, value: 'signalLampType', required: true },
              ],
            },
            {
              title: '号笛、号钟',
              props: [
                { title: constText.signalLampStatus, value: 'signalLampStatus', required: true },
              ],
            },
          ],
        },
        {
          title: '通道设备',
          column: [
            {
              title: '通信设备',
              props: [
                { title: constText.communicationEquipment, value: 'communicationEquipment', required: true },
              ],
            },
            {
              title: '导航设备',
              props: [
                { title: constText.navigationalAids, value: 'navigationalAids', required: true },
              ],
            },
          ],
        },
        {
          title: '其他情况',
          column: [
            {
              title: '逃生通道',
              props: [
                { title: constText.escapeTrunk, value: 'escapeTrunk', required: true },
              ],
            },
            {
              title: '鱼舱',
              props: [
                { title: constText.fishHold, value: 'fishHold', required: true },
              ],
            },
            {
              title: '电线线路',
              props: [
                { title: constText.wire, value: 'wire', required: true },
              ],
            },
            {
              title: '液化气瓶',
              props: [
                { title: constText.liquefiedBottle, value: 'liquefiedBottle', required: true },
              ],
            },
            {
              title: '“五超”行为',
              props: [
                { title: constText.behavior, value: 'behavior', required: true },
              ],
            },
            {
              title: '规章锢度',
              props: [
                { title: constText.regulation, value: 'regulation', required: true },
              ],
            },
          ],
        },
      ]
    },
    driveStandardTitle () {
      let shipInfo = this.shipInfo
      if (shipInfo && shipInfo.hullLength) {
        let hullLength = shipInfo.hullLength
        let title = ''
        if (hullLength >= 45) {
          title = MAPS.driveStandard.value1
        } else if (hullLength < 45 && hullLength >= 36) {
          title = MAPS.driveStandard.value2
        } else if (hullLength < 36 && hullLength >= 24) {
          title = MAPS.driveStandard.value3
        } else if (hullLength < 24 && hullLength >= 12) {
          title = MAPS.driveStandard.value4
        }
        return title
      }
      return ''
    },
    turbineStandardTitle () {
      let shipInfo = this.shipInfo
      if (shipInfo.dualPower) {
        let dualPower = shipInfo.dualPower
        let title = ''
        if (dualPower >= 3000) {
          title = MAPS.turbineStandard.value1
        } else if (dualPower < 3000 && dualPower >= 750) {
          title = MAPS.turbineStandard.value2
        } else if (dualPower < 750 && dualPower >= 450) {
          title = MAPS.turbineStandard.value3
        } else if (dualPower < 450 && dualPower >= 250) {
          title = MAPS.turbineStandard.value4
        }
        return title
      }
      return ''
    },
  },
  methods: {
    onGoBack () {
      this.$emit('back')
    },
    setFormInfo () {
      this.form.registrant = this.userInfo.realName
			this.form.enterprise = this.userInfo.realName
    },
    setFormShipInfo () {
      this.form.shipName = this.shipInfo.shipName
      this.form.shipNo = this.shipInfo.shipNo
    },
    setForm (data, name = 'form') {
      for (let key in data) {
        if (key.indexOf('Image') > -1) {
          let result = []
          if (data[key]) {
            let val = data[key].split(',')
            let obj = {}
            val.forEach((item) => {
              obj.url = item
            })
            result.push(obj)
          }
          this.$set(this[name], key, result)
          // this[name][key] = result
        } else {
          this.$set(this[name], key, data[key])
          // this[name][key] = data[key]
        }
      }
    },
    setResult (data) {
      for (let key in data) {
        let val = data[key]
        if (Array.isArray(val)) {
          let result = []
          result = val.map((item) => {
            return item.url
          })
          data[key] = result.join(',')
        }
      }
    },
  },
}