let arrow = document.querySelectorAll(".arrow");

for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);

// 메뉴버튼 클릭 설정
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

var links = document.querySelectorAll(".sidebar a");

links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    window.location = this.href;
  });
});
