$(document).ready(function() {
    set_table();
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

function set_table() {


    let obj = {
        ':ol_id': urlParams.get('id'),
    }
    let arr = ajax(obj, '1.4.3');

    let ddarr = ajax(obj, '1.4.4');
    console.log(ddarr);

    for (let i = 0; i < arr.length; i++) {
        console.log(arr);
        temp = $($('#ttable').html()).clone();
        temp.find('#lid').html(arr[i]['ol_id']);
        temp.find('#gdate').html(arr[i]['oldate']);
        temp.find('#uname').html(arr[i]['m_name']);
        temp.find('#gname').html(arr[i]['ol_name']);

        $('#uu').append(temp);
    }

    //cc&gg
    $('.oid').html(arr[0]['ol_id']);
    if (arr[0]['ol_trafyes'] == 0) {
        $('#trafyes-btn').addClass("btn-primary");
        $('#trafyes-btn').removeClass("btn-secondary");
        $('#trafyes-btn').prop('disabled', false);
    } else {
        $('#trafyes-btn').addClass("btn-secondary");
        $('#trafyes-btn').removeClass("btn-primary");
        $('#trafyes-btn').prop('disabled', true);
        $('#trafyes-bar').css('fill', '#26B7BC');
        $('#trafyes-dot').addClass("fa-solid");
        $('#trafyes-dot').removeClass("fa-regular");
        $('#trafyes-dot').attr("id", "green");
    }
    if (arr[0]['ol_orderyes'] == 0) {
        $('#orderyes-btn').addClass("btn-primary");
        $('#orderyes-btn').removeClass("btn-secondary");
        $('#orderyes-btn').prop('disabled', false);
    } else {
        $('#orderyes-btn').addClass("btn-secondary");
        $('#orderyes-btn').removeClass("btn-primary");
        $('#orderyes-btn').prop('disabled', true);
        $('#orderyes-bar').css('fill', '#26B7BC');
        $('#orderyes-dot').addClass("fa-solid");
        $('#orderyes-dot').removeClass("fa-regular");
        $('#orderyes-dot').attr("id", "green");
    }
    if (arr[0]['ol_status'] == 0) {
        $('#complete-btn').addClass("btn-secondary");
        $('#complete-btn').removeClass("btn-primary");
        $('#complete-btn').prop('disabled', true);
        $('#cancel-btn').hide();
    }
    if (arr[0]['ol_status'] == 2) {
        $('#cancel-btn').addClass("btn-secondary");
        $('#cancel-btn').removeClass("btn-danger");
        $('#cancel-btn').prop('disabled', true);
        $('#complete-btn').hide();
    }

    $('#ccostall').html('0');
    $('#csaleall').html('0');
    $('#cearnall').html('0');
    $('#gcostall').html(arr[0]['p_cost'].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#gsaleall').html(arr[0]['p_earn'].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#gearnall').html(arr[0]['p_profit'].replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    $('#backacc').html(arr[0]['b_acc']);

    //dd
    let cost_total = 0;
    let earn_total = 0;
    for (let i = 0; i < ddarr.length; i++) {

        ddtemp = $($('#dtable').html()).clone();
        ddtemp.find('#pname').html(ddarr[i]['p_name']);
        ddtemp.find('#qnt').html(ddarr[i]['op_qnt']);
        ddtemp.find('#cost').html(ddarr[i]['p_imprice']);
        ddtemp.find('#price').html(ddarr[i]['price']);
        ddtemp.find('#costall').html(ddarr[i]['im_tot']);
        ddtemp.find('#priceall').html(ddarr[i]['price_tot']);

        $('#dd').append(ddtemp);
        cost_total += parseInt(ddarr[i]['im_tot']);
        earn_total += parseInt(ddarr[i]['price_tot']);
    }
    $('#cost-total').html(separator(cost_total));
    $('#earn-total').html(separator(earn_total));

    for (let i = 0; i < arr.length; i++) {
        pptemp = $($('#ptable').html()).clone();
        pptemp.find('#bname').html(arr[i]['m_name']);
        pptemp.find('#badd').html(arr[i]['m_add']);
        pptemp.find('#bphone').html(arr[i]['m_phone']);
        pptemp.find('#bnote').html(arr[i]['m_note']);

        $('#pp').append(pptemp);
    }
}

function trafyesSend() {
    let obj = {
        ':ol_id': urlParams.get('id'),
    }
    ajax(obj, '2.4.2');
    window.location.reload();
}

function orderyesSend() {
    let obj = {
        ':ol_id': urlParams.get('id'),
    }
    ajax(obj, '2.4.3');
    window.location.reload();
}

function completeSend() {
    let obj = {
        ':ol_id': urlParams.get('id'),
    }
    ajax(obj, '2.4.4');
    window.location.reload();
}

function cancelSend() {
    let obj = {
        ':ol_note': $("#cancel-note").val(),
        ':ol_id': urlParams.get('id'),
    }
    ajax(obj, '2.4.1');
    $('#cancel-btn').addClass("btn-secondary");
    $('#cancel-btn').removeClass("btn-danger");
    $('#cancel-btn').prop('disabled', true);
    $('#complete-btn').hide();
    $('#exampleModalCenter2').modal('hide');
}