import _ from 'lodash'
import CryptoJS from 'crypto-js'
import { getTagViewByName } from '@/api/tms/tag'
// 表单序列化
export const serialize = data => {
  let list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
export const getObjType = obj => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = status => {
  if (status) {
    document.body.className = document.body.className + ' grayMode'
  } else {
    document.body.className = document.body.className.replace(' grayMode', '')
  }
}

/**
 *加密处理
 */
export const encryption = params => {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
  function listen () {
    callback()
  }
  document.addEventListener('fullscreenchange', function () {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function () {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function () {
    listen()
  })
  document.addEventListener('msfullscreenchange', function () {
    listen()
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return (
    document.isFullScreen ||
    document.mozIsFullScreen ||
    document.webkitIsFullScreen
  )
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}

/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 动态插入js
 */

export const loadJs = (src) => {
  //创建一个script节点
  var element = document.createElement('script')//给该节点设置src属性
  element.src = src//debug//console.log(element);//将该script节点添加到body尾部
  document.body.appendChild(element)
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
    w +
    ', height=' +
    h +
    ', top=' +
    top +
    ', left=' +
    left
  )

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

/**
 *  <img> <a> src 处理
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */
// export function handleImg (fileName, id) {
//   return validatenull(fileName)
//     ? null
//     : request({
//       url: '/admin/file/' + fileName,
//       method: 'get',
//       responseType: 'blob',
//     }).then(response => {
//       // 处理返回的文件流
//       let blob = response.data
//       let img = document.getElementById(id)
//       img.src = URL.createObjectURL(blob)
//       window.setTimeout(function () {
//         window.URL.revokeObjectURL(blob)
//       }, 0)
//     })
// }

export function mergeByFirst (distObject, srcObject) {
  const distPropList = _.keys(distObject)
  const srcPropList = _.keys(_.omitBy(srcObject, _.isNil))
  const propList = _.intersection(distPropList, srcPropList)
  return {
    ...distObject, ..._.pick(srcObject, propList),
  }
}

export async function openTagDetail (value) {
  if (typeof value=='string') {
    const {data} = await getTagViewByName(value)
    this.$router.push({
      path: `/app/tags_detail/${data.data.tagId}`,
    })
  } else {
    this.$router.push({
      path: `/app/tags_detail/${value}`,
    })
  }
}

export function openPage (value, type = 'path') {
  if (type === 'path') {
    this.$router.push({
      path: value,
    })
  }
  if (type === 'name') {
    this.$router.push({
      name: value,
    })
  }
  if (type === 'url') {
    window.open(value, '_blank')
  }
}

/**
 *
 * @param {array} collection
 */
export function pickDeep (collection) {
  if (_.isArray(collection)) {
    return collection.map(c => {
      if (_.isArray(c.children) && c.children.length) {
        const subC = c.children.map(sc => {
          return {
            label: sc.label,
            value: sc.value,
          }
        })
        return {
          children: subC,
          label: c.label,
          value: c.value,
        }
      } else {
        return {
          label: c.label,
          value: c.value,
        }
      }
    })
  } else {
    return []
  }
}
export function fillStatisticsArray (oldData, newData) {
  const newStatistics = []
  for (let i = 0; i < oldData.length; i++) {
    const element = oldData[i]
    const newElement = newData[i]
    if (newElement) {
      newStatistics.push(newElement)
    } else {
      newStatistics.push(element)
    }
  }
  return newStatistics
}