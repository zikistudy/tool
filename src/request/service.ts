import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus';
let loadingInstance = null; //这里是loading
//使用create方法创建axios实例
axios.defaults.timeout = 20000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
if (import.meta.env.VITE_APP_TITLE == 'production') {
  axios.defaults.baseURL = "https://www.ikobe.club:3001/";
} else {
  axios.defaults.baseURL = "http://127.0.0.1:3001/";
}
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // loadingInstance = ElLoading.service({
  //   lock: true,
  //   text: "loading...",
  //   background: "rgba(0, 0, 0, 0.7)",
  // });
  NProgress.configure({showSpinner: true});
  NProgress.start()
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // loadingInstance.close();
    NProgress.done()
    return response.data;
  },
  (error) => {
    const msg = error.Message !== undefined ? error.Message : "";
    ElMessage({
      message: "网络错误" + msg,
      type: "error",
    });
    // loadingInstance.close();
    NProgress.done()
    return Promise.reject(error);
  }
);

// 请求
export function requestData(url:string, params:any) {
  let headers =
    url.indexOf("my") == -1
      ? {}
      : {
          Authorization: sessionStorage.getItem("authorization")
            ? sessionStorage.getItem("authorization")
            : "",
        };
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
