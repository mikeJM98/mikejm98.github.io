var usernameIsUnique = false;
var submitForm = false;

$().ready(function(){

	/* USERNAME UNIQUE CHECK*/
	$("#userRegister .controls input, #fbRegister .controls input").keypress(function(){
		$(this).parents('.control-group').removeClass('error');
		$(this).siblings('.help-inline').fadeOut(100);
	});

	/*EMAIL FIELDS*/
	$("#inputEmail, #confirmEmail").keypress(function(e){
		$("#emailGroup").removeClass('error');
		$("#emailError").fadeOut(100);
		var ValidPattern = /^[a-zA-Z0-9_.+-@]*$/;
		var char = String.fromCharCode(e.charCode);
		if (!ValidPattern.test(char) && e.charCode!=0){
			e.preventDefault();
			return false;
    }
	})


	/* SUBMIT */
	$("#userRegister").submit(function(){	
		if ( submitForm ){
			return true;
		}

		$("#userRegister").find("input, textarea, select").attr('disabled', 'disabled');
		$("#saveBtn").button('loading');

		var goodToGo = true;
		$.post('/users/checkUniqueUsername?username='+escape($("#username").val()),function(response){
			if ( !response.isUnique ){
				$("#usernameGroup").addClass('error')
				$("#usernameError").html("This username is already taken").fadeIn(100);
				$("#username").focus();
				enableForm();
			} else {
				$('.control-group').removeClass('error');
				$('.controls .help-inline').fadeOut(100);

				var goodToGo=true;
				$("#userRegister").find(".controls input").each(function(){
					if ( goodToGo && $(this).val() == '' ){
						$(this).focus();
						$(this).siblings('.help-inline').html("This field is required").fadeIn(100);
						$(this).parents('.control-group').addClass('error');
						goodToGo = false;
					}
				});
				if ( !goodToGo ){
					enableForm();
					return false;
				}

				if ( $("#inputEmail").val() != $("#confirmEmail").val() ){
					$("#emailGroup").addClass('error').find('input').focus();
					$("#emailError").html("Emails don't match").fadeIn(100);
					enableForm();
					return false;
				}

				var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
				if ( !emailPattern.test($("#inputEmail").val()) ){
					$("#emailGroup").addClass('error').find('input').focus();
					$("#emailError").html("Please enter a valid email address").fadeIn(100);
					enableForm();
					return false;
				}

				if ( $("#inputPassword").val() != $("#confirmPassword").val() ){
					$("#passwordGroup").addClass('error').find('input').focus();
					$("#passwordError").html("Passwords don't match").fadeIn(100);
					enableForm();
					return false;
				}

				submitForm = true;
				$("#userRegister").find("input, textarea, select").removeAttr('disabled');
				$("#userRegister").submit();

			}
		},'json');

		return false;
	})

	var fbSubmitForm = false;
	$("#fbRegister").submit(function(){

		if ( fbSubmitForm ){
			return true;
		}

		if ( jQuery.trim($("#fbUsername").val()) == '' ){
			$("#fbUsernameGroup").addClass('error')
			$("#fbUsernameError").html("Username is required").fadeIn(100);
			$("#fbUsername").focus();
			return false;
		}

		$.post('/users/checkUniqueUsername?username='+escape($("#fbUsername").val()),function(response){
			if ( !response.isUnique ){
				$("#fbUsernameGroup").addClass('error')
				$("#fbUsernameError").html("This username is already taken").fadeIn(100);
				$("#fbUsername").focus();
			} else {
				fbSubmitForm = true;
			}
		},'json');
		return false;
	})
})

function enableForm(){
	$("#userRegister").find("input, textarea, select").removeAttr('disabled');
	$("#saveBtn").button('reset');
}

function fbRegister() {
	$("#userForm").slideUp(100,function(){
		$("#fbLogin").prepend('<h3 id="fbLoading">Logging In With Facebook...</h3>').slideDown(100);
	});
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api('/me', function(response) {
        //if we're currently registered with facebook, log the user in and shoot them to the index page
        $.getJSON('/users/findFbUser?fb_id='+response.id,function(ourResponse){
		  		if ( ourResponse.response ){
		  			window.location = '/';
		  		} else {
		  			$("#fbEmail").val(response.email);
		        $("#fbId").val(response.id);
		        $("#fbUsername").val(response.username);

		        $("#fbLoginForm").fadeIn(100);
		        $("#fbUsername").focus();
		        $("#fbLoading").hide();
		  		}
		  	})
      })
    } else {
      $("#fbLogin").slideUp(100,function(){
      	$("#userForm").slideDown(100);
      })
    }
  },{scope:'email'});
}
