<template>
	<div>
	  <h2>设备查询</h2>
	  <input type="text" v-model="queryCondition" placeholder="请输入查询条件" />
	  <button @click="queryDevices">查询</button>
	  <ul>
		<li v-for="device in deviceList" :key="device.id">
		  设备ID: {{ device.id }} - 设备名称: {{ device.name }} - 设备类型: {{ device.type }}
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		queryCondition: '',
		deviceList: []
	  }
	},
	methods: {
	  queryDevices() {
		// 发送GET请求到后端设备查询接口，并带上查询条件参数
		this.$axios.get('/admin/device/query', {
		  params: {
			queryCondition: this.queryCondition
		  }
		})
		.then(response => {
			this.deviceList = response.data
		  })
		.catch(error => {
			console.error('设备查询出错:', error)
		  })
	  }
	}
  }
  </script>