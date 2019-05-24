<script>
export default {
  name: 'LogItem',
  props: {
    logItem: {
      type: Object,
    },
  },
  methods: {
    flatMap (array, fn) {
      var result = []
      for (var i = 0; i < array.length; i++) {
        var mapping = fn(array[i], i)
        result = result.concat(mapping)
      }
      return result
    },
  },
  render () {
    const formatLogList = [this.logItem].map(m => {
      const templateArray = m.description.split(',')
      const template = templateArray.shift()
      const nameList = templateArray
      return {
        template,
        nameList,
        time: m.time,
      }
    })
    const log = formatLogList.map((m) => {
      let result = m.template
      result = this.flatMap(result.split('$'), function (part, i) {
        return [part, <span style="color:#2558a9;">{m.nameList[i]}</span>] // JSX
      })
      result.pop()
      return <p>{result}<span style="float:right;padding-right:20px;font-size:13px;color:#999;">{m.time}</span></p>
    })
    return (
      <div>{log}</div>
    )
  },
}
</script>
