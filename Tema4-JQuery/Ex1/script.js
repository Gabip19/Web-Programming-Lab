function change(list) {
    let source = $("#first_select");
    let target = $("#second_select");
    if ($(list).is(target)) {
        let aux = source;
        source = target;
        target = aux;
    }

    let selectedItem = source.find(":selected");
    console.log(selectedItem);
    target.append(selectedItem);

    source.find(":selected").remove();
}
