<template>
    <div class="car-goods-list">
        <div v-for="(item,index) in goodsCarObject" :key="item.goods_id" class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="car-goods-list-item">
                        <mt-switch @change="updateGoodsBol(item.goods_id,$store.getters.getGoodsBol[item.goods_id])" v-model="$store.getters.getGoodsBol[item.goods_id]"></mt-switch>
                        <img :src="item.img_url" alt="">
                        <div class="goods-item-info">
                            <h3 class="item-info-title">{{ item.title }}</h3>
                            <div class="item-info-contnt">
                                <p class="item-info-contnt-price">￥{{ item.sell_price }}</p>
                                <carnumbar :goods_id="item.goods_id" :idCount="$store.getters.getGoodsCount[item.goods_id]"></carnumbar>
                                <p @click="removeGoods(item.goods_id,index)" class="item-info-contnt-del">
                                    删除
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="jiesuan">
                        <div class="jiesuan-info">
                            <p>总计(不含运费)</p>
                            <p>
                                已勾选商品
                                <span class="red">{{ $store.getters.getGoodsTotal.goodsNum }}</span>,
                                总价￥<span class="red">{{ $store.getters.getGoodsTotal.gooodsTotal }}</span>
                            </p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import carnumbar from '../subcomponents/carnumbar.vue'
    export default {
        data() {
            return {
                goodsCarObject:[],
                idArray:[]
            }
        },
        created() {
          this.getCarGoods();
        },
        methods:{
          getCarGoods() {
              this.$store.state.car.forEach(item => {
                  this.idArray.push(item.goods_id);
              })
              this.$http.get(`api/getGoodsCart?goods_ids=${this.idArray.join(',')}`).then(result =>{
                  if (result.body.status === 0 ) {
                      this.goodsCarObject = result.body.result;
                  } else {
                      Toast({
                          message: '购物车商品数据加载失败',
                          position: 'bottom',
                          duration: 1500
                      });
                  }
              })
          },
          removeGoods(goods_id,index) {
              this.goodsCarObject.splice(index,1)
              console.log(this.goodsCarObject)
              this.$store.commit('removeGoods',goods_id)
          },
          updateGoodsBol(goods_id,bol) {
              this.$store.commit('upadteBol',{
                  goods_id:goods_id,
                  isbol:bol
              })
          }
        },
        components:{
            carnumbar
        }
    }
</script>

<style lang="scss" scoped>
    .car-goods-list {
        .car-goods-list-item {
            display: flex;
            justify-content: space-between;
            img {
                width: 60px;
                height: 60px;
            }
            .goods-item-info {
                text-align: center;
                h3 {
                    font-size: 13px;
                    padding-bottom: 5px;
                }
                .item-info-contnt {
                    display: flex;
                    .mui-numbox {
                        width: 110px;
                        height: 25px;
                    }
                    p {
                        margin-top: 5px;
                    }
                    .item-info-contnt-price {
                        color: red;
                        font-weight: 600;
                        padding-right: 5px;
                    }
                    .item-info-contnt-del {
                        color: blue;
                        padding-left: 5px;
                    }
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            .jiesuan-info{
                .red {
                    color: red;
                }
            }
        }
    }
</style>