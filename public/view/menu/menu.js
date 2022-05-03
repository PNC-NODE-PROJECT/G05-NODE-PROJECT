// Check if you have log in already

if(!sessionStorage.userId){
    location.href = "../../index.html"
}

let URL = "http://localhost:3000/questions";
axios.get(URL).then((response)=>{
    console.log(response.data.length);
    if(response.data.length === 0){
        playBtn.disabled = true;
    }
})
let playBtn = document.getElementsByClassName(".play");