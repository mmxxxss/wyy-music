import { defineStore } from "pinia";
import { ref } from "vue";
import Taro from "@tarojs/taro";
export const useMusicStore = defineStore(
  "musicStore",
  () => {
    const ids = ref([]);
    const currentPlay = ref();

    const addIds = async (newId) => {
      const id = ids.value.findIndex((item) => item === newId);
      if (id !== -1) {
        ids.value.splice(id, 1);
        if (id <= currentPlay.value) {
          ids.value.splice(currentPlay.value, 0, newId);
        } else {
          ids.value.splice(currentPlay.value + 1, 0, newId);
          currentPlay.value++;
        }
      } else {
        if (ids.value.length > 0) {
          ids.value.splice(currentPlay.value + 1, 0, newId);
          currentPlay.value++;
        } else {
          ids.value.push(newId);
          currentPlay.value = 0;
        }
      }
    };
    const addCurrentPlay = () => {
      currentPlay.value++;
    };
    const delIds = (index) => {
      if (index < currentPlay.value) {
        currentPlay.value--;
      }
      ids.value.splice(index, 1);
    };
    return {
      ids,
      currentPlay,
      addIds,
      delIds,
      addCurrentPlay,
    };
  },
  {
    persist: true,
  }
);
