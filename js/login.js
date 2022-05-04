function log() {

    if ($('input.usr').val() != '' && $('input.pwd').val() != '') {
        var obj = {
            ':acc': $('input.usr').val(),
            ':pwd': $('input.pwd').val()
        };
        console.log(obj);
        var res = ajax(obj, '1.1.1');
        console.log(res);

        if (res['success'] == 0)
            alert('帳號或密碼錯誤');
        else

            location.href = "./manage-index.html";
    } else {
        alert('欄位不得為空');
    }
}