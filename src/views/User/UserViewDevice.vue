<template>  
	<div class="page-container">  
		<button @click="goToHome" class="back-btn">返回主菜单</button>   

		<h2 class="page-title">设备列表</h2>  
		<div class="device-list">  
      <div v-for="device in paginatedDevices" :key="device.deviceID" class="device-card">  
      <img :src="getImageUrl(device.imageUrl)" alt="设备图片" class="device-image" />  
      <div class="device-info">  
        <p><strong>设备ID:</strong> {{ device.deviceID }}</p>  
        <p><strong>设备名称:</strong> {{ device.devicename }}</p>  
        <p><strong>设备类型:</strong> {{ device.type }}</p>  
        <p><strong>设备状态:</strong>  
          <span :class="['device-status', getStatusClass(device)]">  
            {{ getDeviceStatus(device) }}  
          </span>  
        </p>  
        <p><strong>在库数量:</strong> {{ device.number }}</p>  
      </div>  
    </div> 
		</div>  
    <div class="pagination-controls">  
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>  
      <span>Page {{ currentPage }} of {{ totalPages }}</span>  
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>  
    </div>
	</div>  
</template>

  
<script>  
export default {  
	data() {  
    return {  
      deviceList: [],  
      currentPage: 1,  
      itemsPerPage: 8, // Change this to the desired number of items per page  
    }  
  }, 
	mounted() {  
	  this.getDeviceList();  
	},  
  computed: {  
      paginatedDevices() {  
        const start = (this.currentPage - 1) * this.itemsPerPage;  
        return this.deviceList.slice(start, start + this.itemsPerPage);  
      },  
      totalPages() {  
        return Math.ceil(this.deviceList.length / this.itemsPerPage);  
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

	  // 获取图片URL
	  getImageUrl(imageName) {  
      if (!imageName) {  
        console.warn('未提供有效的图片名称');  
        return require('@/assets/images/logo.png'); // 返回默认图片  
      }  
      return require(`@/assets/images/${imageName}`);  
    },

	  // 根据设备状态返回对应的状态类
	  getStatusClass(device) {  
		    if (device.number > 0) {  
			    return 'status-available';  // 可借出  
		    } else {  
			    return 'status-out-of-stock';  // 暂无库存  
		    }  
	  },  

	  // 根据设备的在库数量返回对应的状态文本
	  getDeviceStatus(device) {  
		    if (device.number > 0) {  
			    return '可借出';  // 如果有库存
		    } else {  
			    return '暂无库存';  // 如果没有库存
		    }  
	  },  

    // 返回首页
    goToHome() {  
        this.$router.push('/user/dashboard');  
    }  ,
    changePage(pageNumber) {  
      if (pageNumber < 1 || pageNumber > this.totalPages) return;   
      this.currentPage = pageNumber;  
    }  
	}  
}
</script>

  
  
  <style scoped>
/* 页面背景和布局 */
.page-container {
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
  text-align: center; /* 中心对齐内容 */  
}  

/* 添加设备图片的样式 */  
.device-image {  
	width: 100%;      
	height: auto;     
	border-radius: 10px;   
	margin-bottom: 15px;   
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

.status-available {
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: bold;
  color: rgb(98, 206, 98);
}

.status-out-of-stock {
  color: red;
}


.status-offline {
  background-color: #f44336; /* 红色 */
  color: #fff;
}

.status-pending {
  background-color: #ff9800; /* 橙色 */
  color: #fff;
}

.pagination-controls {  
  display: flex;  
  justify-content: center;  
  margin-top: 20px;  
}  

.pagination-controls button {  
  background-color: #4CAF50;  
  color: white;  
  border: none;  
  padding: 10px 15px;  
  margin: 0 5px;  
  border-radius: 5px;  
  cursor: pointer;  
}  

.pagination-controls button:disabled {  
  background-color: #ccc;  
  cursor: not-allowed;  
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
