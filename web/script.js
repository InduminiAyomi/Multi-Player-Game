
/*	
 Sample response
 Your server response should be in this format to draw the canvas
 */

var response;
var source = new EventSource('game');
source.onmessage = function (e) {
    console.log(e.data);
    response = JSON.parse(e.data);
    
    if(response.DOTS === null){
        
        if((response.PLAYERS[0][1]>response.PLAYERS[1][1])&&(response.PLAYERS[0][1]>response.PLAYERS[2][1])&&(response.PLAYERS[0][1]>response.PLAYERS[3][1]))
            window.alert("P1(Yellow) is win. Socre:  "+response.PLAYERS[0][1]);
        else if((response.PLAYERS[1][1]>response.PLAYERS[0][1])&&(response.PLAYERS[1][1]>response.PLAYERS[2][1])&&(response.PLAYERS[1][1]>response.PLAYERS[3][1]))
            window.alert("P2(Orange) is win. Socre: "+response.PLAYERS[1][1]);
        else if((response.PLAYERS[2][1]>response.PLAYERS[0][1])&&(response.PLAYERS[2][1]>response.PLAYERS[1][1])&&(response.PLAYERS[2][1]>response.PLAYERS[3][1]))
            window.alert("P3(Blue) is win. Socre: "+response.PLAYERS[2][1]);
        else if((response.PLAYERS[3][1]>response.PLAYERS[0][1])&&(response.PLAYERS[3][1]>response.PLAYERS[1][1])&&(response.PLAYERS[3][1]>response.PLAYERS[2][1]))
            window.alert("P4(Pink) is win. Socre: "+response.PLAYERS[3][1]);
        else
            window.alert("There is No Winner");
 
    }

    
};

console.log(response);

//Lets add the keyboard controls now
$(document).keydown(function (e) {
    var key = e.which;
    document.getElementById("keypress").value = key;
    sendPlayerPosition();
});
// TODO Send Keystroke to server			   
function sendPlayerPosition() {
    if (true) {
        var xmlhttprequest = new XMLHttpRequest();
        var keypress = document.getElementById("keypress").value;
        //send keystroke to servlet
        xmlhttprequest.open("POST", "UpdateGame?keypress=" + keypress, true);
        xmlhttprequest.send();
    } else {
        return;
    }
}





/*Canvas stuff*/
var canvas = $("#canvas");
var ctx = canvas[0].getContext("2d");
var w = canvas.width();
var h = canvas.height();
/*Lets save the cell width in a variable for easy control*/
var cw = 10; /*width of one element (food/players)*/

/*Lets paint the canvas now*/
ctx.fillStyle = "white";
ctx.fillRect(0, 0, w, h);
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, w, h);
function init() {

    /* Trigger the paint function every 100ms to update the canvas*/
    if (typeof game_loop !== "undefined")
        clearInterval(game_loop);
    game_loop = setInterval(paint, 100);
}

init();
/*Lets paint the player now*/
function paint() {

    /*Lets paint the canvas now*/
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);
    /*Lets paint players*/
    var players = response.PLAYERS;
    var pLength = players.length;
    for (i = 0; i < pLength; i++) {
        paint_player(players[i][0], players[i][2], players[i][3]);
        updateScoreboard(players[i][0], players[i][1]);
    }

    /*Lets paint the food*/
    var foods = response.DOTS;
    var fLength = foods.length;
    for (i = 0; i < fLength; i++) {
        paint_food(foods[i][0], foods[i][1], foods[i][2]);
    }

}

paint();
/*Function to paint players*/
function paint_player(type, x, y) {
    switch (type) {
        case "P1":
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "black";
            break;
        case "P2":
            ctx.fillStyle = "orange";
            ctx.strokeStyle = "black";
            break;
        case "P3":
            ctx.fillStyle = "cyan";
            ctx.strokeStyle = "black";
            break;
        case "P4":
            ctx.fillStyle = "pink";
            ctx.strokeStyle = "black";
            break;
        default:
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = "black";
    }
    ctx.beginPath();
    ctx.arc((x * cw) + 5, (y * cw) + 5, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
}

/*Function to paint food particles*/
function paint_food(type, x, y) {
    switch (type) {
        case "R":
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
            break;
        case "G":
            ctx.fillStyle = "green";
            ctx.strokeStyle = "green";
            break;
        case "B":
            ctx.fillStyle = "blue";
            ctx.strokeStyle = "blue";
            break;
        default:
            ctx.fillStyle = "red";
            ctx.strokeStyle = "red";
    }
    ctx.beginPath();
    ctx.arc((x * cw) + 5, (y * cw) + 5, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
}

function updateScoreboard(id, score) {
    var scoreId = "td." + id;
    var scoreValue = "td.Score" + id;
    $(scoreId).text(id);
    $(scoreValue).text(score);
}


