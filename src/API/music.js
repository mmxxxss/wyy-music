import Taro from "@tarojs/taro";
const servie = (path, params, method = "GET") => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: "http://116.62.219.52:3000" + path,
      data: params,
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
export const musicSearch = (keywords) => {
  return servie("/search", { keywords });
};
export const musicSrc = (id) => {
  return servie(`/song/url?id=${id}`);
};
export const musicDetail = (ids) => {
  return servie("/song/detail", { ids });
};
export const musicBanner = () => {
  return servie("/banner");
};
export const musicRecommendPlayList = () => {
  return servie("/personalized?limit=5");
};
export const musicRecommendMusic = () => {
  return servie("/recommend/songs");
};
