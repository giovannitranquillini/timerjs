function create_timer (_minute, _type){
	return { 
		second : 0,
		minute : _minute,
		type : _type
	};
}

//TIMER 
//Array of timers
var timers = [];
//variable
var interval = null;	//timer interval
var initial_minute = "";   //thing for output
var initial_second = "";	//thing for output
//var audio = new Audio('file.mp3');//IDEA DI TRACCIA AUDIO ALLA FINE DELL'ALLERT -> più avanti

//type of timer --> "enum" type
const type = {
	WORK : "WORK",
	BREAK : "BREAK",
	LONGBREAK : "LONGBREAK"
}
//Struct timer -> contains all the info about the actual timer
var timer_duration = {
	t_working : 25,
	t_break : 5,
	t_longbreak : 15
}
//struct timer --> it contains the info of the timer playing right now
//var timer = create_timer(timer_duration.t_working, type.WORK);
//timers.push(timer);

//ADD A NEW TIMER TO TIMERS
function add_timer_to_timers(timer_duration, type) {
	timers.push(create_timer(timer_duration, type));
}
//Starts timer
function startTimer() {
	//IF TIMERS IS NULL SET THE FIRST ELEMENT AS A BASE WORK TIMER
	if(!timers[0]) add_timer_to_timers(timer_duration.t_working, type.WORK); console.log(timers[0]);
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

//Restituisce il tempo passato del timer attuale
function get_this_timer_duration(){
	if(timers[0].type === type.WORK) return timer_duration.t_working;
	else if (timers[0].type === type.BREAK) return timer_duration.t_break;
	else if (timers[0].type === type.LONGBREAK) return timer_duration.t_longbreak;
}

//call initialize_timer, based on the current "type" of timer
function resetActualTimer(){
	var value = get_this_timer_duration();
	initialize_timer(value);
}

//It resents the timer at default time
function initialize_timer(minute){
	clearInterval(interval);
	timers[0].minute = minute;
	timers[0].second = 0;
	document.getElementById("timer").innerHTML = timers[0].minute + " : 00";
	disableStartButton(false);
}

//Cambia il valore temporale 
//Assegnazione di uno dei 3 tipi di "sveglie"
function period( value ){
	switch(value){
		case "toma" :
			timer.type = type.WORK;
			initialize_timer(timer_duration.t_working); 
			break;
		case "smlbrk" : 
			timer.type = type.BREAK;
			initialize_timer(timer_duration.t_break); 
			break;
		case "lngbrk" : 
			timer.type = type.LONGBREAK;
			initialize_timer(timer_duration.t_longbreak);
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

//CONTROLLO SUL TEMPO
//Quando il tempo è finito avverte con un segnale audio o un alert
function Timer() {

	if(timers[0].second == 0){
		timers[0].second = 59;
		timers[0].minute -= 1;
		initial_second = "";
	} else {
		timers[0].second -= 1;
		if(timers[0].minute == 0 && timers[0].second == 0){
			clearInterval(interval);
				
			alert("tempo finito!");
			initial_minute = "";
			
			if(timers[0].type == "working"){
				timers[0].minute = timer_duration.t_working;
			} else if(timer.type == "break"){
				timers[0].minute = timer_duration.t_break;
			} else {
				timers[0].minute = timer_duration.t_longbreak;
			}
			
			//setInterval(audio.play() , 1000);
			//clearInterval(this);
			//audio.pause();
		}
	}

	if(timers[0].seconds == 9){
		initial_second = "0";
	}
	if(timers[0].minute == 9){
		initial_minute = "0";
	}
	
	document.getElementById("timer").innerHTML = initial_minute + timers[0].minute + " : " + initial_second + timers[0].second;
}

//Assegna a il bottone start un valore di verità scelto --> 
//serve per impedire di schiacciarlo più volte facendo partire più timer contemporanemente
function disableStartButton(truth){
	document.getElementById("startBtn").disabled = truth;
}