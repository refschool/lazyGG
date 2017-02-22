// ==UserScript==
// @name        Coliposte Adresse
// @include     https://www.coliposte.fr/entreprises/expedierenligne/adresse.do
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       GM_addStyle
// @grant      GM_xmlhttpRequest   
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

//--- Use jQuery to add the form in a "popup" dialog.
$("body").append ( '                                                          \
    <div id="gmPopupContainer">                                               \
    <form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" --> \
        <input type="text" id="myNumber1" value="">                           \
                                \
                                                                              \
        <p id="myNumberSum">&nbsp;</p>                                        \
        <button id="gmAddNumsBtn" type="button">Send order id</button>  \
        <button id="gmCloseDlgBtn" type="button">Close popup</button>         \
    </form>                                                                   \
    </div>                                                                    \
' );


//--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var A   = $("#myNumber1").val ();
    var C   = parseInt(A, 10);
 
        GM_xmlhttpRequest({
          method: "POST",
          url: "http://www.creatissus.com/grease.php",
          data: "order="+C,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          onload: function(response) {
            var str = response.responseText;
             var obj = JSON.parse(str);
              //alert(obj.lastname + obj.firstname);
              
              //Nom Société
              document.getElementById("senderSocial").value = 'Creatissus';
              //choix civilité
              
                document.getElementById('recipientCivility').selectedIndex = obj.gender;
              
                document.getElementById("recipientName").value = obj.lastname;
                document.getElementById("recipientFirstName").value = obj.firstname;
                
              
                document.getElementById("recipientMail").value = obj.email;
                document.getElementById("recipientConfirmMail").value = obj.email;
                
                //Address
                document.getElementById("recipientAddress2Number").value = obj.number;
                // maxlength = 27
                document.getElementById("recipientAddress2Street").value = obj.street;
                document.getElementById("recipientAddress3").value = obj.address2;
                document.getElementById("recipientAddress4").value = '';
                document.getElementById("receiverZipCode").value = obj.postcode;
                
                document.getElementById("destVilleText").value = obj.city;
              
                //checkbox send email to receiver
                document.getElementById("infoRecipient").checked = true;
                
               
            }
          
        });
   
});

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );


//--- CSS styles make it work...
GM_addStyle ( "                                                 \
    #gmPopupContainer {                                         \
        position:               fixed;                          \
        top:                    30%;                            \
        left:                   20%;                            \
        padding:                2em;                            \
        background:             powderblue;                     \
        border:                 3px double black;               \
        border-radius:          1ex;                            \
        z-index:                777;                            \
    }                                                           \
    #gmPopupContainer button{                                   \
        cursor:                 pointer;                        \
        margin:                 1em 1em 0;                      \
        border:                 1px outset buttonface;          \
    }                                                           \
" );