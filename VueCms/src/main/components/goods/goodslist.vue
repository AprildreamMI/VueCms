<template>
    <div class="goods-list">
        <div @click="gotoinfo(item.goods_id)" v-for="item in goodslist" :key="item.goods_id" class="goods-item">
            <img :src="item.img_url" alt="">
            <h4>{{ item.title }}</h4>
            <div class="goods-item-info">
                <p class="goods-picre">
                    <span>￥{{ item.sell_price }}</span> &nbsp;&nbsp;<span>￥{{ item.market_price }}</span>
                </p>
                <p class="goods-num">
                    <span>热卖中</span>
                    <span>剩余{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
        <mt-button class="btn-concat" type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>

</template>

<script>

    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                goodslist:[],
                page:1
            }
        },
        created() {
            this.getGoodsList(this.page);
        },
        methods:{
            getGoodsList() {
                this.$http.get(`api/getGoodsList?pageIndex=${this.page}`).then(result =>{
                    if (result.body.status === 0) {
                        this.goodslist = this.goodslist.concat(result.body.result)
                    } else {
                        Toast({
                            message: '商品数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            },
            getMore() {
                this.page++
                this.getGoodsList();
            },
            gotoinfo(id) {
                this.$router.push('/home/goodsinfo/'+id)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 8px 8px 0px 8px;
        justify-content: space-between;
        .goods-item {
            min-height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 48%;
            border: 1px solid #cccccc;
            box-shadow: 0 0 8px #cccccc;
            margin-top: 10px;
            img {
                display: block;
                width: 100%;
            }
            h4 {
                margin: 15px 0 4px 0px;
                text-align: center;
                font-size: 16px;
            }
            .goods-item-info {
                padding: 5px 2px 5px 2px;
                p {
                    margin: 0px;
                }
                background-color: #cccccc;
                height: 50px;
                .goods-picre {
                    :nth-of-type(1) {
                        font-size: 18px;
                        color: red;
                    }
                    :nth-of-type(2) {
                        text-decoration:line-through;
                        font-size: 12px;
                    }
                }
                .goods-num {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .btn-concat {
            margin-top: 20px;
        }
    }
</style>