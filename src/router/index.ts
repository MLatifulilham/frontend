import { createRouter, createWebHistory } from "vue-router"

import Login from "@/views/Login.vue"

// import DashboardAdmin from "@/views/DashboardAdmin.vue"
import DashboardSuperAdmin from '@/views/dashboard_super_admin/Dashboardsuperadmin.vue'
import Home from '@/views/dashboard_super_admin/akademik/Home.vue'

//password
import Reset_password from '@/views/dashboard_super_admin/akademik/password/Reset_password.vue'

// impor akun
import Akun from '@/views/dashboard_super_admin/akademik/akun/Akun.vue'
import Edit_akun from '@/views/dashboard_super_admin/akademik/akun/Edit_akun.vue'
import konfirmasi_hapus from "../views/dashboard_super_admin/akademik/akun/konfirmasi_hapus.vue"
import Tambah_akun from "../views/dashboard_super_admin/akademik/akun/Tambah_akun.vue"

// ADMIN AKADEMIK
import DashboardAdmin from '@/views/dashboard_admin_akademik/Dashboard_admin_akademik.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login },
    { path: "/dashboard-admin", component: DashboardAdmin },
    { path: "/dashboard-superadmin", component: DashboardSuperAdmin, 
      children: [
      { path: "reset_password", component: Reset_password },
      { path: "akun", component: Akun },
      { path: "edit_akun", component: Edit_akun },
      { path: "", component: Home },
      { path: "konfirmasi_hapus", component: konfirmasi_hapus },
      { path: "tambah_akun", component: Tambah_akun },
   
    ] }
  ],
})

export default router