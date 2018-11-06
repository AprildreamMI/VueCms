<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunBoList" :key="item.img">
            <a :href="item.url">
                <img :src="item.img" :class="{bolfulltype:bolfull}" alt="">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        props:["lunBoList","bolfull"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            a {
                display: block;
                width: 100%;
                height: 100%;
                img {
                    display: block;
                    margin: 0 auto;
                    height: 100%;
                }
            }
        }
    }
    .bolfulltype {
        width: 100%;
    }
</style>