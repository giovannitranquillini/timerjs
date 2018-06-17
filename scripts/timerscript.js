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

function destroyTimer(index) {
	timers.splice(index, 1); 
}

function printTimer(element) {
	
	var color = getColor(element.property.type);
	
	//DEFINE DIV ELEMENT
	var div = document.createElement("DIV")
	div.setAttribute("id" , element.ID);
	div.setAttribute("class", "timer col-12 col-lg-5 col-md-8 col-sm-12 " + color);
	//DEFINE TEXT OF THE DIV
	var node = document.createTextNode(element.property.init_minute);

	//DEFINE BUTTON DELETE
	var delete_button = document.createElement("button");
	delete_button.setAttribute("onclick", "removeItem(this)");
	delete_button.setAttribute("class", "delete-button");
	var icon = document.createElement("i");
	icon.setAttribute("class", "fa fa-trash");

	delete_button.appendChild(icon);
	div.appendChild(node);
	div.appendChild(delete_button);

	var element = document.getElementById("timers_queue");
	element.appendChild(div);
}

function getColor( type ) {
	if(type == "WORK") return "green";
	if(type == "BREAK") return "yellow";
	if(type == "LONGBREAK") return "red";
}

function newTimer(type) {

	if(timers.length < 10 ) {
	var tmp = createTimer(type);
	//console.log("oggetto tmp : " + tmp);
	timers.push(tmp);
	
	printTimer(tmp);

	} else {
		alert("stop plis");
	}

}

function getTimeType(type) {
	if(type === "WORK") return timer_duration.t_working;
	else if (type === "BREAK") return timer_duration.t_break;
	else if (type === "LONGBREAK") return timer_duration.t_longbreak;
}

function getID () {
	var lng = timers.length;
	if(lng === 0) return 1;
	else return timers[lng - 1].ID + 1;
}

function removeItemById(id) { 
	document.getElementById(id).remove();
}

function removeItem(element) { 
	_ID = $(element).closest("div").attr("id")
	var i;
	for (i = 0; i < timers.length; i++) {
		if(timers[i].ID == _ID ) { 

			if(i == 0) {
				stopTimer();			
			}

			destroyTimer(i);
			removeItemById(_ID);
			initial_minute = "";

			if(!timers[0]) {		
				updateClock("00","00");
			} else if(flag.continuous_counting ){
				startTimer();
			} else if (i==0){
				initialize_timer();
			}

			return;
		};
	}
}

function startTimer() {
	//IF TIMERS IS NULL SET THE FIRST ELEMENT AS A BASE WORK TIMER
	if(!timers[0]) newTimer(type.WORK); updateClock(timers[0].minute, "00"); 
	timers[0].interval = setInterval(Timer , 1000);
	//disable the button start -> 
	//every time it's pressed, set a new interval 
	//this ""fixed"" the problem
	disableStartButton(true);
}

function stopTimer() {
	clearInterval(timers[0].interval);
	//able the start button
	disableStartButton(false);
}

function resetTimer() {
	clearInterval(timers[0].interval);
	timers[0].minute = timers[0].property.init_minute;
	timers[0].second = 0;
	initialize_timer();
}

function initialize_timer() {
	document.getElementById("timer").innerHTML = timers[0].minute + " : 00";
	disableStartButton(false);
}	

function updateWorkedData(this_minute) {
	var minute_so_far = document.getElementById("worked").innerHTML;
	document.getElementById("worked").innerHTML = parseInt(minute_so_far) + parseInt(this_minute);
	var times = document.getElementById("times").innerHTML;
	document.getElementById("times").innerHTML = parseInt(times) + 1;
}

function updateClock (minute, second) {
	document.getElementById("timer").innerHTML = initial_minute + minute + " : " + initial_second + second;
}

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

			clearInterval(timers[0].interval);
			if(flag.loop) {

				var tmp = timers[0];
				tmp.minute = tmp.property.init_minute;
				removeItemById(timers[0].ID);
				destroyTimer(0);

				timers.push(tmp);
				printTimer(tmp);
			} else {

				removeItemById(timers[0].ID);
				destroyTimer(0);

			}

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
	
	updateClock(timers[0].minute, timers[0].second);
}