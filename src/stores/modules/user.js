import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore(
  "userStore",
  () => {
    const nickname = ref("111");
    const cookie = ref("");
    const activeTabBar = ref(0);
    const getCookie = (newCookie) => {
      cookie.value = newCookie;
    };
    const changeActiveTabBar = (index) => {
      activeTabBar.value = index;
    };
    return {
      activeTabBar,
      changeActiveTabBar,
      nickname,
      cookie,
      getCookie,
    };
  },
  {
    persist: true,
  }
);
