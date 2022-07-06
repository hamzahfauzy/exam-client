<template>
    <CardVue>
        <template v-slot:header>
            <div id="sticky" :class="{ fixed: isFixed }" class="between">
                <h2 v-if="!$route.params.id.includes('demo')">{{selectedCategory.name}}</h2>
                <p v-if="selectedCategory.has_timer && selectedCategory.has_timer != 'No'">{{ count }}</p>
            </div>
        </template>
        <template v-slot:body>
            <div v-for="(post, post_idx) in selectedCategory.posts" :key="post.id" class="exam">
                <div class="exam-content" v-html="post.post_content"></div>
                <template v-if="post.items && post.items.length > 1">
                <div class="option" v-for="(item, item_idx) in post.items" :key="'exam-'+post.id+'-option-'+item.id">
                    <input type="radio" :name="'option-'+post.id" :id="'exam-'+post.id+'-option-'+item.id" @change="handleAnswer(post,item, post_idx, item_idx)" :checked="parseInt(item.selected)">
                    <label :for="'exam-'+post.id+'-option-'+item.id" v-html="item.post_content"></label>
                </div>
                </template>
                <template v-if="post.items && post.items.length == 1">
                    <input type="text" maxlength="2" @change="handleAnswer(post, $event.target.value)">
                </template>
            </div>
            <div class="between">
                <!-- <button class="one secondary" @click="handlePrev">Kembali</button> -->
                <button class="full primary" @click="handleNext">{{nextText}}</button>
            </div>
        </template>
        <template v-slot:footer>
            <p>Arunika IT Department 2022</p>
        </template>
    </CardVue>
</template>

<script>
    import CardVue from '@/components/CardVue.vue'
    import { answer, logout, category, finish, saveCategoryIndex } from '@/services'

    export default {
        components:{
            CardVue
        }, 
        data: ()=>({
            isFixed:false,
            selectedCategory:{},
            interval:null,
            counts: [],
            count: "00:00:00",
            time: 0,
            selectedCategoryIdx:localStorage.getItem('selectedCategory'),
            categories:JSON.parse(localStorage.getItem("categories")),
            nextText:'Sedang Memuat Soal...'
        }),
        async created(){
            window.addEventListener('scroll', this.handleScroll);
            await this.load()
        }, 
        computed:{
            currentCategory(){
                return this.categories[this.selectedCategoryIdx]
            },
        },
        methods:{
            handleScroll(){
                if (window.scrollY >= 100) {
                    this.isFixed = true
                } else {
                    this.isFixed = false
                }
            },
            async load(){
                var exam_id = this.$route.params.id
                const res =  await category(this.currentCategory.id, exam_id)
                if(res.message == "Unauthorized")
                {
                    logout()
                    this.$router.push({'name':'login'});
                }

                this.selectedCategory = res.data
                let timer = res.data.has_timer
                if (timer == "Countdown") {
                    this.selectedCategory.countdown = this.currentCategory.countdown
                    this.counts = this.selectedCategory.countdown.split(':')
                    this.time = parseInt(this.counts[2])
                    this.time += parseInt(this.counts[1]) * 60
                    this.time += (parseInt(this.counts[0]) * 60) * 60

                    this.countdown()
                }

                this.nextText = this.selectedCategoryIdx == this.categories.length-1 ? 'Selesai' : 'Selanjutnya'
            },
            countdown() {
                this.interval = setInterval(() => {
                    var compareDate = new Date();
                    var additional = compareDate.getTime() + (parseInt(this.time)*1000);
                    var dateEntered = new Date(additional); //just for this demo today + 7 days
                    
                    var now = new Date();
                    var difference = dateEntered.getTime() - now.getTime();

                    if (difference <= 0) {

                        // Timer done
                        this.handleNext()
                    
                    } else {
                        var seconds = Math.floor(difference / 1000);
                        var minutes = Math.floor(seconds / 60);
                        var hours = Math.floor(minutes / 60);
                        // var days = Math.floor(hours / 24);

                        hours %= 24;
                        minutes %= 60;
                        seconds %= 60;

                        this.count = `${hours}:${minutes}:${seconds}`

                        this.selectedCategory.countdown = `${hours}:${minutes}:${seconds}`

                        this.categories[this.selectedCategoryIdx] = this.selectedCategory

                        localStorage.setItem("categories",JSON.stringify(this.categories))

                        this.time--
                    }
                }, 1000);
            },
            oldcountdown() {
                this.interval = setInterval(() => {

                    if (this.counts[1] < 0 && this.counts[0] > 0) {
                        this.counts[0] -= 1
                        this.counts[1] = 59
                    }

                    if (this.counts[2] < 0 && this.counts[1] > 0) {
                        this.counts[1] -= 1
                        this.counts[2] = 59
                    }

                    if (this.time <= 0) {
                        this.handleNext()
                    } else {
                        this.count = `${this.counts[0]}:${this.counts[1]}:${this.counts[2]}`
                    }

                    this.counts[2]--;
                    this.time--;

                    this.selectedCategory.countdown = `${this.counts[0]}:${this.counts[1]}:${this.counts[2]}`

                    this.categories[this.selectedCategoryIdx] = this.selectedCategory

                    localStorage.setItem("categories",JSON.stringify(this.categories))

                }, 1000)
            },
            async handlePrev(){
                await clearInterval(this.interval)
                if(this.selectedCategoryIdx == 0){
                    this.$router.go(-1)
                }else{
                    this.selectedCategoryIdx = parseInt(this.selectedCategoryIdx)-1
                    localStorage.setItem('selectedCategory',this.selectedCategoryIdx)
                    // window.location.reload()
                    await this.load()
                }
            },
            async handleNext(){
                if(this.nextText == "Tunggu Sebentar ...")
                {
                    alert("Silahkan tunggu sebentar")
                    return
                }

                if(this.nextText == "Sedang Memuat Soal...")
                {
                    alert("Sedang Memuat Soal")
                    return
                }

                if(this.selectedCategory.test_tool == 'HOLLAND' && this.selectedCategory.posts[0].post_as == 'Soal')
                {
                    // check required
                    var numberOfChoice = 5
                    var allRadio = document.querySelectorAll('input[type=radio]').length
                    var questions = allRadio / numberOfChoice
                    var selected = document.querySelectorAll('input[type=radio]:checked').length

                    if(questions != selected)
                    {
                        alert("Maaf! Silahkan jawab semua soal terlebih dahulu.")
                        return
                    }
                }
                this.nextText = "Tunggu Sebentar ..."
                await clearInterval(this.interval)

                if(!this.$route.params.id.includes('demo'))
                {
                    // save category index
                    saveCategoryIndex(this.$route.params.id, this.selectedCategoryIdx)
                }

                if (this.selectedCategoryIdx == this.categories.length - 1){
                    var c = confirm('Apakah anda yakin akan menyelesaikan ujian ?')
                    if(!c)
                    {
                        return 
                    }
                    if(this.$route.params.id.includes('demo'))
                    {
                        localStorage.removeItem('selectedCategory')
                        localStorage.removeItem('categories')
                        this.$router.push({name:'finish'})
                        return
                    }
                    let data = new FormData()
                    data.append('exam_id', this.$route.params.id)
                    try {
                        const res = await finish(data)
                        if(res.message == "Unauthorized")
                        {
                            logout()
                            this.$router.push({'name':'login'});
                        }
    
                        localStorage.removeItem('selectedCategory')
                        localStorage.removeItem('categories')
                        this.$router.push({name:'finish'})
                    } catch (error) {
                        this.nextText = 'Selanjutnya'
                    }
                }else{
                    this.selectedCategoryIdx = parseInt(this.selectedCategoryIdx)+1
                    localStorage.setItem('selectedCategory',this.selectedCategoryIdx)
                    // window.location.reload()
                    await this.load()
                    window.scrollTo(0,0);
                }
            },
            async handleAnswer(question,ans,post_idx = -1,item_idx = -1){
                var _answer = ''
                if(post_idx > -1)
                {
                    this.selectedCategory.posts[post_idx].items.forEach(el => el.selected = 0)
                    this.selectedCategory.posts[post_idx].items[item_idx].selected = 1
                    _answer = ans.id
                }
                else
                {
                    if(ans.length <= 1)
                    {
                        return
                    }

                    _answer = ans
                }
                if(this.$route.params.id.includes('demo'))
                {
                    return {}
                }
                let data = new FormData()
                data.append('exam_id', this.$route.params.id)
                data.append('question_id',question.id)
                data.append('answer_id',_answer)
                try {
                    const res = await answer(data)
                    if(res.message == "Unauthorized")
                    {
                        logout()
                        this.$router.push({'name':'login'});
                    }
                } catch (error) {
                    this.handleAnswer(question, ans, post_idx, item_idx)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>