$(document).ready(function() {

    set_table();
});

function set_table() {

    var arr = [
        ['Mame', 'fool', '1234', '備註1'],
    ];

    $('#name').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0][0] + '">');
    $('#acc').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0][1] + '">');
    $('#pwd').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0][2] + '">');
    $('#txt').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0][3] + '">');

}


function update_manager() {
    let obj = {
        ':namer': $('#name').children('input').val(),
        ':acc': $('#acc').children('input').val(),
        ':pwd': $('#pwd').children('input').val(),
        ':txt': $('#txt').children('input').val(),
    }

    //ajax(obj, '2.7.4');

    $('#ModalCenterInsert').modal('hide');
    dataReset()

}

function dataReset() {
    $("#form").find("#reset-btn").click();
}