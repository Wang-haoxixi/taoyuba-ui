<template>
  <div>
    <v-chart :force-fit="true" :height="height" :data="waterfallData" :padding="padding">
      <v-legend :custom="true" :clickable="false" />
      <v-axis />
      <v-tooltip />
      <v-bar position="name*count" shape="waterfall" :color="color" :tooltip="tooltip" />
    </v-chart>
  </div>
</template>

<script>
import { Global, registerShape } from 'viser-vue'

// 注册瀑布流
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

const color = ['name', name => {
  if (name == '关联总数') {
    return '#8c8c8c'
  }
  return '#1890FF'
}]

const tooltip = ['name*count', (name, count) => {
  if (Array.isArray(count)) {
    return {
      name: '关联数',
      value: count[1] - count[0],
    }
  }

  return {
    name: '关联数',
    value: count,
  }
}]

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data () {
    return {
      height: 400,
      padding: 'auto',
      color,
      tooltip,
    }
  },
  computed: {
    waterfallData () {
      const data = [...this.data]
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
      return data
    },
  },
}
</script>
