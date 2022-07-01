<template>
    <CardVue>
        <template v-slot:header>
            <div class="between">
                <h2>{{selectedCategory.name}}</h2>
                <p v-if="selectedCategory.has_timer">{{ count }}</p>
            </div>
        </template>
        <template v-slot:body>
            <div v-for="post in selectedCategory.posts" :key="post.id" class="exam">
                <p v-html="post.post_content"></p>
                <div class="option" v-for="item in post.items" :key="'exam-'+post.id+'-option-'+item.id"
                    @click="handleAnswer(post,item)">
                    <input type="radio" name="konten" :id="'exam-'+post.id+'-option-'+item.id">
                    <label :for="'exam-'+post.id+'-option-'+item.id" v-html="item.post_content"></label>
                </div>
            </div>
            <div class="between">
                <!-- <button class="one secondary" @click="handlePrev">Kembali</button> -->
                <button class="two primary" @click="handleNext">{{selectedCategoryIdx == categories.length-1 ? 'Selesai'
                : 'Selanjutnya'}}</button>
            </div>
        </template>
        <template v-slot:footer>
            <p>Arunika IT Department 2022</p>
        </template>
    </CardVue>
</template>

<script>
    import CardVue from '@/components/CardVue.vue'
    import { answer, category, finish, saveCategoryIndex } from '@/services'

    export default {
        components:{
            CardVue
        }, 
        data: ()=>({
            selectedCategory:{},
            interval:null,
            counts: [],
            count: "00:00:00",
            time: 0,
            selectedCategoryIdx:localStorage.getItem('selectedCategory'),
            categories:JSON.parse(localStorage.getItem("categories"))
        }),
        async created(){
            await this.load()
        }, 
        computed:{
            // categories(){
            //     return JSON.parse(localStorage.getItem("categories"))
            // },
            // selectedCategoryIdx(){
            //     return parseInt(localStorage.getItem('selectedCategory'))
            // },
            currentCategory(){
                return this.categories[this.selectedCategoryIdx]
            },
        },
        methods:{
            async load(){
                // save category index
                console.log(this.selectedCategoryIdx)
                saveCategoryIndex(this.$route.params.id, this.selectedCategoryIdx)

                const res =  await category(this.currentCategory.id)
                this.selectedCategory = res.data
                if (res.data.has_timer == "Countdown") {
                    this.selectedCategory.countdown = this.currentCategory.countdown
                    this.counts = this.selectedCategory.countdown.split(':')
                    this.time = parseInt(this.counts[2])
                    this.time += parseInt(this.counts[1]) * 60
                    this.time += (parseInt(this.counts[0]) * 60) * 60
                }

                if (this.selectedCategory.has_timer == "Countdown")
                    this.countdown()
            },
            countdown() {
                this.interval = setInterval(() => {

                    if (this.counts[1] < 0 && this.counts[0] > 0) {
                        this.counts[0] -= 1
                        this.counts[1] = 59
                    }

                    if (this.counts[2] < 0 && this.counts[1] > 0) {
                        this.counts[1] -= 1
                        this.counts[2] = 59
                    }

                    if (this.time == 0) {
                        this.handleNext()
                    } else {
                        this.count = `${this.counts[0]}:${this.counts[1]}:${this.counts[2]}`
                    }

                    this.counts[2]--;
                    this.time--;

                    this.selectedCategory.countdown = `${this.counts[0]}:${this.counts[1]}:${this.counts[2]}`

                    // this.categories.forEach( (cat) => {
                    //     if (cat.id == this.selectedCategory.id) {
                    //         cat.countdown = this.selectedCategory.countdown
                    //     }
                    // }, this.categories)

                    this.categories[this.selectedCategoryIdx] = this.selectedCategory

                    localStorage.setItem("categories",JSON.stringify(this.categories))

                }, 1000)
            },
            async handlePrev(){
                await clearInterval(this.interval)
                if(this.selectedCategoryIdx == 0){
                    this.$router.go(-1)
                }else{
                    this.selectedCategoryIdx = this.selectedCategoryIdx-1
                    localStorage.setItem('selectedCategory',this.selectedCategoryIdx)
                    // window.location.reload()
                    await this.load()
                }
            },
            async handleNext(){
                await clearInterval(this.interval)
                if (this.selectedCategoryIdx == this.categories.length - 1){
                    let data = new FormData()
                    data.append('exam_id', this.$route.params.id)
                    const res = await finish(data)
                    console.log(res)
                    this.$router.push({name:'finish'})
                }else{
                    this.selectedCategoryIdx = this.selectedCategoryIdx+1
                    localStorage.setItem('selectedCategory',this.selectedCategoryIdx)
                    // window.location.reload()
                    await this.load()
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