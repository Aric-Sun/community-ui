<template>
  <div class="user-passage">
    <div class="heading">
      <h1>经理信息浏览</h1>
    </div>
    <div class="body">
      <Table stripe border :columns="columns" :data="data" :loading="isLoading">
        <template slot="action" slot-scope="{ row }">
          <Button
            type="error"
            icon="md-trash"
            @click="onDeleteUserPassageClicked(row.id)"
            >删除</Button
          >
        </template>
      </Table>
      <div class="pager">
        <Page
          :total="totalSize"
          :page-size="pageSize"
          show-elevator
          @on-change="onPageChanged"
        />
      </div>
    </div>
    <Modal></Modal>
  </div>
</template>

<script>
import { getManagers } from "network/manager";
import { formatDate, getId } from "common/utils";

export default {
  name: "User-Passage",
  data() {
    return {
      columns: [
        { title: "经理ID", key: "id" },
        { title: "用户名", key: "username" },
        { title: "密码", key: "password" },
      ],
      isLoading: true,
      data: [],
      curEditingId: -1,
      curPage: 1,
      pageSize: 5,
      totalSize: 1,
    };
  },
  methods: {
    onPageChanged(page) {
      this.curPage = page;
      this.fetchManagers();
    },
    fetchManagers() {
      this.data = [];
      this.isLoading = true;
      getManagers(this.curPage - 1, this.pageSize)
        .then((resp) => {
          const page = resp.data.page;
          this.totalSize = page.totalElements;
          // console.log(resp);
          for (const manager of resp.data._embedded.managers) {
            const transformed = {
              ...manager,
              id: getId(manager._links),
              username: manager.username,
              password: manager.password,
            };
            // delete transformed.passTime;
            // delete transformed.isIn;
            this.data.push(transformed);
          }
        })
        .catch((err) => {
          this.$Message.error("获取经理信息失败");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.fetchManagers();
  },
};
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
    border-bottom: 1px solid rgba(193, 193, 193, 0.5);

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