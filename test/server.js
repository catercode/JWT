 require('dotenv').config()
const express = require('express')
//import jwt package
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000
 
 
 app.use(express.json())
const posts = [
    {
        username:"bawa",
        title:"post1"
    },   
    {
        username:"malik",
        title:"post2"
    }
]
app.get('/posts',authenticateToken,(req,res)=>{
res.json(posts.filter(post=>post.username===req.user.name))
})

//this line of code is use to authe nticate the token
 function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
  
    if(token ==null)return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user =user
        next( )
    })
     


 }
app.listen(port)
console.log("App ls listerning to port "+ port)
 