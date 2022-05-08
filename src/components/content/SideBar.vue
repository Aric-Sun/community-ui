<template>
  <div class="side-bar">
    <div class="wrapper">
      <ul class="side-list">
        <li class="item" @click="gotoFdetection" v-if="isEmployee">
          <i class="iconfont icon-xitongjiance"></i>
          系统流量监测与统计
        </li>
        <li class="item" @click="gotoProperty" v-if="isEmployee">
          <i class="iconfont icon-renyuanguanli"></i>
          物业人员管理
        </li>
        <li class="item" @click="gotoDepartment"  v-if="isEmployee">
          <i class="iconfont icon-bumenguanli"></i>
          部门管理
        </li>
        <li class="item" @click="gotoEmployee" v-if="isWuye">
          <i class="iconfont icon-gerenxinxiweihu1"></i>
          员工个人信息维护
        </li>
        <li class="item" @click="gotoManager" v-if="isEmployee">
          <i class="iconfont icon-gerenxinxiweihu1"></i>
          经理信息浏览
        </li>
        <li class="item" @click="gotoOwner">
          <i class="iconfont icon-gerenxinxiweihu"></i>
          业主信息维护
        </li>
        <li class="item" @click="gotoNotice">
          <i class="iconfont icon-gonggao"></i>
          公告管理
        </li>
        <li class="item" @click="gotoData">
          <i class="iconfont icon-keshihuashujuETL"></i>
          数据可视化
        </li>
        <li class="item" @click="gotoUP">
          <i class="iconfont icon-keshihuashujuETL"></i>
          业主进出记录
        </li>
        <li class="item" @click="gotoUQR">
          <i class="iconfont icon-keshihuashujuETL"></i>
          访客记录
        </li>
      </ul>
      <ul class="side-list">
        <li class="item" @click="modalLevel = true">
          <i class="iconfont icon-keshihuashujuETL"></i>
          疫情防控等级调整
        </li>
      </ul>
    </div>
    <Modal
      v-model="modalLevel"
      title="疫情防控等级调整"
      @on-ok="changeLevel"
      @on-cancel="cancel"
    >
      防控等级：
      <RadioGroup v-model="level">
        <Radio label="0">低</Radio>
        <Radio label="1">中</Radio>
        <Radio label="2">高</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script>
import { updataLevel, getLevel } from "../../network/level.js";
export default {
  name: "SideBar",
  data() {
    return {
      isEmployee: false,
      isWuye: true,
      modalLevel: false,
      level: "0",
      levelLis: [
        {
          code: 0,
          description: "低风险",
        },
      ],
    };
  },
  methods: {
    changeSlider() {
      // 判断
      const identity = this.$store.getters.getIdentity
      if (identity == '物业经理') {
        // 物业经理
        this.isEmployee = true;
        this.isWuye = false;
        console.log(identity);
      } else {
          // 员工
        this.isEmployee = false;
        this.isWuye = true;
        console.log(identity);
      }
    },
    // 路由跳转
    gotoFdetection() {
      this.$router.push("/flowdetection");
    },

    gotoProperty() {
      this.$router.push("/property");
    },

    gotoDepartment() {
      this.$router.push("/department");
    },

    gotoEmployee() {
      this.$router.push("/employee");
    },
    gotoManager() {
      this.$router.push("/manager");
    },
    gotoOwner() {
      this.$router.push("/owner");
    },

    gotoNotice() {
      this.$router.push("/notice");
    },

    gotoData() {
      this.$router.push("/data");
    },
    gotoUP() {
      this.$router.push("/user/passages");
    },
    gotoUQR() {
      this.$router.push("/user/qrcode");
    },
    getLevel() {
      getLevel().then((res) => {
        // console.log(res.data.code);
        this.level = res.data.code + "";
      });
    },
    changeLevel() {
      //改变疫情防控等级
      this.modalLevel = false;
      this.levelLis = [
        {
          code: this.level - 0,
        },
      ];
      // console.log(this.levelLis[0].code);
      updataLevel(this.levelLis[0]).then((res) => {
        this.$Message.info("防疫等级已调整,当前等级：" + this.level);
        setTimeout(() => {
          this.getLevel();
          console.log(res);
        }, 200);
      });
    },
  },
  mounted() {
    this.getLevel();
  },
};
</script>

<style scoped>
@import "https://at.alicdn.com/t/font_2344063_9et4hciuv2.css";

.side-bar {
  position: fixed;
  top: 0;
  bottom: -0px;
  left: 0;
  background-color: rgb(48, 65, 86);
}

.side-list .item {
  color: rgb(191, 203, 217);
  cursor: pointer;
  font-size: 1em;
  width: 13rem;
  padding: 0 20px;
  height: 56px;
  line-height: 56px;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
}

.side-list .item:hover {
  color: #fff;
  background: rgb(130, 174, 173);
  border-radius: 3px;
}

.side-list .item i {
  padding-right: 10px;
}
</style>