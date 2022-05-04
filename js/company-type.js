$(document).ready(function() {
    set_table();
});

function set_table() {
    var arr = ajax(0, '1.7.3');
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {

        temp = $($('#table1 template').html()).clone();
        temp.find('#edit').html('<a class="btn mb-1" href="#' + arr[i]['tid'] + '">編輯</a>');
        temp.find('#classid').html(arr[i]['tcode']);
        temp.find('#classname').html(arr[i]['tname']);
        temp.find('#classqnt').html(arr[i]['quantity']);

        $('#table1 tbody').append(temp);
    }
    //左邊table設定
    //$temp = $($('#cltable').html()).clone();
    //$temp.find('#classid').html($arr[$i][0]);
    //$temp.find('#classname').html($arr[$i][1]);
    //$temp.find('#classtxt').html($arr[$i][2]);
    //$('#cltable').append($temp);
}