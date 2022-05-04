<?php

class read_file_func
{

    public static function ini_reader($filename)
    {
        /*---檔案不存在---*/
        if (file_exists($filename))
            $result = parse_ini_file($filename, true);
        else
            $result = array("error" => "[001] failed to open stream: No such file or directory in " . $filename);

        $result = array("data" => $result);
        return $result;
    }

    public static function ini_writer($filename, $arr)
    {
        $str = "";
        $data = $arr['data'];
        foreach ($data as $key => $values) {
            $str .= "[" . $key . "]\n";
            foreach ($values as $key => $value) {
                $str .= $key . "=" . $value . "\n";
            }
        }
        $file = fopen($filename, "w");
        fwrite($file, $str);
    }

    public static function sql_parser($method, $filename)
    {
        if (!file_exists($filename))
            die("[001] failed to open stream: No such file or directory in " . $filename);
        else {

            try {

                /*---讀檔--*/
                $fp = fopen($filename, "r");
                $str = fread($fp, filesize($filename)); //指定讀取長度

                /*--換行切割---*/
                $lines = explode("\r\n", $str);
                $result = "";
                $save_bol = false;
                print_r($save_bol);
                foreach ($lines as $row => $query) {
                    if ($query == "-- #BEGIN[" . $method . "]")
                        $save_bol = true;

                    if ($save_bol) {
                        if ($query == "-- #END") {
                            return $result;
                        } elseif (!preg_match("/^(\-{2})/", $query)) {
                            $result = $result . $query . " ";
                        }
                    }
                }
                return $result;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        }
    }
}
