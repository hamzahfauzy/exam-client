<template>
    <CardVue>
        <template v-slot:header>
            <div class="between">
                <h2>{{selectedCategory.name}}</h2>
                <p>{{selectedCategory.countdown}}</p>
            </div>
        </template>
        <template v-slot:body>
            <div v-for="post in selectedCategory.posts" :key="post.id" class="exam">
                <p v-html="post.post_content"></p>
                <div class="option" v-for="item in post.items" :key="'exam-'+post.id+'-option-'+item.id" @click="handleAnswer(post,item)">
                    <input type="radio" name="konten" :id="'exam-'+post.id+'-option-'+item.id">
                    <label :for="'exam-'+post.id+'-option-'+item.id" v-html="item.post_content"></label>
                </div>
            </div>
            <div class="between">
                <button class="one secondary" @click="handlePrev">Kembali</button>
                <button class="two primary" @click="handleNext">{{selectedCategoryIdx == categories.length-1 ? 'Selesai' : 'Selanjutnya'}}</button>
            </div>
        </template>
        <template v-slot:footer>
            <p>Arunika IT Department 2022</p>
        </template>
    </CardVue>
</template>

<script>
    import CardVue from '@/components/CardVue.vue'
    import { answer, category, finish } from '@/services'

    export default {
        components:{
            CardVue
        }, 
        data: ()=>({
            selectedCategory:{},
        }),
        created(){
            this.load()
        },  
        computed:{
            categories(){
                return JSON.parse(localStorage.getItem("categories"))
            },
            selectedCategoryIdx(){
                return parseInt(localStorage.getItem('selectedCategory'))
            },
            currentCategory(){
                return this.categories[this.selectedCategoryIdx]
            },
        },
        methods:{
            async load(){
                const res =  await category(this.currentCategory.id)
                this.selectedCategory = res.data
                console.log(res)
            },
            handlePrev(){
                if(this.selectedCategoryIdx == 0){
                    this.$router.go(-1)
                }else{
                    localStorage.setItem('selectedCategory',this.selectedCategoryIdx-1)
                    window.location.reload()
                }
            },
            async handleNext(){
                if (this.selectedCategoryIdx == this.categories.length - 1){
                    let data = new FormData()
                    data.append('exam_id', this.$route.params.id)
                    const res = await finish(data)
                    console.log(res)
                    this.$router.push({name:'finish'})
                }else{
                    localStorage.setItem('selectedCategory',this.selectedCategoryIdx+1)
                    window.location.reload()
                }
            },
            async handleAnswer(question,ans){
                let data = new FormData()
                data.append('exam_id', this.$route.params.id)
                data.append('question_id',question.id)
                data.append('answer_id',ans.id)
                const res = await answer(data)
                console.log(res)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>