<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="this.idCount" @change="changeNum" ref="num" readonly>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                goodsNum:1
            }
        },
        mounted() {
            this.GLOBAL_Mui('.mui-numbox').numbox()
        },
        methods:{
            changeNum() {
                this.$store.commit('upadteCount',{
                    goods_id:this.goods_id,
                    count:this.$refs.num.value
                })
            }
        },
        props:['goods_id','idCount'],
        watch:{
            'maxNum':function (newValue,oldValue) {
                this.GLOBAL_Mui('.mui-numbox').numbox().setOption('max',newValue)
            }
        }
    }
</script>

<style scoped>

</style>