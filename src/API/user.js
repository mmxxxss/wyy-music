import Taro from "@tarojs/taro";

export const servie = (path, params, method = "GET") => {
  const cookie = Taro.getStorageSync("cookie");
  return new Promise((resolve, reject) => {
    Taro.request({
      url: "http://localhost:3000" + path,
      data: { cookie, ...params },
      method,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

export const userRegisiter = (email, password) => {
  return servie("/login", { email, password });
};

export const userAccount = () => {
  return servie(`/user/account`);
};

export const userFollows = (uid) => {
  return servie("/user/follows", { uid });
};

export const userFolloweds = (uid) => {
  return servie("/user/followeds", { uid });
};

export const userLevel = () => {
  return servie("/user/level");
};
export const userLikeList = (uid) => {
  return servie("/likelist", uid);
};
