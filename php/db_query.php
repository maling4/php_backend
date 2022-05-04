<?php



class db_query
{

    public $ini_file;

    function __construct($ini_file)
    {
        $this->ini_file = $ini_file;
    }


    /*-透過PDO送query-*/
    public function send_query($method, $args)
    {
        include "parameter.php";
        include_once "db_connect.php";
        include_once "read_file_func.php";

        $sql_connect = new db_connect();
        $connection = $sql_connect->connect_event($default_database);
        /*-若沒有連接成功將中斷後續動作-*/
        if ($connection != 0)
            exit($connection);

        $reader = new read_file_func();
        $query = $reader->sql_parser($method, $this->ini_file);
        print_r($query);
        echo '<br>';
        $statement = $conn->prepare($query);

        /*-毋須$args帶值-*/
        if (is_int($args) &&  $args == 0)
            $statement->execute();
        else {
            /*-轉換$args型態-*/
            if (is_object($args))
                $args = get_object_vars($args);
            foreach ($args as $key => $value) {
                /*-去除斜杠-*/
                $args[$key] = stripslashes($value);
            }
            $statement->execute($args);
        }
        $statement->debugDumpParams(); // 印出語法

        $error = $statement->errorInfo();

        if ($error[0] == '0000' || $error[0] = '00000') {

            $result = array();
            $affect_rows = array();
            while (1) {
                $rowset = $statement->fetchAll(PDO::FETCH_ASSOC);
                /*-取結果-*/
                array_push($result, $rowset);
                /*-取影響行數-*/
                array_push($affect_rows,  $statement->rowCount());

                if (!$statement->nextRowset())
                    break;
            }


            $res['message'] = 'success';
            $res['effect'] = $affect_rows;
            $res['data'] = $result;

            /*-複數SELECT有時會漏結果 做最後檢查-*/
            $correct_result_amount = substr_count($query, ';');
            $select_amount = substr_count($query, ';');

            if ($select_amount > 1 && count($res['effect']) != $correct_result_amount) {
                $query = explode(';', $query);

                $backup_result = $result;
                $result = array();
                $backup_affect_rows = $affect_rows;
                $affect_rows = array();
                for ($i = 0; $i < $correct_result_amount; $i++) {
                    echo strtoupper(substr(str_replace(" ", "", $query[$i]), 0, 6));
                    /*-select才做-*/
                    if (strtoupper(substr(str_replace(" ", "", $query[$i]), 0, 6)) == 'SELECT') {

                        $sql_connect = new db_connect();
                        $connection = $sql_connect->connect_event($default_database);
                        /*-若沒有連接成功將中斷後續-*/
                        if ($connection != 1)
                            exit($connection);

                        $statement = $conn->prepare($query[$i]);

                        /*-毋須$args帶值-*/
                        if (is_int($args) &&  $args == 0)
                            $statement->execute();
                        else {
                            /*---轉換$args型態---*/
                            if (is_object($args))
                                $args = get_object_vars($args);
                            foreach ($args as $key => $value) {
                                /*---去除斜杠---*/
                                $args[$key] = stripslashes($value);
                            }
                            $statement->execute($args);
                        }

                        $rowset2 = $statement->fetchAll(PDO::FETCH_ASSOC);

                        /*-取結果-*/
                        array_push($result, $rowset2);
                        /*-取影響行數-*/
                        array_push($affect_rows,  $statement->rowCount());
                    } else {
                        /*-取結果-*/
                        array_push($result, $backup_result[$i]);
                        /*-取影響行數-*/
                        array_push($result, $backup_affect_rows[$i]);
                    }
                }

                $res['message'] = 'success';
                $res['effect'] = $affect_rows;
                $res['data'] = $result;
            }
        } else {
            $res['message']['code'] = $error[0];
            $res['message']['content'] = $error[2];
            $res['data'] = null;
        }

        return $res;
    }

    /*-透過PDO送query-*/
    public function send_query_by_string($query, $args)
    {
        include "parameter.php";
        include_once "db_connect.php";
        include_once "read_file_func.php";

        $sql_connect = new db_connect();
        $connection = $sql_connect->connect_event($default_database);
        /*-若沒有連接成功將中斷後續動作-*/
        if ($connection != 0)
            exit($connection);

        $statement = $conn->prepare($query);

        /*-毋須$args帶值-*/
        if (is_int($args) &&  $args == 0)
            $statement->execute();
        else {
            /*-轉換$args型態-*/
            if (is_object($args))
                $args = get_object_vars($args);
            foreach ($args as $key => $value) {
                /*-去除斜杠-*/
                $args[$key] = stripslashes($value);
            }
            $statement->execute($args);
        }
        $statement->debugDumpParams(); // 印出語法

        $error = $statement->errorInfo();

        if ($error[0] == '0000' || $error[0] = '00000') {

            $result = array();
            $affect_rows = array();
            while (1) {
                $rowset = $statement->fetchAll(PDO::FETCH_ASSOC);
                /*-取結果-*/
                array_push($result, $rowset);
                /*-取影響行數-*/
                array_push($affect_rows,  $statement->rowCount());

                if (!$statement->nextRowset())
                    break;
            }


            $res['message'] = 'success';
            $res['effect'] = $affect_rows;
            $res['data'] = $result;

            /*-複數SELECT有時會漏結果 做最後檢查-*/
            $correct_result_amount = substr_count($query, ';');
            $select_amount = substr_count($query, ';');

            if ($select_amount > 1 && count($res['effect']) != $correct_result_amount) {
                $query = explode(';', $query);

                $backup_result = $result;
                $result = array();
                $backup_affect_rows = $affect_rows;
                $affect_rows = array();
                for ($i = 0; $i < $correct_result_amount; $i++) {
                    echo strtoupper(substr(str_replace(" ", "", $query[$i]), 0, 6));
                    /*-select才做-*/
                    if (strtoupper(substr(str_replace(" ", "", $query[$i]), 0, 6)) == 'SELECT') {

                        $sql_connect = new db_connect();
                        $connection = $sql_connect->connect_event($default_database);
                        /*-若沒有連接成功將中斷後續-*/
                        if ($connection != 1)
                            exit($connection);

                        $statement = $conn->prepare($query[$i]);

                        /*-毋須$args帶值-*/
                        if (is_int($args) &&  $args == 0)
                            $statement->execute();
                        else {
                            /*---轉換$args型態---*/
                            if (is_object($args))
                                $args = get_object_vars($args);
                            foreach ($args as $key => $value) {
                                /*---去除斜杠---*/
                                $args[$key] = stripslashes($value);
                            }
                            $statement->execute($args);
                        }

                        $rowset2 = $statement->fetchAll(PDO::FETCH_ASSOC);

                        /*-取結果-*/
                        array_push($result, $rowset2);
                        /*-取影響行數-*/
                        array_push($affect_rows,  $statement->rowCount());
                    } else {
                        /*-取結果-*/
                        array_push($result, $backup_result[$i]);
                        /*-取影響行數-*/
                        array_push($result, $backup_affect_rows[$i]);
                    }
                }

                $res['message'] = 'success';
                $res['effect'] = $affect_rows;
                $res['data'] = $result;
            }
        } else {
            $res['message']['code'] = $error[0];
            $res['message']['content'] = $error[2];
            $res['data'] = null;
        }

        return $res;
    }

    /*-剖析SQL語法-*/
    public function parse_sql_query($method, $ini_result)
    {
        include "parameter.php";

        /*-錯誤代碼-*/
        if (!isset($ini_result['data'][$method]))
            return array("error" => "[002] failed to run method: No such method name: " . $method);
        elseif (!isset($ini_result['data'][$method]['query']))
            return array("error" => "[003] failed to run method: Can't find query in " . $method);

        /*-query[] & :db 數量-*/
        $query_row = count($ini_result['data'][$method]['query']);
        $db_row = count($ini_result['data'][$method]) - 1;

        /*-產生$query(query數量,query[0],query[1],...)-*/
        $query['row'] = $query_row;
        for ($i = 1; $i <= $query_row; $i++) {
            $tmpquery = $ini_result['data'][$method]['query'][$i - 1];

            /*-逐一置換":db"-*/
            for ($db_cnt = 1; $db_cnt <= $db_row; $db_cnt++)
                $tmpquery = str_replace(":db" . $db_cnt, $ini_result['data'][$method][":db" . $db_cnt], $tmpquery);

            /*-存在未置換:db-*/
            if (strpos($tmpquery, ':db'))
                return array("error" => "[004] failed to run method: Including unknown \":db\" in query[" . ($i - 1) . "]");

            /*-將$tmpquery塞入$query-*/
            array_push($query, $tmpquery);
        }

        return $query;
    }

    /*-顯示send_query回傳之內容-*/
    public function show_query_result($arr)
    {
        foreach ($arr as $key => $val) {
            print($key . '{');

            if (is_array($val)) {
                foreach ($val as $key2 => $val2) {
                    print('<br>&emsp;[');

                    if (is_array($val2)) {
                        foreach ($val2 as $key3 => $val3) {
                            print('<br>&emsp;&emsp;(' . $key3 . ' => ');
                            print_r($val3);
                            print(')');
                        }
                        print('<br>&emsp;');
                    } else
                        print($key2 . ' => ' .  $val2);

                    print(']');
                }
            } else
                print('<br>&emsp;' . $val);

            print('<br>}<br>');
        }
    }
}
