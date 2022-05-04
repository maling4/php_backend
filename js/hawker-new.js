function dataSend() {
    let uid = parseInt(Date.now()) + '' + Math.floor(Math.random() * 100);

    let obj = {
        ':uid': uid,
        ':m_name': $("#m-name").val(),
        ':m_phone': $("#m-phone").val(),
        ':m_add': $("#m-addr").val(),
        ':join_date': $("#m-date").val(),
        ':b_code': $("#m-bank").val(),
        ':b_acc': $("#m-bacc").val(),
        ':tid': $("#m-class").val(),
        ':m_note': $("#m-note").val(),
        ':m_acc': $("#m-acc").val(),
        ':m_pwd': $("#m-pwd").val(),
    }

    ajax(obj, '2.5.4');
    window.location.href = 'hawker.html';
}

function dataReset() {
    $("#form").find("#reset-btn").click();
}