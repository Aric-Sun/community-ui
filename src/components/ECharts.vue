<template>
  <div id='vue-echarts'></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const echart = echarts.init(document.getElementById('vue-echarts'));
    echart.setOption(this.options);
  }
}
</script>

<style scoped>
#vue-echarts {
  width: 100%;
  height: 400px;
}
</style>