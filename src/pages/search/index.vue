<script setup>
import Taro from '@tarojs/taro';
import { musicSearch } from '../../API/music';
import { ref, reactive, watch } from 'vue';
import { Service } from '@nutui/icons-vue-taro'
import { useMusicStore } from '../../stores/modules/music';
import audioplayer from '../../components/Audioplayer/audioplayer.vue'

const data = ref([]);
const notifyState = {
    state: reactive({
        show: false,
        desc: '播放成功',
        type: 'success'
    }),
}
const init = async () => {
    const keywords = Taro.getCurrentInstance().router.params.keywords
    const res = await musicSearch(keywords);
    data.value = res.result.songs;
}
init();
const musicStore = useMusicStore()
const getMusicId = (musicid) => {
    musicStore.addIds(musicid)
}
</script>

<template>
    <nut-notify :type="notifyState.state.type" v-model:visible="notifyState.state.show" :msg="notifyState.state.desc" />
    <div v-for="music in data" class="searchlist">
        <div class="left">
            <view class="music">{{ music.name }}</view>
            <div class="actorlist">
                <view v-for="(item, index) in music.artists" style="display: flex;">{{ item.name }}
                    <span v-if="index !== music.artists.length - 1">/</span>
                </view>
            </div>
        </div>
        <div class="right">
            <Service size="25px" color="rgb(175, 173, 173)" class="icon" @click="getMusicId(music.id)"></Service>
        </div>
    </div>
    <div v-show="musicStore.isShow">
        <audioplayer></audioplayer>
    </div>
</template>
<style>
.searchlist {
    width: 100%;
    height: 100px;
    display: flex;
    border: 1px solid #efefef;
}

.left {
    flex: 9;
    margin-top: 8px;
    margin-left: 18px;
    display: flex;
    flex-direction: column;
}

.right {
    flex: 1;
}

.icon {
    margin-top: 27px;
}

.actorlist {
    display: flex;
    color: rgb(175, 173, 173);
    font-size: 26px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.music {
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>