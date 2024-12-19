<template>  
	<div class="page-container">  
	  <button @click="goToHome" class="back-btn">返回主菜单</button>  
  
	  <h2 class="page-title">设备列表</h2>  
  
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
		  </div>  
		  <!-- 只在设备状态为“在库”时显示“领用设备”按钮 -->  
		  <button v-if="device.status === '在库'" @click="openApplyModal(device)" class="apply-btn">领用设备</button>
		  <button v-if="device.status === '待审核'" @click="openApplyModal(device)" class="apply-btn">领用设备</button>    
		</div>  
	  </div>  
  
	  <!-- 领用模态框 -->  
	  <div v-if="isModalOpen" class="modal">  
      <div class="modal-content">  
        <span class="close" @click="closeModal">&times;</span>  
        <h3>领用设备</h3>  
        <div class="input-group">  
          <label for="deviceId">设备ID:</label>  
          <input type="text" v-model="deviceId" id="deviceId" placeholder="请输入设备ID" class="input" />  
          <label for="deviceName">设备名称:</label>  
          <input type="text" v-model="deviceName" id="deviceName" placeholder="请输入设备名称" class="input" />  
        </div>  
        <p v-if="message" :class="['message', messageClass]">{{ message }}</p>  
        <div class="modal-footer">  
          <button @click="applyDevice" class="apply-btn">领用</button>  
          <button @click="closeModal" class="cancel-btn">取消</button> <!-- 取消按钮 -->  
        </div>  
      </div>  
	  </div>  
	</div>  
  </template>  
  
  <script>  
  export default {  
	data() {  
	  return {  
		deviceList: [],  
		deviceId: '',  
		deviceName: '',  
		message: '',  
		messageClass: '',  
		isModalOpen: false,  
		selectedDevice: null,  
		username: ''  
	  };  
	},  
	mounted() {  
	  this.getDeviceList();  
	  const storedUser = localStorage.getItem('user');  
	  if (storedUser) {  
		const user = JSON.parse(storedUser);  
		this.username = user.username || '';  
	  }  
	},  
	methods: {  
	  getDeviceList() {  
		this.$axios.get('http://localhost:8082/fixedasset_war_exploded/view-device')  
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
	  goToHome() {  
		this.$router.push('/user/dashboard');  
	  },  
	  openApplyModal(device) {  
		this.isModalOpen = true;  
		this.selectedDevice = device;  
		this.deviceId = device.deviceID; // 填充设备ID  
		this.deviceName = device.devicename; // 填充设备名称  
	  },  
	  closeModal() {  
		this.isModalOpen = false;  
		this.deviceId = '';  
		this.deviceName = '';  
		this.message = '';  
	  },  
	  applyDevice() {  
    if (!this.deviceId && !this.deviceName) {  
        this.message = '请输入设备ID或设备名称';  
        this.messageClass = 'error';  
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
                this.message = '待管理员审核中！';  
                this.messageClass = 'success';  
                this.deviceId = '';  
                this.deviceName = '';  
                this.closeModal();  

                // 更新设备列表状态  
                this.updateDeviceStatus(this.deviceId || this.deviceName); // 更新设备状态  
            } else {  
                this.message = response.data.message || '设备领用失败，请检查输入信息';  
                this.messageClass = 'error';  
            }  
        })  
        .catch(error => {  
            console.error('设备领用出错:', error);  
            this.message = '设备领用失败，请检查输入信息';  
            this.messageClass = 'error';  
        });  
		},  

		updateDeviceStatus(deviceIdentifier) {  
			// 根据设备ID或设备名称查找设备并更新状态  
			const device = this.deviceList.find(d => d.deviceID === deviceIdentifier || d.devicename === deviceIdentifier);  
			if (device) {  
				device.status = '待审核'; // 更新设备状态为“待审核”  
			}  
		}
  }  
};  
</script>  

<style scoped>  
.page-container {  
  padding: 20px;  
}  

.back-btn {  
  margin-bottom: 20px;  
}  

.page-title {  
  font-size: 24px;  
  margin-bottom: 20px;  
}  

.device-list {  
  display: flex;  
  flex-wrap: wrap;  
}  

.device-card {  
  border: 1px solid #ccc;  
  margin: 10px;  
  padding: 10px;  
  flex: 1 0 200px; /* Flex item with a minimum width */  
}  

.device-info {  
  margin-bottom: 10px;  
}  

.device-status {  
  padding: 5px;  
  border-radius: 3px;  
}  

.status-online {  
  background-color: #d4edda;  
  color: #155724;  
}  

.status-offline {  
  background-color: #f8d7da;  
  color: #721c24;  
}  

.status-pending {  
  background-color: #fff3cd;  
  color: #856404;  
}  

.apply-btn {  
  background-color: #007bff;  
  color: white;  
  border: none;  
  padding: 5px 10px;  
  cursor: pointer;  
}  

.apply-btn:hover {  
  background-color: #0056b3;  
}  

.modal {  
  position: fixed;  
  top: 0;  
  left: 0;  
  right: 0;  
  bottom: 0;  
  background-color: rgba(0, 0, 0, 0.5);  
  display: flex;  
  align-items: center;  
  justify-content: center;  
  z-index: 1000;  
}  

.modal-content {  
  background-color: white;  
  border-radius: 5px;  
  padding: 20px;  
  width: 400px;  
}  

.close {  
  float: right;  
  cursor: pointer;  
}  

.input-group {  
  margin-bottom: 15px;  
}  

.input {  
  width: calc(100% - 10px);  
  padding: 5px;  
  margin-top: 5px;  
}  

.message {  
  margin-top: 10px;  
}  

.message.success {  
  color: green;  
}  

.message.error {  
  color: red;  
}  

.modal-footer {  
  display: flex;  
  justify-content: space-between;  
}  
</style>
  
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
  
  /* 返回按钮 */  
  .back-btn {  
	background-color: #ff4757; /* 红色 */  
	color: white;  
	border: none;  
	padding: 10px 20px;  
	font-size: 16px;  
	cursor: pointer;  
	margin-bottom: 20px;  
	border-radius: 5px;  
	transition:  0.3s;  
  }  
  
  .back-btn:hover {  
	background-color: #ff6b81; /* 悬停颜色 */  
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
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));  
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
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);  
	transition: transform 0.3s ease, box-shadow 0.3s ease;  
  }  
  
  .device-card:hover {  
	transform: translateY(-10px);  
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);  
  }  
  
  /* 设备信息 */  
  .device-info p {  
	font-size: 18px;  
	margin: 10px 0;  
  }  
  
  .device-info strong {  
	color: #ffeb3b; /* 黄色强调 */  
  }  
  
  /* 按钮样式 */  
  .apply-btn {  
	background-color: #28a745; /* 绿色 */  
	color: #fff;  
	padding: 10px 20px;  
	border: none;  
	border-radius: 5px;  
	cursor: pointer;  
	transition:  0.3s, transform 0.3s;  
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

.status-在库 {  
  background-color: #28a745; /* 在线状态的绿色 */  
  color: white;  
}  

.status-离库 {  
  background-color: #355cdc; /* 离线状态的红色 */  
  color: rgb(222, 49, 49);  
}  

.status-已报废 {  
  background-color: #dc3545; /* 离线状态的红色 */  
  color: white;  
}  

.status-待审核 {  
  background-color: #ffc107; /* 待处理状态的黄色 */  
  color: black;  
}  

/* 模态框整个的样式 */  
.modal-title {  
  font-size: 24px;  
  color: #fff;  
  margin: 0;  
}  

.input-group {  
  display: flex;  
  flex-direction: column;  
  margin: 20px 0;  
}  

.input {  
  padding: 10px;  
  border-radius: 5px;  
  border: 1px solid #ccc;  
  margin-bottom: 10px;  
  font-size: 16px;  
  transition: border-color 0.3s;  
}  

.input:focus {  
  border-color: #ffeb3b; /* 聚焦边框颜色 */  
  outline: none;  
}  

.message {  
  margin-top: 10px;  
  font-size: 16px;  
}  

.success {  
  color: #28a745; /* 成功消息的绿色 */  
}  

.error {  
  color: #dc3545; /* 错误消息的红色 */  
}  

/* 取消按钮样式 */  
.cancel-btn {  
  background: transparent;  
  border: 1px solid #201b1b;  
  color: #df3a3a;  
  padding: 10px 20px;  
  border-radius: 5px;  
  cursor: pointer;  
  transition:  0.3s, color 0.3s;  
}  

.cancel-btn:hover {  
  background-color: rgba(255, 255, 255, 0.2); /* 悬停效果 */  
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

  .apply-btn, .back-btn, .cancel-btn {  
    width: 100%; /* 按钮宽度适应屏幕 */  
  }  
}
</style>