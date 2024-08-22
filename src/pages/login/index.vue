<script setup>
import Taro from '@tarojs/taro';
import { reactive, ref } from 'vue'
import { userRegisiter } from '../../API/user'
const formData = ref({
    email: '',
    password: ''
})
const notifyState = {
    state: reactive({
        show: false,
        desc: '账号或密码错误',
        type: 'danger'
    }),
}
const loginIn = async () => {
    const res = await userRegisiter(formData.value.email, formData.value.password)
    if (res.code === 502) {
        notifyState.state.show = true;
    }
    else {
        Taro.setStorageSync('cookie', res.cookie);
        Taro.switchTab({
            url: '../index/index'
        })
    }
}
</script>
<template>
    <nut-notify :type="notifyState.state.type" v-model:visible="notifyState.state.show" :msg="notifyState.state.desc" />
    <nut-form :model-value="formData">
        <nut-form-item>
            <nut-input placeholder="请输入邮箱" v-model="formData.email"></nut-input>
        </nut-form-item>
        <nut-form-item>
            <nut-input placeholder="请输入密码" v-model="formData.password" type="password"></nut-input>
        </nut-form-item>
    </nut-form>
    <nut-button type="success" size="large" @click="loginIn">登录</nut-button>
</template>