
function change(list) {
    let source = document.getElementById("first_select");
    let target = document.getElementById("second_select");
    if (list == target) {
        let aux = source;
        source = target;
        target = aux;
    }

    let selectedItem = source.options[source.selectedIndex];
    console.log(selectedItem);
    target.add(selectedItem);

    source.remove(source.selectedIndex);
}