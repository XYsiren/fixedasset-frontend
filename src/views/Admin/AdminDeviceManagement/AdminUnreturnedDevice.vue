<template>
	<div>
	  <h2>未归还设备管理</h2>
	  <ul>
		<li v-for="device in unreturnedDevices" :key="device.id">
		  设备ID: {{ device.id }} - 设备名称: {{ device.name }} - 预计归还时间: {{ device.expectedReturnTime }}
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		unreturnedDevices: []
	  }
	},
	mounted() {
	  // 页面加载时获取未归还设备列表
	  this.getUnreturnedDevices()
	},
	methods: {
	  getUnreturnedDevices() {
		// 发送GET请求到后端管理未归还设备接口
		this.$axios.get('/admin/device/unreturned')
		.then(response => {
			this.unreturnedDevices = response.data
		  })
		.catch(error => {
			console.error('获取未归还设备列表出错:', error)
		  })
	  }
	}
  }
  </script>