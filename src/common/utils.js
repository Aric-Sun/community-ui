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

var loadUtil = {
    /*
     * 方法说明：【动态加载js文件css文件】
     * @param fileurl 文件路径，
     * @param filetype 文件类型，支持传入类型，js、css
     */
    loadjscssfile:function(fileurl,filetype){
        if(filetype == "js"){
            var fileref = document.createElement('script');
            fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src",fileurl);
        }else if(filetype == "css"){
 
            var fileref = document.createElement('link');
            fileref.setAttribute("rel","stylesheet");
            fileref.setAttribute("type","text/css");
            fileref.setAttribute("href",fileurl);
        }
        if(typeof fileref != "undefined"){
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }else{
            alert("loadjscssfile method error!");
        }
    }
}