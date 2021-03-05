import constText from '../../common/text'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      constText,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      form: {
        shipName: '',
        enterprise: '',
        registrant: '',
        shipNo: '',
        address: '',
        id: '',
        lastId: '',
        // 四种机器
        machineResult: '',
        machineImage: [],
        // 救生设备
        lifeRaftResult: '',
        lifeRaftImage: [],
        otherPreserverFirstResult: '',
        otherPreserverFirstImage: [],
        otherPreserverSecondResult: '',
        otherPreserverSecondImage: [],
        // 警报设备
        alarmFirstResult: '',
        alarmFirstImage: [],
        alarmSecondResult: '',
        alarmSecondImage: [],
        // 信号设备
        signalLampResult: '',
        signalLampImage: [],
        signalLampTypeResult: '',
        signalLampTypeImage: [],
        signalLampStatusResult: '',
        signalLampStatusImage: [],
        // 消防、防火情况
        waterFireFightingFirstResult: '',
        waterFireFightingFirstImage: [],
        waterFireFightingSecondResult: '',
        waterFireFightingSecondImage: [],
        kitchenFirstResult: '',
        kitchenFirstImage: [],
        kitchenSecondResult: '',
        kitchenSecondImage: [],
        kitchenThirdResult: '',
        kitchenThirdImage: [],
        engineRoomFirstResult: '',
        engineRoomFirstImage: [],
        engineRoomSecondResult: '',
        engineRoomSecondImage: [],
        engineRoomThirdResult: '',
        engineRoomThirdImage: [],
        engineRoomFourthResult: '',
        engineRoomFourthImage: [],
        electricAccessoryFirstResult: '',
        electricAccessoryFirstImage: [],
        electricAccessorySecondResult: '',
        electricAccessorySecondImage: [],
        // 其他情况
        fishingEquipmentFirstResult: '',
        fishingEquipmentSecondImage: [],
        hullFirstResult: '',
        hullFirstImage: [],
        hullSecondResult: '',
        hullSecondImage: [],
        hullThirdResult: '',
        hullThirdImage: [],
        submarineValveResult: '',
        submarineValveImage: [],
        catchStorageRoomResult: '',
        catchStorageRoomImage: [],
        engineRoomResult: '',
        engineRoomImage: [],
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
          title: '四种机器',
          column: [
            {
              title: '主机、辅机、舵机、锚机',
              props: [
                { title: this.constText.machine || '', value: 'machine', required: true },
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
                { title: this.constText.lifeRaft || '', value: 'lifeRaft', required: true },
              ],
            },
            {
              title: '其他救生设备',
              props: [
                { title: this.constText.otherPreserverFirst1 || '', value: 'otherPreserverFirst', required: true },
                { title: this.constText.otherPreserverSecond1 || '', value: 'otherPreserverSecond', required: true },
              ],
            },
          ],
        },
        {
          title: '警报设备',
          column: [
            {
              title: '氮泄漏监控报警系统',
              props: [
                { title: this.constText.alarmFirst || '', value: 'alarmFirst', required: true },
              ],
            },
            {
              title: '弃船蓍报设备',
              props: [
                { title: this.constText.alarmSecond || '', value: 'alarmSecond', required: true },
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
                { title: this.constText.signalLamp1 || '', value: 'signalLamp', required: true },
              ],
            },
            {
              title: '号型',
              props: [
                { title: this.constText.signalLampType1 || '', value: 'signalLampType', required: true },
              ],
            },
            {
              title: '号笛、号钟',
              props: [
                { title: this.constText.signalLampStatus1 || '', value: 'signalLampStatus', required: true },
              ],
            },
          ],
        },
        {
          title: '消防、防火情况',
          column: [
            {
              title: '水消防',
              props: [
                { title: this.constText.waterFireFightingFirst1 || '', value: 'waterFireFightingFirst', required: true },
                { title: this.constText.waterFireFightingSecond || '', value: 'waterFireFightingSecond', required: true },
              ],
            },
            {
              title: '厨房防火',
              props: [
                { title: this.constText.kitchenFirst || '', value: 'kitchenFirst', required: true },
                { title: this.constText.kitchenSecond || '', value: 'kitchenSecond', required: true },
                { title: this.constText.kitchenThird || '', value: 'kitchenThird', required: true },
              ],
            },
            {
              title: '机舱防火',
              props: [
                { title: this.constText.engineRoomFirst || '', value: 'engineRoomFirst', required: true },
                { title: this.constText.engineRoomSecond || '', value: 'engineRoomSecond', required: true },
                { title: this.constText.engineRoomThird || '', value: 'engineRoomThird', required: true },
                { title: this.constText.engineRoomFourth || '', value: 'engineRoomFourth', required: true },
              ],
            },
            {
              title: '电气设备防火',
              props: [
                { title: this.constText.electricAccessoryFirst || '', value: 'electricAccessoryFirst', required: true },
                { title: this.constText.electricAccessorySecond || '', value: 'electricAccessorySecond', required: true },
              ],
            },
          ],
        },
        {
          title: '其他情况',
          column: [
            {
              title: '渔捞起重设备',
              props: [
                { title: this.constText.fishingEquipmentFirst || '', value: 'fishingEquipmentFirst', required: true },
                { title: this.constText.fishingEquipmentSecond || '', value: 'fishingEquipmentSecond', required: true },
              ],
            },
            {
              title: '船体结构',
              props: [
                { title: this.constText.hullFirst || '', value: 'hullFirst', required: true },
                { title: this.constText.hullSecond || '', value: 'hullSecond', required: true },
                { title: this.constText.hullThird || '', value: 'hullThird', required: true },
              ],
            },
            {
              title: '海底阀',
              props: [
                { title: this.constText.submarineValve || '', value: 'submarineValve', required: true },
              ],
            },
            {
              title: '渔获物储藏室',
              props: [
                { title: this.constText.catchStorageRoom || '', value: 'catchStorageRoom', required: true },
              ],
            },
            {
              title: '机舱',
              props: [
                { title: this.constText.engineRoom || '', value: 'engineRoom', required: true },
              ],
            },
          ],
        },
      ]
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