<template>
	<div>
	  <h2>归还设备</h2>
	  <input type="text" v-model="deviceId" placeholder="请输入设备ID" />
	  <button @click="returnDevice">归还</button>
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
	  returnDevice() {
		const data = {
		  deviceId: this.deviceId
		}
		// 发送POST请求到后端归还设备接口
		this.$axios.post('/user/device/return', data)
		.then(response => {
			this.message = response.data.message
		  })
		.catch(error => {
			console.error('设备归还出错:', error)
			this.message = '设备归还失败，请检查输入信息'
		  })
	  }
	}
  }
  </script>