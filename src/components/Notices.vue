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
