const username = document.querySelector(".username");
const Password = document.querySelector(".password");
const login = document.querySelector(".login-button");
const icon1 = document.querySelector(".icon1");
const view = document.querySelector(".view");
const error1 = document.querySelector(".error1");
const error2 = document.querySelector(".error2");
let t = true;
let f1 = false;
let f2 = false;
function chackUserName(){
	let text = username.value;
	f1 = false;
	if (text.length == 0){
		icon1.innerHTML = '<path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>';
		icon1.style.fill = 'rgb(170,0,0)';
		error1.style.visibility = 'visible';
		error1.innerHTML = "pleas enter your username";
	}else if (text.length < 5){
		icon1.innerHTML = '<path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>';
		icon1.style.fill = 'rgb(170,0,0)';
		error1.style.visibility = 'visible';
		error1.innerHTML = "text must have at least 5 characters";
	}else if (text.indexOf(' ') != -1){
		icon1.innerHTML = '<path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>';
		icon1.style.fill = 'rgb(170,0,0)';
		error1.style.visibility = 'visible';
		error1.innerHTML = "username can not have space";
	}else if (String(Number(text)) != 'NaN'){
		icon1.innerHTML = '<path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>';
		icon1.style.fill = 'rgb(170,0,0)';
		error1.style.visibility = 'visible';
		error1.innerHTML = "username must have at least one letter";
	}else {
		icon1.innerHTML = '<path d="M7.197,16.963H7.195c-0.204,0-0.399-0.083-0.544-0.227l-6.039-6.082c-0.3-0.302-0.297-0.788,0.003-1.087C0.919,9.266,1.404,9.269,1.702,9.57l5.495,5.536L18.221,4.083c0.301-0.301,0.787-0.301,1.087,0c0.301,0.3,0.301,0.787,0,1.087L7.741,16.738C7.596,16.882,7.401,16.963,7.197,16.963z"></path>';
		icon1.style.fill = 'rgb(0, 170, 0)';
		error1.style.visibility = 'hidden';
		f1 = true;
	}
}
function chackPassWord(){
	let text = Password.value;
	f2 = false;
	if (text.length == 0){
		error2.style.visibility = 'visible';
		error2.innerHTML = "pleas enter your password";
	}else if (text.length < 5){
		error2.style.visibility = 'visible';
		error2.innerHTML = "text must have at least 5 characters";
	}else if (text.indexOf(' ') != -1){
		error2.style.visibility = 'visible';
		error2.innerHTML = "password can not have space";
	}else {
		error2.style.visibility = 'hidden';
		f2 = true;
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
function login(){
	if (f1 && f2){
		console.log('log in shodi raft dash');
	}else if (!f1){
		for(let i = 0; i < 10000; i++)
	}
}
username.addEventListener("keyup", chackUserName);
Password.addEventListener("keyup", chackPassWord);
view.addEventListener("click", viewFunc);
login.addEventListener("click", login);