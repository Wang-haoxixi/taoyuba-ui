import Performance from 'performance-report'
import Vue from 'vue'
import store from './store'
import { performanceDomain, performanceAppId } from './config/env'
if (process.env.NODE_ENV === 'production') {
  Performance({
    domain: performanceDomain,
    add: {
      appId: performanceAppId,
    },
  })
}

Vue.config.errorHandler = function (err, vm, info) {
  const { message, stack } = err

  // Processing error
  let resourceUrl, col, line
  let errs = stack.match(/\(.+?\)/)
  if (errs && errs.length) errs = errs[0]
  errs = errs.replace(/\w.+js/g, $1 => {
    resourceUrl = $1
    return ''
  })
  errs = errs.split(':')
  if (errs && errs.length > 1) line = parseInt(errs[1] || 0)
  col = parseInt(errs[2] || 0)
  if (process.env.NODE_ENV === 'production') {
    // Fixed parameters
    // Call the Performance.addError method
    Performance.addError({
      msg: message,
      col: col,
      line: line,
      resourceUrl: resourceUrl,
    })
  }
  Vue.nextTick(() => {
    store.commit('ADD_LOGS', {
      type: 'error',
      message: message,
      stack: stack,
      info,
    })
    if (process.env.NODE_ENV === 'development') {
      console.group('>>>>>> 错误信息 >>>>>>')
      console.log(info)
      console.groupEnd()
      console.group('>>>>>> Vue 实例 >>>>>>')
      console.log(vm)
      console.groupEnd()
      console.group('>>>>>> Error >>>>>>')
      console.log(err)
      console.groupEnd()
    }
  })
}
