import { request } from '@/plugins/request'

const _baseUrl = '/api/tags'

/**
 * 查询标签列表 
 * @returns 
 */
 export const getTags = () => {
  return request({
    method: 'GET',
    url: `${_baseUrl}`
  })
}