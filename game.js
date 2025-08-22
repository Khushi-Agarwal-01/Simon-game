

buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

userPattern = [];
 var level = 0;
 started=false;

$(document).keypress(function(event) {
    if(!started){
    $("h1").text("Level "+ level);
    nextSequence();
    started=true;
    }
});
 function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
     
 } 
 

 function animatePress(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function() {
        $("#"+colour).removeClass("pressed");
    }, 100);
 }
 
function checkpattern(gamePattern,userPattern){
    for(var i=0;i<gamePattern.length;i++){
        if(gamePattern[i]!==userPattern[i]){
            return false;
        }
    }
    return true;
    } 

    function nextSequence(){
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour=buttonColours[randomNumber];
    gamePattern.push(randomColour);
    playSound(randomColour);
    $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").on("click", function(event) {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(userPattern.length === gamePattern.length&&started===true){
    if(checkpattern(gamePattern,userPattern)){
        userPattern=[];
        setTimeout(nextSequence,1000);}
    else{
            $("h1").text("Game Over, Press Any Key to Restart");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            gamePattern = [];
            userPattern = [];
            level = 0;
             started = false;
        }
    }
});


