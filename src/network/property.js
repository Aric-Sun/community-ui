import { request } from "./request";
// 根据id&&pwd获取物业人员登陆信息
export function getPropertyLoginformation(userid,password) {
  return request({
    url: `employees/search/findByIdAndPassword?id=${userid}&password=${password}`,
    method: 'get',
  });
}
// 根据id&&pwd获取经理登陆信息
export function getManagerLoginFormation(userid,password) {
  return request({
    url: `http://121.4.105.202:8889/managers/search/findByIdAndPassword?id=${userid}&password=${password}`,
    method: 'get',
  });
}
// 根据username&&pwd获取物业人员登陆信息
export function getPropertyLoginformationName(username,password) {
  return request({
    url: `http://121.4.105.202:8889/employees/search/findByUsernameAndPassword?username=${username}&password=${password}`,
    method: 'get',
  });
}
// 根据username&&pwd获取经理登陆信息
export function getManagerLoginFormationName(username,password) {
  return request({
    url: `http://121.4.105.202:8889/managers/search/findByUsernameAndPassword?username=${username}&password=${password}`,
    method: 'get',
  });
}
