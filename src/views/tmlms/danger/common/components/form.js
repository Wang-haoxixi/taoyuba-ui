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
export default {
  data () {
    return {
      options: [
        {
          title: '船员配置',
          column: [
            {
              title: '驾驶职务船员最低配员标准',
              props: [
                { title: this.driveStandardTitle || '', value: 'driveStandard' },
              ],
            },
          ],
        },
      ],
    }
  },
  computed: {
    driveStandardTitle () {
      let shipInfo = this.shipInfo
      if (shipInfo.hullLength) {
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
}