<template>
  <div class="flow-detection">
    <header>
      系统流量监测
    </header>
    <!-- <div >
      <e-chart :options="echartOptions" class="e-charts"></e-chart>
    </div> -->
    <Row style="margin-top:20px">
      <Col span="14">
        <Card>
          <h2>流量检测</h2>
          <!-- <div id="lineHistogramCss"></div> -->
          <e-chart :options="echartOptions" class="e-charts"></e-chart>
        </Card>
      </Col>
      <Col span="9" offset="1">
        <Card>
          <h2>网络访问情况</h2>
          <div id="radarCss"></div>
        </Card>
      </Col>
    </Row>
    
  </div>
</template>

<script>
import EChartsVue from "../../components/ECharts.vue";
import * as echarts from "echarts";
export default {
  name: "FlowDetection",
  components: {
    EChart: EChartsVue,
  },
  data() {
    return {
      echartOptions: {
        // title: {
        //   text: "流量监测",
        //   // subtext: '纯属虚构',
        //   top: 0,
        //   left: 0,
        //   textStyle: {
        //     // 图例的公用文本样式。
        //     fontSize: 14,
        //     color: "#000",
        //     fontWeight: "normal", // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
        //   },
        // },
        legend: {
          data: ["安卓端请求流量", "垃圾桶使用频率", "出入人流量"],
        },
        xAxis: {
          type: "time",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              ["2020-12-20", 10],
              ["2020-12-22", 40],
              ["2020-12-24", 90],
              ["2020-12-26", 5],
              ["2020-12-28", 123],
            ],
            type: "line",
            name: "安卓端请求流量",
          },
          {
            data: [
              ["2020-12-20", 5],
              ["2020-12-22", 22],
              ["2020-12-24", 14],
              ["2020-12-26", 31],
              ["2020-12-28", 6],
            ],
            type: "line",
            name: "垃圾桶使用频率",
          },
          {
            data: [
              ["2020-12-20", 44],
              ["2020-12-22", 162],
              ["2020-12-24", 67],
              ["2020-12-26", 44],
              ["2020-12-28", 9],
            ],
            type: "line",
            name: "出入人流量",
          },
        ],
      },
    };
  },
  methods: {
    echartsRadar() {
      var echartsRadar = document.getElementById("radarCss");
      var myChart = echarts.init(echartsRadar);
      var option;
      option = {
        // title: {
        //   text: "网络访问情况",
        //   // subtext: '纯属虚构',
        //   top: 20,
        //   left: 10,
        //   textStyle: {
        //     // 图例的公用文本样式。
        //     fontSize: 13,
        //     color: "#000",
        //     fontWeight: "normal", // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
        //   },
        // },
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          bottom: 0,
          data: (function() {
            var list = [];
            for (var i = 1; i <= 7; i++) {
              list.push("周" + i);
            }
            return list;
          })(),
        },
        // visualMap: {
        //   show: false,
        //   top: "middle",
        //   right: 10,
        //   color: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'],
        //   calculable: false,
        // },
        grid: { bottom: "7%", top: "32%" },
        radar: {
          center: ["50%", "45%"],
          radius: 120,
          indicator: [
            { text: "00:00~04:00", max: 300 },
            { text: "04:00~08:00", max: 300 },
            { text: "08:00~12:00", max: 300 },
            { text: "12:00~16:00", max: 300 },
            { text: "16:00~20:00", max: 300 },
            { text: "20:00~24:00", max: 300 },
          ],

        },
        series: (function() {
          var series = [];
          for (var i = 1; i <= 7; i++) {
            series.push({
              name: "访问人数",
              type: "radar",
              symbol: "none",
              lineStyle: {
                width: 1,
              },
              emphasis: {
                areaStyle: {
                  color: "rgba(0,250,0,0.3)",
                },
              },
              data: [
                {
                  value: [
                    (42 - i) * 7,
                    (28 - i) * 6 + 60,
                    i * 5 + 100,
                    i * 20,
                    (i * i * i) / 3 + 100,
                    (i * i * i) / 4 + 100,
                  ],
                  name: "周" + i,
                },
              ],
            });
          }
          return series;
        })(),
      };

      option && myChart.setOption(option);
    },
    lineHistogram() {
      var chartDom = document.getElementById("lineHistogramCss");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: false },
            saveAsImage: { show: false },
          },
        },
        legend: {
          data: ["东门", "西门", "南门", "北门", "车流量"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "0~2",
              "3~4",
              "5~6",
              "7~8",
              "9~10",
              "11~12",
              "13~14",
              "15~16",
              "17~18",
              "19~20",
              "21~22",
              "23~24",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "人流量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 人次",
            },
          },
          {
            type: "value",
            name: "车流量",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} 车次",
            },
          },
        ],
        grid: { bottom: "7%", top: "22%" },
        series: [
          {
            name: "东门",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
            ],
          },
          {
            name: "西门",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3,
            ],
          },
          {
            name: "南门",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3,
            ],
          },
          {
            name: "北门",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3,
            ],
          },
          {
            name: "车流量",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2,
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    // this.lineHistogram();
    this.echartsRadar();
  },
};
</script>

<style scoped>
header {
  margin-bottom: 30px;
  font-size: 1.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid rgba(193, 193, 193, 0.5);
}

.flow-detection {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 208px;
  right: 0;
  padding: 2em;
  background-color: #f5f6fa;
}

.e-charts {
  background: #fff;
  margin-left: 50px;
  padding: 20px;
  margin: 0 auto;
}
#lineHistogramCss {
  width: 100%;
  height: 400px;
}
#radarCss {
  width: 100%;
  height: 400px;
}
</style>
