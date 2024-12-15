<template>
	<div>
	  <h2>设备出库</h2>
	  <input type="text" v-model="deviceId" placeholder="请输入设备ID" />
	  <button @click="takeOutStorage">出库</button>
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
	  takeOutStorage() {
		const data = {
		  deviceId: this.deviceId
		};
		// 发送POST请求到后端设备出库接口
		this.$axios.post('/admin/device/takeOutStorage', data)
		.then(response => {
			this.message = response.data.message
		  })
		.catch(error => {
			console.error('设备出库出错:', error)
			this.message = '设备出库失败，请检查输入信息'
		  })
	  }
	}
  }
  </script>