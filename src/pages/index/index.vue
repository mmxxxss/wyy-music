<script setup>
import { ref, watch } from 'vue'
import { Search2, Left, Right, Photograph, Message, Service, PlayStart, Success } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import { musicBanner, musicRecommendPlayList, musicRecommendMusic } from '../../API/music';
import { useMusicStore } from '../../stores/modules/music';
import audioplayer from '../../components/Audioplayer/audioplayer.vue';
const formattedNumber = (e) => {
  const value = e;
  if (value >= 10000) {
    return (value / 10000).toFixed(2) + "万";
  } else {
    return value;
  }
}
const list = ref([])
const playList = ref([])
const recommendMusic = ref([])
const getBanner = async () => {
  const res1 = await musicBanner()
  list.value = res1.banners
  const res2 = await musicRecommendPlayList()
  playList.value = res2.result
  const res3 = await musicRecommendMusic()
  recommendMusic.value = res3.data.dailySongs
}
getBanner()
const swiperRef = ref()
const handlePrev = () => {
  swiperRef.value?.prev()
}
const handleNext = () => {
  swiperRef.value?.next()
}
const val = ref('')
const getMusic = () => {
  Taro.redirectTo({
    url: `/pages/search/index?keywords=${val.value}`
  })
}
const musicStore = useMusicStore()
const getMusicId = (musicid) => {
  musicStore.addIds(musicid)
}
</script>

<template>
  <nut-searchbar v-model="val" @search="getMusic">
    <template #leftout>
      <Left />
    </template>
    <template #leftin>
      <Search2 />
    </template>
    <template #rightin>
      <Photograph />
    </template>
    <template #rightout>
      <Message />
    </template>
  </nut-searchbar>
  <div class="swiper-demo">
    <nut-swiper ref="swiperRef" :init-page="2" :auto-play="3000" pagination-visible pagination-color="#426543"
      pagination-unselected-color="#808080">
      <nut-swiper-item v-for="(item, index) in list" :key="index" style="height: 150px">
        <img :src="item.imageUrl" alt="" style="height: 100%; width: 100%" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>
    <div class="swiper-btns">
      <div class="swiper-btn" @click="handlePrev">
        <Left></Left>
      </div>
      <div class="swiper-btn" @click="handleNext">
        <Right></Right>
      </div>
    </div>
  </div>
  <div class="ix-pl">
    <h4 style="margin-left: 8px; font-weight: 500;">推荐歌单</h4>
    <div class="ix-pl-box">
      <div v-for="item in playList" class="ix-pl-item">
        <img :src=item.picUrl alt="" class="ix-pl-img">
        <div class="ix-pl-num">
          <Service size="10" color="white" style="margin-top: 2px;"></Service>
          <span class="ix-pl-count">{{ formattedNumber(item.playCount) }}</span>
        </div>
        <span class="ix-pl-sp">{{ item.name }}</span>
      </div>
    </div>
  </div>
  <div class="ix-mc">
    <h4 style="margin-left: 8px; font-weight: 500;">推荐好歌</h4>
    <div class="ix-mc-box">
      <div style="display: flex;width: 300%;">
        <div v-for="music in recommendMusic.slice(0, 3)" class="ix-mc-item">
          <img :src=music.al.picUrl alt="" class="ix-mc-img">
          <div style="margin-left: 10px;">
            <span class="ix-mc-name">{{ music.name }}</span>
            <div style="display: flex;">
              <span v-for="(item, index) in music.ar" class="ix-mc-ar">{{ item.name }}
                <span v-if="index !== music.ar.length - 1">/</span>
              </span>
            </div>
          </div>
          <PlayStart size="22" class="ix-mc-ps" @click="getMusicId(music.id)"></PlayStart>
        </div>
      </div>
      <div style="display: flex;width: 300%;">
        <div v-for="music in recommendMusic.slice(3, 6)" class="ix-mc-item">
          <img :src=music.al.picUrl alt="" class="ix-mc-img">
          <div style="margin-left: 10px;">
            <span class="ix-mc-name">{{ music.name }}</span>
            <div style="display: flex;">
              <span v-for="(item, index) in music.ar" class="ix-mc-ar">{{ item.name }}
                <span v-if="index !== music.ar.length - 1">/</span>
              </span>
            </div>
          </div>
          <PlayStart size="22" class="ix-mc-ps" @click="getMusicId(music.id)"></PlayStart>
        </div>
      </div>
      <div style="display: flex; width: 300%;">
        <div v-for="music in recommendMusic.slice(6, 9)" class="ix-mc-item">
          <img :src=music.al.picUrl alt="" class="ix-mc-img">
          <div style="margin-left: 10px;">
            <span class="ix-mc-name">{{ music.name }}</span>
            <div style="display: flex;">
              <span v-for="(item, index) in music.ar" class="ix-mc-ar">{{ item.name }}
                <span v-if="index !== music.ar.length - 1">/</span>
              </span>
            </div>
          </div>
          <PlayStart size="22" class="ix-mc-ps" @click="getMusicId(music.id)"></PlayStart>
        </div>
      </div>
    </div>
  </div>
  <div v-show="musicStore.isShow">
    <audioplayer></audioplayer>
  </div>
</template>
<style>
.ix-mc {
  margin-top: 15px;
  margin-left: 15px;
}

.ix-mc-box {
  display: flex;
  margin-top: 5px;
  /* overflow: hidden; */
  flex-direction: column;
  overflow-x: auto;
  scrollbar-width: none;
}

.ix-mc-box::-webkit-scrollbar {
  display: none;
  /* 针对基于 Webkit 内核的浏览器（如 Chrome、Safari 等）隐藏滚动条 */
}

.ix-mc-ps {
  position: absolute;
  margin-top: 10px;
  margin-right: 80px;
  right: 0;
}

.ix-mc-item {
  display: flex;
  width: 100%;
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
}

.ix-mc-name {
  font-size: 28px;
}

.ix-mc-ar {
  display: flex;
  font-size: 22px;
  color: rgb(175, 173, 173);
}

.ix-mc-img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}

.ix-pl {
  margin-top: 10px;
  margin-left: 15px;
}

.ix-pl-box {
  margin-top: 15px;
  display: flex;
  overflow: hidden;
  overflow-x: auto;
  scrollbar-width: none;
}

.ix-pl-box::-webkit-scrollbar {
  display: none;
  /* 针对基于 Webkit 内核的浏览器（如 Chrome、Safari 等）隐藏滚动条 */
}

.ix-pl-item {
  position: relative;
  margin-left: 10px;
  margin-right: 20px;
}


.ix-pl-num {
  display: flex;
  position: absolute;
  top: 0;
  margin-left: 10px;
  margin-top: 10px;
}

.ix-pl-count {
  margin-left: 5px;
  font-size: 20px;
  color: white;
}

.ix-pl-sp {
  font-size: 26px;
  color: rgb(72, 72, 72);
  width: 200px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.ix-pl-img {
  width: 200px;
  height: 200px;
  border-radius: 15px;
}

.swiper-demo {
  position: relative;
}

.swiper-btns {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  justify-content: space-between;
}

.swiper-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>