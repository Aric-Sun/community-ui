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

</script>
<style>

</style>
