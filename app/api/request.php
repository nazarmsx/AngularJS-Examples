<?php
require_once 'Dispatcher.php';
if(isset($_GET['action'])){
$dispatcher=new HttpDispatcher();

echo $dispatcher->dispatch($_GET['action'])->execute();
}
else
{
    exit('Error : wrong action requested');
}


