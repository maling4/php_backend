$(document).ready(function() {
    set_table();
    set_recordtable();
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function set_table() {

    let obj = {
        ':gid': urlParams.get('id'),
    }

    let arr = ajax(obj, '1.6.2');

    if (arr[0]['g_status'] == 0) {
        $(".up").attr("hidden", false);
        $(".down").attr("hidden", true);
    } else {
        $(".up").attr("hidden", true);
        $(".down").attr("hidden", false);
    }


    $('#cname').html(arr[0]['m_name']);

    let typearr = ajax(0, '1.6.3');

    for (let i = 0; i < typearr.length; i++) {
        if (typearr[i]['tname'] == arr[0]['class'])
            $('.g_class').append('<option selected="selected">' + typearr[i]['tname'] + '</option>');

        else
            $('.g_class').append('<option>' + typearr[i]['tname'] + '</option>');
    }

    $('.pname').val(arr[0]['gname']);
    $('.type').append('<option selected="selected">' + arr[0]['ver'] + '</option>');
    $('.enddate').val(arr[0]['matdate']);

    if (arr[0]['themosphere'] == '冷凍') {
        $('.deli').append('<option>常溫</option>');
        $('.deli').append('<option selected="selected">冷凍</option>');
    } else {
        $('.deli').append('<option selected="selected">常溫</option>');
        $('.deli').append('<option>冷凍</option>');
    }
    $('.place').val(arr[0]['place']);
    $('.qnt').val(arr[0]['stock']);
    $('.ptxt').val(arr[0]['destxt']);
}

function set_recordtable() {
    let obj = {
        ':gid': urlParams.get('id'),
    }

    let arr = ajax(obj, '1.6.21');

    $('.record').html('');

    for (let i = 0; i < arr.length; i++) {
        let temp = $($('template').html()).clone();
        switch (arr[i]['r_type']) {
            case '商品下架':
                temp.find('a').addClass('btn-danger');
                temp.find('a').html('商品下架');
                break;
            case '商品上架':
                temp.find('a').addClass('btn-success');
                temp.find('a').html('商品上架');
                break;
            case '資訊更新':
                temp.find('a').addClass('btn-info');
                temp.find('a').html('資訊更新');
                break;
        }
        let txt = arr[i]['r_time'] + ' ' + arr[i]['r_desc'] + ' - 由' + arr[i]['a_name'] + '執行';
        temp.find('span').html(txt);
        $('.record').append(temp);
    }
}

function ceditsend() {
    let obj = {
        ':gid': urlParams.get('id'),
        ':class': $('.g_class').val(),
        ':gname': $('.pname').val(),
        ':ver': $('.type').val(),
        ':matdate': $('.enddate').val(),
        ':themosphere': $('.deli').val(),
        ':place': $('.place').val(),
        ':img_path': '',
        ':stock': $('.qnt').val(),
        ':destxt': $('.ptxt').val()
    }

    ajax(obj, '2.6.7');

    let obj2 = {
        ':gid': urlParams.get('id'),
        ':aid': get_user_id()
    }
    ajax(obj2, '2.6.71');
    set_table();
    set_recordtable();
    $('.checkmodaltxt').html('儲存完成');
}

function change_status(num) {
    let obj = {
        ':gid': urlParams.get('id'),
    }

    let obj1 = {
        ':gid': urlParams.get('id'),
        ':aid': get_user_id()
    }

    if (num == 0) {
        ajax(obj, '2.6.1');
        ajax(obj1, '2.6.11');
        $('#ModalStatus0').modal('hide');
    } else if (num == 1) {
        ajax(obj, '2.6.2');
        ajax(obj1, '2.6.21');
        $('#ModalStatus1').modal('hide');
    }

    $('.checkmodaltxt').html('商品已上架');

    set_table();
    set_recordtable();
}