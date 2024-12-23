<template>  
	<div class="page-container">  
		<button @click="goToHome" class="back-btn">返回主菜单</button>  

		<h2 class="page-title">待审核申请列表</h2>  
		  
		<div class="application-list">  
			<div v-if="loading">加载中...</div>  
			<div v-else>  
				<!-- Borrow Applications Section -->  
				<h3>设备借用</h3>  
				<div v-if="borrowapplications.length === 0">没有待审核的借用申请。</div>  
				<div class="application-cards-container">  
					<div v-for="application in borrowapplications" :key="application.userID" class="application-card">  
						<div class="application-info">  
							<p><strong>User ID:</strong> {{ application.userID }}</p>  
							<p><strong>借用用户名:</strong> {{ application.username }}</p>  
							<p><strong>Device ID:</strong> {{ application.deviceID }}</p>  
							<p><strong>借用设备名:</strong> {{ application.devicename }}</p> 
							<p><strong>借用数量:</strong> {{ application.borrowNumber }}</p> 
							<p><strong>借用天数:</strong> {{ application.borrowPeriod }}</p>  
							<button @click="approveApplication(application, 'borrow')">同意</button>  
						</div>  
					</div>  
				</div>  
				<!-- Apply Applications Section -->  
				<h3>设备申请</h3>  
				<div v-if="applyapplications.length === 0">没有待审核的申请。</div>  
				<div class="application-cards-container">  
					<div v-for="application in applyapplications" :key="application.userID" class="application-card">  
						<div class="application-info">  
							<p><strong>User ID:</strong> {{ application.userID }}</p>  
							<p><strong>申请用户名:</strong> {{ application.username }}</p>  
							<p><strong>Device ID:</strong> {{ application.deviceID }}</p>  
							<p><strong>申请设备名:</strong> {{ application.devicename }}</p>  
							<p><strong>申请天数:</strong> {{ application.applyPeriod }}</p>  
							<button @click="approveApplication(application, 'apply')">同意</button>  
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
			applyapplications: [],  
			borrowapplications: [],  
			loading: true,  
			adminname: '',
		};  
	},  
	mounted() {  
		this.fetchApplications();  

		// 从 localStorage 获取用户名  
		const storedUser = localStorage.getItem('user');  
	  if (storedUser) {  
		const user = JSON.parse(storedUser);  
		this.adminname = user.username || ''; // 设置用户名  
	  }  
	},  
	methods: {  
		fetchApplications() {  
			this.$axios.get('http://localhost:8082/fixedasset_war_exploded/examine-apply')  
				.then(response => {  
					this.applyapplications = response.data.deviceApplyList;  
					this.borrowapplications = response.data.deviceBorrowList;  
				})  
				.catch(error => {  
					console.error('获取申请列表出错:', error);  
				})  
				.finally(() => {  
					this.loading = false;  
				});  
		},  
		approveApplication(application, type) {  
			const confirmed = confirm(`您确定要同意${type === 'apply' ? '申请' : '借用'}吗？\nUser ID: ${application.userID}\nDevice ID: ${application.deviceID}`);  
			if (confirmed) {  
				const url = type === 'apply'  
					? 'http://localhost:8082/fixedasset_war_exploded/approve-apply'  
					: 'http://localhost:8082/fixedasset_war_exploded/approve-borrow';  

				this.$axios.post(url, {  
					userID: application.userID,  
					username: application.username,  
					deviceID: application.deviceID,  
					adminname: this.adminname,
					number: application.borrowNumber,
					applyPeriod: type === 'apply' ? application.applyPeriod : application.borrowPeriod  // Adjust for the type  
				})  
				.then(response => {  
					console.log(`${type === 'apply' ? '申请' : '借用'}已同意:`, response.data);  
					// Refresh or update application lists  
					this.fetchApplications();  
				})  
				.catch(error => {  
					console.error(`${type === 'apply' ? '同意申请' : '同意借用'}出错:`, error);  
				});  
			}  
		},  
		goToHome() {  
			this.$router.push('/admin/dashboard');  
		}  
	}  
};  
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