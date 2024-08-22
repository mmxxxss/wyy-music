export default defineAppConfig({
  pages: [
    "pages/login/index",
    "pages/index/index",
    "pages/home/index",
    "pages/find/index",
    "pages/mine/index",
    "pages/search/index",
    "pages/like/index",
  ],
  tabBar: {
    color: "#000000",
    selectedColor: "#FF0000",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/find/index",
        text: "发现",
      },
      {
        pagePath: "pages/home/index",
        text: "动态",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
