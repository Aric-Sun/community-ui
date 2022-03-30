<template>
  <div class="user-qrcode">
    <div class="heading">
      <h1>访客记录</h1>
    </div>
    <div class="body">
      <Table
        stripe
        border
        :columns='columns'
        :data='data'
        :loading='isLoading'
      >
        <template slot="data" slot-scope="{ row }">
          <Button type='primary' icon='md-eye' @click="onViewCodeDataClicked(row)">查看</Button>
        </template>
        <template slot="action" slot-scope="{ row }">
          <Button  type='error' icon='md-trash' @click="onDeleteUserQRCodeClicked(row.id)">删除</Button>
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
      :title='modalTitle'
      v-model="isModalShow"
    >
      <Input
        type='textarea'
        autosize
        readonly
        v-model="qrData"
      />
    </Modal>
  </div>
</template>

<script>
import { getUserQRCodes, deleteUserQRCode } from 'network/user_qrcode';
import { getId } from 'common/utils';

export default {
  name: 'User-QRCode',
  data() {
    return {
      columns: [
        { title: '编号', key: 'id' },
        { title: '业主ID', key: 'userId' },
        { title: '生成时间', key: 'createTime' },
        { title: '二维码数据', slot: 'data', align: 'center' },
        { title: '操作', slot: 'action', align: 'center' }
      ],
      data: [],
      isLoading: true,
      curEditingId: -1,
      curPage: 1,
      pageSize: 5,
      totalSize: 1,
      isModalShow: false,
      modalTitle: '查看二维码数据',
      qrData: ''
    }
  },
  methods: {
    onDeleteUserQRCodeClicked(id) {
      this.$Modal.confirm({
        title: '删除访客记录',
        content: '确定要删除这条访客记录？',
        onOk: () => {
          deleteUserQRCode(id).then(resp => {
            this.$Message.success('删除成功');
            this.fetchUserQRCodes();
          }).catch(err => {
            this.$Message.error('删除失败');
          }).finally(() => {
            this.$Modal.remove();
          });
        },
        loading: true
      });
    },
    onViewCodeDataClicked(row) {
      this.qrData = row.qrData;
      this.isModalShow = true;
    },
    onPageChanged(page) {
      this.curPage = page;
      this.fetchUserQRCodes();
    },
    fetchUserQRCodes() {
      this.data = [];
      this.isLoading = true;
      getUserQRCodes(this.curPage - 1, this.pageSize).then(resp => {
        const page = resp.data.page;
        this.totalSize = page.totalElements;
        for (const userQRCode of resp.data._embedded.userQrs) {
          const transformed = {
            ...userQRCode,
            id: getId(userQRCode._links)
          };
          this.data.push(transformed);
        }
      }).catch(err => {
        this.$Message.error('获取访客记录失败');
      }).finally(() => {
        this.isLoading = false;
      });
    }
  },
  mounted() {
    this.fetchUserQRCodes();
  }
}
</script>

<style lang='scss' scoped>
.user-qrcode {
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
 <step>
    <name>Switch / case</name>
    <type>SwitchCase</type>
    <description/>
    <distribute>Y</distribute>
    <custom_distribution/>
    <copies>1</copies>
    <partitioning>
      <method>none</method>
      <schema_name/>
    </partitioning>
    <fieldname>flagfield</fieldname>
    <use_contains>N</use_contains>
    <case_value_type>None</case_value_type>
    <case_value_format/>
    <case_value_decimal/>
    <case_value_group/>
    <default_target_step>空操作 (什么也不做)</default_target_step>
    <cases>
      <case>
        <value>new</value>
        <target_step>空操作 (什么也不做) 2 2</target_step>
      </case>
      <case>
        <value>changed</value>
        <target_step>更新</target_step>
      </case>
      <case>
        <value>deleted</value>
        <target_step>空操作 (什么也不做) 2</target_step>
      </case>
    </cases>
    <attributes/>
    <cluster_schema/>
    <remotesteps>
      <input>
      </input>
      <output>
      </output>
    </remotesteps>
    <GUI>
      <xloc>576</xloc>
      <yloc>224</yloc>
      <draw>Y</draw>
    </GUI>
  </step>
  <step>
    <name>合并记录</name>
    <type>MergeRows</type>
    <description/>
    <distribute>Y</distribute>
    <custom_distribution/>
    <copies>1</copies>
    <partitioning>
      <method>none</method>
      <schema_name/>
    </partitioning>
    <keys>
      <key>XH</key>
    </keys>
    <values>
      <value>XH</value>
      <value>DSSX</value>
      <value>DS_GH</value>
      <value>XM</value>
      <value>DSSX</value>
    </values>
    <flag_field>flagfield</flag_field>
    <reference>排序记录 2</reference>
    <compare>排序记录</compare>
    <compare>
    </compare>
    <attributes/>
    <cluster_schema/>
    <remotesteps>
      <input>
      </input>
      <output>
      </output>
    </remotesteps>
    <GUI>
      <xloc>368</xloc>
      <yloc>224</yloc>
      <draw>Y</draw>
    </GUI>
  </step>
  <step>
</style>