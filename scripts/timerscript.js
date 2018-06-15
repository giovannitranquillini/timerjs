// GESTIONE DEGLI OGGETTI TIMER : CREAZIONE, DISTRUZIONE , ( MODIFICA? )
// return an "object" timer based on the timer's type
function createTimer (_type) {
	return { 
		interval : null, 	//timer interval 
		second : 0,			//timer actual second
		minute : getTimeType(_type),	//timer actual minute
		property : {
			type : _type, //timer's type
			init_minute : getTimeType(_type)
		},		
		ID : getID()
	};
}
//remove a timer from timers
function destroyTimer(index) {
	timers.splice(index, 1); 
}
//ADD A NEW TIMER TO TIMERS
function newTimer(type) {

	if(timers.length < 15 ) {
	var tmp = createTimer(type);
	//console.log("oggetto tmp : " + tmp);
	timers.push(tmp);

	//DEFINE DIV ELEMENT
	var div = document.createElement("DIV");
	div.setAttribute("id" , tmp.ID);
	div.setAttribute("class", "timer_queue");
	//DEFINE TEXT OF THE DIV
	var node = document.createTextNode(getTimeType(type) + " , " + type + "  ");

	//DEFINE BUTTON DELETE
	var delete_button = document.createElement("button");
	delete_button.setAttribute("onclick", "removeItem(this)");
	var icon = document.createElement("i");
	icon.setAttribute("class", "fa fa-trash");

	delete_button.appendChild(icon);
	div.appendChild(node);
	div.appendChild(delete_button);

	var element = document.getElementById("timers_queue");
	element.appendChild(div);
	} else {
		alert("stop plis");
	}

}
//CAPIRE PERCHE' CON type.'VALUE' NON FUNZIONA!
// GIVE TYPE->TIMER_DURATION VALUE OF THE TYPE ARGUMENT GIVEN
function getTimeType(type) {
	if(type === "WORK") return timer_duration.t_working;
	else if (type === "BREAK") return timer_duration.t_break;
	else if (type === "LONGBREAK") return timer_duration.t_longbreak;
}
//if there no element in timers return 1, else return last item ID + 1
function getID () {
	var lng = timers.length;
	if(lng === 0) return 1;
	else return timers[lng - 1].ID + 1;
}
//remove an item on the file html based on the element ID
function removeItemById(id) { 
	document.getElementById(id).remove();
}
//remove the selected for ID item of the block 
function removeItem(element) { 
	_ID = $(element).closest("div").attr("id")
	var i;
	for (i = 0; i < timers.length; i++) {
		if(timers[i].ID == _ID ) { 
			stopTimer(); 
			destroyTimer(i);
			removeItemById(_ID);
			initial_minute = "";
			initialize_timer();
			return;
		};
	}
}

// ------------------------ METHODS FOR COUNTING TIME --------------------------------------
//Starts timer
function startTimer() {
	//IF TIMERS IS NULL SET THE FIRST ELEMENT AS A BASE WORK TIMER
	if(!timers[0]) newTimer(type.WORK); console.log(timers[0]);
	timers[0].interval = setInterval(Timer , 1000);
	//disable the button start -> 
	//every time it's pressed, set a new interval 
	//this ""fixed"" the problem
	disableStartButton(true);
}
//Stops timer and saves the time left in this moment 
function stopTimer() {
	clearInterval(timers[0].interval);
	//able the start button
	disableStartButton(false);
}
//call initialize_timer, based on the current "type" of timer
function resetTimer() {
	var value = timers[0].property.init_minute;
	clearInterval(timers[0].interval);
	timers[0].minute = value;
	timers[0].second = 0;
	initialize_timer();
}
//It resents the timer at time given
function initialize_timer() {
	document.getElementById("timer").innerHTML = timers[0].minute + " : 00";
	disableStartButton(false);
}	
//Get timer_duration_time of the timer's type of the timer, counting in this moment 
// BASED ON THE TYPE OF THE ACTUAL TIMER COUNTING
function get_this_timer_duration() {
	if(timers[0].property.type === type.WORK) return timer_duration.t_working;
	else if (timers[0].property.type === type.BREAK) return timer_duration.t_break;
	else if (timers[0].property.type === type.LONGBREAK) return timer_duration.t_longbreak;
}

function updateWorkedData(this_minute) {
	var minute_so_far = document.getElementById("worked").innerHTML;
	document.getElementById("worked").innerHTML = parseInt(minute_so_far) + parseInt(this_minute);
	var times = document.getElementById("times").innerHTML;
	document.getElementById("times").innerHTML = parseInt(times) + 1;
}
//CONTROL ON TIME PASSING
//Every sec esec this, and decrement our timer. 
//Specific control on end of minute and end of timer 
//Alert when timer is over!
function Timer() {

	if(timers[0].second == 0){
		timers[0].second = 59;
		timers[0].minute -= 1;
		initial_second = "";
	} else {
		timers[0].second -= 1;
		if(timers[0].minute == 0 && timers[0].second == 0){

			alert("tempo finito!");
			initial_minute = "";
			
			if(timers[0].property.type == type.WORK) updateWorkedData(timers[0].property.init_minute);
			//setInterval(audio.play() , 1000);
			//audio.pause();

			clearInterval(timers[0].interval);
			removeItemById(timers[0].ID);
			destroyTimer(0);

			initial_second = "0";
			disableStartButton(false);
			if(timers[0] && flag.continuous_counting) startTimer(); 

		}
	}

	if(timers[0].second == 9){
		initial_second = "0";
	}
	if(timers[0].minute == 9){
		initial_minute = "0";
	}
	
	document.getElementById("timer").innerHTML = initial_minute + timers[0].minute + " : " + initial_second + timers[0].second;
}