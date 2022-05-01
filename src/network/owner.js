import { request } from './request';

// 获取业主信息列表
export function getOwners(page, size) {
  return request({
    url: '/usersInfo',
    method: 'GET',
    params: { page, size }
  });
}

