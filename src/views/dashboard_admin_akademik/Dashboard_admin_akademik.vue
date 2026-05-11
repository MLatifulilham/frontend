<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const BASE_URL = "https://be.karlearn.site"

const user = ref<any>(null)
const students = ref<any[]>([])
const kurikulum = ref<any[]>([])
const tahunAkademik = ref<any[]>([])
const totalAkun = ref<number>(0)

// Tab untuk menu Akademik
const activeTab = ref('tahun-akademik')
const tabs = [
  { key: 'tahun-akademik', label: 'Tahun Akademik' },
  { key: 'kurikulum', label: 'Kurikulum' },
  { key: 'presensi', label: 'Presensi' },
  { key: 'nilai', label: 'Nilai' },
  { key: 'khs', label: 'KHS' },
]

const getStudents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/students/`)
    const data = await res.json()
    students.value = data?.data || []
  } catch (err) {
    console.error("STUDENTS ERROR:", err)
  }
}

const getKurikulum = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/kurikulum/`)
    const data = await res.json()
    kurikulum.value = data?.data || []
  } catch (err) {
    console.error("KURIKULUM ERROR:", err)
  }
}

const getTahunAkademik = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/tahun-akademik/`)
    const data = await res.json()
    tahunAkademik.value = data?.data || []
  } catch (err) {
    console.error("TAHUN AKADEMIK ERROR:", err)
  }
}

const getTotalAkun = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/total-akun/`)
    const data = await res.json()
    totalAkun.value = data?.data?.total || 0
  } catch (err) {
    console.error("TOTAL AKUN ERROR:", err)
  }
}

const handleLogout = () => {
  localStorage.clear()
  router.push("/")
}

// BUG FIX: toggleSidebar didefinisikan tapi tidak ada fungsinya
const isSidebarOpen = ref(true)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
  getStudents()
  getKurikulum()
  getTahunAkademik()
  getTotalAkun()
})
</script>

<template>
  <div class="flex h-screen bg-gray-100">

    <!-- SIDEBAR -->
    <aside class="w-60 bg-[#2f4a8a] text-white flex flex-col p-4">

      <nav class="space-y-2 text-sm">

        <div
          @click="router.push('/dashboard-admin-akademik')"
          :class="route.path === '/dashboard-admin-akademik' ? 'bg-white text-[#2f4a8a]' : 'hover:bg-blue-700'"
          class="px-3 py-2 rounded cursor-pointer"
        >
          Dashboard
        </div>

        <div
          @click="router.push('/dashboard-admin-akademik/akademik')"
          :class="route.path.includes('akademik') ? 'bg-white text-[#2f4a8a]' : 'hover:bg-blue-700'"
          class="px-3 py-2 rounded cursor-pointer"
        >
          Akademik
        </div>

        <div
          @click="router.push('/dashboard-admin-akademik/dosen')"
          :class="route.path.includes('dosen') ? 'bg-white text-[#2f4a8a]' : 'hover:bg-blue-700'"
          class="px-3 py-2 rounded cursor-pointer"
        >
          Dosen
        </div>

        <div
          @click="router.push('/dashboard-admin-akademik/kelas')"
          :class="route.path.includes('kelas') ? 'bg-white text-[#2f4a8a]' : 'hover:bg-blue-700'"
          class="px-3 py-2 rounded cursor-pointer"
        >
          Kelas
        </div>

        <div
          @click="router.push('/dashboard-admin-akademik/peserta-kelas')"
          :class="route.path.includes('peserta-kelas') ? 'bg-white text-[#2f4a8a]' : 'hover:bg-blue-700'"
          class="px-3 py-2 rounded cursor-pointer"
        >
          Peserta Kelas
        </div>

      </nav>

      <button @click="handleLogout" class="mt-auto text-left text-xs opacity-80 hover:opacity-100">
        Keluar
      </button>
    </aside>

    <!-- MAIN -->
<div class="bg-[#2f4a8a] text-white px-6 py-3 flex justify-between items-center">

  <!-- LEFT -->
  <div class="flex items-center gap-3">
    <button @click="toggleSidebar">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <span class="font-bold">Logo</span>
  </div>

  <!-- CENTER -->
  <div class="text-lg font-semibold capitalize">
    {{ route.path.split('/').pop()?.replace('-', ' ') || 'Dashboard' }}
  </div>

  <!-- RIGHT -->
  <div class="text-sm">
    {{ user?.name || 'Admin' }}
  </div>

</div>
        <!-- ==================== DASHBOARD ==================== -->
        <div v-if="route.path === '/dashboard-admin-akademik'">
          <h2 class="text-lg font-bold mb-1">Dashboard</h2>
          <p class="text-xs text-gray-500 mb-5">Selamat Datang {{ user?.name || 'Admin Akademik' }}</p>

          <div class="bg-white p-4 rounded shadow w-62.5 mb-6">
            <p class="text-xs text-gray-500">TOTAL AKUN</p>
            <h2 class="text-xl font-bold text-gray-800">{{ totalAkun }}</h2>
          </div>

          <div class="grid grid-cols-3 gap-5">
            <div class="col-span-2 bg-white p-4 rounded shadow">
              <h3 class="text-sm font-semibold mb-3">Data Akun</h3>
              <table class="w-full text-xs">
                <thead>
                  <tr class="bg-gray-100 text-left">
                    <th class="p-2">No</th>
                    <th class="p-2">Nama</th>
                    <th class="p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(s, i) in students" :key="i" class="border-b">
                    <td class="p-2">{{ i + 1 }}</td>
                    <td class="p-2">{{ s.name }}</td>
                    <td class="p-2">{{ s.email }}</td>
                  </tr>
                  <tr v-if="students.length === 0">
                    <td colspan="3" class="text-center p-3 text-gray-400">Data kosong</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="space-y-4">
              <div class="bg-white p-4 rounded shadow">
                <h3 class="text-xs font-semibold mb-2">Tahun Akademik</h3>
                <div v-for="(t, i) in tahunAkademik" :key="i"
                  class="flex justify-between text-xs border-b py-1">
                  <span>{{ t.name }}</span><span>👁</span>
                </div>
                <div v-if="tahunAkademik.length === 0" class="text-xs text-gray-400 text-center">Kosong</div>
              </div>

              <div class="bg-white p-4 rounded shadow">
                <h3 class="text-xs font-semibold mb-2">Kurikulum</h3>
                <div v-for="(k, i) in kurikulum" :key="i"
                  class="flex justify-between text-xs border-b py-1">
                  <span>{{ k.name }}</span><span>👁</span>
                </div>
                <div v-if="kurikulum.length === 0" class="text-xs text-gray-400 text-center">Kosong</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== AKADEMIK + TAB ==================== -->
        <div v-if="route.path.includes('/dashboard-admin-akademik/akademik')">
          <h2 class="text-lg font-bold mb-4">Menu Akademik</h2>

          <!-- TAB BAR -->
          <div class="flex border-b mb-4">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="activeTab === tab.key
                ? 'border-b-2 border-[#2f4a8a] text-[#2f4a8a] font-semibold'
                : 'text-gray-500 hover:text-[#2f4a8a]'"
              class="px-4 py-2 text-sm transition"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- TAB CONTENT -->
          <div class="bg-white p-4 rounded shadow">

            <!-- Tahun Akademik -->
            <div v-if="activeTab === 'tahun-akademik'">
              <div v-for="(t, i) in tahunAkademik" :key="i"
                class="flex justify-between text-xs border-b py-2">
                <span>{{ t.name }}</span><span>👁</span>
              </div>
              <div v-if="tahunAkademik.length === 0"
                class="text-xs text-gray-400 text-center py-3">Kosong</div>
            </div>

            <!-- Kurikulum -->
            <div v-if="activeTab === 'kurikulum'">
              <div v-for="(k, i) in kurikulum" :key="i"
                class="flex justify-between text-xs border-b py-2">
                <span>{{ k.name }}</span><span>👁</span>
              </div>
              <div v-if="kurikulum.length === 0"
                class="text-xs text-gray-400 text-center py-3">Kosong</div>
            </div>

            <!-- Presensi -->
            <div v-if="activeTab === 'presensi'">
              <p class="text-xs text-gray-400 text-center py-3">Data presensi kosong</p>
            </div>

            <!-- Nilai -->
            <div v-if="activeTab === 'nilai'">
              <p class="text-xs text-gray-400 text-center py-3">Data nilai kosong</p>
            </div>

            <!-- KHS -->
            <div v-if="activeTab === 'khs'">
              <p class="text-xs text-gray-400 text-center py-3">Data KHS kosong</p>
            </div>

          </div>
        </div>

        <!-- ==================== DOSEN ==================== -->
        <div v-if="route.path.includes('dosen')">
          <h2 class="text-lg font-bold mb-3">Data Dosen</h2>
          <div class="bg-white p-4 rounded shadow">
            <p class="text-xs text-gray-400 text-center py-3">Data dosen kosong</p>
          </div>
        </div>

        <!-- ==================== KELAS ==================== -->
        <div v-if="route.path.includes('kelas') && !route.path.includes('peserta')">
          <h2 class="text-lg font-bold mb-3">Data Kelas</h2>
          <div class="bg-white p-4 rounded shadow">
            <p class="text-xs text-gray-400 text-center py-3">Data kelas kosong</p>
          </div>
        </div>

        <!-- ==================== PESERTA KELAS ==================== -->
        <div v-if="route.path.includes('peserta-kelas')">
          <h2 class="text-lg font-bold mb-3">Data Peserta Kelas</h2>
          <div class="bg-white p-4 rounded shadow">
            <p class="text-xs text-gray-400 text-center py-3">Data peserta kelas kosong</p>
          </div>
        </div>

      </div>
  
</template>