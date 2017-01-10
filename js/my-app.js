/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    
    console.log('Received Event: ' + id);
    
    // start to initialize PayPalMobile library
    app.initPaymentUI();
},
    initPaymentUI : function () {
        var clientIDs = {
            "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
            "PayPalEnvironmentSandbox": "AVhNP3t__OOCZlzqRsFaoWeZ8v_zP2bWTb0JgSJqpCX3z49zQXHkoYDkutt6zK4JVle3f0GsxOAVJ0F0"
        };
        PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
        
    },
    onSuccesfulPayment : function(payment) {
        console.log("payment success: " + JSON.stringify(payment, null, 4));
    },
    // This code is only used for independent card.io scanning abilities
onCardIOComplete: function(card) {
    console.log("Card Scanned success: " + JSON.stringify(card, null, 4));
},
    onAuthorizationCallback : function(authorization) {
        console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment : function () {
        // for simplicity use predefined amount
        // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
        var paymentDetails = new PayPalPaymentDetails("0.99", "0.00", "0.00");
        var payment = new PayPalPayment("0.99", "USD", "Pro Subscription", "Sale", paymentDetails);
        return payment;
    },
    configuration : function () {
        // for more options see `paypal-mobile-js-helper.js`
        var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
        return config;
    },
    onPrepareRender : function() {
        // buttons defined in index.html
        //  <button id="buyNowBtn"> Buy Now !</button>
        //  <button id="buyInFutureBtn"> Pay in Future !</button>
        //  <button id="profileSharingBtn"> ProfileSharing !</button>
        //  <button id="cardScanBtn">Advanced: Use card.io scan only</button>
        var buyNowBtn = document.getElementById("buyNowBtn");
        var buyInFutureBtn = document.getElementById("buyInFutureBtn");
        var profileSharingBtn = document.getElementById("profileSharingBtn");
        var cardScanBtn = document.getElementById("cardScanBtn");
        
        buyNowBtn.onclick = function(e) {
            // single payment
            PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
        };
        
        buyInFutureBtn.onclick = function(e) {
            // future payment
            PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app.onUserCanceled);
        };
        
        profileSharingBtn.onclick = function(e) {
            // profile sharing
            PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], app.onAuthorizationCallback, app.onUserCanceled);
        };
        
        cardScanBtn.onclick = function(e) {
            // card.io scanning independent of paypal payments.
            // This is used for cases where you only need to scan credit cards and not use PayPal as funding option.
            CardIO.scan({
                        "requireExpiry": true,
                        "requireCVV": false,
                        "requirePostalCode": false,
                        "restrictPostalCodeToNumericOnly": true
                        },
                        app.onCardIOComplete,
                        app.onUserCanceled
                        );
        };
    },
    onPayPalMobileInit : function() {
        // must be called
        // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
        PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", app.configuration(), app.onPrepareRender);
    },
    onUserCanceled : function(result) {
        console.log(result);
    }
};

app.initialize();

//////////////////////////////////////////////////////////////
checkLoginStart();
// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: true,
	pushState: true,
    template7Pages: true,
    swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false,
});
$$(document).on('pageInit', function (e) {
  		$(".swipebox").swipebox();
		$(".videocontainer").fitVids();
                
	/* 	$("#ContactForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
		}
		}); 
		

/*		$(".posts li").hide();
		size_li = $(".posts li").size();
		x=3;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+1 <= size_li) ? x+1 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
		});


		*/
	$("a.switcher").bind("click", function(e){
		e.preventDefault();
		
		var theid = $(this).attr("id");
		var theproducts = $("ul#photoslist");
		var classNames = $(this).attr('class').split(' ');
		
		
		if($(this).hasClass("active")) {
			// if currently clicked button has the active class
			// then we do nothing!
			return false;
		} else {
			// otherwise we are clicking on the inactive button
			// and in the process of switching views!

  			if(theid == "view13") {
                         alert(theid);
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_13_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_12");
				theproducts.addClass("photo_gallery_13");

			}
			
			else if(theid == "view12") {
                         alert(theid);
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_12_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_12");

			} 
			else if(theid == "view11") {
                         alert(theid);
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_11_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_12");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_11");

			} 
			
		}

	});	
	
	document.addEventListener('touchmove', function(event) {
	   if(event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1 ) {
		event.preventDefault(); }
	}, false);
	
	// Add ScrollFix
	var scrollingContent = document.getElementById("pages_maincontent");
	new ScrollFix(scrollingContent);
	
	
	var ScrollFix = function(elem) {
		// Variables to track inputs
		var startY = startTopScroll = deltaY = undefined,
	
		elem = elem || elem.querySelector(elem);
	
		// If there is no element, then do nothing	
		if(!elem)
			return;
	
		// Handle the start of interactions
		elem.addEventListener('touchstart', function(event){
			startY = event.touches[0].pageY;
			startTopScroll = elem.scrollTop;
	
			if(startTopScroll <= 0)
				elem.scrollTop = 1;
	
			if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
				elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}, false);
	};
	
		
		
})

function checkLoginStart(){
    //alert("sayHello");
    //alert(localStorage.getItem("studentId"));
    var ca = localStorage.getItem("studentId");
    if(ca != null){
        
        
        popInternlist2(ca);
        
    
    }
}

//var appe = "";
function popInternlist2(stuId){
    
    var toAppend = "";
    $.getJSON("https://www.kportals.com/cyberIntern/app/dbJson.php", function(data){
              
              $.each(data, function(index, value){
                     //alert(value[16]);
                     //////IntDesc: Internship Description.////////
                     toAppend += "<a href=\"job_desc.html\" onclick=\"IntDesc1('"+value.position+"','"+value[17]+"','"+value.location+" "+value[8]+"','"+value[16]+"','"+value.openingcount+"','"+value.requirements+"','"+value.workexp+"','"+value.description+"','"+value.minsalary+" - "+value.maxsalary+"',"+stuId+","+value.idjob+")\"><li class=\"swipeout\"><div class=\"swipeout-content item-content\"><div class=\"post_entry\"><div class=\"post_thumb\"><img src=\""+value[16]+"\" alt=\"\" title=\"\" /></div><div class=\"post_details\"><h2>"+value.position+"</h2><p>"+value[17]+"</p><span class=\"post_date\">24.02.2015</span><span class=\"post_comments\"><a href=\"#\"></a></span></div><div class=\"post_swipe\"><img src=\"images/swipe_more.png\" alt=\"\" title=\"\" /></div></div></div><div class=\"swipeout-actions-right\"><a href=\"#\" class=\"action1 open-popup\" data-popup=\".popup-social\"><img src=\"images/icons/white/heart.png\" alt=\"\" title=\"\" /></a></div></li></a>";
                     
                     });
              //alert(toAppend);
              mainView.loadPage("job_list.html");
              delayer(toAppend);
              //alert("dimag kharab!!!");
              $("#internList").html("");
              $("#internList").html(toAppend);
              
              
              //alert("dimag kharab!!!");
              });
    
}


function delayer(listIt){

    setTimeout(function() {
               
               listPopultor(listIt);
               }, 100);
}


function listPopultor(listIt){
    //alert("Devanshu is badass!! ");
    $("#internList").html("");
    $("#internList").html(listIt);
}

////////js from index//////
/////////DOM////////
document.getElementById("loSubmit").addEventListener("click", signIn);

document.getElementById("signOut").addEventListener("click", signOut);


//$(function() {
//alert("opened");
//loadSettings();
//});

function signUp(){

    //alert("signUp Test");
    
    var fn = $("#fName").val();
    var ln = $("#lName").val();
    var gn = $("#gen").val();
    var dofb = $("#dob").val();
    var eM = $("#eMail").val();
    var uN = $("#uName").val();
    var sP = $("#sPass").val();
    var csP = $("#csPass").val();
    //alert(fn+""+ln+""+gn+""+dofb+""+eM+""+sP+""+csP+""+uN);
    //alert("usrname is: "+un+" pass is: "+pas);
    var spEmail = eM.split(".");
    if(spEmail[spEmail.length-1] == "edu"){
    //    alert(spEmail[spEmail.length-1]);
        
    //////to check if email already exists/////
        var emPresent = 0;
        $.ajax({
               type: "POST",
               url: "https://www.kportals.com/cyberIntern/app/eMailSignupCheck.php",
               data: {eMail: eM},
               success: function(html){
               //alert(html);
               if(html==2){
               alert("This email is already registered.");
               emPresent = 0;
               //window.location.assign("login.html");
               } else if(html == 3){
               
               emPresent = 1;
               
               }
               }
               });
        
        /////////////////email checking done//////////
        
      //////The below code executes only if email does not existes already///////////
        if(emPresent == 1){
    $.ajax({
           type: "POST",
           url: "https://www.kportals.com/cyberIntern/app/signup.php",
           data: {fname: fn, lname: ln, gen: gn, dob: dofb,eMail: eM, uName: uN, pass: sP, cpass: csP},
           success: function(html){
           //alert(html);
           if(html==2){
            alert("Successfully registered. Please login to continue.");
            window.location.assign("login.html");
           }
           }
           });
        }
    } else {alert("Only .edu is accepted");}
    
}


function signOut(){
    
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    localStorage.setItem("studentId", "");
    alert(localStorage.getItem("studentId"));
    
}

function loadSettings(){
    
    alert("logged in as: "+localStorage.username);
    
}
function signIn(){
    var un = $("#username").val();
    var pas = $("#password").val();
   // alert("usrname is: "+un+" pass is: "+pas);
    
    $.ajax({
           type: "POST",
           url: "https://www.kportals.com/cyberIntern/app/signin.php",
           data: {name: un, pwd: pas},
           success: function(html){
           if(html== 2)    {
           //alert(html);
           alert("The login information is incorrect.");
           window.location.assign("index.html");
           
           //$("#jobD").html("");
           //$("#jobD").html("<div class=\"swipeout-content item-content\"><div class=\"post_entry\"><div class=\"post_thumb\"><img src=\"images/photos/photo8.jpg\" alt=\"\" title=\"\" /></div><div class=\"post_details\"><h2><a href=\"blog-single.html\">Job Title</a></h2><p>The One and Only DC</p><span class=\"post_date\">24.02.2015</span><span class=\"post_author\">by <a href=\"#\">admin</a></span><span class=\"post_comments\"><a href=\"#\">0</a></span></div><div class=\"post_swipe\"><img src=\"images/swipe_more.png\" alt=\"\" title=\"\" /></div></div></div><div class=\"swipeout-actions-right\"><a href=\"#\" class=\"action1 open-popup\" data-popup=\".popup-social\"><img src=\"images/icons/white/heart.png\" alt=\"\" title=\"\" /></a></div>");
           }
           ///<li class=\"swipeout\" id=\"jobD\"><div class=\"swipeout-content item-content\"><div class=\"post_entry\"><div class=\"post_thumb\"><img src=\"images/photos/photo8.jpg\" alt=\"\" title=\"\" /></div><div class=\"post_details\"><h2><a href=\"blog-single.html\">Job Title</a></h2><p>The One and Only DC</p><span class=\"post_date\">24.02.2015</span><span class=\"post_author\">by <a href=\"#\">admin</a></span><span class=\"post_comments\"><a href=\"#\">0</a></span></div><div class=\"post_swipe\"><img src=\"images/swipe_more.png\" alt=\"\" title=\"\" /></div></div></div><div class=\"swipeout-actions-right\"><a href=\"#\" class=\"action1 open-popup\" data-popup=\".popup-social\"><img src=\"images/icons/white/heart.png\" alt=\"\" title=\"\" /></a></div></li>////
           else    {
           //window.location="dashboard.php";
           //alert("You have successfully logged in. ");
          //alert("alerting:"+html);
           navigator.notification.alert(
                'You are logged in!!',  // message
                 alertDismissed,         // callback
                'Cyber Interns',            // title
                'Ok'                  // buttonName
                                        );
           ///////Local storage function saveSettings()////
           saveSettings(un,pas,html);
           popInternlist(html);
           }
           }
           });
    //$("#sinBox").html="Sign Out";
    //the latest one
    //toAppend += "<li class=\"swipeout\"><div class=\"swipeout-content item-content\"><div class=\"post_entry\"><div class=\"post_thumb\"><img src=\""+value[16]+"\" alt=\"\" title=\"\" /></div><div class=\"post_details\"><h2><a href=\"job_desc.html\" onclick=\"IntDesc1('"+value.position+"','"+value[17]+"','"+value.location+value[8]+"','"+value[16]+"','"+value.description+"')\">"+value.position+"</a></h2><p>"+value[17]+"</p><span class=\"post_date\">24.02.2015</span><span class=\"post_comments\"><a href=\"#\"></a></span></div><div class=\"post_swipe\"><img src=\"images/swipe_more.png\" alt=\"\" title=\"\" /></div></div></div><div class=\"swipeout-actions-right\"><a href=\"#\" class=\"action1 open-popup\" data-popup=\".popup-social\"><img src=\"images/icons/white/heart.png\" alt=\"\" title=\"\" /></a></div></li>";
    
}

function saveSettings(un,pas,suid){
    
    localStorage.setItem("username", un);
    localStorage.setItem("password", pas);
    localStorage.setItem("studentId", suid);
    //alert("user name: "+localStorage.getItem("username"));
    
}

function IntDesc1(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId,jId){
    //alert("Loading...");
    setTimeout(function() {
               
               intr(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId,jId);
               }, 100);
}
function IntDesc2(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId,jId){
    //alert("Loading...");
    //setTimeout(function() {
               
      //         intr(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId,jId);
        //       }, 100);
}
var selJob = 0;
var studId = 0;
function intr(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId,jId){
    
    $.ajax
    ({
     url: "https://www.kportals.com/cyberIntern/app/check_list.php",
     type : "POST",
     data: {stu_id: stuId, job_id: jId},
     success: function(response)
     {
     //alert(response);
     if(response == 1){
     
     document.getElementById("jList").disabled = true;
     document.getElementById("jList").value = "Already in List";
     
     }
     }
     });
    
    $("#headBlk").html("");
    $("#headBlk").html(posi);
    $("#headBlk2").html("");
    $("#headBlk2").html(comp);
    $("#headBlk3").html("");
    $("#headBlk3").html(loc);
    $("#descrip").html("");
    $("#descrip").html(desc);
    $("#subHead").html("");
    $("#subHead").html(req);
    $("#subHead2").html("");
    $("#subHead2").html(woexp+" years");
    $("#subHead3").html("");
    $("#subHead3").html(opCount);
    $("#salSub").html("");
    $("#salSub").html(salD);
    document.getElementById("imgHolder").src= imSrc;
    selJob = jId;
    studId = stuId;
}


function addList(){

    //alert("Test List");
    document.getElementById("jList").disabled = true;
    document.getElementById("jList").value = "Added to your list";
    //alert(selJob);
    $.ajax
    ({
     url: "https://www.kportals.com/cyberIntern/app/update_list.php",
     type : "POST",
     data: {stu_id: studId, job_id: selJob},
     success: function(response)
     {
     //alert(response);
     }
     });

}

function createMyList(){

    setTimeout(function() {
               
               MylistPopultor(localStorage.getItem("studentId"));
               }, 100);
    
}


function MylistPopultor(sId){

    var x = Number(sId);
    alert("student Id is:"+x);
    $.ajax
    ({
     url: "https://www.kportals.com/cyberIntern/app/checkApply.php",
     type : "POST",
     data: {stu_id: x},
     success: function(response)
     {
     if(response == 0){
        alert(response);
     } else {
        alert("else: "+response);
     match_job(response);
     }
     }
     });
    
}

function match_job(jobId){

    var jobData = jobId.split("|");
    //for(var i=1; i<jobData.length; i++){
    
      //  alert(jobData[i]);
        
   // }
    var stuIds = localStorage.getItem("studentId");
    var toAppender = "";
    $.getJSON("https://www.kportals.com/cyberIntern/app/dbJson.php", function(data){
              
              $.each(data, function(index, value){
                     //alert(value[16]);
                     //////IntDesc: Internship Description.////////
                     for(var i=0; i<jobData.length; i++){
                     if(value.idjob == jobData[i]){
                     toAppender += "<a href=\"job_desc.html\" onclick=\"IntDesc2('"+value.position+"','"+value[17]+"','"+value.location+" "+value[8]+"','"+value[16]+"','"+value.openingcount+"','"+value.requirements+"','"+value.workexp+"','"+value.description+"','"+value.minsalary+" - "+value.maxsalary+"',"+stuIds+","+value.idjob+")\"><li class=\"swipeout\"><div class=\"swipeout-content item-content\"><div class=\"post_entry\"><div class=\"post_thumb\"><img src=\""+value[16]+"\" alt=\"\" title=\"\" /></div><div class=\"post_details\"><h2>"+value.position+"</h2><p>"+value[17]+"</p><span class=\"post_date\">24.02.2015</span><span class=\"post_comments\"><a href=\"#\"></a></span></div><div class=\"post_swipe\"><img src=\"images/swipe_more.png\" alt=\"\" title=\"\" /></div></div></div><div class=\"swipeout-actions-right\"><a href=\"#\" class=\"action1 open-popup\" data-popup=\".popup-social\"><img src=\"images/icons/white/heart.png\" alt=\"\" title=\"\" /></a></div></li></a>";
                     }
                     }
                     
                     });
              //alert(toAppend);
              $("#internLister").html("");
              $("#internLister").html(toAppender);
              });
    
}

function gr(){

    app.initPaymentUI();
    
}

function alertDismissed() {
    // do something
    popup = '.popup.modal-in';
    myApp.closeModal(popup);

}
