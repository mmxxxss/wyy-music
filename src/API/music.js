import { servie } from "./user";

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
export const musicLyric = (id) => {
  return servie("/lyric", { id });
};
