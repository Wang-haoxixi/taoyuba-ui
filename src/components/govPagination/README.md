## 数据基因 通用分页

### 基础用法

> 基础分页
``` html
  <gov-pagination
    ref="pagination"
    @currentChange="currentChange"
    @sizeChange="sizeChange"
    :pagination="pagination"/>
```
``` javascript
methods: {
    // currentPage 改变时会触发
    currentChange () {},
    // pageSize 改变时会触发
    sizeChange () {},
}
```
### 属性/方法/回调

> Attributes 属性

|属性|说明|可选值|默认值|
|:--:|--|:--:|--|
|pagination|分页参数||total: 0,currentPage: 1,pageSize: 10|
|props|当前页名称||currentPage: 'currentPage',pageSize: 'pageSize'|

> event 回调

|事件名称|说明|回调参数|
|--|--|--|
|currentChange|currentPage 改变时会触发|当前页|
|sizeChange|pageSize 改变时会触发|每页条数|