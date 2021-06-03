import { request } from '@/plugins/request'

const _baseUrl = '/api/articles'

/**
 * 查询文章列表
 * @param {*} params 
 * @returns 
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: `${_baseUrl}`,
    params
  })
}

/**
 * 创建文章
 * @param {*} data 
 * @returns 
 */
export const createArticles = data => {
  return request({
    method: 'POST',
    url: `${_baseUrl}`,
    data
  })
}

/**
 * 编辑文章
 * @param {*} slug 
 * @param {*} data 
 * @returns 
 */
export const editArticles = (slug, data) => {
  return request({
    method: 'PUT',
    url: `${_baseUrl}/${slug}`,
    data
  })
}

/**
 * 移除文章
 * @param {*} slug 
 * @returns 
 */
export const deleteArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `${_baseUrl}/${slug}`
  })
}

/**
 * 查询关注文章列表
 * @param {*} params 
 * @returns 
 */
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: `${_baseUrl}/feed`,
    params
  })
}

/**
 * 点赞文章
 * @param {*} slug 文章唯一标识符 
 * @returns 
 */
export const favorite = slug => {
  return request({
    method: 'POST',
    url: `${_baseUrl}/${slug}/favorite`,
    data: {}
  })
}

/**
 * 取消点赞文章
 * @param {*} slug 文章唯一标识符 
 * @returns 
 */
export const unfavorite = slug => {
  return request({
    method: 'DELETE',
    url: `${_baseUrl}/${slug}/favorite`,
    data: {}
  })
}

/**
 * 获取文章详情
 * @param {*} slug 文章唯一标识符 
 * @returns 
 */
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `${_baseUrl}/${slug}`
  })
}

/**
 * 获取文章评论列表
 * @param {*} slug 文章唯一标识符 
 * @returns 
 */
export const getArticleComments = slug => {
  return request({
    method: 'GET',
    url: `${_baseUrl}/${slug}/comments`
  })
}

/**
 * 评论文章
 * @param {*} slug 文章唯一标识符 
 * @param {*} data 评论内容
 * @returns 
 */
export const addArticleComment = (slug, data) => {
  return request({
    method: 'POST',
    url: `${_baseUrl}/${slug}/comments`,
    data
  })
}

/**
 * 移除文章评论
 * @param {*} slug 文章唯一标识符 
 * @param {*} id 评论唯一标识符 
 * @returns 
 */
export const removeArticleComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `${_baseUrl}/${slug}/comments/${id}`
  })
}