<script setup>
import Taro from '@tarojs/taro';
import { musicDetail } from "../../API/music"
const likeList = Taro.getCurrentInstance().router.params.likelist
const getLikeList = async () => {
    const res = await musicDetail(likeList)
}
getLikeList()
</script>
<template>{{ likeList }}</template>