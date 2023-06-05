const username = document.querySelector(".username");
const Password = document.querySelector(".password");
const login = document.querySelector(".login-button");
const view = document.querySelector(".view");
const error1 = document.querySelector(".error1");
const error2 = document.querySelector(".error2");
let t = true;
let f1 = false;
let f2 = false;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function chackUserName(){
	let text = username.value;
	f1 = false;
	if (text.length == 0){
		error1.style.visibility = 'visible';
		error1.innerHTML = "pleas enter your username";
	}else if (text.length < 5){
		error1.style.visibility = 'visible';
		error1.innerHTML = "text must have at least 5 characters";
	}else if (text.indexOf(' ') != -1){
		error1.style.visibility = 'visible';
		error1.innerHTML = "username can not have space";
	}else if (String(Number(text)) != 'NaN'){
		error1.style.visibility = 'visible';
		error1.innerHTML = "username must have at least one letter";
	}else {
		error1.style.visibility = 'hidden';
		f1 = true;
	}
	if (f2 && f1){
		login.style.backgroundColor = "rgb(20,172,255)";
	}else {
		login.style.backgroundColor = "rgb(255,95,100)";
	}
}
function chackPassWord(){
	let text = Password.value;
	f2 = false;
	if (text.length == 0){
		view.style.visibility = 'hidden';
		error2.style.visibility = 'visible';
		error2.innerHTML = "pleas enter your password";
	}else if (text.length < 5){
		view.style.visibility = 'visible';
		error2.style.visibility = 'visible';
		error2.innerHTML = "text must have at least 5 characters";
	}else if (text.indexOf(' ') != -1){
		error2.style.visibility = 'visible';
		error2.innerHTML = "password can not have space";
	}else {
		error2.style.visibility = 'hidden';
		f2 = true;
	}
	if (f2 && f1){
		login.style.backgroundColor = "rgb(20,172,255)";
	}else {
		login.style.backgroundColor = "rgb(255,95,100)";
	}
}
function viewFunc(){
	if (t){
		Password.type = "text";
		view.style.fill = "rgb(0,0,0)";
		t = false;
	}else {
		Password.type = "password";
		view.style.fill = "rgb(100,100,100)";
		t = true;
	}
}
async function loginFunc(){
	if (f1 && f2){
		const box = document.querySelector(".box");
		befor = box.innerHTML;
		box.innerHTML = "<h1 style = 'color: rgb(20,172,255);'>You are logged in</h1>";
		box.style.display = "flex";
		box.style.justifyContent = "center";
		box.style.alignItems = "center";
		box.style.textAlign = "center";
	}else if (!f1 && f2){
		error1.style.right = "10px";
		await sleep(100);
		error1.style.right = "0px";
		error1.style.left = "10px";
		await sleep(100);
		error1.style.left = "0";
		error1.style.right = "5px";
		await sleep(100);
		error1.style.right = "0";
		error1.style.left = "5px";
		await sleep(100);
		error1.style.left = "0";
	}else if (!f2 && f1){
		error2.style.right = "10px";
		await sleep(100);
		error2.style.right = "0px";
		error2.style.left = "10px";
		await sleep(100);
		error2.style.left = "0";
		error2.style.right = "5px";
		await sleep(100);
		error2.style.right = "0";
		error2.style.left = "5px";
		await sleep(100);
		error2.style.left = "0";
	}else {
		error2.style.right = "10px";
		error1.style.right = "10px";
		await sleep(100);
		error2.style.right = "0px";
		error2.style.left = "10px";
		error1.style.right = "0px";
		error1.style.left = "10px";
		await sleep(100);
		error2.style.left = "0";
		error2.style.right = "5px";
		error1.style.left = "0";
		error1.style.right = "5px";
		await sleep(100);
		error2.style.right = "0";
		error2.style.left = "5px";
		error1.style.right = "0";
		error1.style.left = "5px";
		await sleep(100);
		error2.style.left = "0";
		error1.style.left = "0";
	}
}
username.addEventListener("keyup", chackUserName);
Password.addEventListener("keyup", chackPassWord);
view.addEventListener("click", viewFunc);
login.addEventListener("click", loginFunc);