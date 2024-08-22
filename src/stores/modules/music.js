import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { musicSrc, musicDetail } from "../../API/music";
import { useAudioStore } from "./audio";
export const useMusicStore = defineStore(
  "musicStore",
  () => {
    const isShow = ref(false);
    const ids = ref([]);
    const currentPlay = ref();
    const playList = ref([]);
    const songsList = ref([]);
    const url = ref("");
    const name = ref("");
    const actor = ref([]);
    const audioStore = useAudioStore();
    watch(
      () => currentPlay.value,
      (newPlay) => {
        if (newPlay === undefined) {
          return;
        }
        audioStore.innerAudioContext.src = playList.value[newPlay];
        url.value = songsList.value[newPlay].al?.picUrl;
        name.value = songsList.value[newPlay].name;
        actor.value = songsList.value[newPlay].ar;
      }
    );
    const addIds = async (newId) => {
      const id = ids.value.findIndex((item) => item === newId);
      if (id !== -1) {
        ids.value.splice(id, 1);
        const a = playList.value.splice(id, 1)[0];
        const b = songsList.value.splice(id, 1)[0];
        if (id <= currentPlay.value) {
          playList.value.splice(currentPlay.value, 0, a);
          songsList.value.splice(currentPlay.value, 0, b);
          ids.value.splice(currentPlay.value, 0, newId);
        } else {
          playList.value.splice(currentPlay.value + 1, 0, a);
          songsList.value.splice(currentPlay.value + 1, 0, b);
          ids.value.splice(currentPlay.value + 1, 0, newId);
          currentPlay.value++;
        }
      } else {
        if (ids.value.length > 0) {
          const res1 = await musicSrc(newId);
          playList.value.splice(currentPlay.value + 1, 0, res1.data[0].url);
          const res2 = await musicDetail(newId);
          songsList.value.splice(currentPlay.value + 1, 0, res2.songs[0]);
          ids.value.splice(currentPlay.value + 1, 0, newId);
          currentPlay.value++;
        } else {
          isShow.value = true;
          console.log(isShow.value);

          const res1 = await musicSrc(newId);
          playList.value.push(res1.data[0].url);
          const res2 = await musicDetail(newId);
          songsList.value.push(res2.songs[0]);
          ids.value.push(newId);
          currentPlay.value = 0;
        }
      }
    };
    const addCurrentPlay = () => {
      currentPlay.value++;
    };
    const resetCurrentPlay = () => {
      currentPlay.value = 0;
    };

    const delIds = (index) => {
      if (index < currentPlay.value) {
        currentPlay.value--;
      }
      if (
        (index === ids.value.length - 1) &
        (currentPlay.value === ids.value.length - 1) &
        (ids.value.length !== 1)
      ) {
        resetCurrentPlay();
      }
      ids.value.splice(index, 1);
      playList.value.splice(index, 1);
      songsList.value.splice(index, 1);
      if (ids.value.length === 0) {
        audioStore.stopAudio();
        currentPlay.value = undefined;
        isShow.value = false;
        url.value = "";
        name.value = "";
        actor.value = "";
      }
    };
    return {
      ids,
      currentPlay,
      songsList,
      playList,
      name,
      url,
      actor,
      isShow,
      addIds,
      delIds,
      addCurrentPlay,
      resetCurrentPlay,
    };
  },
  {
    persist: true,
  }
);
