const pictures_box = document.querySelector(".pictures");
const slide_show = document.querySelector(".slide-show");
const cross_icon = document.querySelector(".cross-icon");
const left_icon = document.querySelector(".left-icon");
const right_icon = document.querySelector(".right-icon");
const slide_show_picture = document.querySelector(".slide-show-picture");
const slide_show_container = document.querySelector(".picture-container");
const picture_tag = document.getElementById("tag2");
const body = document.querySelector("body");
const background = document.getElementById("background");
const menu = document.querySelector(".second-menu");
const hamburger_menu = document.querySelector(".hamburger-menu");
const main_header = document.querySelector(".main-header");
const title = document.querySelector(".title");
const close_menu = document.querySelector(".close-menu");
const picture_items_container = document.querySelector(".picture-options");
const dark_mode = document.getElementById("dark-mode");
const dark_pointer = document.getElementById("dark-bottom-pointer");
const dark_container = document.getElementById("dark-bottom-container");
const dark_icon = document.querySelectorAll(".dark-icon");
const selector_svg = document.querySelector(".selctor-container .svg-icon");
const picture_classes_selector = document.getElementById("first-div");
const selector_options_container = document.getElementById("selector-options-container");
const options_container = document.querySelector(".options");
const url_input_container = document.querySelector(".picture-input");
const brows = document.querySelector(".picture-input p");
const brows_svg = document.querySelector(".picture-input svg");
const url_label = document.getElementById("url-label");
const add_picture_page = document.getElementById("add-picture-page");
const add_picture = document.querySelector(".header-bottom-pictur-box li:last-child");
const add_group = document.querySelector(".header-bottom-pictur-box li:first-child");
const add_group_page = document.getElementById("add-group-page");
const add_group_input = document.querySelector("#add-group-page input");
const add_picture_submit_button = document.querySelectorAll(".buttons-container button");
const add_group_submit_button = document.querySelectorAll("#add-group-page button");
const selector_container = document.getElementById("picture-classes-selector");
const condition_container_list = document.querySelector(".condition-container ul");
const condition_container_list_memebers = document.querySelectorAll(".condition-container ul li");
const condition_container = document.querySelector(".condition-container");
const condition_svg = document.querySelector(".condition-container svg");
const condition_paragragh = document.querySelector(".condition-container p");
const selector_span = document.querySelector(".selector-span");
const search = document.getElementById("search");
const picture_setting = document.querySelector(".pictures-setting");
const picture_setting_options = document.querySelector(".pictures-setting-options");
const zoom_value = 70;
const pictures = [];
const urls = [];
const options = [];
const options_svg = [];
const picture_hover = [];
const picture_items = [];
const selector_error_text = "nothing";

let item_index = 1;
let picture_item_names = ["Portraits", "Nature", "City"];
let zoom_picture = false;
let menu_bool = false;
let dark_bool = true;
let slide_show_picture_pos = [0, 0];
let main_mouse_pos = [0, 0];
let menu_click = true;
let picture_numbers = [12, 6, 6, 4];
let picture_class_num = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],[2, 3, 7, 10, 11, 12],[4, 7, 8, 9, 10, 11],[1, 3, 5, 6]];
let pictures_on_slide_show_urls = [];
let zoom_bool = true;
let selsector_bool = false;
let culmn_number = 4;
let show_index = 1;
let picture_selected_url = "";
let option_select_bool = false;
let options_bool = [];
let options_selected = [];
let and_bool = false;
let condition = 1;
let condition_window = false;
let condition_items_click = false;
let selector_hover_bool = false;
let search_bool = true;
let error_hover_bool = false;
let selector_error = false;
let picture_setting_bool = false;

function print(input) {
  console.log(input);
}
(function generatingThings() {
  for (let i = 0; i < picture_numbers[0]; i++) {
    makePicture(`./pictures/img-${i + 1}.jpg`, i);
  }
  for (let i = 0; i < picture_item_names.length + 1; i++) {
    if (i == 0) makePictureItem(picture_item_names[i - 1], true);
    else makePictureItem(picture_item_names[i - 1], false);
  }
  for (let i = 0; i < picture_item_names.length; i++) {
    makeAddPictureItem(picture_item_names[i], false);
  }
  picture_classes_selector.innerText = "Nothing";
  picture_classes_selector.style.color = "gray";
  makePictureInput();
})();
function openSlideShow(pictur_urls, num) {
  slide_show.style.display = "block";
  show_index = num;
  pictures_on_slide_show_urls = [...pictur_urls]
  slide_show_picture.src = pictur_urls[show_index - 1];
  picture_tag.innerText = `${show_index} of ${pictur_urls.length}`;
  setTimeout(() => {
    body.style.overflow = "hidden";
    slide_show.style.opacity = "1";
  }, 10);
}
function giveAnErrorBox(element, text) {
  const container = document.createElement("div");
  container.className = "error-box";
  container.innerHTML = `<div></div><p class='p1'>!</p><p class='p2'>${text}</p>`;
  container.addEventListener("mouseover", () => (error_hover_bool = true));
  container.addEventListener("mouseleave", () => (error_hover_bool = false));
  element.appendChild(container);
  setTimeout(() => {
    container.style.opacity = "0";
  }, 1300);
  setTimeout(() => {
    container.remove();
    error_hover_bool = false;
  }, 1800);
}
function handleZoomPicture(zoom, X, Y, rx, ry) {
  if ((zoom_picture && zoom != 2) || zoom == 1) {
    slide_show_picture.style.maxWidth = "calc(100vw - 9rem)";
    slide_show_picture.style.maxHeight = "90vh";
    slide_show_picture.style.minWidth = "auto";
    slide_show_picture.style.minHeight = "auto";
    slide_show_picture.style.cursor = "zoom-in";
    slide_show_picture.style.left = "0";
    slide_show_picture.style.top = "0";
    slide_show.style.cursor = "default";
    zoom_picture = false;
    zoom_bool = true;
  } else if (zoom != 1) {
    let x = slide_show_picture.clientWidth;
    let y = slide_show_picture.clientHeight;
    slide_show_picture.style.maxWidth = `none`;
    slide_show_picture.style.maxHeight = `none`;
    if (x > y) {
      slide_show_picture.style.minWidth = `calc(${x}px + ${zoom_value}vw)`;
    } else if (y > x) {
      slide_show_picture.style.minHeight = `calc(${y}px + ${zoom_value}vh)`;
    }
    [nx, ny] = [slide_show_picture.clientWidth, slide_show_picture.clientHeight];
    slide_show_picture.style.left = `${(nx - x) / 2 + rx - (rx * nx) / x}px`;
    slide_show_picture.style.top = `${(ny - y) / 2 + ry - (ry * ny) / y}px`;
    slide_show_picture_pos = [(nx - x) / 2 + rx - (rx * nx) / x, (ny - y) / 2 + ry - (ry * ny) / y];
    main_mouse_pos = [X, Y];
    slide_show_picture.style.cursor = "zoom-out";
    zoom_picture = true;
    setTimeout(() => {
      zoom_bool = false;
    }, 100);
  }
}
function moveSlideShowPicture(x, y) {
  if (zoom_picture) {
    [px, py] = [slide_show_picture.clientWidth, slide_show_picture.clientHeight];
    [mx, my] = slide_show_picture_pos;
    [fx, fy] = main_mouse_pos;
    [rx, ry] = [fx - x, fy - y];
    if (mx + rx * 2 > (window.innerWidth + px) / -2 + 20 && mx + rx * 2 < (window.innerWidth + px) / 2 - 20) {
      slide_show_picture.style.left = `${rx * 2 + mx}px`;
    } else if (mx + rx * 2 < (window.innerWidth + px) / 2 - 20) {
      slide_show_picture.style.left = `${(window.innerWidth + px) / -2 + 20}px`;
    } else {
      slide_show_picture.style.left = `${(window.innerWidth + px) / 2 - 20}px`;
    }
    if (my + ry * 2 > (window.innerHeight + px) / -2 + 20 && my + ry * 2 < (window.innerHeight + px) / 2 - 20) {
      slide_show_picture.style.top = `${ry * 2 + my}px`;
    } else if (my + ry * 2 < (window.innerHeight + px) / 2 - 20) {
      slide_show_picture.style.top = `${(window.innerHeight + px) / -2 + 20}px`;
    } else {
      slide_show_picture.style.top = `${(window.innerHeight + px) / 2 - 20}px`;
    }
    slide_show.style.cursor = "zoom-out";
  }
}
function handlePictureNumbers(picture_index) {
  const length = pictures_on_slide_show_urls.length;
  if (picture_index > length) picture_index = 1;
  else if (picture_index < 1) picture_index = length;
  slide_show_picture.style.maxWidth = "calc(100vw - 9rem)";
  slide_show_picture.style.maxHeight = "90vh";
  slide_show_picture.style.cursor = "zoom-in";
  slide_show_picture.style.left = "0";
  slide_show_picture.style.top = "0";
  slide_show.style.cursor = "default";
  slide_show_picture.style.minWidth = "auto";
  slide_show_picture.style.minHeight = "auto";
  print(pictures_on_slide_show_urls);
  print(picture_index)
  slide_show_picture.src = pictures_on_slide_show_urls[picture_index - 1];
  picture_tag.innerText = `${picture_index} of ${length}`;
  show_index = picture_index;
  zoom_picture = false;
  zoom_bool = true;
}
function closeSlideShow() {
  slide_show.style.opacity = "0";
  body.style.overflowY = "scroll";
  setTimeout(() => {
    slide_show.style.display = "none";
  }, 500);
  handleZoomPicture(1);
}
function handlePicturClasses(index) {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].style.display = "none";
  }
  for (let i = 0; i < picture_class_num[index - 1].length; i++) {
    pictures[picture_class_num[index - 1][i] - 1].style.display = "inline-block";
  }
}
function changeDarkMode() {
  dark_icon.forEach((item) => (item.style.transition = "none"));
  if (!dark_bool) {
    dark_pointer.style.left = "15px";
    dark_pointer.style.background = "rgb(0, 21, 49)";
    dark_container.style.border = "3px solid rgb(0, 21, 49)";
    background.style.background = "rgb(48, 45, 68)";
    dark_icon[0].style.display = "block";
    dark_icon[1].style.display = "none";
    dark_bool = true;
  } else {
    dark_pointer.style.left = "-5px";
    dark_pointer.style.background = "white";
    dark_container.style.border = "3px solid white";
    background.style.background = "white";
    dark_icon[0].style.display = "none";
    dark_icon[1].style.display = "block";
    dark_bool = false;
  }
  setTimeout(() => {
    dark_icon.forEach((item) => (item.style.transition = "all 0.5s"));
  }, 20);
}
function closeMenuFunc() {
  menu.style.left = "-19rem";
  main_header.style.top = "0";
  title.style.margin = "7rem 0 3rem 0";
  menu_bool = false;
}
function makePicture(url, i) {
  urls.push(`${url}`);
  const picture = document.createElement("div");
  const picture_h = document.createElement("div");
  const see_picture = document.createElement("p");
  see_picture.innerText = "see picture";
  picture.className = "picture";
  picture_h.className = "picture-hover";
  picture.style.background = `url(${url}) center/cover no-repeat`;
  picture_h.appendChild(see_picture);
  picture.appendChild(picture_h);
  pictures_box.appendChild(picture);
  pictures.push(picture);
  picture_hover.push(picture_h);
  picture.addEventListener("mouseleave", () => handlePicturesAnimation(i, false));
  picture.addEventListener("mouseenter", () => handlePicturesAnimation(i, true));
  picture.addEventListener("click", () => {
    const results = [];
    for (let i = 0; i < picture_class_num[item_index - 1].length; i++) 
      results.push(urls[picture_class_num[item_index - 1][i] - 1]);
    openSlideShow(results, picture_class_num[item_index - 1].indexOf(i + 1) + 1);
  });
}
function makePictureInput() {
  const input = document.createElement("input");
  input.type = "file";
  input.id = "main-picture-input";
  input.accept = "image/*";
  url_input_container.appendChild(input);
  input.addEventListener("click", () => {
    selector_options_container.style.height = "0";
    selector_options_container.style.paddingBottom = "0";
    selector_options_container.style.top = "2.5rem";
    selector_svg.style.transform = "rotateZ(90deg)";
    selsector_bool = false;
  });
  input.addEventListener("change", () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      picture_selected_url = reader.result;
      url_input_container.style.background = `url(${reader.result}) center/cover no-repeat`;
      url_input_container.style.animation = "change 0s forwards";
      url_label.style.display = "none";
      brows_svg.style.display = "none";
      url_input_container.for = "";
      brows.style.display = "none";
      input.remove();
    };
  });
}
function makePictureItem(word, value) {
  const item = document.createElement("li");
  const h3 = document.createElement("h3");
  if (value) {
    h3.className = "active";
    h3.innerText = "ShowAll";
  } else h3.innerText = word;
  item.appendChild(h3);
  picture_items.push(h3);
  h3.addEventListener("click", () => {
    const index = picture_item_names.indexOf(h3.innerText) + 2;
    // print(index);
    handlePicturClasses(index);
    if (index != item_index) {
      picture_items[item_index - 1].classList.remove("active");
      h3.classList.add("active");
      item_index = index;
    }
  });
  picture_items_container.appendChild(item);
}
function makeAddPictureItem(word, value) {
  const option = document.createElement("div");
  const p = document.createElement("p");
  const path =
    '<path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>';
  p.innerText = word;
  option.innerHTML = `<svg class="svg-icon" viewBox="0 0 20 20">${path}</svg>`;
  option.appendChild(p);
  option.className = "option";
  const index = options.length;
  option.addEventListener("click", () => {
    picture_classes_selector.style.color = "black";

    if (!options_bool[index]) {
      options_bool[index] = true;
      option.style.backgroundColor = "#678ba7fb";
      options_svg[index].style.fill = "black";
      options_svg[index].style.opacity = "1";
      options_selected.push(index + 1);
      let text = "";
      const befor_text = picture_classes_selector.innerText;
      if (befor_text != "Nothing") text = befor_text + " & " + option.innerText;
      else text = option.innerText;
      if (text.length < 27) {
        picture_classes_selector.innerText = text;
        and_bool = false;
      } else if (!and_bool) {
        picture_classes_selector.innerText = picture_classes_selector.innerText + " & ...";
        and_bool = true;
      }
    } else {
      options_bool[index] = false;
      option.style.backgroundColor = "white";
      options_svg[index].style.opacity = "0";
      options_selected.splice(options_selected.indexOf(index + 1), 1);
      let text = "";
      and_bool = false;
      for (let option_num = 0; option_num < options_selected.length; option_num++) {
        let item = picture_item_names[options_selected[option_num] - 1];
        if (text.length + item.length + 3 < 27) {
          text += item;
          text += " & ";
        } else {
          and_bool = true;
          text = text.substring(0, text.length - 3);
          text += " & ...";
          break;
        }
      }
      if (!and_bool && text != "") text = text.substring(0, text.length - 3);
      if (text == "") {
        picture_classes_selector.style.color = "gray";
        picture_classes_selector.innerText = "Nothing";
      } else picture_classes_selector.innerText = text;
    }
    if (search_bool) {
      setTimeout(() => {
        handleSorting();
      }, 500);
    }
  });
  option.addEventListener("mouseenter", () => {
    if (!options_bool[index]) {
      option.style.backgroundColor = "#a8c6ddfb";
      options_svg[index].style.opacity = "1";
      options_svg[index].style.fill = "rgb(105, 105, 105)";
    }
  });
  option.addEventListener("mouseleave", () => {
    if (!options_bool[index]) {
      option.style.backgroundColor = "white";
      options_svg[index].style.opacity = "0";
    }
  });
  option.style.userSelect = "none";
  options_bool.push(false);
  options.push(option);
  options_svg.push(option.firstChild);
  options_container.appendChild(option);
}
function handlePicturesAnimation(index, value) {
  if (value) {
    picture_hover[index].style.opacity = "1";
  } else {
    picture_hover[index].style.opacity = "0";
  }
}
function closeAddPicturePage() {
  add_picture_page.style.opacity = "0";
  setTimeout(() => {
    for (let i = 0; i < options.length; i++) {
      options[i].style.backgroundColor = "white";
      options_svg[i].style.opacity = "0";
      options_bool[i] = false;
    }
    url_input_container.style.animation = "reset 0s forwards";
    selector_options_container.style.height = "0";
    selector_options_container.style.paddingBottom = "0";
    selector_svg.style.transform = "rotateZ(90deg)";
    picture_classes_selector.innerText = "Nothing";
    picture_classes_selector.style.color = "gray";
    selector_options_container.style.top = "2.5rem";
    url_label.style.display = "block";
    brows_svg.style.display = "block";
    brows.style.display = "block";
    body.style.overflowY = "scroll";
    selsector_bool = false;
    options_selected = [];
    and_bool = false;
    makePictureInput();
    add_picture_page.style.display = "none";
  }, 300);
}
function handleSelectorAnimation(value) {
  if (value && !selsector_bool && !error_hover_bool) {
    selector_container.style.width = "16rem";
    selector_container.style.boxShadow = "3px 3px 15px 2px rgba(0, 0, 0, 0.644)";
    selector_hover_bool = true;
  } else if (!selsector_bool && !error_hover_bool) {
    selector_container.style.width = "calc(18rem - 45px)";
    selector_container.style.boxShadow = "none";
    selector_hover_bool = false;
  }
}
function handleSorting() {
  selector_span.innerText = "";
  if (condition == 1) {
    options.forEach((item) => {
      item.style.display = "block";
    });
  } else if (condition == 2) {
    options.forEach((item) => {
      item.style.display = "none";
    });
    if (options_selected.length > 0) {
      options_selected.forEach((item) => {
        options[item - 1].style.display = "block";
      });
    } else {
      selector_span.innerText = selector_error_text;
    }
  } else {
    if (options_selected.length != picture_item_names.length) {
      options.forEach((item) => {
        item.style.display = "block";
      });
      options_selected.forEach((item) => {
        options[item - 1].style.display = "none";
      });
    } else {
      options.forEach((item) => {
        item.style.display = "none";
      });
      selector_span.innerText = selector_error_text;
    }
  }
}
function searchFunc(string) {
  let text = "";
  let index = 0;
  string = string.toLowerCase();
  options.forEach((item) => {
    text = item.innerText.toLowerCase();
    if (text.indexOf(string) < 0) {
      item.style.display = "none";
      index++;
    } else {
      item.style.display = "block";
    }
  });
  if (index == options.length) {
    selector_span.innerText = selector_error_text;
  } else {
    selector_span.innerText = "";
  }
}
function handleSelectorOptions() {
  if (selsector_bool && !option_select_bool && !selector_error) {
    if (selector_hover_bool) {
      selector_container.style.width = "16rem";
      selector_container.style.boxShadow = "3px 3px 15px 2px rgba(0, 0, 0, 0.644)";
    }
    selector_options_container.style.height = "0";
    selector_options_container.style.paddingBottom = "0";
    selector_options_container.style.top = "2.5rem";
    selector_svg.style.transform = "rotateZ(90deg)";
    selsector_bool = false;
  } else if (!option_select_bool && !selector_error) {
    selsector_bool = true;
    selector_options_container.style.height = "9rem";
    selector_options_container.style.paddingBottom = "10px";
    selector_options_container.style.top = "3.5rem";
    selector_svg.style.transform = "rotateZ(-90deg)";
    selector_container.style.width = "calc(18rem - 45px)";
    selector_container.style.boxShadow = "none";
  }
  option_select_bool = false;
}
// function sort(list){
//     let result = [...list];
//     let index = 0;
//     list.forEach((item) => {
//         index = 0;
//         for(let j = 0; j < list.length; j++){
//             if(list[j] <= item)index++;
//         }
//         result[index - 1] = item;
//     })
//     return result;
// }

// picture_setting.addEventListener()
left_icon.addEventListener("click", () => handlePictureNumbers(show_index - 1));
right_icon.addEventListener("click", () => handlePictureNumbers(show_index + 1));
document.addEventListener("click", (e) => {
  if (zoom_picture && !zoom_bool) handleZoomPicture(0, e.clientX, e.clientY);
});
slide_show_picture.addEventListener("click", (e) => handleZoomPicture(0, e.clientX, e.clientY, e.offsetX, e.offsetY), (zoom_bool = true));
slide_show.addEventListener("mousemove", (e) => moveSlideShowPicture(e.clientX, e.clientY));
add_picture_submit_button[0].addEventListener("click", () => closeAddPicturePage());
selector_container.addEventListener("mouseenter", () => handleSelectorAnimation(true));
selector_container.addEventListener("mouseleave", () => handleSelectorAnimation(false));
selector_svg.addEventListener("mouseenter", () => handleSelectorAnimation(true));
selector_svg.addEventListener("mouseleave", () => handleSelectorAnimation(false));
selector_container.addEventListener("click", handleSelectorOptions);
selector_svg.addEventListener("click", handleSelectorOptions);
cross_icon.addEventListener("click", closeSlideShow);
dark_mode.addEventListener("click", changeDarkMode);
close_menu.addEventListener("click", closeMenuFunc);

hamburger_menu.addEventListener("click", () => {
  menu.style.left = "0";
  main_header.style.top = "-5rem";
  title.style.margin = "2rem 0 3rem 0";
  menu_bool = true;
  menu_click = true;
});
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    handlePictureNumbers(show_index - 1);
  } else if (e.key == "ArrowRight") {
    handlePictureNumbers(show_index + 1);
  } else if (e.key == "Escape") {
    closeSlideShow();
  }
});
menu.addEventListener("click", () => {
  menu_click = true;
});
document.addEventListener("click", (e) => {
  if (!menu_click) closeMenuFunc();
  menu_click = false;
});
dark_icon.forEach((item) => {
  item.addEventListener("click", changeDarkMode);
});
url_input_container.addEventListener("click", () => {});
add_picture_submit_button[1].addEventListener("click", () => {
  if (selector_hover_bool) {
    selector_container.style.width = "16rem";
    selector_container.style.boxShadow = "3px 3px 15px 2px rgba(0, 0, 0, 0.644)";
  }
  if (picture_selected_url == "") {
    giveAnErrorBox(url_input_container, "select a picture");
  } else if (options_selected.length == 0) {
    selector_error = true;
    selector_container.style.width = "calc(18rem - 45px)";
    selector_container.style.boxShadow = "none";
    giveAnErrorBox(selector_container, "select at least 1 groupe");
    setTimeout(() => {
      selector_error = false;
      if (!option_select_bool && selsector_bool) {
        selsector_bool = true;
        selector_options_container.style.height = "9rem";
        selector_options_container.style.paddingBottom = "10px";
        selector_options_container.style.top = "3.5rem";
        selector_svg.style.transform = "rotateZ(-90deg)";
        selector_container.style.width = "calc(18rem - 45px)";
        selector_container.style.boxShadow = "none";
      }
      if (selector_hover_bool) {
        selector_container.style.width = "16rem";
        selector_container.style.boxShadow = "3px 3px 15px 2px rgba(0, 0, 0, 0.644)";
      }
    }, 1500);
  } else {
    picture_numbers[0]++;
    picture_class_num[0].push(picture_numbers[0]);
    for(let i = 0; i < options_selected.length; i++){
      picture_class_num[options_selected[i]].push(picture_numbers[0]);
      picture_numbers[options_selected[i]]++;
      print(i)
    }
    makePicture(picture_selected_url, picture_numbers[0] - 1);
    picture_selected_url = "";
    closeAddPicturePage();
  }
});
selector_options_container.addEventListener("click", () => {
  option_select_bool = true;
});
condition_container.addEventListener("click", () => {
  if (condition_window) {
    condition_container_list.style.height = "0";
    condition_container_list.style.padding = "0";
    condition_container_list.style.borderTop = "none";
    condition_svg.style.transform = "rotateZ(90deg)";
    condition_container.style.borderBottomRightRadius = "10px";
    condition_container.style.borderBottomLeftRadius = "10px";
    condition_window = false;
    condition_items_click = false;
  } else if (!condition_items_click) {
    condition_container_list.style.height = "5.5rem";
    condition_container_list.style.padding = "5px";
    condition_svg.style.transform = "rotateZ(-90deg)";
    condition_container_list.style.borderTop = "solid 1px black";
    condition_container.style.borderBottomRightRadius = "0";
    condition_container.style.borderBottomLeftRadius = "0";
    condition_window = true;
  }
});
condition_container_list_memebers.forEach((item) => {
  item.addEventListener("click", () => {
    search.value = "";
    if (item.innerText === "show all") condition = 1;
    if (item.innerText === "selected") condition = 2;
    if (item.innerText === "unselected") condition = 3;
    handleSorting();
    condition_items_click = true;
    condition_window = true;
    condition_container_list.style.height = "0";
    condition_container_list.style.padding = "0";
    condition_container_list.style.borderTop = "none";
    condition_svg.style.transform = "rotateZ(90deg)";
    condition_container.style.borderBottomRightRadius = "10px";
    condition_container.style.borderBottomLeftRadius = "10px";
    condition_paragragh.innerText = item.innerText;
  });
});
search.addEventListener("keyup", (e) => {
  if (search.value != "") {
    searchFunc(search.value);
    search_bool = false;
  } else {
    handleSorting();
    search_bool = true;
  }
});
add_picture.addEventListener("click", () => {
  add_picture_page.style.display = "flex";
  body.style.overflow = "hidden";
  setTimeout(() => {
    add_picture_page.style.opacity = "1";
  }, 100);
});
add_group.addEventListener("click", () => {
  add_group_page.style.display = "flex";
  body.style.overflow = "hidden";
  setTimeout(() => {
    add_group_page.style.opacity = "1";
  }, 100);
});
add_group_submit_button[0].addEventListener("click", () => {
  add_group_page.style.opacity = "0";
  body.style.overflowY = "scroll";
  setTimeout(() => {
    add_group_input.value = "";
    add_group_page.style.display = "none";
  }, 300);
});
add_group_submit_button[1].addEventListener("click", (e) => {
  const word = add_group_input.value;
  if (word == "") giveAnErrorBox(document.querySelector(".add-group-box .input-container"), "Enter item name");
  else {
    picture_item_names.push(word);
    add_group_page.style.opacity = "0";
    body.style.overflowY = "scroll";
    makePictureItem(word, false);
    makeAddPictureItem(word, false);
    picture_class_num.push([]);
    setTimeout(() => {
      add_group_input.value = "";
      add_group_page.style.display = "none";
    }, 300);
  }
});
picture_setting.addEventListener("click", () => {
  if (picture_setting_bool) {
    picture_setting_options.style.height = "0";
    picture_setting_options.style.width = "0";
    picture_setting_options.style.padding = "0";
    picture_setting_options.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.4) inset";
    picture_setting_bool = false;
  } else {
    picture_setting_options.style.height = "7rem";
    picture_setting_options.style.width = "10rem";
    picture_setting_options.style.padding = "0 10px";
    picture_setting_options.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.4) inset, 5px 5px 10px rgba(36, 36, 36, 0.696)";
    picture_setting_bool = true;
  }
});
