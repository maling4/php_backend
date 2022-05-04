$(document).ready(function() {
    set_table();
});

function set_table() {
    var arr = ajax(0, '1.5.22');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('#table1 template').html()).clone();
        temp.find('#ndate').html(arr[i]['ol_time']);
        temp.find('#uid').html(arr[i]['ol_id']);
        temp.find('#nname').html(arr[i]['ol_name']);
        temp.find('#price').html(arr[i]['SUM(imp_tot) imp_tot']);
        temp.find('#salep').html(arr[i]['SUM(pri_tot) pri_tot']);
        temp.find('#earnp').html(arr[i]['SUM(pri_tot - imp_tot) profit']);
        if (arr[i]['ol_trafyes'] == 0 && arr[i]['ol_orderyes'] == 0) {
            temp.find('#status').html('帳務 <i class="fa-solid fa-circle-xmark" id="pink"></i><br> 訂單 <i class="fa-solid fa-circle-xmark" id="pink"></i>');
        } else if (arr[i]['ol_trafyes'] == 0 && arr[i]['ol_orderyes'] == 1) {
            temp.find('#status').html('帳務 <i class="fa-solid fa-circle-xmark" id="pink"></i><br> 訂單 <i class="fa-solid fa-circle-check" id="green"></i>');
        } else if (arr[i]['ol_trafyes'] == 1 && arr[i]['ol_orderyes'] == 0) {
            temp.find('#status').html('帳務 <i class="fa-solid fa-circle-check" id="green"></i><br> 訂單 <i class="fa-solid fa-circle-xmark" id="pink"></i>');
        } else if (arr[i]['ol_trafyes'] == 1 && arr[i]['ol_orderyes'] == 1) {
            temp.find('#status').html('帳務 <i class="fa-solid fa-circle-check" id="green"></i><br> 訂單 <i class="fa-solid fa-circle-check" id="green"></i>');
        }

        $('#table1').append(temp);
    }

}