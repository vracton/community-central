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
  
    document.getElementById("content").innerHTML = ""
    for (let i of content){
      let div1 = document.createElement("div")
      div1.classList.add("vCard")
      let img = document.createElement("img")
      img.src = i.img
      div1.appendChild(img)
      let div2 = document.createElement("div")
      div2.id = "blur"
      let p1 = document.createElement("p")
      p1.classList.add("postTitle")
      p1.innerText = i.title
      let p2 = document.createElement("p")
      p2.classList.add("postDesc")
      p2.innerText = i.desc
      let p3 = document.createElement("p")
      p3.classList.add("details")
      p3.innerText = `${i.loc} • ${i.date}, ${i.time}`
      let btn = document.createElement('button')
      btn.innerText = "Sign Up"
      console.log(i.signups)
      if (i.signups.length>0){
        if (i.signups.indexOf(localStorage.getItem("email"))!=-1){
          btn.innerText = "Signed Up"
        }
      }
      btn.classList.add("signUpBtn")
      div2.appendChild(btn)
      div2.appendChild(p1)
      div2.appendChild(p2)
      div2.appendChild(p3)
      div1.appendChild(div2)
      document.getElementById("content").appendChild(div1)
      btn.addEventListener("click", function(){
        if (btn.innerText=="Sign Up"){
          btn.innerText = "Signed Up"
          fetch(`../subscribeToPost/${i.title}/${localStorage.getItem("email")}/`).then(()=>{
            refresh()
          })
        }
      })
    }
  })();
}
