var state=false;
var coursepage=new Array();
coursepage[0]="http://electsys.sjtu.edu.cn/edu/student/elect/speltyRequiredCourse.aspx";
coursepage[1]="http://electsys.sjtu.edu.cn/edu/student/elect/speltyLimitedCourse.aspx";
coursepage[2]="http://electsys.sjtu.edu.cn/edu/student/elect/speltyCommonCourse.aspx";
coursepage[3]="http://electsys.sjtu.edu.cn/edu/student/elect/outSpeltyEP.aspx";
var moduleID=new Array();
moduleID[1]="gridModule";
moduleID[2]="gridGModule";
var scoreID=new Array();
scoreID[0]="SpeltyRequiredCourse1_ScoreInfo1_lblCurrentS";
scoreID[1]="ScoreInfo1_lblCurrentS";
scoreID[2]="ScoreInfo1_lblCurrentS";
scoreID[3]="OutSpeltyEP1_ScoreInfo1_lblCurrentS";
var mainID=new Array();
mainID[0]="SpeltyRequiredCourse1_gridMain";
mainID[1]="gridMain";
mainID[2]="gridMain";
mainID[3]="OutSpeltyEP1_gridMain"
var arrangeID=new Array();
arrangeID[0]="SpeltyRequiredCourse1_lessonArrange";
arrangeID[1]="lessonArrange";
arrangeID[2]="lessonArrange";
arrangeID[3]="OutSpeltyEP1_lessonArrange";
var submitID=new Array();
submitID[0]="SpeltyRequiredCourse1_Button1";
submitID[1]="btnSubmit";
submitID[2]="btnSubmit";
submitID[3]="OutSpeltyEP1_btnSubmit";

chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
    if(message=="get"){
        sendResponse(state?"on":"off");
    }
    else if(message=="stop"){
        state=false;
        sendResponse("stop");
    }
    else if(message=="start"){
        state=true;
        sendResponse("start");
        var storage=null;
        chrome.extension.sendMessage("getStorage", function(response) {
            storage=response;
            wholeprocess();
        });
        
        function wholeprocess(){
            var turnnum=storage.turnnum;
            var coursetype=parseInt(storage.coursetype)
            var typeintype=storage.typeintype;
            var warningpage="http://electsys.sjtu.edu.cn/edu/student/elect/electwarning.aspx?xklc="
            if (turnnum=="抢选"){
                warningpage+="2"
            }
            else if(turnnum=="第三轮"){
                warningpage+="3"
            }
            var originScore=null;
            var schoolID=storage.schoolID;
            var inyear=storage.inyear;
            var courseID=storage.courseID;
            var kehao=storage.kehao;
            var delayTime=parseInt(storage.delayTime)||1800;
            var left=top.document.getElementsByTagName("frame")[1];
            //left.contentDocument.getElementById("KB1Parent").children[0].click();
            var tmp=left.contentDocument.getElementById("KB1Child").getElementsByTagName("a");
            for(var i=0;i<tmp.length;++i)
            {
                if(tmp[i].innerText==turnnum)
                {
                    tmp[i].click();
                    break;
                }
            }
            var right=top.document.getElementsByTagName("frame")[2];
            right.onload=function(){
                //console.log("nice!");
                var course1="http://electsys.sjtu.edu.cn/edu/student/elect/speltyLimitedCourse.aspx?yxdm=&nj=2015&xklc=3";
                if(top.frames[2].location.href==warningpage){
                    right.onload=step0;
                    right.contentDocument.getElementById("CheckBox1").checked=true;
                    right.contentDocument.getElementById("btnContinue").click();
                }
                else step0();

                function step0()
                {
                    if (originScore==null)
                    {
                        originScore=right.contentDocument.getElementById(scoreID[0]).innerText;
                        console.log("已选学分："+originScore);
                    }
                    if(!state)
                    {
                        right.onload=null;
                        return;
                    }
                    right.onload=step1;
                    top.frames[2].location.href=course1;
                }
                function step1()
                {
                    if(!state)
                    {
                        right.onload=null;
                        return;
                    }
                    right.onload=step1_5;
                    var basesel=null;
                    if (coursetype==0)
                    {
                        right.onload=null;
                        step1_5();
                        return;
                    }
                    else if (coursetype==1||coursetype==2){
                        var tb=right.contentDocument.getElementById(moduleID[coursetype]);
                        if(!tb)
                        {
                            right.onload=null;
                            setTimeout(step0,delayTime);
                            return;
                        }
                        var trs=tb.getElementsByTagName("tr");
                        for(var i=0;i<trs.length;++i)
                        {
                            if(trs[i].className=="tdtit"||trs[i].getElementsByTagName("td")[1].innerText!=typeintype) continue;
                            basesel=trs[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0];
                        }
                    }
                    else if(coursetype==3){
                        var schoolname=right.contentDocument.getElementById("OutSpeltyEP1_dpYx");
                        if(!schoolname)
                        {
                            right.onload=null;
                            setTimeout(step0,delayTime);
                            return;
                        }
                        schoolname.value=schoolID;
                        var yearnum=right.contentDocument.getElementById("OutSpeltyEP1_dpNj");
                        if(!yearnum)
                        {
                            right.onload=null;
                            setTimeout(step0,delayTime);
                            return;
                        }
                        yearnum.value=inyear;
                        basesel=right.contentDocument.getElementById("OutSpeltyEP1_btnQuery");
                    }
                    if(!basesel)
                    {
                        right.onload=null;
                        setTimeout(step0,delayTime);
                        return;
                    }
                    basesel.click();
                }
                function step1_5()
                {
                    if(!state)
                    {
                        right.onload=null;
                        return;
                    }
                    var tb=right.contentDocument.getElementById(mainID[coursetype]);
                    if(!tb)
                    {
                        right.onload=null;
                        setTimeout(step0,delayTime);
                        return;
                    }
                    var rdbtns=tb.getElementsByTagName("input");
                    for(var i=0;i<rdbtns.length;++i)
                    {
                        if(rdbtns[i].value==courseID)
                        {
                            right.onload=step2;
                            rdbtns[i].click();
                            var arrge=right.contentDocument.getElementById(arrangeID[coursetype]);
                            setTimeout(function(){arrge.click();},delayTime);
                            break;
                        }
                    }
                }

                function step2()
                {
                    if(!state)
                    {
                        right.onload=null;
                        return;
                    }
                    var tb=right.contentDocument.getElementById("LessonTime1_gridMain");
                    if(!tb)
                    {
                        right.onload=null;
                        setTimeout(step0,delayTime);
                        return;
                    }
                    var trs=tb.getElementsByTagName("tr");
                    for(var i=0;i<trs.length;++i)
                    {
                        if(trs[i].className=="tdtit"||trs[i].getElementsByTagName("td")[3].innerText!=kehao) continue;
                        var tds=trs[i].getElementsByTagName("td");
                        //console.log(tds[11].innerText);
                        if(tds[11].innerText=="人数满")
                        {
                            right.onload=step1;
                            top.frames[2].location.href=course1;
                        }
                        else
                        {
                            right.onload=stepFinal;
                            tds[0].getElementsByTagName("input")[0].click();
                            setTimeout(function(){right.contentDocument.getElementById("LessonTime1_btnChoose").click();},delayTime);
                        }
                        return;
                    }
                    right.onload=step1;
                    top.frames[2].location.href=course1;
                    console.log("未发现课程。")
                }

                function stepFinal()
                {
                    right.onload=checksuccess;
                    right.contentDocument.getElementById(submitID[coursetype]).click();
                }

                function checksuccess()
                {
                    if (right.contentDocument.getElementById(scoreID[0]).innerText!=originScore)
                    {
                        alert("成功了！");
                        right.onload=null;
                        status=false;
                    }
                    else
                    {
                        right.onload=null;
                        step0();
                    }
                }
            };
        }
    }
}); 
