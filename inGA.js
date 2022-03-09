function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getgaCid() {
    var name = "_ga=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length+6, c.length);
            }
    }
    return "";
}


function removeScript(){
    var ss=document.getElementsByTagName('script');
    for(i=0;i<ss.length;i++){
        if(ss[i].innerHTML.indexOf("function getgaCid()")!==-1){
            ss[i].parentNode.removeChild(ss[i]);
            //console.log("Remove script done ver4");
            break;
        }
    }
}

function searchAndSet(cframe, stackNum) {
    uid=-1
    for(i=0;i<dataLayer.length;i++){
        try{
            if('ga_c_id' in dataLayer[i]){
                uid=dataLayer[i]['ga_c_id'];
                break;
            }
        }catch(e){
            console.log("pass");
        }
    }

    elementUrl=""
    elementClasses=""
    elementId=""
    elementText=""
    tmp_text=""
    dataanalyticsID="null"
    site_domain=window.location.hostname

    for(i=dataLayer.length-1-stackNum;i>=0;i--){
        if(dataLayer[i]['event']=="gtm.click" || dataLayer[i]['event']=="gtm.linkClick"){
            //handling eURL
            try{
                if('gtm.elementUrl' in dataLayer[i]){
                    elementUrl=dataLayer[i]['gtm.elementUrl'];
                    if(elementUrl==""){
                        elementUrl="/"
                    }
                    else{
                        fullsite_domain='https://'+site_domain
                        var re=RegExp(fullsite_domain,'g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('https://download.ocms365.com','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('\\?pid.*','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('\\?_ga.*','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('\\?version.*','g');
                        elementUrl=elementUrl.replace(re,"");
                        var re=RegExp('javascript\\:','g');
                        elementUrl=elementUrl.replace(re,"/");
                    }
                }
            }catch(e){
                console.log("err"+e);
            }

            //handling eClass
            try{
                if('gtm.elementClasses' in dataLayer[i]){
                    elementClasses=dataLayer[i]['gtm.elementClasses'];
                }
            }catch(e){
                console.log("err"+e);
            }

            //handling eID
            try{
                if('gtm.elementId' in dataLayer[i]){
                    elementId=dataLayer[i]['gtm.elementId'];
                }
            }catch(e){
                console.log("err"+e);
            }

            //handling of eTxt
            try{
                if('gtm.element' in dataLayer[i]){
                    if('innerText' in dataLayer[i]['gtm.element']){
                        tmp_text=dataLayer[i]['gtm.element']["innerText"].replaceAll('\n',' ');
                        var re=RegExp('\\d\\d\\d\\d/\\d\\d\\/\\d\\d','g');
                        tmp_text=tmp_text.replace(re,"-DATE-");
                        var re=RegExp('\\d\\d:\\d\\d:\\d\\d','g');
                        tmp_text=tmp_text.replace(re,"-TIME-");
                        var re=RegExp('\\w+\\*\\*\\*','g');
                        tmp_text=tmp_text.replace(re,"-ACCOUNT-");
                        var re=RegExp('ได้รับ\\dแชมป์ต่อไป','g');
                        tmp_text=tmp_text.replace(re,"ได้รับ-RAND-แชมป์ต่อไป");
                        var re=RegExp('\\d+สัปดาห์','g');
                        tmp_text=tmp_text.replace(re,"-RAND-สัปดาห์");
                        var re=RegExp('(฿|฿ )\\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"฿-RAND-");
                        var re=RegExp('กระเป๋าสตางค์ \\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"กระเป๋าสตางค์-RAND-");
                        if(elementClasses.includes("winner")||elementClasses.includes("rank")){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="price"){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="game-info" || elementClasses=="tabstab"){
                            var re=RegExp('\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        elementText=tmp_text;
                    }else if('textContent' in dataLayer[i]['gtm.element']){
                        tmp_text=dataLayer[i]['gtm.element']["textContent"].replaceAll('\n',' ');
                        var re=RegExp('\\d\\d\\d\\d/\\d\\d\\/\\d\\d','g');
                        tmp_text=tmp_text.replace(re,"-DATE-");
                        var re=RegExp('\\d\\d:\\d\\d:\\d\\d','g');
                        tmp_text=tmp_text.replace(re,"-TIME-");
                        var re=RegExp('\\w+\\*\\*\\*','g');
                        tmp_text=tmp_text.replace(re,"-ACCOUNT-");
                        var re=RegExp('ได้รับ\\dแชมป์ต่อไป','g');
                        tmp_text=tmp_text.replace(re,"ได้รับ-RAND-แชมป์ต่อไป");
                        var re=RegExp('\\d+สัปดาห์','g');
                        tmp_text=tmp_text.replace(re,"-RAND-สัปดาห์");
                        var re=RegExp('(฿|฿ )\\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"฿-RAND-");
                        var re=RegExp('กระเป๋าสตางค์ \\d+\\.\\d+','g');
                        tmp_text=tmp_text.replace(re,"กระเป๋าสตางค์-RAND-");
                        if(elementClasses.includes("winner")||elementClasses.includes("rank")){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="price"){
                            var re=RegExp('\\d+\\.\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        if(elementClasses=="game-info" || elementClasses=="tabstab"){
                            var re=RegExp('\\d+','g');
                            tmp_text=tmp_text.replace(re,"-RAND-");
                        }
                        elementText=tmp_text;
                    }
                }
            }catch(e){
                console.log("err"+e);
            }

            //handling dID
            try{
                if('gtm.element' in dataLayer[i]){
                    //try dataset.analytics
                    objToSearch = dataLayer[i]['gtm.element'];
                    searchPath = ["dataset", "analytics"];
                    for (k of searchPath) {
                        if (objToSearch == null){
                            break;
                        }
                        if (k in objToSearch){
                            if (k==searchPath[searchPath.length-1]) {
                                dataanalyticsID = objToSearch[k];
                            } else {
                                objToSearch = objToSearch[k];
                            }
                        } else {
                            break;
                        }
                    }

                    //try attributes.data-analytics.nodeValue
                    if (dataanalyticsID=="null") {
                        objToSearch = dataLayer[i]['gtm.element'];
                        searchPath = ["attributes", "data-analytics", "nodeValue"];
                        for (k of searchPath) {
                            if (objToSearch == null){
                                break;
                            }
                            if (k in objToSearch){
                                if (k==searchPath[searchPath.length-1]) {
                                    dataanalyticsID = objToSearch[k];
                                } else {
                                    objToSearch = objToSearch[k];
                                }
                            } else {
                                break;
                            }
                        }
                    }

                    //try offsetParent.innerHTML parsing
                    if (dataanalyticsID=="null") {
                        objToSearch = dataLayer[i]['gtm.element'];
                        searchPath = ["offsetParent", "innerHTML"];
                        for (k of searchPath) {
                            if (objToSearch == null){
                                break;
                            }
                            if (k in objToSearch){
                                if (k==searchPath[searchPath.length-1]) {
                                    htmlToParse = objToSearch[k];
                                    for ([kw, kl] of [["promotionInfoId-", 3], ["gameId-", 4]]) {
                                        startIdx = htmlToParse.indexOf(kw)
                                        if (startIdx!=-1) {
                                            dataanalyticsID = htmlToParse.slice(startIdx, startIdx+kw.length+kl);
                                            break;
                                        }
                                    }
                                } else {
                                    objToSearch = objToSearch[k];
                                }
                            } else {
                                break;
                            }
                        }
                    }


                }
            }catch(e){
                console.log("err"+e);
            }
            break;


        }
    }

    if(elementUrl=="/" && elementClasses=="" && elementId=="" && dataanalyticsID=="null"){
        if(elementText!="" && !isNaN(Number(elementText))){
            var re=RegExp('\\d+\\.\\d+','g');
            elementText=elementText.replace(re,"-RAND-");
        }
    }
    if(elementClasses.includes("vdatetime")){
        elementText="";
    }
    if(elementClasses.includes("phoneNumber")){
        elementText="";
    }


    if (site_domain.indexOf("thbet99.com")!=-1){
        cframe.src ="https://guqima.github.io/GAUserIDStealer/tb9_ad.html?uid=="+uid+"&&domain=="+site_domain+"&&cid=="+getgaCid()+"&&url=="+window.location.href+"&&dataanalyticsID="+dataanalyticsID+"&&element_url=="+elementUrl+"&&elementClasses="+elementClasses+"&&elementId="+elementId+"&&elementText="+elementText;
    }
    else if (site_domain.indexOf("bonus99.com")!=-1){
        cframe.src ="https://guqima.github.io/GAUserIDStealer/tb9_ad.html?uid=="+uid+"&&domain=="+site_domain+"&&cid=="+getgaCid()+"&&url=="+window.location.href+"&&dataanalyticsID="+dataanalyticsID+"&&element_url=="+elementUrl+"&&elementClasses="+elementClasses+"&&elementId="+elementId+"&&elementText="+elementText;
    }
    else {
        cframe.src ="https://guqima.github.io/GAUserIDStealer/steal.html?uid=="+uid+"&&domain=="+site_domain+"&&cid=="+getgaCid()+"&&url=="+window.location.href+"&&dataanalyticsID="+dataanalyticsID+"&&element_url=="+elementUrl+"&&elementClasses="+elementClasses+"&&elementId="+elementId+"&&elementText="+elementText;
    }
}

var maxStackNum = 3;
function frameHdl(stackNum, guhappyId) {
    var cframe = document.getElementById(guhappyId);
    if (stackNum == maxStackNum){
        cframe.parentNode.removeChild(cframe);
    } else {
        if (stackNum == 0){
            cframe.addEventListener("load",function(){
                setTimeout(function(){
                    frameHdl(stackNum+1, guhappyId);
                }, 5000);
            });
            searchAndSet(cframe, stackNum);
        } else {
            var old_element = document.getElementById(guhappyId);
            cframe = old_element.cloneNode(true);
            cframe.addEventListener("load",function(){
                setTimeout(function(){
                    frameHdl(stackNum+1, guhappyId);
                }, 5000);
            });
            searchAndSet(cframe, stackNum);
            old_element.parentNode.replaceChild(cframe, old_element);
        }
    }
}

function doFlow(){
    var guhappyId=makeid(5);
    var ifrm_c = document.createElement('iframe');
    ifrm_c.setAttribute('id', guhappyId);
    ifrm_c.setAttribute('class', 'guhappy_steal');
    ifrm_c.style.display = "none";
    document.body.appendChild(ifrm_c);
    frameHdl(0, guhappyId);
}
