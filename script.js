
let players = [];
let board = [];


let col;
let row;

let playColor = ["rgb(36, 238, 181)","rgb(211, 36, 238)"];
const defaultColor = "rgb(128,128,128)";  //gray

let curPlay;

function configureInputNames(){
    
    if(players[0].length > 10){
        players[0] = "neolle";
        console.log("name should be <=10 char, edit script.js for longer name")       
    }
    if(players[1].length > 10){
        console.log("Can't you use shorter names?")
        players[1] = "Astra";  
    }

    if(players[1].trim() === players[0].trim()){
        players[0] = "^.^";
        players[1] = "^.^";
    }
    $('#p1name').text(players[0]);
    $('#p2name').text(players[1]);
}

function designBoard(){

    col = parseInt($('#ncol').text());
    row = parseInt($('#nrow').text());
    $('td').text("");
    $("#startbtn").css({"border-color":"red", "background":"gray"});
    $('table').html("");

    
    

    let cnt = 0;
    for(let i=0;i<row;i++){
        let newRow = $('<tr></tr>').text("");
        for(let j=0;j<col;j++){
            board[cnt] = 0;
            let box = $('<td></td>').text("");
            box.attr("id",cnt.toString());
            newRow.append(box);
            cnt++;
        }
        $('table').append(newRow);
    }

}

function init(){
   
    players.push($('#p1name').text());
    players.push($('#p2name').text());

    configureInputNames();

    $("#p1wins").text("0");
    $("#p2wins").text("0");

    $(".playername").attr("contenteditable","false");
    $(".playername").css("text-decoration","none");


    $(".playername").click(function (){ 
        $("#noeditalert").css("display","block");
        setTimeout(function(){
            $("#noeditalert").css("display","none");
        }, 400);
    });



    designBoard();

    let randInt01 = Math.floor(Math.random()*2);
    curPlay = randInt01;
    startGame();

}



function setBoard(index, value){
    board[index] = value;
}

function colorAssign(event) {

    let boxColor = playColor[curPlay];

    console.log(boxColor, curPlay);
    let index = parseInt(this.id);

    if(board[index]!==1){
        $("#"+index).css("background", boxColor);         
        index += col;
    }else{
        return;
    }

    let intervalId = setInterval( () => { 
       
        if(index >= (row)*(col) || board[index] === 1) {
            clearInterval(intervalId);
            setBoard(index-col, 1);
            return;
        } 
        $("#"+(index-col)).css("background", defaultColor);    
        $("#"+index).css("background", boxColor);
        index += col;
    }, 200, index);        
};

function playerAssign(){
    let corners = [0, row*col-1, col-1, row*(col-1)];
    setTimeout(()=>{

        curPlay = curPlay===1?0:1;
        for(let i of corners){
            $("#"+i).css("border-color",playColor[curPlay]);
        }
        if(curPlay === 1){
            $('#dot1').css("visibility","hidden");
            $('#dot2').css("visibility","visible");
        }else{
            $('#dot2').css("visibility","hidden");
            $('#dot1').css("visibility","visible");
        }
        console.log(curPlay);
    },50);
    
}



function startGame(){
    
    let corners = [0, row*col-1, col-1, row*(col-1)];
    if(curPlay === 1){
        $('#dot1').css("visibility","hidden");
        $('#dot2').css("visibility","visible");
    }else{
        $('#dot2').css("visibility","hidden");
        $('#dot1').css("visibility","visible");
    }
    for(let i of corners){
        $("#"+i).css("border-color",playColor[curPlay]);
    }

    $('td').click(playerAssign);
    $('td').click(colorAssign);
    

    // curPlay = !curPlay;
    // boxColor = playColor[curPlay];
    // console.log(curPlay);
}



// todo: startbtn border color change acc to player turn
// todo: Js threading(async...)
// todo: Js objects, classes

// can't use $ for global assignment in row and col