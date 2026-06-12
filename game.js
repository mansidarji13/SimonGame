
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).on("click touchstart",function() {
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click",function(e){

    e.preventDefault();
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function() {
               nextSequence(); 
            }, 1000);

        }
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("#level-title").text("Game Over! Tap Anywhere or Press Any Key to Restart");
            startOver();
        }, 2000);
    }
}


function nextSequence() 
{

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Script to handle opening/closing the rules popup

$("#rules-btn").click(function() {
    $("#rules-modal").fadeIn();
});

$(".close-btn").click(function() {
    $("#rules-modal").fadeOut();
});

$(window).click(function(event) {
    if ($(event.target).is("#rules-modal")) {
        $("#rules-modal").fadeOut();
    }
});
