<template>
    <CardVue>
        <template v-slot:header>
            <img src="../../assets/logo.png" alt="logo" width="250">
            <h2>Arunika Test Platform</h2>
        </template>
        <template v-slot:body>
            <div class="alert danger" v-if="!isChrome">
                Demi kelancaran ujian, harap gunakan browser google chrome.
            </div>

            <div class="alert warning" v-if="isChrome">
                Demi kelancaran ujian, Pastikan gunakan google chrome versi terbaru.
            </div>

            <form @submit="handleLogin" class="form">
                <div class="form-group">
                    <label for="">Username</label>
                    <input type="text" v-model="username">
                </div>
                <button class="primary">Masuk</button>
            </form>

            <p align="center">
                Bantuan (Telegram)<br>
                082185054088
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
        username:'',
        isChrome:window.chrome
    }),
    methods:{
        async handleLogin(e){
            e.preventDefault()
            let data = new FormData()
            data.append('username',this.username)
            data.append('user_agent',navigator.userAgent)
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