<script setup>
import { eventDynamic } from '../../API/event';
import { ref } from 'vue';
import { useMusicStore } from '../../stores/modules/music';
import audioplayer from '../../components/Audioplayer/audioplayer.vue';
import { Share, Message, Fabulous } from '@nutui/icons-vue-taro';
const dynamic = ref([])
const data = ref({})
const getDynamic = async () => {
    const res = await eventDynamic()
    // console.log(res, 'res');

    data.value = res
    for (let i = 0; i < res.event.length; i++) {
        dynamic.value.push(JSON.parse(res.event[i].json))
    }
    // console.log(dynamic.value);

}
getDynamic()
const musicStore = useMusicStore()
const getMusicId = (id) => {
    musicStore.addIds(id)
}
</script>
<template>
    <div style="margin-left: 10px;">
        <div v-for="item in data.event">
            <div style="display: flex;">
                <nut-avatar size="normal">
                    <img :src=item.user.avatarUrl />
                </nut-avatar>
                <div style="margin-left: 10px;">
                    <span style="font-size: 15px;">{{ item.user.nickname }}</span>
                    <span style="font-size: 10px; color: rgb(175, 173, 173);">{{ item.user.description }}</span>
                    <span style="font-size: 13px; font-weight: 200;">{{ JSON.parse(item.json).msg }}</span>
                    <div style="display: flex; align-items: center;"
                        @click="getMusicId(JSON.parse(item.json).album ? JSON.parse(item.json).album.id : JSON.parse(item.json).song.id)">
                        <img :src="JSON.parse(item.json).album ? JSON.parse(item.json).album.picUrl : JSON.parse(item.json).song.album.picUrl"
                            alt="" class="he-img">
                        <div style="margin-left: 10px;">
                            <span class="he-name">{{
                                JSON.parse(item.json).album ? JSON.parse(item.json).album.name :
                                    JSON.parse(item.json).song.album.name
                            }}</span>
                            <span class="he-name">{{
                                JSON.parse(item.json).album ? JSON.parse(item.json).album.artist.name :
                                    JSON.parse(item.json).song.artists[0].name
                            }}</span>
                        </div>
                    </div>
                    <div style="margin-top: 5px;">
                        <Share class="he-icon1"></Share>
                        <Message class="he-icon"></Message>
                        <Fabulous class="he-icon"></Fabulous>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-show="musicStore.isShow">
        <audioplayer></audioplayer>
    </div>
</template>
<style>
.he-icon1 {
    margin-left: 20px;
}

.he-icon {
    margin-left: 200px;
}

.he-img {
    width: 80px;
    height: 80px;
}

.he-name {
    font-size: 24px;
    font-weight: 300;
    color: rgb(134, 132, 130);
}
</style>