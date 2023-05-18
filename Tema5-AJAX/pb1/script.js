$(function() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#plecari").html(this.responseText);
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb1/plecari.php", true);
    xmlhttp.send();
})

$(function() {
    $("#plecari").on("change", function() {
        let plecare = $("#plecari option:selected").val();
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                $("#sosiri").html(this.responseText);
            }
        }
        xmlhttp.open("GET", "http://localhost/ajaxweb/pb1/sosiri.php?plecare=" + plecare, true);
        xmlhttp.send();
    });
})