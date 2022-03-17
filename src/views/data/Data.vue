<template>
  <div class="data">
    <header>
      垃圾桶分布及可容量展示
    </header>
    <!-- 图例 -->
    <div class="legend">
      <div class="tipInformation">
        <img src="../img/garbage_green.png" alt="" />可回收垃圾桶
      </div>
      <div class="tipInformation">
        <img src="../img/garbage_yellow.png" alt="" />厨余垃圾桶
      </div>
      <div class="tipInformation">
        <img src="../img/garbage_red.png" alt="" />有害垃圾桶
      </div>
      <div class="tipInformation">
        <img src="../img/garbage_blue.png" alt="" />其他垃圾桶
      </div>
    </div>
    <Row>
      <Col span="18">
        <Card>
          <baidu-map
            class="bm-view"
            :center="center"
            :zoom="24"
            :scroll-wheel-zoom="false"
          >
            <!-- 垃圾桶图表： https://www.iconfont.cn/search/index?searchType=icon&q=%E5%9E%83%E5%9C%BE%E6%A1%B6 -->
            <bm-marker
              v-for="item in pointsGreen"
              :key="item.pointsGreen"
              :position="{ lng: item.lng, lat: item.lat }"
              @click="clickHandlerGreen"
              :icon="{
                url: require('../img/garbage_green.png'),
                size: { width: 20, height: 20 },
              }"
            ></bm-marker>
            <bm-marker
              v-for="item in pointsYellow"
              :key="item.pointsYellow"
              :position="{ lng: item.lng, lat: item.lat }"
              @click="clickHandlerYellow"
              :icon="{
                url: require('../img/garbage_yellow.png'),
                size: { width: 20, height: 20 },
              }"
            ></bm-marker>
            <bm-marker
              v-for="item in pointsRed"
              :key="item.pointsRed"
              :position="{ lng: item.lng, lat: item.lat }"
              @click="clickHandlerRed"
              :icon="{
                url: require('../img/garbage_red.png'),
                size: { width: 20, height: 20 },
              }"
            ></bm-marker>
            <bm-marker
              v-for="item in pointsBlue"
              :key="item.pointsBlue"
              :position="{ lng: item.lng, lat: item.lat }"
              @click="clickHandlerBlue"
              :icon="{
                url: require('../img/garbage_blue.png'),
                size: { width: 20, height: 20 },
              }"
            ></bm-marker>
            <div class="tipInformation">Tip:点击可查看垃圾桶具体信息</div>
          </baidu-map>
        </Card>
      </Col>
      <Col span="6" offset="0.5">
        <Card class="gargarbageLis">
          <p slot="title">垃圾桶状态列表</p>
          <p>0号垃圾站：</p>
          <Progress :percent= garbageStatusLis[0].percentGreen :stroke-color="['#87d068', '#87d068']" >
              <span v-if="garbageStatusLis[0].percentGreen == 100" style="color:red">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[0].percentYellow :stroke-color="['#F3D279', '#F3D279']" >
            <span v-if="garbageStatusLis[0].percentYellow == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[0].percentRed :stroke-color="['#EF6E6E', '#EF6E6E']" >
            <span v-if="garbageStatusLis[0].percentRed == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[0].percentBlue :stroke-color="['#108ee9', '#108ee9']" >
            <span v-if="garbageStatusLis[0].percentBlue == 100">已满</span>
          </Progress>
          <p>1号垃圾站：</p>
          <Progress :percent= garbageStatusLis[1].percentGreen :stroke-color="['#87d068', '#87d068']" >
              <span v-if="garbageStatusLis[1].percentGreen == 100" style="color:red">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[1].percentYellow :stroke-color="['#F3D279', '#F3D279']" >
            <span v-if="garbageStatusLis[1].percentYellow == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[1].percentRed :stroke-color="['#EF6E6E', '#EF6E6E']" >
            <span v-if="garbageStatusLis[1].percentRed == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[1].percentBlue :stroke-color="['#108ee9', '#108ee9']" >
            <span v-if="garbageStatusLis[1].percentBlue == 100">已满</span>
          </Progress>
          <p>2号垃圾站：</p>
          <Progress :percent= garbageStatusLis[2].percentGreen :stroke-color="['#87d068', '#87d068']" >
              <span v-if="garbageStatusLis[2].percentGreen == 100" style="color:red">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[2].percentYellow :stroke-color="['#F3D279', '#F3D279']" >
            <span v-if="garbageStatusLis[2].percentYellow == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[2].percentRed :stroke-color="['#EF6E6E', '#EF6E6E']" >
            <span v-if="garbageStatusLis[2].percentRed == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[2].percentBlue :stroke-color="['#108ee9', '#108ee9']" >
            <span v-if="garbageStatusLis[2].percentBlue == 100">已满</span>
          </Progress>
          <p>3号垃圾站：</p>
          <Progress :percent= garbageStatusLis[3].percentGreen :stroke-color="['#87d068', '#87d068']" >
              <span v-if="garbageStatusLis[3].percentGreen == 100" style="color:red">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[3].percentYellow :stroke-color="['#F3D279', '#F3D279']" >
            <span v-if="garbageStatusLis[3].percentYellow == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[3].percentRed :stroke-color="['#EF6E6E', '#EF6E6E']" >
            <span v-if="garbageStatusLis[3].percentRed == 100">已满</span>
          </Progress>
          <Progress :percent= garbageStatusLis[3].percentBlue :stroke-color="['#108ee9', '#108ee9']" >
            <span v-if="garbageStatusLis[3].percentBlue == 100">已满</span>
          </Progress>
        </Card>
      </Col>
    </Row>
    <div style="margin-bottom:20px"></div>
    <header>
      垃圾投递统计
    </header>
    <Row style="margin-top:20px">
      <!-- <h2 style="margin-bottom:12px;color:#515A6E">垃圾投递统计</h2> -->
      <!-- <Divider size="small"></Divider> -->
      <Col span="12">
        <Card>
          <div id="linePieCss"></div>
        </Card>
      </Col>
      <Col span="11" offset="1">
        <Card>
          <div id="histogramCss"></div>
        </Card>
      </Col>
    </Row>
    <div style="margin-bottom:20px"></div>
    <header>
      通行流量统计
    </header>
    <Row style="margin-top:20px">
      <Col span="24">
        <Card>
          <div id="lineHistogramCss"></div>
        </Card>
      </Col>

    </Row>
  </div>
</template>