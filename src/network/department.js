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
// 添加新部门
export function addDepartments({ departmentName }) {
    return request({
        url: '/departments',
        method: 'POST',
        data: { 'name': departmentName}
    });
}