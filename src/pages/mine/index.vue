<script setup>
import { ref } from 'vue';
import { userAccount, userFolloweds, userFollows, userLevel, userLikeList } from '../../API/user';
import { Clock, Download, Top, Shop3, HeartFill } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
const account = ref({})
const concern = ref([])
const fans = ref([])
const level = ref('')
const value = ref('1')
const likelist = ref([])
const getUserAccount = async () => {
    const res = await userAccount()
    account.value = res
    const res1 = await userFollows(res.account.id)
    concern.value = res1.follow
    const res2 = await userFolloweds(res.account.id)
    fans.value = res2.followeds
    const res3 = await userLevel()
    level.value = res3.data?.level
    const res4 = await userLikeList(res.account.id)
    likelist.value = res4.ids
}
getUserAccount()
const goToLike = () => {
    Taro.navigateTo({
        url: `/pages/like/index?likelist=${likelist.value}`
    })
}
</script>
<template>
    <div>
        <div class="mn-top">
            <nut-avatar size="large" style="margin-top: 20px;"><img :src="account.profile?.avatarUrl" /> </nut-avatar>
            <span style="color: white; margin-top: 15px;">{{ account.profile?.nickname }}</span>
            <div style="display: flex; margin-top: 8px;">
                <span class="mn-top-list">{{ concern.length }}<span class="mn-top-sp">关注</span></span>
                <span class="mn-top-list">{{ fans.length }}<span class="mn-top-sp">粉丝</span></span>
                <span class="mn-top-list">Lv.{{ level }}<span class="mn-top-sp">等级</span></span>
            </div>
            <div style="display: flex; margin-top: 10px;">
                <nut-button color="rgb(144, 124, 124)" size="small" class="mn-top-bt">
                    <template #icon>
                        <Clock size="13" class="mn-top-in" />最近
                    </template>
                </nut-button>
                <nut-button color="rgb(144, 124, 124)" size="small" class="mn-top-bt">
                    <template #icon>
                        <Download size="13" class="mn-top-in" />本地
                    </template>
                </nut-button>
                <nut-button color="rgb(144, 124, 124)" size="small" class="mn-top-bt">
                    <template #icon>
                        <Top size="13" class="mn-top-in" />云盘
                    </template>
                </nut-button>
                <nut-button color="rgb(144, 124, 124)" size="small" class="mn-top-bt">
                    <template #icon>
                        <Shop3 size="13" class="mn-top-in" />已购
                    </template>
                </nut-button>
            </div>
        </div>
        <div class="mn-center">
            <nut-tabs v-model="value" background="white">
                <nut-tab-pane title="音乐" pane-key="1">
                    <div class="mn-center-like">
                        <HeartFill size="50" color="rgb(214, 101, 101)" />
                        <div style="margin-top: 4px; margin-left: 10px;" @click="goToLike">
                            <span>我喜欢的音乐</span>
                            <span style="color: rgb(175, 173, 173); font-size: 13px;">{{ likelist.length }}首</span>
                        </div>
                    </div>

                </nut-tab-pane>
                <nut-tab-pane title="博客" pane-key="2"> 博客 </nut-tab-pane>
                <nut-tab-pane title="动态" pane-key="3"> 动态 </nut-tab-pane>
            </nut-tabs>
        </div>
    </div>
</template>
<style>
.mn-center-like {
    width: 100%;
    display: flex;
    height: 150px;
    /* background: pink; */
}

.mn-top-in {
    padding-left: 10px;
}

.mn-top-bt {
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mn-top-sp {
    color: rgb(189, 187, 187);
    font-weight: 200;
    font-size: 20px;
    padding-left: 5px;
}

.mn-top-list {
    height: 30px;
    line-height: 30px;
    display: flex;
    color: white;
    font-size: 26px;
    font-weight: 400;
    margin-left: 10px;
}

.mn-top {
    display: flex;
    height: 380px;
    flex-direction: column;
    align-items: center;
    background-color: rgb(130, 98, 98);
}
</style>