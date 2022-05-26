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

export function CheckPhone (s) {
        var patrn = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
        return patrn.exec(s);
    };

/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = '';
    support_ids.forEach(item => {
        if (item.status) {
            supportStr += '&support_ids[]=' + item.id;
        }
    });
    let data = {
        latitude,
        longitude,
        offset,
        limit: '20',
        'extras[]': 'activities',
        keyword: '',
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr
    };
    return fetch('/shopping/restaurants', data);
};

export default function checkPermission(value) {
    if (value && value instanceof Array && value.length > 0) {
        const roles = store.getters && store.getters.roles
        const permissionRoles = value

        const hasPermission = roles.some(role => {
            return permissionRoles.includes(role)
        })
        return hasPermission
    } else {
        console.error(`need roles! Like v-permission="['admin','editor']"`)
        return false
    }
}
export const toUpperCase = (str) => {
    if (str[0]) {
        return str.replace(str[0], str[0].toUpperCase())
    } else {
        return ''
    }
}

export const toLowerCase = (str) => {
    if (str[0]) {
        return str.replace(str[0], str[0].toLowerCase())
    } else {
        return ''
    }
}

// 驼峰转换下划线
export const toSQLLine = (str) => {
    if (str === 'ID') return 'ID'
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// 下划线转换驼峰
export const toHump = (name) => {
    return name.replace(/\_(\w)/g, function(all, letter) {
        return letter.toUpperCase();
    });
}