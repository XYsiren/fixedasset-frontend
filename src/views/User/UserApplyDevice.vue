<template>
	<div>
	  <h2>领用设备</h2>
	  <input type="text" v-model="deviceId" placeholder="请输入设备ID" />
	  <button @click="applyDevice">领用</button>
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
	  applyDevice() {
		const data = {
		  deviceId: this.deviceId
		}
		// 发送POST请求到后端领用设备接口
		this.$axios.post('/user/device/apply', data)
		.then(response => {
			this.message = response.data.message
		  })
		.catch(error => {
			console.error('设备领用出错:', error)
			this.message = '设备领用失败，请检查输入信息'
		  })
	  }
	}
  }
  </script>