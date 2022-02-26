var playing = false;
var score;
var trialsLeft;
var step;
var action; //used to set interval function

var fruits = ['banana1','blueberry1','cherries1','mango','peach','pear','pineapple1','strawberry','watermelon'];

$(function(){
//click on start reset button
$("#startreset").click(function(){

    //we are playing
    if(playing == true){

        //reload page
        location.reload();
    }

    else{

        //we are not playing
        playing = true;//game initiated

        //set score to 0
        score = 0;//set score to 0
        $("#scorevalue").html(score);

        //show trials Left
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();
           
        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending fruits
        startAction();
    }
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
    //document.getElementById("slicesound").play();
        $("#slicesound")[0].play();//play sound

        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 500); //slice fruit

        //send new fruit
        setTimeout(startAction, 800);
});

//fill trialsLeft with heart
function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/Heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){

    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top': -50});
    //random position

    //generate a random step
    step = 1+Math.round(5*Math.random()); //change step //we add 1 because we don't want no=0 we want 
    //atleast no=1 now we are getting step btwn 1to 6
        

    //Move fruit down by one step every 10ms
    action = setInterval(function(){

            //move fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step);//move fruit by one step

            //check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){

                //check if we have trials left
                if(trialsLeft > 1){
                     //generate a fruit
                        $("#fruit1").show();
                        chooseFruit(); //choose a random fruit
                        $("#fruit1").css({'left' : Math.round(550*Math.random()),'top': -50});
                        //random position
                        //generate a random step
                        step = 1+Math.round(5*Math.random()); //change step //we add 1 because we don't want no=0 we want 
                        //atleast no=1 now we are getting step btwn 1to 6

                        //reduce trials by one
                        trialsLeft--;

                        //populate trialsLeft box
                        addHearts();

                }else{ //game over
                    playing = false; //we are not playing anymore

                    $("#startreset").html("start Game"); //change button to start Game
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p> <p>Your score is '+ score +'</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);
}

//generate random fruit

function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(9*Math.random())] +'.png');   
}

//stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});