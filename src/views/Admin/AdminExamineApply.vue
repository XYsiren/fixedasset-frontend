<template>  
	<div class="page-container">  
	  <button @click="goToHome" class="back-btn">返回主菜单</button>  
  
	  <h2 class="page-title">待审核申请列表</h2>  
	  <div class="application-list">  
		<div v-if="loading">加载中...</div>  
		<div v-else>  
		  <div v-if="applications.length === 0">没有待审核的申请。</div>  
		  <div class="application-cards-container">  
			<div v-for="application in applications" :key="application.userID" class="application-card">  
			  <div class="application-info">  
				<p><strong>User ID:</strong> {{ application.userID }}</p>  
				<p><strong>申请用户名:</strong> {{ application.username }}</p>  
				<p><strong>Device ID:</strong> {{ application.deviceID }}</p>  
				<p><strong>申请设备名:</strong> {{ application.devicename }}</p>  
				<p><strong>申请天数:</strong> {{ application.applyPeriod }}</p>  
				<button @click="approveApplication(application)">同意</button>  
			  </div>  
			</div>  
		  </div>  
		</div>  
	  </div>  
	</div>  
</template>  

<script>  
export default {  
	data() {  
	  return {  
		applications: [],  
		loading: true,  
	  };  
	},  
	mounted() {  
	  this.fetchApplications();  
	},  
	methods: {  
	  fetchApplications() {  
		this.$axios.get('http://localhost:8082/fixedasset_war_exploded/examine-apply')   
		  .then(response => {  
			this.applications = response.data.deviceApplyList;   
		  })  
		  .catch(error => {  
			console.error('获取申请列表出错:', error);  
		  })  
		  .finally(() => {  
			this.loading = false;  
		  });  
	  },  
	  approveApplication(application) {  
		// 确认同意申请  
		const confirmed = confirm(`您确定要同意申请吗？\nUser ID: ${application.userID}\nDevice ID: ${application.deviceID}`);  
		if (confirmed) {  
		  // 发送到后端  
		  this.$axios.post('http://localhost:8082/fixedasset_war_exploded/approve-apply', {  
			userID: application.userID,  
			username: application.username,
			deviceID: application.deviceID  
		  })  
		  .then(response => {  
			// 根据服务器返回的结果处理成功状态  
			console.log('申请已同意:', response.data);  
			// 重新加载申请列表或更新本地状态  
			this.fetchApplications();  
		  })  
		  .catch(error => {  
			console.error('同意申请出错:', error);  
		  });  
		}  
	  },  
	  goToHome() {  
		this.$router.push('/admin/dashboard');  
	  }  
	}  
}  
</script>  

<style scoped>  
/* 页面背景和布局 */  
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
  
.back-btn {  
	background-color: #4CAF50;  /* 绿色背景 */  
	color: white;  /* 白色文字 */  
	border: none;  
	padding: 10px 20px;  
	font-size: 16px;  
	cursor: pointer;  
	margin-bottom: 20px;  
	border-radius: 5px;  
}  
  
.back-btn:hover {  
	background-color: #45a049;  /* 按钮悬停时的背景色 */  
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
  
.application-list {  
	display: flex;  
	flex-direction: row;  
	flex-wrap: wrap;  
	gap: 20px;  
	width: 100%;  
	max-width: 1200px;  
	margin: 0 auto;  
}  
  
.application-cards-container {  
	display: flex;  
	flex-direction: row;  
	flex-wrap: wrap;  
	gap: 20px;  
}  
  
/* 申请卡片 */  
.application-card {  
	width: 250px;  
	background-color: rgba(255, 255, 255, 0.1);  
	border-radius: 10px;  
	padding: 20px;  
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);  
	transition: transform 0.3s ease, box-shadow 0.3s ease;  
}  
  
.application-card:hover {  
	transform: translateY(-10px);  
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);  
}  
  
/* 申请信息 */  
.application-info p {  
	font-size: 18px;  
	margin: 10px 0;  
}  
  
.application-info strong {  
	color: #ffeb3b; /* 黄色强调 */  
}  
  
/* 同意按钮样式 */  
.application-info button {  
	background-color: #4CAF50; /* 绿色 */  
	color: white; /* 白色文字 */  
	border: none;  
	padding: 10px 15px;  
	font-size: 16px;  
	cursor: pointer;  
	border-radius: 5px;  
}  
  
.application-info button:hover {  
	background-color: #45a049; /* 按钮悬停时的背景色 */  
}  
  
/* 响应式设计 */  
@media (max-width: 768px) {  
	.page-title {  
	  font-size: 28px;  
	}  
  
	.application-list {  
	  grid-template-columns: 1fr;  
	}  
  
	.application-info p {  
	  font-size: 16px;  
	}  
}  
</style>