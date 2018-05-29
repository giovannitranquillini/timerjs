//TIMER 
//variabili
var interval = null;	//bo
var initMin = "";   //bo
var initSec = "";	//bo
//var audio = new Audio('file.mp3');	//traccia audio sveglia

//Valore dei timer, min,sec, ecc...
var tomato = {
	 sec : 0,
	 min : 25,
	 tToma : 25,
	 tBrk : 5,
	 tLngBrk : 15,
	 type : "t"
};

//Fa partire un timer
function startTimer() {
	interval = setInterval(Timer , 1000);
	disableStartButton(true);
}

//Interrompe il timer al valore attuale visualizzato
function stopTimer() {
	clearInterval(interval);
	disableStartButton(false);
}

//Resetta in base al tipo attuale
function resetActualTimer(){
	var min;
	if(tomato.type === "t") min = tomato.tToma;
	else if (tomato.type === "b") min = tomato.tBrk;
	else if (tomato.type === "lb") min = tomato.tLngBrk;
	else min = 25;
	resetTimer(min);
}

//Resetta il tempo al valore iniziale
function resetTimer(min){
	clearInterval(interval);
	tomato.min = min;
	tomato.sec = 0;
	document.getElementById("timer").innerHTML = tomato.min + " : 00";
	disableStartButton(false);
}

//Cambia il valore temporale 
//Assegnazione di uno dei 3 tipi di "sveglie"
function period( valore ){
	switch(valore){
		case "toma" :
			tomato.type = "t";
			resetTimer(tomato.tToma); 
			break;
		case "smlbrk" : 
			tomato.type = "b";
			resetTimer(tomato.tBrk); 
			break;
		case "lngbrk" : 
			tomato.type = "lb";
			resetTimer(tomato.tLngBrk);
			break;
		default : console.log("mmh, impossible");
	}
}

//Cambia i valori del tomato, break e longbreak 
//(viene richiamato solo dalla Modal)
function changeTime(){
	tomato.tToma = document.getElementById('tomatoTime').value;
	tomato.tBrk = document.getElementById('brkTime').value;
	tomato.tLngBrk = document.getElementById('lngbrkTime').value;
}

//Restituisce il tempo passato del timer attuale
function getTime(){
	if(tomato.type === "t") return tomato.tToma;
	else if (tomato.type === "b") return tomato.tBrk;
	else if (tomato.type === "lb") return tomato.tLngBrk;
}

//CONTROLLO SUL TEMPO
//Quando il tempo è finito avverte con un segnale audio o un alert
function Timer() {

	if(tomato.sec == 0){
		tomato.sec = 59;
		tomato.min -= 1;
		initSec = "";
	} else {
		tomato.sec -= 1;
		if(tomato.min == 0 && tomato.sec == 0){
			clearInterval(interval);
				
			alert("tempo finito!");
			initMin = "";
			
			if(tomato.type == "t"){
				tomato.min = tomato.tToma;
			} else if(tomato.type == "b"){
				tomato.min = tomato.tBrk;
			} else {
				tomato.min = tomato.tLngBrk;
			}
			
			//setInterval(audio.play() , 1000);
			//clearInterval(this);
			//audio.pause();
		}
	}

	if(tomato.sec == 9){
		initSec = "0";
	}
	if(tomato.min == 9){
		initMin = "0";
	}
	
	document.getElementById("timer").innerHTML = initMin + tomato.min + " : " + initSec + tomato.sec;
}

//Assegna a il bottone start un valore di verità scelto --> 
//serve per impedire di schiacciarlo più volte facendo partire più timer contemporanemente
function disableStartButton(truth){
	document.getElementById("startBtn").disabled = truth;
}

