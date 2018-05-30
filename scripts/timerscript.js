//TIMER 
//variable
var interval = null;	//bo
var initial_minute = "";   //bo
var initial_second = "";	//bo
//var audio = new Audio('file.mp3');	//IDEA DI TRACCIA AUDIO ALLA FINE DELL'ALLERT -> più avanti

//Struct timer -> contains all the info about the actual timer
var tomato = {
	 second : 0,
	 minute : 25,
	 timer_working : 25,
	 timer_short_break : 5,
	 timer_long_break : 15,
	 timer_type : "working"
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
	disableStartButton(false);
}

//Resetta in base al tipo attuale
function resetActualTimer(){
	var minute;
	if(tomato.timer_type === "working") minute = tomato.timer_working;
	else if (tomato.timer_type === "break") minute = tomato.timer_short_break;
	else if (tomato.timer_type === "long_break") minute = tomato.timer_long_break;
	else minute = 25;
	resetTimer(minute);
}

//It resents the timer at default time
function resetTimer(minute){
	clearInterval(interval);
	tomato.minute = minute;
	tomato.seconds = 0;
	document.getElementById("timer").innerHTML = tomato.minute + " : 00";
	disableStartButton(false);
}

//Cambia il valore temporale 
//Assegnazione di uno dei 3 tipi di "sveglie"
function period( valore ){
	switch(valore){
		case "toma" :
			tomato.timer_type = "working";
			resetTimer(tomato.timer_working); 
			break;
		case "smlbrk" : 
			tomato.timer_type = "break";
			resetTimer(tomato.timer_short_break); 
			break;
		case "lngbrk" : 
			tomato.timer_type = "long_break";
			resetTimer(tomato.timer_long_break);
			break;
		default : console.log("mmh, impossible");
	}
}

//Cambia i valori del tomato, break e longbreak 
//(viene richiamato solo dalla Modal)
function changeTime(){
	tomato.timer_working = document.getElementById('tomatoTime').value;
	tomato.timer_short_break = document.getElementById('brkTime').value;
	tomato.timer_long_break = document.getElementById('lngbrkTime').value;
}

//Restituisce il tempo passato del timer attuale
function getTime(){
	if(tomato.timer_type === "working") return tomato.timer_working;
	else if (tomato.timer_type === "break") return tomato.timer_short_break;
	else if (tomato.timer_type === "long_break") return tomato.timer_long_break;
}

//CONTROLLO SUL TEMPO
//Quando il tempo è finito avverte con un segnale audio o un alert
function Timer() {

	if(tomato.seconds == 0){
		tomato.seconds = 59;
		tomato.minute -= 1;
		initial_second = "";
	} else {
		tomato.seconds -= 1;
		if(tomato.minute == 0 && tomato.seconds == 0){
			clearInterval(interval);
				
			alert("tempo finito!");
			initial_minute = "";
			
			if(tomato.timer_type == "working"){
				tomato.minute = tomato.timer_working;
			} else if(tomato.timer_type == "break"){
				tomato.minute = tomato.timer_short_break;
			} else {
				tomato.minute = tomato.timer_long_break;
			}
			
			//setInterval(audio.play() , 1000);
			//clearInterval(this);
			//audio.pause();
		}
	}

	if(tomato.seconds == 9){
		initial_second = "0";
	}
	if(tomato.minute == 9){
		initial_minute = "0";
	}
	
	document.getElementById("timer").innerHTML = initial_minute + tomato.minute + " : " + initial_second + tomato.seconds;
}

//Assegna a il bottone start un valore di verità scelto --> 
//serve per impedire di schiacciarlo più volte facendo partire più timer contemporanemente
function disableStartButton(truth){
	document.getElementById("startBtn").disabled = truth;
}

