<template>  
	<div class="top">
		<div class="container">  
	  <button @click="goToHome" class="back-btn">返回主菜单</button> <!-- 返回按钮 -->  
	  <h2 class="title">未归还设备管理</h2>  
	  
	  <div class="device-section">  
		<h3 class="section-title">领用设备未归还</h3>  
		<ul class="device-list">  
		  <li v-for="device in unreturnedApplyDevices" :key="device.deviceID" class="device-item">  
			<div class="device-info">  
			  <span>设备ID: {{ device.deviceID }}</span>  
			  <span>设备名称: {{ device.devicename }}</span>  
			  <span>用户ID: {{ device.userID }}</span>  
			  <span>用户名称: {{ device.username }}</span>  
			  <span>借用时间: {{ device.applyPeriod }} 天</span>  
			  <span>应归还时间: {{ device.returnDueDate }}</span> 
			</div>  
		  </li>  
		</ul>  
	  </div>  
  
	  <div class="device-section">  
		<h3 class="section-title">借用设备未归还</h3>  
		<ul class="device-list">  
		  <li v-for="device in unreturnedBorrowDevices" :key="device.deviceID" class="device-item">  
			<div class="device-info">  
			  <span>设备ID: {{ device.deviceID }}</span>  
			  <span>设备名称: {{ device.devicename }}</span>  
			  <span>用户ID: {{ device.userID }}</span>  
			  <span>用户名称: {{ device.username }}</span>  
			  <span>借用时间: {{ device.borrowPeriod }} 天</span>  
			  <span>应归还时间: {{ device.returnDueDate }} 天</span> 
			</div>  
		  </li>  
		</ul>  
	  </div>  
	</div>  
	</div>
</template>  
  
  <script>  
  export default {  
	data() {  
	  return {  
		unreturnedApplyDevices: [], // 存储领用设备未归还信息  
		unreturnedBorrowDevices: [] // 存储借用设备未归还信息  
	  };  
	},  
	mounted() {  
	  this.getUnreturnedDevices();  
	},  
	methods: {  
	  goToHome() {  
		// 跳转到主菜单页面  
		this.$router.push('/admin/dashboard');  
	  } ,
	  getUnreturnedDevices() {  
		this.$axios.get('http://localhost:8082/fixedasset_war_exploded/unreturned-device')  
		  .then(response => {  
			this.unreturnedApplyDevices = response.data.applyDevices || [];  
			this.unreturnedBorrowDevices = response.data.borrowDevices || [];  
		  })  
		  .catch(error => {  
			console.error('获取未归还设备列表出错:', error);  
		  });  
	  }  
	}  
  };  
  </script>  
  
  <style scoped>  
  .top {
	padding: 20px;  
	background: linear-gradient(135deg, #c1c1f1, #9f9fe4);  
	min-height: 100vh;  
	color: white;  
	font-family: 'Arial', sans-serif;  
  }
  .container {  
	max-width: 800px;  
	margin: 0 auto;  
	padding: 20px;  
	background: linear-gradient(135deg,#e2ebf3, #aac3dc);  
	border-radius: 10px;  
	box-shadow: 0 4px 20px rgba(194, 51, 51, 0.1);  
  }  
  
  .title {  
	color: #333;  
	text-align: center;  
	font-size: 2.5em;  
	margin-bottom: 20px;  
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);  
  }  
  
  .section-title {  
	color: #555;  
	margin-top: 20px;  
	font-size: 1.8em;  
	border-bottom: 2px solid #007bff;  
	padding-bottom: 5px;  
  }  
  
  .device-list {  
	list-style-type: none;  
	padding-left: 0;  
  }  
  
  .device-item {  
	background-color: #faf6f6;  
	margin: 10px 0;  
	padding: 15px;  
	border-radius: 8px;  
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  
	transition: transform 0.2s;  
  }  
  
  .device-item:hover {  
	transform: translateY(-5px);  
  }  
  
  .device-info {  
	display: flex;  
	flex-direction: column;  
	gap: 5px;  
  }  
  
  .device-info span {  
	color: #333;  
	font-size: 1em;  
  }  
  </style>