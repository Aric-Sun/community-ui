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
// 根据id获取物业人员信息
export function getPropertyformation(userid) {
    return request({
      url: `/employees/${userid}`,
      method: 'get',
    });
  }

//   获取部门名称
export function getDepartmentName(
    departmentId
  ) {
    return request({
      url: `/departments/${departmentId}`,
      method: 'get'
    })
}
//修改员工信息
export function updataPropertyInformation({
  userid,
  department,
  username,
  position,
  password
}) {
  return request({
    url: `/employees/${userid}`,
    method: 'put',
    data: { //传给后端的json,参数根据具体信息修改
      'id': userid,
      'departmentId': department,
      'username': username,
      'password': password,
      'job': position
    }
  })
}
//删除
export function deleteEmployees(id) {
  return request({
    url: `/employees/${id}`,
    method: 'DELETE'
  });
}