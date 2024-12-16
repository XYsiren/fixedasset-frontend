<template>
	<div class="container">
	  <div class="header">
		<button @click="goToHome" class="back-btn">返回主菜单</button>
	  </div>
  
	  <div class="form-card">
		<h2 class="title">领用设备</h2>
  
		<div class="input-group">
		  <input type="text" v-model="deviceId" placeholder="请输入设备ID" class="input" />
		  <input type="text" v-model="deviceName" placeholder="或者输入设备名称" class="input" />
		</div>
  
		<div class="button-group">
		  <button @click="applyDevice" class="apply-btn">领用</button>
		</div>
  
		<p v-if="message" :class="['message', messageClass]">{{ message }}</p>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		username: '', // 用于存储用户名
		deviceId: '',
		deviceName: '',
		message: '',
		messageClass: ''  // 用于动态控制消息的样式
	  };
	},
	mounted() {
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
		this.$router.push('/user/dashboard');
	  },
  
	  // 领用设备的逻辑
	  applyDevice() {
		if (!this.deviceId && !this.deviceName) {
		  this.message = '请输入设备ID或设备名称';
		  this.messageClass = 'error'; // 错误消息的样式
		  return;
		}
  
		const data = {
		  username: this.username,
		  deviceId: this.deviceId || null,
		  deviceName: this.deviceName || null
		};
  
		this.$axios.post('http://localhost:8082/fixedasset_war_exploded/apply-device', data)
		  .then(response => {
			if (response.data.success) {
			  this.message = '设备领用成功！';
			  this.messageClass = 'success'; // 成功消息的样式
			  this.deviceId = '';  // 清空输入框
			  this.deviceName = ''; // 清空输入框
			} else {
			  this.message = response.data.message || '设备领用失败，请检查输入信息';
			  this.messageClass = 'error'; // 错误消息的样式
			}
		  })
		  .catch(error => {
			console.error('设备领用出错:', error);
			this.message = '设备领用失败，请检查输入信息'; // 处理失败消息
			this.messageClass = 'error'; // 错误消息的样式
		  });
	  }
	}
  };
  </script>
  
  <style scoped>
  /* 整体页面布局 */
  .container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: linear-gradient(135deg, #4e54c8, #8f94fb);
	color: #fff;
	font-family: 'Roboto', sans-serif;
  }
  
  .header {
	position: absolute;
	top: 20px;
	right: 20px;
  }
  
  .back-btn {
	background-color: #366cf4;  /* 酷炫红色 */
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
  
  /* 表单卡片样式 */
  .form-card {
	background-color: #ffffff;
	border-radius: 20px;
	padding: 40px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	width: 400px;
	text-align: center;
  }
  
  .title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 30px;
	color: #333;
	text-transform: uppercase;
  }
  
  /* 输入框的样式 */
  .input-group {
	display: flex;
	flex-direction: column;
	gap: 15px;
  }
  
  .input {
	padding: 12px;
	font-size: 16px;
	border: 2px solid #ccc;
	border-radius: 8px;
	margin: 10px 0;
	outline: none;
	transition: all 0.3s ease;
  }
  
  .input:focus {
	border-color: #2196F3;
	box-shadow: 0 0 10px rgba(33, 150, 243, 0.5);
  }
  
  /* 按钮组样式 */
  .button-group {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
  }
  
  .apply-btn {
	background-color: #2196F3;
	color: white;
	padding: 12px 30px;
	font-size: 16px;
	border: none;
	border-radius: 30px;
	cursor: pointer;
	transition: all 0.3s ease;
	width: 100%;
  }
  
  .apply-btn:hover {
	background-color: #1976D2;
	transform: scale(1.05);
  }
  
  /* 提示信息样式 */
  .message {
	font-size: 18px;
	font-weight: 500;
	padding: 10px 20px;
	margin-top: 20px;
	border-radius: 8px;
	text-align: center;
	width: 100%;
	max-width: 400px;
	box-sizing: border-box;
	transition: all 0.3s ease;
  }
  
  .message.success {
	background-color: rgba(76, 175, 80, 0.1);  /* 淡绿色背景 */
	color: #141d14;  /* 绿色文字 */
	border: 1px solid #111311;  /* 绿色边框 */
  }
  
  .message.error {
	background-color: rgba(244, 67, 54, 0.1);  /* 淡红色背景 */
	color: #f44336;  /* 红色文字 */
	border: 1px solid #f44336;  /* 红色边框 */
  }
  
  /* 响应式设计：当屏幕较小（如手机）时调整布局 */
  @media (max-width: 600px) {
	.success, .error {
	  font-size: 16px;
	  padding: 8px 16px;
	}
	.form-card {
	  width: 90%;
	  padding: 20px;
	}
  
	.back-btn {
	  padding: 10px 20px;
	  font-size: 14px;
	}
  
	.title {
	  font-size: 20px;
	}
  
	.apply-btn {
	  font-size: 14px;
	  padding: 10px 20px;
	}
  }
  </style>
  