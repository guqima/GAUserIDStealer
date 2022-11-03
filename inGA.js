function searchAndSet(stackNum) {
    return new Promise((resolve, reject) => {

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

        pagePath="dataanalyticsID="+dataanalyticsID+"&&element_url=="+elementUrl+"&&elementClasses="+elementClasses+"&&elementId="+elementId+"&&elementText="+elementText;
        //console.log(pagePath);
        gtag('event','click_item', {
            "dimension5":site_domain,
            "dimension9":pagePath
        });
        resolve();
    });
}

function doFlow(){
    searchAndSet(0).then(result=> {
        toRemove = document.getElementById("aidsGTM");
        while(toRemove!=undefined) {
            toRemove.remove();
            toRemove = document.getElementById("aidsGTM");
        }
    });
}
