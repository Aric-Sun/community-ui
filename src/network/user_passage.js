import { request } from './request';

export function getUserPassages(page, size) {
  return request({
    url: '/logsUserPassage',
    method: 'GET',
    params: { page, size }
  });
};

export function getUserPassage(id) {
  return request({
    url: `/logsUserPassage/${id}`,
    method: 'GET'
  });
};

export function editUserPassage({ id, passTime, isIn, uid, temperature }) {
  return request({
    url: `/logsUserPassage/${id}`,
    method: 'PUT',
    params: { passTime, isIn, uid, temperature }
  });
};

export function deleteUserPassage(id) {
  return request({
    url: `/logsUserPassage/${id}`,
    method: 'DELETE'
  });
};
