// 防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const getId = link => {
  const str = link.self.href;
  let num = '';
  for (let i = str.length - 1; i >= 0; i--) {
    if (str.charAt(i) === '/') break;
    num = str.charAt(i) + num;
  }
  return +num;
};

/**
 * 对日期进行格式化
 * @param {Date} date 
 */
export const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// 是否使用伪数据
export const MOCK = false;


/**
 * 判断传入参数是什么类型
 * @param {*} o 传入参数
 * @return 传入参数的类型
 */
const TypeJudge = (o) => {
  const types = ["String", "Number", "Boolean", "Function", "Null", "Undefined", "Object", "Array", "Date", "RegExp", "Error", "Symbol", "Promise", "Set"]
  const curType = Object.prototype.toString.call(o).slice(8, -1)
  if (types.indexOf(curType) > -1) {
    return curType
  }
}