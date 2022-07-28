 require('dotenv').config()
const express = require('express')
//import jwt package
const jwt = require('jsonwebtoken')
const app = express()
const port = 4000
 
 
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

//  app.post('/login',(req,res)=>{
//   const username = req.body.username 
//   const user = {name:username}
//    //this line create our accessTokens when login
//   const accessTokens= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET) 
//   res.json({accessTokens:  accessTokens})
   
//  }) 
//this line of code is use to authenticate the token
//  function authenticateToken(req,res,next){
//     const authHeader = req.headers['authorization']
//     const token =authHeader && authHeader.split(' ')[1]
  
//     if(token ==null)return res.sendStatus(401)
//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if (err) return res.sendStatus(403)
//         req.user =user
//         next( )
//     })
//  }
 
//REFRESH ACCESS TOKEN IMPLIMENTATION CODE BELOW

let refreshTokens =[]
app.post('/token',(req,res)=>{
const refreshToken = req.body.token
if(refreshToken ==null) return res.sendStatus(401)
if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403)
    const accessToken =genrateAccessToken({name:user.name})
    res.json({accessToken:accessToken})

})
  
})
app.delete('/logout',(req,res)=>{
    refreshTokens=refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})
app.post('/login',(req,res)=>{
    const username = req.body.username 
    const user = {name:username}
     //this line create our accessTokens when login
    const accessTokens= genrateAccessToken(user)
    
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    res.json({accessTokens:  accessTokens, refreshToken:refreshToken})
     
   }) 
//this line will genrate access token
function genrateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30s'})
}
app.listen(port)
console.log("App ls listerning to port "+ port)
 