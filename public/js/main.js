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
    if(document.querySelector(".error")){
        document.querySelector(".error").remove();
    }
    let query = "http://localhost:3000/user/login";
    axios.post(query,{username:user, password:userPassword}).then((response)=>{
        console.log(response);
        if(response.data){
            hide(loginPage);
            location.href = "view/menu/menu.html";
            console.log("login success");
        }else{
            let error = document.createElement("span");
            error.textContent="Incorrect username or password!!";
            error.className = "text-danger error";
            log.appendChild(error);
            username.value="";
            password.value="";
        }
    })
}

// register account
function registerAccount(e){
    e.preventDefault();
    let userName = registerName.value;
    let userPassword = registerPassword.value;
    let userEmail = registerEmail.value;
    if(document.querySelector(".error")){
        document.querySelector(".error").remove();
    }
    if (userPassword != "" && userEmail != "" && userName != ""){
        let query = "http://localhost:3000/user/register";
        axios.post(query,{username:userName, password:userPassword,email:userEmail}).then((response)=>{
            console.log(response);
            if(response.data){
                hide(loginPage);
                location.href = "../../index.html";
                console.log("register success");
            }else{
                let error = document.createElement("span");
                error.textContent="error";
                error.className = "text-danger error";
                log.appendChild(error);
                username.value="";
                password.value="";
            }
        })
    } else {
        alert("You must fill all requirement")
    }
}

let login=document.getElementById("login");
let username = document.getElementById("name");
let password = document.getElementById("pass");
let log = document.querySelector(".login");
let loginPage = document.querySelector(".pageLogin");
let registerName = document.getElementById("username");
let registerPassword = document.getElementById("password");
let registerEmail = document.querySelector("#email");
let register = document.querySelector("#register");
let registerPage = document.querySelector(".pageRegister");

// hide register page
hide(registerPage);

// register link
register.addEventListener("click",(e)=>{
    e.preventDefault();
    show(registerPage);
    hide(loginPage);
    let registerSubmit = document.querySelector("#submit");
    console.log(registerSubmit);
    registerSubmit.addEventListener("click",registerAccount);
});

// login
login.addEventListener("click",loginToPlay);
//register