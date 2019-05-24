export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['国脉人，人人都要成为专家！', '国脉智慧，成就客户！', '以奋斗者为本，做智慧国脉系！']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
