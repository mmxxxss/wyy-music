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
    const plstart = ref(true);
    const plstop = ref(false);
    const currentTime = ref("");
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
    const destoryAudio = () => {
      innerAudioContext.destroy();
    };
    innerAudioContext.onPause(() => {
      plstart.value = true;
      plstop.value = false;
    });
    innerAudioContext.onStop(() => {
      plstart.value = true;
      plstop.value = false;
    });
    innerAudioContext.onTimeUpdate(() => {
      currentTime.value = innerAudioContext.currentTime;
    });
    innerAudioContext.onEnded(() => {
      musicStore.addCurrentPlay();
    });
    innerAudioContext.onPlay(() => {
      plstart.value = false;
      plstop.value = true;
    });
    const playStart = () => {
      plstart.value = false;
      plstop.value = true;
    };
    const playStop = () => {
      plstart.value = true;
      plstop.value = false;
    };

    return {
      isAudio,
      innerAudioContext,
      plstart,
      plstop,
      currentTime,
      changeAudio,
      pauseAudio,
      playAudio,
      stopAudio,
      playStart,
      playStop,
      destoryAudio,
    };
  },
  {
    persist: true,
  }
);
