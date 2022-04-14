<template>
  <div class="owner">
    <div class="heading">
      <h1>业主信息管理</h1>
    </div>
    <div class="body">
      <div class="func">
        <div class="search">
          <Input @on-search='onSearchTriggered' search enter-button placeholder="输入查询内容">
            <Select v-model="queryType" slot='prepend' style='width: 90px'>
              <Option value='1'>业主id</Option>
            </Select>
          </Input>
        </div>
        <Button type='primary' icon='md-add' @click="onAddOwnerClicked">添加新业主</Button>
      </div>
      <Table stripe border :columns='columns' :data='data' :loading='isDataLoading'>
        <template slot="action" slot-scope="{ row }">
          <Button style='margin-right: 5px' type='info' icon='md-create' @click="onEditOwnerClicked(row.id)">编辑</Button>
          <Button type='error' icon='md-trash' @click="onDeleteOwnerClicked(row.id)">删除</Button>
        </template>
      </Table>
      <div class="pager">
        <Page :total='totalSize' :page-size='pageSize' show-elevator @on-change='onPageChanged' />
      </div>
    </div>
    <Modal
      :okText='modalConfirmText'
      :loading='isModalLoading'
      :title='modalTitle'
      v-model="isModalShow"
      @on-ok='onModalConfirmClicked'
      @on-visible-change='onModalVisibleChanged'
    >
      <Form ref='ownerForm' :model='ownerForm' :rules='ownerFormRules' :label-width='120'>
        <FormItem label='编号' v-if="modalMode === 2">
          <Input v-model="ownerForm.id" readonly />
        </FormItem>
        <FormItem label='姓名' prop='name'>
          <Input v-model="ownerForm.name" maxlength="20" show-word-limit />
        </FormItem>
        <FormItem label='性别' prop='sex'>
          <RadioGroup v-model="ownerForm.sex">
            <Radio label='男' />
            <Radio label='女' />
          </RadioGroup>
        </FormItem>
        <FormItem label='出生年份' prop='birthYear'>
          <DatePicker v-model="ownerForm.birthYear" type='year' placeholder='选择出生年份' />
        </FormItem>
        <FormItem label='幢' prop='blockNo'>
          <Input v-model="ownerForm.blockNo" number />
        </FormItem>
        <FormItem label='室' prop='roomNo'>
          <Input v-model="ownerForm.roomNo" number />
        </FormItem>
        <FormItem label='业主用户ID' prop='userId'>
          <Input v-model="ownerForm.userId" number />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getOwners, getOwnerInfo, addOwner, editOwnerInfo, queryOwnersInfo, deleteOwner } from 'network/owner';
import { formatDate, getId } from 'common/utils';

export default {
  name: "Owner",
  data(){
    return {
      columns: [
        { title: '编号', key: 'id' },
        { title: '姓名', key: 'name' },
        { title: '性别', key: 'sex' },
        { title: '年龄', key: 'age' },
        { title: '业主用户ID', key: 'userId' },
        { title: '操作', slot: 'action', align: 'center' }
      ],
      data: [],
      isModalShow: false,
      modalTitle: '添加新业主',
      modalMode: 1,// 1: adding new owner, 2: editing owner info
      isModalLoading: true,
      ownerForm: {
        id: 0,
        name: '',
        sex: '',
        birthYear: null,
        blockNo: 0,
        roomNo: 0,
        status: '',
        userId: 0
      },
      ownerFormRules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        birthYear: [
          { required: true, type: 'date', message: '出生年份不能为空', trigger: 'change' }
        ],
        blockNo: [
          { required: true, type: 'number', message: '幢号不能为空', trigger: 'blur' },
        ],
        roomNo: [
          { required: true, type: 'number', message: '室号不能为空', trigger: 'blur' }
        ],
        userId: [
          { required: true, type: 'number', message: '业主用户ID不能为空', trigger: 'blur' }
        ]
      },
      isDataLoading: true,
      curEditingId: -1,
      curPage: 1,
      pageSize: 5,
      totalSize: 1,
      queryType: 0,
      queryContent: ''
    }
  },
  computed: {
    modalConfirmText() {
      if (this.modalMode === 1) return '添加';
      return '更新';
    }
  },
  methods: {
    onAddOwnerClicked() {
      this.ownerForm = {
        name: '',
        sex: '',
        birthYear: null,
        blockNo: null,
        roomNo: null,
        userId: 0
      };
      this.$refs.ownerForm.resetFields();
      this.isModalShow = true;
      this.modalTitle = '添加新业主';
      this.modalMode = 1;
    },
    onEditOwnerClicked(id) {
      getOwnerInfo(id).then(resp => {
        const splitted = resp.data.buildingRoom.split('-');
        const owner = {
          ...resp.data,
          birthYear: new Date(resp.data.birthYear, 0),
          blockNo: +splitted[0],
          roomNo: +splitted[1],
          id: getId(resp.data._links)
        };
        delete owner._links;
        delete owner.buildingRoom;
        this.$refs.ownerForm.resetFields();
        this.ownerForm = owner;
        this.isModalShow = true;
        this.modalTitle = '编辑业主信息';
        this.modalMode = 2;
        this.curEditingId = id;
      }).catch(err => {
        this.$Message.error('业主详情读取失败');
      });
    },
    onDeleteOwnerClicked(id) {
      this.$Modal.confirm({
        title: '删除业主信息',
        content: '确定要删除这条业主信息？',
        onOk: () => {
          deleteOwner(id).then(resp => {
            this.$Message.success('删除成功');
            this.fetchOwners();
          }).catch(err => {
            this.$Message.error('删除失败');
          }).finally(() => {
            this.$Modal.remove();
          })
        },
        loading: true
      });
    },
    onModalConfirmClicked() {
      this.$refs.ownerForm.validate(valid => {
        if (!valid) {
          this.$Message.error('校验失败');
          this.isModalLoading = false;
          return;
        }
        if (this.modalMode === 1) {
          const modifiedForm = {
            ...this.ownerForm,
            buildingRoom: `${this.ownerForm.blockNo}-${this.ownerForm.roomNo}`,
            createTime: formatDate(new Date())
          };
          modifiedForm.birthYear = modifiedForm.birthYear.getFullYear();
          delete modifiedForm.roomNo;
          delete modifiedForm.blockNo;
          addOwner(modifiedForm).then(resp => {
            this.$Message.success('添加成功');
            this.fetchOwners();
          }).catch(err => {
            console.log(err)
            this.$Message.error('添加失败');
          }).finally(() => {
            this.isModalLoading = false;
            this.isModalShow = false;
          });
        } else {
          const modifiedForm = {
            ...this.ownerForm,
            buildingRoom: `${this.ownerForm.blockNo}-${this.ownerForm.roomNo}`
          };
          modifiedForm.birthYear = modifiedForm.birthYear.getFullYear();
          delete modifiedForm.roomNo;
          delete modifiedForm.blockNo;
          editOwnerInfo(modifiedForm).then(resp => {
            this.fetchOwners();
            this.$Message.success('修改成功');
          }).catch(err => {
            this.$Message.error('修改失败');
          }).finally(() => {
            this.isModalLoading = false;
            this.isModalShow = false;
          });
        }
      })
    },
    fetchOwners() {
      this.data = [];
      getOwners(this.curPage - 1, this.pageSize).then(resp => {
        const page = resp.data.page;
        this.totalSize = page.totalElements;
        for (const userInfo of resp.data._embedded.userInfoes) {
          const transformed = {
            ...userInfo,
            id: getId(userInfo._links),
            age: new Date().getFullYear() - userInfo.birthYear
          };
          delete transformed.buildingRoom;
          this.data.push(transformed);
        }
      }).catch(err => {
        this.$Message.error('获取业主信息列表失败');
      }).finally(() => {
        this.isDataLoading = false;
      });
    },
    onPageChanged(page) {
      this.curPage = page;
      this.fetchOwners();
    },
    onModalVisibleChanged(visible) {
      if (visible) {
        this.isModalLoading = true;
      }
    },
    onSearchTriggered(value) {
      if (this.queryType === 0) {
        this.$Message.error('未选择查询字段类型');
        return;
      }
      if (value === ''){
        this.$Message.error('未输入查询数据');
        this.fetchOwners();
        return;
      }
      this.data = [];
      this.isDataLoading = true;
      this.queryContent = value;
      queryOwnersInfo({ type: this.queryType, id: value }).then(resp => {
        const data = resp.data;
        const now = new Date();
        if (this.queryType == 1) {  // 只会查到一个结果
          const singleOwner = {
            ...data,
            id: getId(data._links),
            age: now.getFullYear() - data.birthYear
          };
          this.data.push(singleOwner);
        } else {
          this.totalSize = data.total;
          for (const owner of data.owners) {
            owner.age = now.getFullYear() - new Date(owner.birthYear).getFullYear();
            this.data.push(owner);
          }
        }
        this.isDataLoading = false;
      }).catch(err => {
        this.$Message.error('输入有误，请检查后重新输入');
      });
    }
  },
  mounted() {
    this.fetchOwners();
  }
}
</script>

<style scoped>
.owner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 208px;
  right: 0;
  padding: 2em;
  background-color: #f5f6fa;
}
.heading {
  margin-bottom: 30px;
  font-size: 1.5em;
  font-weight: bold;
  border-bottom: 1px solid rgba(193, 193, 193, .5);
}

.heading h1 {
  font-size: 24px;
  margin: 0;
  margin-bottom: 16px;
}

.body {
  padding: 20px;
  background: #fff;
}

.body .func {
  text-align: right;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.body .func .search {
  width: 30%;
  margin-right: 15px;
  display: inline-block;
}

.body .pager {
  margin-top: 10px;
  text-align: right;
}
</style>