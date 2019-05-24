<template>
  <div class="water-fall-wrapper">
    <h1>常用标签瀑布图</h1>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="item in commontag" :index="item.id+''" :key="item.id">{{item.name}}</el-menu-item>
    </el-menu>
    <div>
      <v-chart :forceFit="true" :height="height" :data="data">
        <v-legend :custom="true" :clickable="false" :items="items" />
        <v-axis />
        <v-tooltip />
        <v-bar position="name*count" shape="waterfall" :color="color" :tooltip="tooltip" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import { Global, registerShape } from 'viser-vue'
import { getTagCommon, getTagRelationList } from '@/api/tms/statistics'
function getRectPath (points) {
  const path = []
  for (let i = 0; i < points.length; i++) {
    const point = points[i]
    if (point) {
      const action = i === 0 ? 'M' : 'L'
      path.push([action, point.x, point.y])
    }
  }
  const first = points[0]
  path.push(['L', first.x, first.y])
  path.push(['z'])
  return path
}

function getFillAttrs (cfg) {
  const defaultAttrs = Global.shape.interval
  const attrs = Object.assign({}, defaultAttrs, {
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity,
  }, cfg.style)
  return attrs
}

registerShape('interval', 'waterfall', {
  draw (cfg, container) {
    const attrs = getFillAttrs(cfg)
    let rectPath = getRectPath(cfg.points)
    rectPath = this.parsePath(rectPath)
    const interval = container.addShape('path', {
      attrs: Object.assign(attrs, {
        path: rectPath,
      }),
    })

    if (cfg.nextPoints) {
      let linkPath = [
        ['M', cfg.points[2].x, cfg.points[2].y],
        ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
      ]

      if (cfg.nextPoints[0].y === 0) {
        linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y]
      }
      linkPath = this.parsePath(linkPath)
      container.addShape('path', {
        attrs: {
          path: linkPath,
          stroke: '#8c8c8c',
          lineDash: [4, 2],
        },
      })
    }

    return interval
  },
})

export default {
  data () {
    return {
      data: [],
      height: 400,
      items: [],
      color: [],
      tooltip: [],
      activeIndex: '1',
      commontag: [],
    }
  },
  created () {
    this.loadCommonTag()
  },
  methods: {
    loadCommonTag () {
      getTagCommon().then(res => {
        this.commontag = res.data
        this.activeIndex = String(res.data[0].id)
        this.$nextTick(() => {
          this.loadRelationList(this.activeIndex)
        })
      })
    },
    loadRelationList (id) {
      getTagRelationList(id).then(res => {
        this.data = res.data
        this.data.push({
          name: '关联总数',
          count: this.commontag[this.searchId(id)].applicationCount,
        })
        const data = this.data
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          if (i > 0 && i < data.length - 1) {
            if (Array.isArray(data[i - 1].count)) {
              item.count = [data[i - 1].count[1], item.count + data[i - 1].count[1]]
            } else {
              item.count = [data[i - 1].count, item.count + data[i - 1].count]
            }
          }
        }
        this.items = [
          { value: '各项关联', fill: '#1890FF', marker: 'square' },
          { value: '关联总数', fill: '#8c8c8c', marker: 'square' },
        ]

        this.color = ['name', name => {
          if (name === '关联总数') {
            return '#8c8c8c'
          }
          return '#1890FF'
        }]

        this.tooltip = ['name*count', (name, count) => {
          if (Array.isArray(count)) {
            return {
              name: '关联次数',
              value: count[1] - count[0],
            }
          }

          return {
            name: '关联次数',
            value: count,
          }
        }]
      })
    },
    handleSelect (index) {
      this.loadRelationList(index)
    },
    searchId (id) {
      for (let index in this.commontag) {
        if (id == this.commontag[index].id) {
          return index
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.water-fall-wrapper {
  /deep/ .el-menu {
    display: flex;
    justify-content: center;
  }
  /deep/ .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  h1 {
    font-size: 20px;
  }
}
</style>
