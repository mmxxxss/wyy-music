<script setup>
import { useMusicStore } from '../../stores/modules/music';
import { useAudioStore } from '../../stores/modules/audio';
import { ref, reactive, watch } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro'
const notifyState = {
    state: reactive({
        show: false,
        desc: '播放成功',
        type: 'success'
    }),
}
const musicStore = useMusicStore();
const audioStore = useAudioStore()
const emit = defineEmits(['success'])
const musicStart = () => {
    audioStore.playAudio()
}
const musicStop = () => {
    audioStore.pauseAudio()
}
const show = ref(false)
const changeShow = () => {
    show.value = true
}
const getMusicId = (indexid) => {
    musicStore.currentPlay = indexid
    audioStore.stopAudio()
}
const delMusicId = (delid) => {
    musicStore.delIds(delid)
}
watch(() => musicStore.currentPlay, (newPlay) => {
    if (newPlay === undefined)
        show.value = false
})
</script>
<template>
    <nut-notify :type="notifyState.state.type" v-model:visible="notifyState.state.show" :msg="notifyState.state.desc" />
    <div class="audio">
        <div class="au-left">
            <nut-avatar class="music-img"> <img :src="musicStore.url" /> </nut-avatar>
            <span class="music-name">{{ musicStore.name }}</span>
            <span class="symbol">-</span>
            <span v-for="(item, index) in musicStore.actor" class="ad-actor">{{ item.name }}
                <span v-if="index !== musicStore.actor.length - 1">/</span>
            </span>
        </div>
        <IconFont name="play-start" size="27px" class="au-right" @click="musicStart" v-if="audioStore.plstart">
        </IconFont>
        <IconFont name="play-stop" size="27px" class="au-right" @click="musicStop" v-if="audioStore.plstop"></IconFont>
        <IconFont name="horizontal" size="20px" @click="changeShow" class="au-list"></IconFont>
        <nut-popup v-model:visible="show" position="bottom" closeable :style="{ height: '70%' }">
            <span style="font-size: 25px; margin-top: 10px; margin-left: 10px;">播放列表</span>
            <div v-for="(item1, index1) in musicStore.songsList" class="au-songlist">
                <div class="au-sl-left">
                    <view class="au-sl-music">{{ item1.name }}</view>
                    <div class="au-sl-arlist">
                        <view v-for="(item, index) in item1.ar" class="au-sl-ar">{{ item.name }}
                            <span v-if="index !== item1.ar.length - 1">/</span>
                        </view>
                    </div>
                </div>
                <div class="au-sl-right">
                    <IconFont name="close" @click="delMusicId(index1)" class="au-sl-icon" size="25px"
                        color="rgb(175, 173, 173)"></IconFont>
                    <IconFont name="service" size="25px" color="rgb(175, 173, 173)" class="au-sl-icon"
                        @click="getMusicId(index1)">
                    </IconFont>
                </div>
            </div>
        </nut-popup>
    </div>
</template>
<style>
.au-songlist {
    width: 100%;
    height: 100px;
    display: flex;
    border: 1px solid #efefef;
}

.au-sl-left {
    flex: 9;
    margin-top: 8px;
    margin-left: 18px;
    display: flex;
    flex-direction: column;
}

.au-sl-right {
    display: flex;
    flex: 2;
}

.au-sl-icon {
    margin-top: 27px;
    flex: 1
}

.au-sl-arlist {
    display: flex;
}

.au-sl-music {
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.au-sl-ar {
    display: flex;
    color: rgb(175, 173, 173);
    font-size: 26px;
}

.audio {
    position: fixed;
    bottom: 0;
    display: flex;
    height: 100px;
    width: 100%;
    background-color: white;
}

.music-img {
    margin-left: 30px;
}

.music-name {
    margin-top: 20px;
    font-size: 30px;
    margin-left: 15px;
}

.symbol {
    margin-top: 17px;
    color: rgb(175, 173, 173);
}

.ad-actor {
    display: flex;
    margin-top: 20px;
    color: rgb(175, 173, 173);
    font-size: 30px;
}

.au-left {
    display: flex;
    flex: 8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.au-list {
    flex: 1;
    margin-top: 25px;
}

.au-right {
    flex: 1;
    margin-top: 14px;
}
</style>