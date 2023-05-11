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
    let aux = $(r1).html();
    $(r1).html($(r2).html());
    $(r2).html(aux);
}

function swapColumns(table, i) {
    table.find("tr").each(function () {
        let cell = $(this).find("td").eq(i);
        var aux = cell.html();
        cell.html(cell.next().html());
        cell.next().html(aux);
    });
}

function checkSortOrder(index) {
    var current = currentHeaders[index];
    if (lastClicked !== current) {
        order = 1;
    } else {
        order = -order;
    }
    lastClicked = current;
}

function sortByColumn(table, index) {
    currentHeaders = table.find("th").toArray();
    checkSortOrder(index);

    var sorted = false;

    while (!sorted) {
        sorted = true;
        table.find("tr").each(function () {
            if (
                compare(
                    transform(
                        $(this).find("td").eq(index).html(),
                        $(currentHeaders[index]).attr("data-type")
                    ),
                    transform(
                        $(this).next().find("td").eq(index).html(),
                        $(currentHeaders[index]).attr("data-type")
                    )
                ) * order > 0
            ) {
                swapRows($(this), $(this).next());
                sorted = false;
            }
        });
    }
}

function sortByRow(table, index) {
    currentHeaders = table.find("th").toArray();
    checkSortOrder(index);

    var sorted = false;

    while (!sorted) {
        sorted = true;
        table.find("tr").eq(index).find("td").each(function (i) {
            if (
                compare(
                    transform(
                        $(this).html(),
                        $(currentHeaders[index]).attr("data-type")
                    ),
                    transform(
                        $(this).next().html(),
                        $(currentHeaders[index]).attr("data-type")
                    )
                ) * order > 0
            ) {
                swapColumns(table, i);
                sorted = false;
            }
        });
    }
}

function initColumnSortableTables() {
    $(".column-sortable").each(function () {
        $(this).find("th").each(function () {
            $(this).click(function () {
                sortByColumn($(this).parent().parent(), $(this).index());
            });
        });
    });
}

function initRowSortableTables() {
    $(".row-sortable").each(function () {
        $(this).find("th").each(function () {
            $(this).click(function () {
                let table = $(this).parent().parent(); 
                sortByRow(table, table.find("th").index(this));
            });
        });
    });
}

$(function initSortableTables() {
    initColumnSortableTables();
    initRowSortableTables();
});