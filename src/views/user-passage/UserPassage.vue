<template>
  <div class="user-passage">
    <div class="heading">
      <h1>业主进出记录</h1>
    </div>
    <div class="body">
      <Table
        stripe
        border
        :columns='columns'
        :data='data'
        :loading='isLoading'
      >
        <template slot="action" slot-scope="{ row }">
          <Button type='error' icon='md-trash' @click="onDeleteUserPassageClicked(row.id)">删除</Button>
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
    <Modal></Modal>
  </div>
</template>

<script>
import { getUserPassages, deleteUserPassage } from 'network/user_passage';
import { formatDate, getId } from 'common/utils';

export default {
  name: 'User-Passage',
  data() {
    return {
      columns: [
        { title: '编号', key: 'id' },
        { title: '进出时间', key: 'pass_time' },
        { title: '进出类型', key: 'type' },
        { title: '用户ID', key: 'uid' },
        { title: '体温', key: 'temperature' },
        { title: '操作', slot: 'action', align: 'center' }
      ],
      isLoading: true,
      data: [],
      curEditingId: -1,
      curPage: 1,
      pageSize: 5,
      totalSize: 1,
    }
  },
  methods: {
    onDeleteUserPassageClicked(id) {
      this.$Modal.confirm({
        title: '删除业主进出记录',
        content: '确定要删除这条业主出入记录？',
        onOk: () => {
          deleteUserPassage(id).then(resp => {
            this.$Message.success('删除成功');
            this.fetchUserPassages();
          }).catch(err => {
            this.$Message.error('删除失败');
          }).finally(() => {
            this.$Modal.remove();
          });
        },
        loading: true
      });
    },
    onPageChanged(page) {
      this.curPage = page;
      this.fetchUserPassages();
    },
    fetchUserPassages() {
      this.data = [];
      this.isLoading = true;
      getUserPassages(this.curPage - 1, this.pageSize).then(resp => {
        const page = resp.data.page;
        this.totalSize = page.totalElements;
        for (const userPassage of resp.data._embedded.logUserPassages) {
          const transformed = {
            ...userPassage,
            id: getId(userPassage._links),
            pass_time: userPassage.passTime,
            type: userPassage.isIn ? '进' : '出',
          };
          delete transformed.passTime;
          delete transformed.isIn;
          this.data.push(transformed);
        }
      }).catch(err => {
        this.$Message.error('获取业主出入记录失败');
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  mounted() {
    this.fetchUserPassages();
  }
}
</script>

<style lang='scss' scoped>
.user-passage {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 208px;
  right: 0;
  padding: 2em;
  background-color: #f5f6fa;

  .heading {
    margin-bottom: 30px;
    font-size: 1.5em;
    font-weight: bold;
    border-bottom: 1px solid rgba(193, 193, 193, .5);

    h1 {
      font-size: 24px;
      margin: 0;
      margin-bottom: 16px;
    }
  }

  .body {
    padding: 20px;
    background: #fff;

    .pager {
      margin-top: 10px;
      text-align: right;
    }
  }
}
</style>