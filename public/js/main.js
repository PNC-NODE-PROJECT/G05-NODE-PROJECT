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
    let query = "/user/login";
    axios.post(query,{username:user, password:userPassword}).then((response)=>{
        console.log(response);
        if(response.data){
            hide(loginPage);
            sessionStorage.setItem("userId",response.data._id);
            location.href = "../view/menu/menu.html";
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
    if (checkUsername(userName) && checkPassword(userPassword) && checkEmail(userEmail)){
        let query = "/user";
        axios.get(query).then((response)=>{
            let checkEmail = false;
            let allData = response.data;
            // console.log(allData);
            for(let i=0; i< allData.length;i++){
                console.log(allData[i])
                if(allData[i].email == registerEmail.value){
                    checkEmail = true;
                    console.log(checkEmail)
                }
            }
            console.log(checkEmail);
            if(!checkEmail){
                let query = "/user/register";
                axios.post(query,{username:userName, password:userPassword,email:userEmail})
                .then((response)=>{
                    console.log(response);
                    if(response.data){
                        location.href = "../index.html";
                        console.log("register success");
                    }
                })
                .catch((error)=>{
                    res.send(error);
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'The email had already been used!!!',
                })
                passwordNameCheck.textContent = null;
                userNameCheck.textContent = null;
                emailNameCheck.textContent = null;
            }
        })
    }else{
        if(!checkPassword(userPassword)){
            passwordNameCheck.textContent = "Password should be between 8 and 15 characters!!"
        }else{
            passwordNameCheck.textContent = null;
        }
        if(!checkUsername(userName)){
            userNameCheck.textContent = "Username can't be longer than 30 characters!!"
        }else{
            userNameCheck.textContent = null;
        }
        if(!checkEmail(userEmail)){
            emailNameCheck.textContent = "Email must contain an @ sign"
        }else{
            emailNameCheck.textContent = null;
        }
    }
}

function checkPassword(password){
    let valid = false;
    if(password.length > 8 && password.length < 15){
        valid = true;
    }
    return valid;
}

function checkUsername(username){
    let valid = false;
    if(username.length < 30 && username.length>0){
        valid = true;
    }
    return valid;
}

function checkEmail(email){
    let valid = false;
    for(let i = 0; i<email.length;i++){
        if(email.slice(i,i+1)=="@"){
            valid = true
        }
    }
    return valid;
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
let userNameCheck = document.querySelector(".userNameCheck");
let emailNameCheck = document.querySelector(".emailNameCheck");
let passwordNameCheck = document.querySelector(".passwordNameCheck");


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