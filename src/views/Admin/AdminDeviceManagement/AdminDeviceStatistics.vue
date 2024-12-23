<template>  
	<div class="container"> 
	  <div class="header">
		<button @click="goToHome" class="back-btn">返回主面板</button> <!-- 返回按钮 -->
	  </div> 
	  <h2 class="page-title">设备统计</h2>  
	  <div class="statistics-grid">  
		<div v-for="(devicesInfo, type) in statistics" :key="type" class="card">  
		  <h3 class="card-title">类型: {{ type }}</h3>  
		
		  <div v-for="(statusInfo, status) in devicesInfo" :key="status"   
			   :class="['status-section', getStatusClass(status)]">  
			<p class="status-count">状态为 {{ status }} 的设备数量: <strong>{{ statusInfo.count }}</strong></p>  
			<ul class="device-list">  
			  <li v-for="device in statusInfo.devices" :key="device.deviceID" class="device-item">  
				设备ID: <span class="device-id">{{ device.deviceID }}</span>, 名称: {{ device.devicename ? device.devicename : '未提供' }}  
			  </li>  
			</ul>  
		  </div>  
		</div>  
	  </div>  
	</div>  
  </template>  
  
  <script>  
  export default {  
	data() {  
	  return {  
		statistics: {} // 存储分类统计信息  
	  };  
	},  
	mounted() {  
	  this.getDeviceStatistics();  
	},  
	methods: {  
		// 返回管理员面板
		goToHome() {
		this.$router.push('/admin/dashboard');
	  },
	  getDeviceStatistics() {  
		this.$axios.get('http://localhost:8082/fixedasset_war_exploded/query-device')  
		  .then(response => {  
			this.statistics = this.processStatistics(response.data.deviceList);  
		  })  
		  .catch(error => {  
			console.error('获取设备统计信息出错:', error);  
		  });  
	  },  
	  processStatistics(data) {  
		const stats = {};  
		data.forEach(device => {  
		  const { type, status, deviceID, devicename } = device;  
  
		  if (!stats[type]) {  
			stats[type] = {};  
		  }  
  
		  if (!stats[type][status]) {  
			stats[type][status] = { count: 0, devices: [] };  
		  }  
  
		  stats[type][status].count++;  
		  stats[type][status].devices.push({ deviceID, devicename });  
		});  
  
		return stats;  
	  },  
	  getStatusClass(status) {  
		// 根据状态返回相应的 CSS 类名  
		switch (status) {  
		  case '已报废':  
			return 'status-disposed';  
		  case '离库':  
			return 'status-out';  
		  case '在库':  
			return 'status-in';  
		  default:  
			return '';  
		}  
	  }  
	}  
  };  
  </script>  
  
  <style scoped>  
  /* 基本布局 */  
  .container {  
	padding: 20px;  
	background: linear-gradient(135deg, #1e1e2f, #2a2a3b);  
	min-height: 100vh;  
	color: white;  
	font-family: 'Arial', sans-serif;  
  }  
  
  .back-btn {
	background-color: #552825;  /* 酷炫红色 */
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
  
  .page-title {  
	text-align: center;  
	font-size: 36px;  
	margin-bottom: 30px;  
	text-transform: uppercase;  
	letter-spacing: 1.5px;  
  }  
  
  /* 统计卡片布局 */  
  .statistics-grid {  
	display: grid;  
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));  
	gap: 100px;  
  }  
  
  .card {  
	background-color: rgba(255, 255, 255, 0.1);  
	border-radius: 10px;  
	padding: 20px;  
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);  
	transition: transform 0.3s, box-shadow 0.3s;  
  }  
  
  .card:hover {  
	transform: translateY(-10px);  
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);  
  }  
  
  .card-title {  
	font-size: 24px;  
	margin-bottom: 15px;  
	text-transform: uppercase;  
	color: #ffeb3b; /* 黄色强调 */  
  }  
  
  /* 状态和设备列表样式 */  
  .status-section {  
	margin-top: 15px;  
	padding: 10px;  
	border-radius: 5px;  
	transition: background 0.3s;  
  }  
  
  .status-count {  
	font-size: 18px;  
  }  
  
  /* 每个状态的不同样式 */  
  .status-disposed {  
	background-color: rgba(255, 0, 0, 0.2); /* 红色 */  
	border-left: 5px solid #f44336; /* 红色边框 */  
  }  
  
  .status-out {  
	background-color: rgba(255, 165, 0, 0.2); /* 橙色 */  
	border-left: 5px solid #ff9800; /* 橙色边框 */  
  }  
  
  .status-in {  
	background-color: rgba(76, 175, 80, 0.2); /* 绿色 */  
	border-left: 5px solid #4caf50; /* 绿色边框 */  
  }  
  
  .device-list {  
	list-style-type: none;  
	padding-left: 0;  
  }  
  
  .device-item {  
	background-color: rgba(255, 255, 255, 0.2);  
	margin: 5px 0;  
	padding: 10px;  
	border-radius: 5px;  
	transition: background 0.3s;  
  }  
  
  .device-item:hover {  
	background-color: rgba(255, 255, 255, 0.3);  
  }  
  
  .device-id {  
	font-weight: bold;  
	color: #ffeb3b; /* 黄色强调 */  
  }  
  
  /* 响应式设计 */  
  @media (max-width: 768px) {  
	.page-title {  
	  font-size: 30px;  
	}  
  
	.card-title {  
	  font-size: 20px;  
	}  
  
	.status-count {  
	  font-size: 16px;  
	}  
  }  
  </style>