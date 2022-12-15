const container = document.querySelector(".table-container")
const refresh = document.querySelector("#refresh");
const timerBTN = document.querySelector("#start")

CreateTable(container, 6, 6);
var counter = 1;

var table

refresh.addEventListener("click", () => {
    container.firstChild.remove();
    CreateTable(container, 6, 6);
    counter = 1;
    resetWatch();
    timerBTN.innerHTML = "Start";
    timerIsActive = false;
    
})
var timerIsActive = false;
timerBTN.addEventListener("click", () =>{
    if(!timerIsActive){
        timerBTN.innerHTML = "Stop";
        timerIsActive = true;
        startWatch();
    }
    else{
        timerBTN.innerHTML = "Start";
        timerIsActive = false;
        pausedWatch();
    }
})


function  CreateTable(parent, cols, rows){
    const table = document.createElement('table');
    table.id = "Main-table"
    let arrLength = cols * rows;
    let numbers = [];
    numbers.length = arrLength;
    ArrayFilling(numbers);
    Shuffling(numbers);
    
    for(let i = 0; i < rows; i++){
        let tr = document.createElement('tr')
        tr.className = "rows"
        for(let j =  0; j < cols; j++){
            var td = document.createElement('td');
            td.innerHTML = numbers[--arrLength];
            td.className = "cells";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    parent.appendChild(table);
    TableListen(table);
}

function Shuffling(numbers){
            for(let i = numbers.length -1; i >= 0; i--)
            {
                let j = Math.floor(Math.random()*i);
                let temp = numbers[i];
                numbers[i] = numbers[j];
                numbers[j] = temp;
            }
            return numbers;
}

function ArrayFilling(numbers){
    for (let i = 1; i <= numbers.length; i++){
        numbers[i-1] = i;
    }
        
    return numbers;
}
function TableListen(table){
    table.addEventListener('click', function(event){
        if(event.target.closest('.rows')){
            let currentCell = event.target;
            ChangeAppearance(currentCell);
        }
    })
}

function ChangeAppearance(cell){
    if(timerIsActive == false){
        timerBTN.innerHTML = "Stop";
        timerIsActive = true;
        startWatch();
    }
    if(cell.innerHTML == counter){
        cell.style.background = 'green';
        counter++;
        if(counter == 36){
            pausedWatch();
        }
    }
    else{
        errorTarget(cell);
    }
}
const errorTarget = (target) =>{
    let checked = false;
    if(target.style.background == 'green')
        checked = true;
    else
        target.style.background = 'red';
    let errorTimer;
    clearTimeout(errorTimer);
    errorTimer = setTimeout(() =>{
        if(checked)
            target.style.background = 'green'
        else
            target.style.background = '#7ea8da';
    },300)
}


const watch = document.querySelector("#watch");
let timer;
let milliseconds = 0;

const startWatch = () =>{
    watch.classList.remove('paused');
    clearInterval(timer);
    timer = setInterval(() =>{
        milliseconds += 10;
        let dateTimer = new Date(milliseconds);
        watch.innerHTML =
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMilliseconds()).slice(-3,-1); 
    },10)
};

const pausedWatch = () => {
    watch.classList.add('paused');
    clearInterval(timer)
};

const resetWatch = () => {
    watch.classList.remove('paused');
    clearInterval(timer);
    milliseconds = 0;
    watch.innerHTML = "00:00:00";
}
