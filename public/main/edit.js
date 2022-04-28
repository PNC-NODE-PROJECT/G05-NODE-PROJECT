
let URL = "http://localhost:3000/questions";
axios.get(URL).then((response)=>{
    let questions = response.data;
    questions.forEach(question => {
        let questionContainer = document.createElement("div");
        let title = document.createElement("span");
        title.className = "font-weight-bold";
        title.textContent = question.title;
        questionContainer.appendChild(title);
        let answerContainer = document.createElement("div");
        let answers = question.answers;
        answers.forEach(answer => {
            let oneAnswer = document.createElement("div");
            let radio = document.createElement("input");
            radio.type="radio";
            if(answer.status==true){
                
            }
            let label = document.createElement("label");
            label.textContent = answer.value;

        });

    });
})
















let quizContainer = document.querySelector(".questionView");