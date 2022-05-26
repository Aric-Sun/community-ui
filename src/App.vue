<template>
  <div id="app">
    <login @gotoHome="hideLogin" v-show="isShow"/>
    <side-bar ref="sideBar" />
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import SideBar from "components/content/SideBar";
import Home from "../src/views/home/Home";
import Login from './views/Login.vue';

export default {
  name: "App",
  data() {
    return {
      isShow: true
    }
  },
  components: {
    SideBar,
    Home,
    Login
  },
  methods: {
    hideLogin() {
      this.isShow = false
      this.$refs.sideBar.changeSlider()
    }
  }
}
</script>

<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>

<style>
  @import './assets/css/normalize.css';
  @import './assets/css/common.css';
  ::-webkit-scrollbar {
  width: 6px;
  background-color: #d8d8d8;
}
 
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius:10px;
}
 
::-webkit-scrollbar-thumb {
  background-color: #9499a3;
}
#scroll::-webkit-scrollbar  
{  
    width: 5px;  /*滚动条宽度*/
    height: 5px;  /*滚动条高度*/
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
#scroll::-webkit-scrollbar-track  
{  
    border-radius: 2.5px;  /*滚动条的背景区域的圆角*/
    background-color: #e6e6e6;/*滚动条的背景颜色*/  
}  
  
/*定义滑块 内阴影+圆角*/  
#scroll::-webkit-scrollbar-thumb  
{  
    border-radius: 2.5px;  /*滚动条的圆角*/
    background-color: #9499a3;  /*滚动条的背景颜色*/
}
  .view {
    position: absolute;
    left: 208px;
  }
</style>
