const express = require("express");
const app = express();
const mysql = require ("mysql");
const cors = require ("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "lap144",
    database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req,res)=>{
   const {name}= req.body;
   const {cost}= req.body;
   const {category}= req.body;

   let sql = "insert into games (name,cost,category) values (?,?,?)";

   db.query(sql,[name,cost,category],(err,result)=>{
    console.log(err)
   })
});

app.get("/getCards", (req,res)=>{

    let sql= "select * from games";

    db.query(sql, (err,result)=>{
        if (err) console.log(err)
        else res.send(result)
    });
});

app.listen(3001, ()=>{
    console.log("rodando servidor");
});