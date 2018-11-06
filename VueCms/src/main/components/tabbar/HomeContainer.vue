<template>
    <div>
        <silderview :lunBoList="this.lunBoList" :bolfull="bolfull"></silderview>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../../../src/image/menu1(1).png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to=/home/photo>
                    <img src="../../../../src/image/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to=/home/goodslist>
                    <img src="../../../../src/image/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import silderview from "../subcomponents/silderview.vue"
    import { Toast } from 'mint-ui';

    export default {
        data:function () {
            return {
                lunBoList:[],
                bolfull:true
            }
        },
        created() {
            this.getListLunBo();
        },
        methods:{
            getListLunBo() {
                this.$http.get("api/getListLunBo").then(result => {
                    if (result.body.status === 0 ) {
                        this.lunBoList = result.body.result
                    } else {
                        Toast({
                            message: '轮播图数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            }
        },
        components:{
            silderview
        }
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
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .mui-table-view.mui-grid-view.mui-grid-9 {
        background-color: white;
        li {
            border-right: none;
            border-bottom: none;
            img {
                width: 60px;
                height: 60px;
            }
        }
    }
</style>
