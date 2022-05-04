$(document).ready(function() {
    set_table();
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function set_table() {

    let obj = {
        ':m_id': urlParams.get('id'),
    }
    let arr = ajax(obj, '1.7.2');

    if (arr[0]['m_status'] == 0) {
        $(".up").attr("hidden", false);
        $(".down").attr("hidden", true);
    } else {
        $(".up").attr("hidden", true);
        $(".down").attr("hidden", false);
    }


    $('#cname').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['m_name'] + '">');
    $('#win').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['windows'] + '">');
    $('#phone').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['phone'] + '">');
    $('#add').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['address'] + '">');
    $('#bank').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['b_code'] + '">');
    $('#acc').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['b_acc'] + '">');
    $('#pay').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['pay_meth'] + '">');


}

function ceditsend() {
    let obj = {
        ':m_id': urlParams.get('id'),
        ':m_name': $('#cname').children('input').val(),
        ':windows': $('#win').children('input').val(),
        ':phone': $('#phone').children('input').val(),
        ':address': $('#add').children('input').val(),
        ':b_code': $('#bank').children('input').val(),
        ':b_acc': $('#acc').children('input').val(),
        ':pay_meth': $('#pay').children('input').val()
    }


    ajax(obj, '2.7.1');

    set_table();

    $('.checkmodaltxt').html('已修改資訊');
}

function change_status(num) {
    let obj = {
        ':m_id': urlParams.get('id'),
    }

    if (num == 0) {
        ajax(obj, '2.7.2');
        $('#ModalCenterStatus0').modal('hide');
    } else if (num == 1) {
        ajax(obj, '2.7.3');
        $('#ModalCenterStatus1').modal('hide');
    }

    $('.checkmodaltxt').html('已合作廠商');

    set_table();
}