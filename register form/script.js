const inputs = document.querySelectorAll('.information');
const year_down = document.querySelector('.year-down');
const month_down = document.querySelector('.month-down');
const day_down = document.querySelector('.day-down');
const year_append = document.querySelector('.year-append');
const month_append = document.querySelector('.month-append');
const day_append = document.querySelector('.day-append');
const year_p = document.querySelector('.p-year');
const month_p = document.querySelector('.p-month');
const day_p = document.querySelector('.p-day');
const year_li = document.querySelectorAll('.year li');
const month_li = document.querySelectorAll('.month li');
const day_li = document.querySelectorAll('.day li');
const icons = document.querySelectorAll('.icon');
const error_boxes = document.querySelectorAll('.error-box');
const button = document.querySelector('.button');
const button2 = document.querySelector('.button2');
const circle = document.querySelector('.circle');
const added = document.querySelector('.added');
const view_password = document.querySelector('.view-password');
const quistion_mark = document.querySelector('#quistion-mark');
const help = document.querySelector('.help');
const main_box = document.querySelector('.main-box');
const help_cross = document.querySelector('.help-cross');
const go_back = document.querySelector('.bubble p');

let year_bool = [true, true];
let month_bool = [true, true];
let day_bool = [true, true];
let errors_width = [9.2,9.2,9.6,7.2,10.5,9,8.2];
let errors_height = [1,1,1,1,1,1,1];
let mouse_enter = [false, false, false, false, false, false, false]
let error_boxes_boolean = [true, true, true, true, true, true, true];
let text = '';
let view_password_boollean = false;
const names_width = [0,0,0,-2,2,-0.2];
const names = ['first name', 'last name', 'user name', 'email', 'phone number', 'password'];

function handleBirthdayErrors (){
	if (year_p.innerText == 'year' || month_p.innerText == 'month' || day_p.innerText == 'day'){
		errors_width[6] = 11;
		error_boxes[6].innerHTML = 'please complite the items';
	}else {
		error_boxes_boolean[6] = false;
		icons[6].innerHTML = '<path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>';
		icons[6].style.fill = 'green';
	}
}
function setErrorBox (i, animation = true){
	if (!animation){
		error_boxes[i].style.transition = 'none';
	}else {
		error_boxes[i].style.transition = 'all 0.5s 0.3s';
	}
	error_boxes[i].style.width = String(errors_width[i]) + 'rem';
	error_boxes[i].style.height = String(errors_height[i]) + 'rem';
	error_boxes[i].style.boxShadow = '0 0 10px 1px rgb(100,100,100)';
	error_boxes[i].style.padding = '0.5rem 1rem 1rem';
	icons[i].style.width = '2.4rem';
	icons[i].style.filter = 'drop-shadow(3px 3px 2px rgb(150,150,150))';
}
function closeErrorBox (i){
	error_boxes[i].style.transition = 'all 0.5s 0.3s';
	error_boxes[i].style.width = '0';
	error_boxes[i].style.boxShadow = 'none';
	error_boxes[i].style.height = '0';
	error_boxes[i].style.padding = '0';
	icons[i].style.width = '2.3rem';
	icons[i].style.filter = 'none';
}
function setIconsCross (i){
	icons[i].innerHTML = '<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>';
	icons[i].style.fill = 'rgb(200,0,0)';
}
function yearhidden (){
	year_append.style.visibility = 'hidden';
	year_down.style.transform = 'rotateZ(0deg)';
	year_bool[0] = true;
}
function monthhidden (){
	month_append.style.visibility = 'hidden';
	month_down.style.transform = 'rotateZ(0deg)';
	month_bool[0] = true;
}
function dayhidden (){
	day_append.style.visibility = 'hidden';
	day_down.style.transform = 'rotateZ(0deg)';
	day_bool[0] = true;
}
function handleClickButton (){
	circle.style.animation = 'none';
	let j = 0;
	for (let i = 0; i < 7; i++){
		icons[i].style.animation = 'none';
	}
	for (let i = 0; i < 7; i++){	
		if (error_boxes_boolean[i]){
			j++;
		}
	}
	setTimeout(() => {
		circle.style.animation = 'click-circle 0.5s';	
		for (let i = 0; i < 7; i++){	
			if (error_boxes_boolean[i]){
				icons[i].style.animation = 'move-crosses 0.4s';
			}
		}
	}, 1);
	if (j == 0){
		document.querySelector('.covering').style.bottom = '0';
		main_box.style.opacity = '0';
	}
}

go_back.addEventListener('click', () => {
	document.querySelector('.covering').style.bottom = '-130rem';
	main_box.style.opacity = '1';
})
go_back.addEventListener('mouseenter', () => {
	document.querySelectorAll('.braces')[0].style.opacity = '1';
	document.querySelectorAll('.braces')[1].style.opacity = '1';
});
go_back.addEventListener('mouseleave', () => {
	document.querySelectorAll('.braces')[0].style.opacity = '0';
	document.querySelectorAll('.braces')[1].style.opacity = '0';
});
quistion_mark.addEventListener('click', () => {
	help.style.top = '0';
	main_box.style.opacity = '0';
});
help_cross.addEventListener('click', () => {
	help.style.top = '-50rem';
	main_box.style.opacity = '1';
});
inputs.forEach((item, index) => {
	item.addEventListener('keyup', function (e){
		let transition;
		if (error_boxes_boolean[index] && (e.key.length < 2 || e.key == 'Backspace')){
			transition = false;
		}else{
			transition = true;
		}
		error_boxes_boolean[index] = true;
		text = item.value;
		let capital_character = 0;
		let true_character = 0;
		let num = 0;
		let is_number = 0;
		for (let i = 0; i < text.length; i++){
			if (text[i].charCodeAt(0) < 58 && text[i].charCodeAt(0) > 47){
				is_number++;
			}
			if (String(Number(text[i])) != 'NaN'){
				num++;
			}
			if (text[i].charCodeAt(0) < 91 && text[i].charCodeAt(0) > 64){
				capital_character++;
			}
			if (text[i].charCodeAt(0) > 126 || text[i].charCodeAt(0) < 32){
				true_character++;
			}
		}
		if (index == 5 && text.length > 0){
			added.style.right = '-2.3rem';
		}else if (index == 5){
			added.style.right = '0';
		}
		if (text.length == 0){
			errors_width[index] = 9 + names_width[index];
			errors_height[index] = 1;
			error_boxes[index].innerHTML = 'enter your ' + names[index];
			setIconsCross(index);
		}else if (text.indexOf(' ') != -1){
			errors_width[index] = 14 + names_width[index];
			errors_height[index] = 1;
			error_boxes[index].innerHTML = 'yuor ' + names[index] + ' can\'t has space';
			setIconsCross(index);
		}else if (text.length < 5 || (text.length < 10 && index == 4)){
			let number;
			if (index != 4) {
				number = '5';
				errors_width[index] = 10.2;
			}else {
				number = '10';
				errors_width[4] = 11.8;
			}	
			errors_height[index] = 3.2;
			error_boxes[index].innerHTML = 'Your ' + names[index] + ' should<br>be at least ' + number + ' characters<br>long'; 
			setIconsCross(index);
		}else if (index == 5 && capital_character == 0){
			errors_width[index] = 9.8;
			errors_height[index] = 3.2;
			error_boxes[index].innerHTML = 'your password should <br>has at least one <br>capital character';
			setIconsCross(index);
		}else if (index == 5 && num == 0){
			errors_height[index] = 3.2;
			errors_width[index] = 9.8;
			error_boxes[index].innerHTML = 'your password should <br>has at least one <br>number'; 
			setIconsCross(index);
		}else if (String(Number(text)) != 'NaN' && index != 4){
			errors_height[index] = 2.1;
			errors_width[index] = 10 + names_width[index];
			error_boxes[index].innerHTML = 'your ' + names[index] + ' can not<br>be just number'; 
			setIconsCross(index);
		}else if (text.indexOf('@') != -1 && index == 3){
			errors_height[index] = 1;
			errors_width[index] = 12;
			error_boxes[index].innerHTML = 'your email can\'t has adsign'; 
			setIconsCross(index);
		}else if (true_character > 0 && index == 3){
			errors_height[index] = 1;
			errors_width[index] = 12.8;
			error_boxes[index].innerHTML = 'the characters are misspelled'; 
			setIconsCross(index);
		}else if (is_number != text.length && index == 4){
			errors_height[index] = 2.1;
			errors_width[index] = 10.2 + names_width[index];
			error_boxes[index].innerHTML = 'your phone number must be<br>just number';
			setIconsCross(index);
		}else {
			closeErrorBox(index);
			error_boxes_boolean[index] = false;
			icons[index].innerHTML = '<path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>';
			icons[index].style.fill = 'green';
		}
		if (error_boxes_boolean[index] && mouse_enter[index]){
			setErrorBox(index, transition);
		}
	})
});
button.addEventListener('click', handleClickButton);
circle.addEventListener('click', handleClickButton);
circle.addEventListener('mouseenter', function (){
	if (error_boxes_boolean[0] || error_boxes_boolean[1] || error_boxes_boolean[2] || error_boxes_boolean[3] || error_boxes_boolean[4] || error_boxes_boolean[5] || error_boxes_boolean[6]){	
		button2.style.background = 'linear-gradient(90deg, rgb(150,0,0) 0%, rgb(250,150,150) 33%, rgb(250,150,150) 66%, rgb(150,0,0) 100%)';
	}else {
		button2.style.background = 'linear-gradient(90deg, rgb(33,115,137) 0%, rgb(91,213,179) 33%, rgb(91,213,179) 66%, rgb(33,115,137) 100%)';
	}
	button.style.opacity = '0';
});
circle.addEventListener('mouseleave', function (){
	button.style.opacity = '100';
});
button.addEventListener('mouseenter', function (){
	if (error_boxes_boolean[0] || error_boxes_boolean[1] || error_boxes_boolean[2] || error_boxes_boolean[3] || error_boxes_boolean[4] || error_boxes_boolean[5] || error_boxes_boolean[6]){	
		button2.style.background = 'linear-gradient(90deg, rgb(150,0,0) 0%, rgb(250,150,150) 33%, rgb(250,150,150) 66%, rgb(150,0,0) 100%)';
	}else {
		button2.style.background = 'linear-gradient(90deg, rgb(33,115,137) 0%, rgb(91,213,179) 33%, rgb(91,213,179) 66%, rgb(33,115,137) 100%)';
	}
	button.style.opacity = '0';
});
button.addEventListener('mouseleave', function (){
	button.style.opacity = '100';
});
icons.forEach((item, index) => {
	item.addEventListener('mouseenter', function (){
		if (error_boxes_boolean[index]){
			setErrorBox(index);
		}
		mouse_enter[index] = true;
	})
	item.addEventListener('mouseleave', function (){
		mouse_enter[index] = false;
		closeErrorBox(index);
	})
});
year_li.forEach(item => {
	item.addEventListener("click", function (){
		year_p.innerHTML = item.innerText;
		year_p.style.color = 'black';
		yearhidden();
		handleBirthdayErrors();
	})
});
month_li.forEach(item => {
	item.addEventListener("click", function (){
		month_p.innerHTML = item.innerText;
		month_p.style.color = 'black';
		monthhidden();
		handleBirthdayErrors();
	})
});
day_li.forEach(item => {
	item.addEventListener("click", function (){
		day_p.innerHTML = item.innerText;
		day_p.style.color = 'black';
		dayhidden();
		handleBirthdayErrors();
	})
});
year_down.addEventListener('click', function (){
	if(year_bool[0]){
		year_append.style.visibility = 'visible';
		year_down.style.transform = 'rotateZ(180deg)';
		monthhidden();
		dayhidden();
		year_bool[0] = false;
		day_bool[1] = true;
		month_bool[1] = true;
		year_bool[1] = false;
	}
});
month_down.addEventListener('click', function (){
	if(month_bool[0]){
		month_append.style.visibility = 'visible';
		month_down.style.transform = 'rotateZ(180deg)';
		yearhidden();
		dayhidden();
		month_bool[0] = false;
		day_bool[1] = true;
		month_bool[1] = false;
		year_bool[1] = true;
	}
});
day_down.addEventListener('click', function (){
	if(day_bool[0]){
		day_append.style.visibility = 'visible';
		day_down.style.transform = 'rotateZ(180deg)';
		monthhidden();
		yearhidden();
		day_bool[0] = false;
		day_bool[1] =  false;
		month_bool[1] = true;
		year_bool[1] = true;
	}
});
view_password.addEventListener('click', function (){
	if (!view_password_boollean){
		inputs[5].type = 'text';
		view_password.innerHTML = '<path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>'
		view_password_boollean = true;
	}else {
		inputs[5].type = 'password';
		view_password.innerHTML = '<path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"/>';
		view_password_boollean = false;
	}
});
document.addEventListener('click', () => {
	if (year_bool[1])yearhidden();
	if (month_bool[1])monthhidden();
	if (day_bool[1])dayhidden();
	if (!year_bool[1])year_bool[1] = true;
	if (!month_bool[1])month_bool[1] = true;
	if (!day_bool[1])day_bool[1] = true;
});