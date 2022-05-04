$(document).ready(function() {
    filter(99);

    $('.keyword').keypress(function(e) {
        if (e.keyCode == 13) {
            table_change();
        }
    });


    var arr = ajax(0, '1.6.3');

    for (let i = 0; i < arr.length; i++) {
        $('select.g_class').append('<option>' + arr[i]['tname'] + '</option>');
    }

    set_manu();
});

function filter(num) {
    change_active(num);
    let g_class = $(".g_class").val();
    let keyword = $(".keyword").val();
    set_table(num, g_class, keyword);
}

/*-按鈕顏色-*/
function change_active(num) {
    switch (num) {
        case 0:
            sessionStorage.setItem(filter, 0);
            $('.sbtn99').css('color', '#AEAEAE');
            $('.sbtn0').css('color', '#26B7BC');
            $('.sbtn1').css('color', '#AEAEAE');
            $('.sbtn2').css('color', '#AEAEAE');
            break;
        case 1:
            sessionStorage.setItem(filter, 1);
            $('.sbtn99').css('color', '#AEAEAE');
            $('.sbtn0').css('color', '#AEAEAE');
            $('.sbtn1').css('color', '#26B7BC');
            $('.sbtn2').css('color', '#AEAEAE');
            break;
        case 2:
            sessionStorage.setItem(filter, 2);
            $('.sbtn99').css('color', '#AEAEAE');
            $('.sbtn0').css('color', '#AEAEAE');
            $('.sbtn1').css('color', '#AEAEAE');
            $('.sbtn2').css('color', '#26B7BC');
            break;
        default:
            sessionStorage.setItem(filter, 99);
            $('.sbtn99').css('color', '#26B7BC');
            $('.sbtn0').css('color', '#AEAEAE');
            $('.sbtn1').css('color', '#AEAEAE');
            $('.sbtn2').css('color', '#AEAEAE');
            break;

    }
}

function set_table(status, g_class, search) {

    var arr = ajax(0, '1.6.1');
    $('tbody').html('');
    for (let i = 0; i < arr.length; i++) {
        if (status == 99 || arr[i]['g_status'] == status) {
            if (g_class == 99 || arr[i]['class'] == g_class) {
                if (arr[i]['gname'].includes(search)) {


                    let temp = $($('template').html()).clone();
                    temp.find('#pid').html(arr[i]['gid']);
                    temp.find('#cname').html(arr[i]['m_name']);
                    temp.find('#pname').html(arr[i]['gname']);
                    temp.find('#type').html(arr[i]['ver']);
                    if (arr[i]['g_status'] == 0)
                        temp.find('#status').html('<a id="yellow"><i class="fa-solid fa-check"></i> 下架中</a>');
                    else if (arr[i]['g_status'] == 1)
                        temp.find('#status').html('<a id="green"><i class="fa-solid fa-check"></i> 上架中</a>');
                    else if (arr[i]['g_status'] == 2)
                        temp.find('#status').html('<a id="red"><i class="fa-solid fa-check"></i> 暫停販售</a>');
                    temp.find('#cost').html(arr[i]['p_imprice']);
                    temp.find('#sale').html(arr[i]['p_offprice']);
                    temp.find('#check').html(`<a class="btn btn-success rounded-pill mb-1" href="commodity-edit.html?id=${arr[i]['gid']}">查看</a>`);

                    $('tbody').append(temp);
                }
            }
        }
    }

}

function set_manu() {
    let arr = ajax(0, '1.6.11');
    console.log(arr);
    for (let i = 0; i < arr.length; i++)
        $('.manu_class').append('<option value="' + arr[i]['m_id'] + '">' + arr[i]['m_name'] + '</option>');
}

function to_insert() {
    location.href = 'commodity-new.html?mid=' + $('.manu_class').val();
}

function selectall(checkbox) {
    if (checkbox.checked == true) {
        $('.cbox').prop('checked', true);
        $(".style1").attr("hidden", true);
        $(".style2").attr("hidden", false);
    } else {
        $('.cbox').prop('checked', false);
        $(".style1").attr("hidden", false);
        $(".style2").attr("hidden", true);
    }
}


function boxOnclick(checkbox) {
    $('.tbox').prop('indeterminate', true);
    if (checkbox.checked == true) {
        $(".style1").attr("hidden", true);
        $(".style2").attr("hidden", false);
    }
}

function table_change() {
    let g_class = $(".g_class").val();
    let keyword = $(".keyword").val();
    set_table(sessionStorage.getItem(filter), g_class, keyword);
}