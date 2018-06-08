// return an "object" timer based on the timer's type
function create_timer (_type){
	return { 
		interval : null, 	//timer interval 
		second : 0,			//timer actual second
		minute : get_time_type(_type),	//timer actual minute
		type : _type,		//timer's type
		ID : getID()
	};
}
//CAPIRE PERCHE' CON type.'VALUE' NON FUNZIONA!
// GIVE TYPE->TIMER_DURATION VALUE OF THE TYPE ARGUMENT GIVEN
function get_time_type(type){
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
//remove the selected for ID item of the block 
function removeItem(element) {
	_ID = $(element).closest("div").attr("id")
	var i;
	for (i = 0; i < timers.length; i++) {
		if(timers[i].ID == _ID ) { 
			stopTimer();
			timers.splice(i, 1);  
			removeItemById(_ID);
			return;
		};

	}
}
function removeItemById(id) { 
	document.getElementById(id).remove();
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
function resetActualTimer(){
	var value = get_this_timer_duration();
	initialize_timer(value);
}
//It resents the timer at time given
function initialize_timer(minute){
	clearInterval(timers[0].interval);
	timers[0].minute = minute;
	timers[0].second = 0;
	document.getElementById("timer").innerHTML = timers[0].minute + " : 00";
	disableStartButton(false);
}

// --------------------------- SETTINGS METHODS -------------------------------------
//Call initialize_timer and give a value based on output 'value'
//Assegnazione di uno dei 3 tipi di "sveglie" --> bisogna trovarci un' utilità
// function period( value ){
// 	switch(value){
// 		case "toma" :
// 			timer.type = type.WORK;
// 			initialize_timer(timer_duration.t_working); 
// 			break;
// 		case "smlbrk" : 
// 			timer.type = type.BREAK;
// 			initialize_timer(timer_duration.t_break); 
// 			break;
// 		case "lngbrk" : 
// 			timer.type = type.LONGBREAK;
// 			initialize_timer(timer_duration.t_longbreak);
// 			break;
// 		default : console.log("There was an Error!");
// 	}
// }
//---------------------------------------------------------------------------------------------------------

//Get timer_duration_time of the timer's type of the timer, counting in this moment 
// BASED ON THE TYPE OF THE ACTUAL TIMER COUNTING
function get_this_timer_duration(){
	if(timers[0].type === type.WORK) return timer_duration.t_working;
	else if (timers[0].type === type.BREAK) return timer_duration.t_break;
	else if (timers[0].type === type.LONGBREAK) return timer_duration.t_longbreak;
}

//------------------------- METHODS FOR MANAGE SINGLE TIMER (NEW/IDS/REMOVE/[UPDATE?]/ECC..) ---------------------------


//------------------------------------------------------------------->
//------------------------------------------------------------------->
//------------------------------------------------------------------->
// DA METTERE A POSTO -----------------------------------------------> 
//------------------------------------------------------------------->
//------------------------------------------------------------------->
//------------------------------------------------------------------->

//ADD A NEW TIMER TO TIMERS
function newTimer(type) {

	var tmp = create_timer(type);
	//console.log("oggetto tmp : " + tmp);
	timers.push(tmp);

	var div = document.createElement("DIV");
	var t_box = document.createElement("button");
	var node = document.createTextNode(get_time_type(type) + " , " + type + ", " + tmp.ID);
	
	div.setAttribute("id" , tmp.ID);
	t_box.setAttribute("onclick", "removeItem(this)");
	div.appendChild(node);
	div.appendChild(t_box);
	var element = document.getElementById("timers_queue");
	element.appendChild(div);
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
			clearInterval(timers[0].interval);
				
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

	if(timers[0].second == 9){
		initial_second = "0";
	}
	if(timers[0].minute == 9){
		initial_minute = "0";
	}
	
	document.getElementById("timer").innerHTML = initial_minute + timers[0].minute + " : " + initial_second + timers[0].second;
}