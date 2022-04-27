function hide(element){
    element.style.display="none";
}

function loginToPlay(){
    let user = username.value;
    let userPassword = password.value;
    let query = "http://localhost:3000/login";
    axios.post(query,{username:user, password:userPassword}).then((response)=>{
        if(response.data){
            hide(loginPage);
        }else{
            let error = document.createElement("span");
            error.textContent="Incorrect username or password!!";
            error.className = "text-danger";
            log.appendChild(error);
        }
    })
}















let login=document.getElementById("login");
let username = document.getElementById("name");
let password = document.getElementById("pass");
let log = document.getElementsByClassName("login");
let loginPage = document.getElementsByClassName("pageLogin");
login.addEventListener("click",loginToPlay)