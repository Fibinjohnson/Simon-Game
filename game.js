$(document).ready(function(){
    var buttonColors=["red","blue","yellow","green"];
    var gamePattern=[];
    var userClickedPattern=[];
    var level=0;
    var started=false;

//starting by keyboard pressing........

    document.addEventListener("keydown", function(){
    if(!started){
        $("h1").text("Level"+" "+ level);
        nextSequence();
        started=true;
    }})
  
    
//system randomly choosing........     

   
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    choosenColors=buttonColors[randomNumber];
    gamePattern.push(choosenColors);
    console.log(gamePattern)
    $("#"+choosenColors).fadeOut(100).fadeIn(100);
    playSound(choosenColors);
    animatePress($("#"+choosenColors));
}
//user clicking .................

    $(".btn").click(function(){ $(this).fadeOut(100).fadeIn(100);
        
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);  
         playSound( $(this).attr("id"));
        animatePress($(this));
        checkAnswers(userClickedPattern.length-1);
       
       
      }
      
      );
  

//function of playing sound...........
  

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

} 


//function of animation.........

function animatePress(names)
  {
    names.addClass("pressed");
    setTimeout(function(){
        $(".btn").removeClass("pressed");
    },100);
  }
  
//COMPARING ANSWERS.....
 function checkAnswers(currentLevel){
 
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){      
        
        console.log("hurray")
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);}
        else (console.log("continuing") ) ;
       
    }
     else
    {
           console.log("You loose")
           $("#level-title").text("you loose"); 
           playSound("wrong");
           $("body").addClass("game-over")
           setTimeout(function(){
              $("#level-title").text("Game over,Press any key to restart")
            },500);
           setTimeout(function(){
              $("body").removeClass("game-over");
            },200);
           gameOverRestart();
    }
   
 }
  function gameOverRestart(){
    started=false;
    level=0;
    gamePattern=[];
 }

})


