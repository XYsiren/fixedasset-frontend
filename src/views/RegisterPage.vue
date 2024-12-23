<template>
	<button @click="goToHome" class="back-btn">返回主菜单</button>
	<div class="container">
	  <div class="register-container">
		<h1 class="title">注册</h1>
		<div class="role-select">
		  <label for="role">选择身份:</label>
		  <select v-model="role" id="role" class="role-dropdown">
			<option value="user">用户</option>
			<option value="admin">管理员</option>
		  </select>
		</div>
  
		<!-- 用户注册表单 -->
		<form v-if="role === 'user'" @submit.prevent="handleUserRegister" class="form-container">
		  <h2 class="form-title">用户注册</h2>
		  <div class="input-group">
			<input v-model="username" type="text" placeholder="用户名" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="email" type="email" placeholder="邮箱" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="phone" type="tel" placeholder="电话" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="password" type="password" placeholder="密码" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="confirmPassword" type="password" placeholder="确认密码" class="input-field" />
		  </div>
		  <button type="submit" class="submit-btn">用户注册</button>
		</form>
  
		<!-- 管理员注册表单 -->
		<form v-if="role === 'admin'" @submit.prevent="handleAdminRegister" class="form-container">
		  <h2 class="form-title">管理员注册</h2>
		  <div class="input-group">
			<input v-model="username" type="text" placeholder="用户名" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="email" type="email" placeholder="邮箱" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="phone" type="tel" placeholder="电话" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="password" type="password" placeholder="密码" class="input-field" />
		  </div>
		  <div class="input-group">
			<input v-model="confirmPassword" type="password" placeholder="确认密码" class="input-field" />
		  </div>
		  <button type="submit" class="submit-btn">管理员注册</button>
		</form>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		role: 'user', // 默认选择用户身份
		username: '',
		email: '',
		password: '',
		confirmPassword: '', // 新增确认密码字段
		phone: ''
	  };
	},
	methods: {
		// 返回登录页面
	  goToHome() {
		this.$router.push('/');
	  },
	  handleUserRegister() {
		if (this.password !== this.confirmPassword) {
		  alert('密码和确认密码不匹配');
		  return;
		}
		console.log(`用户注册: ${this.username}`);
		console.log(`邮箱: ${this.email}`);
		console.log(`电话: ${this.phone}`);
		console.log(`密码: ${this.password}`);
		// 调用API进行用户注册
		const userData = {
			role: this.role,
			username: this.username,
			email: this.email,
			phone: this.phone,
			password: this.password,
		};

		fetch('http://localhost:8082/fixedasset_war_exploded/register', {  // 后端接口的 URL
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),  // 将数据转为 JSON 字符串
		})
		.then(response => response.json())  // 解析 JSON 响应
		.then(data => {
		if (data.success) {
			alert('注册成功');
			this.$router.push('/login');
		} else {
			alert('注册失败: ' + data.message);
		}
		})
		.catch(error => {
		console.error('注册请求失败:', error);
		alert('请求失败，请稍后再试');
		});
	  },

	  handleAdminRegister() {
		if (this.password !== this.confirmPassword) {
		  alert('密码和确认密码不匹配');
		  return;
		}
		console.log(`管理员注册: ${this.username}`);
		console.log(`邮箱: ${this.email}`);
		console.log(`电话: ${this.phone}`);
		console.log(`密码: ${this.password}`);
		// 调用API进行管理员注册\
		const adminData = {
		role: this.role,
		username: this.username,
		email: this.email,
		phone: this.phone,
		password: this.password,
		};

		fetch('http://localhost:8082/fixedasset_war_exploded/register', {  // 后端接口的 URL
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(adminData),  // 将数据转为 JSON 字符串
		})
		.then(response => response.json())  // 解析 JSON 响应
		.then(data => {
		if (data.success) {
			alert('注册成功');
			this.$router.push('/login');
		} else {
			alert('注册失败: ' + data.message);
		}
		})
		.catch(error => {
		console.error('注册请求失败:', error);
		alert('请求失败，请稍后再试');
		});
	  }
	}
  };
  </script>
  
  <style scoped>
  .container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: linear-gradient(135deg, #6e7bff, #5e63d0);
  }
  .register-container {
	/* max-width: 1200px; 
	margin: 0 auto;
	padding: 20px;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
	background-color: #fff;
	padding: 30px;
	border-radius: 8px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 500px;
	text-align: center;
	box-sizing: border-box;
  }

  .back-btn {
	background-color: #365ff4;  /* 酷炫红色 */
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
  
  .title {
	font-size: 2.5rem;
	text-align: center;
	color: #333;
	margin-bottom: 20px;
  }
  
  .role-select {
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
  }
  
  .role-dropdown {
	width: 48%;
	padding: 10px;
	font-size: 1rem;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: #fff;
  }
  
  .form-container {
	margin-top: 30px;
  }
  
  .form-title {
	text-align: center;
	font-size: 1.8rem;
	margin-bottom: 20px;
	color: #333;
  }
  
  .input-group {
	margin-bottom: 15px;
  }
  
  .input-field {
	width: 100%;
	padding: 12px;
	font-size: 1rem;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: #fff;
	box-sizing: border-box;
  }
  
  .submit-btn {
	width: 100%;
	padding: 14px;
	background-color: #007bff;
	color: white;
	font-size: 1.2rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
	background-color: #0056b3;
  }
  
  @media (max-width: 600px) {
	.register-container {
	  padding: 15px;
	}
  
	.title {
	  font-size: 2rem;
	}
  
	.form-title {
	  font-size: 1.5rem;
	}
  
	.input-field {
	  padding: 10px;
	}
  
	.submit-btn {
	  font-size: 1rem;
	}
  }
  </style>
  