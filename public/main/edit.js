
// require("dotenv").config();
function displayAllQuestions(){
    hide(addForm);
    show(editHeader);
    show(quizContainer);
    while(quizContainer.firstChild){
        quizContainer.removeChild(quizContainer.lastChild);
      }
    let URL = "http://localhost:3000/questions";
    axios.get(URL).then((response)=>{
        let questions = response.data;
        questions.forEach(question => {
            let questionContainer = document.createElement("div");
            questionContainer.className="card w-100 m-3 p-3"
            let title = document.createElement("span");
            // console.log(question.title);
            title.className = "font-weight-bold";
            title.textContent = question.title;
            questionContainer.appendChild(title);
            let answerContainer = document.createElement("div");
            let answers = question.answers;
            answers.forEach(answer => {
                let oneAnswer = document.createElement("div");
                let radio = document.createElement("input");
                radio.className = "ml-2"
                radio.type="radio";
                if(answer.status==true){
                    radio.checked = true;
                }else{
                    radio.disabled = true
                }
                let label = document.createElement("label");
                label.textContent = answer.value;
                label.className="ml-2"
                oneAnswer.appendChild(radio);
                oneAnswer.appendChild(label);
                answerContainer.appendChild(oneAnswer);
            });
            let editMaterial = document.createElement("div");
            editMaterial.className="d-flex justify-content-end"
            let editBtn = document.createElement("button");
            editBtn.textContent="Edit"
            editBtn.className = "btn btn-primary mr-3 edit"
            editMaterial.appendChild(editBtn);
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent="Delete"
            deleteBtn.id = question._id;
            deleteBtn.className = "btn btn-danger delete";
            editMaterial.appendChild(deleteBtn);
            questionContainer.appendChild(answerContainer);
            questionContainer.appendChild(editMaterial);
            quizContainer.appendChild(questionContainer);
        });
    })
}
function hide(element){
    element.style.display = "none";
}

function show(element){
    element.style.display = "block";
}

function addQuestion(){
    hide(editHeader);
    hide(quizContainer);
    show(addForm);
}

function createQuestion(e){
    e.preventDefault();
    let URL = "http://localhost:3000/questions";
    let questionText = questionTitle.value;
    let choices = [];
    answerAll.forEach(answer=> {
        let object = {};
        object.value = answer.value;
        let radio = answer.previousElementSibling.firstElementChild.firstElementChild;
        console.log(radio);
        if(radio.checked){
            object.status = true;
        }
        console.log(object);
        choices.push(object);
        answer.value = "";
        radio.checked = false;
    });
    axios.post(URL,{title:questionText,answers:choices})
    displayAllQuestions();
    questionTitle.value="";
}



let quizContainer = document.querySelector(".questionView");
let addQuestions = document.querySelector(".addQuestions");
let addForm = document.querySelector(".add");
let editHeader = document.querySelector(".editHeader");
let create = document.querySelector(".create");
let questionTitle = document.querySelector("#title");
let answerAll = document.querySelectorAll(".choice")
addQuestions.addEventListener("click",addQuestion);
create.addEventListener("click",createQuestion);
// getQuestions();
displayAllQuestions();