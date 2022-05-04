function insert_manager() {
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