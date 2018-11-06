# VueCms

## 项目描述

### 项目背景

+ 手机Web 

+ CMS内容管理系统

+ 学习vue.js和webpack的一个大综合性的项目，真的学到了很多，受益匪浅，记录下来！！！

#### 具有功能

1、新闻咨询

2、图片分享

3、商品购买

### 技术要点

#### 前端

1、基于 vue.js 框架

2、使用 MUI HTML代码片段

3、使用 Mint Ui 的vue组件

#### 后端

1、基于Node.js的服务器端，运行与3000端口 ，进行了允许跨域的设置

2、基于MySQL的数据访问和存储

#### 打包工具和包管理

1、基于npm的包管理工具

2、基于webpack来进行打包

## 项目运行环境搭建

### MySQL搭建

+ 安装MySQL

+ 运行vuecms.sql 文件机型数据库及数据的初始化

### 后端搭建

+ 导入VueCmsApi 至工作空间
+ 安装 npm,node
+ 在文件夹根路径 运行命令 npm i
+ 修稿models文件夹下的 mysql.js 文件中的关于连接MySQL数据库的用户名和密码
+ 运行node app.js

### 前端搭建

+ 导入VueCms 至工作空间
+ 安装 npm,
+ 在文件夹根路径 运行命令 npm i
+ 进行调试 npm run dev或者webpack
+ 如果是npm run dev 则打开localhost:8080
+ 如果是webpack 则直接运行 dist中的index.html 

## 项目预览

### 主页

### 新闻列表

### 新闻详情

### 图片分享

### 商品列表

### 商品详情

### 购物车

## 接口

> ```
> // 已经在main.js中已经设置了根路径
> Vue.http.options.root = 'http://localhost:3000/';
> ```

### 请求`home.vue`主页轮播图

#### 规则

| 地址                                   | 状态码                             | 方式 | 参数 | 数据接受格式       |
| -------------------------------------- | ---------------------------------- | ---- | ---- | ------------------ |
| http://localhost:3000/api/getListLunBo | status:0(正确)<br />status:1(错误) | GET  | 无   | result.body.result |

#### 列子

```
this.$http.get("http://localhost:3000/api/getListLunBo").then(result => {
                    if (result.body.status === 0 ) {
                        this.lunBoList = result.body.result
                    } else {
                        Toast({
                            message: '轮播图数据加载数百',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
```

### 请求新闻列表

#### 规则

| 地址           | 状态码                             | 方式 | 参数 | 数据接受格式       |
| -------------- | ---------------------------------- | ---- | ---- | ------------------ |
| api/getNewList | status:0(正确)<br />status:1(错误) | GET  | 无   | result.body.result |

#### 例子

```javascript
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
```

### 请求评论列表

#### 规则

| 地址             | 状态码                             | 方式 | 参数                                  | 数据接受格式       |
| ---------------- | ---------------------------------- | ---- | ------------------------------------- | ------------------ |
| /api/getcomments | status:0(正确)<br />status:1(错误) | GET  | {id:请求页的id，<br />pageindex:页码} | result.body.result |

#### 列子

```javascript
// 注意： 请求的时候带上父组件传来的参数  sign  来表明是哪个区块的评论

getComments() {
      // 获取评论
      this.$http
          /*带上自定义的标志作为id的属性名字*/
        .get(`api/getcomments?${this.sign}=${this.id}&&pageindex=${this.pageIndex}`)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
            this.comments = this.comments.concat(result.body.result);
          } else {
            Toast("获取评论失败！");
          }
        });
    },
```

### 添加评论

> 关于请求评论列表和添加评论需要添加的参数 区块标志 详情见
>
> 项目制作步骤 > 新闻版块 > 建立子组件  中查看this.sign值

#### 规则

| 地址            | 状态码                             | 方式 | 参数                                                         | 数据接受格式       |
| --------------- | ---------------------------------- | ---- | ------------------------------------------------------------ | ------------------ |
| api/postcomment | status:0(正确)<br />status:1(错误) | POST | {"table": 区块标志<br />"com_id": 页面id,     "add_time":评论时间 ,      "content": 评论内容} | result.body.result |

#### 列子

```javascript
// this.sign  是父组件传来的区块标志

this.$http
        .post("api/postcomment",{
            /*表名 带上自定义标志*/
            table : this.sign,
            com_id : this.$route.params.id,
            add_time : this.CurentTime(),
            content : this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
              console.log(1);
              // 1. 拼接出一个评论对象
              var cmt = {
                user_name: "匿名用户",
                add_time: Date.now(),
                content: this.msg.trim()
              };
            this.comments.unshift(cmt);
            this.msg = "";
              Toast({
                  message: '发表评论成功！！',
                  position: 'bottom',
                  duration: 1000
              });
          }
```

### 获取图片分类

#### 规则

| 地址                | 状态码                             | 方式 | 参数 | 数据接受格式       |
| ------------------- | ---------------------------------- | ---- | ---- | ------------------ |
| api/getPhotoCatList | status:0(正确)<br />status:1(错误) | GET  | 无   | result.body.result |

#### 列子

```javascript
  /*获取分类*/
          getPrictureCatList() {
              this.$http.get('api/getPhotoCatList').then(result =>{
                  if (result.body.status === 0 ) {
                      this.picturecat = result.body.result;
                      // 需要自己手动在前面添加一个“全部”的分类
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
```

### 获取图片列表

#### 规则

| 地址             | 状态码                             | 方式 | 参数            | 数据接受格式       |
| ---------------- | ---------------------------------- | ---- | --------------- | ------------------ |
| api/getPhotoList | status:0(正确)<br />status:1(错误) | GET  | cat_id:分类的id | result.body.result |

#### 列子

```
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
```

### 获取图片详情

#### 规则

| 地址               | 状态码                             | 方式 | 参数            | 数据接受格式       |
| ------------------ | ---------------------------------- | ---- | --------------- | ------------------ |
| api/getPhotoObject | status:0(正确)<br />status:1(错误) | GET  | id:图片文章的id | result.body.result |

#### 列子

```
// 获取图片文章详情页
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
            }
```

### 获取图片文章的推按缩略图

#### 规则

| 地址              | 状态码                             | 方式 | 参数            | 数据接受格式       |
| ----------------- | ---------------------------------- | ---- | --------------- | ------------------ |
| api/getPhotoMater | status:0(正确)<br />status:1(错误) | GET  | id:图片文章的id | result.body.result |

#### 列子

```
// 获取图片文章缩略图
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
```

### 获取商品列表的缩略图

#### 规则

| 地址             | 状态码                             | 方式 | 参数           | 数据接受格式       |
| ---------------- | ---------------------------------- | ---- | -------------- | ------------------ |
| api/getGoodsList | status:0(正确)<br />status:1(错误) | GET  | pageIndex:页码 | result.body.result |

#### 列子

```
// 获取商品列表  需要传递页码
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
            }
```

### 获取商品详情

#### 规则

| 地址              | 状态码                             | 方式 | 参数             | 数据接受格式       |
| ----------------- | ---------------------------------- | ---- | ---------------- | ------------------ |
| api/getGoodObject | status:0(正确)<br />status:1(错误) | GET  | goods_id：文章id | result.body.result |

#### 列子

```
// 获取商品列表  需要传递商品id
getGoodObject() {
                this.$http.get(`api/getGoodObject?goods_id=${this.id}`).then(result =>{
                    if (result.body.status === 0 ) {
                        this.goodObject = result.body.result[0];
                        console.log(this.goodObject)
                    } else {
                        console.log(result.body)
                        Toast({
                            message: '商品详细数据加载失败',
                            position: 'bottom',
                            duration: 1500
                        });
                    }
                })
            }
```

### 获取商品详情中的轮播图图片

#### 规则

| 地址                | 状态码                             | 方式 | 参数             | 数据接受格式       |
| ------------------- | ---------------------------------- | ---- | ---------------- | ------------------ |
| api/getGoodsPicture | status:0(正确)<br />status:1(错误) | GET  | goods_id：文章id | result.body.result |

#### 列子

```
// 获取商品列表  需要传递商品id
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
            }
```

### 获取购物车中多个商品信息

#### 规则

| 地址             | 状态码                             | 方式 | 参数                              | 数据接受格式       |
| ---------------- | ---------------------------------- | ---- | --------------------------------- | ------------------ |
| api/getGoodsCart | status:0(正确)<br />status:1(错误) | GET  | goods_ids：多个商品名，以逗号间隔 | result.body.result |

#### 列子

```
// 通过vuex从store中的car(购物车商品列表中获取多个商品id)拆分以逗号相隔
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
          }
```



## 项目制作步骤

### 首页根模板APP

#### 1.完成了Header 区域 ，使用的是Mint-UI的组件

```
//按需导入MintUi组件  顶部Header
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//在app.vue中直接使用 放在<div></div>中
<mt-header fixed title="VueCms"></mt-header>
```

#### 2、完成底部功能

```
// 使用mui的选项卡功能
mui-bar mui-bar-tab

//使用扩展图标
//在main.js中加载
import './lib/mui/css/icons-extra.css'
```

#### 3、导入支持路由包，并且安装路由

```
// 在main.js中
// 导入支持路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

// 因为在router.js中还是要使用VueRuter 所以还需要再次导入
import VueRouter from 'vue-router'

```

#### 4、设置路由高亮

```
    linkActiveClass:'mui-active'
```

#### 5、建立路由组件

```javascript
// 导入支持路由的包
import VueRouter from 'vue-router'

import HomeCom from './main/components/tabbar/HomeContainer.vue'
import SearchCom from './main/components/tabbar/SearchContainer.vue'
import ShopcarCom from './main/components/tabbar/ShopcarContainer.vue'
import MemberCom from './main/components/tabbar/MemberContainer.vue'

// 放置路由中去
routes:[
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
        }
    ],
```

#### 6、导入vue-resource，通过AJAX获取数据，循环渲染图片

```javascript
npm i vue-resource -S

import VueResource from 'vue-resource'
// 导入支持Resource
Vue.use(VueResource);
```

#### 7、从Mui中获取九宫格，改造成六宫格

```html
<ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu1(1).png" alt="">
                <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../../src/image/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
```

#### 8、组件切换动画

```javascript
/*哪个组件需要动画，就去他的坑里*/
<transition>
            <router-view></router-view>
</transition>

<style scoped>
    .myTopBar {
        padding-top: 40px;
        /*放置出现左右滑动条*/
        overflow-x: hidden;
    }
    /*哪个组件需要动画，就去他的坑里*/
    // 组件开始的状态
    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    
    //组件结束的状态
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        //放置出现上下情况
        position: absolute;
    }

	//组件运行时的状态
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
</style>
```

### 新闻版块

#### 1、改造新闻资源链接

```javascript
// 在home中
<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
    <router-link to="/home/newslist">
        <img src="../../../../src/image/menu1(1).png" alt="">
        <div class="mui-media-body">新闻资讯</div>
	</router-link>
</li>

// 在router.js中
import NewListCom from './main/components/news/NewList.vue'

//在routes[]中增加
{
    path:'/home/newslist',
    component:NewListCom
}
```

#### 2、通过resouce 获取数据，进行渲染

#### 3、定义全局的过滤器 处理时间

```
np i moment -S

//导入时间插件
import moment from 'moment'
```

#### 4、带着新闻页ID跳转到新闻详情页

```javascript
// vue 中传递参数

// 处理路由 带入参数
<router-link :to="'/home/newsinfo/'+item.id">
// 导入模板
import newsinfoCom from './main/components/news/newinfo.vue'
// 加入冒号去匹配
{
	path:'/home/newsinfo/:id',
	component:newsinfoCom
}

// 获取id
data() {
    return {
    	id:this.$route.params.id
    }
}

// 进行渲染
this.$http.get('api/getNewsObject?id='+this.id)...............
```

#### 5、建立评论子组件

```javascript
// 建立组件comment.vue

// 在新闻详情页导入子组件并注册子组件
import subCom from '../subcomponents/comment.vue'

/*注册子组件*/
components:{
	'subcom-box':subCom
}

// 在父组件中 放入子组件  并传递父组件的id  
// 其传递的参数必须在父组件中先定义
// this.sign 是区块标志
<subcom-box :"this.sign" :id="this.id"></subcom-box>

// 在子组件进行评论的渲染

```

| 父组件                           | sign值     |
| -------------------------------- | ---------- |
| newinfo.vue（新闻详情组件中）    | news_id    |
| photoinfo.vue （图片详情组件中） | picture_id |



### 图片分享模块

#### 1、修改链接

```javascript
<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to=/home/photo>
                    <img src="../../../../src/image/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
```

#### 2、新建图片分享组件，在router.js中注册

```javascript
import photoCom from './main/components/photo/photo.vue'

{
    path:'/home/photo',
    component:photoCom
}
```

#### 3、在图片分享组件中放入mui的滑动选项卡

```javascript
// 坑人的是    mui-fullscreen是全屏的意思，全屏放置，所以需要移除
// 最坑人的  最坑人的  
// 一定要查看页面源代码进行HTML的复制   不能直接在样式中复制   不然后又自定义的属性   / // 直接崩溃

<div id="slider" class="mui-slider mui-fullscreen">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" data-scroll="1">
					<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
						<a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
							推荐
						</a>
						<a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
							热点
						</a>
						<a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
							北京
						</a>
						<a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
							社会
						</a>
						<a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
							娱乐
						</a>
						<!--<a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
							科技
						</a>-->
					</div>
				</div>

			</div>
```

#### 4、导入mui.js文件 初始化区域滚动

```javascript
// 导入支持的js文件
import muijs from '../../../lib/mui/js/mui.min'

export default {
        mounted() {
            /*必须在挂在DOM之前进行初始化滑动组件*/
            muijs('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
```

#### 5、Mui.js和webpack的严格模式冲突，去除冲突

```
npm install babel-plugin-transform-remove-strict-mode

//在 .babelrc
{
  "plugins": ["transform-remove-strict-mode"]
}
```

#### 6、不能正常的进行组件的切换

```
因为样式的冲突，需要改变样式名字

```

#### 7、获取分了数据，进行分类数据的渲染

```javascript
// 进行类的判断 控制类
<div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
                    <a v-for="item in picturecat" :key="item.id" @click.prevent="getPrictureList(item.id)" :class="['mui-control-item',item.id === 0? 'mui-active':'']">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
```

#### 8、获取图片数据，进行图片列表的渲染

```javascript
<!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in picturelist" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
```

#### 9、新建图片详情组件，带着图片页id跳转到对应详情页

```javascript
// 新建photoinfo.vue组件

// 规定跳转路径 
:to="'/home/photoinfo/' + item.picture_id"

// 在router.js中

import photoinfoCom from './main/components/photo/photoinfo.vue'

{
    path:'/home/photoinfo/:id',
    component:photoinfoCom
}

// 请求数据，进行渲染详情 
```

#### 10、缩略图插件

```javascript
// 安装指定的版本
npm i vue-preview@1.0.5 -S

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

<!-- 缩略图区域 -->
<div class="thumbs">
          <img class="preview-img" v-for="(item, index) in list" 	:src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
</div>

// 循环每个图片数据，补全图片的宽和高
result.body.message.forEach( item => {
	item.w = 600;
	item.h = 400;
});
// 把完整的数据保存到 list 中
this.list = result.body.message;
```

### 商品板块

#### 1、商品列表经典两列布局	

```html
<div class="goods-list">
        <div class="goods-item">
            <img src="https://res.samsungeshop.com.cn/resources/2018/3/5/1520243012668473_293X293.jpg" alt="">
            <h4>三星 盖乐世 S8 三星 盖乐世 S8 三星 盖乐世 S8 三星 盖乐世 S8 三星 盖乐世 S8 三星 盖乐世 S8</h4>
            <div class="goods-item-info">
                <p class="goods-picre">
                    <span>￥4999</span> &nbsp;&nbsp;<span>￥5999</span>
                </p>
                <p class="goods-num">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://res.samsungeshop.com.cn/resources/2018/3/5/1520243012668473_293X293.jpg" alt="">
            <h4>三星 盖乐世 S8</h4>
            <div class="goods-item-info">
                <p class="goods-picre">
                    <span>￥4999</span> &nbsp;&nbsp;<span>￥5999</span>
                </p>
                <p class="goods-num">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://res.samsungeshop.com.cn/resources/2018/3/5/1520243012668473_293X293.jpg" alt="">
            <h4>三星 盖乐世 S8</h4>
            <div class="goods-item-info">
                <p class="goods-picre">
                    <span>￥4999</span> &nbsp;&nbsp;<span>￥5999</span>
                </p>
                <p class="goods-num">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>
        </div>
    </div>
    
    <style lang="scss" scoped>
    .goods-list {
        display: flex;    // 1、 使用flex布局，这样都处于一行
        flex-wrap: wrap;  // 2、 进行换行
        padding: 8px 8px 0px 8px;
        justify-content: space-between;   // 3、 两端对齐
        .goods-item {
            min-width: 300px;
            display: flex;   // 会出现一个div很长，这样撑大了整行的高度 
            flex-direction: column;   // 改变主轴的方向
            justify-content: space-between;   // 两端对齐
            width: 48%;  // 2、 每行48%宽度的布局
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
    }
</style>
  
```

#### 2、抽离轮播图的路由组件

```
主页的轮播图宽高都是

width:100%

height:100%

但在商品详情中的轮播图不需要

width:100%

所以，在home组件的时候获取首页的轮播图数据，在商品详情页时候获取详情页的轮播屯数据，在引用组件的时候，分别传入数据和标识符

在轮播图这个子组件里，通过标识符来决定是否引用width:100%的这个类

```

#### 3、通过id渲染商品详情页面

#### 4、引入数量按钮输入框子组件

```javascript
// 新建数量框子组件
// 使用此mui的插件需要引入Mui.js 并进行初始化
import mui from '../../../lib/mui/js/mui.min'
    export default {
        mounted() {
            mui('.mui-numbox').numbox()
        }
    }
    
// 通过子组件向父组件传值的方法 传入getGoodNum方法
// 通过父组件向子组件传值的方法，把剩余的商品库存量传给子组件，让其设置输入框的最大值
<numbar :maxNum="goodObject.stock_quantity" @getGoodNum="getGoodsNum"></numbar>
// 子组件去监听输入框数字的改变，并把最新的数据传入给父组件
changeNum() {
     this.$emit('getGoodNum',this.$refs.num.value)
}

// 子组件去接受
props:['maxNum']
// 但由于goodObject.stock_quantity 是通过接口异步获取到的数据 所以会存在
// goodObject.stock_quantity为空的情况,所以，需要通过wath监听maxNum属性
watch:{
 'maxNum':function (newValue,oldValue) {
      this.GLOBAL_Mui('.mui-numbox').numbox().setOption('max',newValue)
  }
}

// 通过以上操作，就能实时的将数字输入子组件的商品数量返回给父组件，并显示于数字框中
```

#### 5、mint Ui按钮大小和空心按钮

```
// 蓝色大按钮空心（plain）
<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
// 红色大按钮空心
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>

他们不能换行 是因为采用了flex布局，转换为block布局进可以进行br的换行

// 小按钮蓝色实心
<mt-button type="primary" size="small">立即购买</mt-button>
// 小按钮红色实心
                        <mt-button type="danger" size="small">加入购物车</mt-button>
```

#### 6、点击添加购物车按钮小球添加动画

#### 7、启用vuex

```
npm i vuex -S

// 然后在main.js中安装
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state:{   // 存放数据   
       car：[]       // 使用 ：  $store.state.car
    }，
    mutations:{  // 定义方法  使用时只能传递两个参数
    			//  使用 ： $store.state.commit('方法名'，‘{数据对象}’)
    	getGoodsCoun(state,data){
            
    	}
    }，
    getters：{   // 对数据进行过滤处理  默认只有一个参数state
    			// 使用 : $store.getters.removeGoods  
        removeGoods(state) {
            
        }
    }
}）

// 挂在在vm上
var vm = new Vue({
    el:'#app',
    render:c => c(App),
    router:router,
    store:store
})

```

#### 8、通过vuex这个共享数据的空间，管理添加到购物车到结算等操作

