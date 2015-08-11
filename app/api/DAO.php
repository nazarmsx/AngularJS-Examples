<?php
require_once 'VO.php';
require_once 'ConnectionProvider.php';
abstract  class DAO
{
   public abstract function create($table);
   public abstract function read($id);
   public abstract function update($table);
   public abstract function delete($table);
   public abstract function readAll();
}

class UserDAO extends DAO {
    
   public function read($id)
   {
   $user=new User(); 
   foreach (ConnectionProvider::getConnection()->query('select user.id,user.telephone,user.name,user.email,address.state,address.street,address.zip,address.city from user inner join address on user.address_id=address.id') as $row)
   {
   if ($row['id']==$id)
   {
   $user->id=$row['id'];
   $user->telephone=$row['telephone'];
   $user->name=$row['name'];
   $user->email=$row['email'];
   return $user;
   }
   }    
   return null;
   }
   public function readAll(){
   $users=array();
   foreach (ConnectionProvider::getConnection()->query('select user.id,user.telephone,user.name,user.email,address.state,address.street,address.zip,address.city from user inner join address on user.address_id=address.id order by user.id') as $row)
   {
   $user=new User();      
   $user->id=$row['id'];
   $user->telephone=$row['telephone'];
   $user->name=$row['name'];
   $user->email=$row['email'];
   $user->city=$row['city'];
   $user->state=$row['state'];
   $user->street=$row['street'];
   $user->zip=$row['zip'];
   $users[]=$user;
   }
   return $users;
   }
    public function create($user) { //returns id of newly inserted user
    $insert_address="INSERT INTO address (state,street,zip,city) VALUES ('".$user->state."','".$user->street."','".$user->zip."','".$user->city."') ";
    ConnectionProvider::getConnection()->query($insert_address);
    $sql="INSERT INTO user (telephone,name,email,address_id) VALUES ('".$user->telephone."','".$user->name."','".$user->email."','".ConnectionProvider::getConnection()->lastInsertId()."') ";
    ConnectionProvider::getConnection()->query($sql);
    return ConnectionProvider::getConnection()->lastInsertId();
    }

    public function delete($user) {
    $sql="DELETE FROM user WHERE user.id='".$user->id."'";  
    ConnectionProvider::getConnection()->query($sql);
    }

    public function update($user) {
    $sql="UPDATE address adr inner join user usr on adr.id =usr.address_id SET adr.state='$user->state',adr.street='$user->street',adr.zip='$user->zip',adr.city='$user->city',name='$user->name',email='$user->email',telephone='$user->telephone'  WHERE usr.id=$user->id;";
    //$sql="UPDATE user SET name='$user->name',email='$user->email',telephone='$user->telephone' WHERE id=$user->id";
    ConnectionProvider::getConnection()->query($sql);
    }

}