<template>
	<div>
	  <h2>设备入库</h2>
	  <input type="text" v-model="deviceName" placeholder="请输入设备名称" />
	  <input type="text" v-model="deviceType" placeholder="请输入设备类型" />
	  <button @click="putInStorage">入库</button>
	  <p v-if="message">{{ message }}</p>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		deviceName: '',
		deviceType: '',
		message: ''
	  }
	},
	methods: {
	  putInStorage() {
		const data = {
		  deviceName: this.deviceName,
		  deviceType: this.deviceType
		}
		// 发送POST请求到后端设备入库接口
		this.$axios.post('/admin/device/putInStorage', data)
		.then(response => {
			this.message = response.data.message
		  })
		.catch(error => {
			console.error('设备入库出错:', error)
			this.message = '设备入库失败，请检查输入信息'
		  })
	  }
	}
  }
  </script>