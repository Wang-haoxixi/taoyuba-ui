
<template>
 <div id="map-page" class="height-full">
 <!-- 搜索框 -->
 <el-row class="search-bar-wrap">
 <el-input v-model="searchForm.shipCode" placeholder="船号, 呼号, MMSI 或 IMO" size="small">
 <el-button slot="append" @click.prevent="searchSubmit" icon="el-icon-search" type="primary" size="small"></el-button>
 </el-input>
 </el-row>
 <!-- Map组件 -->
 <map-aside ref="map" :shipInfo="shipInfo" />
 </div>
</template>
<script>
import MapAside from '@/components/MapPage/index'
export default {
 name: 'MapPage',
 data () {
 return {
 // 存储返回的标记对象，主要用作判断指定船舶标记是否存在和删除指定船舶标记
 markerObject: {},
 searchForm: {
 shipCode: '',
 },
 // 由于没有从后端拿数据，这里就直接写在逻辑中，传递给Map子组件
 shipInfo: {
 name: {label: '船名', value: '泰坦尼克号'},
 mmsi: {label: 'MMSI', value: 'test-123'},
 callsign: {label: '呼号', value: 'WED2234'},
 // ...
 },
 }
 },
 components: {
 'MapAside': MapAside,
 },
 methods: {
 searchSubmit () {
 // 由于没有后端，这里直接在逻辑中写死一个船舶的识别码

 if (this.searchForm.shipCode === 'test-123') {
 this.markerAddRemoveToggle()
 } else if (this.searchForm.shipCode === '') {
 this.$message({
 showClose: true,
 message: '请输入船号, 呼号, MMSI 或 IMO',
 })
 } else {
 this.$message({
 showClose: true,
 message: '未找到与 "' + this.searchForm.shipCode + '" 有关的船只信息',
 })
 }
 },
 // 判断 markerObject 是否为空，对 markerlayer 进行增删
 markerAddRemoveToggle () {
 // 将 markerObject 转换成数组，如果数组 length 为 0 则判断 markerObject 是空对象
 let objectArr = Object.keys(this.markerObject)
 if (objectArr.length === 0) {
 // 通过this.$refs.map 触发子组件（<Map ref="map" />）函数
 // 将返回的标记对象赋值给 markerObject
 this.markerObject = this.$refs.map.addGeoMarker()
 this.$refs.map.flyTo()
 } else {
 // 如果 markerObject.id 等于 shipInfo.callsign.value 表示当前已经生成了其 callsign 作为 id 的layer，则不删除直接 flyTo 到其 local
 if (this.markerObject.id === this.shipInfo.callsign.value) {
 this.$refs.map.flyTo()
 } else {
 this.$refs.map.removeGeoMarker(this.markerObject)
 this.markerObject = {}
 }
 }
 },
 },
}
</script>
<style lang='less'>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.css');
/*
* 覆盖mapbox的样式，注意 style 没有 scoped
2021/8/18 用 Mapbox 和 Vue.js 制作一个地图可视化船舶定位查询系统 - 简书
https://www.jianshu.com/p/ff5bfcf4008b 3/3
*/
.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-top-right {
 margin-top: 50px;
}
</style>