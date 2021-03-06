// Assignment Code
//generate password button object to use for click event listening
var generateBtn = document.querySelector("#generate");
//next buttons to navigate user over steps
var nextBtns = document.querySelectorAll(".next_step");
//checkboxes presenting character type options to the user
var charTypes = document.querySelectorAll(".char_types");

//Set sotarge variables
var lowercase = "abcdefghijklmnopqrstuvwxyz";//lowercasecharset
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";//uppercasecharset
var numeric = "0123456789";//numbers
var special="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";//sepcialcharset
//setting the selected_length varable to store users password length changes
var selected_length = 0;
//setting the char_types array to store user selections
var selected_char_types=[];


//the slider element
var slider = document.getElementById("p_length");
//element to display the selected value to the user 
var length_val = document.getElementById("selected_value");
length_val.innerText = slider.value; // Set the default slider value
selected_length = slider.value; //set the initial slider value
document.getElementById("restart").style.display="none"
// Update the current slider value on drag
slider.oninput = function() {
    //store the user selected value
    selected_length = this.value;
    //change/update the display value with the user's selection
    length_val.innerText = this.value;
}

//work through the chartype selection on change
for (var ch_box of charTypes) {
  ch_box.onchange = function(){
    //on change if this checkbox is checked
    if (this.checked){
      //add the chartype to the array selected_char_types
      selected_char_types.push(this.value)
    }else{
      //if the checkbox was uncheked remove this item from the selected_char_types
      //get the value of the unselected 
      var selected_name = selected_char_types.indexOf(this.value)
      //loop over the current selected_char_types
      for( var i = 0; i < selected_char_types.length; i++){ 
        //using splice to remove the objects based on the value from the selected_char_types array
        if ( selected_char_types[i] === this.value) { 
          selected_char_types.splice(selected_name, 1); 
          //itterate over not just last seen but the entire array
          i--; 
        }
      }
    }
  };
}
//hide all steps function to display the step needed
function hide_all_steps(){
  //get all steps with the class steps
  var steps = document.getElementsByClassName("steps");
  //for loop to go over the steps divs and hide them, using the setAttribute
  for(var step of steps){
    step.setAttribute("style", "display:none;");
  }
}
//inital set all steps to hidden except the user info section with start button
hide_all_steps(); 

function collect_password_criteria(step){
  //get the screen ready, 
  //hide articles hide the start screen clear past validations errors
  //set all steps to hidden when the function is called 
  //then display those needed
  hide_all_steps();
  //keep the app info section hidden for the rest of the steps
  document.getElementById("start").style.display = "none";
  //clear any past validation errors 
  document.getElementById("validation_errors").innerText="";
  //handle the click of the buttons with data-step this data is passed as step
  if (step==1){
    //display the password length article
    document.getElementById("length-cont").style.display="block";
  }else if(step==2){
    //validate the length input to be between 8 and 128
    if (selected_length < 8 || selected_length > 128){
      //display the length article
      document.getElementById("length-cont").style.display="block";
      //write the error into the div
      document.getElementById("validation_errors").innerText="Password Length must be between 8 and 128!";
      //stop the code
      return;
    }
    //validation has passed move to the step 2 of password types
    document.getElementById("pass_types").style.display="block";
  }else{
    //fail all - display error with the code and ask them to contact us
    alert("Something went wrong with the password generation. Please contact us with this error:23232");
  }
}
//function to validate that at least one char type was selected.
function process_types(){
  //check that the char type list is larger then 0
  if (selected_char_types.length>0){
    return true;
  }
  //failed validation return false
  return false;
}

//password generation function
function generatePassword(){
  //setting new fresh value to the variable to store characters from the user selection
  var chars=""
  //variable to store at least one char from the selected charsets
  var at_least_one=""
  //itarate over the array using the awesome new to me "var of array method"
  //to make sure at least one char from their selection exists
  for(var typ of selected_char_types){
    //add the global var values of chars based on selection to the chars
    chars += window[typ];
    //append random char from each selected char type to the at_least_one
    at_least_one+=window[typ].charAt(Math.floor(Math.random() * window[typ].length));
  }
  //add chars from the at_least_one varable before adding more chars
  random_chars = at_least_one;
  //loop over the chars string setting the limit of characters to users selection
  //subtracting the one of character length 
  for (var i = 0; i < selected_length-at_least_one.length; i++) {
    //add random character to the varable
    random_chars += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  //return the string to be displayed to the user
  return random_chars;
}

// Write password to the #password input
function writePassword() {
  //validation of char types failed display error
  if (!process_types()){
    document.getElementById("validation_errors").innerText="Please select at least one char type!"
    return;
  };
  document.getElementById("validation_errors").innerText=""
  //store the password string
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  // alert the password
  document.getElementById("pass_types").style.display="none";
  document.getElementById("start").style.display = "block";
  document.getElementById("result").style.display = "block";
  document.getElementById("statusMessage").innerText=
  "Change Generated Password"
  document.getElementById("restart").style.display = "inline-block";

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//loop over the steps buttons and set click event listener.
for (var button of nextBtns) {
  button.addEventListener('click', function(){
    //get the data-step value
    collect_password_criteria(this.getAttribute("data-step"));
  });
}


