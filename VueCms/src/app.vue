<!--根组件-->
<template>
    <div class="myTopBar">
        <mt-header fixed title="VueCms">
            <span slot="left" @click="goBack" v-show="bol">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <transition>
            <router-view></router-view>
        </transition>

        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-llb" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="num-bell">
                        {{ this.$store.getters.goodsBellNum }}
                    </span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bol:false
            }
        },
        created() {
            this.bol=this.$route.path==='/home'? false : true
        },
        methods:{
            goBack() {
                console.log(1);
                this.$router.go(-1)
            }
        },
        watch:{
            '$route.path':function (newValue) {
                if (newValue === '/home') {
                    this.bol = false
                } else {
                    this.bol = true
                }
            }
        }
    }
</script>

<style scoped>
    .myTopBar {
        padding-top: 40px;
        padding-bottom: 67px;
        /*放置出现左右滑动条*/
        overflow-x: hidden;
    }
    /*哪个组件需要动画，就去他的坑里*/
    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }

     /*该类名，解决 tabbar 点击无法切换的问题*/
       .mui-bar-tab .mui-tab-item-llb.mui-active {
           color: #007aff;
       }

    .mui-bar-tab .mui-tab-item-llb {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>