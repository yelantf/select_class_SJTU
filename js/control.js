var current;
chrome.tabs.query({
    url:"http://electsys.sjtu.edu.cn/edu/student/sdtMain.aspx"
},function(tabArr){
    //console.log(tabArr);
    current=tabArr[0].id;
    chrome.tabs.sendMessage(current,"get",function(response){
        if(response=="on")
        {
            document.getElementById("state").innerText="正在进行";
            document.getElementById("btn").innerText="停止";
            document.getElementById("btn").onclick=stopSel;
        }
        else if(response=="off")
        {
            document.getElementById("state").innerText="未进行";
            document.getElementById("btn").innerText="开始";
            document.getElementById("btn").onclick=startSel;
        }
    });

    function stopSel()
    {
        chrome.tabs.sendMessage(current,"stop",function(res1){
            if(res1=="stop")
            {
                document.getElementById("state").innerText="未进行";
                document.getElementById("btn").innerText="开始";
                document.getElementById("btn").onclick=startSel;
            }
        });
    }

    function startSel()
    {
        chrome.tabs.sendMessage(current,"start",function(res2){
            if(res2=="start")
            {
                document.getElementById("state").innerText="正在进行";
                document.getElementById("btn").innerText="停止";
                document.getElementById("btn").onclick=stopSel;
            }
        });
    }
});
