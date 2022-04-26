import { request } from './request';

export function getUserQRCodes(page, size) {
  return request({
    url: '/usersQr',
    method: 'GET',
    params: { page, size }
  });
};

export function getUserQRCode(id) {
  return request({
    url: `/usersQr/${id}`,
    method: 'GET'
  });
};

export function deleteUserQRCode(id) {
  return request({
    url: `/usersQr/${id}`,
    method: 'DELETE'
  });
};
