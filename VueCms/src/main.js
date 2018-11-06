// 入口文件
import Vue from 'vue'

// 导入支持路由的包
import VueRouter from 'vue-router'

//安装路由
Vue.use(VueRouter)

// 导入时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function (dataStr,patteren="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(patteren);
})

// 导入支持Resource
import VueResource from 'vue-resource'
// 安装Resorce
Vue.use(VueResource);

// 表单传参
Vue.http.options.emulateJSON = true;

// 设置根路径
Vue.http.options.root = 'http://localhost:3000/';

//按需导入MintUi组件
/*import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload);*/
import mintUi from 'mint-ui'
Vue.use(mintUi)

//导入mui
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import global_mui from './lib/mui/js/mui.js'//引用文件
Vue.prototype.GLOBAL_Mui = global_mui//挂载到Vue实例上面

import Vuex from 'vuex'
Vue.use(Vuex)

// 记住JSON解析的是一个字符串
var car = JSON.parse(window.localStorage.getItem('car') || '[]')
var store = new Vuex.Store(
    {
        state:{
            car:car
        },
        mutations:{
            addCart(state,data) {
                var bol = true;
                state.car.some(item =>{
                    if (item.goods_id === data.goods_id) {
                        item.count +=parseInt(data.count)
                        bol = false
                        return true
                    }
                })
                if (bol) {
                    state.car.push(data)
                }

                window.localStorage.setItem('car',JSON.stringify(state.car))
            },
            upadteCount(state,data) {
                state.car.forEach(item =>{
                    if (item.goods_id === data.goods_id) {
                        item.count = parseInt(data.count)
                        return true
                    }
                })

                window.localStorage.setItem('car',JSON.stringify(state.car))
            },
            removeGoods(state,goods_id) {
                state.car.some((item,index)=>{
                    if (item.goods_id == goods_id) {
                        state.car.splice(index,1)
                        return true
                    }
                })
                window.localStorage.setItem('car',JSON.stringify(state.car))
            },
            upadteBol(state,data) {
                state.car.some((item,index)=>{
                    if (item.goods_id == data.goods_id) {
                        item.isbol = data.isbol
                        return true
                    }
                })
                window.localStorage.setItem('car',JSON.stringify(state.car))
            }
        },
        getters:{
            goodsBellNum(state) {
                var c=0;
                state.car.forEach(function (item,index) {
                    c +=item.count
                })
                return c;
            },
            getGoodsCount(state) {
                var idCount = {};
                state.car.forEach(item =>{
                    idCount[item.goods_id]=item.count
                })

                return idCount
            },
            getGoodsBol(state) {
                var idBol = {};
                state.car.forEach(item =>{
                    idBol[item.goods_id]=item.isbol
                })

                return idBol
            },
            getGoodsTotal(state) {
                var data ={
                    goodsNum:0,
                    gooodsTotal:0
                }

                state.car.forEach(item =>{
                    if (item.isbol) {
                        data.goodsNum += item.count
                        data.gooodsTotal +=item.count * item.price
                    }
                })

                return data
            }
        }
    }
)

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入自己的路由组件
import router from './router.js'
//导入根组件
import App from './app.vue'


var vm = new Vue({
    el:'#app',
    render:c => c(App),
    router:router,
    store:store
})
