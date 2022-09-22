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

function msgHub(page, msg) {
    var hubId = page.replace(".", "")
    var hub = document.getElementById(hubId);
    if (hub==null) {
        var ifrm_msgHub = document.createElement('iframe');
        ifrm_msgHub.setAttribute('id', hubId);
        ifrm_msgHub.setAttribute('class', 'g_conv');
        ifrm_msgHub.setAttribute('src', 'https://'+page)
        ifrm_msgHub.setAttribute('domain', 'https://'+page);
        ifrm_msgHub.style.display = "none";
        ifrm_msgHub.addEventListener("DOMContentLoaded",function(){
            hub = document.getElementById(hubId);
            hub.contentWindow.postMessage(msg, 'https://'+page);
        });
        document.body.appendChild(ifrm_msgHub);

    } else {
        hub.contentWindow.postMessage(msg, 'https://'+page);
    }
}

function searchAndSet(stackNum) {
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

    msgHub("guqima.github.io/GAUserIDStealer/steal.html", "uid=="+uid+"&&domain=="+site_domain+"&&cid=="+getgaCid()+"&&url=="+window.location.href+"&&dataanalyticsID="+dataanalyticsID+"&&element_url=="+elementUrl+"&&elementClasses="+elementClasses+"&&elementId="+elementId+"&&elementText="+elementText);
}

function doFlow(){
    searchAndSet(0);
}
