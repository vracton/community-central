//add submit on enter if i feel like it

let validLogin = false

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function checkForm(){
  if (document.getElementById("name").value.trim()==""||document.getElementById("name").value.trim().length<3){
    document.querySelector("#mainContent > p").innerHTML = "Enter your name!"
    validLogin = false
  } else if (document.getElementById("com").value.trim()==""||document.getElementById("com").value.trim().length<3){
    document.querySelector("#mainContent > p").innerHTML = "Enter your community!"
    validLogin = false
  } else if (document.getElementById("email").value.trim()==""||!validateEmail(document.getElementById("email").value.trim())){
    document.querySelector("#mainContent > p").innerHTML = "Enter your email!"
    validLogin = false
  } else {
    document.querySelector("#mainContent > p").innerHTML = "Press the button to join!"
    validLogin = true
  }
}

window.onload = () => {
  if (localStorage.getItem("name")&&localStorage.getItem("community")&&localStorage.getItem("email")){
    window.location.href = "../volunteer"
  }
}

document.querySelector("button").addEventListener("click", function(){
  if (validLogin){
    localStorage.setItem("name",document.getElementById("name").value.trim())
    localStorage.setItem("community",document.getElementById("com").value.trim().toLowerCase())
    localStorage.setItem("email",document.getElementById("email").value.trim())
    window.location.href = "../volunteer"
  }
})