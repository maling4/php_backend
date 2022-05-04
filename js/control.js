$(document).ready(function() {

    set_table();
});

function set_table() {

    var arr = [
        ['VIP', '2021/09/01', '備註1'],
        ['VIP, 所有小販', '2022/01/01', '備註2']
    ];

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#forper').html(arr[i][0]);
        temp.find('#senttime').html(arr[i][1]);
        temp.find('#mtxt').html(arr[i][2]);

        $('#table1 tbody').append(temp);
    }

}

function insert_control() {
    let obj = {
        ':for': $('#for').children('input').val(),
        ':sendtime': $('#sendtime').children('input').val(),
        ':txt': $('#txt').children('input').val(),
    }

    //ajax(obj, '2.7.4');

    $('#ModalCenterInsert').modal('hide');
    dataReset()

}

function dataReset() {
    $("#form").find("#reset-btn").click();
}