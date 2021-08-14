var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function animatePress(currrentColour){

    $("#" + currrentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currrentColour).removeClass("pressed");
    }, 100);

}
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
  
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
  
  });

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
    } else
       {
  
           console.log("wrong");

           playSound("wrong");

            $("body").addClass("game-over");

             setTimeout(() => {
             $("body").removeClass("game-over");
              }, 200);
              $("#level-title").text("Game Over, Press Any Key to Restart");
              startOver();
        }
        
}
function startOver(){
    level = 0;
    gamePattern= [];
    started=false;

}
function nextSequence(){
    userClickedPattern=[];
    level++;
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}
 

$(document).keypress(function (){
    if(!started){
    nextSequence();
    $("#level-title").text("level" + " " + level);
    started=true;
    }
});


