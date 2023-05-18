$(function() {
    $("select").each(function() {
        loadComboBox(this);
    });
    $("#filterBtn").click(function() {
        filterData();
    });
    filterData();
})

function loadComboBox(comboBox) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $(comboBox).html(this.responseText);
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb6/server.php?comboBox=" + $(comboBox).attr("id"), true);
    xmlhttp.send();
}

function filterData() {
    let filters = {};
    $("select").each(function() {
        if ($(this).val() !== "") {
            filters[$(this).attr("id")] = $(this).val();
        }
    });

    $.ajax({
        url: "http://localhost/ajaxweb/pb6/server.php",
        type: "POST",
        data: { filter: filters },
        success: function(data) {
            $("#products").html(data);
        },
        error: function() {
            console.log('Eroare la incarcarea continutului fisierului.');
        }
    });
}