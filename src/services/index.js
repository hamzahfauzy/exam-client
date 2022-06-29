const API_URL = process.env.VUE_APP_API_URL

async function login(data){
    const res = await fetch(API_URL +'index.php?module=auth/login',{
        method:'POST',
        body:data
    })
    const json = await res.json()
    localStorage.setItem('token',json.data.auth_key)
    return json
}

async function dashboard(){
    const token = localStorage.getItem("token")
    const res = await fetch(API_URL +'index.php?module=dashboard/index',{
        headers:{
            'Authorization':'Bearer '+token,
        }
    })
    const json = await res.json()
    return json
}

async function start(data){
    const token = localStorage.getItem("token")
    const res = await fetch(API_URL +'index.php?module=sequences/start',{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+token,
        },
        body:data
    })
    const json = await res.json()
    return json
}

async function categories(id){
    const token = localStorage.getItem("token")
    const res = await fetch(API_URL +'index.php?module=sequences/categories&exam_id='+id,{
        headers:{
            'Authorization':'Bearer '+token,
        }
    })
    const json = await res.json()
    return json
}

async function category(id){
    const token = localStorage.getItem("token")
    const res = await fetch(API_URL +'index.php?module=sequences/single-categories&category_id='+id,{
        headers:{
            'Authorization':'Bearer '+token,
        }
    })
    const json = await res.json()
    return json
}

async function answer(data){
    const token = localStorage.getItem("token")
    const res = await fetch(API_URL +'index.php?module=sequences/answer',{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+token,
        },
        body:data
    })
    const json = await res.json()
    return json
}

async function finish(data){
    const token = localStorage.getItem("token")
    const res = await fetch(API_URL +'index.php?module=sequences/finish',{
        method:'POST',
        headers:{
            'Authorization':'Bearer '+token,
        },
        body:data
    })
    const json = await res.json()
    return json
}

export {login,dashboard,start,categories,category,answer,finish}