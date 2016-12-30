// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: true,
	pushState: true,
    template7Pages: true
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

function sh(){
    //alert("sayHello");
    alert(localStorage.getItem("username"));
    
}

function IntDesc(comp){
    alert("Devanshu is badass!! "+comp);
    alert($("#headBlk").html());
}

////////js from index//////
/////////DOM////////
document.getElementById("loSubmit").addEventListener("click", signIn);
//$(function() {
//alert("opened");
//loadSettings();
//});

function loadSettings(){
    
    alert("logged in as: "+localStorage.username);
    
}
function signIn(){
    var un = $("#username").val();
    var pas = $("#password").val();
    //alert("usrname is: "+un+" pass is: "+pas);
    
    $.ajax({
           type: "POST",
           url: "https://kportals.com/cyberIntern/app/signin.php",
           data: {name: un, pwd: pas},
           success: function(html){
           if(html== 2)    {
           alert("The login information is incorrect.");
           window.location.assign("index.html");
           
           //$("#jobD").html("");
           //$("#jobD").html("<div class=\"swipeout-content item-content\"><div class=\"post_entry\"><div class=\"post_thumb\"><img src=\"images/photos/photo8.jpg\" alt=\"\" title=\"\" /></div><div class=\"post_details\"><h2><a href=\"blog-single.html\">Job Title</a></h2><p>The One and Only DC</p><span class=\"post_date\">24.02.2015</span><span class=\"post_author\">by <a href=\"#\">admin</a></span><span class=\"post_comments\"><a href=\"#\">0</a></span></div><div class=\"post_swipe\"><img src=\"images/swipe_more.png\" alt=\"\" title=\"\" /></div></div></div><div class=\"swipeout-actions-right\"><a href=\"#\" class=\"action1 open-popup\" data-popup=\".popup-social\"><img src=\"images/icons/white/heart.png\" alt=\"\" title=\"\" /></a></div>");
           }
           ///<li class=\"swipeout\" id=\"jobD\"><div class=\"swipeout-content item-content\"><div class=\"post_entry\"><div class=\"post_thumb\"><img src=\"images/photos/photo8.jpg\" alt=\"\" title=\"\" /></div><div class=\"post_details\"><h2><a href=\"blog-single.html\">Job Title</a></h2><p>The One and Only DC</p><span class=\"post_date\">24.02.2015</span><span class=\"post_author\">by <a href=\"#\">admin</a></span><span class=\"post_comments\"><a href=\"#\">0</a></span></div><div class=\"post_swipe\"><img src=\"images/swipe_more.png\" alt=\"\" title=\"\" /></div></div></div><div class=\"swipeout-actions-right\"><a href=\"#\" class=\"action1 open-popup\" data-popup=\".popup-social\"><img src=\"images/icons/white/heart.png\" alt=\"\" title=\"\" /></a></div></li>////
           else    {
           //window.location="dashboard.php";
           alert("You have successfully logged in. ");
           
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

function IntDesc1(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId){
    //alert("Loading...");
    setTimeout(function() {
               
               intr(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId);
               }, 100);
}

function intr(posi,comp,loc,imSrc,opCount,req,woexp,desc,salD,stuId){
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
}

