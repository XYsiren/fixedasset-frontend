<template>
	<div class="page-container">
	  <div class="header">
		<button @click="goToHome" class="back-btn">返回主菜单</button> <!-- 返回按钮 -->
	  </div>
  
	  <h2 class="page-title">归还设备</h2>
	  <div class="form-container">
		<div class="input-group">
		  <input type="text" v-model="deviceId" placeholder="请输入设备ID" class="input-field" />
		  <input type="text" v-model="deviceName" placeholder="或者输入设备名称" class="input-field" />
		</div>
  
		<!-- 新增的选择框 -->
		<div class="input-group">
		  <select v-model="returnType" class="input-field">
			<option value="apply">apply 领用后归还</option>
			<option value="borrow">borrow 借用后归还</option>
		  </select>
		</div>
  
		<button @click="returnDevice" class="submit-btn">归还</button>
		<p v-if="message" :class="messageClass">{{ message }}</p>
	  </div>
	</div>
  </template>
  
  
  <script>
export default {
  data() {
    return {
      deviceId: '',
      deviceName: '',
      returnType: 'borrow', // 默认选中 "apply"
      message: '',
      messageClass: '' // 用于动态控制消息的样式
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
      this.$router.push('/user/dashboard'); // 假设你的主菜单页面路径是 '/home'
    },
    returnDevice() {
      if (!this.deviceId && !this.deviceName) {
        this.message = '请输入设备ID或设备名称';
        this.messageClass = 'error'; // 错误消息的样式
        return;
      }

      const data = {
        username: this.username,
        deviceId: this.deviceId || null,
        deviceName: this.deviceName || null,
        returnType: this.returnType // 传递归还类型
      };

      // 发送POST请求到后端归还设备接口
      this.$axios.post('http://localhost:8082/fixedasset_war_exploded/return-device', data)
        .then(response => {
          this.message = response.data.message;
          this.messageClass = response.data.success ? 'success' : 'error'; // 根据响应状态设置消息样式
          if (response.data.success) {
            this.deviceId = ''; // 清空输入框
            this.deviceName = ''; // 清空输入框
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
  /* 页面背景和布局 */
  .page-container {
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
	background-color: #36b5f4;  /* 酷炫红色 */
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
  
  /* 页面标题 */
  .page-title {
	font-size: 36px;
	font-weight: bold;
	margin-bottom: 30px;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 1.5px;
  }
  
  /* 表单容器 */
  .form-container {
	background-color: rgba(255, 255, 255, 1);
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
  }
  
  /* 输入框组 */
  .input-group {
	width: 100%;
	margin-bottom: 15px;
  }
  
  /* 输入框 */
  .input-field {
	width: 100%;
	padding: 15px;
	margin: 10px 0;
	border: 2px solid transparent;
	border-radius: 10px;
	font-size: 16px;
	box-sizing: border-box;
	transition: all 0.3s ease;
	background: rgb(207, 205, 205);
	color: #100505;
  }
  
  .input-field:focus {
	border-color: #4CAF50; /* 绿色边框 */
	background: rgba(255, 255, 255, 0.3);
	outline: none;
	box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
  }
  
  /* 提交按钮 */
  .submit-btn {
	background-color: #4CAF50;  /* 绿色背景 */
	color: white;  /* 白色文字 */
	border: none;
	padding: 15px 30px;
	font-size: 18px;
	cursor: pointer;
	border-radius: 10px;
	margin-top: 10px;
	transition: all 0.3s ease;
  }
  
  .submit-btn:hover {
	background-color: #45a049;  /* 按钮悬停时的背景色 */
	box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
	transform: translateY(-2px);
  }
  
    /* 消息样式 */
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
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.success {
  background-color: rgba(76, 175, 80, 0.1);  /* 淡绿色背景 */
  color: #141d14;  /* 绿色文字 */
  border: 1px solid #111311;  /* 绿色边框 */
}

.error {
  background-color: rgba(244, 67, 54, 0.1);  /* 淡红色背景 */
  color: #f44336;  /* 红色文字 */
  border: 1px solid #f44336;  /* 红色边框 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .success, .error {
    font-size: 16px;
    padding: 8px 16px;
  }
}
  /* 响应式设计 */
  @media (max-width: 768px) {
	.page-title {
	  font-size: 28px;
	}
  
	.form-container {
	  width: 90%;
	}
  
	.input-field {
	  font-size: 14px;
	}
  
	.submit-btn {
	  font-size: 16px;
	}
  }
  </style>
  