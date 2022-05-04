$(document).ready(function() {
    set_table();
});


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function set_table() {

    var arr = ajax(0, '1.4.2');



    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#lid').html(arr[i]['ol.ol_id']);
        temp.find('#date').html(arr[i]['DATE(ol_time) otime']);
        temp.find('#uname').html(arr[i]['m_name']);
        temp.find('#status').html('取消');
        temp.find('#gname').html(arr[i]['ol_name']);
        temp.find('#allp').html(arr[i]['IFNULL(SUM(price * op_qnt), 0) amount']);
        temp.find('#quick').html(' <a class="btn btn-danger rounded-pill mb-1" onclick="change_txt(' + i + ')" data-bs-toggle="modal" data-bs-target="#exampleModalCenter2"> 快速編輯 </a>');
        temp.find('#check').html('<a class="btn btn-success rounded-pill mb-1" href="order-check.html">查看</a>');

        $('tbody').append(temp);
    }

}