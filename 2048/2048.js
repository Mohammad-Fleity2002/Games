var rows=4;
var column=4;
var score=0;
var board;
window.onload=function(){
        setGame();
}
function setGame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    /*board=[
        [2,2,2,2],
        [2,2,2,2],
        [4,4,8,8],
        [4,4,8,8]   
    ];*/
    for(let r=0;r<rows;r++){
        for(let c=0;c<column;c++){
            let title=document.createElement("div");
            title.id=r.toString()+"."+c.toString();
            let num=board[r][c];
            updateTitle(title,num);
            document.getElementById("border").append(title);
        }
    }
    rndTwo();
    rndTwo();
}
function hasEmptyTile(){
    //let b=false;
    for(let i=0;i<rows;i++){
        for(let j=0;j<column;j++){
            if (board[i][j]==0){
                //b=true;
                return true;
            }
        }
    }
    /*if(!b){
        gameOver();
    }*/
    //return b;
    return false;
}

/*function gameOver(){
    for(let r=0;r<rows-1;r++){
        for(let c=0;c<=column-1;c++){
            if((board[r][c]==board[r][c+1])||(board[r][c]==board[r+1][c])){
                return;
            }
        }
    }
    let ele=document.getElementById("border");
    ele.classList.add("gameOver");
}*/

function rndTwo(){
    if(!hasEmptyTile){
        return;
    }
    let flagdown=false;
    while(!flagdown){
        let r=Math.floor(Math.random()*rows);
        let c=Math.floor(Math.random()*column);
        
        if(board[r][c]==0){
            //let n=(Math.floor(Math.random()*10)%4);
            let title=document.getElementById(r.toString()+"."+c.toString());
            /*if(n==1){
                board[r][c]=4;
                title.innerText="4";
                title.classList.add("x4");
            }else{*/
                board[r][c]=2;
                title.innerText="2";
                title.classList.add("x2");
            //}
            flagdown=true;
        }    
    }
}

function updateTitle(title,num){
    title.innerText="";
    title.classList.value="";//clear the class text
    title.classList.add("title");
    if(num>0){
        title.innerText=num;
        if(num<=4096){
            title.classList.add("x"+num.toString());
        }
        else{
            title.classList.add("x8196");
        }
    }
}
document.addEventListener("keyup",(e)=>{//hold and when you realease the button the event occur
    if(e.code=="ArrowLeft"){
        slideLeft();
        rndTwo();
    }
    else if(e.code=="ArrowRight"){
        slideRight();
        rndTwo();
    }
    else if(e.code=="ArrowUp"){
        slideUp();
        rndTwo();
    }
    else if(e.code=="ArrowDown"){
        slideDown();
        rndTwo();
    }
    document.getElementById("score").innerText=score;
})

/*function updateScore(s){
    let score=document.getElementById("score");
    score.value=s.toString();
}*/

function filter0(row){
    return row.filter(num => num!=0);//no more 0s
}

function slide(row){
    row=filter0(row);
    for(let i=0;i<row.length-1;i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    //updateScore(score);
    row=filter0(row);
    while(row.length<column){
        row.push(0);
    }
    return row
}
//to slideRight inverse slideLeft than reverse
function slideLeft(){
    for(let r=0;r<rows;r++){
        /*for(let c=0;c<column-1;c++){
            t=document.getElementById(r.toString()+"."+c.toString());
            if(board[r][c]==board[r][c+1]!=0){
                bord[r][c]+=board[r][c+1];
                bord[r][c+1]=0;
            }
            else if(board[r][c]==0){
                board[r][c]=board[r][c+1];
            }
            updateTitle(t,board[r][c]);
        }*/
        let row=board[r];
        row=slide(row);
        board[r]=row;
        for(let c=0;c<column;c++){
            let title=document.getElementById(r.toString()+"."+c.toString());
            let num=board[r][c];
            updateTitle(title,num);
        }
    }
}

//to slideRight inverse slideLeft than reverse
function slideRight(){
    for(let r=0;r<rows;r++){
        /*for(let c=0;c<column-1;c++){
            t=document.getElementById(r.toString()+"."+c.toString());
            if(board[r][c]==board[r][c+1]!=0){
                bord[r][c]+=board[r][c+1];
                bord[r][c+1]=0;
            }
            else if(board[r][c]==0){
                board[r][c]=board[r][c+1];
            }
            updateTitle(t,board[r][c]);
        }*/
        let row=board[r];
        row.reverse();
        row=slide(row);
        row.reverse();
        board[r]=row;
        for(let c=0;c<column;c++){
            let title=document.getElementById(r.toString()+"."+c.toString());
            let num=board[r][c];
            updateTitle(title,num);
        }
    }
}

function slideUp(){
    for(let c=0;c<column;c++){
        let row=[board[0][c],board[1][c],board[2][c],board[3][c],]
        row=slide(row);
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let title=document.getElementById(r.toString()+"."+c.toString());
            let num=board[r][c];
            updateTitle(title,num);
        }
    }
}

 function slideDown(){
    for(let c=0;c<column;c++){
        let row=[board[0][c],board[1][c],board[2][c],board[3][c],]
        row.reverse();
        row=slide(row);
        row.reverse();
        for(let r=0;r<rows;r++){
            board[r][c]=row[r];
            let title=document.getElementById(r.toString()+"."+c.toString());
            let num=board[r][c];
            updateTitle(title,num);
        }
    }
}