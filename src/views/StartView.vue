<template>
    <CardVue>
        <template v-slot:header>
            <h2>Biodata</h2>
        </template>
        <template v-slot:body>
            <form @submit="handleSubmit" class="form">
                <div class="form-group">
                    <label for="">Nama</label>
                    <input type="text" v-model="name" placeholder="Nama...">
                </div>
                <div class="form-group">
                    <label for="">Asal Sekolah</label>
                    <input type="text" v-model="school" placeholder="Asal Sekolah...">
                </div>
                <!-- <div class="form-group">
                <label for="">Jurusan</label>
                <input type="text" placeholder="Jurusan...">
            </div> -->
                <div class="form-group">
                    <label for="">Tempat Tanggal Lahir</label>
                    <div class="between">
                        <input type="text" v-model="place_birth" placeholder="Tempat Lahir...">
                        <input type="date" v-model="date_birth" placeholder="Tanggal Lahir...">
                    </div>
                </div>
                <div class="form-group">
                    <label for="">No Handphone</label>
                    <input type="text" v-model="handphone" placeholder="No Handphone...">
                </div>
                <div class="between">
                    <button type="button" class="one secondary" @click="$router.go(-1)">Kembali</button>
                    <button class="two primary">Mulai</button>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <p>Arunika IT Department 2022</p>
        </template>
    </CardVue>
</template>

<script>
    import CardVue from '@/components/CardVue.vue'
    import {start, logout} from '../services'

    export default {
        components:{
            CardVue
        },
        data : () => ({
           name:'',
           school:'',
           place_birth:'',
           date_birth:'',
           handphone:'',
        }),
        methods:{
            async handleSubmit(e){
                e.preventDefault()
                if(this.$route.params.id.includes('demo'))
                {
                    localStorage.setItem('selectedCategory',0)
                    this.$router.push({ name: 'exam', params: { id: this.$route.params.id } })
                    return
                }
                let metas = new FormData()
                metas.append('user_metas[name]',this.name)
                metas.append('user_metas[school]',this.school)
                metas.append('user_metas[place_birth]',this.place_birth)
                metas.append('user_metas[date_birth]',this.date_birth)
                metas.append('user_metas[handphone]',this.handphone)
                metas.append('exam_id',this.$route.params.id)
                let res = await start(metas)
                if(res.message == "Unauthorized")
                {
                    logout()
                    this.$router.push({'name':'login'});
                }
                if(res.status == 'success'){
                    localStorage.setItem('selectedCategory',0)
                    this.$router.push({ name: 'exam', params: { id: this.$route.params.id } })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>