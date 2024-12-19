<template>  
	<div class="page">
		<div class="device-entry-container">  
	  <div class="header">  
		<button @click="goToHome" class="back-btn">返回主菜单</button> <!-- 返回按钮 -->  
	  </div>  
	  <h2 class="page-title">设备入库</h2>  
	  <div class="input-group">  
		<label>设备名称:</label>  
		<input type="text" v-model="deviceName" placeholder="请输入设备名称" required />  
	  </div>  
	  <div class="input-group">  
		<label>设备类型:</label>  
		<select v-model="deviceType" required>  
		  <option disabled value="">请选择设备类型</option>  
		  <option value="办公家具">办公家具</option>  
		  <option value="电子设备">电子设备</option>  
		</select>  
	  </div>  
	  <div class="input-group">  
		<label>购买日期:</label>  
		<input type="date" v-model="purchaseDate" required />  
	  </div>  
	  <div class="input-group">  
		<label>保修年限:</label>  
		<input type="number" v-model="warrantyYears" placeholder="请输入保修年限（年）" required />  
	  </div>  
	  <div class="input-group">  
		<label>所在位置:</label>  
		<input type="text" v-model="location" placeholder="请输入设备所在位置" required />  
	  </div>  
	  <div class="input-group">  
		<label>创建日期:</label>  
		<input type="date" v-model="createdAt" required />  
	  </div>  
	  <div class="input-group">  
		<label>更新日期:</label>  
		<input type="date" v-model="updatedAt" required />  
	  </div>  
	  <button @click="putInStorage" class="submit-button">入库</button>  
	  <p v-if="message" class="message">{{ message }}</p>  
	</div>  
	</div>
  </template>  
	
  <script>  
  export default {  
	data() {  
	  return {  
		deviceName: '',  
		deviceType: '',  
		purchaseDate: '',  
		warrantyYears: '',   
		location: '',  
		createdAt: '',  
		updatedAt: '',  
		message: '',  
		username: '' // 确保有用户名的变量  
	  }  
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
		this.$router.push('/admin/dashboard');  
	  },  
	  putInStorage() {  
		const data = {  
		  deviceName: this.deviceName,  
		  deviceType: this.deviceType,  
		  purchaseDate: this.purchaseDate,  
		  warrantyYears: this.warrantyYears, // 发送保修年限  
		  location: this.location,  
		  createdAt: this.createdAt,  
		  updatedAt: this.updatedAt,  
		  adminname: this.username  
		}  
	
		// 发送POST请求到后端设备入库接口  
		this.$axios.post('http://localhost:8082/fixedasset_war_exploded/putin-storage', data)  
		  .then(response => {  
			this.message = response.data.message;  
			this.resetForm(); // 重置表单  
		  })  
		  .catch(error => {  
			console.error('设备入库出错:', error);  
			this.message = '设备入库失败，请检查输入信息';  
		  })  
	  },  
	  resetForm() {  
		this.deviceName = '';  
		this.deviceType = '';  
		this.purchaseDate = '';  
		this.warrantyYears = ''; // 重置保修年限  
		this.location = '';  
		this.createdAt = '';  
		this.updatedAt = '';  
	  }  
	}  
  }  
  </script>  
	
  <style scoped>  
  .page{
	font-family: 'Roboto', sans-serif;
	background: linear-gradient(145deg, #6e7dff, #5664d2);
	color: #fff;
	padding: 20px;
	min-height: 100vh;
  }
  .device-entry-container {  
	font-family: 'Arial', sans-serif;  
	background: linear-gradient(135deg, #78dff3, #4261af); /* 渐变背景 */  
	border-radius: 20px;  
	padding: 40px;  
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);  
	max-width: 600px;  
	margin: 50px auto;  
	transition: transform 0.3s; /* 动画效果 */  
  }  
  
  .device-entry-container:hover {  
	transform: scale(1.02); /* 鼠标悬停放大效果 */  
  }  
  
  .back-btn {  
	background-color: #147eac;  
	color: white;  
	padding: 12px 30px;  
	border: none;  
	font-size: 18px;  
	cursor: pointer;  
	border-radius: 30px;  
	transition: background-color 0.3s, transform 0.3s; /* 添加变换效果 */  
  }  
  
  .back-btn:hover {  
	background-color: #e53935;  
	transform: scale(1.1); /* 放大效果 */  
  }  
  
  .page-title {  
	text-align: center;  
	font-size: 2.5em;  
	color: white;  
	margin-bottom: 20px;  
  }  
  
  .input-group {  
	margin-bottom: 15px;  
  }  
  
  .input-group label {  
	display: block;  
	margin-bottom: 5px;  
	font-weight: bold;  
	color: white; /* 标签颜色 */  
  }  
  
  .input-group input,  
  .input-group select {  
	width: 100%;  
	padding: 10px;  
	border: none;  
	border-radius: 5px;  
	transition: background-color 0.3s, border 0.3s;  
	background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */  
  }  
  
  .input-group input:focus,  
  .input-group select:focus {  
	border: 2px solid #007bff;  
	background-color: white; /* 聚焦时背景变为白色 */  
  }  
  
  .submit-button {  
	width: 100%;  
	padding: 12px;  
	background-color: #28a745;  
	color: white;  
	border: none;  
	border-radius: 5px;  
	font-size: 18px;
	  cursor: pointer;  
  transition: background-color 0.3s, transform 0.3s; /* 添加背景和放大效果 */  
}  

.submit-button:hover {  
  background-color: #218838;  
  transform: scale(1.05); /* 鼠标悬停放大效果 */  
}  

.message {  
  margin-top: 20px;  
  text-align: center;  
  color: #f44336; /* 错误消息颜色 */  
  font-size: 1.2em; /* 字体增大 */  
}  

@media (max-width: 600px) {  
  .device-entry-container {  
    padding: 20px; /* 小屏幕时内边距减少 */  
  }  

  .page-title {  
    font-size: 2em; /* 小屏幕时标题字体增小 */  
  }  

  .back-btn,  
  .submit-button {  
    padding: 10px; /* 按钮在小屏幕上变小 */  
    font-size: 16px; /* 字体大小减小 */  
  }  

  .input-group input,  
  .input-group select {  
    padding: 8px; /* 输入框在小屏幕上变小 */  
  }  
}  
</style>