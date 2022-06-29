<template>
    <CardVue>
        <template v-slot:header>
            <img src="../../assets/logo.png" alt="logo" width="250">
            <h2>Arunika Test Platform</h2>
        </template>
        <template v-slot:body>
            <form @submit="handleLogin" class="form">
                <div class="form-group">
                    <label for="">Nama Pengguna / Nomor Ujian</label>
                    <input type="text" v-model="username">
                </div>
                <button class="primary">Masuk</button>
            </form>
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
    },
    data : () => ({
        username:'',
        API_URL:process.env.VUE_APP_API_URL
    }),
    methods:{
        async handleLogin(e){
            e.preventDefault()
            let data = new FormData()
            data.append('username',this.username)
            const res = await fetch(this.API_URL +'index.php?module=auth/login',{
                method:'POST',
                body:data
            })
            const json = await res.json()
            console.log(json)
        },
    }
}
</script>