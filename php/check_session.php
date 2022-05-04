<?php

/*-開啟session-*/
if (!isset($_SESSION))
    session_start();

/*-取出session 用完即刪-*/
$method = $_SESSION['method'];
$args = $_SESSION['args'];
unset($_SESSION["args"]);
unset($_SESSION["method"]);

switch ($method) {
    case "0.0.0": // 檢查登入權限
        check_permission();
        break;
    case '0.0.1': // 取AID
        $_SESSION['data'] = array($_SESSION['aid']);
        // print_r($_SESSION['aid']);
        header("Location:switch.php");
        break;
}

/*-檢查登入權限-*/
function check_permission()
{
    if (isset($_SESSION['aid']))
        $_SESSION['data'] = array(1);
    else
        $_SESSION['data'] = array(0);
    header("Location:switch.php");
}
