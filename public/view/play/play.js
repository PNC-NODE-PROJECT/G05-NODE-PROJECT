const URL = "http://localhost:3000/questions";

function hide(element){
    element.style.display = "none";
};

function show(element){
    element.style.display = "block";
};

function displayAllQuestions() {
    while(playQuiz.firstChild){    
        playQuiz.removeChild(playQuiz.lastChild);
    }
    axios.get(URL).then((response) => {
        let questions = response.data;
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
            } else {
                hide(card);
            }
            const choices = document.querySelectorAll(".choice");
            choiceAnswer(choices,btn[i]);
        };
    });
};

// choice answer parameter choice is the DOM parameter btn is the btn next
function choiceAnswer(choices,btn) {
    for (let n = 0; n < choices.length; n++) {
        let isClick = false;
        choices[n].addEventListener("click",()=>{
            isClick = true;
            choices[n].style.backgroundColor = "green";
            btn.className = "btn btn-primary col-lg-2 col-4";
            btn.addEventListener("click", incress);
            if (isClick) {
                for(let i=0;i<choices.length;i++){
                    if(i!=n){
                        choices[i].disabled = true;
                    }
                }
            }
        })
    }
}

function incress() {
    currentQuestionIndex ++;
    displayAllQuestions();
}

let currentQuestionIndex = 0;
const playQuiz = document.querySelector(".play-quiz");
displayAllQuestions();