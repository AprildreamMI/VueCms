<template>
    <div>
        <!--移除了 mui-fullscreen 全屏样式-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
                    <a v-for="item in picturecat" :key="item.id" @click.prevent="getPrictureList(item.id)" :class="['mui-control-item',item.id === 0? 'mui-active':'']">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in picturelist" :key="item.picture_id" :to="'/home/photoinfo/' + item.picture_id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    // import mui from '../../../lib/mui/js/mui.js'
    export default {
        data() {
          return {
              // 图片分类数组
              picturecat:[],
              picturelist:[]
          }
        },
        created() {
          this.getPrictureCatList();
          this.getPrictureList(0);
        },
        methods:{
            /*获取分类*/
          getPrictureCatList() {
              this.$http.get('api/getPhotoCatList').then(result =>{
                  if (result.body.status === 0 ) {
                      this.picturecat = result.body.result;
                      this.picturecat.unshift({
                          'id':0,
                          'title':'全部'
                      })
                  } else {
                      Toast({
                          message: '分类数据加载失败',
                          position: 'bottom',
                          duration: 1500
                      });
                  }
              });
          },
            /*获取图片列表*/
            getPrictureList(cat_id) {
                this.$http.get('api/getPhotoList?cat_id='+cat_id).then(result =>{
                    if (result.body.status === 0 ) {
                        this.picturelist = result.body.result;
                    } else {
                        Toast({
                            message: '图片列表数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                });
            }
        },
        mounted() {
            /*必须在挂在DOM之前进行初始化滑动组件*/
            this.GLOBAL_Mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style lang="scss" scoped>
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
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                    }
            }
        }
    }
</style>