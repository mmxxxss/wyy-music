<script setup>
import Taro from '@tarojs/taro';
import { musicDetail } from "../../API/music"
import { ref } from 'vue';
import { Service } from '@nutui/icons-vue-taro'
import { useMusicStore } from '../../stores/modules/music';
const likeId = Taro.getCurrentInstance().router.params.likelist
const likeList = ref([])
const getLikeList = async () => {
    const { songs } = await musicDetail(likeId)
    console.log(songs, 'songs');
    likeList.value = songs
}
getLikeList()
const musicStore = useMusicStore()
const getMusicId = (musicid) => {
    musicStore.addIds(musicid)
}
</script>
<template>
    <div v-for="item in likeList" class="like-list">
        <div class="left">
            <span class="music">{{ item.name }}</span>
            <div style="display: flex;" class="actor">
                <span v-for="(item1, index1) in item.ar" style="display: flex;">{{ item1.name }}
                    <span v-if="index1 !== item.ar.length - 1">/</span>
                </span>
            </div>
        </div>
        <div class="right">
            <Service size="25px" color="rgb(175, 173, 173)" class="icon" @click="getMusicId(item.id)"></Service>
        </div>
    </div>
</template>
<style>
.like-list {
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

.music {
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.actor {
    display: flex;
    color: rgb(175, 173, 173);
    font-size: 26px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>