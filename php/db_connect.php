<?php

class db_connect
{

    public static function connect_event($default_database)
    {
        include "parameter.php";

        try {
            if (is_int($default_database) &&  $default_database == 0)
                $url = "mysql:host=" . $hostname . ";port=" . $port;
            else
                $url = "mysql:host=" . $hostname . ";port=" . $port. ";dbname=".$default_database;
            $conn = new PDO($url, $username, $password);
            $a = $conn->exec("set character set 'utf8'");
            $b = $conn->exec("set names utf8");
            return 0;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}