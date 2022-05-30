let inputDir={x:0, y:0};
let speed=6;
let score=0;
let lastpainttime=0;
let hscore=0;
let snakearr=[
    {x:13,y:15}
];
food={x:6,y:7};
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
}
function iscollide(sarr){
    for(let i=1;i< sarr.length;i++){
        if(sarr[i].x==sarr[0].x&&sarr[i].y==sarr[0].y){
            return true;
        }

    }
    if(sarr[0].x>=18||sarr[0].x<=0 || sarr[0].y>=18||sarr[0].y<=0){
        return true;
    }

   
}
function gameEngine(){
    if(iscollide(snakearr)){
        inputDir={x:0,y:0};
        alert("Game over");
        snakearr=[
            {x:13,y:15}
        ];
        score=0;
        scoreBox.innerHTML = "Score: " + score;
    }
    if(snakearr[0].y==food.y&&snakearr[0].x==food.x){
        score++;
        if(score>hscore){
            hscore = score;
            hiscoreBox.innerHTML = "HiScore: " + hscore;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    for(let i=snakearr.length-2;i>=0;i--){
        snakearr[i+1]={...snakearr[i]};

    }
    snakearr[0].x +=inputDir.x;
    snakearr[0].y +=inputDir.y;

    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x: 0,y:1};
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        default:
            break;

    }
})