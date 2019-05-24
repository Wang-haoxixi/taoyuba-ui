import FormDialog from '@/components/form-dialog'
import PageDialog from '@/components/page-dialog'
export default {
  data () {
    return {
      dialogShow: false,
    }
  },
  components: { FormDialog, PageDialog },
  methods: {
    handleDialogClose (val) {
      this.dialogShow = val
    },
  },
}
