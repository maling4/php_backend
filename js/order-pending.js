$(document).ready(function() {
    set_table();
});

function set_table() {
    $('#table1 tbody').html('');
    let arr = ajax(0, '1.4.1');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#lid').html(arr[i]['ol_id']);
        temp.find('#date').html(arr[i]['otime']);
        temp.find('#uname').html(arr[i]['m_name']);

        let ol_orderyes = "";
        let ol_trafyes = "";
        let status_yes = '<i class="fa-solid fa-circle-check" id="green"></i>';
        let status_no = '<i class="fa-solid fa-circle-xmark" id="pink"></i>';
        if (arr[i]['ol_orderyes'] == 1) {
            ol_orderyes = status_yes;
        } else {
            ol_orderyes = status_no;
        }
        if (arr[i]['ol_trafyes'] == 1) {
            ol_trafyes = status_yes;
        } else {
            ol_trafyes = status_no;
        }

        temp.find('#status').html(`帳務 ${ol_trafyes}<br> 訂單 ${ol_orderyes}`);
        temp.find('#gname').html(arr[i]['ol_name']);
        temp.find('#allp').html(arr[i]['amount']);
        temp.find('#quick').html(`<a class="btn btn-danger rounded-pill mb-1" onclick="change_txt('${arr[i]['ol_id']}')" data-bs-toggle="modal" data-bs-target="#exampleModalCenter2"> 快速編輯 </a>`);
        temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="order-check.html?id=${arr[i]['ol_id']}">查看</a>`);

        $('#table1 tbody').append(temp);
    }

}

function change_txt(num) {
    let obj = {
        ':ol_id': num,
    }
    let arr = ajax(obj, '1.4.5');

    $('#lid').html(arr[0]['ol_id']);
    $('#uname').html(arr[0]['m_name']);
    $('#gname').html(arr[0]['ol_name']);


    if (arr[0]['ol_trafyes'] == 0) {
        $('#trafyes').html("帳務確認中");
        $('#trafyes-btn').addClass("btn-primary");
        $('#trafyes-btn').removeClass("btn-secondary");
        $('#trafyes-btn').prop('disabled', false);
    } else {
        $('#trafyes').html("帳務已確認");
        $('#trafyes-btn').addClass("btn-secondary");
        $('#trafyes-btn').removeClass("btn-primary");
        $('#trafyes-btn').prop('disabled', true);
    }
    if (arr[0]['ol_orderyes'] == 0) {
        $('#orderyes').html("訂單確認中");
        $('#orderyes-btn').addClass("btn-primary");
        $('#orderyes-btn').removeClass("btn-secondary");
        $('#orderyes-btn').prop('disabled', false);
    } else {
        $('#orderyes').html("訂單已確認");
        $('#orderyes-btn').addClass("btn-secondary");
        $('#orderyes-btn').removeClass("btn-primary");
        $('#orderyes-btn').prop('disabled', true);
    }
    $('#trafyes-btn').attr("data-oid", arr[0]['ol_id']);
    $('#orderyes-btn').attr("data-oid", arr[0]['ol_id']);

    $('#lid').html(arr[0]['ol_id']);
    $('#uname').html(arr[0]['m_name']);
    $('#gname').html(arr[0]['ol_name']);
    $('#backacc').html(arr[0]['b_acc']);
}

function trafyesSend(btn) {
    let obj = {
        ':ol_id': $(btn).data('oid'),
    }
    ajax(obj, '2.4.2');
    $('#exampleModalCenter2').modal('hide');
    set_table();
}

function orderyesSend(btn) {
    let obj = {
        ':ol_id': $(btn).data('oid'),
    }
    ajax(obj, '2.4.3');
    $('#exampleModalCenter2').modal('hide');
    set_table();
}