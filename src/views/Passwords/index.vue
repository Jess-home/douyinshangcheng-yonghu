<template>
    <nav-bar title="修改密码" />
    <div class="container">
        <list-tile @click="goRoute('ChangePassword')" title="登录密码" />
        <div style="height:1rem;" />
        <list-tile @click="goRoute('ChangePayPwd')" title="支付密码" />
    </div>
</template>
<script setup>
import ListTile from '@/components/ListTile/index.vue';
const router=useRouter();
const goRoute=routeName=>{
    router.push({name:routeName})
}
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container{
    padding: 1rem;
}
</style>