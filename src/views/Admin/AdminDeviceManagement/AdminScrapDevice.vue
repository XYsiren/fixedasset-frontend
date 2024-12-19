<template>  
	<div class="admin-device-container">  
	  <button @click="goToHome" class="back-btn">返回主菜单</button> <!-- 返回按钮 -->  
  
	  <h2 class="page-title">设备详情列表</h2>  
	  
	  <div class="device-list">  
		<div v-for="device in deviceList" :key="device.deviceID" class="device-card">  
		  <div class="device-info">  
			<p><strong>设备ID:</strong> {{ device.deviceID }}</p>  
			<p><strong>设备名称:</strong> {{ device.devicename }}</p>  
			<p><strong>设备类型:</strong> {{ device.type }}</p>  
			<p><strong>设备状态:</strong>  
			  <span :class="['device-status', getStatusClass(device.status)]">  
				{{ device.status }}  
			  </span>  
			</p>  
			<p><strong>借用用户ID:</strong> {{ device.user_id }}</p>  
			<p><strong>购买日期:</strong> {{ device.purchase_date }}</p>  
			<p><strong>保修年限:</strong> {{ device.warranty_period }} 年</p>  
			<p><strong>所在位置:</strong> {{ device.location }}</p>  
			<p><strong>创建日期:</strong> {{ device.created_at}}</p>  
			<p><strong>更新日期:</strong> {{ device.updated_at}}</p>  
			<p><strong>入库人:</strong> {{ device.putinstorageby }}</p>  
			<p><strong>出库人:</strong> {{ device.takeoutstorageby }}</p>  
			
			<!-- 条件判断：只为状态为“在库”的设备显示报废按钮 -->  
			<button v-if="device.status === '在库'" @click="markAsScrapped(device.deviceID)" class="scrap-btn">报废设备</button>  
		  </div>  
		</div>  
	  </div>  
	</div>  
  </template>  
  
  <script>  
  export default {  
	data() {  
	  return {  
		deviceList: []  // 存储所有设备信息  
	  };  
	},  
	mounted() {  
	  this.getDeviceList();  // 页面加载后获取所有设备信息  
	},  
	methods: {  
	  getDeviceList() {  
		// 发送请求获取所有设备数据  
		this.$axios.get('http://localhost:8082/fixedasset_war_exploded/query-device') // 假设这里是获取所有设备的API  
		  .then(response => {  
			this.deviceList = response.data.deviceList; // 假设返回的数据格式正确  
		  })  
		  .catch(error => {  
			console.error('获取设备列表出错:', error);  
		  });  
	  },  
	  getStatusClass(status) {  
		// 根据设备状态返回相应的CSS类  
		return status === '在库' ? 'status-online' : (status === '已报废' ? 'status-offline' : 'status-pending');  
	  },  
	  formatDate(date) {  
		// 格式化日期为可读格式  
		if (!date) return '';  
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };  
		return new Date(date).toLocaleDateString('zh-CN', options); // 格式化为中文日期  
	  },  
	  goToHome() {  
		// 跳转到主菜单页面  
		this.$router.push('/admin/dashboard');  
	  },  
	  markAsScrapped(deviceID) {  
		// 发送请求将设备标记为报废  
		this.$axios.post(`http://localhost:8082/fixedasset_war_exploded/scrap-device`, { deviceID })  
		  .then(response => {  
			// 更新设备列表，移除已报废的设备  
			this.deviceList = this.deviceList.filter(device => device.deviceID !== deviceID);  
			console.log(`设备 ${deviceID} 已标记为报废`);  
		  })  
		  .catch(error => {  
			console.error('报废设备出错:', error);  
		  });  
	  }  
	}  
  }  
  </script>  
  
  <style scoped>  
  .admin-device-container {  
	background: linear-gradient(135deg, #4e54c8, #8f94fb); /* 渐变背景色 */  
	min-height: 100vh;  
	padding: 20px;  
	display: flex;  
	flex-direction: column;  
	align-items: center;  
	font-family: 'Roboto', sans-serif;  
	color: #fff;  
  }  
  
  .back-btn {  
	background-color: #4CAF50; /* 绿色背景 */  
	color: white; /* 白色文字 */  
	border: none;  
	padding: 10px 20px;  
	font-size: 16px;  
	cursor: pointer;  
	margin-bottom: 20px;  
	border-radius: 5px;  
  }  
  
  .back-btn:hover {  
	background-color: #45a049; /* 按钮悬停时的背景色 */  
  }  
  
  /* 页面标题 */  
  .page-title {  
	font-size: 36px;  
	font-weight: bold;  
	margin-bottom: 30px;  
	text-align: center;  
	text-transform: uppercase;  
	letter-spacing: 1.5px;  
  }  
  
  /* 设备列表 */  
  .device-list {  
	display: grid;  
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));  
	gap: 20px;  
	width: 100%;  
	max-width: 1200px;  
	margin: 0 auto;  
  }  
  
  /* 设备卡片 */  
  .device-card {  
	background-color: rgba(255, 255, 255, 0.1);  
	border-radius: 10px;  
	padding: 20px;  
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);  
	transition: transform 0.3s ease, box-shadow 0.3s ease;  
  }  
  
  .device-card:hover {  
	transform: translateY(-10px);  
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);  
  }  
  
  /* 设备信息 */  
  .device-info p {  
	font-size: 18px;  
	margin: 10px 0;  
  }  
  
  .device-info strong {  
	color: #ffeb3b; /* 黄色强调 */  
  }  
  
  /* 设备状态 */  
  .device-status {  
	padding: 3px 8px;  
	border-radius: 20px;  
	font-weight: bold;  
  }  
  
  .status-online {  
	background-color: #4caf50; /* 绿色 */  
	color: #fff;  
  }  
  
  .status-offline {  
	background-color: #f44336; /* 红色 */  
	color: #fff;  
  }  
  
  .status-pending {  
	background-color: #ff9800; /* 橙色 */  
	color: #fff;  
  }  
  
  /* 报废按钮样式 */  
  .scrap-btn {  
	margin-top: 10px;  
	background-color: #f44336;  
	color: white;  
	border: none;  
	padding: 8px 16px;  
	font-size: 14px;  
	cursor: pointer;  
	border-radius: 5px;  
  }  
  
  .scrap-btn:hover {  
	background-color: #d32f2f;  
  }  
  
  /* 响应式设计 */  
  @media (max-width: 768px) {  
	.page-title {  
	  font-size: 28px;  
	}  
  
	.device-list {  
	  grid-template-columns: 1fr;  
	}  
  
	.device-info p {  
	  font-size: 16px;  
	}  
  }  
  </style>