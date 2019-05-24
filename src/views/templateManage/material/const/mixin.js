export default {
  computed: {
    column () {
      return []
    },
    tableOption () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        selection: true,
        menuWidth: '180px',
        indexLabel: '序号',
        index: false,
        align: 'center',
        border: false,
        column: [
          {label: '材料标识号', prop: 'materialIder'},
          {label: '材料名称', prop: 'materialName', width: '300'},
          {label: '材料来源', prop: 'sourceChannel'},
          {label: '材料类型', prop: 'materialIder', dicData: [], type: 'dic'},
        ],
      }
    },
  },
}