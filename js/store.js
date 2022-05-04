$(document).ready(function() {
    set_table();
});

function set_table() {
    getAll();
}

function getAll() {
    $('tbody').html('');

    let arr = ajax(0, '1.8.1');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#gid').html(arr[i]['gl_id']);
        temp.find('#gname').html(arr[i]['gl_name']);
        if (arr[i]['g_status'] == 0)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i> 已下架</a>');
        else if (arr[i]['g_status'] == 2)
            temp.find('#status').html('<a><i class="fa fa-trash"></i> 垃圾桶</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 上架中</a>');
        temp.find('#cond').html(arr[i]['REPLACE(succ_way, ' / ', gl_underqnt) underqnt']);
        temp.find('#deli').html(arr[i]['gl_transport']);
        temp.find('#enddate').html(arr[i]['gl_etime']);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="store-edit.html?id=${arr[i]['gl_id']}">查看</a>`);

        $('tbody').append(temp);
    }

    $("#getall-btn").css('color', '#26B7BC');
    $("#getall-btn").addClass('active');
    $("#getup-btn").css('color', '#AEAEAE');
    $("#getup-btn").removeClass('active');
    $("#getdown-btn").css('color', '#AEAEAE');
    $("#getdown-btn").removeClass('active');
    $("#gettrash-btn").css('color', '#AEAEAE');
    $("#gettrash-btn").removeClass('active');
}

function getUp() {
    $('tbody').html('');

    let obj = {
        ":g_status": 1
    }
    let arr = ajax(obj, '1.8.11');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#gid').html(arr[i]['gl_id']);
        temp.find('#gname').html(arr[i]['gl_name']);
        if (arr[i]['g_status'] == 0)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i> 已下架</a>');
        else if (arr[i]['g_status'] == 2)
            temp.find('#status').html('<a><i class="fa fa-trash"></i> 垃圾桶</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 上架中</a>');
        temp.find('#cond').html(arr[i]['REPLACE(succ_way, ' / ', gl_underqnt) underqnt']);
        temp.find('#deli').html(arr[i]['gl_transport']);
        temp.find('#enddate').html(arr[i]['gl_etime']);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="store-edit.html?id=${arr[i]['gl_id']}">查看</a>`);

        $('tbody').append(temp);
    }

    $("#getup-btn").css('color', '#26B7BC');
    $("#getup-btn").addClass('active');
    $("#getall-btn").css('color', '#AEAEAE');
    $("#getall-btn").removeClass('active');
    $("#getdown-btn").css('color', '#AEAEAE');
    $("#getdown-btn").removeClass('active');
    $("#gettrash-btn").css('color', '#AEAEAE');
    $("#gettrash-btn").removeClass('active');
}

function getDown() {
    $('tbody').html('');

    let obj = {
        ":g_status": 0
    }
    let arr = ajax(obj, '1.8.11');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#gid').html(arr[i]['gl_id']);
        temp.find('#gname').html(arr[i]['gl_name']);
        if (arr[i]['g_status'] == 0)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i> 已下架</a>');
        else if (arr[i]['g_status'] == 2)
            temp.find('#status').html('<a><i class="fa fa-trash"></i> 垃圾桶</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 上架中</a>');
        temp.find('#cond').html(arr[i]['REPLACE(succ_way, ' / ', gl_underqnt) underqnt']);
        temp.find('#deli').html(arr[i]['gl_transport']);
        temp.find('#enddate').html(arr[i]['gl_etime']);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="store-edit.html?id=${arr[i]['gl_id']}">查看</a>`);

        $('tbody').append(temp);
    }

    $("#getdown-btn").css('color', '#26B7BC');
    $("#getdown-btn").addClass('active');
    $("#getall-btn").css('color', '#AEAEAE');
    $("#getall-btn").removeClass('active');
    $("#getup-btn").css('color', '#AEAEAE');
    $("#getup-btn").removeClass('active');
    $("#gettrash-btn").css('color', '#AEAEAE');
    $("#gettrash-btn").removeClass('active');
}

function getTrash() {
    $('tbody').html('');

    let obj = {
        ":g_status": 2
    }
    let arr = ajax(obj, '1.8.11');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#gid').html(arr[i]['gl_id']);
        temp.find('#gname').html(arr[i]['gl_name']);
        if (arr[i]['g_status'] == 2)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i> 已下架</a>');
        else if (arr[i]['g_status'] == 1)
            temp.find('#status').html('<a><i class="fa fa-trash"></i> 垃圾桶</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 上架中</a>');
        temp.find('#cond').html(arr[i]['REPLACE(succ_way, ' / ', gl_underqnt) underqnt']);
        temp.find('#deli').html(arr[i]['gl_transport']);
        temp.find('#enddate').html(arr[i]['gl_etime']);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="store-edit.html?id=${arr[i]['gl_id']}">查看</a>`);

        $('tbody').append(temp);
    }

    $("#gettrash-btn").css('color', '#26B7BC');
    $("#gettrash-btn").addClass('active');
    $("#getall-btn").css('color', '#AEAEAE');
    $("#getall-btn").removeClass('active');
    $("#getdown-btn").css('color', '#AEAEAE');
    $("#getdown-btn").removeClass('active');
    $("#getup-btn").css('color', '#AEAEAE');
    $("#getup-btn").removeClass('active');
}