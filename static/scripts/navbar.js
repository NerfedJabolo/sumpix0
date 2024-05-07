let hamburger = document.querySelector(".hamburger");
let navbar = document.querySelector(".navbar");
hamburger.addEventListener("click", (event) => {
  navbar.classList.toggle("navbar-resp");
});
