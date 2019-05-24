import Vue from 'vue'
import GovButton from '@/components/govButton/index'
import GovSearchBar from '@/components/govSearchBar/index'
import GovDialog from '@/components/govDialog/index'
import GovLayout from '@/components/govLayout'
import GovDialogImport from '@/components/govDialogImport'
import GovDialogExport from '@/components/govDialogExport'
import GovDetailForm from '@/components/govDetailForm'

const components = [
  GovButton,
  GovSearchBar,
  GovDialog,
  GovLayout.GovLayoutBody,
  GovLayout.GovLayoutButtonGroup,
  GovLayout.GovLayoutDialog,
  GovLayout.GovLayoutForm,
  GovLayout.GovLayoutHeader,
  GovLayout.GovLayoutMain,
  GovDialogImport,
  GovDialogExport,
  GovDetailForm,
]

components.forEach(component => {
  Vue.component(component.name, component)
})

export default Vue