export const calcDate = (date1, date2) => {
  var date3 = date2 - date1

  var days = Math.floor(date3 / (24 * 3600 * 1000))

  var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
  // var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(date3 / 1000)
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

export function getNextMonth (params = {}) {
  let {date = new Date(), num = 1} = params
  return new Date(date.getFullYear(), date.getMonth() + num)
}

export function getMonthDiff (startMonth, endMonth) {
  let startDate = new Date(startMonth)
  let endDate = new Date(endMonth)
  let month = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth() + 1)
  return month
}

export function getFullDay (date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}
