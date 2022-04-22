import { request } from "./request";

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

}
