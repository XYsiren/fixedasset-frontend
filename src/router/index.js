import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import UserDashboard from '../views/User/UserDashboard.vue'
import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import UserViewDevice from '../views/User/UserViewDevice.vue'
import UserApplyDevice from '../views/User/UserApplyDevice.vue'
import UserBorrowDevice from '../views/User/UserBorrowDevice.vue'
import UserReturnDevice from '../views/User/UserReturnDevice.vue'
import AdminManageUser from '../views/Admin/AdminManageUser.vue'
import AdminPutInStorageDevice from '../views/Admin/AdminDeviceManagement/AdminPutInStorageDevice.vue'
import AdminTakeOutStorageDevice from '../views/Admin/AdminDeviceManagement/AdminTakeOutStorageDevice.vue'
import AdminQueryDevice from '../views/Admin/AdminDeviceManagement/AdminQueryDevice.vue'
import AdminScrapDevice from '../views/Admin/AdminDeviceManagement/AdminScrapDevice.vue'
import AdminDeviceStatistics from '../views/Admin/AdminDeviceManagement/AdminDeviceStatistics.vue'
import AdminUnreturnedDevice from '../views/Admin/AdminDeviceManagement/AdminUnreturnedDevice.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  {
    path: '/user/dashboard',
    component: UserDashboard
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboard
  },
  {
    path: '/user/view-device',
    component: UserViewDevice
  },
  {
    path: '/user/apply-device',
    component: UserApplyDevice
  },
  {
    path: '/user/borrow-device',
    component: UserBorrowDevice
  },
  {
    path: '/user/return-device',
    component: UserReturnDevice
  },
  {
    path: '/admin/manage-user',
    component: AdminManageUser
  },
  {
    path: '/admin/put-in-storage',
    component: AdminPutInStorageDevice
  },
  {
    path: '/admin/take-out-storage',
    component: AdminTakeOutStorageDevice
  },
  {
    path: '/admin/query-device',
    component: AdminQueryDevice
  },
  {
    path: '/admin/scrap-device',
    component: AdminScrapDevice
  },
  {
    path: '/admin/statistics-device',
    component: AdminDeviceStatistics
  },
  {
    path: '/admin/unreturned-device',
    component: AdminUnreturnedDevice
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router
