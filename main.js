var fightscene = document.getElementById("fight");
var BG = document.getElementById("background");
var player = document.getElementById('player');

var playerState = 'idle';
var playerPos = -100;
var keys = [false, false];
var jumping = false;

var speed = 5;

function animation(){
    if(playerPos <=  -70 && playerPos >= (-1 * BG.clientWidth) + 70){
    if(keys[0]){
        playerPos -= speed;
    } else if(keys[1]){
        playerPos += speed;
    } 
    player.style.left = playerPos + "px";
}else if(playerPos > -70){
    playerPos = -71;
}else if(playerPos < (-1 * BG.clientWidth) + 75){
    playerPos = (-1 * BG.clientWidth) + 70;
}
    

    requestAnimationFrame(animation);
}
animation();

window.addEventListener("keypress", (e) => {
    if(e.key == "a"){
        keys[0] = true;
        player.src = 'eamonn/player-running.gif';
        player.style.transform ="scaleX(-1)";
    }
    if(e.key == "d"){
        keys[1] = true;
        player.src = 'eamonn/player-running.gif';
        player.style.transform ="scaleX(1)";
    }
});
window.addEventListener("keyup", (e) => {
    if(e.key == "a"){
        keys[0] = false;
        player.src = 'eamonn/player-idle.gif';
    }
    if(e.key == "d"){
        keys[1] = false;
        player.src = 'eamonn/player-idle.gif';
    }
});