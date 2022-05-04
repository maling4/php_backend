function insert_company() {

    let obj = {
        ':m_name': $('#cname').children('input').val(),
        ':windows': $('#win').children('input').val(),
        ':phone': $('#phone').children('input').val(),
        ':address': $('#add').children('input').val(),
        ':b_code': $('#bank').children('input').val(),
        ':b_acc': $('#acc').children('input').val(),
        ':pay_meth': $('#pay').children('input').val()
    }

    ajax(obj, '2.7.4');

    $('#ModalCenterInsert').modal('hide');
    dataReset()
}

function dataReset() {
    $("#form").find("#reset-btn").click();
}