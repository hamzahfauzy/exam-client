<template>
  <CardVue>
    <template v-slot:header>
      <img src="../assets/logo.png" alt="logo" width="250">
      <h2>Arunika Test Platform</h2>
    </template>
    <template v-slot:body>
      <div v-if="participant">
        <p>{{participant.name}}</p>
        <p>{{participant.id_number}}</p>
        <button class="btn-home primary" v-for="exam in exams" :key="exam.id" @click="handleStart(exam)" v-show="exam.exam.in_time || exam.status == 'start'">{{ exam.status == 'start' ? 'Lanjutkan' : 'Mulai'}}</button>
        <button class="btn-home secondary" @click="doLogout">Keluar</button>
      </div>
    </template>
    <template v-slot:footer>
      <p>Arunika IT Department 2022</p>
    </template>
  </CardVue>
</template>

<script>
import CardVue from '@/components/CardVue.vue'
import {logout, categories, dashboard} from '../services'
export default {
  name: 'HomeView',
  components:{
    CardVue,
  },
  data : () => ({
    participant:{},
    exams:[]
  }),
  created(){
    this.init()
  },
  methods: {
    async init() {  
      const res = await dashboard()
      if(res.message == "Unauthorized")
      {
          this.doLogout()
      }

      this.participant = res.data.participant
      this.exams = res.data.exams
    },
    doLogout(){
      logout()
      this.$router.push({'name':'login'});
    },
    async handleStart(exam){
      if(exam.status == 'start'){
        const cats = await categories(exam.exam_id)
        if(cats.message == "Unauthorized")
        {
            this.doLogout()
        }
        localStorage.setItem('categories',JSON.stringify(cats.data))
        localStorage.setItem('selectedCategory', exam.category_index ?? 0)
        this.$router.push({ name: 'exam', params: { id: exam.exam_id } })
      }else{
        this.$router.push({name:'start',params:{id:exam.exam_id}})
      }
    }
  }
}
</script>
