import request from '@/router/request'
export const loginByUsername = (username, password, code, randomStr) => {
  var grantType = 'password'
  var scope = 'server'
  return request({
    url: '/auth/oauth/token',
    headers: {
      Authorization: 'Basic ZGlwczpkaXBz',
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
    url: '/admin/user/info',
    method: 'get',
  })
}

export const logout = () => {
  return request({
    url: '/auth/oauth/removeToken',
    method: 'get',
  })
}
