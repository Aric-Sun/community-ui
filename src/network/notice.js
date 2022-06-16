import { request } from "./request";
import { MOCK } from 'common/utils';

/**
 * 获取公告列表
 * @param {number} page 页数
 * @param {number} size 大小
 */
export function getNotices(page, size) {
  return request({
    url: '/newses',
    method: 'GET',
    params: { page, size }
  });
}

/**
 * 添加新公告
 * @param {{title: string, content: string}} param0 请求体
 */
export function addNotice({ title, content }) {
  return request({
    url: '/newses',
    method: 'POST',
    data: JSON.stringify({ title, content })
  });
}

/**
 * 更新指定编号的公告信息
 * @param {{id: number, title: string, content: string}} param0 请求体
 */
export function editNotice({ id, title, content }) {
  return request({
    url: `/newses/${id}`,
    method: 'PUT',
    data: { title, content }
  });
}

/**
 * 删除指定编号的公告
 * @param {number} id 公告ID
 */
export function deleteNotice(id) {
  return request({
    url: `/newses/${id}`,
    method: 'DELETE'
  });
}

/**
 * 推送指定的公告
 * @param {number} id 公告ID
 */
export function pushNotice(content) {
  return request({
    // url: `/notices/${id}/push`,
    url: `/custom/news/sendAll?message=${content}`,
    method: 'GET'
  });
}
