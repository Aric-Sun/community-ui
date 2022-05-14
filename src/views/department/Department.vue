<template>
  <!--部门管理  -->
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
import {getEmployeeInformation,getEmployeeInformations, updataEmployeeInformation,getDepartmentName,addEmployeeInformation} from "network/employee";
import {addDepartments,updataDepartments, getDepartmentInformation,deleteDepartments} from 'network/department';
export default {
  name: "department",
  data() {
    return {
      eeitorIndex: 0,
      addModal: false,
      editorModal: false,
      addDepartmentForm: {
        id:'',
        departmentName:"",
        headName:"",
      },
      columns: [
        {
          title: "部门编号",
          key: "DepartmentId",
        },
        {
          title: "部门负责人",
          key: "name",
        },
        {
          title: "部门名称",
          key: "DepartmentName",
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.editorDepartment(params.index);
                      },
                    },
                  },
                  "编辑"
              ),
              h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      },
                    },
                  },
                  "删除"
              ),
            ]);
          },
        },
      ],
      DepartmentData: [],
      DepartmentDataName:['John Browe','Jon Sun','Jon Snow','Joe Black','Jim Green','Jack Brown','Tom Mao','Jerry Shu'],
      dateDepartment:{
        departmentName:'',
      },
      dateEmployee:[{
        name:'',
        departmentId:'',
      }],
    };
  },
  methods: {
    getDepartmentInformation(){
      this.DepartmentData = [];
      getDepartmentInformation().then((res) => {
        // console.log(id);
        // this.getEmployeeInformation();
        for(let i in res.data._embedded.departments){
          const idStr = res.data._embedded.departments[i]._links.self.href;
          const id = idStr.split('/');
          this.DepartmentData.push({
            DepartmentId:id[4],
            DepartmentName: res.data._embedded.departments[i].name
          })
        }
        for(let j in this.DepartmentData){
          this.DepartmentData[j].name = this.DepartmentDataName[j]
        }
      });
    },
    addOk() {
      this.dateDepartment.departmentName = this.addDepartmentForm.departmentName;
      addDepartments(this.dateDepartment).then(resp => {
        this.$Message.success('添加成功');
      }).catch(err => {
        console.log(err)
        this.$Message.error('添加失败');
      }).finally(() => {
        this.addModal = false;
        this.addModal = false;
        this.getDepartmentInformation();
      });
    },
    remainingTime(){
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.countNum --;
        if (this.countNum == 0) {
          clearInterval(this.timer);
          this.showAlert = true;
          this.alertText = 'timeout';
        }
      }, 1000);
    },
    addDepartment() {
      this.addModal = true;
    },
    editorOk() {
      // console.log(this.addDepartmentForm);
      updataDepartments(this.addDepartmentForm).then(res =>{
        // this.getDepartmentInformation();
        this.$Message.info(
            "修改成功"
        );
        setTimeout(() => {
          // console.log(res);
          this.getDepartmentInformation();
        }, 200);
      });
      let category_id = this.foods.category_id;
      let item_id = this.foods.item_id;
      if (this.shopCart&&this.shopCart[category_id]&&this.shopCart[category_id][item_id]) {
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach((item,index) => {
          num += item.num;
        })
        return num;
      }else {
        return 0;
      }
    },
    editorDepartment(index) {
      this.addDepartmentForm.departmentName = this.DepartmentData[index].DepartmentName;
      this.addDepartmentForm.headName = this.DepartmentData[index].name;
      this.addDepartmentForm.id = this.DepartmentData[index].DepartmentId;
      this.editorModal = true;
    },
    remove(index) {
      this.$Modal.confirm({
        title: '删除',
        content: '确定删除'+this.DepartmentData[index].DepartmentName+'?',
        onOk: () => {
          this.deleteOk(index);
          this.DepartmentData.splice(index, 1);
        },
        onCancel: () => {
          this.$Message.info('cancel');
        }
      });
    },
    deleteOk(index){
      const id = this.DepartmentData[index].DepartmentId;
      deleteDepartments(id).then(res =>{
        this.$Message.info('删除成功');
        setTimeout(() => {
          console.log(res);
        }, 200);
      })
    },
    cancel() {
      this.addModal = false;
      this.editorModal = false;
      this.addDepartmentForm.departmentName = "";
      this.addDepartmentForm.headName = "";
    },
  },
  mounted(){
    this.getDepartmentInformation();
  }
};
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
