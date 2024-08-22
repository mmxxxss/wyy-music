import { defineStore } from "pinia";
import { ref } from "vue";
import Taro from "@tarojs/taro";
import { useMusicStore } from "./music";
export const useAudioStore = defineStore(
  "audioStore",
  () => {
    const isAudio = ref(false);
    const musicStore = useMusicStore();
    const innerAudioContext = Taro.createInnerAudioContext({
      useWebAudioImplement: false,
    });
    innerAudioContext.autoplay = true;
    const changeAudio = () => {
      isAudio.value = true;
    };
    const pauseAudio = () => {
      innerAudioContext.pause();
    };
    const playAudio = () => {
      innerAudioContext.play();
    };
    const stopAudio = () => {
      innerAudioContext.stop();
    };
    const onEnded = () => {
      innerAudioContext.onEnded(() => {
        musicStore.addCurrentPlay();
        if (musicStore.currentPlay >= musicStore.ids.length) {
          musicStore.currentPlay = 0;
        }
      });
    };
    return {
      isAudio,
      innerAudioContext,
      changeAudio,
      pauseAudio,
      playAudio,
      stopAudio,
      onEnded,
    };
  },
  {
    persist: true,
  }
);
