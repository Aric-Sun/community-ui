<template>
  <div class="notice">
    <div class="heading">
      <h1>公告管理</h1>
    </div>
    <div class="body">
      <div class="func">
        <Button
          type='primary'
          icon='md-add'
          @click="onAddNoticeButtonClicked"
        >
        添加新公告
        </Button>
      </div>
      <Table
        border
        class='notice-table'
        :columns='columns'
        :data='data'
        :loading='isDataLoading'
      >
        <template slot-scope="{ row, index }" slot='action'>
          <Button type='success' style='margin-right: 5px' icon='md-paper-plane' @click="onPushNoticeClicked(row.content)">推送</Button>
          <Button type='info' style='margin-right: 5px' icon='md-create' @click="onEditButtonClicked(index, row)">编辑</Button>
          <Button type="error" icon='md-trash' @click="onDeleteButtonClicked(row.id)">删除</Button>
        </template>
      </Table>
      <div class="pager">
        <Page
          :total='totalSize'
          :page-size='pageSize'
          show-elevator
          @on-change='onPageChanged'
        />
      </div>
    </div>
    <Modal
      v-model="isModalShow"
      :loading='isModalLoading'
      :title='modalTitle'
      @on-ok='onModalConfirmClicked'
    >
      <Form ref='noticeForm' :model='noticeForm' :rules='noticeFormRules' :label-width='80'>
        <FormItem label='编号' v-if="modalMode === 2">
          <Input readonly v-model="curEditingId" />
        </FormItem>
        <FormItem label='标题' prop='title'>
          <Input v-model="noticeForm.title" placeholder="输入公告标题" />
        </FormItem>
        <FormItem label='内容' prop='content'>
          <Input
            v-model="noticeForm.content"
            type='textarea'
            placeholder="输入公告内容"
            :autosize='{ minRows: 4, maxRows: 8 }'
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getNotices, addNotice, editNotice, deleteNotice, pushNotice } from 'network/notice';
import { getId } from 'common/utils';

export default {
  name: "Notice",
  data(){
    return {
      columns: [// 公告字段
        { title: '编号', key: 'id' },
        { title: '标题', key: 'title' },
        { title: '内容', key: 'content' },
        { title: '操作', slot: 'action', align: 'center' }
      ],
      data: [],// 公告数据
      isModalShow: false,// 模态框是否显示
      modalTitle: '添加新公告',// 模态框标题
      modalMode: 1,// 当前模态框的状态，1: add notice, 2: edit notice
      noticeForm: {// 公告信息表单
        title: '',// 公告标题
        content: '',// 公告内容
      },
      noticeFormRules: {
        title: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '公告内容不能为空', trigger: 'blur' }
        ]
      },
      curPage: 1,// 当前页数
      totalSize: 30,
      pageSize: 5,
      curEditingId: -1,// 当前正在编辑的公告编号,
      isDataLoading: true,// 数据是否正在加载中
      isModalLoading: true
    }
  },
  methods: {
    onEditButtonClicked(index, row) {
      this.isModalShow = true;
      this.modalTitle = '编辑公告';
      this.modalMode = 2;
      this.curEditingId = row.id;
      this.noticeForm = {
        title: row.title,
        content: row.content
      };
    },
    onDeleteButtonClicked(index) {
      this.$Modal.confirm({
        title: '删除公告',
        content: '确定要删除该公告？',
        onOk: () => {
          deleteNotice(index).then(resp => {
            this.fetchNotices();
            this.$Message.success('删除成功');
          }).catch(err => {
            console.log(err);
            this.$Message.error('删除失败');
          }).finally(() => {
            this.$Modal.remove();
          });
        },
        loading: true
      });
    },
    onAddNoticeButtonClicked() {
      this.noticeForm = {
        title: '',
        content: ''
      }
      this.modalMode = 1;
      this.isModalShow = true;
      this.modalTitle = '添加新公告';
    },
    onModalConfirmClicked() {
      this.$refs.noticeForm.validate(valid => {
        if (!valid) {
          this.$Message.error('表单校验失败');
          this.isModalLoading = false;
          return;
        }
        if (this.modalMode == 1) {
          addNotice(this.noticeForm).then(resp => {
            this.fetchNotices();
            this.$Message.success('添加成功');
          }).catch(err => {
            this.$Message.error('添加失败');
          }).finally(() => {
            this.isModalShow = false;
          });
        } else {
          editNotice({ id: this.curEditingId, ...this.noticeForm }).then(resp => {
            this.fetchNotices();
            this.$Message.success('更新成功');
          }).catch(err => {
            this.$Message.error('更新失败');
          }).finally(() => {
            this.isModalShow = false;
          });
        }
      });
    },
    onPageChanged(page) {
      this.curPage = page;
      this.fetchNotices();
    },
    fetchNotices() {
      this.data = [];
      this.isDataLoading = true;
      getNotices(this.curPage - 1, this.pageSize).then(resp => {
        const page = resp.data.page;
        this.totalSize = page.totalElements;
        for (const news of resp.data._embedded.news) {
          const { title, content, _links } = news;
          const id = getId(_links);
          this.data.push({ id, title, content });
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error('获取公告列表失败');
      }).finally(() => {
        this.isDataLoading = false;
      });
    },
    onPushNoticeClicked(content) {
      pushNotice(content).then(resp => {
        console.log(resp);
        this.$Message.success('推送成功');
      }).catch(err => {
        this.$Message.error('推送失败');
      })
    }
  },
  mounted() {
    this.fetchNotices();
  }
}
</script>

<style scoped>

.notice {
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
}

.body .pager {
  margin-top: 10px;
  text-align: right;
}

.notice-table {
  position: relative;
}
</style>