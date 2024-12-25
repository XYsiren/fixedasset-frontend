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
			<p><strong>剩余数量:</strong> {{ device.number }}</p>   
			<p><strong>借用用户ID:</strong> {{ device.user_id }}</p>  
			<p><strong>购买日期:</strong> {{ device.purchase_date }}</p>  
			<p><strong>保修年限:</strong> {{ device.warranty_period }} 年</p>  
			<p><strong>所在位置:</strong> {{ device.location }}</p>  
			<p><strong>创建日期:</strong> {{ device.created_at }}</p>  
			<p><strong>更新日期:</strong> {{ device.updated_at }}</p>  
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

    <label for="deviceQuantity">出库数量:</label>  
    <input type="number" v-model="deviceQuantity" id="deviceQuantity" placeholder="输入出库数量" min="1" required />  

    <label for="borrowDays">借用时间 (天):</label>  
    <input type="number" v-model="borrowDays" id="borrowDays" placeholder="输入借用天数" min="1" @input="calculateReturnDate" required />  

    <label for="returnDate">应归还日期:</label>  
    <input type="date" v-model="returnDate" id="returnDate" readonly />  

    <button @click="checkoutDevice" class="checkout-btn">确认出库</button>  
    <button @click="closeModal" class="cancel-btn">取消</button>  
  </div>  
</div>
	</div>  
  </template>
  
  <script>  
  export default {  
	data() {  
	  return {  
		deviceList: [],  
		isModalOpen: false,  
		userID: '',  
		username: '',  
		selectedDeviceID: null,  
		adminname: '',  
		deviceQuantity: 1,  
		borrowDays: 1,  // 新增借用时间（天）  
		returnDate: ''  // 新增应归还日期  
	  };  
	},  
	mounted() {  
	  this.getDeviceList();  
  
	  const storedUser = localStorage.getItem('user');  
	  if (storedUser) {  
		const user = JSON.parse(storedUser);  
		this.adminname = user.username || '';  
	  }  
	},  
	methods: {  
	  getDeviceList() {  
		this.$axios.get('http://localhost:8082/fixedasset_war_exploded/query-device')  
		  .then(response => {  
			this.deviceList = response.data.deviceList;  
		  })  
		  .catch(error => {  
			console.error('获取设备列表出错:', error);  
		  });  
	  },  
	  getStatusClass(status) {  
		return status === '在库' ? 'status-online' : (status === '已报废' ? 'status-offline' : 'status-pending');  
	  },  
	  formatDate(date) {  
		if (!date) return '';  
		const options = { year: 'numeric', month: '2-digit', day: '2-digit' };  
		return new Date(date).toLocaleDateString('zh-CN', options);  
	  },  
	  goToHome() {  
		this.$router.push('/admin/dashboard');  
	  },  
	  openCheckoutModal(deviceID) {  
		this.selectedDeviceID = deviceID;  
		this.isModalOpen = true;  
		this.borrowDays = 1; // 设置默认借用天数为1  
		this.returnDate = ''; // 清空应归还日期  
	  },  
  
	  closeModal() {  
		this.isModalOpen = false;  
		this.userID = '';  
		this.username = '';  
		this.deviceQuantity = 1;  
		this.selectedDeviceID = null;  
		this.borrowDays = 1;  // 清空借用天数  
		this.returnDate = '';   // 清空应归还日期  
	  },  
  
	  calculateReturnDate() {  
		if (this.borrowDays > 0) {  
		  const today = new Date();  
		  const returnDateObj = new Date(today);  
		  returnDateObj.setDate(today.getDate() + this.borrowDays); // 计算应归还日期  
		  this.returnDate = returnDateObj.toISOString().split('T')[0]; // 格式化为YYYY-MM-DD  
		} else {  
		  this.returnDate = '';  
		}  
	  },  
  
	  checkoutDevice() {  
		const selectedDevice = this.deviceList.find(device => device.deviceID === this.selectedDeviceID);  
  
		if (this.selectedDeviceID && this.userID && this.username && this.deviceQuantity > 0) {  
		  if (selectedDevice && this.deviceQuantity > selectedDevice.number) {  
			alert(`出库数量不能超过剩余数量 (${selectedDevice.number})！`);  
			return;  
		  }  
  
		  const payload = {  
			deviceID: this.selectedDeviceID,  
			userID: this.userID,  
			username: this.username,  
			adminname: this.adminname,  
			quantity: this.deviceQuantity,  
			borrowDays: this.borrowDays,  // 借用时间（天）  
			returnDate: this.returnDate     // 应归还日期  
		  };  
  
		  this.$axios.post('http://localhost:8082/fixedasset_war_exploded/takeout-storage', payload)  
			.then(response => {  
			  this.deviceList = this.deviceList.map(device => {  
				if (device.deviceID === this.selectedDeviceID) {  
				  return {   
					...device,  
					number: device.number - this.deviceQuantity,  
					status: device.number - this.deviceQuantity > 0 ? '在库' : '已借出',  
					user_id: this.userID   
				  };  
				}  
				return device;  
			  });  
			  console.log(`设备 ${this.selectedDeviceID} 已出库给用户 ${this.username}，数量: ${this.deviceQuantity}，借用天数: ${this.borrowDays}，应归还日期: ${this.returnDate}`);  
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
  background: linear-gradient(135deg, #4e54c8, #8f94fb); /* 渐变背景色 */  
  min-height: 100vh;  
  padding: 20px;  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  font-family: 'Roboto', sans-serif;  
  color: #fff;  
}  

/* 取消按钮样式 */  
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

/* 模态框内容 */  
.modal-content {  
  background-color: #ef8787; /* 红色背景 */  
  margin: 15% auto;  
  padding: 20px;  
  border: 1px solid #888;  
  width: 80%;  
  max-width: 400px;  
  border-radius: 10px;  
}  

/* 关闭按钮样式 */  
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
input[type="text"],  
input[type="number"],  
input[type="date"] {  
  width: calc(100% - 20px);  
  padding: 10px;  
  margin: 10px 0;  
  border: 1px solid #ccc;  
  border-radius: 5px;  
  background-color: transparent; /* 透明背景与整体配色相符 */  
  color: #fff; /* 字体颜色为白色 */  
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