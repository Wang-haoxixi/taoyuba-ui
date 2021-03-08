export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      dicData: {
        isNot: [
          { label: '有', value: 1 },
          { label: '无', value: 0 },
        ],
      },
    }
  },
  computed: {
    options () {
      return [
        {
          title: '一、证书部分',
          column: [
            { label: '捕捞许可证', prop: 'fishLicenceImage', type: 'upload' },
            { label: '所有权登记证书', prop: 'ownershipRegistrationImage', type: 'upload' },
            { label: '国籍登记证书', prop: 'nationalityRegistrationImage', type: 'upload' },
            { label: '渔船检验证书', prop: 'fishVesselImage', type: 'upload' },
          ],
        },
        {
          title: '二、船体部分',
          column: [
            { label: '左舷或右舷全貌', prop: 'shipBoardImage', type: 'upload' },
            { label: '船体外板', prop: 'shellPlatImage', type: 'upload' },
            { label: '主甲板全貌', prop: 'deckImage', type: 'upload' },
            { label: '主要捕捞设施', prop: 'fishFacilityImage', type: 'upload' },
            { label: '上层建筑', prop: 'superstructureImage', type: 'upload' },
            { label: '驾驶室', prop: 'pilothouseImage', type: 'upload' },
            { label: '驾驶甲板全貌', prop: 'pilotDeckImage', type: 'upload' },
            { label: '罗经甲板全貌', prop: 'monkeyIslandImage', type: 'upload' },
            { label: '船艉特征', prop: 'sternCharacteristicsImage', type: 'upload' },
            { label: '型宽测量', prop: 'shipBreadthImage', type: 'upload' },
            { label: '总长测量', prop: 'shipSizeImage', type: 'upload' },
            { label: '厨房全貌', prop: 'kitchenImage', type: 'upload' },
            { label: '船员舱室', prop: 'crewCabinImage', type: 'upload' },
            { label: '机舱围壁和门', prop: 'wallDoorImage', type: 'upload' },
          ],
        },
        {
          title: '三、船舶主要设备',
          column: [
            {
              title: '1.主机',
              column: [
                { label: '实船型号', prop: 'shipMark', type: 'input', span: 12 },
                { label: '铭牌', prop: 'shipMark', type: 'select', dictMap: this.dicData.isNot, span: 12 },
                { label: '照片', prop: 'shipMark', type: 'upload', span: 24 },
              ],
            },
            {
              title: '2.发电机',
              column: [
                { label: '型号', prop: 'dynamo', type: 'input', span: 12 },
                { label: '数量', prop: 'dynamoQuantity', type: 'number', span: 12 },
                { label: '照片', prop: 'dynamoImage', type: 'upload', span: 24 },
              ],
            },
            {
              title: '3.控制电箱',
              column: [
                { label: '照片', prop: 'electricBoxImage', type: 'upload', span: 24 },
              ],
            },
            {
              title: '4.齿轮箱',
              column: [
                { label: '型号', prop: 'gearBoxMark', type: 'input', span: 12 },
                { label: '数量', prop: 'gearBoxFlag', type: 'number', span: 12 },
                { label: '照片', prop: 'gearBoxImage', type: 'upload', span: 24 },
              ],
            },
            {
              title: '5.防污染设备',
              column: [
                { label: '滤油设备型号', prop: 'oilEquipmentMark', type: 'input', span: 12 },
                { label: '滤油设备铭牌', prop: 'oilEquipmentFlag', type: 'select', dictMap: this.dicData.isNot, span: 12 },
                { label: '照片', prop: 'oilEquipmentImage', type: 'upload', span: 24 },
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
  },
}