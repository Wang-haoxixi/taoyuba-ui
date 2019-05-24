## 数据基因 导入

> 基础
``` html
  <gov-dialog-import
    @downLoadDemo="handleDownLoadDemo"
    :action="action"
    ref="importDialog"
    @importSuccess="informationSuccess">
  </gov-dialog-import>
```
### 属性/方法/回调

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|handleDownLoadDemo|下载模板|Function|||
|action|模板上传接口|String|||
|informationSuccess|上传成功后操作|Function|||
|openDialog|关闭弹窗前操作|Function|||
|closeDialog|关闭弹窗前操作|Function|||
|submit|保存按钮操作|Function|||

### 下载方法
**所有流文件都可以通过这个方法下载**
```javascript
  import {downloadExport} from '@/util/util'
  // 模板下载
  handleDownLoadDemo () {
    // getExportDemo接口
    getExportDemo().then(response => {
      downloadExport({response})
  },
```