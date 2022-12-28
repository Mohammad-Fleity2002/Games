var flagClicked=false;
var flagCounter=0;
var arr=[];
var cols=8;
var rows=8;
var bombs=5;
var bombsLocation=[];//
var flipped=0;//counter of flipped cases
var gameOver=false;

window.onload=function(){
    letSGo();
    setBomb();
}

function letSGo(){
    document.getElementById("bombNb").innerText=bombs;
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<cols;c++){
            let casse=document.createElement("div");
            casse.classList.value="case closed";
            casse.id=r.toString()+"."+c.toString();
            casse.addEventListener("click",flip);
            document.getElementById("container").append(casse);
            row.push(casse);

        }
        arr.push(row);
    }
    //console.log(arr);
}

function setBomb(){
        for (let j=0;j<bombs;j++){
            let r=Math.floor(Math.random()*rows);
            let c=Math.floor(Math.random()*cols);
            bombsLocation.push(r.toString()+"."+c.toString());
        }
    }
function flip(){
    if(!gameOver){
    let casse=this;
    if(flagClicked){
        if(casse.innerText==""){
            if(flagCounter<=(bombs+2)){
            casse.innerText="🚩";
            flagCounter++;
            if(bombsLocation.includes(casse.id)&&bombs>=0){
                /*bombs--;
                let score=document.getElementById("bombNb").innerText=bombs;*/
                if(bombs==0){
                    revealBombs();
                    gameOver=true;
                }
            }
        }
    }
        else if(casse.innerText=="🚩"){
            casse.innerText="";
            flagCounter--;
            if(bombsLocation.includes(casse.id)&&bombs>=0){
                /*bombs++;
                let score=document.getElementById("bombNb").innerText=bombs;*/
            }
        }
        return;//we can use else instead of return
    
    }
    if(bombsLocation.includes(casse.id)){
        revealBombs();
        //setTimeout(120, alert("): GAME 0VER :("));
        alert("): GAME 0VER :(");
        gameOver=true;
        return;//we can use else instead of return
    }
    let coord=casse.id.split(".");
    //console.log(coord[0]);
    let r=parseInt(coord[0]);
    let c=parseInt(coord[1]);
    checkBomb(r,c);
    }
}

function checkBomb(r,c){
    let casse=document.getElementById(r.toString()+"."+c.toString());
    if(r<0||r>=rows||c<0||c>=cols){
        return;
    }
    if(casse.classList.contains("clicked")){
        return;
    }
    casse.classList.add("clicked")
    let bombsFound=0;
    bombsFound+=checkCasse(r-1,c-1);
    bombsFound+=checkCasse(r-1,c+1);
    bombsFound+=checkCasse(r-1,c);
    bombsFound+=checkCasse(r,c-1);
    bombsFound+=checkCasse(r,c+1);
    bombsFound+=checkCasse(r+1,c);
    bombsFound+=checkCasse(r+1,c-1);
    bombsFound+=checkCasse(r+1,c+1);
    //if(bombsFound>8||bombsFound<0){}
    if(bombsFound>0){
        casse.innerText=bombsFound;
        casse.classList.value="case";
        casse.classList.add("x"+bombsFound.toString());
    }
    else{
        checkBomb(r-1,c-1);
        checkBomb(r-1,c);
        checkBomb(r-1,c+1);
        checkBomb(r,c-1);
        checkBomb(r,c+1);
        checkBomb(r+1,c-1);
        checkBomb(r+1,c);
        checkBomb(r+1,c+1);
    }
}

function checkCasse(r,c){//bombs?in r.c
    if(r<0||r>=rows||c<0||c>=cols){
        return 0;
    }
    if(bombsLocation.includes(r.toString()+"."+c.toString())){
        return 1;
    }
    return 0;
}

function revealBombs(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            boxBomb=document.getElementById(r.toString()+"."+c.toString());
            if(bombsLocation.includes(boxBomb.id)){
                boxBomb.innerText="💣";
                boxBomb.classList.value="case clicked bomb";
            }
        }
    }
}

function clicked(){
    let button=document.getElementById("flags");
    if(!flagClicked){
        button.classList.add("clicked");
        flagClicked=true;
    }else{
        flagClicked=false;
        button.classList.value="flag";
    }
}