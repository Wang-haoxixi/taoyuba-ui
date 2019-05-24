import request from '@/router/request'
// import {BASE_URL} from '@/config/global'

export const loginByUsername = (username, password, code, randomStr) => {
  var grantType = 'password'
  var scope = 'server'
  return request({
    url: `/auth/oauth/token`,
    headers: {
      'Authorization': 'Basic ZGlwczpkaXBz',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    params: {
      username,
      password,
      randomStr,
      code,
      grant_type: grantType,
      scope,
    },
  })
}

export const getUserInfo = () => {
  return request({
    url: `/admin/user/info`,
    method: 'get',
  })
}

export const getDicList = () => {
  return request({
    url: `/admin/dict/all_list`,
    // url: `/zqq/dicList`,
    method: 'get',
  })
}

export const logout = () => {
  return request({
    url: `/auth/oauth/removeToken`,
    method: 'get',
  })
}
