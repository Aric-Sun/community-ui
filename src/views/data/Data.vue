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

<script>
import * as echarts from "echarts";
export default {
  name: "Data",
  data() {
    return {
      garbageStatusLis:[
        {
          percentGreen:100,
          percentYellow:80,
          percentRed:60,
          percentBlue:10,
        },
        {
          percentGreen:90,
          percentYellow:80,
          percentRed:70,
          percentBlue:10,
        },
        {
          percentGreen:70,
          percentYellow:50,
          percentRed:40,
          percentBlue:20,
        },
        {
          percentGreen:70,
          percentYellow:60,
          percentRed:80,
          percentBlue:20,
        },
      ],
      center: {
        lng: 118.934506,
        lat: 32.131893,
      },
      center0: {
        lng: 118.934556,
        lat: 32.131957,
      },
      center1: {
        lng: 118.935506,
        lat: 32.131893,
      },
      center2: {
        lng: 118.934506,
        lat: 32.131993,
      },
      pointsGreen: [], //绿色垃圾桶位置
      pointsYellow: [], //黄色垃圾桶位置
      pointsRed: [],
      pointsBlue: [],
    };
  },
  methods: {
    echartsRadar(){
      var chartDom = document.getElementById('radarCss');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
          title: {
              text: '网络访问情况',
              // subtext: '纯属虚构',
              top: 0,
              left: 10,
              textStyle: { // 图例的公用文本样式。
                  fontSize: 13,
                  color: '#17233D',
                  fontWeight: 'normal' // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
              },
          },
          tooltip: {
              trigger: 'item'
          },
          legend: {
              type: 'scroll',
              bottom: 0,
              data: (function (){
                  var list = [];
                  for (var i = 1; i <= 7; i++) {
                      list.push('周'+i  );
                  }
                  return list;
              })()
          },
          // visualMap: {
          //     show:false,
          //     top: 'middle',
          //     right: 10,
          //     color: ['red', 'yellow'],
          //     calculable: true
          // },
          grid: { bottom: "7%", top: "32%" },
          radar: {
            center: ['50%', '45%'],
            radius: 80,
              indicator: [
                  { text: '00:00~04:00', max: 300},
                  { text: '04:00~08:00', max: 300},
                  { text: '08:00~12:00', max: 300},
                  { text: '12:00~16:00', max: 300},
                  { text: '16:00~20:00', max: 300},
                  { text: '20:00~24:00', max: 300}
              ]
          },
          series: (function (){
              var series = [];
              for (var i = 1; i <= 7; i++) {
                  series.push({
                      name: '访问人数',
                      type: 'radar',
                      symbol: 'none',
                      lineStyle: {
                          width: 1
                      },
                      emphasis: {
                          areaStyle: {
                              color: 'rgba(0,250,0,0.3)'
                          }
                      },
                      data: [{
                          value: [
                              (42 - i) * 7,
                              (28 - i) * 6 + 60,
                              i * 5 + 100,
                              i * 20,
                              i * i* i / 3+ 100,
                              i * i* i / 4+ 100,
                          ],
                          name: '周'+ i  
                      }]
                  });
              }
              return series;
          })()
      };

      option && myChart.setOption(option);

    },
    lineHistogram(){
      var chartDom = document.getElementById('lineHistogramCss');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
              text: '人车通行流量',
              // subtext: '纯属虚构',
              top: 0,
              left: 10,
              textStyle: { // 图例的公用文本样式。
                  fontSize: 14,
                  color: '#515A6E',
                  fontWeight: 'normal' // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
              },
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          toolbox: {
              feature: {
                  mark: { show: false },
                  dataView: { show: false, readOnly: false },
                  magicType: { show: false, type: ["line", "bar", "stack", "tiled"] },
                  restore: { show: false },
                  saveAsImage: { show: false },
              }
          },
          legend: {
              data: ['东门', '西门','南门','北门', '车流量']
          },
          xAxis: [
              {
                  type: 'category',
                  data: ['0~2', '3~4', '5~6', '7~8', '9~10', '11~12','13~14','15~16','17~18','19~20','21~22','23~24'],
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '人流量',
                  min: 0,
                  max: 250,
                  interval: 50,
                  axisLabel: {
                      formatter: '{value} 人次'
                  }
              },
              {
                  type: 'value',
                  name: '车流量',
                  min: 0,
                  max: 25,
                  interval: 5,
                  axisLabel: {
                      formatter: '{value} 车次'
                  }
              }
          ],
          grid: { bottom: "7%", top: "22%" },
          series: [
              {
                  name: '东门',
                  type: 'bar',
                  data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                  name: '西门',
                  type: 'bar',
                  data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
              },
              {
                  name: '南门',
                  type: 'bar',
                  data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                  name: '北门',
                  type: 'bar',
                  data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
              },
              {
                  name: '车流量',
                  type: 'line',
                  yAxisIndex: 1,
                  data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
              }
          ]
      };

      option && myChart.setOption(option);
    },
    echartsHistogram() {
      var app = {};
      var chartDom = document.getElementById("histogramCss");
      var myChart = echarts.init(chartDom);
      var option;
      var posList = ["left","right","top","bottom","inside","insideTop","insideLeft","insideRight","insideBottom","insideTopLeft",
      "insideTopRight", "insideBottomLeft","insideBottomRight",
      ];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: posList.reduce(function(map, pos) {
            map[pos] = pos;
            return map;
          }, {}),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };

      app.config = {
        rotate: -16,
        align: "left",
        verticalAlign: "top",
        position: "left",
        distance: 0,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance,
            },
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };

      var labelOption = {
        show: false,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  %",
        fontSize: 10,
        rich: {
          name: {},
        },
      };

      option = {
        title: {
              text: '分类垃圾占比',
              // subtext: '纯属虚构',
              top: 0,
              left: 10,
              textStyle: { // 图例的公用文本样式。
                  fontSize: 13,
                  color: '#17233D',
                  fontWeight: 'normal' // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
              },
          },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["其它垃圾", "可回收垃圾", "厨余垃圾", "有害垃圾"],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
          
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["0号垃圾站", "1号垃圾站", "2号垃圾站", "3号垃圾站"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        grid: { bottom: "7%", top: "22%" },//图表位置
        series: [
          {
            name: "其它垃圾",
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [20, 10, 16, 4],
          },
          {
            name: "可回收垃圾",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [54, 52, 61, 84],
          },
          {
            name: "厨余垃圾",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [13, 32, 21, 4],
          },
          {
            name: "有害垃圾",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [13, 6, 2, 8],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    echartsLinePie() {
      var chartDom = document.getElementById("linePieCss");
      var myChart = echarts.init(chartDom);
      var option;
      setTimeout(function() {
        option = {
          legend: {},
          title: {
              text: '垃圾投递统计',
              // subtext: '纯属虚构',
              top: 0,
              left: 10,
              textStyle: { // 图例的公用文本样式。
                  fontSize: 13,
                  color: '#17233D',
                  fontWeight: 'normal' // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
              },
          },
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: [
              ["product", "4-20", "4-21", "4-22", "4-23", "4-24", "4-25"],
              ["0号垃圾站", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ["1号垃圾站", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ["2号垃圾站", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ["3号垃圾站", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
            ],
          },
          xAxis: { type: "category" },
          yAxis: {},
          grid: { bottom: "7%", top: "62%" },
          series: [
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "35%"],
              emphasis: { focus: "data" },
              label: {
                formatter: "{b}: {@2} ({d}%)",
              },
              encode: {
                itemName: "product",
                value: "4-20",
                tooltip: "4-20",
              },
            },
          ],
        };

        myChart.on("updateAxisPointer", function(event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });

        myChart.setOption(option);
      });

      option && myChart.setOption(option);
    },
    clickHandlerGreen(e) {
      // alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
      let lat = e.point.lat + "";
      let lng = e.point.lng + "";
      let slat = lat.substring(0, lat.length - 2);
      let slng = lng.substring(0, lat.length - 1);
      // console.log(slat);
      // console.log(slng);
      for (let i = 0; i < this.pointsGreen.length; i++) {
        let plat = this.pointsGreen[i].lat + "";
        let plats = plat.substring(0, plat.length - 2);
        // console.log(plats);
        let plng = this.pointsGreen[i].lng + "";
        let plngs = plng.substring(0, plng.length - 2);
        // console.log(plngs);
        if (slat == plats && slng == plngs) {
          this.$Message.info({
            content: `单击的为：` + i + `号可回收垃圾桶`,
            duration: 3,
          });
          break;
        }
      }
    },
    clickHandlerYellow(e) {
      let lat = e.point.lat + "";
      let lng = e.point.lng + "";
      let slat = lat.substring(0, lat.length - 2);
      let slng = lng.substring(0, lat.length - 1);
      // console.log(slat);
      // console.log(slng);
      for (let i = 0; i < this.pointsYellow.length; i++) {
        let plat = this.pointsYellow[i].lat + "";
        let plats = plat.substring(0, plat.length - 2);
        // console.log(plats);
        let plng = this.pointsYellow[i].lng + "";
        let plngs = plng.substring(0, plng.length - 2);
        // console.log(plngs);
        if (slat == plats && slng == plngs) {
          this.$Message.info({
            content: `单击的为：` + i + `号厨余垃圾桶`,
            duration: 3,
          });
          break;
        }
      }
    },
    clickHandlerRed(e) {
      let lat = e.point.lat + "";
      let lng = e.point.lng + "";
      let slat = lat.substring(0, lat.length - 2);
      let slng = lng.substring(0, lat.length - 1);
      // console.log(slat);
      // console.log(slng);
      for (let i = 0; i < this.pointsRed.length; i++) {
        let plat = this.pointsRed[i].lat + "";
        let plats = plat.substring(0, plat.length - 2);
        // console.log(plats);
        let plng = this.pointsRed[i].lng + "";
        let plngs = plng.substring(0, plng.length - 2);
        // console.log(plngs);
        if (slat == plats && slng == plngs) {
          this.$Message.info({
            content: `单击的为：` + i + `号有害垃圾桶`,
            duration: 3,
          });
          break;
        }
      }
    },
    clickHandlerBlue(e) {
      let lat = e.point.lat + "";
      let lng = e.point.lng + "";
      let slat = lat.substring(0, lat.length - 2);
      let slng = lng.substring(0, lat.length - 1);
      // console.log(slat);
      // console.log(slng);
      for (let i = 0; i < this.pointsBlue.length; i++) {
        let plat = this.pointsBlue[i].lat + "";
        let plats = plat.substring(0, plat.length - 2);
        // console.log(plats);
        let plng = this.pointsBlue[i].lng + "";
        let plngs = plng.substring(0, plng.length - 2);
        // console.log(plngs);
        if (slat == plats && slng == plngs) {
          this.$Message.info({
            content: `单击的为：` + i + `号其他垃圾桶`,
            duration: 3,
          });
          break;
        }
      }
    },
    addPoints() {
      //添加垃圾桶,坐标尾数不能为0，否则点击显示几号垃圾桶会出问题
      this.pointsGreen = [
        {
          lng: 118.933956,
          lat: 32.132607,
        },
        {
          lng: 118.933956,
          lat: 32.131927,
        },
        {
          lng: 118.934496,
          lat: 32.131949,
        },
        {
          lng: 118.934496,
          lat: 32.132659,
        },
      ];
      this.pointsYellow = [
        {
          lng: 118.934016,
          lat: 32.132607,
        },
        {
          lng: 118.934016,
          lat: 32.131927,
        },
        {
          lng: 118.934556,
          lat: 32.131949,
        },
        {
          lng: 118.934556,
          lat: 32.132659,
        },
      ];
      this.pointsRed = [
        {
          lng: 118.934076,
          lat: 32.132607,
        },
        {
          lng: 118.934076,
          lat: 32.131927,
        },
        {
          lng: 118.934616,
          lat: 32.131949,
        },
        {
          lng: 118.934616,
          lat: 32.132659,
        },
      ];
      this.pointsBlue = [
        {
          lng: 118.934136,
          lat: 32.132607,
        },
        {
          lng: 118.934136,
          lat: 32.131927,
        },
        {
          lng: 118.934676,
          lat: 32.131949,
        },
        {
          lng: 118.934676,
          lat: 32.132659,
        },
      ]
    },
  },
  mounted() {
    this.addPoints();
    this.echartsLinePie();
    this.echartsHistogram();
    this.lineHistogram();
    // this.echartsRadar();
  },
};
</script>

<style scoped>
.data {
  position: absolute;
  top: 0;
  bottom: -790px;
  /* bottom: -250px; */
  left: 208px;
  right: 0;
  padding: 2em; 
  background-color: #f5f6fa;
}
header {
  margin-bottom: 30px;
  font-size: 1.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid rgba(193, 193, 193, 0.5);
}
.bm-view {
  width: 100%;
  height: 500px;
}
/* 去除左下角百度地图logo */
/deep/.anchorBL {
  display: none !important;
}
.gargarbageLis {
  margin-left: 35px;
  height: 533px;
}
.legend {
  position: absolute;
  top: 535px;
  left: 3.5%;
  height: 80px;
  width: 100px;
  background-color: rgb(252, 248, 243);
  z-index: 100;
}
.tipInformation {
  font-size: 9px;
}
#linePieCss {
  width: 100%;
  height: 260px;
}
#histogramCss {
  width: 100%;
  height: 260px;
}
#lineHistogramCss{
  width: 100%;
  height: 300px;
}
#radarCss{
  width: 100%;
  height: 260px;
}
/deep/.ivu-divider-horizontal {
    display: block;
    height: 1px;
    width: 100%;
    min-width: 100%;
    margin: 12px 0;
    clear: both;
}
</style>

