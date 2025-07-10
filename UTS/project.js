setInterval(function(){time()},1000);
function time(){
    var d=new Date();
    var t=document.getElementById("time");
    var date=d.getDate();
    var month=d.getMonth()+1;
    var year=d.getFullYear();
    t.innerHTML=zero(date)+"/"+zero(month)+"/"+year+" 📅<br>"+zero(d.getHours())+" : "+zero(d.getMinutes())+" : "+zero(d.getSeconds())+"  ⏳";
}
function zero(a){
    if(a<10)
        return "0"+a;
    else
        return a;
}

function logout(){
    $(".hide").html("Click this button to logout <br><form action='/logout'><button>Log out</button></form>");
}
function registerd(n,r,a,g,e,p,pw){
    $(".hide").html("<hr><h3><table width=450  cellpadding=2 cellspacing=2><tr><th>Name</th><td>"+n+"</td></tr><tr><th>Login id</th><td>"+r+"</td></tr><tr><th>Age</th><td>"+a+"</td></tr><tr><th>Gender</th><td>"+g+"</td></tr><tr><th>Email</th><td>"+e+"</td></tr><tr><th>Phone no</th><td>"+p+"</td></tr></table></h3><hr>");
}
function traind(a){
    var xml=new XMLHttpRequest();
    xml.open("GET","x.txt",true);
    xml.send();
    var z,x=0;
    xml.onreadystatechange=function(){
        $("#train").html("");
        if(xml.readyState==4 && xml.status==200){
            var b=xml.responseText;
            z=JSON.parse(b);
        if(a.length){
            for(var i=0;i<a.length;i++){
                if(a[i].logid==z.regno) {
                    $("#train").append("<hr><table width=400  cellpadding=5 cellspacing=5><tr><th>Ticket Id</th><td>"+a[i].ticket+"</td></tr><tr><th>From</th><td>"+a[i].source+"</td></tr><tr><th>To</th><td>"+a[i].destination+"</td></tr><tr><th>Journey Date</th><td>"+(a[i].journey).substr(0,10)+"</td></tr><tr><th>No of Passengers</th><td>"+a[i].passenger+"</td></tr><tr><th>Amount</th><td>"+a[i].price+"</td></tr><tr><th>Status</th><td class=can>"+a[i].status+"</td></tr></table><hr>");
                    x=1;
                }
            }
        }
        else if(a.logid==z.regno){
            $("#train").append("<hr><table width=400  cellpadding=5 cellspacing=5><tr><th>Ticket Id</th><td>"+a.ticket+"</td></tr><tr><th>From</th><td>"+a.source+"</td></tr><tr><th>To</th><td>"+a.destination+"</td></tr><tr><th>Journey Date</th><td>"+a.journey.substr(0,10)+"</td></tr><tr><th>No of Passengers</th><td>"+a.passenger+"</td></tr><tr><th>Amount</th><td>"+a.price+"</td></tr><tr><th>Status</th><td class=can>"+a.status+"</td></tr></table><hr>");
            x=1;
        } 
        if(x==0)
            $("#train").html("No train ticket found");
        }
    }
}
function platd(a){
    var xml=new XMLHttpRequest();
    xml.open("GET","x.txt",true);
    xml.send();
    var z,x=0;
    xml.onreadystatechange=function(){
        $("#platform").html("");
        if(xml.readyState==4 && xml.status==200){
            var b=xml.responseText;
            z=JSON.parse(b);
        if(a.length){
            for(var i=0;i<a.length;i++){
                if(a[i].log==z.regno){
                    $("#platform").append("<hr><table width=400 cellpadding=5 cellspacing=5><tr><th>Ticket no</th><td>"+a[i].tno+"</td></tr><tr><th>Station name</th><td>"+a[i].station+"</td></tr><tr><th>No of Passenger</th><td>"+a[i].ticket+"</td></tr><tr><th>Amount</th><td>"+a[i].price+"</td></tr><tr><th >Status</th><td class=status>"+a[i].status+"</td></tr></table><hr>");
                    x=1;
                } 
            }
        }
        else if(a.log==z.regno){
            $("#platform").append("<hr><table width=400 cellpadding=5 cellspacing=5><tr><th>Ticket no</th><td>"+a.tno+"</td></tr><tr><th>Station name</th><td>"+a.station+"</td></tr><tr><th>No of Passenger</th><td>"+a.ticket+"</td></tr><tr><th>Amount</th><td>"+a.price+"</td></tr><tr><th >Status</th><td class=status>"+a.status+"</td></tr></table><hr>");
            x=1;
        }
        if(x==0)    
            $("#platform").html("No platform ticket found");
        }
    }
}
function rcheck(){
    var xy=0;
    var n=document.getElementById("rname").value;
    var a=document.getElementById("rage").value;
    var g=document.getElementById("rgender").value;
    var e=document.getElementById("rmail").value;
    var p=document.getElementById("rphone").value;
    var pw=document.getElementById("rpass").value;
    var z=document.getElementById("reg");
    if(validname(n)&&validphone(p)&&validpass(pw)){}
    else
        z.innerHTML="<h3>Given data is wrong<br>Please Register again</h3><br><a href='register.html'>Register</a>";
}
function tcheck(){
    var ss=document.getElementById("sstation").value;
    var ds=document.getElementById("dstation").value;
    var n=parseInt(document.getElementById("tnop").value);
    var d=document.getElementById("date").value;
    var p=document.getElementById("phoneno").value;
    if(validname(ss)&&validname(ds)&&validdate(d)&& validphone(p)&&n>=1){
        var da=confirm("Pay the amount "+n*60+" rupees");
        if(da){
            var a=parseInt(prompt("Pay the amount : "+n*60+" rupees"));
            if(a==n*60)
                alert("Ticket booked successfully");
            else
            document.getElementById("tt").innerHTML="<p >Insufficient amount<br>Payment is failed</p>";
        }
        else
            document.getElementById("tt").innerHTML="<p>Payment is failed</p>";
    }
    else    
        document.getElementById("tt").innerHTML="Given data is wrong<br> Please give data correctly";
}
function pcheck(){
    var sn=document.getElementById("pn").value;
    var np=document.getElementById("np").value;
    if(validname(sn)){
        var d=confirm("Pay the amount "+np*10+" rupees");
        if(d){
            var a=parseInt(prompt("Pay the amount "+np*10+" rupees"));
            if(a==np*10)
            alert("Ticket booked successfully");
            else
            document.getElementById("pt").innerHTML="<p >Insufficient amount<br>Payment is failed</p>";
        }
        else
            document.getElementById("pt").innerHTML="<p>Payment is failed</p>";
    }
    else
        document.getElementById("pt").innerHTML="Given data is wrong <br>Please give data correctly";
}

$("#cttsubmit").click(function(){
    var pnr=document.getElementById("pnr").value;
    if(pnr.match(/^[Tt\-]{3}\d{4,5}$/)){
        alert("Check it in booking history");
    }
    else
        document.getElementById("ctt").innerHTML="Given data is wrong <br>Please give data correctly";
})
function ptcheck(){
    var tn=document.getElementById("cpn").value;
    if(tn.match(/^[pPTt\-]{3}\d{4,5}$/)){
        alert("Check it in booking history");
    }
    else    
        document.getElementById("cpt").innerHTML="Given data is wrong<br> Please give data correctly";
}
function book(){
    var xml=new XMLHttpRequest();
        xml.open("GET","y.txt",true);
        xml.send();
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && xml.status==200){
                var a=xml.responseText;
                var z=JSON.parse(a);
                traind(z);
        }
    }
}
function platf(){
    var xml=new XMLHttpRequest();
    xml.open("GET","z.txt",true);
    xml.send();
    xml.onreadystatechange=function(){
        if(xml.readyState==4 && xml.status==200){
            var a=xml.responseText;
            var z=JSON.parse(a);
            platd(z);
        }
    }
}
function cprofile(){
    var xml=new XMLHttpRequest();
        xml.open("GET","x.txt",true);
        xml.send();
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && xml.status==200){
                var y=xml.responseText;
                var x=JSON.parse(y);
                registerd(x.name,x.regno,x.age,x.gender,x.email,x.phone);
        }
    }  
}
function validname(n){
    var x=/^([a-zA-Z]\s?)+$/;
    if(n.match(x))
        return true;
    else    
        return false;
}
function validphone(n){
    var x=/^\d{10}$/;
    if(n.match(x))
        return true;
    else        
        return false;
}
function validpass(n){
    if(n.length>=6 && n.length<=13)
        return true;
    else    
        return false;
}
function validdate(d){
    var y=new Date();
    var x=new Date(d);
    if(y.getDate()<=x.getDate()||y.getTime()<=x.getTime())
        return true; 
    else
        return false;
}


var app=angular.module("train",[]);
app.controller("ctrl",function($scope){});

var app=angular.module("myplat",[]);
app.controller("myctrl",function($scope){});

var app=angular.module("myreg",[]);
app.controller("myctrl",function($scope){});