$(document).ready(function() {
    set_table();
});

function set_table() {
    var arr = ajax(0, '1.6.3');

    $('.list tbody').html('');
    for (let i = 0; i < arr.length; i++) {

        temp = $($('template').html()).clone();
        temp.find('#edit').html('<a class="btn mb-1" href="#" onclick="set_modal(' + arr[i]['tid'] + ')" data-bs-toggle="modal" data-bs-target="#ModalCenter3"><span class="material-icons">edit</span>編輯</a>');
        temp.find('#tcode').html(arr[i]['tcode']);
        temp.find('#tname').html(arr[i]['tname']);
        temp.find('#quantity').html(arr[i]['quantity']);
        temp.find('.tid').html(arr[i]['tid']);
        $('.list tbody').append(temp);
    }

    cur_data(arr[0]['tid']);


}

function cur_data(tid) {
    let obj = {
        ':tid': tid
    }
    var arr = ajax(obj, '1.6.31');


    $('.cur-code').html(arr[0]['tcode']);
    $('.cur-name').html(arr[0]['tname']);
    $('.cur-note').html(arr[0]['note']);
}

function set_modal(tid) {
    let obj = {
        ':tid': tid
    }
    var arr = ajax(obj, '1.6.31');

    sessionStorage.setItem('tid', arr[0]['tid']);
    $('.emtcode').val(arr[0]['tcode']);
    $('.emtname').val(arr[0]['tname']);
    $('.emnote').val(arr[0]['note']);
}

function change_left_table(tr) {
    let tid = $(tr).find('.tid').html();
    cur_data(tid);
}

function update_tier() {


    let obj = {
        ':tid': sessionStorage.getItem('tid'),
        ':tcode': $('.emtcode').val(),
        ':tname': $('.emtname').val(),
        ':note': $('.emnote').val(),
    }

    ajax(obj, '2.6.5');
    sessionStorage.clear();

    $('.checkmodaltxt').html('已修改分類');
    $('#ModalCenter3').modal('hide');

    set_table();
}

function insert_tier() {
    let obj = {
        ':tcode': $('.imtcode').val(),
        ':tname': $('.imtname').val(),
        ':quantity': 20,
        ':note': $('.imnote').val(),
    }
    ajax(obj, '2.6.6');

    $('.checkmodaltxt').html('已新增分類');
    $('#ModalCenter2').modal('hide');
    $("#form").find("#reset-btn").click();
    set_table();
}