// Assignment Code

var generateBtn = document.querySelector("#generate");
var nextBtns = document.querySelectorAll(".next_step");
var charTypes = document.querySelectorAll(".char_types");

//Set
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numeric = "0123456789"
var special="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
var selected_length = 0
var selected_char_types=[]
var chars=""

var slider = document.getElementById("p_length");
var length_val = document.getElementById("selected_value");

// Update the current slider value on drag
slider.oninput = function() {
    selected_length = this.value
    length_val.innerText = this.value;
}

for (var ch_box of charTypes) {
  ch_box.onchange = function(){
    if (this.checked){
      selected_char_types.push(this.value)
    }else{
      var s_position = selected_char_types.indexOf(this.value)
      for( var i = 0; i < selected_char_types.length; i++){ 
        if ( selected_char_types[i] === this.value) { 
          selected_char_types.splice(s_position, 1); 
          i--; 
        }
      }
    }
  };
}

function hide_all_steps(){
  var steps = document.getElementsByClassName("steps");
  for(var i = 0; i < steps.length; i++){
    steps[i].style.display = "none";
  }
}
length_val.innerText = slider.value; // Set the default slider value
selected_length = slider.value;
hide_all_steps(); //set all steps to hidden

function collect_password_criteria(step){
  //get the screen ready, 
  //hide articles hide the start screen clear past validations errors
  hide_all_steps();//set all steps to hidden
  document.getElementById("start").style.display = "none";//keep the password result section hidden until needed
  document.getElementById("validation_errors").innerText=""
  if (step==1){
    document.getElementById("length-cont").style.display="block";
  }else if(step==2){
    if (selected_length<=8 || selected_length>=128){
      document.getElementById("length-cont").style.display="block"
      document.getElementById("validation_errors").innerText="Password Length must be between 8 and 128!"
      return;
    }
    document.getElementById("pass_types").style.display="block"
  }else{
    alert("Something went wrong with the password generation. Please contact us with this error:23232");
  }
}
function process_types(){
  if (selected_char_types.length>0){
    return true
  }else{
    return false
  }
}
function generatePassword(){
  var chars=""
  var at_least_one=""
  for(var typ of selected_char_types){
    chars+=window[typ];
    at_least_one+=window[typ].charAt(Math.floor(Math.random() * window[typ].length));
  }
  random_chars = at_least_one;
  for (var i = 0; i < selected_length-at_least_one.length; i++) {
    random_chars += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return random_chars;
  
}

// Write password to the #password input
function writePassword() {
  if (!process_types()){
    document.getElementById("validation_errors").innerText="Please select at least one char type!"
    return;
  };
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
  document.getElementById("start").style.display="block"
  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

for (var button of nextBtns) {
  button.addEventListener('click', function(){
    collect_password_criteria(this.getAttribute("data-step"));
  });
}


