<template>
  <div class="login_page">
    <div class="illustrations">

    </div>
    <div class="form_contianer">
      <div class="people">

      </div>
      <Form
          class="form"
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"

          inline
      >
        <div style="color:black;margin-bottom:20px">
          物业管理系统
        </div>

        <FormItem prop="user" >
          <Select v-model="selectModel" style="width:80px">
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Input type="text" style="width:160px"  v-model="formInline.user" placeholder="编号/用户名" />
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </FormItem>
        <FormItem prop="password">
          <Input
              style="width:240px"
              type="password"
              v-model="formInline.password"
              placeholder="密码"
          />
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </FormItem>
        <RadioGroup style="margin-bottom:20px;margin-top:-10px;float:left;margin-left:64px" v-model="userRadio">
          <Radio label="物业经理"></Radio>
          <Radio label="员工"></Radio>
        </RadioGroup>
        <div>
          <FormItem>
            <Button style="width:240px"  type="primary"   @click="submit">登录</Button>
          </FormItem>
        </div>

      </Form>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { SET_IDENTITY } from 'store/mutations_type';
import {getPropertyLoginformationName,getManagerLoginFormation,getPropertyLoginformation,getManagerLoginFormationName}from'network/property';
export default {
  name: "Login",
  data() {
    return {
      selectList: [
        {
          value: 'id',
          label: '编号'
        },
        {
          value: 'username',
          label: '用户名'
        },

      ],
      selectModel: 'id',
      userRadio:'物业经理',
      formInline: {
        user: "",
        password: "",
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            type: "string",
            min: 0,
            message: "最少位数",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    submit() {
      // this.$router.push("/flowdetection");
      // this.$emit("gotoHome");
      // console.log(this.userRadio)
      if(this.formInline.user == '' || this.formInline.password == ''){
        this.$Message.error('用户名/密码不为空');
      }else{
        // console.log(this.formInline.user);
        if(this.userRadio == '物业经理'){
          if(this.selectModel == 'id'){
            const userid = this.formInline.user;
            const pwd = this.formInline.password;
            getManagerLoginFormation(userid,pwd).then(res =>{
              if(res.data.password == this.formInline.password){
                // console.log("经理登录成功 id");
                this.$router.push("/flowdetection");
                this.$store.commit(SET_IDENTITY, this.userRadio);
                this.$emit("gotoHome");
              }
            }).catch(err => {
              console.log(err)
              this.$Message.error('请检查用户编号/密码');
            })
          }else{
            const username = this.formInline.user;
            const pwd = this.formInline.password;
            getManagerLoginFormationName(username,pwd).then(res =>{
              if(res.data.password == this.formInline.password){
                // console.log("经理登录成功 name");
                this.$router.push("/flowdetection");
                this.$store.commit(SET_IDENTITY, this.userRadio);
                this.$emit("gotoHome");
              }
            }).catch(err => {
              // console.log(err)
              this.$Message.error('请检查用户名/密码');
            })
          }
        }else if(this.userRadio == '员工'){
          if(this.selectModel == 'id'){
            const userid = this.formInline.user;
            const pwd = this.formInline.password;
            getPropertyLoginformation(userid,pwd).then(res =>{
              if(res.data.password == this.formInline.password){
                // console.log("员工登录成功");
                this.$router.push("/flowdetection");
                this.$store.commit(SET_IDENTITY, this.userRadio);
                this.$emit("gotoHome");
              }
            }).catch(err => {
              // console.log(err)
              this.$Message.error('请检查用户编号/密码');
            })
          }else{
            const username = this.formInline.user;
            const pwd = this.formInline.password;
            getPropertyLoginformationName(username,pwd).then(res =>{
              if(res.data.password == this.formInline.password){
                // console.log("员工登录成功");
                this.$router.push("/flowdetection");
                this.$store.commit(SET_IDENTITY, this.userRadio);
                this.$emit("gotoHome");
              }
            }).catch(err => {
              // console.log(err)
              this.$Message.error('请检查用户名/密码');
            })
          }
        }
      }

    },
  },
};
</script>
<style>

.login_page {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(5, 181, 224, 0.7);
  background-image: linear-gradient(to bottom right, rgb(101, 232, 255), rgb(1, 128, 207));
  /* background: url(./img/bg.jpg) no-repeat center center; */
  /* background-size: 100% 100%; */
}
.form_contianer {
  width: 380px;
  height: 280px;
  position:absolute;
  display: flex;
  text-align: center;
  justify-content: center;
  top: 0;
  left: 580px;
  right: 0;
  bottom: 0;
  margin: 150px auto;
  background-color: rgb(255, 255, 255);
  /* box-shadow: -15px 15px 15px rgba(29, 29, 29, 0.7); */
  /* background: linear-gradient(
    230deg,
    rgba(216, 216, 216, 0) 0%,
    rgb(141, 141, 141) 100%
  ); */
  padding-top: 50px;
  border-radius: 5%;
}
.people{
  position: absolute;
  width: 28%;
  height: 36%;
  top: -60px;
  background: url("./img/people.png") no-repeat;
  background-size: 100% 100%;
}
.illustrations{
  position: absolute;
  width: 40%;
  height: 63%;
  top: 90px;
  left: 180px;
  background: url("./img/interweb.png") no-repeat;
  background-size: 100% 100%;
}
.text{
  margin-top: 550px;
  color: aliceblue;
}
</style>
