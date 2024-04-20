let validLogin = false

window.onload = () => {
  if (!localStorage.getItem("name")||!localStorage.getItem("community")||!localStorage.getItem("email")){
    window.location.href = "../login"
  }
  refresh()
}

document.getElementById("filterPost").addEventListener("click", function(){
  const el = document.getElementsByClassName("dropdown-content")[0]
  if (document.activeElement.id=="filterPost"){
    if (el.style.display=="none"){
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }
})

document.getElementById("createPost").addEventListener("click", function(){
  const el = document.getElementsByClassName("dropdown-content")[0]
  if (document.activeElement.id=="createPost"){
    const title = prompt("Title?")
    const desc = prompt("Description?")
    const loc = prompt("Location?")
    const date = prompt("Date?")
    const time = prompt("Time?")
    const img = encodeURIComponent(prompt("Image?"))
    fetch(`../addPost/${title}/${desc}/${loc}/${date}/${time}/${img}/`).then(()=>{
      refresh()
    })
  }
})

function refresh(){
  (async () => {
    const rawResponse = await fetch('../vData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
  
    document.getElementById("contnet").innerHTML = ""
    for (let i of content){

    }
  })();
}