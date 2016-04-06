 var secondReamaining, 
     intervalHandle,
     timeDisplay = document.getElementById("time"),
     running = true;

function resetPage(){
    document.getElementById("inputArea").style.display = "block";

    document.getElementById("minutes").value = "";
    timeDisplay.setAttribute("class", ""); 
    document.getElementById("pause").style.display = "none"; 
}
function tick(){
    var min = Math.floor(secondReamaining / 60),
        sec = secondReamaining - (min * 60);

     if (sec < 10){
        sec = "0" + sec;
     }  
     var message = min + ":" + sec;
     timeDisplay.innerHTML = message;

    if (secondReamaining <= 5){

        timeDisplay.setAttribute("class", "emergency");
     }
     else if (secondReamaining <= 10){
        timeDisplay.setAttribute("class", "ten-or-less");
     }
     else if(secondReamaining <= 20){
        timeDisplay.setAttribute("class", "twenty-or-less");       
     }
    else if(secondReamaining <= 30){
        timeDisplay.setAttribute("class", "thirty-or-less");       
     }
    else if(secondReamaining <= 40){
        timeDisplay.setAttribute("class", "forty-or-less");       
     }
     else{
        timeDisplay.setAttribute("class", ""); 
     }
        
    if (secondReamaining === 0){
        clearInterval(intervalHandle);
        timeDisplay.innerHTML = "Done!";
        resetPage();
     }
    if (running){
     secondReamaining --;
    }
    else{
        timeDisplay.setAttribute("class", "paused");
    }
}
function pauseCountdown(){
    running = !running; 
}

function startCountdown(){
 // get contents of the "minutes" text box
    var minutes = document.getElementById("minutes").value,
     errorMessage = document.createElement("p");

     timeDisplay.innerHTML = "";
     errorMessage.setAttribute("id", "error");
     document.getElementById("inputArea").appendChild(errorMessage);
//check if it is not number
    if(isNaN(minutes) || minutes == ""){
        document.getElementById("error").innerHTML = "Please enter a number!";
        document.getElementById("minutes").value = "";
        return false; 
    } else if (minutes < 0 ){
        document.getElementById("error").innerHTML = "Dont be so negative, enter a possitive number!";
        document.getElementById("minutes").value = "";
    } else{
        document.getElementById("error").innerHTML = "";
        secondReamaining = minutes * 60;
        intervalHandle = setInterval(tick, 1000);
        document.getElementById("inputArea").style.display = "none"; 
        document.getElementById("pause").style.display = "block"; 
        return true;
    }
}

window.onload = function(){
    var inputMinutes = document.createElement("input");
    inputMinutes.setAttribute("id", "minutes");
    inputMinutes.setAttribute("class", "form-control");
    inputMinutes.setAttribute("type", "text");

    var startButton = document.createElement("input");
    startButton.setAttribute("type", "button");
    startButton.setAttribute("class", "btn btn-primary")
    startButton.setAttribute("value", "Start Countdown");

    var pauseButton = document.createElement("button");
    pauseButton.setAttribute("type", "submit");
    pauseButton.setAttribute("class", "btn btn-danger btn-lg")
    pauseButton.setAttribute("value", "Pause");
    pauseButton.setAttribute("id", "pause");
    
    var span = document.createElement("span");
    span.setAttribute("class", "glyphicon glyphicon-pause");

    startButton.onclick = function(){
        startCountdown();
    };

    pauseButton.onclick = function(){
        pauseCountdown();
    };
    document.getElementById("inputArea").appendChild(inputMinutes);
    document.getElementById("inputArea").appendChild(startButton);
    document.getElementById("controls").appendChild(pauseButton); 
    document.getElementById("pause").appendChild(span);
    pauseButton.style.display = "none"; 
;   
};