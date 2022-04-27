import { request } from "./request";
/**
 * 发送请求获取员工信息
 * promise
 */
export function getEmployeeInformation() {
  return request({
    url: "/employees/1",
    method: 'get',
  });
}
export function getEmployeeInformations(page, size) {
  return request({
    url: "/employees",
    method: 'get',
    params: { page, size }
  });
}
