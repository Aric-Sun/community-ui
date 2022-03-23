<template>
  <div class="employee">
    <h2 class="title">个人信息</h2>
    <div class="wrapper">
      <!-- 表单的具体内容 -->
      <div class="content">
        <div class="form-group">
          <label for="userid">ID</label>
          <input
            type="text"
            class="userid un-allowed"
            name="userid"
            id="userid"
            disabled
            :value="userid"
          />
        </div>
        <div class="form-group">
          <label for="department">岗位部门</label>
          <input
            type="text"
            class="department un-allowed"
            name="department"
            id="department"
            disabled
            :value="department"
          />
        </div>
        <div class="form-group">
          <label for="username">名字</label>
          <input
            type="text"
            class="username"
            name="username"
            id="username"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            class="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <!-- 提交修改信息 -->
        <Button
          type="success"
          class="submit"
          :loading="isloading"
          @click="updata"
          >保存</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  getEmployeeInformation,
  updataEmployeeInformation,
  getDepartmentName,
} from "network/employee";

export default {
  name: "Employee",
  data() {
    return {
      userid: "1",
      department: "部门",
      username: "admin",
      password: "admin",
      isloading: false,
    };
  },
  mounted() {
    this.getEmployeeInformation();
  },
  activated() {},
  methods: {
    // 网络请求

    /**
     * 获取员工信息
     */
    getEmployeeInformation() {
      getEmployeeInformation().then((res) => {
        const dataT = res.data.departmentId;
        console.log(dataT)
        getDepartmentName(dataT).then((resT) => {
          this.department = resT.data.name;
        });
        // 显示员工信息
        res.id = 1;
        this.userid = res.id;
        this.username = res.username;
        this.password = res.password;
      });
    },

    /**
     * 更新员工信息
     */
    updataEmployeeInformation(data) {
      // 显示加载
      console.log(data);
      this.isloading = true;
      updataEmployeeInformation(data).then((res) => {
        this.showSuccess();

        setTimeout(() => {
          this.isloading = false;
          console.log(res);
        }, 200);
      });
    },

    /**
     * 显示成功信息
     */
    showSuccess() {
      this.$Message["success"]({
        background: true,
        content: "保存信息成功！",
      });
    },

    /**
     * 显示失败信息
     */
    showError() {
      this.$Message["error"]({
        background: true,
        content: "保存信息失败！",
      });
    },

    // 点击事件

    /**
     * 获取更新信息并发送请求
     */
    updata() {
      const data = {
        username: this.username,
        password: this.password,
        userid: this.userid,
        department: "1",
      };

      this.updataEmployeeInformation(data);
    },
  },
};
</script>

<style scoped>
.employee {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 208px;
  right: 0;
  padding: 2em;
  background-color: #f5f6fa;
}

.wrapper {
  overflow: hidden;
  height: 470px;
  padding: 2em;
  padding-top: 0;
  padding-bottom: 0;
  background: #fff;
}

.title {
  margin-bottom: 30px;
  font-size: 1.5em;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(193, 193, 193, 0.5);
}

.content > label {
  font-weight: bold;
}

/* 表单样式 */
.form-group {
  width: 100%;
  margin-bottom: 15px;
  margin-top: 2em;
}

.form-group label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}

/* 输入框的总样式 */
.form-group input {
  box-sizing: border-box;
  width: 100%;
  padding: 5px 12px;
  border: none;
  outline: none;
  border: 1px solid #ebebeb;
  transition: 0.2s linear;
}

.form-group input:focus {
  border-color: #33cabb;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(51, 202, 187, 0.6);
}

/* 个别输入框单独调整 */
.form-group .un-allowed {
  cursor: not-allowed;
}

.submit {
  border: none;
  background-color: #33cabb;
  border-color: #33cabb;
  color: #fff;
  width: 100px;
  padding: 8px 12px;
  margin-top: 1em;
  letter-spacing: 1px;
  border-radius: 2px;
  outline: none;
  -webkit-transition: 0.15s linear;
  transition: 0.15s linear;
  line-height: 1;
}

.submit:hover {
  background-color: #52d3c7;
  border-color: #52d3c7;
}
</style>