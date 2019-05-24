import {validateEmptySpace} from './validate'

export let checkEmptySpace = (rule, value, callback) => {
  if (!value) {
    callback(new Error('不能为空'))
  } else {
    if (validateEmptySpace(value)) {
      callback(new Error('开头不能为空格'))
    }
    callback()
  }
}
