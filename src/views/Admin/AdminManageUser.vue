<template>
	<div>
	  <h2>用户管理</h2>
	  <ul>
		<li v-for="user in userList" :key="user.id">
		  用户ID: {{ user.id }} - 用户名: {{ user.username }} - 角色: {{ user.role }}
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		userList: []
	  }
	},
	mounted() {
	  // 页面加载时获取用户列表
	  this.getUsers()
	},
	methods: {
	  getUsers() {
		// 发送GET请求到后端管理员管理用户接口
		this.$axios.get('/admin/user/manage')
		.then(response => {
			this.userList = response.data
		  })
		.catch(error => {
			console.error('获取用户列表出错:', error)
		  })
	  }
	}
  }
  </script>