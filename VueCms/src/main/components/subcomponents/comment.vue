<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

    <mt-button class="commentBtn" type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="i">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dataFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>

    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: "" // 评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
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
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      // 校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }

      // 发表评论
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
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
          } else {
              Toast({
                  message: '发表评论失败！！',
                  position: 'bottom',
                  duration: 1500
              });
          }
        });
    },
    CurentTime() {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";

        if(month < 10)
            clock += "0";

        clock += month + "-";

        if(day < 10)
            clock += "0";

        clock += day + " ";

        if(hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return(clock);
    }
  },
  props: ["id","sign"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #cccccc;
    h3 {
        font-size: 18px;
        text-align: left;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .commentBtn {
      margin-bottom: 20px;
    }
    .cmt-list {
        margin: 5px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
