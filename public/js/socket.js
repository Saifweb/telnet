
if (skeleton==null){
    var skeleton={'request':'request','header':'header','endpoint':'endpoint','flow_id':'flow_id','resource':'resource','txn_type':'txn_type','enable_suspend_events':'enable_suspend_events','clerk_id':'clerk_id','amount':'amount','ref_num':'ref_num','print_receipt':'print_receipt','transaction_amount':'transaction_amount','decimal_shift':'decimal_shift','value':'value','currency':'currency','tip':'tip','invoice':'invoice'}
    localStorage.setItem('skeleton', JSON.stringify(skeleton));
}   
// Creation d'un object simple for type sale/force-sale/refund! 
var myFinalObj = new Object;
var myObject=new Object;
var request=skeleton.request;
//--HEADER OBJECT !
var TheHeaderObject=new Object;
var endpoint=skeleton.endpoint
var flow_id=skeleton.flow_id;
var header=skeleton.header;
//---Ressource Object!
var TheRessourceObject=new Object;
var resource=skeleton.resource
var txn_type=skeleton.txn_type;
var enable_suspend_events=skeleton.enable_suspend_events;
var clerk_id=skeleton.clerk_id
var amount=skeleton.amount
var ref_num=skeleton.ref_num
var print_receipt=skeleton.print_receipt
//--Amount Object ! 
var amountObject=new Object
var transaction_amount=skeleton.transaction_amount
//-----Object transaction_amount:
var Objecttransaction_amount=new Object
var value=skeleton.value
var decimal_shift=skeleton.decimal_shift;
var currency=skeleton.currency;
var invoice=skeleton.invoice;
// tip object:
var ObjectTip=new Object;
var tip=skeleton.tip;
var nomberRequest=0;
//date time
const d = new Date();
document.getElementById("date").innerHTML = d;
//taking variable form1 !
const msgForm1=document.querySelector('#message-form');
const open = document.getElementById("open");
const close = document.getElementById("close");
var table=document.getElementById('my-table');
var RecentTable=document.getElementById('my-recent-table');
var requestNumber=document.getElementById('request-number');
var seeResponse=document.querySelector('#see-response');
var refnum=document.querySelector('#refnum-input');
var historydata = [];
// we use this indice to know the number of request we did 
var typeInput=document.querySelector('#type-input');
var valueInput=document.querySelector('#value-input');
var decimal_shiftInput=document.querySelector('#decimal_shift-input');
var currencyInput=document.querySelector('#currency-input');
var changeForm=document.querySelector('#change-form');
var changeFormTip=document.querySelector('#change-form-tip')
var optionInput=document.querySelector('#option-input');
var IdInput=document.querySelector('#id-input');
var tipValue=document.querySelector('#tip-value');
var printReceiptInput=document.querySelector('#print-recipt-Input');
var enableSuspendEventsInput=document.querySelector("#enable-Suspend-Events-Input")
var indice=0;
var j=0;
var url='';
var socket;
var stringdata='';
var msgInput1=document.querySelector('#message-input');
var dropdownMenuButton=document.getElementById("dropdownMenuButton");
//request variables!
const buttonSendRequet = document.getElementById("btn-req-msg");
// button send request !
buttonSendRequet.disabled=true;
//variable form2
const msgForm2=document.querySelector('#mymsgForm');
var i=0;
//
const msgContainers=document.querySelector('#messages-container');
var option=document.querySelector('#option')

//make button close hide!
close.style.display ='none';
var test=true;  
historydata = JSON.parse(localStorage.getItem('history'));
if (historydata!=null){
    console.log(historydata);
    LoadHistoryTable();
    positionappenditem=historydata.length
}
else
{
    historydata=[];
    positionappenditem=0;
}
getdata = JSON.parse(localStorage.getItem('getdata'));
if (getdata==null){
    console.log("it work")
    getdata=[]
}
else{
    console.log("getdata",getdata)
}

var historyItems=historydata

 //-----------------------------------------------------history and update functions ! -----------------------------------------------------------
    //delete function !
    function deletehistory(j){
            //console.log("this is j ",j)
            historydata.splice(j,1)
            getdata.splice(j,1)
            localStorage.setItem('getdata', JSON.stringify(getdata));
            localStorage.setItem('history', JSON.stringify(historydata));
            LoadHistoryTable()
            //console.log("this is historydata",historydata)
            //console.log("history data new length ",historydata.length)
            //localStorage.setItem('history', JSON.stringify(historydata))
            //var row=document.getElementById(`row${j}`);
            //console.log("this row will be deleted ",row)
            //row.innerHTML=''; this it was making a big problem be carful next time ! you deleted the front and the back so it a got a problem  
        }
    //Load history table ! 
    function LoadHistoryTable(){
        table.innerHTML='';
        getdata = JSON.parse(localStorage.getItem('getdata'));
        requestNumber.innerHTML=historydata.length
        //requestNumber.innerHTML=indice+1;
        for (var i =0 ; i < historydata.length; i++) {
            console.log("this is number of reload table ",i)
            var row =`<tr class="HistoryRow"  id="row${i}">
                            <td><a   href="#accordion" class="user-link" type="button" onclick="getdatafromhistory(${i})" >${historydata[i].url}</a></td>
                            <td>${historydata[i].request}</td>
                            <td  >
                                <button class="btn btn-primary" onclick="deletehistory(${i})" ><i class="fa fa-trash"></i></button>
                           </td>
                     </tr>`
            //console.log(row);
            table.innerHTML+=row;
        }
    }
    // append in history table ! append is done !
    function appendToHistory(item){
        //console.log(historydata)
        //console.log("this is the old  length  before the append ! " ,historydata.length)
        if (historydata.length==0){
            //console.log('condition of historydata.length==0 verifier!')
            positionappenditem=0;
        }
        else{
            //console.log("the condition of else verifier !")
            //console.log("this is history data length ",historydata.length)
            if (historydata.length==10){
                deletehistory(0)
                requestNumber.innerHTML=historydata.length
            }
            positionappenditem=historydata.length
        }
        var row =`<tr class="HistoryRow"  id="row${positionappenditem}">
        <td><a href="#accordion" class="user-link" type="button" onclick="getdatafromhistory(${positionappenditem})" >${item.url}</a></td>
        <td>${item.request}</td>
        <td  >
            <button class="btn btn-primary" onclick="deletehistory(${positionappenditem})" ><i class="fa fa-trash"></i></button>
        </td>
        </tr>`
        //console.log("the postion of the append item ",positionappenditem)
        //console.log("if we will delete this shit we will get this number ",positionappenditem)
        historydata.push(item)
        localStorage.setItem('history', JSON.stringify(historydata))
        positionappenditem+=1;
        table.innerHTML+=row;
        //console.log(row);
        console.log("theold request number",requestNumber.innerHTML);
        requestNumber.innerHTML=historydata.length
    }
    // delete all the table !
    function deleteAllHistory(){
        //localStorage.clear()
        localStorage.removeItem('history')
        localStorage.removeItem('getdata')
        table.innerHTML=``;
        requestNumber.innerHTML=0;

    }
    //delete recent updates!
    function deletemsg(){
        RecentTable.innerHTML=`<thead>
        <tr>
        <th><span>Recent updates</span></th>
        </tr>
    </thead>`;
    }
    //----------------------------------------------------------------------------------------Socket cnx !-----------------------------------------------

        //-----------------------------------------button function !---------------------------------------------
            // open connection ! 
            function opening(){
                msgInput1=document.querySelector('#message-input');
                url=msgInput1.value;
                document.getElementById("state").innerHTML ="Waiting...!";
                openurl()
                /*/
                msgForm2.onsubmit=event =>{
                    event.preventDefault();
                    send()
                }
                /*/
                recivedata()
            }
            //fermer la cnx!
            function closing(){
                socket.close();
                socket=null;
                document.getElementById("state").innerHTML = "Closed";
                open.style.display = "block";
                close.style.display="none";
                buttonSendRequet.disabled=true;
            }
    // save variables ! 
    //-----------------------------------------------------------------------Create String Data  with INVOICE!--------------------------------------------------------------------------
    function createstringdataIN(){
        valueInput=document.querySelector('#value-input');
        decimal_shiftInput=document.querySelector('#decimal_shift-input');
        currencyInput=document.querySelector('#currency-input');
        seeResponse=document.querySelector('#see-response')
        refnumInput=document.querySelector('#refnum-input');
        invoiceInput=document.querySelector('#invoice-input');
        tipValue=document.querySelector('#tip-value');  
        //make complexité low 
        arrayOfFunction=[stringdataSFSRin,stringdataSFSRin,stringdataSFSRin,stringdataVOIDin,stringdataPREAUTHin,stringdataPREAUTHin]
        arrayOfString=['force_sale','sale','refund','Void','preauth_completion','preauth']
        stringdata=arrayOfFunction[arrayOfString.indexOf(dropdownMenuButton.innerHTML)]();
        return stringdata
    }
    //-----------------------------------------------------------each function to create the string data with options ID ------------------------------------------------------------
    function stringdataSFSRin(){
                fixedata()
                //TheRessourceObject=new Object
                //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"${dropdownMenuButton.innerHTML}\",\"clerk_id\":\"${IdInput.value}\",\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"enable_suspend_events\":false}}}`;
                Objecttransaction_amount[value]=valueInput.value;
                Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                Objecttransaction_amount[currency]=currencyInput.value;
                if (dropdownMenuButton.innerHTML=='sale' || dropdownMenuButton.innerHTML=='force_sale') {
                    ObjectTip[value]=tipValue.value;
                    ObjectTip[currency]=currencyInput.value;
                    ObjectTip[decimal_shift]=decimal_shiftInput.value;
                    amountObject[tip]=ObjectTip;
                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,tipValue.value,invoiceInput.value])
                }
                else {
                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,null,invoiceInput.value])
                }
                amountObject[transaction_amount]=Objecttransaction_amount;
                //-----
                TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                TheHeaderObject[flow_id]="577125";
                TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                TheRessourceObject[invoice]=invoiceInput.value
                TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                TheRessourceObject[amount]=amountObject
                myObject[header]=TheHeaderObject;
                myObject[resource]=TheRessourceObject  
                myFinalObj[request] = myObject;
                localStorage.setItem('getdata', JSON.stringify(getdata));
                return myFinalObj
    }
    function stringdataPREAUTHin(){
        fixedata()
        //TheRessourceObject=new Object
        //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"preauth_completion\",\"clerk_id\":\"${IdInput.value}\",\"ref_num\":\"${refnumInput.value}\"\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"print_receipt\":true}}}`
        Objecttransaction_amount[value]=valueInput.value;
        Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
        Objecttransaction_amount[currency]=currencyInput.value;
        amountObject[transaction_amount]=Objecttransaction_amount;
        //-----
        TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
        TheHeaderObject[flow_id]="577125";
        TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
        TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
        TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
        TheRessourceObject[amount]=amountObject
        TheRessourceObject[invoice]=invoiceInput.value
        TheRessourceObject[ref_num]=refnumInput.value
        myObject[header]=TheHeaderObject;
        myObject[resource]=TheRessourceObject  
        myFinalObj[request] = myObject;
        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null,invoiceInput.value])
        localStorage.setItem('getdata', JSON.stringify(getdata));
        console.log(getdata)
        return myFinalObj
    }
    function stringdataVOIDin(){
        fixedata()
        //TheRessourceObject=new Object
        //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"277555\"},\"resource\":{\"txn_type\":\"void\",\"clerk_id\":\"${IdInput.value}\",\"ref_num\":\"${refnumInput.value}\",\"print_receipt\":true}}}`
        //-----
        TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
        TheHeaderObject[flow_id]="577125";
        TheRessourceObject[txn_type]='void'
        TheRessourceObject[invoice]=invoiceInput.value
        TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
        TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
        TheRessourceObject[ref_num]=refnumInput.value
        myObject[header]=TheHeaderObject;
        myObject[resource]=TheRessourceObject  
        myFinalObj[request] = myObject;
        getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null,invoiceInput.value])
        localStorage.setItem('getdata', JSON.stringify(getdata));
        return myFinalObj
    }
    //-----------------------------------------------------------------------Create String Data  with ID---------------------------------------------------------------------------
    function createstringdataID(){
                    valueInput=document.querySelector('#value-input');
                    decimal_shiftInput=document.querySelector('#decimal_shift-input');
                    currencyInput=document.querySelector('#currency-input');
                    seeResponse=document.querySelector('#see-response')
                    refnumInput=document.querySelector('#refnum-input');
                    IdInput=document.querySelector('#id-input');
                    tipValue=document.querySelector('#tip-value');
                    console.log("hey")
                    console.log("this is tip Value",tipValue)
                    //make complexité low 
                    arrayOfFunction=[stringdataSFSRid,stringdataSFSRid,stringdataSFSRid,stringdataVOIDid,stringdataPREAUTHid,stringdataPREAUTHid]
                    arrayOfString=['force_sale','sale','refund','Void','preauth_completion','preauth']
                    stringdata=arrayOfFunction[arrayOfString.indexOf(dropdownMenuButton.innerHTML)]();
    return stringdata
    }
                //-----------------------------------------------------------each function to create the string data with options ID ------------------------------------------------------------
                function stringdataSFSRid(){
                            fixedata()
                            //TheRessourceObject=new Object
                            //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"${dropdownMenuButton.innerHTML}\",\"clerk_id\":\"${IdInput.value}\",\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"enable_suspend_events\":false}}}`;
                            Objecttransaction_amount[value]=valueInput.value;
                            Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                            Objecttransaction_amount[currency]=currencyInput.value;
                            if (dropdownMenuButton.innerHTML=='sale' || dropdownMenuButton.innerHTML=='force_sale') {
                                ObjectTip[value]=tipValue.value;
                                ObjectTip[currency]=currencyInput.value;
                                ObjectTip[decimal_shift]=decimal_shiftInput.value;
                                amountObject[tip]=ObjectTip;
                                getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,IdInput.value,tipValue.value])

                            }
                            else {
                                getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,IdInput.value,null])
                            }
                            amountObject[transaction_amount]=Objecttransaction_amount;
                            //-----
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                            TheRessourceObject[clerk_id]=IdInput.value
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[amount]=amountObject
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                }
                function stringdataPREAUTHid(){
                    fixedata()
                    //TheRessourceObject=new Object
                    //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"preauth_completion\",\"clerk_id\":\"${IdInput.value}\",\"ref_num\":\"${refnumInput.value}\"\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"print_receipt\":true}}}`
                    Objecttransaction_amount[value]=valueInput.value;
                    Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                    Objecttransaction_amount[currency]=currencyInput.value;
                    amountObject[transaction_amount]=Objecttransaction_amount;
                    //-----
                    TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                    TheHeaderObject[flow_id]="577125";
                    TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                    TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                    TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                    TheRessourceObject[amount]=amountObject
                    TheRessourceObject[clerk_id]=IdInput.value
                    TheRessourceObject[ref_num]=refnumInput.value
                    myObject[header]=TheHeaderObject;
                    myObject[resource]=TheRessourceObject  
                    myFinalObj[request] = myObject;
                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,IdInput.value,null])
                    localStorage.setItem('getdata', JSON.stringify(getdata));
                    console.log(getdata)
                    return myFinalObj
                }
                function stringdataVOIDid(){
                    fixedata()
                    //TheRessourceObject=new Object
                    //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"277555\"},\"resource\":{\"txn_type\":\"void\",\"clerk_id\":\"${IdInput.value}\",\"ref_num\":\"${refnumInput.value}\",\"print_receipt\":true}}}`
                    //-----
                    TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                    TheHeaderObject[flow_id]="577125";
                    TheRessourceObject[txn_type]='void'
                    TheRessourceObject[clerk_id]=IdInput.value
                    TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                    TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                    TheRessourceObject[ref_num]=refnumInput.value
                    myObject[header]=TheHeaderObject;
                    myObject[resource]=TheRessourceObject  
                    myFinalObj[request] = myObject;
                    getdata.push([null,null,null,seeResponse.value,refnumInput.value,IdInput.value,null])
                    localStorage.setItem('getdata', JSON.stringify(getdata));
                    return myFinalObj
                }
    //-----------------------------------------------------------------------Create String Data off---------------------------------------------------------------------------
    function createstringdataoff(){
                    valueInput=document.querySelector('#value-input');
                    decimal_shiftInput=document.querySelector('#decimal_shift-input');
                    currencyInput=document.querySelector('#currency-input');
                    seeResponse=document.querySelector('#see-response')
                    refnumInput=document.querySelector('#refnum-input');
                    tipValue=document.querySelector('#tip-value');
                    //make complexité low 
                    arrayOfFunction=[stringdataSFSR,stringdataSFSR,stringdataSFSR,stringdataVOID,stringdataPREAUTH,stringdataPREAUTH]
                    arrayOfString=['force_sale','sale','refund','Void','preauth_completion','preauth']
                    stringdata=arrayOfFunction[arrayOfString.indexOf(dropdownMenuButton.innerHTML)]();
    return stringdata
    }
            //-----------------------------------------------------------each function to create the string data with options OFF ------------------------------------------------------------
                        function stringdataSFSR(){
                            fixedata()
                            //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"${dropdownMenuButton.innerHTML}\",\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"enable_suspend_events\":false}}}`;
                            //TheRessourceObject=new Object
                            Objecttransaction_amount[value]=valueInput.value;
                            Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                            Objecttransaction_amount[currency]=currencyInput.value;
                            
                            if (dropdownMenuButton.innerHTML=='sale' || dropdownMenuButton.innerHTML=='force_sale'){
                                ObjectTip[value]=tipValue.value;
                                ObjectTip[currency]=currencyInput.value;
                                ObjectTip[decimal_shift]=decimal_shiftInput.value;
                                amountObject[tip]=ObjectTip;
                                getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,tipValue.value])

                            }
                            else{
                                getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,null])
                            }
                            amountObject[transaction_amount]=Objecttransaction_amount;
                                //-----
                                TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                                TheHeaderObject[flow_id]="577125";
                                TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                                TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                                TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                                TheRessourceObject[amount]=amountObject
                                myObject[header]=TheHeaderObject;
                                myObject[resource]=TheRessourceObject  
                                myFinalObj[request] = myObject;
                                console.log(myFinalObj)
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                        }
                        function stringdataPREAUTH(){
                            fixedata()
                            //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"preauth_completion\",\"ref_num\":\"${refnumInput.value}\"\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"print_receipt\":true}}}`
                            //TheRessourceObject=new Object
                            Objecttransaction_amount[value]=valueInput.value;
                            Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                            Objecttransaction_amount[currency]=currencyInput.value;
                            amountObject[transaction_amount]=Objecttransaction_amount;
                            //-----
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[amount]=amountObject
                            TheRessourceObject[ref_num]=refnumInput.value
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            console.log(refnumInput);
                            getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null])
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                        }
                        function stringdataVOID(){
                            fixedata()
                            //TheRessourceObject=new Object
                            //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"277555\"},\"resource\":{\"txn_type\":\"void\",\"ref_num\":\"${refnumInput.value}\",\"print_receipt\":true}}}`
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]='void'
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[ref_num]=refnumInput.value
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null])
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                        }
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                        
    //open the Url!
    function openurl(){
        try{
            socket = new WebSocket(url);
            socket.addEventListener("error",()=>{
                document.getElementById("state").innerHTML = "Failed to Connect ";
            }) 
            socket.addEventListener("open",()=>{
                buttonSendRequet.disabled=false;
                console.log(" we are connected");
                document.getElementById("state").innerHTML ="Connected Succesfully";
                open.style.display = 'none';
                close.style.display='block';
            })
        }            
        catch{
                document.getElementById("state").innerHTML = "Error";
        }
    } 
    // send cnx!
    function send(){
        seeResponse=document.querySelector('#see-response');
        if (isOpen(socket) ) {
            console.log("ahi ?")
            optionInput=document.querySelector('#option-input');
            console.log(seeResponse.value)
                if (optionInput.value=="None"){
                    stringdata=createstringdataoff()
                    console.log(JSON.stringify(stringdata))
                }
                else if(optionInput.value=="CLERK"){
                    stringdata=createstringdataID()
                }
                else{
                    stringdata=createstringdataIN()
                }
                try{
                    socket.send(JSON.stringify(stringdata))
                }
                catch{
                    console.log("ouh3ka zeby")
                }
                var item = {'url':url, 'request': JSON.stringify(stringdata),'type':dropdownMenuButton.innerHTML};
                appendToHistory(item)
                indice=indice+1;
            
                
        }
            /*/
            arrayofStringOption=['turn_off','id_only','id_and_password']
            arrayOfStringCreateFunction=[createstringdataoff,createstringdataID,createstringdataID]
            console.log(optionInput.value)
            stringdata=arrayOfStringCreateFunction[arrayOfStringCreateFunction.indexOf(optionInput.value)]();
            /*/
            //socket.send(stringdata);
            //socket.send(evalData);
        };
    
     // function recive data!
     function recivedata(){
        console.log("?")
        socket.addEventListener("message", data=>{
            data.preventDefault();
            if(seeResponse.value==true){
                console.log(data);
                var row =`<tr class="UpdateRow">
                    <td>${data.data}</td>
                    </tr>`
                    RecentTable.innerHTML+=row;
            }
        })
    }
    //test open connection!
    function isOpen(ws) {

     return ws.readyState === ws.OPEN 
    
    }
   
//---------------------------------------------------------------------------------------Change Form connection ! -----------------------------
        function sale(){
            dropdownMenuButton.innerHTML='sale'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected> OPTION</option>
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option>None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option selected>currency</option>
                            <option value="124">CAN</option>
                            <option value="840">US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <input type="text" id="decimal_shift-input" name="decimal_shift" class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option selected>See Response</option>
                                    <option value="1">true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                          
                </div>
                
            </div>`
            linetip=`<!-- ID input-->
            <div class="row">
              <div class="col-md-12">
                  <label for="tip-value">TIP VALUE:</label>
                  <input type="text" id="tip-value" value=0 "name="value" class="form-control" >
              </div>  
            </div>`
            changeFormTip.innerHTML=linetip

            changeForm.innerHTML=line
        }
        function preauth_completion(){
            dropdownMenuButton.innerHTML='preauth_completion'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected> OPTION</option>
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option>None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option selected>currency</option>
                            <option value="124">CAN</option>
                            <option value="840">US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <input type="text" id="decimal_shift-input" name="decimal_shift" class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="0" selected>See Response</option>
                                    <option value="1">true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- REFNUM input-->
                            <div class="col-md-4">
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>
                         
                </div>
            </div>
            
        </div>
            `
            changeForm.innerHTML=line
            changeFormTip.innerHTML=''

        }
        function preauth(){
            dropdownMenuButton.innerHTML='preauth'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected> OPTION</option>
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option>None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option selected>currency</option>
                            <option value="124">CAN</option>
                            <option value="840">US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <input type="text" id="decimal_shift-input" name="decimal_shift" class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option selected>See Response</option>
                                    <option value="1">true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- REFNUM input-->
                            <div class="col-md-4">
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>
                           
                </div>
            </div>
            
        </div>
            `
            changeForm.innerHTML=line
            changeFormTip.innerHTML=''

        }
        function refund(){
            dropdownMenuButton.innerHTML='refund'
            line=`    <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected> OPTION</option>
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option>None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option selected>currency</option>
                            <option value="124">CAN</option>
                            <option value="840">US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <input type="text" id="decimal_shift-input" name="decimal_shift" class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option selected>See Response</option>
                                    <option value="1">true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                     
                </div>
                
            </div>`

            changeForm.innerHTML=line
            changeFormTip.innerHTML=''

        }
        function Void(){
            dropdownMenuButton.innerHTML='Void'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected> OPTION</option>
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option>None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option selected>See Response</option>
                                    <option value="1">true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- REFNUM input-->
                            <div class="col-md-4">
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>
                </div>
                
            </div>`

            changeForm.innerHTML=line
            changeFormTip.innerHTML=''


        }
        function forceSale(){
            dropdownMenuButton.innerHTML='force_sale'
            line=`    <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected> OPTION</option>
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option>None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option selected>currency</option>
                            <option value="124">CAN</option>
                            <option value="840">US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <input type="text" id="decimal_shift-input" name="decimal_shift" class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option selected>See Response</option>
                                    <option value="1">true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                        
                </div>
                
            </div>`
            linetip=`<!-- ID input-->
            <div class="row">
              <div class="col-md-12">
                  <label for="tip-value">TIP VALUE:</label>
                  <input type="text" id="tip-value" name="value" value=0 class="form-control" >
              </div>  
            </div>`
            changeFormTip.innerHTML=linetip
            changeForm.innerHTML=line
        }
//--------------------------------------------------Get Data function -------------------------------------------------------------------------------
    // we get everythink! !
    function getdatafromhistory(i){
        msgInput1.value=historydata[i].url
        dropdownMenuButton.innerHTML=historydata[i].type;
        arrayOfgetdata=[getReqSRFS,getReqSRFS,getReqSRFS,getReqVoid,getReqpreauth,getReqpreauth]
        arrayOfFunction=[forceSale,sale,refund,Void,preauth_completion,preauth]
        arrayOfString=['force_sale','sale','refund','Void','preauth_completion','preauth']
        console.log(dropdownMenuButton.innerHTML)
        arrayOfFunction[arrayOfString.indexOf(dropdownMenuButton.innerHTML)]();
        arrayOfgetdata[arrayOfString.indexOf(dropdownMenuButton.innerHTML)](i);
    }
    //------------------------------------------------------------------PUT DATA Function ! ----------------------------------------------------------------------------
    //get request data 
    //get the void data
    function getReqVoid(i){ 
        refnumInput=document.querySelector('#refnum-input');
        seeResponse=document.querySelector('#see-response');
        IdInput=document.querySelector('#id-input');
        PasswordInput=document.querySelector('#password-input');
        optionInput=document.querySelector('#option-input');
        console.log(i);
        refnumInput.value=getdata[i][4]
        seeResponse.value=getdata[i][3]
        if(getdata[i][5]!=null){
            optionInput.value='CLERK'
            OurFormChanged()
            IdInput=document.querySelector('#id-input');
            IdInput.value=getdata[i][5]
        }
        else{
            optionInput.value='INVOICE'
            OurFormChanged()
            invoiceInput=document.querySelector('#invoice-input');
            invoiceInput.value=getdata[i][7]

        }
        

    }
    //get the sale , refund , force-sale data 
    function getReqSRFS(i){
        valueInput=document.querySelector('#value-input');
        optionInput=document.querySelector('#option-input');
        decimal_shiftInput=document.querySelector('#decimal_shift-input');
        currencyInput=document.querySelector('#currency-input');
        seeResponse=document.querySelector('#see-response')
        IdInput=document.querySelector('#id-input');
        PasswordInput=document.querySelector('#password-input');
        tipValue=document.querySelector('#tip-value');
        valueInput.value=getdata[i][0]
        decimal_shiftInput.value=getdata[i][1]
        currencyInput.value=getdata[i][2]
        seeResponse.value=getdata[i][3]
        if (dropdownMenuButton.innerHTML!='refund'){
            tipValue.value=getdata[i][6]
        }

        if(getdata[i][5]!=null){
            optionInput.value='CLERK'
            OurFormChanged()
            IdInput=document.querySelector('#id-input');
            IdInput.value=getdata[i][5]
        }
        else if (getdata[i][7]!=null){
            optionInput.value='INVOICE'
            OurFormChanged()
            invoiceInput=document.querySelector('#invoice-input');
            invoiceInput.value=getdata[i][7]
        }
        else{
            optionInput.value='None'
            OurFormChanged()
        }
       
       
        
        
        
        
    }
    function getReqpreauth(i){
        console.log(i);
        console.log(getdata[i])
        optionInput=document.querySelector('#option-input');
        valueInput=document.querySelector('#value-input');
        decimal_shiftInput=document.querySelector('#decimal_shift-input');
        currencyInput=document.querySelector('#currency-input');
        refnumInput=document.querySelector('#refnum-input');
        seeResponse=document.querySelector('#see-response');
        valueInput.value=getdata[i][0]
        decimal_shiftInput.value=getdata[i][1]
        currencyInput.value=getdata[i][2]
        seeResponse.value=getdata[i][3]
        refnumInput.value=getdata[i][4]

        if(getdata[i][5]!=null){
                optionInput.value='CLERK'
                OurFormChanged()
                IdInput=document.querySelector('#id-input');
                IdInput.value=getdata[i][5]
            }
            else{
                optionInput.value='INVOICE'
                OurFormChanged()
                invoiceInput=document.querySelector('#invoice-input');
                invoiceInput.value=getdata[i][7]

            }
            
    }
   
//-------------------------------------------------------------------------------CHANGE FORM WITH OUR OPTION! --------------------------------------------------------------
    function OurFormChanged(){
            optionInput=document.querySelector('#option-input');
            option=document.querySelector('#option')
            IdInput=document.querySelector('#id-input');
            optionForm=document.querySelector('#option-form');
            PasswordInput=document.querySelector('#password-input');
            /*/
            if (optionInput.value=='turn off'){
                IdInput.style.display = "none";
            }
            else if (optionInput.value=="id only"){
                IdInput.style.display = "block";
            }
            else{
                alert("password should be in terminal for more security")
                IdInput.style.display = "block";
            }
            /*/
            console.log(optionInput.value)
            option.innerHTML=optionInput.value;
            /*/
            if (optionInput.value=="CLERK"){
                optionForm.innerHTML=`<div class="col-md-12">
                            <input type="text" id="id-input"name="value" class="form-control" placeholder="ID">
                        </div>`
            }
            if (optionInput.value=="INVOICE"){
                optionForm.innerHTML=`<div class="col-md-12">
                            <input type="text" id="invoice-input"name="value" class="form-control" placeholder="invoice">
                        </div>`
            }
            /*/
            if (optionInput.value=='CLERK'){
                optionForm.innerHTML=`<div class="col-md-12">
                <input type="text" id="id-input"name="value" class="form-control" placeholder="ID">
            </div>`
            }
            else if (optionInput.value=="INVOICE"){
                optionForm.innerHTML=`<div class="col-md-12">
                            <input type="text" id="invoice-input"name="value" class="form-control" placeholder="invoice">
                        </div>`
            }
            else{
                optionForm.innerHTML='<h5>no option</h5>'
            }
            

    } 
// -------------------------------------------------------------------------------------------fix the modal----------------------------------------------------------------------------------------------- !
function closemodal(){
    var modal = document.getElementById("Modal-sale");
    modal.style.display = "none";
}
function reloadmodel(){
    var modal = document.getElementById("Modal-sale");
    modal.style.display = "block";
    // Get the modal
    // Get the <span> element that closes the moda

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}
function modalSFS(){
    reloadmodel()
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");

    modalBody.innerHTML=`<p> {<br>

        <input class="inputmodal" id="request" ></input>:{<br>
     
            <input class="inputmodal" id="header" ></input>:{<br>
     
                <input class="inputmodal" id="endpoint" ></input>:"/NAR/v1/transaction",<br>
     
                <input class="inputmodal" id="flow_id" ></input>:"577125"<br>
           },<br>
     
           <input class="inputmodal" id="resource" ></input>:{<br>
            <input class="inputmodal" id="clerk_id" ></input>:'number',<br>
            <input class="inputmodal" id="invoice" ></input>:'number',<br>
            <input class="inputmodal" id="txn_type" ></input>:"type",<br>
     
            <input class="inputmodal" id="amount" ></input>:{<br>
                <input class="inputmodal" id="tip" ></input>:{<input class="inputmodal" id="tip-value" ></input>:'number', <input class="inputmodal" id="tip-decimal_shift" ></input>:'number', <input class="inputmodal" id="tip-currency" ></input>:'number'}<br>
                <input class="inputmodal" id="transaction_amount" ></input>:{<input class="inputmodal" id="value" ></input>:'number', <input class="inputmodal" id="decimal_shift" ></input>:'number', <input class="inputmodal" id="currency" ></input>:'number'}<br>
     
              },<br>
     
              <input class="inputmodal" id="enable_suspend_events" ></input>:true<br>
              <input class="inputmodal" id="print_receipt" ></input>:true<br>

     
           }
     
        }
     
     }</p>`
     modalFooter.innerHTML=`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closemodal()">Close</button>
     <button type="button" class="btn btn-primary" onclick="changeSkeltonSFS()">Save changes</button>`
     //import data from localhost 
     skeleton= JSON.parse(localStorage.getItem('skeleton'));
     //make front variables with id 
     var flow_id=document.getElementById("flow_id")
     var request = document.getElementById("request");
     var header = document.getElementById("header");
     var endpoint = document.getElementById("endpoint");
     var resource = document.getElementById("resource");
     var clerk_id = document.getElementById("clerk_id");
     var txn_type = document.getElementById("txn_type");
     var invoice=document.getElementById("invoice")
     var transaction_amount = document.getElementById("transaction_amount");
     var enable_suspend_events = document.getElementById("enable_suspend_events");
     var print_receipt = document.getElementById("print_receipt");
     var value = document.getElementById("value");
     var currency = document.getElementById("currency");
     var tip=document.getElementById("tip");
     var tipCurrency=document.getElementById("tip-currency");
     var tipValue=document.getElementById("tip-value");
     var tipeDecimal_shift=document.getElementById("tip-decimal_shift");
     var amount=document.getElementById("amount");
     var decimal_shift=document.getElementById("decimal_shift");
     //send data to frontend !
     tip.value=skeleton.tip;
     tipCurrency.value=skeleton.currency;
     tipValue.value=skeleton.value;
     tipeDecimal_shift.value=skeleton.decimal_shift;
     flow_id.value=skeleton.flow_id;
     request.value=skeleton.request;
     header.value=skeleton.header;
     endpoint.value=skeleton.endpoint;
     resource.value=skeleton.resource;
     clerk_id.value=skeleton.clerk_id;
     invoice.value=skeleton.invoice;
     txn_type.value=skeleton.txn_type;
     transaction_amount.value=skeleton.transaction_amount;
     enable_suspend_events.value=skeleton.enable_suspend_events;
     value.value=skeleton.value;
     currency.value=skeleton.currency;
     amount.value=skeleton.amount;
     decimal_shift.value=skeleton.decimal_shift;
     print_receipt.value=skeleton.print_receipt;

}
function modalR(){
    reloadmodel()
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");

    modalBody.innerHTML=`<p> {<br>

        <input class="inputmodal" id="request" ></input>:{<br>
     
            <input class="inputmodal" id="header" ></input>:{<br>
     
                <input class="inputmodal" id="endpoint" ></input>:"/NAR/v1/transaction",<br>
     
                <input class="inputmodal" id="flow_id" ></input>:"577125"<br>
           },<br>
     
           <input class="inputmodal" id="resource" ></input>:{<br>
            <input class="inputmodal" id="clerk_id" ></input>:'number',<br>
            <input class="inputmodal" id="invoice" ></input>:'number',<br>
            <input class="inputmodal" id="txn_type" ></input>:"type",<br>
     
            <input class="inputmodal" id="amount" ></input>:{<br>
     
                <input class="inputmodal" id="transaction_amount" ></input>:{<input class="inputmodal" id="value" ></input>:'number', <input class="inputmodal" id="decimal_shift" ></input>:'number', <input class="inputmodal" id="currency" ></input>:'number'}<br>
     
              },<br>
     
              <input class="inputmodal" id="enable_suspend_events" ></input>:true<br>
              <input class="inputmodal" id="print_receipt" ></input>:true<br>

           }
     
        }
     
     }</p>`
     modalFooter.innerHTML=`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closemodal()">Close</button>
     <button type="button" class="btn btn-primary" onclick="changeSkeltonR()">Save changes</button>`
     //import data from localhost 
     skeleton= JSON.parse(localStorage.getItem('skeleton'));
     //make front variables with id 
     var flow_id=document.getElementById("flow_id")
     var request = document.getElementById("request");
     var header = document.getElementById("header");
     var endpoint = document.getElementById("endpoint");
     var resource = document.getElementById("resource");
     var clerk_id = document.getElementById("clerk_id");
     var invoice=document.getElementById("invoice")
     var txn_type = document.getElementById("txn_type");
     var transaction_amount = document.getElementById("transaction_amount");
     var enable_suspend_events = document.getElementById("enable_suspend_events");
     var print_receipt = document.getElementById("print_receipt");
     var value = document.getElementById("value");
     var currency = document.getElementById("currency");
     var amount=document.getElementById("amount");
     var decimal_shift=document.getElementById("decimal_shift");
     //send data to frontend !
     invoice.value=skeleton.invoice;
     flow_id.value=skeleton.flow_id;
     request.value=skeleton.request;
     header.value=skeleton.header;
     endpoint.value=skeleton.endpoint;
     resource.value=skeleton.resource;
     clerk_id.value=skeleton.clerk_id;
     txn_type.value=skeleton.txn_type;
     transaction_amount.value=skeleton.transaction_amount;
     enable_suspend_events.value=skeleton.enable_suspend_events;
     value.value=skeleton.value;
     currency.value=skeleton.currency;
     amount.value=skeleton.amount;
     decimal_shift.value=skeleton.decimal_shift;
     print_receipt.value=skeleton.print_receipt;

}

function modalVoid(){
    reloadmodel();
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");
    modalBody.innerHTML=`<p> {<br>

        <input class="inputmodal" id="request" ></input>:{<br>
     
            <input class="inputmodal" id="header" ></input>:{<br>
     
                <input class="inputmodal" id="endpoint" ></input>:"/NAR/v1/transaction",<br>
     
                <input class="inputmodal" id="flow_id" ></input>:"577125"<br>
           },<br>
     
            <input class="inputmodal" id="resource" ></input>:{<br>
            <input class="inputmodal" id="clerk_id" ></input>:'number',<br>
            <input class="inputmodal" id="invoice" ></input>:'number',<br>
            <input class="inputmodal" id="txn_type" ></input>:"void",<br>
            <input class="inputmodal" id="ref_num" ></input>:"number",<br>
            <input class="inputmodal" id="print_receipt" ></input>:true<br>
            <input class="inputmodal" id="enable_suspend_events" ></input>:true<br>

           }
     
        }
     
     }</p>`
    modalFooter.innerHTML=`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closemodal()">Close</button>
     <button type="button" class="btn btn-primary" onclick="changeSkeltonVoid()">Save changes</button>`
      //import data from localhost 
      skeleton= JSON.parse(localStorage.getItem('skeleton'));
      //make front variables with id 
      var flow_id=document.getElementById("flow_id")
      var request = document.getElementById("request");
      var header = document.getElementById("header");
      var endpoint = document.getElementById("endpoint");
      var resource = document.getElementById("resource");
      var clerk_id = document.getElementById("clerk_id");
      var invoice=document.getElementById("invoice")
      var txn_type = document.getElementById("txn_type");
      var print_receipt = document.getElementById("print_receipt");
      var enable_suspend_events = document.getElementById("enable_suspend_events");
      var ref_num=document.getElementById("ref_num");
      //send data to frontend !
      invoice.value=skeleton.invoice;
      request.value=skeleton.request;
      header.value=skeleton.header;
      endpoint.value=skeleton.endpoint;
      resource.value=skeleton.resource;
      clerk_id.value=skeleton.clerk_id;
      txn_type.value=skeleton.txn_type;
      currency.value=skeleton.currency;
      ref_num.value=skeleton.ref_num;
      flow_id.value=skeleton.flow_id;
      print_receipt.value=skeleton.print_receipt;
      enable_suspend_events.value=skeleton.enable_suspend_events;

}
function modalPre(){
    reloadmodel();
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");
    modalBody.innerHTML=`<p> {<br>

        <input class="inputmodal" id="request" ></input>:{<br>
     
            <input class="inputmodal" id="header" ></input>:{<br>
     
                <input class="inputmodal" id="endpoint" ></input>:"/NAR/v1/transaction",<br>
     
                <input class="inputmodal" id="flow_id" ></input>:"577125"<br>
           },<br>
     
           <input class="inputmodal" id="resource"></input>:{<br>
            <input class="inputmodal" id="ref_num"></input>:'number',<br>
            <input class="inputmodal" id="clerk_id"></input>:'number',<br>
            <input class="inputmodal" id="invoice" ></input>:'number',<br>
            <input class="inputmodal" id="txn_type"></input>:"type",<br>
     
            <input class="inputmodal" id="amount" ></input>:{<br>
     
                <input class="inputmodal" id="transaction_amount" ></input>:{<input class="inputmodal" id="value" ></input>:'number', <input class="inputmodal" id="decimal_shift" ></input>:'number', <input class="inputmodal" id="currency" ></input>:'number'}<br>
     
              },<br>
     
              <input class="inputmodal"  id="enable_suspend_events" ></input>:true<br>
              <input class="inputmodal" id="print_receipt" ></input>:true<br>

           }
     
        }
     
     }</p>`
     modalFooter.innerHTML=`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closemodal()">Close</button>
     <button type="button" class="btn btn-primary" onclick="changeSkeltonPre()">Save changes</button>`
     //import data from localhost 
     skeleton= JSON.parse(localStorage.getItem('skeleton'));
     //make front variables with id 
     var flow_id=document.getElementById("flow_id")
     var request = document.getElementById("request");
     var header = document.getElementById("header");
     var endpoint = document.getElementById("endpoint");
     var resource = document.getElementById("resource");
     var clerk_id = document.getElementById("clerk_id");
     var txn_type = document.getElementById("txn_type");
     var transaction_amount = document.getElementById("transaction_amount");
     var enable_suspend_events = document.getElementById("enable_suspend_events");
     var print_receipt = document.getElementById("print_receipt");
     var value = document.getElementById("value");
     var currency = document.getElementById("currency");
     var amount=document.getElementById("amount");
     var decimal_shift=document.getElementById("decimal_shift");
     var ref_num=document.getElementById("ref_num");
     var invoice=document.getElementById("invoice")
     //send data to frontend !
     request.value=skeleton.request;
     header.value=skeleton.header;
     endpoint.value=skeleton.endpoint;
     resource.value=skeleton.resource;
     clerk_id.value=skeleton.clerk_id;
     txn_type.value=skeleton.txn_type;
     transaction_amount.value=skeleton.transaction_amount;
     enable_suspend_events.value=skeleton.enable_suspend_events;
     value.value=skeleton.value;
     currency.value=skeleton.currency;
     amount.value=skeleton.amount;
     decimal_shift.value=skeleton.decimal_shift;
     ref_num.value=skeleton.ref_num;
     flow_id.value=skeleton.flow_id;
     invoice.value=skeleton.invoice;
     print_receipt.value=skeleton.print_receipt;
}
        //----------------------------------------------------------------------------------Change skeleton ! -------------------------------------------------------------------------------------------------------
        function changeSkeltonSFS(){
            var modal = document.getElementById("Modal-sale");
            skeleton= JSON.parse(localStorage.getItem('skeleton'));
            //make front variables with id 
            var flow_id=document.getElementById("flow_id")
            var request = document.getElementById("request");
            var header = document.getElementById("header");
            var endpoint = document.getElementById("endpoint");
            var resource = document.getElementById("resource");
            var clerk_id = document.getElementById("clerk_id");
            var invoice=document.getElementById("invoice")
            var txn_type = document.getElementById("txn_type");
            var transaction_amount = document.getElementById("transaction_amount");
            var enable_suspend_events = document.getElementById("enable_suspend_events");
            var print_receipt = document.getElementById("print_receipt");
            var value = document.getElementById("value");
            var currency = document.getElementById("currency");
            var amount=document.getElementById("amount");
            var decimal_shift=document.getElementById("decimal_shift");
            var tip=document.getElementById("tip")
            skeleton.print_receipt=print_receipt.value
            skeleton.invoice=invoice.value;
            skeleton.flow_id=flow_id.value;
            skeleton.request=request.value;
            skeleton.header=header.value;
            skeleton.endpoint=endpoint.value;
            skeleton.clerk_id=clerk_id.value;
            skeleton.txn_type=txn_type.value;
            skeleton.transaction_amount=transaction_amount.value;
            skeleton.resource=resource.value;
            skeleton.enable_suspend_events=enable_suspend_events.value;
            skeleton.value=value.value;
            skeleton.tip=tip.value;
            skeleton.currency=currency.value;
            skeleton.amount=amount.value;
            skeleton.decimal_shift=decimal_shift.value;
            localStorage.setItem('skeleton', JSON.stringify(skeleton));
            modal.style.display = "none";
            alert("the changes has been saved")
        }
        function changeSkeltonR(){
            var modal = document.getElementById("Modal-sale");
            skeleton= JSON.parse(localStorage.getItem('skeleton'));
            //make front variables with id 
            var flow_id=document.getElementById("flow_id")
            var request = document.getElementById("request");
            var header = document.getElementById("header");
            var endpoint = document.getElementById("endpoint");
            var resource = document.getElementById("resource");
            var clerk_id = document.getElementById("clerk_id");
            var invoice=document.getElementById("invoice")
            var txn_type = document.getElementById("txn_type");
            var transaction_amount = document.getElementById("transaction_amount");
            var enable_suspend_events = document.getElementById("enable_suspend_events");
            var print_receipt = document.getElementById("print_receipt");
            var value = document.getElementById("value");
            var currency = document.getElementById("currency");
            var amount=document.getElementById("amount");
            var decimal_shift=document.getElementById("decimal_shift");
            skeleton.print_receipt=print_receipt.value
            skeleton.invoice=invoice.value;
            skeleton.flow_id=flow_id.value;
            skeleton.request=request.value;
            skeleton.header=header.value;
            skeleton.endpoint=endpoint.value;
            skeleton.clerk_id=clerk_id.value;
            skeleton.txn_type=txn_type.value;
            skeleton.transaction_amount=transaction_amount.value;
            skeleton.resource=resource.value;
            skeleton.enable_suspend_events=enable_suspend_events.value;
            skeleton.value=value.value;
            skeleton.currency=currency.value;
            skeleton.amount=amount.value;
            skeleton.decimal_shift=decimal_shift.value;
            localStorage.setItem('skeleton', JSON.stringify(skeleton));
            modal.style.display = "none";
            alert("the changes has been saved")
        }
        function changeSkeltonPre(){
            var modal = document.getElementById("Modal-sale");
            skeleton= JSON.parse(localStorage.getItem('skeleton'));
            //make front variables with id 
            var flow_id=document.getElementById("flow_id")
            var request = document.getElementById("request");
            var header = document.getElementById("header");
            var endpoint = document.getElementById("endpoint");
            var resource = document.getElementById("resource");
            var clerk_id = document.getElementById("clerk_id");
            var invoice=document.getElementById("invoice")
            var txn_type = document.getElementById("txn_type");
            var transaction_amount = document.getElementById("transaction_amount");
            var enable_suspend_events = document.getElementById("enable_suspend_events");
            var value = document.getElementById("value");
            var currency = document.getElementById("currency");
            var amount=document.getElementById("amount");
            var decimal_shift=document.getElementById("decimal_shift");
            var ref_num=document.getElementById("ref_num");
            var print_receipt = document.getElementById("print_receipt");
            skeleton.invoice=invoice.value;
            skeleton.flow_id=flow_id.value;
            skeleton.request=request.value;
            skeleton.header=header.value;
            skeleton.endpoint=endpoint.value;
            skeleton.clerk_id=clerk_id.value;
            skeleton.txn_type=txn_type.value;
            skeleton.transaction_amount=transaction_amount.value;
            skeleton.resource=resource.value;
            skeleton.enable_suspend_events=enable_suspend_events.value;
            skeleton.value=value.value;
            skeleton.currency=currency.value;
            skeleton.amount=amount.value;
            skeleton.decimal_shift=decimal_shift.value;
            skeleton.ref_num=ref_num.value
            skeleton.print_receipt=print_receipt.value
            localStorage.setItem('skeleton', JSON.stringify(skeleton));
            modal.style.display = "none";
            alert("the changes has been saved")
        }
        function changeSkeltonVoid(){
            var modal = document.getElementById("Modal-sale");
            skeleton= JSON.parse(localStorage.getItem('skeleton'));
            //make front variables with id 
            var flow_id=document.getElementById("flow_id")
            var request = document.getElementById("request");
            var header = document.getElementById("header");
            var endpoint = document.getElementById("endpoint");
            var resource = document.getElementById("resource");
            var clerk_id = document.getElementById("clerk_id");
            var invoice=document.getElementById("invoice")
            var txn_type = document.getElementById("txn_type");
            var ref_num=document.getElementById("ref_num");
            var print_receipt = document.getElementById("print_receipt");
            var enable_suspend_events = document.getElementById("enable_suspend_events");
            skeleton.print_receipt=print_receipt.value
            skeleton.flow_id=flow_id.value;
            skeleton.invoice=invoice.value;
            skeleton.request=request.value;
            skeleton.header=header.value;
            skeleton.endpoint=endpoint.value;
            skeleton.clerk_id=clerk_id.value;
            skeleton.txn_type=txn_type.value;
            skeleton.transaction_amount=transaction_amount.value;
            skeleton.resource=resource.value;
            skeleton.enable_suspend_events=enable_suspend_events.value;
            skeleton.value=value.value;
            skeleton.currency=currency.value;
            skeleton.amount=amount.value;
            skeleton.decimal_shift=decimal_shift.value;
            skeleton.ref_num=ref_num.value
            localStorage.setItem('skeleton', JSON.stringify(skeleton));
            modal.style.display = "none";
            alert("the changes has been saved")
        }
        function reloadSkelton(){
            var modal = document.getElementById("Modal-sale");
            var skeleton={'request':'request','header':'header','endpoint':'endpoint','flow_id':'flow_id','resource':'resource','txn_type':'txn_type','enable_suspend_events':'enable_suspend_events','clerk_id':'clerk_id','amount':'amount','ref_num':'ref_num','print_receipt':'print_receipt','transaction_amount':'transaction_amount','decimal_shift':'decimal_shift','value':'value','currency':'currency','tip':'tip','invoice':'invoice'}
            localStorage.setItem('skeleton', JSON.stringify(skeleton));
            modal.style.display = "none";
            alert("you reload the old request")

        }
        function fixedata(){
            skeleton = JSON.parse(localStorage.getItem('skeleton'));
            myFinalObj = new Object;
            myObject=new Object;
            request=skeleton.request;
           //--HEADER OBJECT !
            TheHeaderObject=new Object;
            endpoint=skeleton.endpoint
            flow_id=skeleton.flow_id;
            header=skeleton.header;
           //---Ressource Object!
            TheRessourceObject=new Object;
            resource=skeleton.resource
            txn_type=skeleton.txn_type;
            enable_suspend_events=skeleton.enable_suspend_events;
            clerk_id=skeleton.clerk_id
            amount=skeleton.amount
            ref_num=skeleton.ref_num
            print_receipt=skeleton.print_receipt
           //--Amount Object ! 
            amountObject=new Object
            transaction_amount=skeleton.transaction_amount
           //-----Object transaction_amount:
            Objecttransaction_amount=new Object
            value=skeleton.value
            decimal_shift=skeleton.decimal_shift;
            currency=skeleton.currency;
            tip=skeleton.tip;
       }


/////////////////////////////////



