$(document).ready(function() {
    set_table();
});

function set_table() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let obj = {
        ':pid': urlParams.get('id'),
    }
    let arr = ajax(obj, '1.3.2');
    console.log(arr);

    temp = $($('template').html()).clone();
    $('#time').html('<p style="color: #AEAEAE;">' + arr[0]['pw_time'] + '</p>');
    $('#name').html('<p style="color: #AEAEAE;">' + arr[0]['m_name']) + '</p>';
    $('#mtxt').html('<p tyle="color: #AEAEAE;">' + arr[0]['pw_destxt'] + '</p>');
    $('#img').html(`<img src="${arr[0]['pw_picpath']}"  alt="Face 1" class="w-75">`);

    $('div #ta').append($temp);
}