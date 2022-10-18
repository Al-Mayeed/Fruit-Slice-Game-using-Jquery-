var playing = false;
var score;
var trailsleft;
var step;
var action;
var fruits = ['apple', 'banana', 'grape', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
$(function () {
    $("#startreset").click(function () {
        // we are playing
        if (playing == true) {
            // reload page
            location.reload();
        }
        else {
            // we are not playing
            playing = true;

            //set score to 0
            score = 0;
            $("#scorevalue").html(score);

            //show trails left
            $("#trailsleft").show();
            trailsleft = 3;
            addHearts();

            $("#gameover").hide();

            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();



        }
    });


     $("#fruit1").mouseover(function(){
         score ++;
        $("#scorevalue").html(score);
        $("#sound")[0].play();

        clearInterval(action);

        $("#fruit1").hide("explode",500);

        setTimeout(startAction,500);

     });







function addHearts() {
    $("#trailsleft").empty();
    for (var i = 0; i < trailsleft; i++) {
        $("#trailsleft").append(' <img src="image/heart.png" class="life"> ');
    }
}


function startAction() {
    $("#fruit1").show();
    chooseFruit();//choose a randon fruit
    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

    //random position

    //generate a random fruit
    step = 1 + Math.round(5 * Math.random());//change step

    action = setInterval(function () {
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        //move fruit by one step
        //check if the fruit is too low
        if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
            if (trailsleft > 1) {
                $("#fruit1").show();
                chooseFruit();//choose a randon fruit
                $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });

                //random position

                //generate a random fruit
                step = 1 + Math.round(5 * Math.random());

                //reduce trails by one
                trailsleft --;
                addHearts();
            }
            else{
                //game over
                playing = false;
                $("#startreset").html("Start Game");

                $("#gameover").show();
                $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score + '</p>');
                $("#trailsleft").hide();
                stopAction();
                
            }
        }
    }, 10);


}


//generate random fruit
function chooseFruit() {
    $("#fruit1").attr('src', 'image/' + fruits[Math.round(8 * Math.random())] + '.png');
}


function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}

});




