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
export function updataEmployeeInformation({
  userid,
  department,
  username,
  password
}) {
  return request({
    url: "/employees/1",
    method: 'put',
    data: { //传给后端的json,参数根据具体信息修改
      'id': userid,
      'departmentId': department,
      'username': username,
      'password': password,
      'job': "testJob"
    }
  })
}
//添加员工信息
export function addEmployeeInformation({
  department,
  username,
  position,
  password
}) {
  return request({
    url: "/employees",
    method: 'POST',
    data: { //传给后端的json,参数根据具体信息修改
      'departmentId': department,
      'username': username,
      'job': position,
      'password':password
    } 
  })
}
export function getDepartmentName(
  departmentId
) {
  return request({
    url: "/departments/" + departmentId,
    method: 'get'
  })
}