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
			<p><strong>创建日期:</strong> {{ device.created_at }}</p>  
			<p><strong>更新日期:</strong> {{ device.updated_at}}</p>  
			<p><strong>入库人:</strong> {{ device.putinstorageby }}</p>  
			<p><strong>出库人:</strong> {{ device.takeoutstorageby }}</p>  
			
			<!-- 只在状态为“在库”的设备上显示出库按钮 -->  
			<button v-if="device.status === '在库'" @click="openCheckoutModal(device.deviceID)" class="checkout-btn">出库设备</button>  
		  </div>  
		</div>  
	  </div>  
  
	 <!-- 出库模态框 -->  
<div v-if="isModalOpen" class="modal">  
  <div class="modal-content">  
    <span class="close" @click="closeModal">&times;</span>  
    <h3>出库设备需求用户</h3>  
    <label for="userID">用户ID:</label>  
    <input type="text" v-model="userID" id="userID" placeholder="输入用户ID" />  
    <label for="username">用户名:</label>  
    <input type="text" v-model="username" id="username" placeholder="输入用户名" />  
    <button @click="checkoutDevice">确认出库</button>  
    <button @click="closeModal" class="cancel-btn">取消</button> <!-- 添加取消按钮 -->  
  </div>  
	</div>
	</div>
  </template>  
  
  <script>  
  export default {  
	data() {  
	  return {  
		deviceList: [],  // 存储所有设备信息  
		isModalOpen: false,  // 控制模态框的显示  
		userID: '',  // 存储用户ID  
		username: '',  // 存储用户名  
		selectedDeviceID: null,  // 存储当前选择的设备ID  
		adminname: ''  // 添加 adminname 变量  
	  };  
	},  
	mounted() {  
	  this.getDeviceList();  // 页面加载后获取所有设备信息  
  
	  // 从 localStorage 获取用户名  
	  const storedUser = localStorage.getItem('user');  
	  if (storedUser) {  
		const user = JSON.parse(storedUser);  
		this.adminname = user.username || ''; // 设置用户名  
	  }  
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
	  openCheckoutModal(deviceID) {  
		// 打开出库模态框  
		this.selectedDeviceID = deviceID;  
		this.isModalOpen = true;  
	  },  
	  closeModal() {  
		// 关闭模态框  
		this.isModalOpen = false;  
		this.userID = '';  // 清空输入  
		this.username = '';  // 清空输入  
		this.selectedDeviceID = null;  // 清空选择  
	  },  
	  checkoutDevice() {  
		// 发送请求将设备标记为出库  
		if (this.selectedDeviceID && this.userID && this.username) {  
		  const payload = {  
			deviceID: this.selectedDeviceID,  
			userID: this.userID,  
			username: this.username , 
			adminname: this.adminname
		  };  
  
		  this.$axios.post(`http://localhost:8082/fixedasset_war_exploded/takeout-storage`, payload)  
			.then(response => {  
			  // 更新设备列表，移除已出库的设备或更新状态  
			  this.deviceList = this.deviceList.map(device => {  
				if (device.deviceID === this.selectedDeviceID) {  
				  return { ...device, status: '已借出', user_id: this.userID }; // 假设更新状态和借用用户ID  
				}  
				return device;  
			  });  
			  console.log(`设备 ${this.selectedDeviceID} 已出库给用户 ${this.username}`);  
			  this.closeModal();  
			})  
			.catch(error => {  
			  console.error('出库设备出错:', error);  
			});  
		} else {  
		  alert('请填写所有信息！');  
		}  
	  }  
	}  
  }  
  </script>
  
  <style scoped>  
  .admin-device-container {  
	background: linear-gradient(135deg, #4e54c8, #8f94fb); /*
	  /* 渐变背景色 */  
	  min-height: 100vh;  
  padding: 20px;  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  font-family: 'Roboto', sans-serif;  
  color: #fff;  
}  

.cancel-btn {  
  background-color: #f44336; /* 红色背景 */  
  color: white; /* 白色文字 */  
  border: none;  
  padding: 8px 16px;  
  font-size: 14px;  
  cursor: pointer;  
  border-radius: 5px;  
  margin-left: 10px; /* 添加左边距以分隔按钮 */  
}  

.cancel-btn:hover {  
  background-color: #d32f2f; /* 悬停时的红色背景 */  
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

/* 出库按钮样式 */  
.checkout-btn {  
  background-color: #2196F3; /* 蓝色背景 */  
  color: white; /* 白色文字 */  
  border: none;  
  padding: 8px 16px;  
  font-size: 14px;  
  cursor: pointer;  
  border-radius: 5px;  
}  

.checkout-btn:hover {  
  background-color: #1976D2; /* 蓝色悬停背景 */  
}  

/* 模态框样式 */  
.modal {  
  position: fixed;  
  z-index: 999;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  overflow: auto;  
  background-color: rgba(241, 232, 232, 0.5);  
}  

.modal-content {  
  background-color: #ef8787;  
  margin: 15% auto;  
  padding: 20px;  
  border: 1px solid #888;  
  width: 80%;  
  max-width: 400px;  
  border-radius: 10px;  
}  

.close {  
  color: #aaa;  
  float: right;  
  font-size: 28px;  
  font-weight: bold;  
}  

.close:hover,  
.close:focus {  
  color: black;  
  text-decoration: none;  
  cursor: pointer;  
}  

/* 输入框样式 */  
input[type="text"] {  
  width: calc(100% - 20px);  
  padding: 10px;  
  margin: 10px 0;  
  border: 1px solid #ccc;  
  border-radius: 5px;  
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