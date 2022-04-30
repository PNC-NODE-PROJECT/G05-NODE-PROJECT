
const URL = "http://localhost:3000/questions";
const usersURL = "http://localhost:3000/login";

function hide(element){
    element.style.display = "none";
};

function show(element){
    element.style.display = "block";
};
let questionLength=0
function displayAllQuestions() {
    // hide(result);
    while(playQuiz.firstChild){    
        playQuiz.removeChild(playQuiz.lastChild);
    }
    axios.get(URL).then((response) => {
        let questions = response.data;
        questionLength = questions.length;
        for (let i = 0; i < questions.length; i++) {
            let answers = questions[i].answers;
            // create card container of question
            let card = document.createElement("div");
            card.className = "card m-auto col-lg-6 col-sm-8 col-12 mb-2";
            // card header of question
            let cardHeader = document.createElement("div");
            cardHeader.className = "card-header text-center";
            // create h4 and append it to card header
            let h4 = document.createElement("h4");
            h4.textContent = questions[i].title;
            cardHeader.appendChild(h4);
            // create card body
            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            for(let n = 0; n < answers.length; n++) {
                let choice = document.createElement("button");
                choice.className = "choice col btn btn-primary text-center p-2 m-1";
                choice.textContent = answers[n].value;
                if(answers[n].status == true){
                    choice.id = "true";
                }
                // appendChild to cardBody
                cardBody.appendChild(choice);
            };
            // create card footer
            let cardFooter = document.createElement("div");
            cardFooter.className = "card-footer m-auto col-12 d-flex justify-content-sm-between";

            let p = document.createElement("p");
            p.textContent = i+1+"/" + questions.length + "questions";

            let btnNext = document.createElement("button");
            btnNext.className = "btn btn-next col-lg-2 col-4";
            btnNext.textContent = "Next";
            // appendChild to cardFooter
            cardFooter.appendChild(p);
            cardFooter.appendChild(btnNext);
            // append child to card
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);
            // append card to DOM
            playQuiz.appendChild(card);
            
            const btn = document.querySelectorAll(".btn-next");
            if (currentQuestionIndex == i) {
                if (currentQuestionIndex == parseInt(questions.length) - 1) {
                    btn[i].textContent = "Submit";
                    btn[i].className = "btn btn-submit col-lg-2 col-4";
                }
                show(card);
                hide(result);
            } else {
                hide(card);
                // if(resultDiv){
                //     resultDiv.remove();
                // }
                // hide(result);
            }
            const choices = document.querySelectorAll(".choice");
            choiceAnswer(choices,btn[i]);

        };
        // showResult(questions.length);
        if(currentQuestionIndex == questionLength){
            showResult(questionLength);
        }
    });
};
function computeScore(){
    if(correct){
        score +=1;
    }
    console.log(score);
    correct = false;
}

function showResult(numQuestions){
    // axios.get(usersURL).then((response)=>{
        //     console.log(response.data);
        // });
    const scorePerCent = Math.round((100 * score) / numQuestions);
    let resultDiv = document.createElement("div");
    resultDiv.className = "resultDiv";
    let scoreContent = document.createElement("h1");
    // scoreContent.className = "text-success";
    console.log(scorePerCent);
    scoreContent.textContent = scorePerCent+" %";
    let comment = document.createElement("h4");
    if (scorePerCent <= 20) {
        comment.textContent = "VERY BAD!!";
        comment.className = "text-danger mt-4";
        scoreContent.className = "text-danger mt-4";
    } else if (scorePerCent <= 40) {
        comment.textContent = "NEED IMPROVEMENT!!";
        comment.className = "text-danger mt-4";
        scoreContent.className = "text-danger mt-4";
    } else if (scorePerCent <= 60) {
        comment.textContent = "FAIR!!";
        comment.className = "text-info mt-4";
        scoreContent.className = "text-info mt-4";
    } else if (scorePerCent <= 80) {
        comment.textContent = "GOOD JOB!!";
        comment.className = "text-primary mt-4";
        scoreContent.className = "text-primary mt-4";
    } else {
        comment.textContent = "NICELY DONE!!";
        comment.className = "text-success mt-4";
        scoreContent.className = "text-success mt-4";
    }
    let buttonBack = document.createElement("a");
    buttonBack.className = "btn btn-primary mt-4 mb-4";
    buttonBack.textContent = "Back to Login";
    buttonBack.href = "../../index.html";
    resultDiv.appendChild(scoreContent);
    resultDiv.appendChild(comment);
    resultDiv.appendChild(buttonBack);
    result.append(resultDiv);
    show(result);
}
// choice answer parameter choice is the DOM parameter btn is the btn next
let correct = false;
function choiceAnswer(choices,btn) {
// console.log(questionLength)
    for (let n = 0; n < choices.length; n++) {
        let isClick = false;
        choices[n].addEventListener("click",()=>{
            // let correct = false;
            isClick = true;
            if(choices[n].id){
                choices[n].disabled = true;
                choices[n].style.backgroundColor = "green";
                correct = true;
                // score+=1;
            }else{
                choices[n].style.backgroundColor = "red";
            }
            for(let i=0;i<choices.length;i++){
                if(i!=n){
                    choices[i].disabled = true;
                }
            }
            btn.className = "btn btn-primary col-lg-2 col-4";
            btn.addEventListener("click", incress);
        })
    }
    if(correct){
        score +=1;
    }
    console.log(score);
    correct = false;
}


function incress() {
    currentQuestionIndex ++;
    displayAllQuestions(); 
}
let score = 0;
let currentQuestionIndex = 0;
const playQuiz = document.querySelector(".play-quiz");
const result = document.querySelector(".result-container");
let resultDiv = document.querySelector(".resultDiv");
// hide(result);
displayAllQuestions();