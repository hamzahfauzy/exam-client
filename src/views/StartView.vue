<template>
    <CardVue>
        <template v-slot:header>
            <h2>Biodata</h2>
        </template>
        <template v-slot:body>
            <div class="form-group">
                <label for="">Nama</label>
                <input type="text" placeholder="Nama...">
            </div>
            <div class="form-group">
                <label for="">Asal Sekolah</label>
                <input type="text" placeholder="Asal Sekolah...">
            </div>
            <div class="form-group">
                <label for="">Jurusan</label>
                <input type="text" placeholder="Jurusan...">
            </div>
            <div class="form-group">
                <label for="">Tempat Tanggal Lahir</label>
                <input type="text" placeholder="Tempat Tanggal Lahir...">
            </div>
            <div class="form-group">
                <label for="">No Handphone</label>
                <input type="text" placeholder="No Handphone...">
            </div>
            <router-link to="/exam">
                <button class="primary">Mulai</button>
            </router-link>
        </template>
        <template v-slot:footer>
            <p>Arunika IT Department 2022</p>
        </template>
    </CardVue>
</template>

<script>
    import CardVue from '@/components/CardVue.vue'

    export default {
        components:{
            CardVue
        }, 
    }
</script>

<style lang="scss" scoped>

</style>