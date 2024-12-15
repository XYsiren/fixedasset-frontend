<template>
	<div>
	  <h2>设备统计</h2>
	  <p v-for="(count, status) in statistics" :key="status">
		状态为 {{ status }} 的设备数量: {{ count }}
	  </p>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		statistics: {}
	  }
	},
	mounted() {
	  // 页面加载时获取设备统计信息
	  this.getDeviceStatistics()
	},
	methods: {
	  getDeviceStatistics() {
		// 发送GET请求到后端设备统计接口
		this.$axios.get('/admin/device/statistics')
		.then(response => {
			this.statistics = response.data
		  })
		.catch(error => {
			console.error('获取设备统计信息出错:', error)
		  })
	  }
	}
  }
  </script>