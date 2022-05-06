import axios from "axios";

// 对axios二次封装
export function request(config) {
  const instance = axios.create({
    baseURL: "/api",
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 800,
  });

  //(2.2).响应拦截;
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
      throw err;
    }
  );

  return instance(config);
}
