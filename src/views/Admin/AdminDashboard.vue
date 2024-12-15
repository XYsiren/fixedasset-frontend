<template>
	<div class="admin-page-container">
	  <div class="title-container">
		<h1 class="main-title">管理员控制面板</h1>
		<p class="subtitle">管理用户与设备，轻松高效</p>
	  </div>
  
	  <div class="button-container">
		<button @click="navigateToPage('/admin/manage-user')" class="admin-button">管理用户</button>
		<button @click="navigateToPage('/admin/put-in-storage')" class="admin-button">设备入库</button>
		<button @click="navigateToPage('/admin/take-out-storage')" class="admin-button">设备出库</button>
		<button @click="navigateToPage('/admin/query-device')" class="admin-button">设备查询</button>
		<button @click="navigateToPage('/admin/scrap-device')" class="admin-button">设备报废</button>
		<button @click="navigateToPage('/admin/statistics-device')" class="admin-button">设备统计</button>
		<button @click="navigateToPage('/admin/unreturned-device')" class="admin-button">管理未归还设备</button>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	methods: {
	  navigateToPage(page) {
		// 跳转到选定的页面
		this.$router.push(page);
	  }
	}
  }
  </script>
  
  <style scoped>
  /* 管理员页面整体样式 */
  .admin-page-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: linear-gradient(135deg, #2f4f4f, #1c1c1c); /* 更加沉稳的背景色 */
	color: #fff;
	font-family: 'Roboto', sans-serif;
  }
  
  /* 主标题 */
  .title-container {
	text-align: center;
	margin-bottom: 50px;
  }
  
  .main-title {
	font-size: 48px;
	font-weight: bold;
	color: #00bcd4; /* 清新的青色 */
	letter-spacing: 5px;
	text-transform: uppercase;
	animation: fadeIn 2s ease-out;
  }
  
  .subtitle {
	font-size: 18px;
	color: #bbb;
	letter-spacing: 1px;
	margin-top: 10px;
  }
  
  /* 按钮容器 */
  .button-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
	width: 80%;
  }
  
  /* 按钮样式 */
  .admin-button {
	padding: 18px 30px;
	font-size: 18px;
	font-weight: bold;
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 50px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
	width: 180px;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 2px;
  }
  
  /* 鼠标悬浮 */
  .admin-button:hover {
	transform: translateY(-10px);
	background-color: #0056b3;
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  
  .admin-button:active {
	transform: translateY(-5px);
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  /* 按钮的个性化样式 */
  .admin-button:nth-child(1) {
	background: linear-gradient(45deg, #00bcd4, #0097a7);
  }
  
  .admin-button:nth-child(2) {
	background: linear-gradient(45deg, #ff5722, #d32f2f);
  }
  
  .admin-button:nth-child(3) {
	background: linear-gradient(45deg, #4caf50, #388e3c);
  }
  
  .admin-button:nth-child(4) {
	background: linear-gradient(45deg, #9c27b0, #7b1fa2);
  }
  
  .admin-button:nth-child(5) {
	background: linear-gradient(45deg, #f44336, #e53935);
  }
  
  .admin-button:nth-child(6) {
	background: linear-gradient(45deg, #3f51b5, #283593);
  }
  
  .admin-button:nth-child(7) {
	background: linear-gradient(45deg, #8e24aa, #7b1fa2);
  }
  
  /* 动画效果 */
  @keyframes fadeIn {
	0% {
	  opacity: 0;
	  transform: translateY(30px);
	}
	100% {
	  opacity: 1;
	  transform: translateY(0);
	}
  }
  </style>
  