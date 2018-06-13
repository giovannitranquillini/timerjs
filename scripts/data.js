//VARIABLES OR STRUCTS
//TIMER 
//Array of timers
var timers = [];
var initial_minute = "";   	//thing for a correct view output
var initial_second = "";	//thing for a correct view output

var flag = {
	loop : false,
	continuous_counting : false
};

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
//Change timer_duration values based on the input of the user on HTML page  
//(it's call in the Modal with button 'SAVE CHANGES')
function changeTime(){
	timer_duration.t_working = document.getElementById('work').value;
	timer_duration.t_break = document.getElementById('break').value;
	timer_duration.t_longbreak = document.getElementById('longbreak').value;
}

//flag set
function setFlag(_flag) {
	if(_flag == "loop") flag.loop = !flag.loop;
	if(_flag == "counting") flag.continuous_counting = !flag.continuous_counting;
}

//Solution found on stackoverflow.com
//Thank you :)
//https://stackoverflow.com/questions/3387427/remove-element-by-id
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}