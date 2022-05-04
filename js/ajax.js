/*-ajax( 資料, 請求編號或名稱)-*/
function ajax(object, destination) {
    var obj
    $.ajax({
        url: './controller/php/switch.php',
        type: 'POST',
        async: false, // 非同步:否
        data: { method: destination, args: object },
        error: function(xhr) {
            alert('發生錯誤，錯誤代碼 ' + destination);
            if (history.length == 1) {
                location.href = "./index.html";
            } else {
                location.href = history.back();
            }
        },
        success: function(text) {
            // console.log(text); // 在console印出
            if (text == "")
                obj = Array();
            else
                obj = JSON.parse(text);
            // console.log(obj); // 在console印出
        }
    });
    return obj;
}