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
//修改
export function updataDepartments({
                                      id,
                                      departmentName,
                                  }) {
    // console.log(departmentName + "001");
    return request({
        url: `/departments/${id}`,
        method: 'PUT',
        data: { //传给后端的json,参数根据具体信息修改
            'name': departmentName,
        }
    })
}