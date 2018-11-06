
// 导入支持路由的包
import VueRouter from 'vue-router'

//导入路由组件
import HomeCom from './main/components/tabbar/HomeContainer.vue'
import SearchCom from './main/components/tabbar/SearchContainer.vue'
import ShopcarCom from './main/components/tabbar/ShopcarContainer.vue'
import MemberCom from './main/components/tabbar/MemberContainer.vue'
import NewListCom from './main/components/news/NewList.vue'
import newsinfoCom from './main/components/news/newinfo.vue'
import photoCom from './main/components/photo/photo.vue'
import photoinfoCom from './main/components/photo/photoinfo.vue'
import goodsListCom from './main/components/goods/goodslist.vue'
import goodsinfotCom from './main/components/goods/goodsinfo.vue'


var router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:HomeCom
        },
        {
            path:'/search',
            component:SearchCom
        },
        {
            path:'/shopcar',
            component:ShopcarCom
        },
        {
            path:'/member',
            component:MemberCom
        },
        {
            path:'/home/newslist',
            component:NewListCom
        },
        {
            /*加冒号匹配id*/
            path:'/home/newsinfo/:id',
            component:newsinfoCom
        },
        {
            path:'/home/photo',
            component:photoCom
        },
        {
            path:'/home/photoinfo/:id',
            component:photoinfoCom
        },
        {
            path:'/home/goodslist',
            component:goodsListCom
        },
        {
            path:'/home/goodsinfo/:id',
            component:goodsinfotCom
        }
    ],
    // 替换高亮类
    linkActiveClass:'mui-active'
})

// 向外暴露自己的路由模块
export default router