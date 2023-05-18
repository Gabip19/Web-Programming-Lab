var pageNumber = 1;
var pageSize = 3;
var len = 0;

function requestLen() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            len = parseInt(this.responseText);
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb2/lenrequest.php", true);
    xmlhttp.send();
}

function displayPage(page) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#myTable").html(this.responseText);
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb2/getpage.php?index=" + page + "&size=" + pageSize, true);
    xmlhttp.send();
}

function tryDisplayPage(page) {
    if (page === 1) {
        $("#prev-btn").prop("disabled", true);
    } else {
        $("#prev-btn").prop("disabled", false);
    }
    
    if (page * pageSize >= len) {
        $("#next-btn").prop("disabled", true);
    } else {
        $("#next-btn").prop("disabled", false);
    }
    
    displayPage(page);
}

$(function() {
    len = requestLen();
    tryDisplayPage(1);
    $("#prev-btn").click(function() { tryDisplayPage(--pageNumber); });
    $("#next-btn").click(function() { tryDisplayPage(++pageNumber); });
})