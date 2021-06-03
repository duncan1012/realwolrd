import { request } from '@/plugins/request'

const _baseUrl = '/api/user'

/**
 * 登陆
 * @param {*} data 用户账号密码
 * @returns 
 */
export const login = data => {
  return request({
    method: 'POST',
    url: `${_baseUrl}s/login`,
    data
  })
}

/**
 * 注册
 * @param {*} data 用户账号密码
 * @returns 
 */
export const register = data => {
  return request({
    method: 'POST',
    url: `${_baseUrl}s`,
    data
  })
}

/**
 * 更新用户信息
 * @param {*} data 用户信息
 * @returns 
 */
export const updateUser = data => {
  return request({
    method: 'PUT',
    url: `${_baseUrl}`,
    data
  })
}
