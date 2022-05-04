<?php

/*---SELECT---*/

// http://localhost/bracktbuyadmin/controller/php/switch.php?method=1.7.1&args[uid]=ROOT000001
// http://localhost/bracktbuyadmin/controller/php/switch.php?method=1.2.1&args=0
// http://localhost/bracktbuyadmin/controller/php/switch.php?method=1.1.1&args[:acc]=admin&args[:pwd]=admin

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
    case "1.1.1": // auth-login登入
        login($method, $args);
        break;


    case "1.2.1":
        $reader = new read_file_func();
        $q = $reader->sql_parser($method, 'query.sql');

        if (is_array($args)) {
            $whereStr = ' AND ';
            for ($i = 0; $i < count($args); $i++) {
                if ($i != 0)
                    $whereStr .= ' OR ';
                $whereStr .= 'aid = \'' . $args[$i] . '\'';
            }
        } else
            $whereStr = '';

        $q = str_replace('[WHERE]', $whereStr, $q);

        $query = new db_query('query.sql');
        $res = $query->send_query_by_string($q, 0);

        set_session($res['data'][0]);
        header("Location:switch.php");
        break;

    case "1.2.2":
        $reader = new read_file_func();
        $q = $reader->sql_parser($method, 'query.sql');

        if (is_array($args)) {
            $whereStr = ' WHERE ';
            for ($i = 0; $i < count($args); $i++) {
                if ($i != 0)
                    $whereStr .= ' OR ';
                $whereStr .= 'uid = \'' . $args[$i] . '\'';
            }
        } else
            $whereStr = '';

        $q = str_replace('[WHERE]', $whereStr, $q);

        $query = new db_query('query.sql');
        $res = $query->send_query_by_string($q, 0);

        set_session($res['data'][0]);
        header("Location:switch.php");
        break;

    default:
        $query = new db_query('query.sql');
        $res = $query->send_query($method, $args);
        set_session($res['data'][0]);
        header("Location:switch.php");
        break;
}

/*-儲存回傳資料-*/
function set_session($res)
{
    $arr = array();
    foreach ($res as $key => $value)
        $arr[$key] = $value;
    $_SESSION['data'] = $arr;
}

function login($method, $args)
{
    $query = new db_query('query.sql');
    $res = $query->send_query($method, $args);
    if ($res['effect'][0] == 0) {
        $_SESSION['data'] = array('success' => 0);
    } else {
        /*-記下UID-*/
        $_SESSION['aid'] = $res['data'][0][0]['aid'];

        set_session($res['data'][0][0]);
    }
    header("Location:switch.php");
}
