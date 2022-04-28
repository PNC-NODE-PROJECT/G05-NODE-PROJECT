// require("dotenv").config();

function hide(element){
    element.style.display="none";
}
function show(element){
    element.style.display = "block"
}
function loginToPlay(e){
    e.preventDefault();
    let user = username.value;
    let userPassword = password.value;
    let query = "http://localhost:3000/login";
    axios.post(query,{username:user, password:userPassword}).then((response)=>{
        console.log(response);
        if(response.data){
            hide(loginPage);
            show(menuPage);
            console.log("login success");
        }else{
            let error = document.createElement("span");
            error.textContent="Incorrect username or password!!";
            error.className = "text-danger";
            log.appendChild(error);
            username.value="";
            password.value="";
        }
    })
}

let login=document.getElementById("login");
let username = document.getElementById("name");
let password = document.getElementById("pass");
let log = document.querySelector(".login");
let loginPage = document.querySelector(".pageLogin");
let menuPage = document.querySelector(".menu");
login.addEventListener("click",loginToPlay)
hide(menuPage);



