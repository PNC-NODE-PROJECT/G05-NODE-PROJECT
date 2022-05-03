// Check if you have log in already

if(!sessionStorage.userId){
    location.href = "../../index.html"
}

function playQuiz(e) {
    e.preventDefault();
    let URL = "http://localhost:3000/questions";
    axios.get(URL).then((response)=>{
        let questions = response.data;
        console.log(questions.length);
        if ( questions.length == 0 ){
            Swal.fire({
                icon: 'error',
                title: 'No questions here!!!',
            })
        } else {
            location.href = "../play/play.html";
        }
    });
}

const btnPlay = document.querySelector(".btn-play");
btnPlay.addEventListener("click", playQuiz);
