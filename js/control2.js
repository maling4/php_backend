$(document).ready(function() {

    set_table();
});

function set_table() {

    //var arr = ajax(0, '1.7.1');
    var arr = [
        ['2021/09/01', 'ABCDE', '0', 'aaa', '備註1'],
        ['2022/01/01', 'DGVDE', '1', 'bbb', '備註2']
    ];

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#jtime').html(arr[i][0]);
        temp.find('#acc').html(arr[i][1]);
        if (arr[i][2] == 0)
            temp.find('#status').html('<a style="color: #FE868E;"><i class="fa fa-ban"></i> 停用</a>');
        else
            temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 啟用</a>');

        temp.find('#mname').html(arr[i][3]);
        temp.find('#mtxt').html(arr[i][4]);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="control-edit.html?id=${arr[i]['uid']}">查看</a>`);
        $('tbody').append(temp);
    }

}