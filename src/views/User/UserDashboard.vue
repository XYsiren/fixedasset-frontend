<template>
	<div class="page-container">
	  <div class="title-container">
		<h1 class="main-title">欢迎来到用户控制面板</h1>
		<p class="subtitle">探索您的设备，轻松管理</p>
	  </div>
  
	  <div class="button-container">
		<button @click="navigateToPage('/user/view-device')" class="panel-button view-device">查看设备</button>
		<button @click="navigateToPage('/user/apply-device')" class="panel-button apply-device">领用设备</button>
		<button @click="navigateToPage('/user/borrow-device')" class="panel-button borrow-device">借用设备</button>
		<button @click="navigateToPage('/user/return-device')" class="panel-button return-device">归还设备</button>
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
  /* 页面整体样式 */
  .page-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: linear-gradient(135deg, #1c1c1c, #343434);
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
	color: #ff6347; /* 鲜艳的橙红色 */
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
	justify-content: space-around;
	width: 80%;
	gap: 30px;
	flex-wrap: wrap;
  }
  
  /* 按钮样式 */
  .panel-button {
	padding: 20px 40px;
	font-size: 18px;
	font-weight: bold;
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 50px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
	width: 200px;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 2px;
  }
  
  .panel-button:hover {
	transform: translateY(-10px); /* 鼠标悬浮上浮 */
	background-color: #0056b3;  /* 鼠标悬停时改变颜色 */
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  
  .panel-button:active {
	transform: translateY(-5px);
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  /* 按钮的个性化样式 */
  .view-device {
	background: linear-gradient(45deg, #ff6347, #ff4500);
  }
  
  .apply-device {
	background: linear-gradient(45deg, #32cd32, #228b22);
  }
  
  .borrow-device {
	background: linear-gradient(45deg, #1e90ff, #4682b4);
  }
  
  .return-device {
	background: linear-gradient(45deg, #9932cc, #8a2be2);
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
  