import { request } from '@/plugins/request'

const _baseUrl = '/api/profiles'

/**
 * 获取用户
 * @param {*} username 
 * @returns 
 */
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `${_baseUrl}/${username}`
  })
}

/**
 * 关注用户
 * @param {*} username 
 * @returns 
 */
export const followUser = username => {
  return request({
    method: 'POST',
    url: `${_baseUrl}/${username}/follow`
  })
}

/**
 * 取关用户
 * @param {*} username 
 * @returns 
 */
export const unfollowUser = username => {
  return request({
    method: 'DELETE ',
    url: `${_baseUrl}/${username}/follow`
  })
}