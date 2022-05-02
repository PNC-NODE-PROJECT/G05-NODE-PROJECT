if(sessionStorage.userId){
    location.href = "view/menu/menu.js"
}else{
    setTimeout("preventBack()", 0);
}