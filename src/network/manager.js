import { request } from './request';

export function getManagers(page, size) {
    return request({
        url: '/managers',
        method: 'GET',
        params: { page, size }
    });
};
