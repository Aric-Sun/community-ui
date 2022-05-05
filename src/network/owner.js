import { request } from './request';

// 获取业主信息列表
export function getOwners(page, size) {
  return request({
    url: '/usersInfo',
    method: 'GET',
    params: { page, size }
  });
}
// 获取指定编号的业主具体信息
export function getOwnerInfo(id) {
  return request({
    url: `/usersInfo/${id}`,
    method: 'GET'
  });
}
// 添加新业主
export function addOwner({ name, sex, birthYear, buildingRoom, status, userId, createTime }) {
  return request({
    url: '/usersInfo',
    method: 'POST',
    data: { name, sex, birthYear, buildingRoom, status, userId, createTime }
  });
}
// 编辑指定业主的信息
export function editOwnerInfo({ id, name, sex, birthYear, buildingRoom, userId, createTime }) {
  return request({
    url: `/usersInfo/${id}`,
    method: 'PUT',
    data: { name, sex, birthYear, buildingRoom, userId, createTime }
  });
}
// 查询业主信息
export function queryOwnersInfo({ type, id }) {
  const queryUrl = '/usersInfo/search/findByUserId';
  const queryData = { id };
  return request({
    url: `${queryUrl}?userId=${id}`,
    method: 'GET',
    // data: queryData
  });
}