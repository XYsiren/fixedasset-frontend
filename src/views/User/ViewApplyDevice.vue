<template>  
	<div class="page-container">  
	  <button @click="goToHome" class="back-btn">返回</button>  
  
	  <h2 class="page-title">设备列表</h2>  
  
	  <div class="device-list">  
		<div v-for="device in borrowedDevices" :key="device.deviceID" class="device-card">  
		  <div class="device-info">  
			<p :class="device.returnStatus ? 'status-available' : 'status-pending'">  
			  <strong>{{ device.returnStatus || '管理员审核中' }}</strong>  
			</p>  
			<p><strong>设备ID:</strong> {{ device.deviceID }}</p>  
			<p><strong>设备名称:</strong> {{ device.devicename }}</p>  
			<p><strong>领用数量:</strong> {{ device.applyNumber }}</p>  
			<p><strong>领用时间（天数）:</strong> {{ device.applyPeriod }}</p>  
			<p><strong>应归还时间:</strong> {{ device.returnDueDate }}</p>  
		  </div>  
		</div>  
	  </div>  
	</div>  
  </template>  
  
  <script>  
  export default {  
	data() {  
	  return {  
		borrowedDevices: [], // Array to hold the user's borrowed devices  
		username: '' // Ensure username is declared  
	  };  
	},  
	mounted() {  
	  const storedUser = localStorage.getItem('user');  
	  if (storedUser) {  
		const user = JSON.parse(storedUser);  
		this.username = user.username || '';  
	  }  
	  console.log('Username after retrieval:', this.username); // 确认username值  
	  this.viewBorrowedDevices(); // 调用在设置username之后  
	},  
	methods: {  
	  goToHome() {  
		this.$router.push('/user/apply-device');  
	  },  
  
	  viewBorrowedDevices() {  
		console.log('Sending request with username:', this.username);  
		this.$axios.get(`http://localhost:8082/fixedasset_war_exploded/view-borrowed-devices?username=${this.username}`)  
		  .then(response => {  
			this.borrowedDevices = response.data.borrowedDevices || []; // 确保有默认值  
			console.log(this.borrowedDevices);  
			console.log('获取到的借用设备数据类型:', typeof this.borrowedDevices);  
		  })  
		  .catch(error => {  
			console.error('获取借用设备列表出错:', error);  
			this.borrowedDevices = [];  
		  });  
	  },  
	}  
  };  
  </script>  
  
  <style scoped>  
  /* 页面整体样式 */  
  .page-container {  
	background: linear-gradient(135deg, #1e1e2f, #2a2a3b); /* 渐变背景 */  
	min-height: 100vh;  
	padding: 20px;  
	display: flex;  
	flex-direction: column;  
	align-items: center;  
	font-family: 'Arial', sans-serif;  
	color: #fff;  
  }  

  .status-available {  
	color: green; /* Return status is available */  
  }  
  
  .status-pending {  
	color: rgb(34, 29, 18); /* Pending status color */  
  }  
  
  .back-btn {  
	background-color: #ff4757; /* 红色 */  
	color: white;  
	border: none;  
	padding: 10px 20px;  
	font-size: 16px;  
	cursor: pointer;  
	margin-bottom: 20px;  
	border-radius: 5px;  
	transition: 0.3s;  
  }  
  
  .back-btn:hover {  
	background-color: #ff6b81; /* 悬停颜色 */  
  }  
  
  .page-title {  
	font-size: 36px;  
	font-weight: bold;  
	margin-bottom: 30px;  
	text-align: center;  
	text-transform: uppercase;  
	letter-spacing: 1.5px;  
  }  
  
  .device-list {  
	display: grid;  
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));  
	gap: 20px;  
	width: 100%;  
	max-width: 1200px;  
	margin: 0 auto;  
  }  
  
  .device-card {  
	background-color: rgba(255, 255, 255, 0.1);  
	border-radius: 10px;  
	padding: 20px;  
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);  
	transform: 0.3s ease, box-shadow 0.3s ease;  
}  

.device-card:hover {  
  transform: translateY(-10px);   
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);  
}  

.device-info p {  
  font-size: 18px;  
  margin: 10px 0;  
}  

.device-info strong {  
  color: #18170c; /* 黄色强调 */  
}  

/* 按钮样式 */  
.apply-btn {  
  background-color: #28a745; /* 绿色 */  
  color: #fff;  
  padding: 10px 20px;  
  border: none;  
  border-radius: 5px;  
  cursor: pointer;  
  transition: 0.3s, transform 0.3s;  
}  

.apply-btn:hover {  
  background-color: #218838; /* 悬停效果 */  
  transform: scale(1.05);  
}  

/* 表现设备状态的样式 */  
.device-status {  
  padding: 5px 10px;  
  border-radius: 5px;  
  font-weight: bold;  
}  

.status-online {  
  background-color: #28a745; /* 在线状态的绿色 */  
  color: white;  
}  

.status-offline {  
  background-color: #355cdc; /* 离线状态的红色 */  
  color: rgb(222, 49, 49);  
}  

.status-scrapped {  
  background-color: #dc3545; /* 离线状态的红色 */  
  color: white;  
}  

.status-pending {  
  background-color: #ffc107; /* 待处理状态的黄色 */  
  color: black;  
}  

/* 响应式设计 */  
@media (max-width: 768px) {  
  .device-list {  
    grid-template-columns: 1fr; /* 单列显示 */  
  }  

  .page-title {  
    font-size: 28px; /* 小屏幕缩小字体 */  
  }  

  .device-info p {  
    font-size: 16px; /* 调整设备信息字体 */  
  }  

  .apply-btn, .back-btn {  
    width: 100%; /* 按钮宽度适应屏幕 */  
  }  
}  
</style>