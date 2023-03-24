
const background = document.querySelector('.background');
const items = document.querySelectorAll('.item');
const picture = document.querySelector('.picture');
const menu_icon = document.querySelector('.menu-icon');
const menu = document.querySelector('menu');
const picture_list = document.querySelector('.picture-list');
const them = document.querySelector('.them');
const button_pointer = document.querySelector('.button-pointer');
const page_1 = document.querySelector('.page-1');
const page_2 = document.querySelector('.page-2');
const back = document.querySelector('.back');

let menu_bool = false;
let picture_number = 1;
let move_picture = false;
let page_number = 1;
let num = 0;
let x = 0;
let y = 0;
let them_bool = false;

handlePictureList();

const pictures = document.querySelectorAll('.page-2 li');

setSelectedPicture();

function handlePicture(index){
	if (index > 12){
		index = 1;
	}else if (index < 1){
		index = 12;
	}
	picture_number = index;
	picture.style.transform = 'none';
	num = 0;
	x = 0;
	y = 0;
	setSelectedPicture();
	picture.style.height = '100vh';
	picture.style.background = 'url(./pictures/img-' + String(picture_number) + '.jpg) center/contain no-repeat';
}
function zoomIn(){
	if (num < 10){
		num++;
		picture.style.height = `calc(100vh + ${num * 15}rem)`;
		picture.style.width = `calc(100vw + ${num * 15}rem)`;
	}
}
function zoomOut(){
	if (num > 0){
		num--;
		picture.style.transform = 'none';
		picture.style.height = `calc(100vh + ${num * 15}rem)`;
		picture.style.width = `calc(100vw + ${num * 15}rem)`;
	}
	picture.style.transform = 'none';
	x = 0;
	y = 0;
}
function getAnimationToItems(index){
	items[index].style.animation = 'none';
	setTimeout(() => {
		items[index].style.animation = 'item-animation 0.5s ease';
	}, 1);
}
function handleBackIcon(visibility){
	if (visibility){
		back.style.right = '5rem';
	}else {
		back.style.right = '0';
	}
}
function handlePages(index){
	if (index == 1){
		handleBackIcon(true);
		page_1.style.left = '0';
		page_2.style.left = '-15rem';
		page_number = 1;
	}else if (index == 2){
		handleBackIcon(false);
		page_1.style.left = '-15rem';
		page_2.style.left = '0';
		page_number = 2;
	}
}
function handlePictureList(){
	for (let i = 0; i < 12; i++){
		const li = document.createElement('li');
		li.innerHTML = `<svg class='picture-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24""><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>picture ${i + 1}`;
		document.querySelector('.page-2 ol').appendChild(li);
	}
}
function setSelectedPicture(){
	for (let i = 0; i < 12; i++){
		if (i != picture_number - 1){
			pictures[i].style.backgroundColor = '';

		}else {
			pictures[i].style.backgroundColor = 'rgba(150,150,150,0.2)';
		}
	}
}

back.addEventListener('click', () => {handlePages(1)})
picture_list.addEventListener('click', () => {handlePages(2)})
them.addEventListener('click', () => {
	if (!them_bool){
		button_pointer.style.left = '1.13rem';
		button_pointer.style.backgroundColor = 'cadetblue';
		background.style.backgroundColor = 'rgb(230,230,230)';
		menu.style.backgroundColor = 'rgba(0,0,0,0.8)';
		menu_icon.style.fill = 'black';
		menu_icon.style.background = 'rgba(255, 255, 255, 0.3)';
		them_bool = true;
	}else {
		button_pointer.style.left = '0.2rem';
		button_pointer.style.backgroundColor = 'white';
		background.style.backgroundColor = 'black';
		menu.style.backgroundColor = 'rgba(50,50,50,0.7)';
		menu_icon.style.fill = 'white';
		menu_icon.style.background = 'none';
		them_bool = false;
	}
})
pictures.forEach((item, index) => {
	item.addEventListener('click', () => {
		handlePicture(index + 1);
		setSelectedPicture();
	})
})
menu_icon.addEventListener('click', () => {
	if(!menu_bool){
		handlePages(1);
		menu_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path></svg>';
		menu_icon.style.padding = '0.15rem 0.35rem 0.05rem 0.15rem';
		menu.style.left = '0rem';
		menu_bool = true;
	}else {
		menu_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
		menu_icon.style.padding = '0 0.4rem 0.2rem 0.1rem';
		menu.style.left = '-25rem';
		menu_bool = false;
	}
})
items.forEach((item, index) => {
	item.addEventListener('click', () => {
		if (index == 0){
			handlePicture(picture_number + 1);
		}else if (index == 1){
			handlePicture(picture_number - 1);
		}else if (index == 2){
			zoomOut();
		}else {
			zoomIn();
		}
	});
})
picture.addEventListener('mouseup', (e) => {
	x = e.clientX - x;
	y = e.clientY - y;
	move_picture = false;
})
picture.addEventListener('mousedown', (e) => {
	x = e.clientX - x;
	y = e.clientY - y;
	move_picture = true;
})
document.addEventListener('mouseleave', (e) => {
	if (move_picture){
		x = e.clientX - x;
		y = e.clientY - y;
		move_picture = false;
	}
})
window.addEventListener('mouseleave', (e) => {
	if (move_picture){
		x = e.clientX - x;
		y = e.clientY - y;
		move_picture = false;
	}
})
document.addEventListener('mousemove', (e) => {
	if (move_picture){
		picture.style.transform = 'translateX(' + String(e.clientX - x) + 'px) translateY(' + String(e.clientY - y) + 'px)';
	}
})
window.addEventListener('keydown', (e) => {
	if (e.key == 'ArrowRight'){
		handlePicture(picture_number - 1);
		getAnimationToItems(1);
	}else if (e.key == 'ArrowLeft'){
		handlePicture(picture_number + 1);
		getAnimationToItems(0);
	}else if (e.key == '-' || e.key == '_'){
		zoomOut();
		getAnimationToItems(2);
	}else if (e.key == '+' || e.key == '='){
		zoomIn();
		getAnimationToItems(3);
	}
})