var express=require('express');
var app=express();
var bp=require('body-parser');
var fs=require('fs');
var events=require("events");
var ee=new events.EventEmitter();
app.use(express.static(__dirname))
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/train",{useUnifiedTopology:true,useNewUrlParser: true});
var data=new mongoose.Schema({
    regno:String,name:String,age:String,gender:String,date:Date,email:String,phone:String,password:String
})
var user=mongoose.model("user",data);
var data1=new mongoose.Schema({
    logid:String,ticket:String,source:String,destination:String,journey:Date,passenger:String,price:Number,phone:String,status:String
})
var ticket=mongoose.model("ticket",data1);
var data2=new mongoose.Schema({
    log:String,tno:String,station:String,ticket:String,price:Number,status:String
})
var plat=mongoose.model("plat",data2);
var session=require('express-session');
var cp=require('cookie-parser');
app.use(cp());
app.use(session({
    secret:"Don't see my privacy",
    cookie:{maxAge:100000},
    resave:true,
    saveUninitialized:true
}));
app.get("/",function (req, res) {  
    res.redirect("/log");
});
app.get("/log",function (req, res) {
    res.sendFile(__dirname+"/login.html");
});
app.get("/reg",function (req, res) {
    res.sendFile(__dirname+"/register.html");
});
app.get("/login",function (req, res) {
    res.sendFile(__dirname+"/login.html");
});
app.get("/home",function (req, res) {
    res.sendFile(__dirname+"/home.html");
});
app.get("/ticket",function (req, res) {
    res.sendFile(__dirname+"/train.html");
});
app.get("/cticket",function (req, res) {
    res.sendFile(__dirname+"/ctrain.html");
});
app.get("/cplat",function (req, res) {
    res.sendFile(__dirname+"/cplat.html");
});
app.get("/history",function(req,res){
    res.sendFile(__dirname+"/history.html");
})
app.get("/logout",function(req,res){
    res.sendFile(__dirname+"/logout.html");
    res.redirect("/clear");
})
app.get("/clear",async(req,res)=>{
    fs.writeFile("n.txt",'0',function(err,data){
        if(err) throw err;
    })
    fs.writeFile("x.txt",'',function(err,data){
        if(err) throw err;
    })
    console.log("Logged out successfully");
    res.redirect("/log");
})
app.post("/register",async(req,res)=>{
    var s=Math.round(Math.random()*100000);
    var mydata=new user({
        regno:s,
        name:(req.body.rname).toUpperCase(),
        age:req.body.rage,
        gender:req.body.rgender,
        date:new Date(),
        email:req.body.rmail,
        phone:req.body.phoneno,
        password:req.body.rpass
    });
    var d=await user.updateOne({phone:req.body.phoneno,email:req.body.rmail},{$set:{phone:req.body.phoneno}});
    if(d.matchedCount==0){
        mydata.save()
        .then(item=>{console.log( mydata.name+" New user data is inserted in database "+mydata.regno);
        const r=JSON.stringify(mydata);
        fs.writeFile("x.txt",r,function(err,data){
            if(err) throw err;
        })
        fs.writeFile("n.txt","1",function(err,data){
            if(err) throw err;
        })
        res.redirect("/home")
        })
    }
    else    
        res.redirect("/reg");
})
app.post("/login",async(req,res)=>{
    var p=req.body.lphone;
    var pw=req.body.lpw;
    const z=await user.findOne({phone:p,password:pw});
    if(z){
        console.log(z.name+" Logged in successfully "+z.regno);
        const r=JSON.stringify(z);
        fs.writeFile("x.txt",r,function(err,data){
            if(err) throw err;
        })
        fs.writeFile("n.txt","1",function(err,data){
            if(err) throw err;
        })
        res.redirect("/home");
    }
    else{
        req.session.page_views=0;
        res.redirect("/log");
    }
})
fs.readFile("x.txt",function x(err,data){
    return data;
})
app.post("/booktrain",async(req,res)=>{ 
    var s="TT-"+Math.round(Math.random()*100000);
    var a;
    fs.readFile("x.txt",function x(err,data){
        var i=JSON.parse(data);
        a=i.regno;
        var mydata1=new ticket({
        logid:a,
        ticket:s,
        source:(req.body.sstation).toUpperCase(),
        destination:(req.body.dstation).toUpperCase(),
        journey:req.body.date,
        passenger:req.body.nop,
        price:parseInt(req.body.nop)*60,
        phone:req.body.tphoneno, 
        status:"Booked"
        });
        mydata1.save()
        .then(item=>{console.log("Train Ticket booking data is inserted in database "+mydata1);});
        res.redirect("/ptdata");
    })
})
app.all("/ptdata",async(req,res)=>{
    const i=await ticket.find({});
    const r=JSON.stringify(i);
    fs.writeFile("y.txt",r,function(err,data){
        if(err) throw err;
    });
    const ii=await plat.find({});
    const rr=JSON.stringify(ii);
    fs.writeFile("z.txt",rr,function(err,data){
        if(err) throw err;
    }) 
    res.redirect("/history");
})

app.post("/platform",async(req,res)=>{
    var s="PT-"+Math.round(Math.random()*100000);
    var a;
    fs.readFile("x.txt",function x(err,data){
        var i=JSON.parse(data);
        a=i.regno;
        var mydata2=new plat({
        log:a,
        tno:s,
        station:req.body.pn.toUpperCase(),
        ticket:req.body.noop,
        price:parseInt(req.body.noop)*10,
        status:"Booked"
    });
    mydata2.save()
    .then(item=>{console.log("Platform ticket booking Data is inserted in database "+mydata2);
    });})
    res.redirect("/ptdata");
})

app.post("/cticket",async(req,res)=>{
    var p=req.body.pnr;
    var d=await ticket.updateOne({ticket:p,status:"Booked"},{$set:{status:"Cancelled"}});
    if(d.matchedCount==1){
        console.log("Train ticket is cancelled successfully "+p);
        var i=await ticket.find({});
        const r=JSON.stringify(i);
        fs.writeFile("y.txt",r,function(err,data){
            if(err) throw err;
        })
        res.redirect("/history");
    }
    else
        res.redirect("/cticket");
    
})
app.post("/cplatform",async(req,res)=>{
    var t=req.body.cpn;
    var d=await plat.updateOne({tno:t,status:"Booked"},{$set:{status:"Cancelled"}});
    if(d.matchedCount==1){
        console.log("Platform ticket is cancelled successfully  "+t);
        var i=await plat.find({})
        var r=JSON.stringify(i);
        fs.writeFile("z.txt",r,function(err,data){
            if(err) throw err;
        ;})
        res.redirect("/history");
    }
    else
        res.redirect("/cplat");
        
})

app.listen(3000,()=>console.log("Server is running on port no 3000 "+__dirname));