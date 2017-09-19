var ddiv1=document.getElementById("dynamicdiv1");
var ddiv2=document.getElementById("dynamicdiv2");
var rdbtns=document.getElementsByName("coursetype");
for(var i=0;i<rdbtns.length;++i){
    if (rdbtns[i].value=="0"){
        rdbtns[i].onclick=function(){
            ddiv1.hidden="hidden";
            ddiv2.hidden="hidden";
        }
    }
    else if (rdbtns[i].value=="1"||rdbtns[i].value=="2"){
        rdbtns[i].onclick=function(){
            ddiv1.hidden="";
            ddiv2.hidden="hidden";
        }
    }
    else
    {
        rdbtns[i].onclick=function(){
            ddiv1.hidden="hidden";
            ddiv2.hidden="";
        }
    }
}
var turnnum=localStorage.turnnum||"";
var coursetype=localStorage.coursetype||"";
var typeintype=localStorage.typeintype||"";
var schoolID=localStorage.schoolID||"";
var inyear=localStorage.inyear||"";
var courseID=localStorage.courseID||"";
var kehao=localStorage.kehao||"";
var delayTime=localStorage.delayTime||"1800";
if (turnnum!="")
{
    var tmpele=document.getElementsByName("turnnum");
    for (var i=0;i<tmpele.length;++i){
        if (turnnum==tmpele[i].value){
            tmpele[i].click();
            break;
        }
    }
}
if (coursetype!="")
{
    var tmpele=document.getElementsByName("coursetype");
    for (var i=0;i<tmpele.length;++i){
        if (coursetype==tmpele[i].value){
            tmpele[i].click();
            break;
        }
    }
}
if (typeintype!="")
{
    var tmpele=document.getElementById("typeintype");
    tmpele.value=typeintype;
}
if (schoolID!="")
{
    var tmpele=document.getElementById("schoolID");
    tmpele.value=schoolID;
}
if (inyear!="")
{
    var tmpele=document.getElementById("inyear");
    tmpele.value=inyear;
}
if (courseID!="")
{
    var tmpele=document.getElementById("courseID");
    tmpele.value=courseID;
}
if (kehao!="")
{
    var tmpele=document.getElementById("kehao");
    tmpele.value=kehao;
}
if (delayTime!="")
{
    var tmpele=document.getElementById("delayTime");
    tmpele.value=delayTime;
}
document.getElementById("savebtn").onclick=function(){
    var tmpele=document.getElementsByName("turnnum");
    for (var i=0;i<tmpele.length;++i){
        if(tmpele[i].checked==true){
            localStorage.turnnum=tmpele[i].value;
            break;
        }
    }
    tmpele=document.getElementsByName("coursetype");
    for (var i=0;i<tmpele.length;++i){
        if(tmpele[i].checked==true){
            localStorage.coursetype=tmpele[i].value;
            break;
        }
    }
    tmpele=document.getElementById("typeintype");
    localStorage.typeintype=tmpele.value;
    tmpele=document.getElementById("schoolID");
    localStorage.schoolID=tmpele.value;
    tmpele=document.getElementById("inyear");
    localStorage.inyear=tmpele.value;
    tmpele=document.getElementById("courseID");
    localStorage.courseID=tmpele.value;
    tmpele=document.getElementById("kehao");
    localStorage.kehao=tmpele.value;
    tmpele=document.getElementById("delayTime");
    localStorage.delayTime=tmpele.value;
    alert("保存成功！请重新开始插件以应用新设置。");
}