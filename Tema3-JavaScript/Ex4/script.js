var lastClicked = null;
var order = 1;
var currentHeaders = [];

function transform(content, datatype) {
    switch (datatype) {
        case "number":
            return parseFloat(content);
        case "string":
        default:
            return content;
    }
}

function compare(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

function swapRows(r1, r2) {
    let aux = r1.innerHTML;
    r1.innerHTML = r2.innerHTML;
    r2.innerHTML = aux;
}

function swapColumns(table, i, j) {
    for (let index = 0; index < table.rows.length; index++) {
        let aux = table.rows[index].cells[i].innerHTML;
        table.rows[index].cells[i].innerHTML = table.rows[index].cells[j].innerHTML;
        table.rows[index].cells[j].innerHTML = aux;
    }
}

function checkSortOrder(index) {
    let current = currentHeaders[index];
    if (lastClicked !== current) {
        order = 1;
    } else {
        order = -order;
    }
    lastClicked = current;
}

function sortByColumn(table, index) {
    currentHeaders = table.querySelectorAll("th");
    checkSortOrder(index);
    
    let sorted = false;
   
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < table.rows.length - 1; i++) {
            let currentRow = table.rows[i];
            let nextRow = table.rows[i + 1];
            
            if (compare(transform(currentRow.cells[index].innerHTML, currentHeaders[index].getAttribute('data-type')), 
                        transform(nextRow.cells[index].innerHTML, currentHeaders[index].getAttribute('data-type'))) * order > 0) {
                swapRows(currentRow, nextRow);
                sorted = false;
            }
        }    
    }
}

function sortByRow(table, index) {
    currentHeaders = table.querySelectorAll("th");
    checkSortOrder(index);

    let sorted = false;
   
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < table.rows[index].cells.length - 1; i++) {
            let currentRow = table.rows[index];
            
            if (compare(transform(currentRow.cells[i].innerHTML, currentHeaders[index].getAttribute('data-type')), 
                        transform(currentRow.cells[i + 1].innerHTML, currentHeaders[index].getAttribute('data-type'))) * order > 0) {
                swapColumns(table, i, i + 1);
                sorted = false;
            }
        }    
    }
}

function initColumnSortableTables() {
    const sortableTables = document.querySelectorAll(".column-sortable");
    sortableTables.forEach( table => {
        const headers = Array.from(table.getElementsByTagName("th"));

        headers.forEach( (header, index) => {
            header.onclick = () => {
                console.log("Clicked on: " + index);
                sortByColumn(table, index);
            }
        });
    });
}

function initRowSortableTables() {
    const sortableTables = document.querySelectorAll(".row-sortable");
    sortableTables.forEach( table => {
        const headers = Array.from(table.getElementsByTagName("th"));

        headers.forEach( (header, index) => {
            header.onclick = () => {
                console.log("Clicked on: " + index);
                sortByRow(table, index);
            }
        });
    });
}

function initSortableTables() {
    initColumnSortableTables();
    initRowSortableTables();
}

window.onload = initSortableTables;