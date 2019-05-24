export default {
  data () {
    return {
      showUpdateCycle: false,
      form:{
        id: '',
        updateCycle: '',
        updateCycleType: '',
      },
    }
  },
  computed: {
    editOption () {
      return {
        menuBtn: false,
        labelWidth: '180',
        labelPosition: 'right',
        column: [
          {
            label: '更新周期',
            prop: 'updateCycleType',
            span: 24,
            type: 'select',
            dicData: [{value: 2, label: '自定义'}, {value: 1, label: '每日'}, {value: 0, label: '每周'}, {value: 3, label: '实时'}],
            placeholder: ' ',
            change: (value)=>{
              if(value.value === 2){
                this.$set(this.form,'updateCycle','')
              }
            },
          }, {
            label: '自定义更新周期',
            prop: 'updateCycle',
            span: 24,
            visdiplay: this.showUpdateCycle,
            placeholder: ' ',
          },
        ],
      }
    },
  },
  watch: {
    'form.updateCycleType': {
      deep: true,
      handler (val) {
        if(val == 2){
          this.showUpdateCycle = true
        }else{
          this.showUpdateCycle = false
        }
      },
    },
  },
}
