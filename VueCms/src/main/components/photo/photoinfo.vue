<template>
    <div class="photoCon">
        <h3 class="title">{{ photoObject.title }}</h3>
        <p class="mui-ellipsis">
            <!--格式化时间 用的是全局的过滤器-->
            <span>发表时间 {{ photoObject.add_time | dataFormat}}</span>
            <span>点击:{{ photoObject.click }}次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <!--<div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list" 	:src="item.img_url" height="100" @click="$preview.open(index, list)" :key="index">
        </div>-->

        <ul class="photo-list">
            <img v-for="(item,i) in list":key="i" v-lazy="item.img_url">
        </ul>

        <div class="content" v-html="photoObject.zhaiyao">

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
                sign:"picture_id",
                photoObject:{},
                list:[]
            }
        },
        created() {
            this.getPhotoInfo();
            this.getPhotoMater();
        },
        methods:{
            getPhotoInfo() {
                this.$http.get('api/getPhotoObject?id='+this.id).then(result =>{
                    if (result.body.status === 0 ) {
                        this.photoObject = result.body.result[0];
                        console.log(this.photoObject)
                    } else {
                        console.log(result.body)
                        Toast({
                            message: '图片详情数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            },
            getPhotoMater() {
                this.$http.get('api/getPhotoMater?id='+this.id).then(result =>{
                    if (result.body.status === 0 ) {
                        result.body.result.forEach(item=>{
                            item.w = 820;
                            item.h = 512;
                        })
                        this.list = result.body.result;
                        console.log(this.list)
                    } else {
                        console.log(result.body)
                        Toast({
                            message: '图片缩略图数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            }
        },
        components:{
            'subcom-box':subCom
        }
    }
</script>

<style lang="scss" scoped>
    .photoCon {
        padding: 5px 5px 0 5px;
        font-size: 14px;
        text-align: center;
        .photo-list {
            list-style: none;
            margin: 0;
            padding: 10px;
            padding-bottom: 0;
            li {
                background-color: #ccc;
                text-align: center;
                margin-bottom: 10px;
                box-shadow: 0 0 9px #999;
                position: relative;
                img {
                    width: 100%;
                    vertical-align: middle;
                }
                /*懒加载*/
                img[lazy="loading"] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
            }
        }
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
        .content {
            margin-top: 20px;
        }
        .mui-ellipsis {
            font-size: 12px;
            color: #226aff;
            display: flex;
            /*两端对齐*/
            justify-content: space-between;
        }
        .thumbs{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>