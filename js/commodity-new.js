const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

$(document).ready(function() {

    let mid = urlParams.get('mid');


    let mlist = ajax(0, '1.6.11');
    for (let i = 0; i < mlist.length; i++) {
        if (mlist[i]['m_id'] == mid) {
            $('#cname').html(mlist[i]['m_name']);
            break;
        }
    }

    let typearr = ajax(0, '1.6.3');
    for (let i = 0; i < typearr.length; i++)
        $('.g_class').append('<option>' + typearr[i]['tname'] + '</option>');
});

function ceditsend() {
    let obj = {
        ':m_id': urlParams.get('mid'),
        ':class': $('.g_class').val(),
        ':gname': $('.pname').val(),
        ':ver': $('.type').val(),
        ':matdate': $('.enddate').val(),
        ':themosphere': $('.deli').val(),
        ':place': $('.place').val(),
        ':img_path': '',
        ':stock': $('.qnt').val(),
        ':destxt': $('.ptxt').val()
    }

    console.log(obj);
    ajax(obj, '2.6.4');

    $("#form").find("#reset-btn").click();
}