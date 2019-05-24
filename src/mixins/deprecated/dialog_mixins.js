import FormDialog from '@/components/deprecated/form-dialog'
import PageDialog from '@/components/deprecated/page-dialog'
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
