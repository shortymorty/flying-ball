var bollen = document.getElementById("boll");
var game = document.getElementById("game");
var score = document.getElementById("score");
var brickan = document.getElementById("brick");
var woodsound = document.getElementById("woodsound");
var moneysound = document.getElementById("moneysound");
var song = document.getElementById("bass-song");
let pause = 1;
document.addEventListener("keydown", function(event){
    let key = event.key;

    switch(key){
        case "ArrowLeft":
            event.preventDefault();
            brickan.style.left = (parseInt(window.getComputedStyle(brickan).getPropertyValue("left")) - 10) + "px";
            break;
        case "ArrowRight":
            event.preventDefault();
            brickan.style.left = (parseInt(window.getComputedStyle(brickan).getPropertyValue("left")) + 10) + "px";
            break;
        case "Escape":
            event.preventDefault();
            pause = 1;
            song.pause();
            console.log(pause);
            break;
        case "Enter":
            event.preventDefault();
            pause = 0;
            song.play();
            break;


    }
});
song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
document.onclick = function(){
    song.play();
    pause = 0;
};

var delta = 2;
var deltaX =2;
var gameScore = 0;
var flyttaBoll = setInterval(function(){
    //bollens position i Y-led
    var bollenY = 
    parseInt(window.getComputedStyle(bollen).getPropertyValue("top"));
    //bollens position i X-led
    var bollenX = 
    parseInt(window.getComputedStyle(bollen).getPropertyValue("left"));
    //spelets höjd
    var gameY =
    parseInt(window.getComputedStyle(game).getPropertyValue("height"));
    //spelets bredd
    var gameX =
    parseInt(window.getComputedStyle(game).getPropertyValue("width"));
    //bollens höjd
    var bollenHeight =
    parseInt(window.getComputedStyle(bollen).getPropertyValue("height"));
    //bollens bredd
    var bollenWidth =
    parseInt(window.getComputedStyle(bollen).getPropertyValue("width"));
    //brickans position i x-led
    var brickanX =
    parseInt(window.getComputedStyle(brickan).getPropertyValue("left"));
    //brickans längd
    var brickanLength =
    parseInt(window.getComputedStyle(brickan).getPropertyValue("width"));
    if (pause == 0){
        
    
        // om bollen träffar golvet byt riktning
        if ( bollenY < 0) {
            delta = delta*-1;
            console.log("höjdträff");
            woodsound.play();
        }   
        // om bollen träffar brickan
        if (bollenX >= brickanX && bollenX <= brickanX + brickanLength
            && bollenY + bollenHeight >= 490 && bollenY + bollenHeight <=500){
            delta = delta*-1;
            gameScore += 1;
            bollen.style.top = "475px";
            console.log("brickträff");
            moneysound.play();
        }
        // om bollen träffar någon sida byt riktning
        if (bollenX >= gameX - bollenWidth || bollenX < 0 ) {
            deltaX = deltaX*-1;
            console.log("sidoträff");
            woodsound.play();
        }
        // om bollen träffar golvet
        if (bollenY >= gameY - bollenHeight){
            delta = delta * -1;
            woodsound.play();
        }
        // flytta bollen
        bollen.style.top = bollenY + delta + "px";
        bollen.style.left = bollenX + deltaX + "px";
        score.innerText = "Score: " + gameScore;
    }
}, 10);