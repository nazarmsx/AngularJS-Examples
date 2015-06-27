<?php
include_once 'DAOInclude.php';
if(($_GET['update']=='true'))
    {
    $user=json_decode($_GET['user']);
    $dao=new UserDAO();
    $dao->update($user);    
    }
else{
$dao=new UserDAO();
echo '{"records":';
print_r(json_encode($dao->readAll()));
echo '}';
}
 
