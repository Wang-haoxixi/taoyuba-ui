import {
  validatenull,
} from './validate'
import {
  baseUrl,
} from '@/config/env'
import website from '@/config/website'
import CryptoJS from 'crypto-js'

export const transformGetRequest = data => {
  let newData = {}
  for (let k in data) {
    if (data.hasOwnProperty(k) === true) {
      if (data[k] != null) {
        newData[k] = encodeURIComponent(data[k])
      }
    }
  }
  return newData
}
//表单序列化
export const serialize = data => {
  let list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

export const initMenu = (router, menu) => {
  if (menu.length === 0) {
    return
  }
  router.addRoutes(formatRoutes(menu))
}

export const formatRoutes = (aMenu) => {
  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      name,
      icon,
      children,
      label,
      redirectUrl,
    } = oMenu
    if (!validatenull(component)) {
      const oRouter = {
        path: path,
        component (resolve) {
          let componentPath = ''
          if (component === 'Layout') {
            require(['../page/index'], resolve)
            return
          } else if (component === 'middle') {
            require(['../page/index/middle.vue'], resolve)
            return
          } else {
            componentPath = component
          }
          require([`../${componentPath}.vue`], resolve)
        },
        meta: {title: label ? label : ""},
        name: name,
        icon: icon,
        redirect: redirectUrl ? redirectUrl : undefined,
        children: validatenull(children) ? [] : formatRoutes(children),
      }
      aRouter.push(oRouter)
    }
  })
  return aRouter
}

/**
 * 加密处理
 */
export const encryption = (params) => {
  const {
    data,
    type,
    param,
  } = params
  let { key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      const data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key) // eslint-disable-line
      const iv = key
      // 加密
      const encrypted = CryptoJS.AES.encrypt( // eslint-disable-line
        data,
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC, // eslint-disable-line
          padding: CryptoJS.pad.ZeroPadding // eslint-disable-line
        })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  // title = title ? `${title}-${website.info.title}` : website.info.title
  title = title ? `${website.info.title}` : website.info.title
  window.document.title = title
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
export const listenfullscreen = (callback) => {
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
  var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen
  return isFullscreen
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
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('#') !== -1 && url.indexOf('http') === -1) {
    const port = reqUrl.substr(reqUrl.indexOf(':'))
    reqUrl = `/myiframe/urlPath?src=${baseUrl}${port}${reqUrl.replace('#', '').replace(port, '')}}&name=${name}`
  } else if (url.indexOf('http') !== -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}

/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = ''
  if ($route.query.src) {
    value = $route.query.src
  } else {
    value = $route.path
  }
  return value
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
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof (value) === 'string' || typeof (value) === 'number') {
    let index = 0
    index = findArray(dic, value)
    if (index !== -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach(ele => {
      index = findArray(dic, ele)
      if (index !== -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value === value) {
      return i
    }
  }
  return -1
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 数组分页功能函数
 */
export function pagination (currentPage, pageSize, array) {
  const offset = (currentPage - 1) * pageSize
  return offset + pageSize >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + pageSize)
}
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop
  const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}
// excel下载文件解析
function contentDispositionAnalysis (contentDisposition) {
  let file = {}
  let list = contentDisposition.split('; ')
  list.forEach(item=>{
    let n = item.split('=')
    n[1] ? file[n[0]] = n[1] : file[n[0]] = n[0]
  })
  file.suffix = file.filename.split('.')[1]
  return file
}

export function downloadExport ({title = '', response}) {
  let contentInfo = contentDispositionAnalysis(response.headers['content-disposition'].replace(/"/g, ""))
  return new Promise((resolve) => {
    let headers = response.headers
    let blob = new Blob([response.data], {
      type: headers['content-type'],
    })
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    if (!title) {
      link.download = contentInfo.filename
    } else {
      link.download = `${title}.${contentInfo.suffix}`
    }
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, `${title}.${contentInfo.suffix}`)
      resolve()
      return
    }
    if (document.all) {
      link.click()
    } else {
      let e = document.createEvent("MouseEvents")
      e.initEvent("click", true, true)
      link.dispatchEvent(e)
    }
    // link.click()
    resolve()
  })
}
