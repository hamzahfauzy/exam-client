<template>
  <CardVue>
    <template v-slot:header>
      <img src="../assets/logo.png" alt="logo" width="250">
      <h2>Arunika Test Platform</h2>
    </template>
    <template v-slot:body>
      <div v-if="participant">
        <p><b>{{participant.name}}</b></p>
        <p>{{participant.id_number}}</p>
        <br>
        <template v-for="exam in exams" :key="exam.id">
          <p>{{exam.exam.name}}</p>
          <p>{{exam.exam.start_time}}</p>
          <a :href="exam.exam.video_url" target="_blank" class="btn btn-home primary">Video Tutorial</a>
          <button class="btn-home primary" @click="handleStart('demo'+exam.exam.id)">Uji Coba</button>
          <button class="btn-home primary" v-show="!exam.exam.in_time && exam.status == ''">Tidak ada ujian</button>
          <button class="btn-home primary" @click="handleStart(exam)" v-show="exam.exam.in_time && exam.status != 'finish'">{{ exam.status == 'start' ? 'Lanjutkan' : 'Mulai'}}</button>
          <button class="btn-home primary" v-show="exam.status == 'finish'">Ujian telah selesai dilaksanakan</button>
        </template>
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

      localStorage.setItem('participant',JSON.stringify(this.participant))
    },
    doLogout(){
      logout()
      this.$router.push({'name':'login'});
    },
    async handleStart(exam){
      var exam_id = ''
      if((typeof exam) == "string")
      {
        exam_id = exam.replace('demo','')
      }
      else
      {
        exam_id = exam.exam_id
      }
      const cats = await categories(exam_id)
      if(cats.message == "Unauthorized")
      {
          this.doLogout()
      }
      localStorage.setItem('categories',JSON.stringify(cats.data))
      if(exam.status == 'start'){
        localStorage.setItem('selectedCategory', exam.category_index ?? 0)
        this.$router.push({ name: 'exam', params: { id: exam_id } })
      }else{
        if((typeof exam) == "string")
        {
          this.$router.push({name:'start',params:{id:exam}})
        }
        else
        {
          this.$router.push({name:'start',params:{id:exam_id}})
        }
      }
    }
  }
}
</script>
