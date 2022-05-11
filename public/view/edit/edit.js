// Check if you have log in already
if(!sessionStorage.userId){
    location.href = "../../index.html"
}
// Display all the questions 
function displayAllQuestions(){
    hide(addForm);
    hide(updateForm);
    show(editHeader);
    show(quizContainer);    
    document.querySelector("body").style.backgroundColor = "#ddd"
    while(quizContainer.firstChild){    
        quizContainer.removeChild(quizContainer.lastChild);
    }
    let URL = "/questions";
    axios.get(URL).then((response)=>{
        let questions = response.data;
        questions.forEach(question => {
            let questionContainer = document.createElement("div");
            questionContainer.className="card w-100 m-3 p-3 shadow p-3 mb-2 bg-white rounded";
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
        console.log(questions.length);
        if (questions.length > 0) {
            show(document.querySelector(".btnBack"));
        } else {
            hide(document.querySelector(".btnBack"));
        }
    });
}
function hide(element){
    element.style.display = "none";
}

function show(element){
    element.style.display = "block";
}

// Show form add question

function showForm(){
    hide(editHeader);
    hide(quizContainer);
    hide(updateForm);
    show(addForm);
    hide(document.querySelector(".btnBack"));
}
// Create questions for the users to play
function createQuestion(e){
    e.preventDefault();
    let URL = "/questions";
    let questionText = questionTitle.value;
    let choices = [];
    let selected = 0;
    answerAll.forEach(answer=> {
        let object = {};
        object.value = answer.value;
        let radio = answer.previousElementSibling.firstElementChild.firstElementChild;
        if(radio.checked){
            object.status = true;
            selected+=1;
        }
        choices.push(object);
    });
    if(questionText == ""){
        Swal.fire({
            icon: 'error',
            title: 'Question cannot be empty!!!',
        })
    }else if(!checkValidationAnswers(choices)){
        Swal.fire({
            icon: 'error',
            title: 'Answer choices cannot be blank!!!',
        })
    }else if(selected!=1){
        Swal.fire({
            icon: 'error',
            title: 'You need to choose the correct answer!!',
        })
    }else if(!checkDuplicatedAnswers(choices)){
        Swal.fire({
            icon: 'error',
            title: "Answer choices cannot be the same!!!",
        })
    } else{
        axios.post(URL,{title:questionText,answers:choices})
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Question created successfully',
            showConfirmButton: false,
            timer: 800
          })
          questionTitle.value = "";
        for(let i=0; i<answerAll.length;i++){
            answerAll[i].value = "";
            let radio = answerAll[i].previousElementSibling.firstElementChild.firstElementChild;
            radio.checked = false;
        };
        displayAllQuestions();
    }
}

function checkValidationAnswers(array){
    let blank = true;
    array.forEach(element => {
        if(element.value == ""){
            blank = false;
        }
    });
    return blank;
}

function checkDuplicatedAnswers(array){
    for(let i = 0;i<array.length;i++){
        for(let j=0;j<array.length;j++){
            if(i!=j && array[i].value == array[j].value){
                return false
            }
        }
    }
    return true
}

let id ;
// Edit questions by id including delete and edit
function editQuestions(e){
    e.preventDefault();
    hide(document.querySelector(".btnBack"));
    let query = "http://localhost:3000/questions/"
    id = e.target.parentNode.parentNode.id;
    if (e.target.id === "delete") {
        Swal.fire({
            title: 'Are you sure want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(query+id).then((response)=>{
                    console.log("delete success");
                    displayAllQuestions();
                });
            }
            show(document.querySelector(".btnBack"));
        });
    }else if (e.target.id === "edit"){
        hide(editHeader);
        hide(quizContainer);
        show(updateForm);
        axios.get(query+id).then((response)=>{
            let question = response.data[0];
            questionTitleEdit.value = question.title;
            let answer = question.answers;
            for(let i=0; i<answerAllEdit.length;i++){
                answerAllEdit[i].value = answer[i].value;
                let radio = answerAllEdit[i].previousElementSibling.firstElementChild.firstElementChild;
                if(answer[i].status){
                    radio.checked=true;
                }
            }
        });
    } else {
        show(document.querySelector(".btnBack"));
    }

}

// update questions base on the new users input
function update(e){
    e.preventDefault();
    let query = "http://localhost:3000/questions/";
    questionTitle = questionTitleEdit.value;
    let choices = [];
    answerAllEdit.forEach(answer=> {
        let object = {};
        object.value = answer.value;
        let radio = answer.previousElementSibling.firstElementChild.firstElementChild;
        if(radio.checked){
            object.status = true;
        }
        choices.push(object);
    });
    if(questionTitle == ""){
        Swal.fire({
            icon: 'error',
            title: 'Question cannot be empty!!!',
        })
    }else if(!checkValidationAnswers(choices)){
        Swal.fire({
            icon: 'error',
            title: 'Answer choices cannot be blank!!!',
        })
    }else if(!checkDuplicatedAnswers(choices)){
        Swal.fire({
            icon: 'error',
            title: "Answer choices cannot be the same!!!",
        })    
    }else{
        axios.put(query+id,{title:questionTitle,answers:choices}).then((response)=>{
            console.log("Update Success");
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Question Updated successfully',
            showConfirmButton: false,
            timer: 800
        })
        displayAllQuestions();
    }
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