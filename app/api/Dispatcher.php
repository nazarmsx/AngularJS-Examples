<?php
require_once 'databaseoperations.php';

abstract class Dispatcher
{
    public abstract function dispatch($action);
}

class HttpDispatcher extends Dispatcher
{
    public function dispatch($action) {
    if($action =='update') return new UpdateUserCommand();
    if($action =='create') return new CreateUserCommand();
    if($action =='delete') return new DeleteUserCommand();
    if($action =='read') return new ReadUserCommand();
    if($action =='register') return new RegisterUserCommand ();
    return null;
    }
}