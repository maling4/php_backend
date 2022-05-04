$(document).ready(function() {
    set_table();
});

//上
function set_table() {

    var arr = ajax(0, '1.2.1');
    var arr1 = ajax(0, '1.2.2');

    $('#pur').html(arr[0]['unsub'].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#allin').html(arr[0]['earn'].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#allout').html(arr[0]['cost'].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    $('#allearn').html(arr[0]['profit'].replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    for (let i = 0; i < arr1.length; i++) {
        let temp1 = $($('template').html()).clone();
        temp1.find('#rank').html(i + 1);
        temp1.find('#cname').html(arr1[i]['gl_name']);
        temp1.find('#pname').html(arr1[i]['p_name']);
        temp1.find('#cost').html(arr1[i]['p_imprice']);
        temp1.find('#sale').html(arr1[i]['p_offprice']);
        temp1.find('#qnt').html(arr1[i]['qnt']);
        temp1.find('#all').html(arr1[i]['profit']);

        $('tbody').append(temp1);
    }

}