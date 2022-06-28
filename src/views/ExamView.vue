<template>
    <CardVue>
        <template v-slot:header>
            <div class="between">
                <h2>Kategori</h2>
                <p>00:00</p>
            </div>
        </template>
        <template v-slot:body>
            <div v-for="i in 3" :key="'exam-' + i" class="exam">
                <p>Konten {{i}}</p>
                <div class="option" v-for="j in 3" :key="'exam-'+i+'-option-'+j">
                    <input type="radio" name="konten" :id="'exam-'+i+'-option-'+j">
                    <label :for="'exam-'+i+'-option-'+j">item {{j}}</label>
                </div>
            </div>
            <div class="between">
                <button class="one secondary">Kembali</button>
                <button class="two primary">Selanjutnya / Selesai</button>
            </div>
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