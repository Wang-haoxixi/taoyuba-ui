export default {
  data () {
    return {
      form: {
        status: '',
        content: '',
      },
      showContent: false,
    }
  },
  methods: {
    initForm () {
      this.form = {
        status: '',
        content: '',
      }
      this.ids = null
      this.id = null
    },
  },
  watch: {
    'form.status' : {
      deep: true,
      handler (val) {
        if(val === 4){
          this.showContent = true
        }else{
          this.showContent = false
        }
      },
    },
  },
  computed: {
    column () {
      return [
        {
          label: '审核状态',
          prop: 'status',
          span: 24,
          type: "radio",
          dicData: [
            {label: '审核通过', value: 3},
            {label: '驳回', value: 4},
          ],
        }, {
          label: '驳回理由',
          prop: 'content',
          span: 24,
          type: "textarea",
          visdiplay: this.showContent,
          maxlength:100,
          rules: [{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }],
        },
        // {
        //           label: "性别",
        //           prop: "sex",
        //           span: 6,
        //           type: "radio",
        //           dicData: DIC.SEX,
        //           mock:{
        //             type:'dic'
        //           },
        //           valueDefault: 0,
        //           change:({value,column})=>{
        //               this.$message.success('change')
        //           }
        //       }
      ]
    },
    editOption () {
      return {
        menuBtn: false,
        labelWidth: '180',
        labelPosition: 'right',
        column: this.column,
      }
    },
  },
}
