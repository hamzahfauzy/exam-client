<template>
    <CardVue>
        <template v-slot:header>
            <img src="../../assets/logo.png" alt="logo" width="250">
            <h2>Arunika Test Platform</h2>
        </template>
        <template v-slot:body>
            <div class="form-group">
                <label for="">Nama Pengguna / Nomor Ujian</label>
                <input type="text">
            </div>
            <button class="primary">Masuk</button>
        </template>
        <template v-slot:footer>
            <p>Arunika IT Department 2022</p>
        </template>
    </CardVue>
</template>

<script>
import CardVue from '../../components/CardVue.vue'
export default{
    components: { 
        CardVue,
    }
}
</script>