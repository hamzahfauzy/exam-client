<template>
    <CardVue>
        <template v-slot:header>
            <h2>Biodata</h2>
        </template>
        <template v-slot:body>
            <form @submit="handleSubmit" class="form">
                <div class="form-group">
                    <label for="">Nama</label>
                    <input type="text" v-model="name" placeholder="Nama..." required>
                </div>
                <div class="form-group">
                    <label for="">Tempat Tanggal Lahir</label>
                    <div class="between">
                        <input type="text" v-model="place_birth" placeholder="Tempat Lahir..." required>
                        <input type="date" v-model="date_birth" placeholder="Tanggal Lahir..." required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="">Jenis Kelamin</label>
                    <select v-model="gender" required>
                        <option></option>
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Nama SMA</label>
                    <input type="text" v-model="school" placeholder="Nama SMA..." required>
                </div>
                <div class="form-group">
                    <label for="">Asal SMP</label>
                    <input type="text" v-model="middle_school" placeholder="Asal SMP..." required>
                </div>
                <div class="form-group">
                    <label for="">Prestasi Akademik</label>
                    <input type="text" v-model="academic" placeholder="Prestasi Akademik..." required>
                </div>
                <div class="form-group">
                    <label for="">Prestasi Non Akademik</label>
                    <input type="text" v-model="non_academic" placeholder="Prestasi Non Akademik..." required>
                </div>
                <div class="form-group">
                    <label for="">Jurusan Yang Dipilih</label>
                    <input type="text" v-model="major" placeholder="Jurusan..." required>
                </div>
                <div class="form-group">
                    <label for="">Cita-cita</label>
                    <input type="text" v-model="goals" placeholder="Cita-cita..." required>
                </div>
                <div class="between">
                    <button type="button" class="one secondary" @click="$router.go(-1)">Kembali</button>
                    <button class="two primary" :disabled="submit_.disabled">{{submit_.text}}</button>
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
           submit_:{
               text:'Mulai',
               disabled:false,
           },
           participant:JSON.parse(localStorage.getItem('participant')),
           name:'',
           school:'',
           place_birth:'',
           date_birth:'',
           academic:'',
           non_academic:'',
           major:'',
           middle_school:'',
           goals:'',
           gender:'',
        }),
        created(){
            this.name = this.participant.name
        },
        methods:{
            async handleSubmit(e){
                e.preventDefault()
                this.submit_.text = 'Mengirim Data...'
                this.submit_.disabled = true
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
                metas.append('user_metas[major]',this.major)
                metas.append('user_metas[goals]',this.goals)
                metas.append('user_metas[academic]',this.academic)
                metas.append('user_metas[non_academic]',this.non_academic)
                metas.append('user_metas[middle_school]',this.middle_school)
                metas.append('exam_id',this.$route.params.id)
                try {
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
                    this.submit_.text = 'Mulai'
                    this.submit_.disabled = false
                } catch (error) {
                    this.submit_.text = 'Mulai'
                    this.submit_.disabled = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>