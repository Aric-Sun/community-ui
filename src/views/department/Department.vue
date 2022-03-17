<template>
  <!--陈增-部门管理  -->
  <div class="department">
    <!-- 标题 -->
    <div class="heading">
      <h1>物业部门管理</h1>
    </div>

    <div class="body">
      <div class="addDepartment">
        <Button type="primary" icon="md-add" @click="addDepartment()"
          >添加部门</Button
        >
      </div>
      <Table border :columns="columns" :data="DepartmentData"></Table>
    </div>
    <!-- 添加部门模态框 -->
    <Modal
      v-model="addModal"
      title="添加部门"
      @on-ok="addOk"
      @on-cancel="cancel"
    >
      <Form
        ref="addDepartmentForm"
        :model="addDepartmentForm"
        :label-width="100"
      >
        <FormItem label="部门名称:">
          <Input
            v-model="addDepartmentForm.departmentName"
            clearable
            placeholder="部门名称"
          />
        </FormItem>
        <FormItem label="部门负责人:">
          <Input
            v-model="addDepartmentForm.headName"
            placeholder="部门负责人"
          />
        </FormItem>
      </Form>
    </Modal>
    <!-- 编辑部门模态框 -->
    <Modal
      v-model="editorModal"
      title="编辑部门"
      @on-ok="editorOk"
      @on-cancel="cancel"
    >
      <Form
        ref="addDepartmentForm"
        :model="addDepartmentForm"
        :label-width="100"
      >
        <FormItem label="部门名称:">
          <Input
            v-model="addDepartmentForm.departmentName"
            clearable
            placeholder="部门名称"
          />
        </FormItem>
        <FormItem label="部门负责人:">
          <Input
            v-model="addDepartmentForm.headName"
            placeholder="部门负责人"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>

</script>

<style scoped>
/* 背景颜色铺满 */
.department {
  height: 100%;
  width: calc(100% - 208px);
  background: #f5f6fa;
}
/* 标题属性 */
.heading {
  width: 100%;
  padding: 16px 32px 0 32px;
  border-bottom: 1px solid rgba(193, 193, 193, 0.5);
}

.heading h1 {
  font-size: 24px;
  margin: 0;
  margin-bottom: 16px;
}
/* 主题内容部分 */
.body {
  margin-top: 30px;
  padding: 20px;
  background: #fff;
}
.addDepartment {
  /* text-align: right; */
  /* margin-top: 10px; */
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
.designation {
  width: 100px;
}
</style>
