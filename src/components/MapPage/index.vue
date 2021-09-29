<template>
 <div class="map height-full">
 <!-- Mapbox 绑定的 div -->
 <div ref="Mapbox" style="height:95vh;width:100%;" 
 ></div>
 <div id="ship-info" :class="{'active': shipInfoBoardDisplay}">
 <!-- 显示船舶详细信息的弹出框，显示隐藏通过判断 shipInfoBoardDisplay -->
 </div>
 </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'

export default {
 name: 'MapAside',
 props: ['shipInfo'],
 data () {
 return {
 mapObject: {},
 shipInfoBoardDisplay: false,
 }
 },
 mounted () {
    //  this.init()
 this.mapObject = this.init()
 },
 methods: {
 init () {
 mapboxgl.accessToken = 'pk.eyJ1IjoiYWtrYTEzIiwiYSI6ImNrc2k4a2RrZzA0bnoycGwycWZtcm0zeTcifQ.Sma8-0YGtrwsfL3uOF3KIQ'
 const map = new mapboxgl.Map({
 container: this.$refs.Mapbox,
 style: 'mapbox://styles/mapbox/streets-v11',
 // 设置地图中心
 center: [122.3,30.4],
 // 设置地图比例
 zoom: 8,
 })
 //语言
 
 // 地图导航
 let nav = new mapboxgl.NavigationControl()
 map.addControl(nav, 'top-left')
 // 显示比例尺
 let scale = new mapboxgl.ScaleControl({
 maxWidth: 80,
 unit: 'imperial',
 })
 map.addControl(scale)
 scale.setUnit('metric')
 // 全屏按钮
 map.addControl(new mapboxgl.FullscreenControl())
 // 使用定位模块
 map.addControl(

 new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true,
 },
 trackUserLocation: true,
 showUserLocation: true,
 zoom: 14,
 })
 )
 return map
 },
 // 添加自定义标记点
 addGeoMarker () {
 let map = this.mapObject
 let that = this
 // 引入外部图片
 map.loadImage('/static/images/arrow.png', function (error, image) {
 if (error) throw error
 // 先判断是否加载了该 id 的图片资源，没有则加载
 if (!map.hasImage('shipDirectionArrow')) {
 map.addImage('shipDirectionArrow', image)
 }
 map.addLayer({
 id: that.shipInfo.callsign.value,
 type: 'symbol',
 source: {
 type: 'geojson',
 data: {
 type: 'FeatureCollection',
 features: [{
 type: 'Feature',
 geometry: {
 type: 'Point',
 coordinates: that.shipInfo.local.value,
 },
 }],
 },
 },
 layout: {
 // 使用图片资源

 'icon-image': 'shipDirectionArrow',
 // 缩放
 'icon-size': 1,
 // 旋转角度
 'icon-rotate': that.shipInfo.headDirect.value,
 // 偏移量
 'icon-offset': [0, -15],
 // 跟随地图转动，推拉（3d效果那种）Mapbox 中叫 bearing 和 pitch
 'icon-rotation-alignment': 'map',
 'icon-allow-overlap': true,
 'icon-ignore-placement': true,
 },
 })
 })
 // 添加 icon 和 名称 标记
 // 创建 div.marker-wrap, div.marker-title, div.marker-wrap 用作定位, div.marker-title 显示标题
 let elWrap = document.createElement('div')
 elWrap.className = 'marker-wrap'
 elWrap.addEventListener('click', function () {
 that.shipInfoBoardDisplay = !that.shipInfoBoardDisplay
 if (map.getZoom() < 6.5) {
 that.flyTo()
 }
 })
 let elTitle = document.createElement('div')
 elTitle.className = 'marker-title'
 elTitle.innerHTML = '<span>' + that.shipInfo.name.value + '</span>'
 elWrap.appendChild(elTitle)
 // 将 div.marker-wrap 加入到 map
//  let markerTagObject = new mapboxgl.Marker(elWrap).setLngLat(this.shipInfo.local.value).addTo(map)
 },
 },
}
</script>