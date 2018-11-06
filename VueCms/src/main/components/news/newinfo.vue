<template>
    <div class="newsCon">
        <h3 class="title">{{ newObject.title }}</h3>
        <p class="mui-ellipsis">
            <!--格式化时间 用的是全局的过滤器-->
            <span>发表时间 {{ newObject.add_time | dataFormat}}</span>
            <span>点击:{{ newObject.click }}次</span>
        </p>
        <div class="content" v-html="newObject.content">

        </div>

        <subcom-box :sign="this.sign" :id="this.id"></subcom-box>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";

    import subCom from '../subcomponents/comment.vue'

    export default {
        data() {
            return {
                id:this.$route.params.id,
                sign:"news_id",
                newObject:{}
            }
        },
        created() {
            this.getNewsObject()
        },
        methods:{
            getNewsObject() {
                /*不能带/线*/
                this.$http.get('api/getNewsObject?id='+this.id).then(result =>{
                    if (result.body.status === 0 ) {
                        this.newObject = result.body.result[0]
                    } else {
                        Toast({
                            message: '新闻详情数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            }
        },
        /*注册子组件*/
        components:{
            'subcom-box':subCom
        }

    }
</script>

<style lang="scss">
    .newsCon {
        padding: 5px 5px 0 5px;
        font-size: 14px;
        text-align: center;
        .title {
            padding-bottom: 20px;
            padding-top: 20px;
        }
        p {
            margin-bottom: 0px;
        }
        img {
            width: 100%;
        }
        .mui-ellipsis {
            font-size: 12px;
            color: #226aff;
            display: flex;
            /*两端对齐*/
            justify-content: space-between;
        }
    }
</style>