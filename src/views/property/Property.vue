<template>
  <!--物业人员管理  -->
  <div class="property">
    <!-- 标题 -->
    <div class="heading">
      <h1>物业人员管理</h1>
    </div>
    <!-- 主体 -->
    <div class="body">
      <!-- 搜索框 -->
      <!-- 利用栅格布局 -->
      <div class="search">
        
        <Input style="width: 300px" search enter-button placeholder="请输入员工姓名/员工id" v-model="searchUser" @on-search="searchEmployee()"  >
        </Input>

        <!-- <Col span="6" />
        <Col span="6" /> -->

        <Button type='primary'  icon='md-add' @click="onAddEmployeeClicked()">添加新员工</Button>

      </div>
      <!-- 表格 -->
      <Table context-menu show-context-menu border :columns="firstLine" :data="data" @on-contextmenu="handleContextMenu">
          <template slot="action" slot-scope="{ row , index }">
            <!-- {{row.userid}} -->
            <Button type="primary" size="small" style="margin-right: 5px" @click="onEditEmployeeClicked(row.userid)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
          <template slot="contextMenu">
            <DropdownItem @click.native="rePwd">重置密码</DropdownItem>
        </template>
      </Table>
      <div style="text-align: right;margin-top:15px">
        <Page  :total='totalSize' :page-size='pageSize' show-elevator @on-change='onPageChanged' />
      </div>

    </div>
    <!-- 模态框 -->
    <!-- 添加/修改 模态框 -->
    <Modal v-model="mAdd" :title= 'mtitle' @on-ok="ok" @on-cancel="cancel">
        <Form ref='formItem' :model='formItem' :rules='ruleValidate' :label-width='80' >
          <FormItem label="姓名" prop="name">
              <Input v-model="formItem.name" placeholder="姓名"  />
          </FormItem>
          <!-- 职务选择 -->
          <FormItem label="职务" prop ="position">
              <Select v-model="formItem.position"  >
                <Option value="保安">保安</Option>
                <Option value="客服">客服</Option>
                <Option value="业务员">业务员</Option>
                <Option value="清洁工">清洁工</Option>
                <Option value="维修工">维修工</Option>              
                <Option value="总经理">总经理</Option>
              </Select>
          </FormItem>
          <FormItem label="部门" prop = "department">
              <Select v-model="formItem.department" >
                <Option value="5">事务管理部</Option>
                <Option value="4">安全保卫部</Option>
                <Option value="6">保洁绿化部</Option>
                <Option value="10">设备管理部</Option>
                <Option value="7">客户服务部</Option>
                <Option value="8">招商开发部</Option>
              </Select>
          </FormItem>
          <FormItem label="状态" prop = "state" >
              <Select v-model="formItem.state">
                <Option value="工作">工作</Option>
                <Option value="休假">休假</Option>
                <Option value="离职">离职</Option>
              </Select>
          </FormItem>
      </Form>
    </Modal>
    <!-- 删除提示框 -->
    <Modal v-model="mDelete" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除员工信息</span>
        </p>
        <div style="text-align:left;margin-left:30px">
          <p>编号：{{this.formItem.userid}}</p>
          <p>姓名：{{this.formItem.name}}</p>
          <p>职务：{{this.formItem.position}}</p>
          <p>所属部门：{{this.formItem.department}}</p>
          <p>状态：{{this.formItem.state}}</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="del()">Delete</Button>
        </div>
    </Modal>
    
  </div>
</template>

<script>
import {getEmployeeInformation,getEmployeeInformations,getDepartmentName,addEmployeeInformation} from "network/employee";
import {addDepartments, getDepartmentInformation}from'network/department';
import {updataPropertyInformation,getPropertyformation,deleteEmployees}from'network/property';
export default {
  name: "Property",
  data(){
    return {
      curPage: 1,
      pageSize: 5,
      totalSize: 1,
      searchUser:'',// 搜索框内容
      mtitle:'',// 模态框标题信息
      mAdd:false,// 添加/修改模态框
      mDelete:false,// 删除，弹出模态框
      delIndex:0,// 标识需要删除的行
      pmodel:0,// 0表示添加员工，1表示修改员工信息
      formItem: {// 模态框展示表单
          name: '',// 姓名
          position:'',// 职务
          department: '',// 所属部门
          state:'',// 状态
      },
      // 表单规则
      ruleValidate: {
          name: [
              { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          position: [
              { required: true, message: '请选择职务', trigger: 'change' }
          ],
          department: [
              { required: true, message: '请选择部门', trigger: 'change' }
          ],
          state: [
              { required: true, message: '请选择状态', trigger: 'change' }
          ],
      },
      // 列表第一行内容
      firstLine: [
          {
              title: '员工ID',
              key: 'userid',
              width: 150,//宽度修改
          },
          {
              title: '姓名',
              key: 'name',
          },
          {
              title: '职务',
              key: 'position',
              //筛选
              filters: [
                            {
                                label: '总经理',
                                value: '总经理'
                            },
                            {
                                label: '保安',
                                value: '保安'
                            },
                            {
                                label: '清洁工',
                                value: '清洁工'
                            },
                            {
                                label: '客服',
                                value: '客服'
                            },
                            {
                                label: '业务员',
                                value: '业务员'
                            },
                        ],
                        filterMethod (value, row) {
                            return row.position.indexOf(value) > -1;
                        }
          },
          {
              title: '所属部门',
              key: 'department',
              //筛选
              filters: [
                            {
                                label: '事务管理部',
                                value: '事务管理部'
                            }, {
                                label: '安全保卫部',
                                value: '安全保卫部'
                            }, {
                                label: '保洁绿化部',
                                value: '保洁绿化部'
                            }, {
                                label: '客户服务部',
                                value: '客户服务部'
                            }, {
                                label: '招商开发部',
                                value: '招商开发部'
                            },{
                                label: '设备管理部',
                                value: '设备管理部'
                            },
                        ],
                        filterMethod (value, row) {
                            return row.department.indexOf(value) > -1;
                        }
          },
          
          {
              title: '状态',
              key: 'state'
          },
          {
              title: '操作',
              slot: 'action',
              width: 150,
              // align: 'center'
          }
      ],
      data: [ //列表展示数据 需要获取的数据
          {
              userid: 111,
              name: 'John Brown',
              department: '事务管理部',
              position: '总经理',
              state: '工作'
          },
          {
              userid: 121,
              name: 'Jim Green',
              department: '安全保卫部',
              position: '保安',
              state: '离职'
          },
          {
              userid: 131,
              name: 'Joe Black',
              department: '保洁绿化部',
              position: '清洁工',
              state: '休假'
          },
          {
              userid: 151,
              name: 'Jon Snow',
              department: '客户服务部',
              position: '客服',
              state: '工作'
          },
          {
              userid: 161,
              name: 'Jon Sun',
              department: '招商开发部',
              position: '客服',
              state: '工作'
          }
      ],
      addData:{
        userid:'',
        department:'',
        username:'',
        password:'123',
        position:0,
      },
      departmentName:'',
      DepartmentData: [],
      contextLine: 0
    }    
  },
  mounted() {
    this.getEmployeeInformation();
  },
  methods: {
    handleContextMenu (row) {
        const index = this.data.findIndex(item => item.userid === row.userid);
        this.contextLine = index;
    },
    rePwd () {
      this.formItem = JSON.parse(JSON.stringify(this.data[this.contextLine]));
      this.$Modal.confirm({
          title: '确认重置密码',
          content: '是否确认重置'+this.formItem.name+'的密码？',
          onOk: () => {
            this.addData.userid = this.formItem.userid;
            this.addData.position = this.formItem.position;
            this.addData.username = this.formItem.name;
            this.addData.department = this.formItem.department;
            updataPropertyInformation(this.addData).then((res) => {
                this.$Message.info('提交成功');
                setTimeout(() => {
                  this.getEmployeeInformation();
                  // console.log(res);
                }, 800);
            });
          },
          onCancel: () => {
              this.$Message.info('取消');
          }
      });
      
    },
    onPageChanged(page) {
      this.curPage = page;
      this.getEmployeeInformation();
    },
    getEmployeeInformation(){//获取员工信息
      this.data =[];//清空数组
      getDepartmentInformation().then((res) => {//获取部门信息
      // console.log(res._embedded.departments);
        for(let i in res.data._embedded.departments){
          const idStr = res.data._embedded.departments[i]._links.self.href;
          const id = idStr.split('/');
          this.DepartmentData.push({
            DepartmentId:id[4],
            DepartmentName: res.data._embedded.departments[i].name
          })
        }
        setTimeout(() => {//获取人员信息
        getEmployeeInformations(this.curPage - 1, this.pageSize).then((res) => {
          const page = res.data.page;
        this.totalSize = page.totalElements;
          for(let i in res.data._embedded.employees){
            const idStr = res.data._embedded.employees[i]._links.self.href;//获取id
            const id = idStr.split('/');
              if(i == 0){
                this.data = [{
                  userid: id[4], 
                  name: res.data._embedded.employees[i].username,
                  department:  res.data._embedded.employees[i].departmentId,
                  position: res.data._embedded.employees[i].job,
                  state: '工作中'//需要改动表格
                }];//清空数组
              }else{
                this.data.push({userid: id[4], 
                              name: res.data._embedded.employees[i].username,
                              department: res.data._embedded.employees[i].departmentId,
                              position: res.data._embedded.employees[i].job,
                              state: '工作中'//需要改动表格
                              });
              }
            for(let l = 0;l < this.DepartmentData.length;l++){
              if(this.data[i].department == this.DepartmentData[l].DepartmentId){
                this.data[i].department = JSON.parse(JSON.stringify(this.DepartmentData[l].DepartmentName));
              }
            }
          }
          });
        }, 100);
      });
    },
    searchEmployee(){//搜索员工函数
      var j = 0;
      for(var i = 0;i < this.data.length;i++){//查询员工
        if(this.data[i].userid == this.searchUser || this.data[i].name == this.searchUser){
          this.onEditEmployeeClicked(this.data[i].userid);//查到之后，调用修改函数
          j = 1;
        }
      }
      if(j == 0){
        this.$Message.error('查无此人');
      }
    },
    //添加员工
    onAddEmployeeClicked(){
      this.mtitle = '添加员工';//更改模态框标题
      // this.formItem = '';//清空一下
      this.formItem= {// 模态框展示表单
          name: '',// 姓名
          position:'',// 职务
          department: '',// 所属部门
          state:'',// 状态
      },
      this.pmodel = 0;//0表示添加员工
      this.mAdd = true;//打开模态框
    },
    //修改
    onEditEmployeeClicked(userid){
      var i = 0;
      for(i;i < this.data.length;i++){//找一下需要编辑的员工
        if(this.data[i].userid == userid){
          break;
        }
      }
      this.formItem = JSON.parse(JSON.stringify(this.data[i]));
      // console.log(this.formItem);
      if(this.formItem.department == "设备管理部"){
        this.formItem.department = '10';
      }else if(this.formItem.department == "事务管理部"){
        this.formItem.department = '5';
      }else if(this.formItem.department == "安全保卫部"){
        this.formItem.department = '4';
      }else if(this.formItem.department == "保洁绿化部"){
        this.formItem.department = '6';
      }else if(this.formItem.department == "客户服务部"){
        this.formItem.department = '7';
      }else if(this.formItem.department == "招商开发部"){
        this.formItem.department = '8';
      }
      this.mtitle = '编辑员工信息';
      this.pmodel = 1;//1表示修改员工信息
      this.mAdd = true;//打开模态框
      
    },
    //删除
    del(){
      console.log(this.data[this.delIndex].userid);//被删除的userid传入后端，
      this.data.splice(this.delIndex, 1);//从表格中去除
      this.mDelete = false;//关闭模态框
    },
    remove (index) {
      // this.mDelete = true;//打开模态框。
      // this.formItem = this.data[index];//显示被删除者的信息
      // console.log(index);
      // this.delIndex = index;    
      this.$Modal.confirm({
              title: '删除',
              content: '确定删除'+this.data[index].name+'?',
              onOk: () => {
                  this.deleteOk(index);
                  this.data.splice(index, 1);
              },
              onCancel: () => {
                  this.$Message.info('cancel');
              }
          });
    },
    deleteOk(index){
        const id = this.data[index].userid;
        deleteEmployees(id).then(res =>{
          this.$Message.info('删除成功');
          setTimeout(() => {
            console.log(res);
            this.getEmployeeInformation();
          }, 400);
        })
    },
    ok () {//确定
      this.$Message.info('提交信息中');
      // console.log(this.formItem);//信息传入后端，
      // console.log(this.pmodel);//顺便传入pmodel，判断是修改还是添加
      if(this.pmodel == 0){//添加员工
        this.addData.position = this.formItem.position;
        this.addData.username = this.formItem.name;
        this.addData.department = this.formItem.department;
        // console.log(this.data[this.data.length - 1].userid);
        // console.log(this.addData);
        addEmployeeInformation(this.addData).then((res) => {
          this.$Message.info('提交成功');
          setTimeout(() => {
            console.log(res);
            this.getEmployeeInformation();
          }, 400);
        });
      
      }else{//修改员工信息
        // console.log(this.formItem);
        this.addData.userid = this.formItem.userid;
        this.addData.position = this.formItem.position;
        this.addData.username = this.formItem.name;
        this.addData.department = this.formItem.department;
        const userid = this.formItem.userid;
        getPropertyformation(userid).then((res =>{
           this.addData.password = res.data.password;//保证密码不变
           updataPropertyInformation(this.addData).then((res) => {
            this.$Message.info('提交成功');
            setTimeout(() => {
              this.getEmployeeInformation();
              // console.log(res);
            }, 800);
           });
        }))
      }
    },
    cancel () {//取消
      this.$Message.info('取消');
    }
  }
}
</script>
<style scoped>
/* 背景颜色铺满 */
.property{
  height: 100%;
  width: calc(100% - 208px);
  background: #f5f6fa;
}
/* 标题属性 */
.heading {
  width: 100%;
  padding: 16px 32px 0 32px;
  border-bottom: 1px solid rgba(193, 193, 193, .5);
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
/* 搜索栏 */
.search {
  /* width: 30%; */
  /* margin-right: 15px; */
  /* display: inline-block; */
  text-align: right;
  /* margin-top: 10px; */
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
</style>