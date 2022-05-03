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
    let URL = "http://localhost:3000/questions";
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
    });
    answerAll.forEach(answer => {
        answer.value = "";
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
    let URL = "http://localhost:3000/questions";
    let questionText = questionTitle.value;
    let choices = [];
    let selected = 0;
    answerAll.forEach(answer=> {
        let object = {};
        object.value = answer.value;
        let radio = answer.previousElementSibling.firstElementChild.firstElementChild;
        console.log(radio);
        if(radio.checked){
            object.status = true;
            selected+=1;
        }
        console.log(object);
        choices.push(object);
        // answer.value = "";
        radio.checked = false;
    });
    hide(document.querySelector(".btnBack"));
    if(questionText == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Question cannot be empty!!!',
        })
    }else if(!checkValidationAnswers(choices)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Answer choices cannot be blank!!!',
        })
    }else if(selected!=1){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You need to choose the correct answer!!',
        })
    }else if(!checkDuplicatedAnswers(choices)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Answer choices cannot be the same!!!",
        })
        questionTitle.value=questionText;
    }else{
        axios.post(URL,{title:questionText,answers:choices})
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Question created successfully',
            showConfirmButton: false,
            timer: 1500
          })
        displayAllQuestions();
    }
}

function checkValidationAnswers(array){
    console.log(array);
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
    console.log(id);
    console.log(e.target.id)
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
                Swal.fire(
                    'Deleted!',
                    )
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
            console.log(questionTitleEdit.value);
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
        radio.checked = false;
    });
    if(questionTitle == ""){
        alert("Question cannot be empty!!!")
    }else if(!checkValidationAnswers(choices)){
        alert("Answer choices cannot be blank!!!")
    }else if(!checkDuplicatedAnswers(choices)){
        alert("Answer choices cannot be the same!!!")
    }else{
        axios.put(query+id,{title:questionTitle,answers:choices}).then((response)=>{
            console.log("Update Success");
            displayAllQuestions();
        });
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