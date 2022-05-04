<?php

/*---INSERT UPDATE DELETE---*/

// http://localhost/group_buy/controllers/php/switch.php?method=2.9.1&args[:uid]=ROOT000001&args[:om_autonum]=1

include "parameter.php";
include_once "db_connect.php";
include_once "db_query.php";
include_once "read_file_func.php";

/*-開啟session-*/
if (!isset($_SESSION))
    session_start();

/*-取出session 用完即刪-*/
$method = $_SESSION['method'];
$args = $_SESSION['args'];
unset($_SESSION["args"]);
unset($_SESSION["method"]);



switch ($method) {
    default:
        $query = new db_query('query.sql');
        $res = $query->send_query($method, $args);
        $_SESSION['data'] = array();
        header("Location:switch.php");
        break;
}
