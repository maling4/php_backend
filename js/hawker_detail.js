$(document).ready(function() {
    set_table(); //up
    set_newtable(); //down
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//上面table
function set_table() {

    let obj = {
        ':uid': urlParams.get('id'),
    }
    let arr = ajax(obj, '1.5.2');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#name').html(arr[i]['m_name']);
        temp.find('#class').html('<select><option>' + arr[i]['tname'] + '</option></select>');
        temp.find('#date').html(arr[i]['DATE(join_date) join_date']);
        temp.find('#phone').html(arr[i]['m_phone']);
        temp.find('#bank').html(arr[i]['b_code']);
        temp.find('#add').html(arr[i]['m_add']);
        temp.find('#acc').html(arr[i]['m_acc']);
        temp.find('#note').html('<textarea rows="5" cols="80">' + arr[i]['m_note'] + '</textarea>');

        $('#ut').append(temp);
    }

    $('.m-name').html(arr[0]['m_name']);

    console.log(arr);
    if (arr[0]['m_status'] == 1) {
        $("#block-btn").addClass("btn-secondary");
        $("#block-btn").removeClass("btn-danger");
        $('#block-btn').prop('disabled', true);
        $('#block-btn').hide();
    } else {
        $("#unblock-btn").addClass("btn-secondary");
        $("#unblock-btn").removeClass("btn-danger");
        $('#unblock-btn').prop('disabled', true);
        $('#unblock-btn').hide();
    }
}

//下面table
function set_newtable() {
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

function blockSend() {
    let obj = {
        ':uid': urlParams.get('id'),
        ':m_note': $("#block-note").val()
    }
    ajax(obj, '2.5.2');

    $('#exampleModalCenter2').modal('hide');

    $("#block-btn").addClass("btn-secondary");
    $("#block-btn").removeClass("btn-danger");
    $('#block-btn').prop('disabled', true);
    $('#block-btn').hide();

    $("#unblock-btn").addClass("btn-primary");
    $("#unblock-btn").removeClass("btn-secondary");
    $('#unblock-btn').prop('disabled', false);
    $('#unblock-btn').show();
}

function unblockSend() {
    let obj = {
        ':uid': urlParams.get('id')
    }
    ajax(obj, '2.5.3');

    $('#exampleModalCenter4').modal('hide');

    $("#unblock-btn").addClass("btn-secondary");
    $("#unblock-btn").removeClass("btn-primary");
    $('#unblock-btn').prop('disabled', true);
    $('#unblock-btn').hide();

    $("#block-btn").addClass("btn-danger");
    $("#block-btn").removeClass("btn-secondary");
    $('#block-btn').prop('disabled', false);
    $('#block-btn').show();
}