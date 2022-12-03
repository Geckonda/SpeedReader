const container = document.querySelector(".table-container")
const refresh = document.querySelector("#refresh");

CreateTable(container, 6, 6);
var counter = 1;

var table

refresh.addEventListener("click", () => {
    container.firstChild.remove();
    CreateTable(container, 6, 6);
    counter = 1;
    
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
    if(cell.innerHTML == counter){
        cell.style.background = 'green';
        counter++;
    }
}