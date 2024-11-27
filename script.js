keypad = document.querySelector(".calculator-btns");
calcScreen = document.querySelector("#calculator-screen");
let currentNumber = "0";
let lastOperator = "";
let opCount = 0;
let mem = null;

const numberDictionary = {
  zero: "0", 
  one: "1", 
  two: "2", 
  three: "3", 
  four: "4", 
  five: "5", 
  six: "6",
  seven: "7", 
  eight: "8", 
  nine: "9", 
  point: ".", 
  "0": "0", 
  "1": "1", 
  "2": "2",
  "3": "3", 
  "4": "4", 
  "5": "5", 
  "6": "6", 
  "7": "7", 
  "8": "8", 
  "9": "9",
  ".": ".", 
  "+": "addition", 
  "-": "minus", 
  "x": "multiply", 
  "*": "multiply", 
  "/": "divide",
  "Backspace": "Backspace",
  "=": "equals",
};

const operators = ['+', '-', 'x', '/','*'];
const functions = ['Backspace'];

//know if we have a number in memory, and if so, we need to perform the operation with the stored number in mind
const memSave = () => {

  if (!isNaN(parseFloat(currentNumber)))
  {
    if (mem === null){
      mem = parseFloat(currentNumber);

    }else if(lastOperator !== ""){
  
      if (lastOperator === "divide" && currentNumber === "0")
        {
          mem = "bruh";
        }
      else
        {
          mem = operation(lastOperator,mem,parseFloat(currentNumber));
        }
    }
  }
  
}
//format the answer to fit the screen
const formatAnswer = (ans) => {

  const absAns = Math.abs(ans); // Get the absolute value for checks

  // Determine when to use exponential notation
  if (absAns >= 1e14 || (absAns > 0 && absAns < 1e-14)) {
    // Use exponential notation with up to 10 digits for mantissa
    ans = ans.toExponential(10);
  }
//missing case when number exceeds 10 digits but has no decimal point or e
  if (ans.toString().length > 10){

    console.log("length exceeded");

    if (!ans.toString().includes("e") && !ans.toString().includes(".")){
      ans = ans.toExponential(10);
    }

    if (ans.toString().includes("e")){
      let [int,decimal] = ans.toString().split(".");
      let [middle,exp] = decimal.split("e");
      let remainingLength = 10 - int.length - exp.length - 2;
      middle = middle.slice(0,remainingLength);
      ans = int + "." + middle + "e" + exp;
    }
    else if (ans.toString().includes(".")){
      
      let [int,decimal] = ans.toString().split(".");
      let remainingLength = 10 - int.length - 1;
      decimal = decimal.slice(0,remainingLength);
      ans = int + "." + decimal;
    }
  }
  return ans.toString();
  
}
//perform an operation
const operation = (op,num1,num2) => {
  let ans = null;
  switch (op) {
    case "addition":
      ans = num1 + num2;
      break;
    case "minus":
      ans = num1 - num2;
      break;
    case "multiply":
      ans = num1 * num2;
      break;
    case "divide":
      ans = num1 / num2;
      break;
  }
  return ans;
}
//know what operation we are performing and how it affects the memory and the screen
const operator = (op) => {

  opCount += 1;

  if (currentNumber !== ""){
    memSave();
    currentNumber="";
  }
   // we display what is in memory after consecutive operations
   if (opCount > 1){
    if (mem !== null){
      calcScreen.textContent = formatAnswer(mem);
      }
    }
  lastOperator = op;
}
//clear the screen and the memory
const clear = () => {
  currentNumber = "0";
  lastOperator = "";
  opCount = 0;
  calcScreen.textContent = "0";
  mem = null;
}
//display the answer
const equals = () => {
  
  memSave();

  if (mem === "bruh"){
    calcScreen.textContent = "bruh"
  }else{
    if (mem !== null){
      calcScreen.textContent = formatAnswer(mem);
    }
  }
  currentNumber = "";
  lastOperator = "";
  opCount = 0;  
}
//type a number or a decimal point
const typeChar = (char) => {

  if (currentNumber.length < 10){

    if (char === "point"){
      if (!currentNumber.includes(".")){

        if (currentNumber === "")
          {
            currentNumber += "0";
          }
        currentNumber += numberDictionary[char]; 
      }
    }
    else
      {
        if (currentNumber === "0"){
          currentNumber = "";
        }
        currentNumber += numberDictionary[char];
      }

      calcScreen.textContent = currentNumber;
  }
}
//delete a character
const deleteChar = () => {

  if (currentNumber.length === 1){
    currentNumber = "";
    calcScreen.textContent = "0";
  }

  else if (currentNumber !== ""){
    currentNumber = currentNumber.slice(0,-1);
    calcScreen.textContent = currentNumber;
  }
  
}
//calculate the percentage of a number
const percentage = () => {
  if (currentNumber !== ""){
    currentNumber = (parseFloat(currentNumber)/100).toString();
    calcScreen.textContent = currentNumber;
  }
}
//change the sign of a number
const sign = () => {
  if (currentNumber !== ""){
    currentNumber = (parseFloat(currentNumber)*-1).toString();
    calcScreen.textContent = currentNumber;
  }
}
// Function to handle keypress events
function handleKeyPress(event) {
  console.log(event.key);
  if (event.key in numberDictionary) {
    //operator case
    if (operators.includes(event.key)) {
      operator(numberDictionary[event.key]);
    //delete
    }else if (event.key === "Backspace"){
      deleteChar();
    //number
    }else if(event.key === "="){
      equals();
    }
    else{
      typeChar(event.key);
    }
    
  } 
}

keypad.addEventListener("click", function(event) {
  var target = event.target;

  if (target.id in numberDictionary) {
    typeChar(target.id);
  }
  else if (target.id === "ac"){
    clear();
  }
  else if(target.classList.contains("operator")){
    operator(target.id);
  }
  else if(target.id === "equals"){
    equals();
  }
  else if(target.id === "delete"){
    deleteChar();
  }
  else if(target.id === "percent"){
    percentage();
  }
  else if(target.id === "sign"){
    sign();
  }
})

document.addEventListener("keydown", handleKeyPress);
