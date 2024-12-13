<template>
	<div class="container">
	  <div class="header">
		<h1>固定资产管理系统</h1>
	  </div>
	  <div class="actions">
		<button @click="goToLoginPage" class="btn login-btn">登录</button>
		<button @click="goToRegisterPage" class="btn register-btn">注册</button>
	  </div>
	</div>
  </template>
  
  
  <script>
  export default {
	methods: {
	  goToLoginPage() {
		this.$router.push('/login');
	  },
	  goToRegisterPage() {
		this.$router.push('/register');
	  }
	}
  }
  </script>
  
  
  <style scoped>
  /* 全局背景渐变 */
  .container {
	background: linear-gradient(135deg, #1a237e, #0d47a1);
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-family: 'Roboto', sans-serif;
  }
  
  /* 标题 */
  .header h1 {
	font-size: 3rem;
	font-weight: bold;
	text-align: center;
	margin-bottom: 50px;
	text-transform: uppercase;
	letter-spacing: 3px;
  }
  
  /* 按钮容器 */
  .actions {
	display: flex;
	gap: 30px;
  }
  
  /* 按钮基础样式 */
  .btn {
	padding: 15px 40px;
	font-size: 1.1rem;
	border-radius: 30px;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	font-weight: bold;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  /* 登录按钮样式 */
  .login-btn {
	background: linear-gradient(135deg, #ffd600, #ff6f00);
	color: #fff;
  }
  
  .login-btn:hover {
	background: linear-gradient(135deg, #ff6f00, #ffd600);
	transform: translateY(-5px);
	box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
  }
  
  /* 注册按钮样式 */
  .register-btn {
	background: linear-gradient(135deg, #26c6da, #00acc1);
	color: #fff;
  }
  
  .register-btn:hover {
	background: linear-gradient(135deg, #00acc1, #26c6da);
	transform: translateY(-5px);
	box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
  }
  </style>
  
  