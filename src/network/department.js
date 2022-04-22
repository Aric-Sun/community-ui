import { request } from "./request";
/**
 * 发送请求获取部门信息
 * promise
 */
// 获取部门信息
 export function getDepartmentInformation() {
    return request({
      url: "/departments",
      method: 'GET',
    });
  }
