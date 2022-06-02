<template>
  <div ref='noticeSelfs' :class="['noticeSelf' , classStyle]"  flex>
    <div class='imgs'>
      <img class="imgs1" src="../../../../assets/index/welcome.png" alt="">
      <img class="imgs2" src="../../../../assets/index/headBg.png" alt="">
    </div>
    <div class='contents'>
      <div v-if='showDeletes' @click='deletes'> 删除</div>
      <div v-if='title' class='title'>{{title}}</div>
      <div v-if='message' class='message'>{{message}}</div>
      <render-cell v-if='renders' :render="renders"></render-cell>
    </div>
  </div>
</template>
<script>
  import RenderCell from '@/libs/render';

  export default {
    components: {
      RenderCell
    },
    props: {
      classStyle: {
        type: String,
      },
      showDeletes: { //是否显示删除按钮
        type: Boolean,
        default: true
      },
      title: { //标题
        type: String,
      },
      message: { //message
        type: String,
      },
      duration: { //延迟自动关闭时间 0 默认不自动关闭
        type: Number,
        default: 3000,
      },
      renders: {
        type: Function
      },
      onclose: { //关闭是回调方法
        type: Function
      },
    },
    data() {
      return {
        timer: ''
      };
    },
    mounted() {
      //主动触发
      this.show()
    },
    methods: {
      //自定义关闭事件
      close() {
        this.onclose ? this.onclose() : '';
        this.hide()
      },
      //主动删除
      deletes() {
        this.close()
      },
      //被动触发
      show() {
        if (this.duration != 0) {
          this.timer = setTimeout(() => {
            this.hide();
          }, this.duration);
        }
      },
      //关闭
      hide() {
        let dom = this.$refs.noticeSelfs
        dom.setAttribute("class",dom.getAttribute('class')+" notice1-leave")
        clearTimeout(this.timer)
        let times = setTimeout(()=>{
          clearTimeout(times)
          this.remove();
        },500)
      },
    },
  };

</script>
<style lang="less" scoped>
  .contents{
    border: 1px solid #ccc;
    border-radius: 10px 0px 10px 0px;
    padding: 10px;
    width: 189px;
  }
  .imgs{
    width: 72px;
    position: relative;
  }
  .imgs1{
    position: absolute;
    width: 40px; 
    /* top: 20px;  */
  }
  .imgs2{
    position: absolute;
    width: 85px;
    /* top: 20px; */
    left: -23px;
  }
  .noticeSelf {
    width: 300px;
    height: auto;
    padding: 20px;
    border-radius: 10px;
    background-color: lightblue;
    margin: 10px;
  }

  .notice1-info {
    background-color: white;
  }

  .notice1-warning {
    background-color: rgb(219, 194, 125);
  }
  @keyframes fade-in {  
    0% {opacity: 0;
      transform: translateX(-300px);
    }
    40% {opacity: 0;}
    100% {opacity: 1;
      transform: translateX(0px);}
  }   
  .notice1-info {    
      animation: fade-in;/*动画名称*/  
      animation-duration: 1.5s;/*动画持续时间*/  
  } 

  .notice1-leave{
    animation: fade-out;/*动画名称*/  
    animation-duration: 1.5s;/*动画持续时间*/  
  }
  @keyframes fade-out {  
    100% {opacity: 1;
      transform: translateX(0px);
    }
    40% {opacity: 0;}
    100% {opacity: 0;
      transform: translateX(-300px);}
  } 
</style>
