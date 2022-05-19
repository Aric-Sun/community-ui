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
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      editDialogVisible: false,
      addDialogVisible: false, //添加弹框是否显示
      total: 0, //总共多少条数据
      departmentData: [], //表格数据
      queryMap: { pageNum: 1, pageSize: 7, name: "" }, //查询对象
      addRuleForm: {}, //添加表单数据
      editRuleForm: {}, //修改表单数据
      deans: [], //所有系主任
      addRules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入办公地址", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ],
        mgrId: [{ required: true, message: "请选择系主任", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "请输入联系方式",
            validator: checkPhone,
            trigger: "blur"
          }
        ]
      } //添加验证
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
        if (this.preventRepeatReuqest) {
          return
        }
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
    /**
     * 加载部门表格
     */
    downExcel() {
      var $this = this;
      const res = axios
          .request({
            url: "/department/excel",
            method: "post",
            responseType: "blob"
          })
          .then(res => {
            if (res.headers["content-type"] === "application/json") {
              return $this.$message.error(
                  "Subject does not have permission [department:export]"
              );
            }
            const data = res.data;
            let url = window.URL.createObjectURL(data); // 将二进制文件转化为可访问的url
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = "部门列表.xls";
            a.click();
            window.URL.revokeObjectURL(url);
          });
    },
    //搜索
    search() {
      this.queryMap.pageNum = 1;
      this.getDepartmentList();
    },
    //删除部门
    async del(id) {
      var res = await this.$confirm(
          "此操作将永久删除该用户, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
      if (res == "confirm") {
        const { data: res } = await this.$http.delete(
            "department/delete/" + id
        );
        if (res.code == 200) {
          this.$message.success("部门删除成功");
          this.getDepartmentList();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    //更新用户
    async update() {
      this.$refs.editRuleFormRef.validate(async valid => {
        if (!valid) {
          return;
        } else {
          (this.btnLoading = true), (this.btnDisabled = true);
          const { data: res } = await this.$http.put(
              "department/update/" + this.editRuleForm.id,
              this.editRuleForm
          );
          if (res.code == 200) {
            this.$notify({
              title: "成功",
              message: "部门信息更新",
              type: "success"
            });
            this.editRuleForm = {};
            this.getDepartmentList();
            this.btnDisabled = false;
            this.btnLoading = false;
          } else {
            this.$message.error("部门信息更新失败:" + res.msg);
          }
          this.editDialogVisible = false;
        }
      });
    },
    //编辑
    async edit(id) {
      const { data: res } = await this.$http.get("department/edit/" + id);
      if (res.code == 200) {
        this.editRuleForm = res.data;
      } else {
        return this.$message.error("部门信息编辑失败" + res.msg);
      }
      this.editDialogVisible = true;
    },
    //添加
    add() {
      this.$refs.addRuleFormRef.validate(async valid => {
        if (!valid) {
          return;
        } else {
          (this.btnLoading = true), (this.btnDisabled = true);
          const { data: res } = await this.$http.post(
              "department/add",
              this.addRuleForm
          );
          if (res.code == 200) {
            this.$message.success("部门添加成功");
            this.addRuleForm = {};
            this.getDepartmentList();
          } else {
            return this.$message.error("部门添加失败:" + res.msg);
          }
          this.addDialogVisible = false;
          (this.btnLoading = false), (this.btnDisabled = false);
        }
      });
    },
    //加载系别列表
    async getDepartmentList() {
      const { data: res } = await this.$http.get(
          "department/findDepartmentList",
          {
            params: this.queryMap
          }
      );
      if (res.code !== 200) {
        return this.$message.error("获取用户列表失败");
      } else {
        this.total = res.data.total;
        this.departmentData = res.data.rows;
      }
    },
    //加载所有系主任
    async getDeanList() {
      const { data: res } = await this.$http.get("department/findDeanList");
      if (res.code !== 200) {
        return this.$message.error("获取系主任失败");
      } else {
        this.deans = res.data;
      }
    },
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getDepartmentList();
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
