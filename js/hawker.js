$(document).ready(function() {
    set_table();
});

function set_table() {

    var arr = ajax(0, '1.5.1');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#jdate').html(arr[i]['DATE(join_date) join_date']);
        temp.find('#name').html(arr[i]['m_name']);
        temp.find('#phone').html(arr[i]['m_phone']);
        if (arr[i]['m_status'] == 1)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i>黑名單</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 使用中</a>');
        temp.find('#ndate').html(arr[i]['DATE(ol_time) latest']);
        temp.find('#class').html(arr[i]['tname']);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="hawker_detail.html?id=${arr[i]['uid']}">查看</a>`);

        $('tbody').append(temp);
    }

}

function getAll(btn) {
    $("#all-btn").css('color', '#26B7BC');
    $("#all-btn").addClass('active');
    $("#block-btn").css('color', '#AEAEAE');
    $("#block-btn").removeClass('active');

    var arr = ajax(0, '1.5.1');
    $('tbody').html('');
    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#jdate').html(arr[i]['DATE(join_date) join_date']);
        temp.find('#name').html(arr[i]['m_name']);
        temp.find('#phone').html(arr[i]['m_phone']);
        if (arr[i]['m_status'] == 1)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i>黑名單</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 使用中</a>');
        temp.find('#ndate').html(arr[i]['DATE(ol_time) latest']);
        temp.find('#class').html(arr[i]['tname']);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="hawker_detail.html?id=${arr[i]['uid']}">查看</a>`);

        $('tbody').append(temp);
    }
}

function getBlock(btn) {
    $("#block-btn").css('color', '#26B7BC');
    $("#block-btn").addClass('active');
    $("#all-btn").css('color', '#AEAEAE');
    $("#all-btn").removeClass('active');

    var arr = ajax(0, '1.5.11');
    $('tbody').html('');
    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#jdate').html(arr[i]['DATE(join_date) join_date']);
        temp.find('#name').html(arr[i]['m_name']);
        temp.find('#phone').html(arr[i]['m_phone']);
        if (arr[i]['m_status'] == 1)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i>黑名單</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 使用中</a>');
        temp.find('#ndate').html(arr[i]['DATE(ol_time) latest']);
        temp.find('#class').html(arr[i]['tname']);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="hawker_detail.html?id=${arr[i]['uid']}">查看</a>`);

        $('tbody').append(temp);
    }
}