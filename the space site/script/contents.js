const aside_pointer = document.getElementById("aside-pointer");
const aside_parts = document.querySelectorAll("aside li a");
const content_titles = document.querySelectorAll(".title");
const contents = document.querySelectorAll(".content");
const aside_bar = document.querySelector("aside .container");

let aside_clicked = false;
function elementIsVisible(el, partiallyVisible = true) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom - 200 > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}
aside_bar.style.height = `${3 * contents.length + 0.5}rem`;
console.log(window.location);
window.addEventListener("hashchange", () => {
  if(!aside_clicked){
    window.location.assign("/html/startmenu.html#contents");
  }else {
    aside_clicked = false;
  }
});
document.addEventListener("scroll", () => {
    var scroll = window.scrollY;
    document.documentElement.dataset.scroll = scroll;
    for (let i = 0; i < content_titles.length; i++) {
      if (
        (elementIsVisible(content_titles[i]), elementIsVisible(contents[i]))
      ) {
        aside_pointer.style.top = `${3 * i}rem`;
        break;
      }
    }
});
aside_parts.forEach((item) => {
  item.addEventListener("click", () => {
    aside_clicked = true;
  });
});
