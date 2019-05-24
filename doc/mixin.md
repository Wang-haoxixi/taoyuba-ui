## mixin解析
**强制的方法名或者参数名必须用这个，但可以重写，特殊情况除外**
### data
```javascript
{
    /** 
     * 弹框状态 'create/update/detail' 
     * 状态值包含在dialog.textName中，
     * 弹窗通过状态值获取弹窗的title
     * （强制）
    */
    dialogStatus: '',
    // 弹窗（强制）
    dialog: {
      textMap: {
        create: '创建',
        update: '编辑',
        detail: '详情',
      },
      textName: {
        create: 'create',
        update: 'update',
        detail: 'detail',
      },
    },
    // 分页参数 （直接使用这个即可）（强制）
    pagination: {
      currentPage: 1, // 当前页码
      pageSize: 10, // 显示多少条
      total: 0, // 总条数
      pageSizes: [10, 20, 30, 40, 50],
    },
    // 搜索参数 （搜索参数会自定合并分页数据）（强制）
    listQuery: {},
    // 列表数据
    tableList: [],
}
```

### methods
```javascript
// 打开弹窗 (推荐)
open (refName) {
  this.$refs[refName || this.refNameDialog].open()
},
// 关闭弹窗 (推荐)
close (refName) {
  this.$refs[refName || this.refNameDialog].close()
},
// 列表接口查询数据 （强制）
getList () {},
// 数据重置
resetFormData () {},
// 列表搜索（强制）
handleFilter () {},
// 分页显示每页多条(强制)
sizeChange () {},
// 分页当前页(强制)
currentChange () {},
// 获取字典值
getDic (name = '') {},

```

[返回README](../README.md)