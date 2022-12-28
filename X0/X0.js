var itsX=true;
var endGame=false;
var rows=3;
var cols=3;
var clickedTiles=0;
var board = [];

window.onload=function(){
    setTiles();
}


function setTiles(){
    for(let i=0;i<rows;i++){
        let row=[];
        for(let j=0;j<cols;j++){
            //board[i][j]="0";
            let tile=document.createElement("div");
            tile.id=i.toString()+"."+j.toString();
            tile.addEventListener("click",clicked);
            tile.classList.value="tile";
            document.getElementById("container").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    //console.log(board);
}

function clicked (){
    tile = this;
    if(!endGame){
        if(tile.innerText==""){
            if(itsX){
                tile.innerText="X";
                itsX=false;
                clickedTiles++;
            }
            else{
                tile.innerText="O";
                itsX=true;
                clickedTiles++;
            }
        }
        if(clickedTiles>=((rows*cols)-2)){
            endGame=true;
        }else{
        //checkForWinner(tile);
        }
    }
}

/*function checkForWinner(tile){
    let coord=tile.id.split(".");
    let r=parseInt(coord[0]);
    let c=parseInt(coord[1]);
    //console.log(r,c);
    if(){}
}*/