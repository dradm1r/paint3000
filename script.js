var canv = document.querySelector("canvas");
var ctx = canv.getContext("2d");
const doublePi = 2*Math.PI;
canv.width = window.innerWidth;
canv.height = window.innerHeight;
//////////////////////////////
var curTool = "brush";
var brush = document.querySelector(".brush");
var eraser = document.querySelector(".eraser");
var line = document.querySelector(".line");
var rectangle = document.querySelector(".rectangle");
var sizeRound = document.querySelector(".size-round");
var curMousePos= document.querySelector(".eraserTmp");
var range = document.querySelector(".myrange");
var drawingField = document.querySelector(".drawing-field");
var nav = document.querySelector(".nav");
var brushSize = range.value;
var eraserValue = range.value; //Значение для корректировки позиции ластика 
var rectTmp = document.querySelector(".rectTmp");
var rectTmpField = document.querySelector(".rectTmpField");
var lineTmp = document.querySelector(".lineTmp");
rectTmp.opacity = 0;

sizeRound.style.opacity = 0;



brush.addEventListener("click" , function(){
    ctx.globalCompositeOperation = "source-over";
    curTool  = "brush";
})

eraser.addEventListener("click",function(){
    ctx.globalCompositeOperation = "destination-out";
    curMousePos.style.backgroundColor = "#000000";
    curTool = "eraser";
} )
line.addEventListener("click" , function(){
    curTool = "line";
})


rectangle.addEventListener("click" , function(){
    curTool = "rectangle";
})

//////////////////////////////
nav.addEventListener("mousemove",function(){
    curMousePos.opacity = 0;
})


//////////////////////////////
var colorPicker = document.querySelector(".color-picker");
colorPicker.addEventListener("change", function(){
    ctx.fillStyle = this.value;
    ctx.strokeStyle = this.value;
    console.log(this.value);
    rectTmp.style.borderColor = this.value;
    curMousePos.style.backgroundColor = colorPicker.value;
})
ctx.fillStyle = colorPicker.value;
ctx.strokeStyle = colorPicker.value;
sizeRound.style.backgroundColor = colorPicker.value;    
//////////////////////////////


range.addEventListener("change" ,function(){
    sizeRound.style.opacity = 0;
    brushSize = this.value;
    sizeRound.style.backgroundColor = colorPicker.value;
    curMousePos.style.width = this.value + "px";
    curMousePos.style.height = this.value + "px";
    ctx.lineWidth = brushSize;


})

function curRange() {
    sizeRound.style.opacity = 1;
    sizeRound.style.height = range.value + "px";
    sizeRound.style.width = range.value + "px";
    
 }


 function curRangeStop(){
    
 }

ctx.lineWidth = brushSize;
isMouseDown = false;


drawingField.addEventListener("mousedown" ,function(){
    isMouseDown = true;
})
drawingField.addEventListener("mouseup" ,function(){
    isMouseDown = false;
    ctx.beginPath();
})
var counter = 0;
var width , height;
var y = canv.getBoundingClientRect().y;
drawingField.addEventListener("mouseover" , function(e){
    curMousePos.style.opacity = 1;
})

drawingField.addEventListener("mouseout" , function(e){
    curMousePos.style.opacity = 0;
})

drawingField.addEventListener("mousemove" , function(e){
    switch (curTool){
        case "brush":
        curMousePos.style.left = e.clientX - brushSize/2 + "px";
        curMousePos.style.top = e.clientY - y - brushSize/2+ "px" ;
        if(isMouseDown){
        ctx.lineTo(e.clientX , e.clientY - y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(e.clientX , e.clientY - y,brushSize/2,0,doublePi);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(e.clientX , e.clientY - y);
        }
        break;
        case "eraser":
        curMousePos.style.left = e.clientX - brushSize/2 + "px";
        curMousePos.style.top = e.clientY - y - brushSize/2+ "px" ;
        if(isMouseDown){
            ctx.lineTo(e.clientX , e.clientY - y);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(e.clientX , e.clientY - y,brushSize/2,0,doublePi);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(e.clientX , e.clientY - y);
        }
        break;
        case "line":
            lineTmp.style.backgroundSize = lineTmp.innerWidth+"px " + lineTmp.innerHeight+"px";
            if(e.clientY - height- y > 0 && e.clientX - width> 0 ){
                rectTmpField.style.transform = "scale(1,1)";
                lineTmp.style.top = height - y+ "px";
                lineTmp.style.left = width + "px" 
            }
            else if(e.clientY - height- y < 0 && e.clientX - width < 0){
                rectTmpField.style.transform = "scale(-1,-1)";
                lineTmp.style.top = - height + canv.height + "px";
                lineTmp.style.left = - width + canv.width + "px";
            }else if(e.clientY - height- y < 0 && e.clientX - width> 0 ){
                rectTmpField.style.transform = "scale(1,-1)";
                lineTmp.style.top = - height + y + canv.height + "px";
                lineTmp.style.left = width + "px";
            }  else if(e.clientY - height- y > 0 && e.clientX - width < 0){
                rectTmpField.style.transform = "scale(-1,1)";
                lineTmp.style.top = height + "px";
                lineTmp.style.left = - width + canv.width + "px";
            }
            ////////////////////////////
            lineTmp.style.width = Math.abs(e.clientX - width) + "px" ;
            lineTmp.style.height = Math.abs(e.clientY - height - y) + "px";
            


            break; 
        case "rectangle":
            ////////////////////////////            
            if(e.clientY - height- y > 0 && e.clientX - width> 0 ){
                rectTmpField.style.transform = "scale(1,1)";
                rectTmp.style.top = height - y+ "px";
                rectTmp.style.left = width + "px" 
            }
            else if(e.clientY - height- y < 0 && e.clientX - width < 0){
                rectTmpField.style.transform = "scale(-1,-1)";
                rectTmp.style.top = - height + canv.height + "px";
                rectTmp.style.left = - width + canv.width + "px";
            }else if(e.clientY - height- y < 0 && e.clientX - width> 0 ){
                rectTmpField.style.transform = "scale(1,-1)";
                rectTmp.style.top = - height + y + canv.height + "px";
                rectTmp.style.left = width + "px";
            }  else if(e.clientY - height- y > 0 && e.clientX - width < 0){
                rectTmpField.style.transform = "scale(-1,1)";
                rectTmp.style.top = height + "px";
                rectTmp.style.left = - width + canv.width + "px";
            }
            ////////////////////////////
            rectTmp.style.width = Math.abs(e.clientX - width) + "px" ;
            rectTmp.style.height = Math.abs(e.clientY - height - y) + "px";

            
        break;
    }
})
///////////////////////////////////////

var clickTmp = 0;
drawingField.addEventListener("click" , function(e){
    if(curTool == "rectangle" ){
        if(clickTmp == 0){
            rectTmp.style.borderColor = colorPicker.value;
            rectTmp.style.top = e.clientY - y+ "px";
            rectTmp.style.left = e.clientX + "px";
            rectTmp.style.width = 0 + "px";
            rectTmp.style.height = 0 + "px";
            rectTmpField.style.transform = "scale(1,1)";
            width = e.clientX;
            height =e.clientY - y;
            clickTmp++;
}
    else{
    clickTmp = 0;
    rectTmp.style.borderColor = "transparent";
    ctx.fillRect(width,height,e.clientX - width ,e.clientY - height - y )
}
    }
    else if(curTool == "line"){
        console.log(clickTmp);
        if(clickTmp==0){
            lineTmp.style.top = e.clientY - y+ "px";
            lineTmp.style.left = e.clientX + "px";
            lineTmp.style.width = 0 + "px";
            lineTmp.style.height = 0 + "px";
            rectTmpField.style.transform = "scale(1,1)";
            lineTmp.style.opacity = 1;
            width = e.clientX;
            height =e.clientY - y;
            
            clickTmp++;
        }
        else{
            ctx.moveTo(width, height);
            ctx.lineTo(e.clientX, e.clientY - y);
            ctx.stroke();
            lineTmp.style.opacity = 0;
            clickTmp = 0;
        }
        
    }
    }
    )
///////////////////////////////////////

var clearButton  = document.querySelector(".clearButton");
clearButton.addEventListener("click" , function (){
ctx.clearRect(0 , 0, canv.width , canv.height);
})

////////////////////////////////
