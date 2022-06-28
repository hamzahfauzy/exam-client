<template>
  <CardVue>
    <template v-slot:header>
      <img src="../assets/logo.png" alt="logo" width="250">
      <h2>Arunika Test Platform</h2>
    </template>
    <template v-slot:body>
      <p>Nama Lengkap</p>
      <p>Nama Pengguna / Nomor Ujian</p>
      <router-link to="/start">
        <button class="primary">Mulai / Lanjutkan</button>
      </router-link>
      <button class="secondary">Keluar</button>
    </template>
    <template v-slot:footer>
      <p>Arunika IT Department 2022</p>
    </template>
  </CardVue>
</template>

<script>
import CardVue from '@/components/CardVue.vue'
export default {
  name: 'HomeView',
  components:{
    CardVue,
  }
}
</script>
