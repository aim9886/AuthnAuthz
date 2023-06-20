const express=require("express")
const mongoose=require("mongoose")
const authRouter=require("./routes/authRoute")
const cookieParser=require("cookie-parser")
const {checkUser}=require("./middlewares/requireAuth")
let app=express()


//registering templating engine
app.set("view engine", "ejs")

//inbuilt middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(express.json())

//middleware
app.use(cookieParser())

//db connection
async function db(){
    await mongoose.connect("mongodb://127.0.0.1:27017/AuthDb")
    console.log("db connected");
}
db()

app.use(checkUser)

app.use(authRouter)

// app.use((req,res)=>{
//     res.render("pnf")
// })

app.listen(5000,(err)=>{
    if(err)console.log(err);
    console.log("Server is running on port 5000");
})


//Cookies
app.get("/set-cookie",(req,res)=>{
    res.cookie("username", "ironman",{httpOnly:true,secure:true})
    res.send("cookie set")
})

app.get("/get-cookie",(req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies)
    // let data=req.cookies
    // res.json(data)
})

// Delete Cookie
// app.get("/delete",(req,res)=>{
//     res.clearCookie("username")
//     res.send("cookies cleared")
// })



