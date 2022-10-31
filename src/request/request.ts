import { requestData } from "./service";

// 注册用户
let Register = (params:any) => {
  return requestData("api/register", params);
};
// 获取排名
let getRankList = (params:any) => {
  return requestData("api/getRankList", params);
};
export {
  Register,
  getRankList
};
