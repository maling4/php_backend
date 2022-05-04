$(document).ready(function() {

    set_table();
});

function set_table() {

    var arr = ajax(0, '1.7.1');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#cid').html(arr[i]['m_id']);
        temp.find('#cname').html(arr[i]['m_name']);
        temp.find('#tier').html(arr[i]['tname']);
        if (arr[i]['m_status'] == 0)
            temp.find('#bool').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i>取消合作</a>');
        else
            temp.find('#bool').html('<a id="green"><i class="fa-solid fa-check"></i> 合作中</a>');

        temp.find('#win').html(arr[i]['windows']);
        temp.find('#phone').html(arr[i]['phone']);
        temp.find('#add').html(arr[i]['address']);
        temp.find('#bank').html(arr[i]['b_code'] + '<br/>' + arr[i]['b_acc']);
        temp.find('#more').html(`<a class="btn btn-success rounded-pill mb-1" href="company-edit.html?id=${arr[i]['m_id']}">查看</a>`);
        $('tbody').append(temp);
    }

}

function selectall(checkbox) {
    if (checkbox.checked == true)
        $('.cbox').prop('checked', true);
    else
        $('.cbox').prop('checked', false);

}


function boxOnclick() {
    $('.tbox').prop('indeterminate', true);

}