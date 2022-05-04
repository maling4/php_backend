$(document).ready(function() {
    set_table();
});

function set_table() {
    let $arr = ['', '滿數量', '滿數量', '5天', '2022', '2022', ''];

    let $pparr = [
        ['img', 'a', 'a', 'a', 'a', 'a', 40, 50],
        ['img2', 'a', 'a', 'a', 'a', 'a', 20, 30],
        ['img3', 'a', 'a', 'a', 'a', 'a', 10, 20]
    ];

    //arr
    $('#gname').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0] + '">');
    $('#cond').html('<select class="form-control"><option>' + arr[1] + '</option></select>');
    $('#deli').html('<select class="form-control"><option>' + arr[2] + '</option></select>');
    $('#outtime').html('<input type="text" class="form-control" id="basicInput" value="' + arr[3] + '">');
    $('#starttime').html('<input type="date" class="form-control" id="basicInput" value="' + arr[4] + '">');
    $('#endtime').html('<input type="date" class="form-control" id="basicInput" value="' + arr[5] + '">');
    $('#note').html('<input type="text" class="form-control" id="basicInput" value="' + arr[6] + '">');


    for (let i = 0; i < pparr.length; i++) {
        temp1 = $($('template').html()).clone();
        temp1.find('#img').html(pparr[i][0]);
        temp1.find('#gname').html(pparr[i][1]);
        temp1.find('#pname').html(pparr[i][2]);
        temp1.find('#class').html(pparr[i][3]);
        temp1.find('#type').html(pparr[i][4]);
        temp1.find('#enddate').html(pparr[i][5]);
        temp1.find('#cost').html(pparr[i][6]);
        temp1.find('#sale').html(pparr[i][7]);

        $('#pp').append(temp1);
    }

}