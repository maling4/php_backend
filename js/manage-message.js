$(document).ready(function() {
    set_table();
});

function set_table() {
    let arr = ajax(0, '1.3.1');

    for (let i = 0; i < arr.length; i++) {
        temp = $($('template').html()).clone();
        temp.find('#time').html(arr[i]["pw_time"]);
        temp.find('#uid').html(arr[i]["m_name"]);
        temp.find('#mtxt').html(arr[i]["pw_destxt"]);
        temp.find('#check').html(`<a class="btn btn-primary rounded-pill mb-1" href="manage-message-content.html?id=${arr[i]['pw_id']}">查看</a>`);

        $('tbody').append(temp);
    }

}