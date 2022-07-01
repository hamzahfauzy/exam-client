<template>
  <CardVue>
    <template v-slot:header>
      <img src="../assets/logo.png" alt="logo" width="250">
      <h2>Arunika Test Platform</h2>
    </template>
    <template v-slot:body>
      <p>{{participant.name}}</p>
      <p>{{participant.id_number}}</p>
      <button class="primary" v-for="exam in exams" :key="exam.id" @click="handleStart(exam)" v-show="exam.exam.in_time || exam.status == 'start'">{{ exam.status == 'start' ? 'Lanjutkan' : 'Mulai'}}</button>
      <button class="secondary" @click="logout">Keluar</button>
    </template>
    <template v-slot:footer>
      <p>Arunika IT Department 2022</p>
    </template>
  </CardVue>
</template>

<script>
import CardVue from '@/components/CardVue.vue'
import {categories, dashboard} from '../services'
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
      this.participant = res.data.participant
      this.exams = res.data.exams
      console.log(res)
    },
    logout(){
      localStorage.removeItem("token")
      window.location.reload()
    },
    async handleStart(exam){
      if(exam.status == 'start'){
        const cats = await categories(exam.exam_id)
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
