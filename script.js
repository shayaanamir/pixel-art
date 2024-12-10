const container = document.querySelector("#container");
const gridSizeText= document.querySelector("#gridSizeBar > h3");
const gridSlider = document.querySelector("#gridSlider");
const colorPicker = document.querySelector("#colorPicker");

const drawButton = document.querySelector("#drawButton");
const eraseButton = document.querySelector("#eraseButton");
const clearButton = document.querySelector("#clearButton");

let mode = "DRAW";
drawButton.setAttribute("style", "color:white; background-color: black");
    eraseButton.setAttribute("style", "color:black; background-color: aliceblue");

drawButton.addEventListener("click", ()=>{
    mode = "DRAW";
    drawButton.setAttribute("style", "color:white; background-color: black");
    eraseButton.setAttribute("style", "color:black; background-color: aliceblue");
});

eraseButton.addEventListener("click", ()=>{
    mode = "ERASE";
    drawButton.setAttribute("style", "color:black; background-color: aliceblue");
    eraseButton.setAttribute("style", "color:white; background-color: black");
});

clearButton.addEventListener("click", ()=>{
    while(container.lastElementChild){
        container.removeChild(container.lastElementChild);
    }
    createGrid();
})

let gridSize = gridSlider.value;
createGrid();

gridSlider.oninput = function(){
    gridSizeText.textContent = "Grid size: " + gridSlider.value;
    while(container.lastElementChild){
        container.removeChild(container.lastElementChild);
    }
    gridSize = gridSlider.value;
    createGrid();
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)




function createBox(){
    const box = document.createElement("div");
    
    box.setAttribute("style", " display:flex; background-color: white; border-style: solid; border-width: 0.5px; width: 15px; height:15px; margin:0px; flex-shrink: 0");


    ['mouseover', 'mousedown'].forEach(e =>{
        box.addEventListener(e, changeColor);
    });
    
    return box;
}

function changeColor(e){
   if(e.type == 'mouseover' && !mouseDown){
    return
   }
    if(mode=="DRAW"){
        e.target.style.backgroundColor = colorPicker.value;
    }
    else if(mode=="ERASE"){
        e.target.style.backgroundColor = "white";
    }
}

function createGrid(){

    for(j=0; j < gridSize;j++){
        const row = document.createElement("div");
        row.setAttribute("style", "display:flex;   height: 16px;");
        container.appendChild(row);
        for(i=0; i < gridSize; i++){
            row.appendChild(createBox());
        }
    }
}
console.log(mouseDown)

