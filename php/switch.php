<?php

include "./parameter.php";
include_once "./db_connect.php";
include_once "./db_query.php";
include_once "./read_file_func.php";

/*-儲存資料至session-*/
if (!isset($_SESSION))
    session_start();

/*-若送回就準備回傳 回傳前清除-*/
if (isset($_SESSION["data"])) {
    $object = String_encode($_SESSION["data"]);
    unset($_SESSION["data"]);
    exit($object);
}

/*-若接收則存取session-*/
unset($_SESSION["method"]);
unset($_SESSION["args"]);
$_SESSION["method"] = $_REQUEST["method"];
if (empty($_REQUEST["args"]))
    $_SESSION["args"] = 0;
else
    $_SESSION["args"] = $_REQUEST["args"];


/*-讀入ini-*/
$ir = new read_file_func();
$ini_result = $ir->ini_reader("location.ini");


$each_layer = explode(".", $_SESSION["method"], $ini_result["data"]["layers"]);


/*-轉址-*/
$location = "Location:./" . $ini_result["data"]["location"][$each_layer[0]];
header($location);


/*-JS用encode-*/
function String_encode($obj)
{ //解決json unicode的問題
    array_walk_recursive($obj, 'ChangeWord'); //尋訪陣列，並將陣列內的字串轉url表達法(ex:%20)

    return urldecode(json_encode($obj)); //列印json後再將剛剛轉的字串一次轉回原本內容
}
function ChangeWord($value, $key)
{
    if (is_string($value)) {
        $value = urlencode($value);
    }
}
