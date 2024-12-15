<template>
	<div>
	  <h2>借用设备</h2>
	  <input type="text" v-model="deviceId" placeholder="请输入设备ID" />
	  <input type="number" v-model="borrowPeriod" placeholder="请输入借用时长（天）" />
	  <button @click="borrowDevice">借用</button>
	  <p v-if="message">{{ message }}</p>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		deviceId: '',
		borrowPeriod: 0,
		message: ''
	  }
	},
	methods: {
	  borrowDevice() {
		const data = {
		  deviceId: this.deviceId,
		  borrowPeriod: this.borrowPeriod
		}
		// 发送POST请求到后端借用设备接口
		this.$axios.post('/user/device/borrow', data)
		.then(response => {
			this.message = response.data.message
		  })
		.catch(error => {
			console.error('设备借用出错:', error)
			this.message = '设备借用失败，请检查输入信息'
		  })
	  }
	}
  }
  </script>