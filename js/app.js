$(function() {

  "use strict";
  //Job Role
  var title = $('#title');
  var otherTitle = $('#other-title');

  //T-Shirt Info
  var $color = $('#color');
  var $design = $('#design');

  //Payment Info
  var payement = $("#payment");
  var paypal = $("#paypal");
  var creditcard = $(".credit-card");
  var bitcon = $("#bitcoin");
  // cards
  var regNumbers = /^[0-9]+$/;
  var ccNum = $("#cc-num");
  var ccZip = $("#zip");
  var ccCVV = $("#cvv");

  // global variables
  var errors;
  var errorMessage;

  // Set focus on the first text field:
  $('form:first *:input[type!=hidden]:first').focus();

  // Added style for select menu dropdown
  $('select').css({'background':'#c1deeb', 'height': '30px','width': '40%' });
  $('#color').css({'width': '100%' });
  $('#design').css({'width': '100%' });
  $('#size').css({'width': '100%' });

  // adding div to avoid the layout of forms collapsing from showing the error message
  $("label[for='exp-month']").before(" <div class='clearfix'></div> ");

  //"Job Role" section of the form: reveal a text field when the "Other" option is selected from the
  //"Job Role" drop down menu
  //  Hide "Your Title" field in the drop down
  otherTitle.hide();

  title.change(function() {
    var selected = $(this).val();

    if(selected === 'other'){
      otherTitle.show();
    }
    else {
      otherTitle.hide();
    }
  });

  //"T-Shirt Info" section of the form: for the T-Shirt color menu,
  //only display the options that match the design selected in the "Design" menu.
  //hide the dropdown menu for color section
  $color.hide();
	$('#colors-js-puns > label').hide();

  // create a function for user selection
  $design.change(function() {
    var selected = $(this).val();

    if(selected === 'js puns') {
      //alert('heyy!!');
      $color.children().remove();
      $color.append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');
      $color.append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>');
      $color.append('<option value="gold">Gold (JS Puns shirt only)</option>');
      $('#colors-js-puns > label').show();
      $color.show();

    } else if(selected === 'heart js') {
      $color.children().remove();
      $color.append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');
      $color.append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>');
      $color.append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
      $('#colors-js-puns > label').show();
      $color.show();
    } else {
      $('#colors-js-puns > label').hide();
      $color.hide();
    }
  });

  // "Register for Activities" section of the form:
  //$('.activities input:checkbox').change(function() {
  $('.activities input:checkbox').click(function() {

    // create events for uncheck and checked activities:
  	var selected = $(this).attr('name');
  	var checked = $(this).is(':checked');

    // Disable selection activites if same value of time frame as the selected activity
    if (selected === 'js-frameworks') {
  		$('input[name="express"]').attr('disabled', checked);

  	} else if (selected === 'express') {
      $('input[name="js-frameworks"]').attr('disabled', checked);

    } else if (selected === 'js-libs') {
      $('input[name="node"]').attr('disabled', checked);

    } else if (selected === 'node') {
      $('input[name="js-libs"]').attr('disabled', checked);
    }
  });

  // append div for total amount of each selection
  $('.activities').append('<div class="amountTotal"></div>');

  // call the class to hide
  $('.activities .amountTotal').hide();

  // function to calculate each selection once checked
  $(".activities input:checkbox").click(function() {
     // declare the amount value to sum up total cost
    	var amount = 0;
      // if is not equal
    	$(".activities input[name!='all']:checked").each(function() {
    		amount += 100;
      });
      // all is 200 and the rest is 100
    	$(".activities input[name='all']:checked").each(function() {
    		amount += 200;
    	});

      // sum up the amout value selected in the selections
    	if (amount > 0) {
    		$('.activities .amountTotal').text('$' +amount).show();
      // else hide the amount total
    	} else {
        $('.activities .amountTotal').hide();

    	}
  });

  //"Credit Card" payment option is selected by default
  $('#payment').val('credit card').trigger('change');
  creditcard.show();
  // and hide the "Paypal" and "Bitcoin information.
  paypal.hide();
  bitcon.hide();

  // functin for selecting payment method
  payement.on("change", function() {

    if ($(this).val() === "credit card") {
      creditcard.show();
      paypal.hide();
      bitcon.hide();
      ccNum.focus();
    } else if ($(this).val() === "paypal") {
      creditcard.hide();
      paypal.show();
      bitcon.hide();
    } else if ($(this).val() === "bitcoin") {
      creditcard.hide();
      paypal.hide();
      bitcon.show();
    } else {
      paypal.hide();
      bitcon.hide();
      creditcard.hide();
    }
  });

 // Form validation
$("form button").on("click", function() {

	errors = false;

  //clear previous added class for errors
	$("label").removeClass("errors");
	$("legend").removeClass("errors");
	$("label span").remove("span");
	$("legend p").remove("p");
	$(".error_cc").remove();

	//check name field
  if (!nameField()){
    errors = true;
  }
  //check mail field and then check for correct email format
  if (!emailField()){
    errors = true;
  }
	//check tshirt theme and color
  if(!tshirtInfo()){
    errors = true;
  }
  //check at least one activity must be checked off
  if(!regActivities()){
    errors = true;
  }

	//check for a selected payment method
	if ( !paymentMethod() ){
     errors = true;

     //check if cuser supplied a credit card number,
     //a zip code, and a 3 number CVV value.
     if( !creditCard() ){
        errors = true;
     }
     if( !zipCode()){
        errors = true;
     }
     if( !ccvValidity() ){
        errors = true;
     }
  }
  // return the value
	return !errors;
});

// name information
function nameField(){
  var name = $("#name").val();
  if(name === ""){
	  $("label[for='name']").addClass("errors").append("<span> (please provide your name)</span>");
		return false;
	}
}
// email information
function emailField(){

  var email = $("#mail").val();
  var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === ""){
		$("label[for='mail']").addClass("errors").append("<span> (please provide an email address)</span>");
		return false;

	} else if (!emailRegEx.test(email)){
		$("label[for='mail']").addClass("errors").append( "<span> (please provide a valid email address)</span> ");
		return false;
	}
}
// tshirt info
function tshirtInfo(){

  if ($('#design').val() === 'Select Theme' || $('#color').val() === 'please') {
		  $(".shirt legend").append( "<p class='errors'> Don't forget to pick a T-shirt </p> ");
      $(".shirt .errors").css({'font-size': '.85em'});

	  return false;
	}
}
//Register for Activities
function regActivities(){

  if ($('.activities input:checked').length === 0) {
    $(".activities legend").append( "<p class='errors'> Please select an activity </p> ");
    $(".activities .errors").css({'font-size': '.85em'});

    return false;
  }
}
//Payment Info selection
function paymentMethod(){

  if (payement.val() == 'select_method') {
		  payement.siblings('legend').append( "<p class='errors'> Please choose a payment method </p> ");
      $(".errors").css({'font-size': '.85em'});

      return false;
	}

}
// Credit Card details
function creditCard(){
    var result = ccNum.val();

    // check if the payment info is selected "credit card"
    if ( $("option[value='credit card']").prop('selected') === true ){

        // check the CC numbers input field
        if (result === "" ){
        errorMessage = "Please provide Credit Card number ";

        $("label[for='cc-num']").css('color', '#ff0000');
        $("input[name='user_cc-num']").addClass("error_input");
        $("input[name='user_cc-num']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

          return false;
      }
    else if(!valid_credit_card(result)){
        //console.log("cc value", result);
        errorMessage = "Please enter valid Credit Card number";

        $("label[for='cc-num']").css('color', '#ff0000');
        $("input[name='user_cc-num']").addClass("error_input");
        $("input[name='user_cc-num']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

        return false;
      }
    else {
        $("input[name='user_cc-num']").removeClass("error_input");
        $("label[for='cc-num']").css('color', '#000');

        return true;
      }
    }
} // end of creditCard

// function zipCode(){
function zipCode(){

    // check if the payment info is selected "credit card"
    if ( $("option[value='credit card']").prop('selected') === true ){

    // check the zip input field
    if (ccZip.val() === "" ){
        errorMessage = "Please provide Zip Code";

        $("label[for='zip']").css('color', '#ff0000');
        $("input[name='user_zip']").addClass("error_input");
        $("input[name='user_zip']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

        return false;
    }
    else if ( !regNumbers.test( ccZip.val() ) ){
        errorMessage = "It should be numbers only";

        $("label[for='zip']").css('color', '#ff0000');
        $("input[name='user_zip']").addClass("error_input");
        $("input[name='user_zip']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

        return false;
    }
    else if( (ccZip.val().length) < 6 || (ccZip.val().length) > 6 ){
        errorMessage = "It should only be 6 digits";

        $("label[for='cc-num']").css('color', '#ff0000');
        $("input[name='user_zip']").addClass("error_input");
        $("input[name='user_zip']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

        return false;
    }
    else {
        $("input[name='user_zip']").removeClass("error_input");
        $("label[for='zip']").css('color', '#000');

        return true;
    }
  }
}// end of zipCode

// function for CVV validation
function ccvValidity(){
  // check if the payment info is selected "credit card"

  if ( $("option[value='credit card']").prop('selected') === true ){

      // check the CVV input field
      if (ccCVV.val() === "" ){
        errorMessage = "Please provide Card Verification Value";

        $("label[for='cvv']").css('color', '#ff0000');
        $("input[name='user_cvv']").addClass("error_input");
        $("input[name='user_cvv']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

    		return false;
    	}
      else if( !regNumbers.test( ccCVV.val() ) ){
        errorMessage = "CVV should be numbers only";

        $("label[for='cvv']").css('color', '#ff0000');
        $("input[name='user_cvv']").addClass("error_input");
        $("input[name='user_cvv']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

        return false;
      }
      else if( (ccCVV.val().length) < 3 || (ccCVV.val().length) > 3 ){
        errorMessage = "It should only be 3 digits";

        $("label[for='cvv']").css('color', '#ff0000');
        $("input[name='user_cvv']").addClass("error_input");
        $("input[name='user_cvv']").after( "<div class='error_cc'>"+errorMessage+"</div> ");

        return false;
      }
      else {

        $("input[name='user_cvv']").removeClass("error_input");
        $("label[for='cvv']").css('color', '#000');

         return true;
      }
  }
}

// function for checking valid cc number and this returns true on valid number
function valid_credit_card(value) {
  // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm applied
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
              nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

}); // end of function
