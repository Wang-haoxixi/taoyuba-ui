## 数据基因 导出

> 基础
``` html
  <gov-dialog-export
    @submit="handleExportSubmit"
    :data="data"
    :listQuery="listQuery"
    ref="exportDialog">
  </gov-dialog-export>
```

### 属性/方法/回调

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|checkAll|是否全选中|Boolean||true|
|defaultProps|配置选项，具体见下表|Object|||
|listQuery|||||
|data|数据,配置选项，具体见下表|Object|||
|params|搜索参数|Object|||
|url|下载地址|String|||
|title|下载模板名称|String||模板|

> defaultProps

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|label|指定选项标签为选项对象的某个属性值|string|||
|value|指定选项的值为选项对象的某个属性值|string|||

>data

|参数|说明|类型|可选值|默认值|
|:--:|--|--|:--:|:--:|
|prop|字段名|String|||
|title|标题|String|||
|data|数据, 与defaultProps对应起来|Object||如：\{label:'', value: ''\}|

```javascript
import exportDownload from '@/util/export'
// api接口处写
export function getExport (params) {
  return exportDownload({url: `/directory/dirExcel/download_data`, data: params})
}
/**
   * 导出并下载流文件
   * @param  {[type]} url    [路径]
   * @param  {String} method [请求方式]
   * @param  {Object} data   [数据]
   * @param  {String} title  [下载文件名]
   * @return {[type]}        
   */
  exportDownload({url, method = 'post', data = {}, title = ''}){}
```
