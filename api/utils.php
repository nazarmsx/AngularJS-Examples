<?php
if(isset($_GET['action']))
{
    switch ($_GET['action']) {
case 'login':
    doLogin();
    break;
case 'signup':
    doSignUp();
    break;
default :
    echo 'bad request!';
break;
}
}

function doLogin()
{
    
}

function doSignUp()
{
    
}