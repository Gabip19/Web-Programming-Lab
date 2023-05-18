var oldData = null;
var savable = false;
var selectedId = 1;

$(function() {
    loadIds();
    loadFormData(1);
    $("#idsList").on("change", function() {
        selectionChanged();
    });
    $("#myForm").on("keyup", function() {
        checkForUpdate($(this).serializeArray());
    });
    $("#saveBtn").click(function () {
        updateData();
    });
});

function loadIds() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#idsList").html(this.responseText);
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb3/loadids.php", true);
    xmlhttp.send();
}

function selectionChanged() {
    if (savable) {
        var confirmed = confirm("Datele modificate nu au fost salvate.\nDoriti sa continuati?");
        if (confirmed) {
            selectedId = $("#idsList option:selected").val();
            loadFormData(selectedId);
            savable = false;
            $("#saveBtn").prop("disabled", true);
        } else {
            $("#idsList").val(selectedId);
        }
    } else {
        selectedId = $("#idsList option:selected").val();
        loadFormData(selectedId);
    }
}

function loadFormData(id) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.response);

            $("#name").val(data.nume);
            $("#surname").val(data.prenume);
            $("#phone").val(data.telefon);
            $("#email").val(data.email);

            oldData = $("#myForm").serializeArray();
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb3/persondata.php?id=" + id, true);
    xmlhttp.send();
}

function checkForUpdate(formData) {
    savable = formData[0].value !== oldData[0].value || 
            formData[1].value !== oldData[1].value || 
            formData[2].value !== oldData[2].value || 
            formData[3].value !== oldData[3].value;

    $("#saveBtn").prop("disabled", !savable);
}

function updateData() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/ajaxweb/pb3/updateperson.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send($("#myForm").serialize() + "&id=" + selectedId);
    
    savable = false;
    $("#saveBtn").prop("disabled", true);

    oldData = $("#myForm").serializeArray();
}
