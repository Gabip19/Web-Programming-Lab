$(function() {
    loadTreeView();
})

function loadTreeView() {
    $.ajax({
        url: "http://localhost/ajaxweb/pb5/server.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let treeView = buildTreeView(data);
            $("#treeViewContainer").empty();
            $("#treeViewContainer").append(treeView);
        },
        error: function() {
            console.log("Eroare la incarcarea componentei Tree-View.");
        }
    });
}

// function loadTreeView() {
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             let data = JSON.parse(this.responseText);
//             let treeView = buildTreeView(data);
//             $("#treeViewContainer").empty();
//             $("#treeViewContainer").append(treeView);
//         }
//     };
//     xmlhttp.open("GET", "http://localhost/ajaxweb/pb5/server.php", true);
//     xmlhttp.setRequestHeader("Content-Type", "application/json"); 
//     xmlhttp.send();
// }

function buildTreeView(data) {
    let ul = $("<ul>");

    $.each(data, function(index, item) {
        let li = $("<li>");

        if (item.type === "directory") {
            li.text(item.name);
            li.addClass("directory");
            let subUl = $("<ul>");
            li.append(subUl);
            li.click(function(e) {
                e.stopPropagation();
                loadDirectoryContents(item.path, subUl);
            });
        } else if (item.type === "file") {
            li.text(item.name);
            li.addClass("file");
            li.click(function(e) {
                e.stopPropagation();
                loadFileContents(item.path);
            });
        }

        ul.append(li);
    });

    return ul;
}

function loadDirectoryContents(directoryPath, parentElem) {
    $.ajax({
        url: "http://localhost/ajaxweb/pb5/server.php",
        type: "POST",
        data: { directory: directoryPath },
        dataType: "json",
        success: function(data) {
            let subTreeView = buildTreeView(data);
            $(parentElem).empty();
            $(parentElem).append(subTreeView);
        },
        error: function() {
            console.log("Eroare la incarcarea continutului directorului.");
        }
    });
}

// function loadFileContents(filePath) {
//     $.ajax({
//         url: "http://localhost/ajaxweb/pb5/server.php",
//         type: "POST",
//         data: { file: filePath },
//         dataType: "text",
//         success: function(data) {
//             displayFileContents(data);
//         },
//         error: function() {
//             console.log('Eroare la încărcarea conținutului fișierului.');
//         }
//     });
// }

function loadFileContents(filePath) {
    var formData = new URLSearchParams();
    formData.append("file", filePath);
    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            displayFileContents(data);
        }
    };

    xmlhttp.open("POST", "http://localhost/ajaxweb/pb5/server.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xmlhttp.send(formData.toString());
    
}

function displayFileContents(content) {
    $("#fileContents").text(content);
}
