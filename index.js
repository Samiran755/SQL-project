const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
// initialising server--
 let port=8080;
 app.listen(port,()=>{
  console.log("Server is listening on port 8080");
 })
//  home page--
 app.get("/",(req,res)=>{
 let q="SELECT count(*) FROM user";
try{
    connection.query(q,(err,result)=>{
    if(err) throw  err;
    let count=result[0]["count(*)"];
    res.render("home.ejs",{count});
});
}catch(err){
    console.log(err);
    res.send("Something went wrong!")
}

 })
 //Show route--
 app.get("/users",(req,res)=>{
  let q="SELECT * FROM user ";
  try{
    connection.query(q,(err,users)=>{
    if(err) throw  err;
    res.render("show.ejs",{users});
});
}catch(err){
    console.log(err);
    res.send("Something went wrong!")
}
})
//Edit route--
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
    if(err) throw  err;
    let user=result;
    console.log(user)
    res.render("edit.ejs",{user});
});
}catch(err){
    console.log(err);
    res.send("Something went wrong!")
}
  
})
//update route--
app.patch("/user/:id",(req,res)=>{
   let {id}=req.params;
   let {password:formpass,username:newusername}=req.body;
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
    if(err) throw  err;
    let user=result;
    if(formpass!=user[0].password){
      res.send("Wrong Password!")
    }else{
      let q2=`UPDATE user SET username ='${newusername}' WHERE id='${id}'`;
       connection.query(q2,(err,result)=>{
        if(err) throw err;
        res.redirect("/users");
      }
    )
    
    }  
    
    
  
});
}catch(err){
    console.log(err);
    res.send("Something went wrong!")
}
})
//making connection with sql--
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_apps',
  password:'Samiran#*953'
});
//fake data creation from @faker-
let createRandomUser=()=> {
  return [
     faker.string.uuid(),
     faker.internet.username(), 
     faker.internet.email(),
     faker.internet.password(),
  ];
}
