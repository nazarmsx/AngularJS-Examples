<?php
include_once 'DAOInclude.php';
interface DbCommand
{
    function  execute();
}

class UpdateUserCommand implements DbCommand 
{
    function execute() {
    $user=json_decode($_GET['user']);
    $dao=new UserDAO();
    $dao->update($user);    
    }
}

class DeleteUserCommand implements DbCommand 
{
    function execute() {
    $user=json_decode($_GET['user']);
    $dao=new UserDAO();
    $dao->update($user);    
    }
}
class CreateUserCommand implements DbCommand 
{
    function execute() {
    $user=json_decode($_GET['user']);
    $dao=new UserDAO();
    $dao->update($user);    
    }
}

class ReadUserCommand implements DbCommand 
{
    function execute() {
    $dao=new UserDAO();
    $res='';
    
    $res='{"records":'.json_encode($dao->readAll()).'}';
    
    return $res;
    }
}
