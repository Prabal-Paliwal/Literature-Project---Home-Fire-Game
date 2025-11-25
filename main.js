var fightscene = document.getElementById("fight");
var BG = document.getElementById("background");
var player = document.getElementById('player');
var boss = document.getElementById('boss');
var playerHealth = document.getElementById("player-health");
var bossHealth = document.getElementById("boss-health");
var phealth = 100;
var bhealth = 100;

var playerState = 'idle';
var bossState = "idle";
var attacking = false; 
var punching = false;
var playerPos = 150;
var bossPos = 700;
var keys = [false, false];
var jumping = false;

var speed = 5;

function animation(){
    if(playerPos >= 100 && playerPos <= (BG.clientWidth)  - 100){
    if(keys[0]){
        playerPos -= speed;
        if(playerState != "running"){
        player.src = 'eamonn/player-running.gif';
        playerState = "running";
        }
        player.style.transform ="scaleX(-1)";
        
    } else if(keys[1]){
        playerPos += speed;
        if(playerState != "running"){
        player.src = 'eamonn/player-running.gif';
        playerState = "running";
        }
        player.style.transform ="scaleX(1)";
    } 
    }else if(playerPos < 100){
        playerPos = 100;
    }else if(playerPos > (BG.clientWidth) - 100){
        playerPos = (BG.clientWidth) - 100;
    }
    player.style.left = playerPos + "px";  

    //karamat follow
    boss.style.left = "700px"; 
    var distance = playerPos - bossPos;
    if(playerPos < bossPos){
        boss.style.transform = "scaleX(-1)";
        if(distance < -100){
            if(bossState != "running"){
            boss.src = "karamat/karamat-running.gif";
            bossState = "running";
            }
            bossPos -= 1;
        }else{
            if(bossState != "attack"){
            boss.src = "karamat/karamat-smash.gif";
            bossState = "attack";
            }
            if(!attacking){
                setTimeout(attack,960);
                attacking = true;
            }
        }
    }else{
        boss.style.transform = "scaleX(1)";
        if(distance > 150){
            if(bossState != "running"){
            boss.src = "karamat/karamat-running.gif";
            bossState = "running";
            }
            bossPos += 1;
        }else{
            if(bossState != "attack"){
            boss.src = "karamat/karamat-smash.gif";
            bossState = "attack";
            }
            if(!attacking){
                setTimeout(attack,960);
                attacking = true;
            }
    }   
    }

    boss.style.left = bossPos + "px";


    requestAnimationFrame(animation);
}
animation();

function attack(){
    if(Math.abs(playerPos - bossPos-50) <= 150){
    if(phealth <= 10){
        document.getElementById("lose").style.display = 'block';
    }else{
        phealth -= 10;
    }
    playerHealth.style.width = phealth + "%";
    }
    attacking = false;
}

window.addEventListener("keypress", (e) => {
    if(e.key == "a"){
        keys[0] = true;
    }
    if(e.key == "d"){
        keys[1] = true;
    }
    if(e.key == ' ' && !punching && Math.abs(playerPos - bossPos-50) <= 150){
        bhealth -= 7;
        bossHealth.style.width = bhealth+"%";
        player.src = "eamonn/player-punch" + (Math.floor(Math.random() * 2) + 1) + ".gif";
        punching = true;
        if(bhealth <= 0){
            document.getElementById("win").style.display = "block";
        }
        setTimeout(() => {punching = false;}, 700);
    }
});

window.addEventListener("keyup", (e) => {
    if(e.key == "a"){
        keys[0] = false;
        if(playerState != "idle"){
        player.src = 'eamonn/player-idle.gif';
        playerState = "idle";
        }
    }
    if(e.key == "d"){
        keys[1] = false;
        if(playerState != "idle"){
        player.src = 'eamonn/player-idle.gif';
        playerState = "idle";
        }
    }
});