let phrase = document.querySelector(".phrase");
let text = phrase.innerText;
let s_m = true;
let braces_num = [0, 0];
let result = 0;
let open_close = false;
let more = document.querySelector("#svg-more-close");
const equals = document.querySelector(".equals");
const result_text = document.querySelector(".result");
const clear = document.querySelector(".clear");
const back_space = document.querySelector(".backspace");
const buttons = document.querySelectorAll(".show-value");
function round(number, decimal){
	return Math.round(number * 10**decimal) / 10**decimal;
}
function equalsFunc(){
	if (result_text.innerHTML != 0){
		phrase.innerText = result_text.innerHTML;
		result = null;
		result_text.innerHTML = 0;
		result_text.style.visibility = "hidden";
	}
}
function return_true_text(txt){
	braces_num = [0, 0];
	for(let i = 0; i < txt.length; i++){
		if (i != 0 && txt[i] == '(' && txt[i - 1] != '(' && txt[i - 1] != '*' && txt[i - 1] != '/' && txt[i - 1] != '-' && txt[i - 1] != '+'){
			txt = txt.substring(0, i) + '*' + txt.substring(i, txt.length);
			i++;
		}
		if (i != txt.length - 1 && txt[i] == ')' && txt[i + 1] != ')' && txt[i + 1] != '*' && txt[i + 1] != '/' && txt[i + 1] != '-' && txt[i + 1] != '+'){
			txt = txt.substring(0, i + 1) + '*' + txt.substring(i + 1, txt.length);
		}
		if (txt[i] == '(') braces_num[0]++;
		else if (txt[i] == ')') braces_num[1]++;
	}
	for(let i = 0; i < braces_num[0] - braces_num[1]; i++)
		txt += ')';
	return txt;
}
function main_calc(txt){
	while(txt.indexOf('×') != -1){
		txt = txt.replace('×', '*');
	}
	while(txt.indexOf('÷') != -1){
		txt = txt.replace('÷', '/');
	}
	while(txt.indexOf('^') != -1){
		txt = txt.replace('^', '**');
	}
	let error = 0;
	while (txt.indexOf('abs(') != -1 && error < 100){
		let index = txt.indexOf('abs(');
		let braces = 0;
		let j = index + 4;
		for(let i of txt.substring(index + 4, txt.length)){
			if (i == '(')braces++;
			else if (i == ')')braces--;
			if (braces < 0)break;
			j++;
		}
		txt = txt.substring(0, index) + String(Math.abs(main_calc(txt.substring(index + 4, j)))) + txt.substring(j + 1, txt.length);
		error++;
	}
	txt = return_true_text('(' + txt + ')');
	try{
		return round(eval(txt), 10);
	}catch{
		return result;
	}
}
function preview_answer(text = phrase.innerText){
	let number = 0;
	let numbers_num = 0;
	for(let i of text){
		if (i != '*' && i != '/' && i != '-' && i != '^' && i != '+' && i != '.' && i != '(' && i != ')'){
			number++;
		}else if (i != '.' && number != 0){
			numbers_num++;
			number = 0;
		}
	}
	const s = text.length - 1;
	const t = text
	if (numbers_num > 0 && t[s] != "÷" && t[s] != "×" && t[s] != "+" && t[s] != "^" && t[s] != "-" && t[s] != "(" && t[s] != "."){
		result = main_calc(text);
		result_text.innerHTML = result;
		result_text.style.visibility = "visible";
	}else if (numbers_num < 1){
		result_text.innerHTML = 0;
		result_text.style.visibility = "hidden";
	}
}
function enterCharacters(character){
	if (character == '*') character = '×';
	else if (character == 'p') character = 'π';
	else if (character == 'e') character = 'e';
	else if (character == '/') character = '÷';
	else if (character == 'R') character = '+/-';
	else if (character == 'S') character = '√';
	else if (character == '|x|' || character == 'a') character = 'abs(';
	else if (character == 'rad' || character == 'r') character = '';
	else if (character == 'x^y') character = '^';
	else if (character == 'x^2') character = '^2';
	else if (character == 'cos' || character == 'c') character = 'cos(';
	else if (character == 'sin' || character == 's') character = 'sin(';
	else if (character == 'tan' || character == 't') character = 'tan(';
	else if (character == 'log' || character == 'l') character = 'log(';
	else if (character == '1/x' || character == 'Control') character = '';
	text = phrase.innerText;
	braces_num = [0, 0];
	for(let i of text){
		if (i == '(') braces_num[0]++;
		if (i == ')') braces_num[1]++;
	}
	if (character == "+/-" && text != '0'){
		if(s_m){
			phrase.innerText = "-(" + text + ')';
			s_m = false;
		}else {
			phrase.innerText = text.substring(2, text.length - 1);
			s_m = true;
		}
	}
	else s_m = true;
	console.log(text);
	if (character == "." || character == "÷" || character == "×" || character == "-" || character == "+" || character == "^" || character == "(" || character == ")"
	 || character == "log(" || character == "tan(" || character == "cos(" || character == "sin(" || character == "abs("){
		if ((character == "÷" || character == "×" || character == "-" || character == "+" || character == ")" || character == "^" || (character == "(" && text[text.length - 1] == '.')) && (text[text.length - 1] == "÷"
			|| text[text.length - 1] == "×" || text[text.length - 1] == "-" || text[text.length - 1] == "+" || text[text.length - 1] == "^" || (text[text.length - 1] == "(" && character != "-") || text[text.length - 1] == ".")){
		}else if ((character == "tan(" || character == "cos(" || character == "sin(" || character == "log(" || character == "abs(") && String(Number(text[text.length - 1])) != "NaN" && String(text) != "0"){
		}else if (character == ")" && braces_num[0] <= braces_num[1]){
		}else if (character == "."){
			for(let i = text.length - 1;; i--){
				if (text[i] == '.'){
					break;
				}else if(i < 0 || text[i] == "÷" || text[i] == "×" || text[i] == "^" || text[i] == "×" || text[i] == "-" || text[i] == "+" || text[i] == "(" || text[i] == ")"){
					if (i == text.length - 1) phrase.innerText += '0.';
					else phrase.innerText += '.';
					break;
				}
			}
		}else if (text != '0' || character == '-'){
			if (character == '-' && text == '0') phrase.innerHTML = character;
			else phrase.innerText += character;
		}else if (character == '('){
			phrase.innerHTML = '(';
		}
	}else if (text != '0' && character != "+/-") phrase.innerText += character;
	else if (character != "+/-") phrase.innerHTML = character;
	preview_answer();
}
function Clear(){
	result_text.innerHTML = 0;
	result_text.style.visibility = "hidden";
	phrase.innerText = '0';
	console.clear();
}
function backSpace(){
	text = phrase.innerText;
	let size = text.length - 1;
	if (size == 0){
		phrase.innerText = '0';
	}else if (text[size] == '(' && (text[size - 1] == 's' || text[size - 1] == 'n' || text[size - 1] == 'g')){
		phrase.innerText = text.substring(0, text.length - 4)
		if (phrase.innerText == "")phrase.innerText = 0;
	}else{
		phrase.innerText = text.substring(0, text.length - 1)
	}
	text = phrase.innerText;
	size = text.length - 1;
	while(text[size] == '×' || text[size] == '÷' || text[size] == '+' || text[size] == '-' || (text[size] == '(' && text[size - 1] != 's' && text[size - 1] != 'n' && text[size - 1] != 'g')){
		text = text.substring(0, size);
		size = text.length - 1;
	}
	preview_answer(text = text);
}
function More(){
	if (open_close == false) {
		document.querySelector(".d").style.backgroundColor = '#586A6A';
		document.querySelector(".d").innerHTML = '00';
		document.querySelector(".buttons1").style.display = "grid";
		document.querySelector("#svg-more-close").innerHTML = '<svg class="more" fill="#DAD4EF" viewBox="0 0 20 20"><path d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z"></path></svg>';
		open_close = true;
	}else if (open_close == true){
		document.querySelector(".d").style.backgroundColor = '#818D92';
		document.querySelector(".d").innerHTML = '+/-';
		document.querySelector(".buttons1").style.display = "none";
		document.querySelector("#svg-more-close").innerHTML = '<svg class="more" viewBox="0 0 20 20" fill="#DAD4EF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>';
		open_close = false;
	}
}
equals.addEventListener("click", equalsFunc);
back_space.addEventListener("click", backSpace);
clear.addEventListener("click", Clear);
more.addEventListener("click", More)
window.addEventListener("keydown", event => {
	if (event.key == "Backspace"){
		backSpace(event.key);
	}else if (event.key == "m"){
		More();
	}else if ((String(Number(event.key)) != 'NaN' && event.key != " ") || event.key == "*" || event.key == "/" || event.key == "+" || event.key == "-"
	 || event.key == "." || event.key == "(" || event.key == ")" || event.key == "r" || event.key == "R" || event.key == "t"
	 || event.key == "s" || event.key == "S" || event.key == "a" || event.key == "c" || event.key == "l" || event.key == "Control"
	 || event.key == "!" || event.key == "%" || event.key == "^" || event.key == "p" || event.key == "e"){
		enterCharacters(event.key);
	}else if (event.key == "C"){
		Clear();
	}else if (event.key == "=" || event.key == "Enter"){
		equalsFunc();
	}
})
buttons.forEach(item => {
	item.addEventListener("click", event => enterCharacters(event.target.innerText))
})