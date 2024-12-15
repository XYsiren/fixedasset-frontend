<template>
	<div>
	  <h2>设备报废</h2>
	  <input type="text" v-model="deviceId" placeholder="请输入设备ID" />
	  <button @click="scrapDevice">报废</button>
	  <p v-if="message">{{ message }}</p>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		deviceId: '',
		message: ''
	  }
	},
	methods: {
	  scrapDevice() {
		const data = {
		  deviceId: this.deviceId
		}
		// 发送POST请求到后端设备报废接口
		this.$axios.post('/admin/device/scrap', data)
		.then(response => {
			this.message = response.data.message
		  })
		.catch(error => {
			console.error('设备报废出错:', error)
			this.message = '设备报废失败，请检查输入信息'
		  })
	  }
	}
  }
  </script>