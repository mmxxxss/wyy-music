<script setup>
import audioplayer from '../../components/Audioplayer/audioplayer.vue';
import { useMusicStore } from '../../stores/modules/music';
const musicStore = useMusicStore()
</script>
<template>
    <div v-show="musicStore.isShow">
        <audioplayer></audioplayer>
    </div>
</template>