import { request } from "./request";
/**
 * 疫情防控等级调整
 * promise
 */
 export function getLevel() {
  return request({
    url: "/custom/epidemicLevel",
    method: 'get',
  });
}
 export function updataLevel({
  code
  }) {
    // console.log(code);
    return request({
      url: `/custom/epidemicLevel?level=${code}`,
      method: 'put',
      // data: { //传给后端的json,参数根据具体信息修改
      //   'code': level,
      // }
    })
  }
  
  export function getExt(filename) {
    if (typeof filename == 'string') {
        return filename
            .split('.')
            .pop()
            .toLowerCase()
    } else {
        throw new Error('filename must be a string type')
    }
}
