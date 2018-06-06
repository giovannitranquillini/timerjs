//VARIABLES OR STRUCTS
//TIMER 
//Array of timers
var timers = [];
var initial_minute = "";   	//thing for a correct view output
var initial_second = "";	//thing for a correct view output

//var audio = new Audio('file.mp3');//IDEA DI TRACCIA AUDIO ALLA FINE DELL'ALLERT -> più avanti

//Struct timer -> contains all the info about the actual timer
var timer_duration = {
	t_working : 25,
	t_break : 5,
	t_longbreak : 15
}
//type of timer --> "enum" type
const type = {
	WORK : "WORK",
	BREAK : "BREAK",
	LONGBREAK : "LONGBREAK"
}
//change value enable of button start
function disableStartButton(value){
	document.getElementById("startBtn").disabled = value;
}