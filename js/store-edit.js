$(document).ready(function() {
    set_table();
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function set_table() {
    let obj = {
        ":gl_id": urlParams.get('id')
    };
    let arr = ajax(obj, '1.8.2');

    obj = {
        ":gl_id": urlParams.get('id')
    };
    let pparr = ajax(obj, '1.8.3');

    obj = {
        ":gl_id": urlParams.get('id')
    };
    let nnarr = ajax(obj, '1.8.4');

    //arr
    $('#gname').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['gl_name'] + '">');
    $('#class').html('<select class="form-control"><option>' + "未分類" + '</option></select>');
    $('#cond').html('<select class="form-control"><option>' + arr[0]['scc_way'] + '</option></select>');
    $('#deli').html('<select class="form-control"><option>' + arr[0]['gl_transport'] + '</option></select>');
    $('#outtime').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['gl_dtime'] + '">');
    date_time = arr[0]['gl_stime'].split(' ');
    $('#startdate').html(`<input type="date" class="form-control" id="basicInput" value="${date_time[0]}">`);
    $('#starttime').html(`<input type="time" class="form-control" id="basicInput" value="${date_time[1]}">`);
    date_time = arr[0]['gl_etime'].split(' ');
    $('#enddate').html(`<input type="date" class="form-control" id="basicInput" value="${date_time[0]}">`);
    $('#endtime').html(`<input type="time" class="form-control" id="basicInput" value="${date_time[1]}">`);
    $('#note').html('<input type="text" class="form-control" id="basicInput" value="' + arr[0]['gl_note'] + '">');

    //pparr
    for (let i = 0; i < pparr.length; i++) {
        pptemp = $($('#ptable').html()).clone();
        pptemp.find('#pimg').html(`<img src="${pparr[i]["img_path"]}">`);
        pptemp.find('#cname').html(pparr[i]['m_name']);
        pptemp.find('#pname').html(pparr[i]['gname']);
        pptemp.find('#class').html(pparr[i]['p_class']);
        pptemp.find('#type').html(pparr[i]['ver']);
        pptemp.find('#enddate').html(pparr[i]['matdate']);
        pptemp.find('#cost').html(pparr[i]['p_imprice']);
        pptemp.find('#sale').html(pparr[i]['p_offprice']);

        $('#uu').append(pptemp);
    }

    let ol_orderyes = "";
    let ol_trafyes = "";
    let status_yes = '<i class="fa-solid fa-circle-check" id="green"></i>';
    let status_no = '<i class="fa-solid fa-circle-xmark" id="pink"></i>';

    for (let i = 0; i < nnarr.length; i++) {
        console.log(nnarr[i])
        nntemp = $($('#ntable').html()).clone();
        nntemp.find('#lid').html(nnarr[i]['ol_id']);
        nntemp.find('#date').html(nnarr[i]['ol_time']);
        nntemp.find('#uname').html(nnarr[i]['m_name']);

        if (nnarr[i]['ol_orderyes'] == 1) {
            ol_orderyes = status_yes;
        } else {
            ol_orderyes = status_no;
        }
        if (nnarr[i]['ol_trafyes'] == 1) {
            ol_trafyes = status_yes;
        } else {
            ol_trafyes = status_no;
        }

        nntemp.find('#status').html(`帳務 ${ol_trafyes}<br> 訂單 ${ol_orderyes}`);
        nntemp.find('#gname').html(nnarr[i]['ol_name']);
        nntemp.find('#allp').html(nnarr[i]['prc']);
        nntemp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="order-check.html?id=${nnarr[i]['ol_id']}">查看</a>`);

        $('#nn').append(nntemp);
    }
}