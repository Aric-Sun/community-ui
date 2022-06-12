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


<template>
  <view class="login-container">
    <view v-for="item in userList" class="login-items" :key="item.id" @click="doLogin(item)">
      {{ item.id }}
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        userList: [
          { id: '90001', sign: 'eJwtjMsOgjAUBf*lWwzevlBI3LhwgTUYRd2wMbaY67NANRrjv1uB5ZnJmQ-J1Tp8mpokhIVABu1GbW4OS2xxDAC0F40*761FTRIqAMQ4ohQ6Y14Wa*O5lJL5R0cdXv8sYkLGXAjZV-Dou8Uwn6LLdtmbb5Z8UTVqtj2NgtJIa*-mEqy4UumjSuciOkzI9wfDQTBN' },
          { id: '90002', sign: 'eJwtjFELgjAURv-LnkOuyzuc0ENRVBYo2bJXYctuka0lJUT-PVMfv3P4zoftt5n3Mo5FjHvARt0mbaqaTtRhCQB8EE99LawlzSI-AAhC4fvQG9NYcqbliMjbR09ruv2Z4AHKMYZiqFDZdg8VmDLFHSaZupz1Ona0tLPGquO7zDfzhUzMPU6L1fShJuz7A6ESMKI_' },
          { id: '10001', sign: 'eJwtzF0LgjAYBeD-suuQd5tbInRjGF2kGa3upU17G8owkyL6782Py-MczvkSdTgHg*lITFgAZDVl1KbtscKJKQDQpXhqWzqHmsQ0BAgjSSnMjXk77Ix3IQTzi1l7bEaTXvlaRnx5wXr8rS6FKur0w4fH8XXS21zyJL1fG9btVCttn6Aubb6-ZdmG-P6UADBd' },
          { id: '10002', sign: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYGBgZGUInilOzEgoLMFCUrQxMDAxMLM0NDA4hMakVBZlEqUNzU1NQIqAMiWpKZCxIzA4oam5sbWEJNyUwHmlvh7e*X52VhWelqnpJtmh9WGZZi6OxvmBRmll0eox9u4Znk4pNvnm*WkesYaqtUCwC*HDA6' },
          { id: '10003', sign: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYGBgbGUInilOzEgoLMFCUrQxMDAxMLM0NDA4hMakVBZlEqUNzU1NQIqAMiWpKZCxIzA4oam5sbGUFNyUwHWZceo5-sGuzt7p-pGaNfWpUT6F0Q5OrqX2js5Z6aWRkUkuqSl1Xk6ePs6BaVbqtUCwDxBzDx' },
          { id: '10004', sign: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwoYGBgYmUInilOzEgoLMFCUrQxOgqIWZoaEBRCa1oiCzKBUobmpqagTUAREtycwFiZkBRY3NzY2NoaZkpgPNdXb1TvMMSk0xSw33ci5N83YJCnKr8vfyMshIdUqO0S-PdUvL94r0NCitski3VaoFAL*XMJM_' },
        ]
      }
    },
    mounted () {
      uni.setNavigationBarTitle({
          title: '请选择登陆账号'
      })
    },
    methods: {
      doLogin (item) {
        uni.showLoading()
        this.$txim.login(item.id, item.sign, async res => {
					console.log(res)
          if (res.code == 0) {
              // let tcRet = await this.$txcalling.login(this.$txim.sdkAppId, item.id, item.sign)
							// console.log(tcRet)
              this.$imUtils.setCurrentUser(item.id)
              uni.navigateTo({
                  url: './list'
              })
          }
          uni.hideLoading()
        })
      },
      // 设置标记日期
      setMarksDate (list) {
        list.forEach(mark => {
          if (this.datePoint.findIndex(item => item.date === mark)) {
            const index = this.datePoint.findIndex(item => item.date === mark)
            if (index > -1) {
              this.datePoint[index].mark = true
            }
          }
        })
        console.log('...........this.datePoint', this.datePoint)
      },
      // 获取年月日
      getYearMonthDay (date) {
        // 兼容 ios 设备（ios 不支持短横线格式的日期）
        const _date = JSON.parse(JSON.stringify(date)).replace(/-/g, '/')
        if (_date && _date !== '') {
          const year = dateFormat(new Date(Date.parse(_date)), 'yyyy')
          const month = dateFormat(new Date(Date.parse(_date)), 'MM')
          const day = dateFormat(new Date(Date.parse(_date)), 'dd')
          return {
            year,
            month,
            day
          }
        }
      },
      // 根据日期滑动到对应位置
      sliderTo (date) {
        // 如果滑倒其他年份，重新计算日期位置
        const year = this.getYearMonthDay(date).year
        this.currentYear = year
        this.computedDaysByYear(year)
        const index = this.getIndexByDateOfYear(date)
        this.value = index
      },
      // 通过位置找出日期
      getDateByIndexOfYear (index) {
        if (this.datePoint.length > 0) {
          let data = null
          if (index === this.datePoint.length) {
            data = this.datePoint[this.datePoint.length - 1]
          } else {
            data = this.datePoint[index]
          }
          if (data && data.date) {
            return data.date
          }
        }
      },
      // 找出某个日期在一年中的位置
      getIndexByDateOfYear (date) {
        return this.datePoint.findIndex(item => item.date === date)
      },
      // 设置日期元素（一年中所有日期的位置及特殊日期标注）
      setCalendarAndPosition (year, markDate) {
        const list = createCalendarAndPosition(year, markDate)
        this.datePoint = list
      },

    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    .login-items {
      @extend .flex;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid $br-color;
    }
  }
</style>


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