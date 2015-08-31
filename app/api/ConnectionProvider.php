<?php
include  'file_constants.php';


class ConnectionProvider
{
    static private $connection=null;
    public static function getConnection()
    {
         $hostname = "localhost";
$user = "root";
$password = "";
$database = "user_data";
    if(self::$connection==null)
    {
    try {
       
    self::$connection=new PDO('mysql:host='.$hostname.';dbname='.$database,$user,$password);
    }
    catch (Exception $ex) {
    print $ex;
    }
    }
    return self::$connection;
    }
}
