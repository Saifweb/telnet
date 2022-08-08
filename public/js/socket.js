if (skeleton==null){
    var skeleton={'request':'request','header':'header','endpoint':'endpoint','flow_id':'flow_id','resource':'resource','txn_type':'txn_type','enable_suspend_events':'enable_suspend_events','clerk_id':'clerk_id','amount':'amount','ref_num':'ref_num','print_receipt':'print_receipt','transaction_amount':'transaction_amount','decimal_shift':'decimal_shift','value':'value','currency':'currency','tip':'tip','invoice':'invoice','type':'type','host_approval_code':'host_approval_code','preformatted_receipt':'preformatted_receipt','preformatted_receipt_name':'preformatted_receipt_name','payment_type':'payment_type','exp_date':'exp_date','token':'token'}
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
var preformatted_receipt_name=skeleton.preformatted_receipt_name
var type=skeleton.type
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
//token object:
var ObjectToken=new Object;
var exp_date=skeleton.exp_date
var token=skeleton.token
//---------
var host_approval_code=skeleton.host_approval_code
var preformatted_receipt=skeleton.preformatted_receipt
var payment_type=skeleton.payment_type
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
var enableSuspendEventsInput=document.querySelector("#enable-Suspend-Events-Input");
var paymentTypeInput=document.querySelector("#payment_type_input")
var events=document.querySelector('#events')
events.style.display="block"
var tipOption=document.querySelector('#option-tip');
var preformattedReceiptInput=document.querySelector('#preformatted_receipt_input');
// intialier hostApprovalCode a not vue ! 
var hostApprovalCode=document.querySelector('#host_approval_code_input')
var host=document.querySelector('#host')
function intiliaseHost(){
    if (enableSuspendEventsInput.value=="false"){
        host.style.display = "none";
    }
}
intiliaseHost()

//else if (optionInput.value=="id only"){
 //   IdInput.style.display = "block";
//}
var indice=0;
var j=0;
var url='';
var socket;
var stringdata='';
var msgInput1=document.querySelector('#message-input');
var dropdownMenuButton=document.getElementById("dropdownMenuButton");
//request variables!
const buttonSendRequet = document.getElementById("btn-req-msg");
const buttonsettelment = document.getElementById("btn-settelment");
const buttonToken=document.getElementById('btn-token');
const buttonPre=document.getElementById('btn-pre');
const buttonrecall=document.getElementById('btn-recall');
const buttonreset=document.getElementById('btn-reset');
const buttonter=document.getElementById('btn-ter');


// button send request !
buttonSendRequet.disabled=true;
buttonsettelment.disabled=true;
buttonToken.disabled=true;
buttonPre.disabled=true;
buttonrecall.disabled=true;
buttonreset.disabled=true;
buttonter.disabled=true;


//variable form2
const msgForm2=document.querySelector('#mymsgForm');
var i=0;
//
const msgContainers=document.querySelector('#messages-container');
var option=document.querySelector('#option')

//make button close hide!
close.style.display ='none';
var test=true;  
function initializeGetData(){
    getdata = JSON.parse(localStorage.getItem('getdata'));
    if (getdata==null){
        getdata=[]
    }
    
}
function initializeGetHistory(){
    historydata = JSON.parse(localStorage.getItem('history'));
    if (historydata!=null){
        positionappenditem=historydata.length
    }
    else
    {
        historydata=[];
        positionappenditem=0;
    }  
}
historydata = JSON.parse(localStorage.getItem('history'));
    if (historydata!=null){
        LoadHistoryTable();
        positionappenditem=historydata.length
    }
    else
    {
        historydata=[];
        positionappenditem=0;
    }  
initializeGetData();



//var historyItems=historydata

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
        initializeGetHistory()
        initializeGetData();
        requestNumber.innerHTML=historydata.length
        //requestNumber.innerHTML=indice+1;
        for (var i =0 ; i < historydata.length; i++) {
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
        requestNumber.innerHTML=historydata.length
    }
    // delete all the table !
    function deleteAllHistory(){
        //localStorage.clear()
        localStorage.removeItem('history')
        localStorage.removeItem('getdata')
        historydata= [];
        getdata=[];
        LoadHistoryTable();
        //table.innerHTML=``;
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
                buttonsettelment.disabled=true;
                buttonToken.disabled=true;
                buttonPre.disabled=true;
                buttonrecall.disabled=true;
                buttonreset.disabled=true;
                buttonter.disabled=true;



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
        tipOption=document.querySelector('#option-tip');
        tokenOption=document.querySelector('#option-token');
        tokenValue=document.querySelector('#token-value');
        tokenExp=document.querySelector('#token-expire');
        paymentTypeInput=document.querySelector("#payment_type_input")
        //make complexité low 
        arrayOfFunction=[stringdataSFSRin,stringdataSFSRin,stringdataSFSRin,stringdataPREAUTHinAD,stringdataSFSRin]
        arrayOfString=['force_sale','sale','refund','preauth','auth_only']
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
                if (dropdownMenuButton.innerHTML!='refund' && tipOption.value==1 ){
                    ObjectTip[value]=tipValue.value;
                    ObjectTip[currency]=currencyInput.value;
                    ObjectTip[decimal_shift]=decimal_shiftInput.value;
                    amountObject[tip]=ObjectTip;
                    if (tokenOption.value==1){
                        ObjectToken[value]=tokenValue.value;
                        ObjectToken[exp_date]=tokenExp.value;
                        TheRessourceObject[token]=ObjectToken;
                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,tipValue.value,invoiceInput.value,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                    }
                    else{
                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,tipValue.value,invoiceInput.value,paymentTypeInput.value,null,null])
                    }
                }
                else {
                    if (tokenOption.value==1){ 
                        ObjectToken[value]=tokenValue.value;
                        ObjectToken[exp_date]=tokenExp.value;
                        TheRessourceObject[token]=ObjectToken;
                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,null,invoiceInput.value,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                    }
                    else{
                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,null,invoiceInput.value,paymentTypeInput.value,null,null])
                    }
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
                TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'   
                TheRessourceObject[payment_type]=paymentTypeInput.value;
                fixedataforcesale()
                myObject[header]=TheHeaderObject;
                myObject[resource]=TheRessourceObject  
                myFinalObj[request] = myObject;
                localStorage.setItem('getdata', JSON.stringify(getdata));
                return myFinalObj
    }
    function stringdataPREAUTHinAD(){
        fixedata()
        //TheRessourceObject=new Object
        //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"preauth_completion\",\"clerk_id\":\"${IdInput.value}\",\"ref_num\":\"${refnumInput.value}\"\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"print_receipt\":true}}}`
        Objecttransaction_amount[value]=valueInput.value;
        Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
        Objecttransaction_amount[currency]=currencyInput.value;
        amountObject[transaction_amount]=Objecttransaction_amount;
        //-----
        if (tokenOption.value==1){     
            ObjectToken[value]=tokenValue.value;
            ObjectToken[exp_date]=tokenExp.value;
            TheRessourceObject[token]=ObjectToken;
            getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null,invoiceInput.value,paymentTypeInput.value,tokenValue.value,tokenExp.value])
        }
        else{
            getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null,invoiceInput.value,paymentTypeInput.value,null,null])
        }
        TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
        TheHeaderObject[flow_id]="577125";
        TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
        TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
        TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
        TheRessourceObject[payment_type]=paymentTypeInput.value;
        TheRessourceObject[amount]=amountObject
        TheRessourceObject[ref_num]=refnumInput.value
        TheRessourceObject[invoice]=invoiceInput.value
        TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
        myObject[header]=TheHeaderObject;
        myObject[resource]=TheRessourceObject  
        myFinalObj[request] = myObject;
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
                    tipOption=document.querySelector('#option-tip');
                    tokenOption=document.querySelector('#option-token');
                    tokenValue=document.querySelector('#token-value');
                    tokenExp=document.querySelector('#token-expire');
                    paymentTypeInput=document.querySelector("#payment_type_input")
                    //make complexité low 
                    arrayOfFunction=[stringdataSFSRid,stringdataSFSRid,stringdataSFSRid,stringdataPREAUTHidAD,stringdataSFSRid]
                    arrayOfString=['force_sale','sale','refund','preauth','auth_only']
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
                            if (dropdownMenuButton.innerHTML!='refund' && tipOption.value==1 ){
                                ObjectTip[value]=tipValue.value;
                                ObjectTip[currency]=currencyInput.value;
                                ObjectTip[decimal_shift]=decimal_shiftInput.value;
                                amountObject[tip]=ObjectTip;
                                console.log(tokenOption.value)
                                if (tokenOption.value==1){
                                    ObjectToken[value]=tokenValue.value;
                                    ObjectToken[exp_date]=tokenExp.value;
                                    TheRessourceObject[token]=ObjectToken;
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,IdInput.value,tipValue.value,null,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                                }
                                else{
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,IdInput.value,tipValue.value,null,paymentTypeInput.value,null,null])
                                }
                            }
                            else {
                                if (tokenOption.value==1){ 
                                    ObjectToken[value]=tokenValue.value;
                                    ObjectToken[exp_date]=tokenExp.value;
                                    TheRessourceObject[token]=ObjectToken;
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,IdInput.value,null,null,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                                }
                                else{
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,IdInput.value,null,null,paymentTypeInput.value,null,null])
                                }
                            }
                            amountObject[transaction_amount]=Objecttransaction_amount;
                            //-----
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                            TheRessourceObject[clerk_id]=IdInput.value
                            TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[payment_type]=paymentTypeInput.value;
                            fixedataforcesale()
                            TheRessourceObject[amount]=amountObject
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                }
                function stringdataPREAUTHidAD(){
                    fixedata()
                    //TheRessourceObject=new Object
                    //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"preauth_completion\",\"clerk_id\":\"${IdInput.value}\",\"ref_num\":\"${refnumInput.value}\"\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"print_receipt\":true}}}`
                    Objecttransaction_amount[value]=valueInput.value;
                    Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                    Objecttransaction_amount[currency]=currencyInput.value;
                    amountObject[transaction_amount]=Objecttransaction_amount;
                    //-----
                    if (tokenOption.value==1){     
                        ObjectToken[value]=tokenValue.value;
                        ObjectToken[exp_date]=tokenExp.value;
                        TheRessourceObject[token]=ObjectToken;
                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,IdInput.value,null,null,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                    }
                    else{
                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,IdInput.value,null,null,paymentTypeInput.value,null,null])
                    }
                    TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                    TheHeaderObject[flow_id]="577125";
                    TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                    TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                    TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                    TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
                    TheRessourceObject[payment_type]=paymentTypeInput.value;
                    TheRessourceObject[amount]=amountObject
                    TheRessourceObject[clerk_id]=IdInput.value
                    TheRessourceObject[ref_num]=refnumInput.value
                    myObject[header]=TheHeaderObject;
                    myObject[resource]=TheRessourceObject  
                    myFinalObj[request] = myObject;
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
                    tipOption=document.querySelector('#option-tip');
                    tokenOption=document.querySelector('#option-token');
                    tokenValue=document.querySelector('#token-value');
                    tokenExp=document.querySelector('#token-expire');
                    paymentTypeInput=document.querySelector("#payment_type_input");
                    hostApprovalCode=document.querySelector('#host_approval_code_input')
                    //make complexité low 
                    arrayOfFunction=[stringdataSFSR,stringdataSFSR,stringdataSFSR,stringdataVOID,stringdataPREAUTHad,stringdataPREAUTH,stringdataPREAUTHad,stringdataTIP,stringdataBALA,stringdataSFSR]
                    arrayOfString=['force_sale','sale','refund','Void','preauth_completion','preauth','transaction_adjust','tip_adjustment','balance_inquiry','auth_only']
                    stringdata=arrayOfFunction[arrayOfString.indexOf(dropdownMenuButton.innerHTML)]();
    return stringdata
    }
    function fixedataforcesale(){
        if (enableSuspendEventsInput.value=='true' && dropdownMenuButton.innerHTML=="force_sale"){
            TheRessourceObject[host_approval_code]=hostApprovalCode.value;
            getdata[getdata.length-1].push(hostApprovalCode.value)
        }
        
    }
            //-----------------------------------------------------------each function to create the string data with options OFF ------------------------------------------------------------
                        function stringdataSFSR(){
                            fixedata()
                            tipOption=document.querySelector('#option-tip');
                            //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"${dropdownMenuButton.innerHTML}\",\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"enable_suspend_events\":false}}}`;
                            //TheRessourceObject=new Object
                            Objecttransaction_amount[value]=valueInput.value;
                            Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                            Objecttransaction_amount[currency]=currencyInput.value;
                            liste=['refund','auth_only'];
                            if (liste.indexOf(dropdownMenuButton.innerHTML)==-1 && tipOption.value==1 ){
                                    ObjectTip[value]=tipValue.value;
                                    ObjectTip[currency]=currencyInput.value;
                                    ObjectTip[decimal_shift]=decimal_shiftInput.value;
                                    amountObject[tip]=ObjectTip;
                                    if (tokenOption.value==1){
                                        ObjectToken[value]=tokenValue.value;
                                        ObjectToken[exp_date]=tokenExp.value;
                                        TheRessourceObject[token]=ObjectToken;
                                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,tipValue.value,null,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                                    }
                                    else{
                                        getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,tipValue.value,null,paymentTypeInput.value,null,null])
                                    }
                            }
                            else{
                                if (tokenOption.value==1){
                                        
                                    ObjectToken[value]=tokenValue.value;
                                    ObjectToken[exp_date]=tokenExp.value;
                                    TheRessourceObject[token]=ObjectToken;
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,null,null,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                                }
                                else{
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,null,null,null,null,paymentTypeInput.value,null,null])
                                }
                            }

                            amountObject[transaction_amount]=Objecttransaction_amount;
                            //-----
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
                            TheRessourceObject[amount]=amountObject
                            TheRessourceObject[payment_type]=paymentTypeInput.value;
                            fixedataforcesale()
                            console.log(TheRessourceObject)
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                        }
                        function stringdataBALA(){
                            fixedata()
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                            TheRessourceObject[payment_type]=paymentTypeInput.value;
                            if (tokenOption.value==1){     
                                ObjectToken[value]=tokenValue.value;
                                ObjectToken[exp_date]=tokenExp.value;
                                TheRessourceObject[token]=ObjectToken;
                                getdata.push([null,null,null,seeResponse.value,null,null,null,null,paymentTypeInput.value,tokenValue.value,tokenExp.value])

                            }
                            else{
                                getdata.push([null,null,null,seeResponse.value,null,null,null,null,paymentTypeInput.value,null,null])
                            }
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
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
                            if (tokenOption.value==1){     
                                ObjectToken[value]=tokenValue.value;
                                ObjectToken[exp_date]=tokenExp.value;
                                TheRessourceObject[token]=ObjectToken;
                                getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null,null,paymentTypeInput.value,tokenValue.value,tokenExp.value])
                            }
                            else{
                                getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null,null,paymentTypeInput.value,null,null])
                            }
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
                            TheRessourceObject[payment_type]=paymentTypeInput.value;
                            TheRessourceObject[amount]=amountObject
                            TheRessourceObject[ref_num]=refnumInput.value
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                        }
                        function stringdataPREAUTHad(){
                            fixedata()
                            //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"577125\"},\"resource\":{\"txn_type\":\"preauth_completion\",\"ref_num\":\"${refnumInput.value}\"\"amount\":{\"transaction_amount\":{\"value\":${valueInput.value},\"decimal_shift\":${decimal_shiftInput.value},\"currency\":${currencyInput.value}}},\"print_receipt\":true}}}`
                            //TheRessourceObject=new Object
                            Objecttransaction_amount[value]=valueInput.value;
                            Objecttransaction_amount[decimal_shift]=decimal_shiftInput.value;
                            Objecttransaction_amount[currency]=currencyInput.value; 
                            amountObject[transaction_amount]=Objecttransaction_amount;
                            liste=['']
                            //-----
                            if (dropdownMenuButton.innerHTML=='transaction_adjust' && tipOption.value==1 ){
                                ObjectTip[value]=tipValue.value;
                                ObjectTip[currency]=currencyInput.value;
                                ObjectTip[decimal_shift]=decimal_shiftInput.value;
                                amountObject[tip]=ObjectTip;
                                if (liste.indexOf(hostApprovalCode.value)<0){
                                    TheRessourceObject[host_approval_code]=hostApprovalCode.value;
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,tipValue.value,null,null,null,null])
                                    getdata[getdata.length-1].push(hostApprovalCode.value)
                                }
                                else{
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,tipValue.value,null,null,null,null])
                                }
                            }
                            else{
                                if (liste.indexOf(hostApprovalCode.value)<0){
                                    TheRessourceObject[host_approval_code]=hostApprovalCode.value;
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null,null,null,null,null])
                                    getdata[getdata.length-1].push(hostApprovalCode.value)
                                }
                                else{
                                    getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,null,null,null,null,null])
                                }
                            }
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
                            TheRessourceObject[amount]=amountObject
                            TheRessourceObject[ref_num]=refnumInput.value
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                        }
                        function stringdataVOID(){
                            hostApprovalCode=document.querySelector('#host_approval_code_input')
                            fixedata()
                            //TheRessourceObject=new Object
                            //stringdata=`{\"request\":{\"header\":{\"endpoint\":\"/NAR/v1/transaction\",\"flow_id\":\"277555\"},\"resource\":{\"txn_type\":\"void\",\"ref_num\":\"${refnumInput.value}\",\"print_receipt\":true}}}`
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]='void'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
                            TheRessourceObject[ref_num]=refnumInput.value
                            liste=['']
                            if (liste.indexOf(hostApprovalCode.value)<0){
                                TheRessourceObject[host_approval_code]=hostApprovalCode.value;
                                getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null,null,null,null,null])
                                getdata[getdata.length-1].push(hostApprovalCode.value)
                            }
                            else{
                                getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null,null,null,null,null]) 
                            }
                            myObject[header]=TheHeaderObject;
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
                            localStorage.setItem('getdata', JSON.stringify(getdata));
                            return myFinalObj
                        }
                        function stringdataTIP(){
                            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
                            TheHeaderObject[flow_id]="577125";
                            TheRessourceObject[txn_type]='tip_adjustment';
                            TheRessourceObject[enable_suspend_events]=enableSuspendEventsInput.value=='true'
                            TheRessourceObject[print_receipt]=printReceiptInput.value=='true'
                            TheRessourceObject[preformatted_receipt]=preformatted_receipt_input.value=='true'
                            ObjectTip[value]=tipValue.value;
                            ObjectTip[currency]=currencyInput.value;
                            ObjectTip[decimal_shift]=decimal_shiftInput.value;
                            amountObject[tip]=ObjectTip;
                            TheRessourceObject[amount]=amountObject
                            myObject[header]=TheHeaderObject;
                            liste=['']
                            if (liste.indexOf(hostApprovalCode.value)<0){
                                TheRessourceObject[host_approval_code]=hostApprovalCode.value;
                                getdata.push([null,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,tipValue.value,null,null])
                                getdata[getdata.length-1].push(hostApprovalCode.value)
                            }
                            else
                            {
                                getdata.push([null,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,null,tipValue.value,null,null]) 
                            }
                            myObject[resource]=TheRessourceObject  
                            myFinalObj[request] = myObject;
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
                buttonsettelment.disabled=false;
                buttonToken.disabled=false;
                buttonPre.disabled=false;
                buttonrecall.disabled=false;
                buttonreset.disabled=false;
                buttonter.disabled=false;
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
    // we have 2 choise we clear bush with settelment or we send normal request ! 
    var rowp='';
    function sendSetTok(){
        fixedata()
        var modal = document.getElementById("Modal-settlement-token");
        var print_receipt_set=document.getElementById('print-recipt-set');
        if (isOpen(socket) ) {
        TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
        TheHeaderObject[flow_id]="577125";
        TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML
        TheRessourceObject[print_receipt]=print_receipt_set.value=='true';
        myObject[header]=TheHeaderObject;
        myObject[resource]=TheRessourceObject  
        myFinalObj[request] = myObject;
        //getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null])
        socket.send(JSON.stringify(myFinalObj))
        socket.addEventListener("message", function (event) {
            console.log("hello")
            console.log('Message received from server',event.data);
            rep=event.data;
            RecentTable.innerHTML=rep;
        });
        } 
    modal.style.display = "none";
    }
    var rowpres=''
    function reset(){
        console.log("reset")
        fixedata()
        dropdownMenuButton.innerHTML='reset'
        if (isOpen(socket) ) {
            TheHeaderObject[endpoint]=`/NAR/v1/device`;
            TheHeaderObject[flow_id]="577125";
            TheRessourceObject[type]='reset';
            myObject[header]=TheHeaderObject;
            myObject[resource]=TheRessourceObject  
            myFinalObj[request] = myObject;
            //getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null])
            socket.send(JSON.stringify(myFinalObj))
            socket.addEventListener("message", function (event) {
                console.log("hello")
                console.log('Message received from server',event.data);
                rep=event.data;
                RecentTable.innerHTML=rep;
            });
            } 
    }
    var rowpter=''
    function terminal_info(){
        console.log("terminal info")
        fixedata()
        dropdownMenuButton.innerHTML='terminal_info'
        if (isOpen(socket) ) {
            TheHeaderObject[endpoint]=`/NAR/v1/device`;
            TheHeaderObject[flow_id]="577125";
            TheRessourceObject[type]='terminal_info';
            myObject[header]=TheHeaderObject;
            myObject[resource]=TheRessourceObject 
            myFinalObj=new Object; 
            myFinalObj[request] = myObject;
            //getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null])
            socket.send(JSON.stringify(myFinalObj))
            socket.addEventListener("message", function (event) {
                console.log("hello")
                console.log('Message received from server',event.data);
                rep=event.data;
                RecentTable.innerHTML=rep;
            });
            } 
    }
    var rowpRec=''

    function recallLast(){
        console.log("recall last ")
        fixedata()
        dropdownMenuButton.innerHTML='recall_last'
        if (isOpen(socket) ) {
            TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
            TheHeaderObject[flow_id]="577125";
            TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML;
            myObject[header]=TheHeaderObject;
            myObject[resource]=TheRessourceObject  
            myFinalObj[request] = myObject;
            socket.send(JSON.stringify(myFinalObj))
            socket.addEventListener("message", function (event) {
                console.log("hello")
                console.log('Message received from server',event.data);
                rep=event.data;
                RecentTable.innerHTML=rep;
            });
 
            } 
    }
    var rowpPre='';
    function sendPre(){
        var modal = document.getElementById("Modal-preformatted");
        var name=document.getElementById('name-input');
        if (isOpen(socket) ) {
        TheHeaderObject[endpoint]=`/NAR/v1/transaction`;
        TheHeaderObject[flow_id]="577125";
        TheRessourceObject[txn_type]=dropdownMenuButton.innerHTML;
        TheRessourceObject[preformatted_receipt_name]=name.value
        myObject[header]=TheHeaderObject;
        myObject[resource]=TheRessourceObject  
        myFinalObj[request] = myObject;
        //getdata.push([null,null,null,seeResponse.value,refnumInput.value,null,null])
        socket.send(JSON.stringify(myFinalObj))
        socket.addEventListener("message", function (event) {
            console.log("hello")
            console.log('Message received from server',event.data);
            rep=event.data;
            RecentTable.innerHTML=rep;
        });
        } 

    modal.style.display = "none";
    }
    function send(){
        seeResponse=document.querySelector('#see-response');
        if (isOpen(socket) ) {
            optionInput=document.querySelector('#option-input');
                if (optionInput.value=="None"){
                    stringdata=createstringdataoff()
                }
                else if(optionInput.value=="CLERK"){
                    stringdata=createstringdataID()
                }
                else{
                    stringdata=createstringdataIN()
                }
                socket.send(JSON.stringify(stringdata))
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
        socket.addEventListener("message", data=>{
            data.preventDefault();
            if(seeResponse.value==true){
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
        function balance_inquiry(){

            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='balance_inquiry' 
            line=`    <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-12">
                    <label for="option-input">Option:</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected >None</option>
                        </select>
                    </div>
                </div>
            </div>       
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-12">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- Payment Type input-->   
                            <div class="col-md-12">
                            <label for="payment_type_input">Payment Type</label>
                                <select  class="form-control" id="payment_type_input" aria-label="Default select example">
                                    <option  selected >Credit</option>
                                    <option >Debit</option>
                                </select>
                            </div>
                          
                </div>
                
            </div>`
            linetip=`<!-- ID input-->
            <div class="form-group">
            <div class="row" >
                <div class="col-md-4">
                <label for="option-token">TOKEN:</label>
                <select  class="form-control" id="option-token" aria-label="Default select example" onchange="changeTokenForm()">
                <option value="1">true</option>
                <option value="2" selected>false</option>
                </select>
                </div>
                <!-- ID input-->
                <div class="col-md-4" id="token-col1">
                    <label for="token-value">Token VALUE:</label>
                    <input type="text" id="token-value"  "name="value" class="form-control" >
                </div> 
                <!-- ID input-->
                <div class="col-md-4" id="token-col2">
                    <label for="token_expire">Expire:</label>
                    <input type="text" id="token-expire"  "name="value" class="form-control" >
                </div> 
            </div>
            </div>`
            changeForm.innerHTML=line
            changeFormTip.innerHTML=linetip
            TokenCol1=document.querySelector('#token-col1')
            TokenCol2=document.querySelector('#token-col2')
            TokenCol1.style.display="none";
            TokenCol2.style.display="none";
            optionInput.value='None'
            OurFormChanged()

        }
        function sale(){

            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='sale'
            line=`    <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="option-input">Option:</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option selected >None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="value-input">Amount Value:</label>
                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="currency-input">Currency:</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <label for="decimal_shift-input">Amount:decimal_shift</label>
                            <input type="text" id="decimal_shift-input" name="decimal_shift"  value=2 class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- Payment Type input-->   
                            <div class="col-md-4">
                            <label for="payment_type_input">Payment Type</label>
                                <select  class="form-control" id="payment_type_input" aria-label="Default select example">
                                    <option  selected >Credit</option>
                                    <option >Debit</option>
                                </select>
                            </div>
                          
                </div>
                
            </div>`
            linetip=`<!-- ID input-->
            <div class="form-group">
            <div class="row" id='row-tip'>
                <div class="col-md-4">
                                <label for="option-tip">TIP:</label>
                                <select  class="form-control" id="option-tip" aria-label="Default select example" onchange="changeTipForm()">
                                <option value="1">true</option>
                                <option value="2" selected>false</option>
                                </select>
                 </div> 
                <!-- ID input-->
                <div class="col-md-4" id="tip-col">
                    <label for="tip-value">TIP VALUE:</label>
                    <input type="text" id="tip-value"  "name="value" class="form-control" >
                </div>    
            </div>

            <div class="row" >
                <div class="col-md-4">
                <label for="option-token">TOKEN:</label>
                <select  class="form-control" id="option-token" aria-label="Default select example" onchange="changeTokenForm()">
                <option value="1">true</option>
                <option value="2" selected>false</option>
                </select>
                </div>
                <!-- ID input-->
                <div class="col-md-4" id="token-col1">
                    <label for="token-value">Token VALUE:</label>
                    <input type="text" id="token-value"  "name="value" class="form-control" >
                </div> 
                <!-- ID input-->
                <div class="col-md-4" id="token-col2">
                    <label for="token_expire">Expire:</label>
                    <input type="text" id="token-expire"  "name="value" class="form-control" >
                </div> 
            </div>
            </div>`
            changeFormTip.innerHTML=linetip

            changeForm.innerHTML=line
            TipCol=document.querySelector('#tip-col')
            TipCol.style.display="none";
            TokenCol1=document.querySelector('#token-col1')
            TokenCol2=document.querySelector('#token-col2')
            TokenCol1.style.display="none";
            TokenCol2.style.display="none";
            optionInput.value='None'
            OurFormChanged()
        }
        function preauth_completion(){

            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='preauth_completion'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="option-input">Option:</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected >None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                    <label for="value-input">Amount value</label>

                        <input type="text" id="value-input"name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="currency-input">Currency:</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <label for="decimal_shift-input">Amount:decimal_shift</label>
                            <input type="text" id="decimal_shift-input" name="decimal_shift" class="form-control" value=2 placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- REFNUM input-->
                            <div class="col-md-4">
                                <label for="refnum-input">refnum</label>
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>

                </div>
            </div>
            <div class="form-group">
            <div class="row">

            <div class="col-md-4" id="host">
            <label for="host_approval_code">Host Approval Code</label>
            <input type="text" id="host_approval_code_input" class="form-control" placeholder="host_approval_code">
        </div> 
        </div>
        </div>
            
        </div>
            `
            changeForm.innerHTML=line
            changeFormTip.innerHTML=''
            optionInput.value='None'
            OurFormChanged()

        }
        function preauth(){
            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='preauth'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="option-input">Option</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option selected >None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="value-input">Amount value</label>
                        <input type="text" id="value-input" name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <label for="currency-input">Currency</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                    <label for="decimal_shift-input">Amount:decimal_shift</label>
                    <input type="text" id="decimal_shift-input" name="decimal_shift" value=2 class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- REFNUM input-->
                            <div class="col-md-4">
                            <label for="refnum-input">refnum:</label>
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>
                           
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                <!-- Payment Type input-->   
                <div class="col-md-4">
                <label for="payment_type_input">Payment Type</label>
                    <select  class="form-control" id="payment_type_input" aria-label="Default select example">
                        <option  selected >Credit</option>
                        <option >Debit</option>
                    </select>
                </div>
                </div>
            </div>
            
        </div>
            `
            linetip=`<!-- ID input-->
            <div class="form-group">
    
            <div class="row" >
                <div class="col-md-4">
                <label for="option-token">TOKEN:</label>
                <select  class="form-control" id="option-token" aria-label="Default select example" onchange="changeTokenForm()">
                <option value="1">true</option>
                <option value="2" selected>false</option>
                </select>
                </div>
                <!-- ID input-->
                <div class="col-md-4" id="token-col1">
                    <label for="token-value">Token VALUE:</label>
                    <input type="text" id="token-value"  "name="value" class="form-control" >
                </div> 
                <!-- ID input-->
                <div class="col-md-4" id="token-col2">
                    <label for="token_expire">Expire:</label>
                    <input type="text" id="token-expire"  "name="value" class="form-control" >
                </div> 
            </div>
            </div>`
            changeFormTip.innerHTML=linetip
            changeForm.innerHTML=line
            TokenCol1=document.querySelector('#token-col1')
            TokenCol2=document.querySelector('#token-col2')
            TokenCol1.style.display="none";
            TokenCol2.style.display="none";
            optionInput.value='None'
            OurFormChanged()
        }
        function refund(){

            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='refund'
            line=`    <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="option-input">Option</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option selected >None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="value-input">Amount:Value</label>
                        <input type="text" id="value-input" name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="currency-input">Currency</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <label for="decimal_shift-input">Amount:decimal_shift</label>
                            <input type="text" id="decimal_shift-input" name="decimal_shift" value=2 class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- Payment Type input-->   
                            <div class="col-md-4">
                            <label for="payment_type_input">Payment Type</label>
                                <select  class="form-control" id="payment_type_input" aria-label="Default select example">
                                    <option  selected >Credit</option>
                                    <option >Debit</option>
                                </select>
                            </div>
                     
                </div>
                
            </div>`
            linetip=`<!-- ID input-->
            <div class="form-group">
            <div class="row" >
                <div class="col-md-4">
                <label for="option-token">TOKEN:</label>
                <select  class="form-control" id="option-token" aria-label="Default select example" onchange="changeTokenForm()">
                <option value="1">true</option>
                <option value="2" selected>false</option>
                </select>
                </div>
                <!-- ID input-->
                <div class="col-md-4" id="token-col1">
                    <label for="token-value">Token VALUE:</label>
                    <input type="text" id="token-value"  "name="value" class="form-control" >
                </div> 
                <!-- ID input-->
                <div class="col-md-4" id="token-col2">
                    <label for="token_expire">Expire:</label>
                    <input type="text" id="token-expire"  "name="value" class="form-control" >
                </div> 
            </div>
            </div>`
            changeForm.innerHTML=line
            changeFormTip.innerHTML=linetip
            TokenCol1=document.querySelector('#token-col1')
            TokenCol2=document.querySelector('#token-col2')
            TokenCol1.style.display="none";
            TokenCol2.style.display="none";
            optionInput.value='None'
            OurFormChanged()
        }
        function auth(){
            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='auth_only'
            line=`    <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="option-input">Option</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option selected >None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="value-input">Amount:Value</label>
                        <input type="text" id="value-input" name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="currency-input">Currency</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <label for="decimal_shift-input">Amount:decimal_shift</label>
                            <input type="text" id="decimal_shift-input" name="decimal_shift" value=2 class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- Payment Type input-->   
                            <div class="col-md-4">
                            <label for="payment_type_input">Payment Type</label>
                                <select  class="form-control" id="payment_type_input" aria-label="Default select example">
                                    <option  selected >Credit</option>
                                    <option >Debit</option>
                                </select>
                            </div>
                     
                </div>
                
            </div>`
            linetip=`<!-- ID input-->
            <div class="form-group">
            <div class="row" >
                <div class="col-md-4">
                <label for="option-token">TOKEN:</label>
                <select  class="form-control" id="option-token" aria-label="Default select example" onchange="changeTokenForm()">
                <option value="1">true</option>
                <option value="2" selected>false</option>
                </select>
                </div>
                <!-- ID input-->
                <div class="col-md-4" id="token-col1">
                    <label for="token-value">Token VALUE:</label>
                    <input type="text" id="token-value"  "name="value" class="form-control" >
                </div> 
                <!-- ID input-->
                <div class="col-md-4" id="token-col2">
                    <label for="token_expire">Expire:</label>
                    <input type="text" id="token-expire"  "name="value" class="form-control" >
                </div> 
            </div>
            </div>`
            changeForm.innerHTML=line
            changeFormTip.innerHTML=linetip
            TokenCol1=document.querySelector('#token-col1')
            TokenCol2=document.querySelector('#token-col2')
            TokenCol1.style.display="none";
            TokenCol2.style.display="none";
            optionInput.value='None'
            OurFormChanged()
        }
        function Void(){
            events.style.display="none"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='Void'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <label for="option-input">Option</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected> None</option>
                        </select>

                    </div>
                    <!-- REFNUM input-->
                            <div class="col-md-4">
                                <label for="refnum-input">ref_num</label>
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>

                </div>  
            </div>
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <div class="col-md-4" id="host">
                            <label for="host_approval_code">Host Approval Code</label>
                            <input type="text" id="host_approval_code_input" class="form-control"  placeholder="host_approval_code">
                        </div> 
                </div>
            </div>`
            changeForm.innerHTML=line
            changeFormTip.innerHTML=''
            optionInput.value='None'
            OurFormChanged()
        }
        function forceSale(){
            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='force_sale'
            line=`    <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <label for="option-input">Option</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option>CLERK</option>
                            <option>INVOICE</option>
                            <option selected >None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label "value-input">Amount:Value</label>
                        <input type="text" id="value-input" name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="currency-input">Currency</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                    <label for="decimal_shift-input">Amount:decimal_shift</label>

                            <input type="text" id="decimal_shift-input" name="decimal_shift" value=2 class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row" >
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                        <!-- Payment Type input-->   
                            <div class="col-md-4">
                            <label for="payment_type_input">Payment Type</label>
                                <select  class="form-control" id="payment_type_input" aria-label="Default select example">
                                    <option  selected >Credit</option>
                                    <option >Debit</option>
                                </select>
                            </div>
                </div>
                
            </div>`
            linetip=`<!-- ID input-->
            <div class="form-group">
            <div class="row" id='row-tip'>
                <div class="col-md-4">
                                <label for="option-tip">TIP:</label>
                                <select  class="form-control" id="option-tip" aria-label="Default select example" onchange="changeTipForm()">
                                <option value="1">true</option>
                                <option value="2" selected>false</option>
                                </select>
                 </div> 
                <!-- ID input-->
                <div class="col-md-4" id="tip-col">
                    <label for="tip-value">TIP VALUE:</label>
                    <input type="text" id="tip-value"  "name="value" class="form-control" >
                </div>    
            </div>

            <div class="row" >
                <div class="col-md-4">
                <label for="option-tip">TOKEN:</label>
                <select  class="form-control" id="option-token" aria-label="Default select example" onchange="changeTokenForm()">
                <option value="1">true</option>
                <option value="2" selected>false</option>
                </select>
                </div>
                <!-- ID input-->
                <div class="col-md-4" id="token-col1">
                    <label for="token-value">Token VALUE:</label>
                    <input type="text" id="token-value"  "name="value" class="form-control" >
                </div> 
                <!-- ID input-->
                <div class="col-md-4" id="token-col2">
                    <label for="token_expire">Expire:</label>
                    <input type="text" id="token-expire"  "name="value" class="form-control" >
                </div> 
            </div>
            </div>`
            changeFormTip.innerHTML=linetip
            changeForm.innerHTML=line
            TipCol=document.querySelector('#tip-col')
            TipCol.style.display="none";
            TokenCol1=document.querySelector('#token-col1')
            TokenCol2=document.querySelector('#token-col2')
            TokenCol1.style.display="none";
            TokenCol2.style.display="none";
            optionInput.value='None'
            OurFormChanged()

        }
        function transaction_adjust(){

            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='transaction_adjust'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="option-input">Option</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected >None</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="value-input">Amount:value</label>
                        <input type="text" id="value-input" name="value" class="form-control" placeholder="Amount value">
                    </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="currency-input">Currency</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <label for="decimal_shift-input">Amount:decimal_shift</label>
                            <input type="text" id="decimal_shift-input" name="decimal_shift" value=2 class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <!-- REFNUM input-->
                            <div class="col-md-4">
                                <label for="refnum-input">ref_num</label>
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>
                           
                </div>
            </div>
            <div class="form-group">
            <div class="row">

            <div class="col-md-4" id="host">
            <label for="host_approval_code">Host Approval Code</label>
            <input type="text" id="host_approval_code_input" class="form-control" placeholder="host_approval_code">
        </div> 
        </div>
        </div>

        </div>
            `
            changeForm.innerHTML=line
            linetip=`<!-- ID input-->
            <div class="row" id='row-tip'>
            <div class="col-md-4">
                                <label for="option-tip">TIP:</label>
                                <select  class="form-control" id="option-tip" aria-label="Default select example" onchange="changeTipForm()">
                                <option value="1">true</option>
                                <option value="2" selected >false</option>
                                </select>
            </div> 
            <!-- ID input-->
            
            <div class="col-md-4" id="tip-col">
                  <label for="tip-value">TIP VALUE:</label>
                  <input type="text" id="tip-value"  "name="value" class="form-control" >
            </div> 
            
                
            </div>`
            changeFormTip.innerHTML=linetip
            changeForm.innerHTML=line
            TipCol=document.querySelector('#tip-col')
            TipCol.style.display="none";
            optionInput.value='None'
            OurFormChanged()
        }
        function tip_adjustment(){
            events.style.display="block"
            enableSuspendEventsInput.value='false'
            dropdownMenuButton.innerHTML='tip_adjustment'
            line=`   <!--  option -->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <label for="option-input">Option</label>
                        <select name="CLERK OPTION" id="option-input" class="form-control" aria-label="Default select example" onchange="OurFormChanged()">
                            <option selected >None</option>
                        </select>
                    </div>
                    <!-- REFNUM input-->
                            <div class="col-md-4">
                                <label for="refnum-input">refnum</label>
                                <input type="text" id="refnum-input" name="value" class="form-control" placeholder="ref_num">
                            </div>

                </div>
                
                
            </div>
            <!-- Decimal_shift! and Currency ! input-->
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                    <label for="currency-input">Currency</label>
                        <select name="currency" id="currency-input" class="form-control" aria-label="Default select example">
                            <option value="124">CAN</option>
                            <option value="840" selected >US</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                            <label for="decimal_shift-input">Amount:decimal_shift</label>
                            <input type="text" id="decimal_shift-input" name="decimal_shift" value=2 class="form-control" placeholder="Amount:decimal_shift">
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <div class="row">
                        <!-- See Response input-->   
                            <div class="col-md-4">
                            <label for="see-response">See Response</label>
                                <select  class="form-control" id="see-response" aria-label="Default select example">
                                    <option value="1" selected >true</option>
                                    <option value="2">false</option>
                                </select>
                            </div>
                            <div class="col-md-4" id="host">
                            <label for="host_approval_code">Host Approval Code</label>
                            <input type="text" id="host_approval_code_input" class="form-control" placeholder="host_approval_code">
                        </div> 
                           
                </div>
            </div>
            
        </div>
            `
            changeForm.innerHTML=line
            linetip=`<!-- ID input-->
            <div class="row" id='row-tip'>
             
            <!-- ID input-->
            
            <div class="col-md-4" id="tip-col">
                  <label for="tip-value">TIP VALUE:</label>
                  <input type="text" id="tip-value"  "name="value" class="form-control" >
            </div> 
            
                
            </div>`
            changeFormTip.innerHTML=linetip
            optionInput.value='None'
            OurFormChanged()
        }
       
//--------------------------------------------------Get Data function -------------------------------------------------------------------------------
    // we get everythink! !
    function getdatafromhistory(i){
        msgInput1.value=historydata[i].url
        dropdownMenuButton.innerHTML=historydata[i].type;
        arrayOfgetdata=[getReqSRFS,getReqSRFS,getReqSRFS,getReqVoid,getReqpreauthcomp,getReqpreauth,getReqpreauthcomp,getReqTip, getReqBalance,getReqSRFS]
        arrayOfFunction=[forceSale,sale,refund,Void,preauth_completion,preauth,transaction_adjust,tip_adjustment,balance_inquiry,auth]
        arrayOfString=['force_sale','sale','refund','Void','preauth_completion','preauth','transaction_adjust','tip_adjustment','balance_inquiry','auth_only']
        arrayOfFunction[arrayOfString.indexOf(dropdownMenuButton.innerHTML)]();
        arrayOfgetdata[arrayOfString.indexOf(dropdownMenuButton.innerHTML)](i);
    }
    //------------------------------------------------------------------PUT DATA Function ! ----------------------------------------------------------------------------
    //getdata.push([valueInput.value,decimal_shiftInput.value,currencyInput.value,seeResponse.value,refnumInput.value,idInput.value,tipValue.value,invoiceInput.value])
    //get request data 
    //get the void data
    function getReqVoid(i){ 
        refnumInput=document.querySelector('#refnum-input');
        seeResponse=document.querySelector('#see-response');
        PasswordInput=document.querySelector('#password-input');
        optionInput=document.querySelector('#option-input');
        hostApprovalCodeInput=document.querySelector("#host_approval_code_input")
        refnumInput.value=getdata[i][4]
        seeResponse.value=getdata[i][3]
        if (getdata[i][11]!=null){
            hostApprovalCodeInput.value=getdata[i][11];
        }
    }
    function getReqBalance(i){ 
        seeResponse=document.querySelector('#see-response');
        PasswordInput=document.querySelector('#password-input');
        optionInput=document.querySelector('#option-input');
        tipOption=document.querySelector('#option-tip');
        tokenOption=document.querySelector('#option-token');
        tokenValue=document.querySelector('#token-value');
        tokenExp=document.querySelector('#token-expire');
        paymentTypeInput=document.querySelector("#payment_type_input")
        paymentTypeInput.value=getdata[i][8]
        seeResponse.value=getdata[i][3]
        if(getdata[i][9]!=null && getdata[i][10]!=null){
            tokenOption.value=1;
            changeTokenForm();
            tokenValue.value=getdata[i][9]
            tokenExp.value=getdata[i][10]
        }

    }
    function getReqTip(i){
        refnumInput=document.querySelector('#refnum-input');
        optionInput=document.querySelector('#option-input');
        decimal_shiftInput=document.querySelector('#decimal_shift-input');
        currencyInput=document.querySelector('#currency-input');
        seeResponse=document.querySelector('#see-response');
        tipValue=document.querySelector('#tip-value');
        tipOption=document.querySelector('#option-tip');
        hostApprovalCodeInput=document.querySelector("#host_approval_code_input")
        refnumInput.value=getdata[i][4]
        decimal_shiftInput.value=getdata[i][1]
        currencyInput.value=getdata[i][2]
        seeResponse.value=getdata[i][3]
        tipValue.value=getdata[i][6]
        if (getdata[i][11]!=null){
            hostApprovalCodeInput.value=getdata[i][11];
        }
    }
    //get the sale , refund , force-sale data 
    function fixehostdata(i){
        if (getdata[i][11]!=null){
            console.log(i)
            enableSuspendEventsInput.value=true;
            showHostApp()
            hostApprovalCodeInput.value=getdata[i][11];
        }
    }
    function fixeoptiondata(i){
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
    function getReqSRFS(i){
        host.style.display = "none";
        valueInput=document.querySelector('#value-input');
        optionInput=document.querySelector('#option-input');
        decimal_shiftInput=document.querySelector('#decimal_shift-input');
        currencyInput=document.querySelector('#currency-input');
        seeResponse=document.querySelector('#see-response')
        IdInput=document.querySelector('#id-input');
        tipValue=document.querySelector('#tip-value');
        tipOption=document.querySelector('#option-tip');
        tokenOption=document.querySelector('#option-token');
        tokenValue=document.querySelector('#token-value');
        tokenExp=document.querySelector('#token-expire');
        enableSuspendEventsInput=document.querySelector("#enable-Suspend-Events-Input")
        hostApprovalCodeInput=document.querySelector("#host_approval_code_input")
        paymentTypeInput=document.querySelector("#payment_type_input")
        valueInput.value=getdata[i][0]
        decimal_shiftInput.value=getdata[i][1]
        currencyInput.value=getdata[i][2]
        seeResponse.value=getdata[i][3]
        paymentTypeInput.value=getdata[i][8]
        fixehostdata(i)
        fixeoptiondata(i)
        if (dropdownMenuButton.innerHTML!='refund'){
            if (getdata[i][6]!=null){
                tipOption.value=1;
                changeTipForm();
                tipValue.value=getdata[i][6]
            }
        }
        if(getdata[i][9]!=null && getdata[i][10]!=null){
            tokenOption.value=1;
            changeTokenForm();
            tokenValue.value=getdata[i][9]
            console.log(getdata[i][10])
            tokenExp.value=getdata[i][10]
        }
    }
    function getReqpreauthcomp(i){
        optionInput=document.querySelector('#option-input');
        valueInput=document.querySelector('#value-input');
        decimal_shiftInput=document.querySelector('#decimal_shift-input');
        currencyInput=document.querySelector('#currency-input');
        refnumInput=document.querySelector('#refnum-input');
        seeResponse=document.querySelector('#see-response');
        tipValue=document.querySelector('#tip-value');
        tipOption=document.querySelector('#option-tip');
        hostApprovalCodeInput=document.querySelector("#host_approval_code_input")
        valueInput.value=getdata[i][0]
        decimal_shiftInput.value=getdata[i][1]
        currencyInput.value=getdata[i][2]
        seeResponse.value=getdata[i][3]
        refnumInput.value=getdata[i][4]
        if (dropdownMenuButton.innerHTML=='transaction_adjust'){
            if (getdata[i][6]!=null){
                tipOption.value=1;
                changeTipForm();
                tipValue.value=getdata[i][6]
            }
        }
        if (getdata[i][11]!=null){
            hostApprovalCodeInput.value=getdata[i][11];
        }
        optionInput.value='None'
        OurFormChanged()
        
            
    }
    function getReqpreauth(i){
        optionInput=document.querySelector('#option-input');
        valueInput=document.querySelector('#value-input');
        decimal_shiftInput=document.querySelector('#decimal_shift-input');
        currencyInput=document.querySelector('#currency-input');
        refnumInput=document.querySelector('#refnum-input');
        seeResponse=document.querySelector('#see-response');
        tipValue=document.querySelector('#tip-value');
        tipOption=document.querySelector('#option-tip');
        tokenOption=document.querySelector('#option-token');
        tokenValue=document.querySelector('#token-value');
        tokenExp=document.querySelector('#token-expire');
        paymentTypeInput=document.querySelector("#payment_type_input")
        valueInput.value=getdata[i][0]
        decimal_shiftInput.value=getdata[i][1]
        currencyInput.value=getdata[i][2]
        seeResponse.value=getdata[i][3]
        refnumInput.value=getdata[i][4]
        paymentTypeInput.value=getdata[i][8]
        fixeoptiondata(i)
        if(getdata[i][9]!=null && getdata[i][10]!=null){
            tokenOption.value=1;
            changeTokenForm();
            tokenValue.value=getdata[i][9]
            console.log(getdata[i][10])
            tokenExp.value=getdata[i][10]
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
    
    function changeTipForm(){
        tipOption=document.querySelector('#option-tip');
        TipCol=document.querySelector('#tip-col')
        if (tipOption.value==1){
            TipCol.style.display = "block";
        }
        else{
            TipCol.style.display="none";
        }

    }
    
    function changeTokenForm(){
        tokenOption=document.querySelector('#option-token');
        TokenCol1=document.querySelector('#token-col1')
        TokenCol2=document.querySelector('#token-col2')
        if (tokenOption.value==1){
            TokenCol1.style.display = "block";
            TokenCol2.style.display = "block";

        }
        else{
            TokenCol1.style.display="none";
            TokenCol2.style.display = "none";

        }

    }
    function showHostApp(){
        var enableSuspendEventsInput=document.querySelector("#enable-Suspend-Events-Input")
        if (enableSuspendEventsInput.value=='true' && dropdownMenuButton.innerHTML=="force_sale"){
            host.style.display = "block";
        }
        else{
            host.style.display = "none";
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
//-------------------------------------Modal for get_preformatted_receipt -----------------------------------------------------------------------
function modalGetPR(){
    dropdownMenuButton.innerHTML='get_preformatted_receipt'
    var modal = document.getElementById("Modal-preformatted");
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
function closePre(){
    var modal = document.getElementById("Modal-preformatted");
    modal.style.display = "none";
}
//------------------------------------------------Settlement and token modal --------------------------------------------------------------------------
function modalSettlement(){
    dropdownMenuButton.innerHTML='settlement'
    var modal = document.getElementById("Modal-settlement-token");
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
function modalToken(){
    dropdownMenuButton.innerHTML='token_request'
    var modal = document.getElementById("Modal-settlement-token");
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

function closeSettlementToken(){
    var modal = document.getElementById("Modal-settlement-token");
    modal.style.display = "none";
}
//-------------------------------------------------- look up modal ! -------------------------------------------------------------
function modalTransaction(){
    reloadmodel()
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");

    modalBody.innerHTML=`<p> {<br>

        <input class="inputmodal" id="request" ></input>:{<br>
     
            <input class="inputmodal" id="header" ></input>:{<br>
     
                <input class="inputmodal" id="endpoint" ></input>:"/NAR/v1/transaction",<br>
     
                <input class="inputmodal" id="flow_id" ></input>:"577125"},
                <br>
     
           <input class="inputmodal" id="resource" ></input>:{<br>
            <input class="inputmodal" id="clerk_id" ></input>:'number',<br>
            <input class="inputmodal" id="invoice" ></input>:'number',<br>
            <input class="inputmodal" id="ref_num" ></input>:"type",<br>
            <input class="inputmodal" id="txn_type" ></input>:"type",<br>
     
            <input class="inputmodal" id="amount" ></input>:{<br>
                <input class="inputmodal" id="tip" ></input>:{<input class="inputmodal" id="tip-value" ></input>:'number', <input class="inputmodal" id="tip-decimal_shift" ></input>:'number', <input class="inputmodal" id="tip-currency" ></input>:'number'}<br>
                <input class="inputmodal" id="transaction_amount" ></input>:{<input class="inputmodal" id="value" ></input>:'number', <input class="inputmodal" id="decimal_shift" ></input>:'number', <input class="inputmodal" id="currency" ></input>:'number'}<br>
     
              },<br>
     
              <input class="inputmodal" id="enable_suspend_events" ></input>:true<br>
              <input class="inputmodal" id="print_receipt" ></input>:true<br>
              <input class="inputmodal" id="preformatted_receipt" ></input>:true<br>
              <input class="inputmodal" id="payment-type" ></input>:true<br>
              
     
           }
     
        }
     
     }</p>`
     modalFooter.innerHTML=`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closemodal()">Close</button>
     <button type="button" class="btn btn-primary" onclick="changeSkeltonTransaction()">Save changes</button>`
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
     var ref_num=document.getElementById("ref_num");
     var performatted=document.getElementById('preformatted_receipt')
     var payment=document.getElementById("payment-type")
     //send data to frontend !
     payment.value=skeleton.payment_type
     performatted.value=skeleton.preformatted_receipt
     ref_num.value=skeleton.ref_num;
     tip.value=skeleton.tip;
     tipCurrency.value=skeleton.currency;
     tipValue.value=skeleton.value;
     tipeDecimal_shift.value=skeleton.decimal_shift;
     amount.value=skeleton.amount;
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
     decimal_shift.value=skeleton.decimal_shift;
     print_receipt.value=skeleton.print_receipt;
}
function modalDevice(){
    reloadmodel()
    var modalBody = document.getElementById("modal-body");
    var modalFooter = document.getElementById("modal-footer");

    modalBody.innerHTML=`<p> {<br>

        <input class="inputmodal" id="request" ></input>:{<br>
     
            <input class="inputmodal" id="header" ></input>:{<br>
     
                <input class="inputmodal" id="endpoint" ></input>:"/NAR/v1/device",<br>
     
                <input class="inputmodal" id="flow_id" ></input>:"577125"<br>
           },<br>
           <input class="inputmodal" id="resource" ></input>:{<br>

            <input class="inputmodal" id="type" ></input>:"type",<br>
              <input class="inputmodal" id="enable_suspend_events" ></input>:true<br>
              <input class="inputmodal" id="print_receipt" ></input>:true<br>
           }
     
        }
     
     }</p>`
     modalFooter.innerHTML=`<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closemodal()">Close</button>
     <button type="button" class="btn btn-primary" onclick="changeSkeltonDevice()">Save changes</button>`
     //import data from localhost 
     skeleton= JSON.parse(localStorage.getItem('skeleton'));
     //make front variables with id 
     var flow_id=document.getElementById("flow_id")
     var request = document.getElementById("request");
     var header = document.getElementById("header");
     var endpoint = document.getElementById("endpoint");
     var type = document.getElementById("type");
     var enable_suspend_events = document.getElementById("enable_suspend_events");
     var print_receipt = document.getElementById("print_receipt");
     var resource = document.getElementById("resource");
     //send data to frontend !
     flow_id.value=skeleton.flow_id;
     request.value=skeleton.request;
     header.value=skeleton.header;
     endpoint.value=skeleton.endpoint;
     resource.value=skeleton.resource;
     type.value=skeleton.type;
     enable_suspend_events.value=skeleton.enable_suspend_events;
     print_receipt.value=skeleton.print_receipt;
}
 //----------------------------------------------------------------------------------Change skeleton ! -------------------------------------------------------------------------------------------------------
        function changeSkeltonTransaction(){
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
            var ref_num=document.getElementById("ref_num");
            var performatedReceipt=document.getElementById("preformatted_receipt")
            var payment=document.getElementById("payment-type")
            console.log(performatedReceipt.value)
            skeleton.payment_type=payment.value;
            skeleton.preformatted_receipt=performatedReceipt.value
            skeleton.ref_num=ref_num.value;
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
        function changeSkeltonDevice(){
            var modal = document.getElementById("Modal-sale");
            skeleton= JSON.parse(localStorage.getItem('skeleton'));
            //make front variables with id 
            var flow_id=document.getElementById("flow_id")
            var request = document.getElementById("request");
            var header = document.getElementById("header");
            var endpoint = document.getElementById("endpoint");
            var resource = document.getElementById("resource");
            var type = document.getElementById("type");
            var enable_suspend_events = document.getElementById("enable_suspend_events");
            var print_receipt = document.getElementById("print_receipt");
            skeleton.print_receipt=print_receipt.value
            skeleton.flow_id=flow_id.value;
            skeleton.request=request.value;
            skeleton.header=header.value;
            skeleton.endpoint=endpoint.value;
            skeleton.type=type.value;
            skeleton.resource=resource.value;
            skeleton.enable_suspend_events=enable_suspend_events.value;
            localStorage.setItem('skeleton', JSON.stringify(skeleton));
            modal.style.display = "none";
            alert("the changes has been saved")
        }
        function reloadSkelton(){
            var modal = document.getElementById("Modal-sale");
            skeleton={'request':'request','header':'header','endpoint':'endpoint','flow_id':'flow_id','resource':'resource','txn_type':'txn_type','enable_suspend_events':'enable_suspend_events','clerk_id':'clerk_id','amount':'amount','ref_num':'ref_num','print_receipt':'print_receipt','transaction_amount':'transaction_amount','decimal_shift':'decimal_shift','value':'value','currency':'currency','tip':'tip','invoice':'invoice','type':'type','host_approval_code':'host_approval_code','preformatted_receipt':'preformatted_receipt','preformatted_receipt_name':'preformatted_receipt_name','payment_type':'payment_type','exp_date':'exp_date','token':'token'}
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
            preformatted_receipt_name=skeleton.preformatted_receipt_name
            type=skeleton.type
            //--Amount Object ! 
            amountObject=new Object
            transaction_amount=skeleton.transaction_amount
            //-----Object transaction_amount:
            Objecttransaction_amount=new Object
            value=skeleton.value
            decimal_shift=skeleton.decimal_shift;
            currency=skeleton.currency;
            invoice=skeleton.invoice;
            // tip object:
            ObjectTip=new Object;
            tip=skeleton.tip;
            
       }


/////////////////////////////////



