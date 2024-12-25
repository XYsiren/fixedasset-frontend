<template>  
	<div class="page-container">  
	  <div class="header">  
		<button @click="goToHome" class="back-btn">返回主菜单</button> <!-- 返回按钮 -->  
	  </div>  
  
	  <h2 class="page-title">归还设备</h2>  

	  <!-- 领用后未归还设备部分 -->   
	  <div class="devices-section">  
		<h3>领用后未归还设备</h3>  
		<div v-if="appliedDevices.length === 0" class="no-devices">没有未归还的领用设备。</div>  
		<div v-for="device in appliedDevices" :key="device.deviceID" class="device-card">  
		  <p><strong>设备ID:</strong> {{ device.deviceID }}</p>  
		  <p><strong>设备名称:</strong> {{ device.devicename }}</p>  
      <p><strong>应归还时间:</strong> {{ device.returnDueDate }}</p>  
		  <button @click="confirmReturn(device)" class="return-btn">归还此设备</button>  
		</div>  
	  </div>  

	  <!-- 借用后未归还设备部分 -->  
	  <div class="devices-section">  
		<h3>借用后未归还设备</h3>  
		<div v-if="borrowedDevices.length === 0" class="no-devices">没有未归还的借用设备。</div>  
		<div v-for="device in borrowedDevices" :key="device.deviceID" class="device-card">  
		  <p><strong>设备ID:</strong> {{ device.deviceID }}</p>  
		  <p><strong>设备名称:</strong> {{ device.devicename }}</p>
      <p><strong>借用数量:</strong> {{ device.borrowNumber }}</p>   
      <p><strong>借用天数:</strong> {{ device.borrowPeriod }} 天</p>  
      <p><strong>应归还时间:</strong> {{ device.returnDueDate }}</p>  
		  <button @click="confirmReturn(device)" class="return-btn">归还此设备</button>  
		</div>  
	  </div>  

	  <p v-if="message" :class="messageClass">{{ message }}</p>  
	</div>  
</template>
  
  
<script>  
export default {  
  data() {  
    return {  
      appliedDevices: [], // 存储未归还的领用设备信息  
      borrowedDevices: [], // 存储未归还的借用设备信息  
      message: '',  
      messageClass: '' // 用于动态控制消息的样式  
    };  
  },  
  mounted() {  
    const storedUser = localStorage.getItem('user');  
    if (storedUser) {  
      const user = JSON.parse(storedUser);  
      this.username = user.username || ''; // 设置用户名  
    }  
    this.fetchUserDevices(); // 获取用户未归还设备  
  },  
  methods: {  
    // 返回主菜单  
    goToHome() {  
      this.$router.push('/user/dashboard'); // 假设你的主菜单页面路径是 '/home'  
    },  
    async fetchUserDevices() {  
      try {  
        // Use query parameter format instead of URL path  
        const response = await this.$axios.get(`http://localhost:8082/fixedasset_war_exploded/get-unreturned-devices?username=${encodeURIComponent(this.username)}`);  
        if (response.data.success) {  
          this.appliedDevices = response.data.deviceApplyArray || [];  
          this.borrowedDevices = response.data.deviceBorrowArray || [];  
        } else {  
          this.message = response.data.message || '获取设备列表失败';  
          this.messageClass = 'error';  
        }  
      } catch (error) {  
        console.error('获取设备列表出错:', error);  
        this.message = '获取设备列表失败，请重试';  
        this.messageClass = 'error';  
      }  
    },
    confirmReturn(device) {  
      // 确认归还设备的逻辑  
      if (confirm(`是否确认归还设备：${device.devicename} (ID: ${device.deviceID})?`)) {  
        this.returnDevice(device);  
      }  
    },  
    returnDevice(device) {  
      const data = {  
        username: this.username,  
        deviceId: device.deviceID, // 填充设备ID  
        devicename: device.devicename,
        number: device.borrowNumber,
        returnType: this.appliedDevices.some(d => d.deviceID === device.deviceID) ? 'apply' : 'borrow'
      };  

      // 发送POST请求到后端归还设备接口  
      this.$axios.post('http://localhost:8082/fixedasset_war_exploded/return-device', data)  
        .then(response => {  
          this.message = response.data.message;  
          this.messageClass = response.data.success ? 'success' : 'error'; // 根据响应状态设置消息样式  
          if (response.data.success) {  
            // 从对应列表中移除已归还的设备  
            this.appliedDevices = this.appliedDevices.filter(d => d.deviceID !== device.deviceID);  
            this.borrowedDevices = this.borrowedDevices.filter(d => d.deviceID !== device.deviceID);  
          }  
        })  
        .catch(error => {  
          console.error('设备归还出错:', error);  
          this.message = '设备归还失败，请检查输入信息';  
          this.messageClass = 'error'; // 错误消息的样式  
        });  
    }  
  }  
};  
</script>
  
<style scoped>  
/* 高端大气的页面背景和布局 */  
.page-container {  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  justify-content: flex-start;  
  min-height: 100vh;  
  background: linear-gradient(135deg, #1a1a2e, #162447);  
  color: #e9e9e9;  
  font-family: 'Poppins', sans-serif;  
  padding: 20px;  
}  

/* 悬浮的返回按钮样式 */  
.header {  
  position: absolute;  
  top: 20px;  
  right: 20px;  
}  
.back-btn {  
  background: #ff6f61; /* 酷炫红色 */  
  color: white;  
  padding: 12px 30px;  
  border: none;  
  border-radius: 30px;  
  font-size: 18px;  
  cursor: pointer;  
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);  
  transition: all 0.3s ease;  
}  
.back-btn:hover {  
  background: #e63946; /* 深红色 */  
  transform: scale(1.1);  
}  

/* 页面标题样式 */  
.page-title {  
  font-size: 36px;  
  font-weight: 700;  
  margin-bottom: 30px;  
  text-align: center;  
  text-transform: uppercase;  
  letter-spacing: 2px;  
}  

/* 设备部分样式 */  
.devices-section {  
  width: 100%;  
  margin-bottom: 40px;  
  background: rgba(255, 255, 255, 0.1);  
  border-radius: 15px;  
  padding: 20px;  
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.2);  
}  
.devices-section h3 {  
  font-size: 24px;  
  font-weight: 600;  
  margin-bottom: 15px;  
}  

/* 设备卡片 */  
.device-card {  
  background: rgba(255, 255, 255, 0.2);  
  border-radius: 10px;  
  padding: 15px;  
  margin: 15px 0;  
  transition: transform 0.3s ease;  
}  
.device-card:hover {  
  transform: translateY(-5px);  
}  
.return-btn {  
  background: #00adb5;  /* 酷炫色调 */  
  color: white;  
  padding: 10px 20px;  
  border: none;  
  border-radius: 25px;  
  cursor: pointer;  
  transition: background 0.3s ease;  
}  
.return-btn:hover {  
  background: #007a7f; /* 更暗的颜色 */  
}  

/* 消息样式 */  
.success, .error {  
  font-size: 18px;  
  font-weight: 500;  
  padding: 10px 20px;  
  margin-top: 20px;  
  border-radius: 8px;  
  text-align: center;  
  width: 100%;  
  max-width: 400px;  
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);  
}  

.success {  
  background-color: rgba(76, 175, 80, 0.1);  
  color: #1b5e20;  
}  

.error {  
  background-color: rgba(244, 67, 54, 0.1);  
  color: #c62828;  
}  

/* 响应式设计 */  
@media (max-width: 768px) {  
  .page-title {  
    font-size: 28px;  
  }  
  
  .devices-section {  
    padding: 15px;  
  }  

  .device-card {  
    padding: 10px;  
  }  
  
  .back-btn, .return-btn {  
    width: 100%;  
    padding: 10px 0;  
  }  
}  
</style>  