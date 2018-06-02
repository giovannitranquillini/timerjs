//TIMER 
//variable
var interval = null;	//bo
var initial_minute = "";   //bo
var initial_second = "";	//bo
//var audio = new Audio('file.mp3');	//IDEA DI TRACCIA AUDIO ALLA FINE DELL'ALLERT -> più avanti

const type = {
	WORK : "work",
	BREAK : "break",
	LONGBREAK : "longbreak"
}
//Struct timer -> contains all the info about the actual timer
var timer_duration = {
	t_working : 25,
	t_break : 5,
	t_longbreak : 15
}

var timer = {
	 second : 0,
	 minute : 25,
	 type : type.WORK
};

//Starts timer
function startTimer() {
	//set interval
	interval = setInterval(Timer , 1000);
	//disable the button start -> 
	//every time it's pressed, set a new interval 
	//this ""fixed"" the problem
	disableStartButton(true);
}

//Stops timer and saves the time left in this moment 
function stopTimer() {
	clearInterval(interval);
	//able the start button
	disableStartButton(false);
}

//Reset based on the current ""type" of timer
function resetActualTimer(){
	var minute;
	if(timer.type === type.WORK) minute = timer_duration.t_working;
	else if (timer.type === type.BREAK) minute = timer_duration.t_break;
	else if (timer.type === type.LONGBREAK) minute = timer_duration.t_longbreak;
	else minute = 25;
	resetTimer(minute);
}

//It resents the timer at default time
function resetTimer(minute){
	clearInterval(interval);
	timer.minute = minute;
	timer.seconds = 0;
	document.getElementById("timer").innerHTML = timer.minute + " : 00";
	disableStartButton(false);
}

//Cambia il valore temporale 
//Assegnazione di uno dei 3 tipi di "sveglie"
function period( value ){
	switch(value){
		case "toma" :
			timer.type = type.WORK;
			resetTimer(timer.timer_working); 
			break;
		case "smlbrk" : 
			timer.type = type.BREAK;
			resetTimer(timer.timer_short_break); 
			break;
		case "lngbrk" : 
			timer.type = type.LONGBREAK;
			resetTimer(timer.timer_long_break);
			break;
		default : console.log("There was an Error!");
	}
}

//Cambia i valori del timer, break e longbreak 
//(viene richiamato solo dalla Modal)
function changeTime(){
	timer_duration.t_working = document.getElementById('tomatoTime').value;
	timer_duration.t_break = document.getElementById('brkTime').value;
	timer_duration.t_longbreak = document.getElementById('lngbrkTime').value;
}

//Restituisce il tempo passato del timer attuale
function getTime(){
	if(timer.type === type.WORK) return timer_duration.t_working;
	else if (timer.type === type.BREAK) return timer_duration.t_break;
	else if (timer.type === type.LONGBREAK) return timer_duration.t_longbreak;
}

//CONTROLLO SUL TEMPO
//Quando il tempo è finito avverte con un segnale audio o un alert
function Timer() {

	if(timer.seconds == 0){
		timer.seconds = 59;
		timer.minute -= 1;
		initial_second = "";
	} else {
		timer.seconds -= 1;
		if(timer.minute == 0 && timer.seconds == 0){
			clearInterval(interval);
				
			alert("tempo finito!");
			initial_minute = "";
			
			if(timer.type == "working"){
				timer.minute = timer.timer_working;
			} else if(timer.type == "break"){
				timer.minute = timer.timer_short_break;
			} else {
				timer.minute = timer.timer_long_break;
			}
			
			//setInterval(audio.play() , 1000);
			//clearInterval(this);
			//audio.pause();
		}
	}

	if(timer.seconds == 9){
		initial_second = "0";
	}
	if(timer.minute == 9){
		initial_minute = "0";
	}
	
	document.getElementById("timer").innerHTML = initial_minute + timer.minute + " : " + initial_second + timer.seconds;
}

//Assegna a il bottone start un valore di verità scelto --> 
//serve per impedire di schiacciarlo più volte facendo partire più timer contemporanemente
function disableStartButton(truth){
	document.getElementById("startBtn").disabled = truth;
}

