<template>
    <div>
        <ul class="mui-table-view">
            <li v-for="item in newList" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h3>{{ item.title }}</h3>
                        <p class="mui-ellipsis">
                            <!--格式化时间 用的是全局的过滤器-->
                            <span>发表时间 {{ item.add_time | dataFormat}}</span>
                            <span>点击:{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
                newList:[]
            }
        },
        created() {
            this.getNewList();
        },
        methods:{
            getNewList() {
                this.$http.get('api/getNewList').then(result =>{
                    if (result.body.status === 0) {
                        this.newList = result.body.result
                    } else {
                        Toast({
                            message: '轮播图数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                    console.log(this.newList);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view {
        li {

            h3 {
                font-size: 14px;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                /*两端对齐*/
                justify-content: space-between;
            }
        }
    }
</style>