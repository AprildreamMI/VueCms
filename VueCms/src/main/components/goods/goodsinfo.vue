<template>
    <div>
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @enter-cancelled="enterCancelled"
        >
            <div v-show="flag" ref="topbell" class="bell"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <sildrview :lunBoList="this.lunBoList" :bolfull="this.bolfull"></sildrview>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{ goodObject.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        市场价：<del>￥{{ goodObject.market_price }}</del> &nbsp;&nbsp;
                        销售价: <span class="now_price">￥{{ goodObject.sell_price }}</span>
                    </p>
                    <p>
                        购买数量：<numbar :maxNum="goodObject.stock_quantity" @getGoodNum="getGoodsNum"></numbar>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodObject.goods_no }}</p>
                    <p>库存情况：{{ goodObject.stock_quantity }}</p>
                    <p>上架时间：{{ goodObject.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import sildrview from '../subcomponents/silderview.vue'
    import numbar from '../subcomponents/numbar.vue'
    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                id:this.$route.params.id,
                lunBoList:[],
                bolfull:false,
                goodObject:{},
                flag:false,
                goodsNum:1
            }
        },
        created() {
            this.getGoodsPicture()
            this.getGoodObject()
        },
        methods:{
            getGoodObject() {
                this.$http.get(`api/getGoodObject?goods_id=${this.id}`).then(result =>{
                    if (result.body.status === 0 ) {
                        this.goodObject = result.body.result[0];
                    } else {
                        Toast({
                            message: '商品详细数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            },
            getGoodsPicture() {
                this.$http.get(`api/getGoodsPicture?goods_id=${this.id}`).then(result =>{
                    if (result.body.status === 0 ) {
                        this.lunBoList = result.body.result;
                        console.log(this.lunBoList)
                    } else {
                        console.log(result.body)
                        Toast({
                            message: '商品轮播数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            },
            beforeEnter(ele) {
                ele.style.transform='translate(0px,0px)';
            },
            enter(ele,afterEnter) {
                ele.offsetWidth;

                var topbellposition = this.$refs.topbell.getBoundingClientRect();
                var numbellposition = document.getElementById('num-bell').getBoundingClientRect();
                var top = numbellposition.top - topbellposition.top;
                var left = numbellposition.left - topbellposition.left

                ele.style.transform=`translate(${left}px,${top}px)`;
                ele.style.transition='all 0.5s ease'
                afterEnter();
            },
            afterEnter(ele) {
                this.flag = !this.flag;
            },
            addCart() {
                this.flag = !this.flag

                this.$store.commit('addCart',{
                    goods_id:parseInt(this.id),
                    count:parseInt(this.goodsNum),
                    price:this.goodObject.sell_price,
                    isbol:true
                })
            },
            getGoodsNum(goodsNum) {
                this.goodsNum = goodsNum;
                console.log('父组件'+this.goodsNum);
            }
        },
        components:{
            sildrview,
            numbar
        },
    }
</script>

<style lang="scss" scoped>
    .now_price {
        color: red;
        font-size: 18px;
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }
    .bell {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 410px;
        z-index: 99;
        left: 77px;
    }
</style>