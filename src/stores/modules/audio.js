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
    innerAudioContext.onEnded(() => {
      musicStore.addCurrentPlay();
      console.log(musicStore.currentPlay, "111");
      if (musicStore.currentPlay >= musicStore.ids.length) {
        musicStore.resetCurrentPlay();
        console.log(musicStore.currentPlay, "222");
        if (musicStore.ids.length === 1) {
          playAudio();
        }
      }
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
