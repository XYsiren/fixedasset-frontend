<template>
	<div class="user-management-container">
	  <div class="header">
		<button @click="goToHome" class="back-btn">返回主菜单</button> <!-- 返回按钮 -->
	  </div>
  
	  <h2 class="page-title">用户管理{{ username }}</h2>
  
	  <!-- 添加用户按钮 -->
	  <div class="add-user-container">
		<button @click="showAddUserForm = true" class="add-user-btn">添加用户</button>
	  </div>
  
	  <!-- 添加用户表单 -->
	  <div v-if="showAddUserForm" class="add-user-form">
		<h3>添加用户</h3>
		<form @submit.prevent="addUser">
		  <div>
			<label for="username">用户名:</label>
			<input type="text" v-model="newUser.username" id="username" required />
		  </div>
		  <div>
			<label for="password">密码:</label>
			<input type="password" v-model="newUser.password" id="password" required />
		  </div>
		  <div>
			<label for="email">邮箱:</label>
			<input type="email" v-model="newUser.email" id="email" required />
		  </div>
		  <div>
			<label for="phone">电话:</label>
			<input type="text" v-model="newUser.phone" id="phone" required />
		  </div>
		  <button type="submit">提交</button>
		  <button type="button" @click="showAddUserForm = false">取消</button>
		</form>
	  </div>
  
	  <div class="user-list">
		<div v-for="user in userList" :key="user.userID" class="user-card">
		  <div class="user-card-header">
			<div class="user-id"><strong>用户id:</strong> {{ user.userID }}</div>
			<div class="user-role"><strong>角色:</strong> {{ role }}</div>
		  </div>
		  <div class="user-card-body">
			<div class="user-name"><strong>用户名: </strong>{{ user.username }}</div>
			<div class="user-email"><strong>邮箱:</strong> {{ user.email }}</div>
			<div class="user-phone"><strong>电话:</strong> {{ user.phone }}</div>
			<div v-if="user.isdeleted === '1'" class="user-deleted">  
  				<strong >状态:</strong>   
  				<strong class="isdeleted">已被删除</strong>
 				 <br />  
  				<strong>删除者:</strong> {{ user.deletedby }}  
		</div>
			<button v-if="user.isdeleted !== '1'" @click="confirmDelete(user.userID)" class="delete-btn">删除</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 删除确认弹窗 -->
	  <div v-if="showDeleteConfirm" class="delete-confirm">
		<p>确定要删除此用户吗？</p>
		<button @click="deleteUser">确认</button>
		<button @click="showDeleteConfirm = false">取消</button>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		userList: [],  // 用户列表
		role: "普通用户",
		showAddUserForm: false,  // 控制添加用户表单的显示与隐藏
		newUser: {  // 新用户数据
		  username: "",
		  password: "", // 确保包含密码字段  
		  email: "",
		  phone: ""
		},
		showDeleteConfirm: false,  // 控制删除确认弹窗的显示与隐藏
		userToDelete: null  // 要删除的用户ID
	  }
	},
	mounted() {
	  // 页面加载时获取用户列表
	  this.getUsers();
  
	  // 从 localStorage 获取用户名
	  const storedUser = localStorage.getItem('user');
	  if (storedUser) {
		const user = JSON.parse(storedUser);
		this.username = user.username || ''; // 设置用户名
	  }
	},
	methods: {
	  // 返回主菜单
	  goToHome() {
		this.$router.push('/admin/dashboard');
	  },
	  // 获取用户列表
	  getUsers() {
		this.$axios.get('http://localhost:8082/fixedasset_war_exploded/manage-user')
		  .then(response => {
			this.userList = response.data.users;
		  })
		  .catch(error => {
			console.error('获取用户列表出错:', error);
		  });
	  },
	  // 显示删除确认弹窗
	  confirmDelete(userID) {
		this.userToDelete = userID;
		this.showDeleteConfirm = true;
	  },
	  // 删除用户
	  deleteUser() {
		const data = {
		  action: 'delete',
		  userToDelete: this.userToDelete,
		  username: this.username  // 将 adminname 放到请求数据中
		};
		this.$axios.post(`http://localhost:8082/fixedasset_war_exploded/delete-user`, data)
		  .then(response => {
			// 删除成功后从列表中移除用户
			this.userList = this.userList.filter(user => user.userID !== this.userToDelete);
			this.showDeleteConfirm = false;
			this.userToDelete = null;
		  })
		  .catch(error => {
			console.error('删除用户出错:', error);
		  });
	  },
	  // 添加新用户
	  addUser() {
		const newUserData = {
		  username: this.newUser.username,
		  password: this.newUser.password,
		  email: this.newUser.email,
		  phone: this.newUser.phone
		};
		
		this.$axios.post('http://localhost:8082/fixedasset_war_exploded/add-user', newUserData)  
		.then(response => {  
		console.log('添加用户返回的数据:', response.data); // 检查返回的数据  
		if (response.data.user && response.data.user.userID) {  
			this.userList.push(response.data.user);  
		} else {  
			console.error('返回的用户数据格式错误:', response.data.user);  
		}  
		this.showAddUserForm = false;  
		this.newUser = { username: '', password: '', email: '', phone: '' }; // 确保重置所有字段  
		})  
		.catch(error => {  
		console.error('添加用户出错:', error);  
		});  
	  }
	}
  }
  </script>
  
  <style scoped>
  /* 页面整体布局 */
  .user-management-container {
	font-family: 'Roboto', sans-serif;
	background: linear-gradient(145deg, #6e7dff, #5664d2);
	color: #fff;
	padding: 20px;
	min-height: 100vh;
  }
  
  .add-user-container {
	margin-bottom: 20px;
  }
  
  .add-user-btn {
	padding: 10px 20px;
	background-color: #3d3de7;
	color: white;
	border: none;
	cursor: pointer;
  }
  
  .add-user-form {
	border: 1px solid #ccc;
	padding: 20px;
	margin-bottom: 20px;
  }
  
  .add-user-form input {
	margin-bottom: 10px;
	padding: 8px;
	width: 30%;
  }
  
  .delete-btn {
	background-color: rgb(241, 145, 145);
	color: white;
	border: none;
	cursor: pointer;
	padding: 5px 10px;
  }
  
  .delete-confirm {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgb(185, 124, 124);
	border: 1px solid #ccc;
	padding: 20px;
	text-align: center;
  }
  
  .delete-confirm button {
	margin: 5px;
  }
  
  .header {
	position: absolute;
	top: 20px;
	right: 20px;
  }
  
  .back-btn {
	background-color: #36bbf4;  
	color: white;
	padding: 12px 30px;
	border: none;
	font-size: 18px;
	cursor: pointer;
	border-radius: 30px;
	transition: all 0.3s ease;
  }
  
  .back-btn:hover {
	background-color: #e53935;
	transform: scale(1.1); /* 放大效果 */
  }
  
  /* 页面标题 */
  .page-title {
	text-align: center;
	font-size: 2.5em;
	font-weight: bold;
	margin-bottom: 20px;
	color: #fff;
  }
  
  /* 用户列表 */
  .user-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 20px;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
  }
  
  /* 每个用户的卡片 */
  .user-card {
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .user-card:hover {
	transform: translateY(-10px);
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  }
  
  /* 卡片头部 */
  .user-card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	font-size: 1.1em;
  }
  
  .user-id, .user-role {
	font-weight: bold;
	color: #ebebe5;
  }
  
  /* 卡片主体 */
  .user-card-body {
	font-size: 1em;
  }
  .user-card-body strong {
  color: #ffeb3b; /* 黄色强调 */
}
  
  .user-name, .user-email, .user-phone,.user-isdeleted {
	margin-bottom: 10px;
  }
  
  /* 提升视觉效果 */
  .user-name, .user-email, .user-phone {
	color: #eeedf3;
  }
  .user-card-body, .isdeleted{
	color: #f94008;
  }
  /* 小屏幕响应式设计 */
  @media (max-width: 768px) {
	.user-list {
	  grid-template-columns: 1fr;
	}
  
	.user-card {
	  max-width: 100%;
	}
  }
  </style>
  