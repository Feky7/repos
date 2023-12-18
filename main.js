let userName = document.querySelector("#userName");
let myForm = document.querySelector("#myForm");
let result = document.querySelector(".result");
myForm.addEventListener("submit", function (e) {
  document.querySelectorAll(".repos").forEach((el)=>el.remove());
  e.preventDefault();
  if (userName.value === "") {
    let div = document.createElement("div");
    div.className = "required";
    result.appendChild(div);
    div.textContent = "Github Username Required";
  } else {
    let div = document.querySelector(".required");
    if (div !== null) {
      div.remove();
    }
    fetch(`https://api.github.com/users/${userName.value}/repos`)
      .then((repo) => {
        if (repo.status == 200) {
          return repo.json();
        } else {
          function userNotFound() {
            let div = document.createElement("div");
            div.className = "required";
            result.appendChild(div);
            div.textContent = "Github Username Not Found";
          }
          userNotFound();
        }
      })
      .then((repo) => {
        repo.forEach((e) => {
          let div = document.createElement("div");
          div.className="repos";
          result.appendChild(div);
          div.textContent = e.name;
        });
      });
  }
});
