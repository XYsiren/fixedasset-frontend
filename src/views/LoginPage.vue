<template>
	<div class="login-container">
	  <UserDashboard v-if="isLoggedIn" :username="username" />
	  <div v-else class="login-card">
		<h1>登录</h1>
		<form @submit.prevent="handleLogin">
		  <div class="form-group">
			<label for="role">选择身份:</label>
			<select v-model="role" id="role" required>
			  <option value="user">用户</option>
			  <option value="admin">管理员</option>
			</select>
		  </div>
		  <div class="form-group">
			<input v-model="usernameInput" type="text" placeholder="用户名" required />
		  </div>
		  <div class="form-group">
			<input v-model="password" type="password" placeholder="密码" required />
		  </div>
		  <div class="form-group">
			<button type="submit">登录</button>
		  </div>
		</form>
	  </div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  import UserDashboard from './User/UserDashboard.vue';
  
  export default {
	components: { UserDashboard },
	data() {
	  return {
		role: 'user',  // 默认选择用户身份
		usernameInput: '',  // Input field for username
		password: '',
		username: '',  // Store the logged-in username
		isLoggedIn: false  // Track login status
	  };
	},
	methods: {
	  async handleLogin() {
		console.log(`登录角色: ${this.role}`);
		console.log(`用户名: ${this.usernameInput}`);
		console.log(`密码: ${this.password}`);
  
		try {
		  // 发起登录请求
		  const response = await axios.post('http://localhost:8082/fixedasset_war_exploded/login', {
			role: this.role,
			username: this.usernameInput,
			password: this.password
		  }, {
			headers: {
			  'Content-Type': 'application/json'  // 确保后端正确处理 JSON 请求
			}
		  });
  
		  const data = response.data;  // 直接从 response 中获取数据
  
		  if (data.success) {
			// Store the username and update login status
			this.username = data.username;
			this.isLoggedIn = true;
  
			// 根据角色跳转到不同的页面
			if (this.role === 'admin') {
			  this.$router.push('/admin/dashboard');
			} else {
			  this.$router.push('/user/dashboard');
			}
		  } else {
			alert(data.message || '登录失败');
		  }
		} catch (error) {
		  // 判断是否是网络错误
		  const errorMessage = error.response ? error.response.data.message : error.message;
		  alert(errorMessage || '登录失败，请稍后再试');
		  console.error('错误详情:', error.response || error.message || error);
		}
	  }
	}
  };
  </script>
  
  <style scoped>
  .login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: linear-gradient(135deg, #6e7bff, #5e63d0);
  }
  
  .login-card {
	background-color: #fff;
	padding: 30px;
	border-radius: 8px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
	text-align: center;
	box-sizing: border-box;
  }
  
  h1 {
	font-size: 28px;
	margin-bottom: 20px;
	color: #333;
  }
  
  .form-group {
	margin-bottom: 20px;
  }
  
  label {
	display: block;
	font-size: 16px;
	margin-bottom: 8px;
	color: #555;
  }
  
  select,
  input {
	width: 100%;
	padding: 12px;
	margin: 8px 0;
	border: 1px solid #ddd;
	border-radius: 4px;
	box-sizing: border-box;
	font-size: 16px;
	transition: border-color 0.3s ease;
  }
  
  button {
	padding: 12px 20px;
	background-color: #6e7bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	width: 100%;
	font-size: 16px;
	transition: background-color 0.3s ease;
  }
  
  button:hover {
	background-color: #5e63d0;
  }
  
  input[type="password"]:focus,
  input[type="text"]:focus,
  select:focus {
	border-color: #6e7bff;
	outline: none;
  }
  
  input[required]:invalid {
	border-color: red;
  }
  
  @media (max-width: 480px) {
	.login-card {
	  width: 90%;
	}
  }
  </style>
  