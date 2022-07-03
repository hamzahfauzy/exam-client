<template>
    <CardVue>
        <template v-slot:header>
            <img src="../../assets/logo.png" alt="logo" width="250">
            <h2>Arunika Test Platform</h2>
        </template>
        <template v-slot:body>
            <form @submit="handleLogin" class="form">
                <div class="form-group">
                    <label for="">Username</label>
                    <input type="text" v-model="username">
                </div>
                <button class="primary">Masuk</button>
            </form>

            <p align="center">
                Bantuan (Whatsapp)<br>
                0822-7650-0156 (Bapak Nanda)<br>
                0813-6294-8177 (Ibu Mega)<br>
            </p>
        </template>
        <template v-slot:footer>
            <p>Arunika IT Department 2022</p>
        </template>
    </CardVue>
</template>

<script>
import CardVue from '../../components/CardVue.vue'
import {login} from '../../services'
export default{
    components: { 
        CardVue,
    },
    data : () => ({
        username:''
    }),
    methods:{
        async handleLogin(e){
            e.preventDefault()
            let data = new FormData()
            data.append('username',this.username)
            const res = await login(data)
            if(res.status == 'success'){
                this.$router.push({name:'home'})
            }
            else
            {
                alert("Data peserta tidak ditemukan")
            }
        },
    }
}
</script>