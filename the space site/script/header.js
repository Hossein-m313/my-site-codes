const menu = document.getElementById("menu");
const hamburger_menu_lines = document.querySelectorAll("#menu .hamburger-menu-line");
const underlines = document.querySelectorAll("#menu .menu-contents .underline");
const options = document.querySelectorAll("#menu .menu-contents li");
const back_arrow = document.querySelector("#menu .menu-contents svg");
const video = document.querySelector("#menu video");
const video_cover = document.querySelector("#menu .video-container");
const contents = document.querySelector("#menu .menu-contents");

let is_menu = false;

function closeMenuFunction() {
  if (is_menu) {
    back_arrow.style.animation = "back-arrow-out 0.3s forwards";
    setTimeout(() => {
      video.style.animation = "close-menu-animation-page 0.2s";
      contents.style.animation = "close-menu-animation-page 0.2s";
    }, 300);
    setTimeout(() => {
      hamburger_menu_lines[1].style.animation = "close-menu-animation-line-2 0.5s";
      contents.style.display = "none";
      video.style.display = "none";
      video_cover.style.display = "none";
    }, 700);
    setTimeout(() => {
      hamburger_menu_lines[0].style.animation = "close-menu-animation-line-1 0.2s";
      hamburger_menu_lines[2].style.animation = "close-menu-animation-line-3 0.2s";
      menu.style.cursor = "pointer";
      is_menu = false;
    }, 1000);
  }
}

menu.addEventListener("mouseenter", () => {
  hamburger_menu_lines[0].style.width = "1rem";
  hamburger_menu_lines[2].style.width = "1.5rem";
});
menu.addEventListener("mouseleave", () => {
  hamburger_menu_lines[0].style.width = "2rem";
  hamburger_menu_lines[2].style.width = "2rem";
});
menu.addEventListener("click", () => {
  if (!is_menu) {
    back_arrow.style.animation = "none";
    hamburger_menu_lines[0].style.animation = "open-menu-animation-line-1 0.2s forwards";
    hamburger_menu_lines[2].style.animation = "open-menu-animation-line-3 0.2s forwards";
    menu.style.cursor = "default";
    setTimeout(() => {
      hamburger_menu_lines[1].style.animation = "open-menu-animation-line-2 0.5s forwards";
    }, 200);
    setTimeout(() => {
      video.style.animation = "open-menu-animation-page 0.3s forwards";
      contents.style.animation = "open-menu-animation-page 0.3s forwards";
      video.style.display = "block";
      contents.style.display = "flex";
      video_cover.style.display = "block";
    }, 700);
    setTimeout(() => {
      back_arrow.style.animation = "back-arrow-in 0.5s forwards";
      is_menu = true;
    }, 1000);
  }
});
options.forEach((item, index) => {
  item.addEventListener("mouseover", () => {
    if (index === 0) underlines[0].style.width = "8rem";
    if (index === 1) underlines[1].style.width = "5rem";
    if (index === 2) underlines[2].style.width = "4rem";
    if (index === 3) underlines[3].style.width = "3.5rem";
    if (index === 4) underlines[4].style.width = "4rem";
    if (index === 5) underlines[5].style.width = "4.5rem";
  });
  item.addEventListener("mouseout", () => {
    underlines[index].style.width = "0";
  });
  item.addEventListener("click", closeMenuFunction)
});
back_arrow.addEventListener("click", closeMenuFunction);
