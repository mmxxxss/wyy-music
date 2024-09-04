<script setup>
import { musicLyric } from '../../API/music';
import { useMusicStore } from '../../stores/modules/music';
import { useAudioStore } from '../../stores/modules/audio';
import { ref, watch } from 'vue';
import { PlayDoubleBack, PlayDoubleForward, PlayStart, PlayStop } from '@nutui/icons-vue-taro';
const musicStore = useMusicStore()
const lyricArrays = ref([])
const activeIndex = ref(0)
const transformStyle = ref('')
const parseLyrics = async () => {
    const { lrc } = await musicLyric(musicStore.ids[musicStore.currentPlay])
    const lines = lrc.lyric.split('\n');
    const lyrics = [];
    for (const line of lines) {
        const a = line.substring(line.indexOf(']') + 1);
        const b = line.substring(1, line.indexOf(']'));
        const newLine = `${b}${a}`;
        const match = newLine.match(/(\d{2}):(\d{2}).(\d{2,3})(.+)/);
        if (match) {
            const [, minutes, seconds, , content] = match
            const timestamp = parseInt(minutes) * 60 + parseInt(seconds);
            lyrics.push({ timestamp, content });
        }
    }
    lyricArrays.value = lyrics;
};
const lastMusic = () => {
    musicStore.subCurrentPlay()
    parseLyrics()
}
const nextMusic = () => {
    musicStore.addCurrentPlay()
    parseLyrics()
}
parseLyrics()
const audioStore = useAudioStore()
watch(() => audioStore.currentTime, (newTime) => {
    for (let i = 0; i < lyricArrays.value.length; i++) {
        if (lyricArrays.value[i].timestamp < newTime) {
            activeIndex.value = i
            transformStyle.value = `transform: translateY(${-activeIndex.value * 30}px)`
        }
    }
})
</script>
<template>
    <div class="box">
        <div>
            <span class="lc-name">{{ musicStore.songsList[musicStore.currentPlay].name }}</span>
            <div style="display: flex;">
                <span v-for="(item, index) in musicStore.songsList[musicStore.currentPlay].ar" class="lc-actor">{{
                    item.name }}
                    <span v-if="index !== musicStore.songsList[musicStore.currentPlay].ar.length - 1">/</span>
                </span>
            </div>
        </div>
        <div class="msg">
            <ul :style="transformStyle">
                <li v-for="(item, index) in lyricArrays" :key="item.timestamp"
                    :class="activeIndex === index ? 'active' : ''">
                    {{ item.content }}
                </li>
            </ul>
        </div>
        <div style="display: flex; margin-top: 40px;">
            <PlayDoubleBack color="white" size="40px" style="margin-right: 30px;" @click="lastMusic">
            </PlayDoubleBack>
            <PlayStart color="white" size="40px" v-if="audioStore.plstart" @click="audioStore.playAudio()"></PlayStart>
            <PlayStop color="white" size="40px" v-if="audioStore.plstop" @click="audioStore.pauseAudio()"></PlayStop>
            <PlayDoubleForward color="white" size="40px" style="margin-left: 30px;" @click="nextMusic">
            </PlayDoubleForward>
        </div>
    </div>
</template>
<style lang="scss">
.box {
    width: 100%;
    display: flex;
    align-items: center;
    background: linear-gradient(to bottom, rgb(223, 191, 211), rgb(191, 213, 223));
    // background-color: rgb(191, 213, 223);
    flex-direction: column;
    height: 100vh;

    .lc-name {
        color: white;
        font-size: 45px;
        font-weight: 600;
        margin-top: 40px;
    }

    .lc-actor {
        display: flex;
        color: white;
        font-size: 35px;
        font-weight: 400;
    }

    .msg {
        width: 100%;
        height: 1000px;
        overflow: hidden;
        margin-top: 50px;

        ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 150px;
            transition: ease .5s;

            li {
                list-style: none;
                color: white;
                margin-top: 30px;
                line-height: 30px;
                transition: all .5s;
                cursor: pointer;

                &.active {
                    color: rgb(80, 159, 86);
                    transform: scale(1.3);
                    // font-size: 30px;
                }
            }
        }
    }
}
</style>