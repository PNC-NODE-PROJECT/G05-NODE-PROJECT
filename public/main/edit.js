
// require("dotenv").config();
function displayAllQuestions(){
    hide(addForm);
    hide(updateForm);
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
            questionContainer.className="card w-100 m-3 p-3";
            questionContainer.id = question._id;
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
            editBtn.className = "btn btn-primary mr-3";
            editBtn.id = "edit";
            editMaterial.appendChild(editBtn);
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent="Delete"
            deleteBtn.className = "btn btn-danger";
            deleteBtn.id = "delete"
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

function showForm(){
    hide(editHeader);
    hide(quizContainer);
    hide(updateForm);
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
let id ;
function editQuestions(e){
    e.preventDefault();
    let query = "http://localhost:3000/questions/"
    id = e.target.parentNode.parentNode.id;
    console.log(id);
    console.log(e.target.id)
    if (e.target.id === "delete") {
        // console.log(e.target.parentNode.id);
        let isExecuted = confirm("Are you sure to delete this task?");
        if (isExecuted) {
        // TODO: Request to the server to detele one task
            axios.delete(query+id).then((response)=>{
                console.log("delete success");
                displayAllQuestions();
            })
        }
    } else if (e.target.id === "edit"){
        // TODO: Request to the server to update one task as completed
            // showForm();
        hide(editHeader);
        hide(quizContainer);
        show(updateForm);
        axios.get(query+id).then((response)=>{
            let question = response.data[0];
            questionTitleEdit.value = question.title;
            console.log(questionTitleEdit.value);
            let answer = question.answers;
            let array=[];
            for(let i=0; i<answerAllEdit.length;i++){
                let object = {};
                answerAllEdit[i].value = answer[i].value;
                object.value = answerAllEdit[i].value;
                let radio = answerAllEdit[i].previousElementSibling.firstElementChild.firstElementChild;
                if(answer[i].status){
                    radio.checked=true;
                }
                object.status = answer[i].status;
                array.push(object);
            }
            console.log(array)
            console.log(answerAllEdit);
        });
            // console.log("update success");
    }
}
function update(e){
    let query = "http://localhost:3000/questions/";
    questionTitle = questionTitleEdit.value;
    let choices = [];
    answerAllEdit.forEach(answer=> {
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
    axios.put(query+id,{title:questionTitle,answers:choices}).then((response)=>{
        console.log("Update Success");
    });
    displayAllQuestions();
    questionTitleEdit.value="";
}

let quizContainer = document.querySelector(".questionView");
let addQuestions = document.querySelector(".addQuestions");
let addForm = document.querySelector(".add");
let editHeader = document.querySelector(".editHeader");
let create = document.querySelector(".create");
let questionTitle = document.querySelector(".title");
let questionTitleEdit = document.querySelector("#title");
let answerAll = document.querySelectorAll(".choice");
let answerAllEdit = document.querySelectorAll(".choiceEdit");

let updateForm = document.querySelector(".update");
let updateQuestion = document.querySelector(".edit");
updateQuestion.addEventListener("click",update)
addQuestions.addEventListener("click",showForm);
create.addEventListener("click",createQuestion);
quizContainer.addEventListener("click",editQuestions);
// getQuestions();
displayAllQuestions();