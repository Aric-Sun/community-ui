<template>
  <div class="employee">
    <h2 class="title">个人信息</h2>
    <div class="wrapper">
      <!-- 表单的具体内容 -->
      <div class="content">
        <div class="form-group">
          <label for="userid">ID</label>
          <input
            type="text"
            class="userid un-allowed"
            name="userid"
            id="userid"
            disabled
            :value="userid"
          />
        </div>
        <div class="form-group">
          <label for="department">岗位部门</label>
          <input
            type="text"
            class="department un-allowed"
            name="department"
            id="department"
            disabled
            :value="department"
          />
        </div>
        <div class="form-group">
          <label for="username">名字</label>
          <input
            type="text"
            class="username"
            name="username"
            id="username"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            class="password"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <!-- 提交修改信息 -->
        <Button
          type="success"
          class="submit"
          :loading="isloading"
          @click="updata"
          >保存</Button
        >
      </div>
    </div>
  </div>
</template>
<template>
  	<section>
    	<header class="top_tips">
    		<span class="num_tip" v-if="fatherComponent == 'home'">{{level}}</span>
    		<span class="num_tip" v-if="fatherComponent == 'item'">题目{{itemNum}}</span>
    	</header>
    	<div v-if="fatherComponent == 'home'" >
    		<div class="home_logo item_container_style"></div>
    		<router-link to="item" class="start button_style" ></router-link>
    	</div>
    	<div v-if="fatherComponent == 'item'" >
    		<div class="item_back item_container_style">
    			<div class="item_list_container" v-if="itemDetail.length > 0">
    				<header class="item_title">{{itemDetail[itemNum-1].topic_name}}</header>
    				<ul>
    					<li  v-for="(item, index) in itemDetail[itemNum-1].topic_answer" @click="choosed(index, item.topic_answer_id)" class="item_list">
    						<span class="option_style" v-bind:class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
    						<span class="option_detail">{{item.answer_name}}</span>
    					</li>
    				</ul>
    			</div>
    		</div>
    		<span class="next_item button_style" @click="nextItem" v-if="itemNum < itemDetail.length"></span>
    		<span class="submit_item button_style" v-else @click="submitAnswer"></span>
    	</div>
  	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	name: 'itemcontainer',
	data() {
		return {
			itemId: null, //题目ID
			choosedNum: null, //选中答案索引
			choosedId:null //选中答案id
		}
	},
  	props:['fatherComponent'],
  	computed: mapState([
	  	'itemNum', //第几题
  		'level', //第几周
  		'itemDetail', //题目详情
  		'timer', //计时器
	]),
  	methods: {
  		...mapActions([
  			'addNum', 'initializeData',
  		]),
  		//点击下一题
  		nextItem(){
  			if (this.choosedNum !== null) {
	  			this.choosedNum = null;
	  			//保存答案, 题目索引加一，跳到下一题
	  			this.addNum(this.choosedId)
  			}else{
  				alert('您还没有选择答案哦')
  			}
  		},
  		//索引0-3对应答案A-B
	  	chooseType: type => {
	  		switch(type){
	  			case 0: return 'A';
	  			case 1: return 'B';
	  			case 2: return 'C';
	  			case 3: return 'D';
	  		}
	  	},
	  	//选中的答案信息
	  	choosed(type,id){
	  		this.choosedNum = type;
	  		this.choosedId = id;
	  	},
	  	//到达最后一题，交卷，请空定时器，跳转分数页面
	  	submitAnswer(){
	  		if (this.choosedNum !== null) {
	  			this.addNum(this.choosedId)
	  			clearInterval(this.timer)
	  			this.$router.push('score')
  			}else{
  				alert('您还没有选择答案哦')
  			}
	  	},
	},
	created(){
		//初始化信息
		if(this.fatherComponent == 'home') {
			this.initializeData();
			document.body.style.backgroundImage = 'url(./static/img/1-1.jpg)';
		}
	}
}
</script>
<script>
import {
  getEmployeeInformation,
  updataEmployeeInformation,
  getDepartmentName,
} from "network/employee";

export default {
  name: "Employee",
  data() {
    return {
      userid: "1",
      department: "部门",
      username: "admin",
      password: "admin",
      isloading: false,
    };
  },
  mounted() {
    this.getEmployeeInformation();
  },
  activated() {},
  methods: {
    // 网络请求

    /**
     * 获取员工信息
     */
    getEmployeeInformation() {
      getEmployeeInformation().then((res) => {
        const dataT = res.data.departmentId;
        console.log(dataT)
        getDepartmentName(dataT).then((resT) => {
          this.department = resT.data.name;
        });
        // 显示员工信息
        res.id = 1;
        this.userid = res.id;
        this.username = res.username;
        this.password = res.password;
      });
    },

    /**
     * 更新员工信息
     */
    updataEmployeeInformation(data) {
      // 显示加载
      console.log(data);
      this.isloading = true;
      updataEmployeeInformation(data).then((res) => {
        this.showSuccess();

        setTimeout(() => {
          this.isloading = false;
          console.log(res);
        }, 200);
      });
    },

    /**
     * 显示成功信息
     */
    showSuccess() {
      this.$Message["success"]({
        background: true,
        content: "保存信息成功！",
      });
    },

    /**
     * 显示失败信息
     */
    showError() {
      this.$Message["error"]({
        background: true,
        content: "保存信息失败！",
      });
    },

    // 点击事件

    /**
     * 获取更新信息并发送请求
     */
    updata() {
      const data = {
        username: this.username,
        password: this.password,
        userid: this.userid,
        department: "1",
      };

      this.updataEmployeeInformation(data);
    },
  },
};
</script>
<template>
  <div class="app" :style="size">
    <div class="rect" :class="drop?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :propMatrix="matrix" :cur="cur" :reset="reset" />
          <Logo :cur="!!cur" :reset="reset" />
          <div class="state">
            <Point :cur="!!cur" :max="max" :point="points" />
            <p>{{pContent}}</p>
            <Number :number='cur ? clearLines : startLines' />
            <p>{{level}}</p>
            <Number :number='cur?speedRun:speedStart' :length="1" />
            <p>{{nextText}}</p>
            <Next :data="next" />
            <div class="bottom">
              <Music :data="music" />
              <Pause :data="pause" />
              <Number :propTime="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' />
    <Guide/>
  </div>
</template>


<style scoped>
.employee {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 208px;
  right: 0;
  padding: 2em;
  background-color: #f5f6fa;
}

.wrapper {
  overflow: hidden;
  height: 470px;
  padding: 2em;
  padding-top: 0;
  padding-bottom: 0;
  background: #fff;
}

.title {
  margin-bottom: 30px;
  font-size: 1.5em;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(193, 193, 193, 0.5);
}

.content > label {
  font-weight: bold;
}

/* 表单样式 */
.form-group {
  width: 100%;
  margin-bottom: 15px;
  margin-top: 2em;
}

.form-group label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}

/* 输入框的总样式 */
.form-group input {
  box-sizing: border-box;
  width: 100%;
  padding: 5px 12px;
  border: none;
  outline: none;
  border: 1px solid #ebebeb;
  transition: 0.2s linear;
}

.form-group input:focus {
  border-color: #33cabb;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(51, 202, 187, 0.6);
}

/* 个别输入框单独调整 */
.form-group .un-allowed {
  cursor: not-allowed;
}

.submit {
  border: none;
  background-color: #33cabb;
  border-color: #33cabb;
  color: #fff;
  width: 100px;
  padding: 8px 12px;
  margin-top: 1em;
  letter-spacing: 1px;
  border-radius: 2px;
  outline: none;
  -webkit-transition: 0.15s linear;
  transition: 0.15s linear;
  line-height: 1;
}

.submit:hover {
  background-color: #52d3c7;
  border-color: #52d3c7;
}
</style>