const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

/* Global variables */
let passOne = document.getElementById("pass-one");
let passTwo = document.getElementById("pass-two");
let btn = document.getElementById("pass-btn");

const letters = [];
const numbers = [];
const symbols = [];

// Split of characters array into different types of items using ASCII code: https://www.ascii-code.com/
characters.filter( (item) => {
    if (item.charCodeAt(0) > 47 && item.charCodeAt(0) < 58) {
        numbers.push(item);
    } else if (item.charCodeAt(0) > 64 && item.charCodeAt(0) < 91 || item.charCodeAt(0) > 96 && item.charCodeAt(0) < 123) {
        letters.push(item);
    } else {
        symbols.push(item);
    }
});

btn.addEventListener("click", () => {
    let length = document.getElementById("length").value;
    let type = document.getElementById("type").value;
    const finalArray = selectableArray(type);
    showIcons();
    passOne.textContent = generatePassword(length, finalArray);
    passTwo.textContent = generatePassword(length, finalArray);
});

// Function to define the array to use for the password
function selectableArray(typeSelection) {
    if (typeSelection === "letters-numbers-symbols") {
        return characters;
    } else if (typeSelection === "letters-numbers") {
        return [...letters, ...numbers];
    } else if (typeSelection === "letters-symbols") {
        return [...letters, ...symbols];
    } else {
        return letters;
    }
};

// Function to generate a random character
function randomCharacter(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to loop and concatenate character
function generatePassword(passwordLength, array) {
    let password = "";
    for (i = 0; i < passwordLength; i++) {
        password += randomCharacter(array);
    }
    return password;
}

// Show copy icons
function showIcons() {
    let icons = Array.from(document.getElementsByClassName("copy-icon"));
    icons.forEach( item => item.classList.remove("icon-hidden"));
}

// Add copy-on-click
function copyText(e) {
    if (passOne === "") {
        return;
    }
    
    if (e.target.getAttribute("class").includes("p1")) {
        navigator.clipboard.writeText(passOne.textContent);
        document.querySelector("img.p1").setAttribute("src", "green-checkmark-icon.svg");
        document.querySelector("img.p1").classList.add("check-bright");
        setTimeout(function() {
            document.querySelector("img.p1").setAttribute("src", "copy-link-icon.svg");
            document.querySelector("img.p1").classList.remove("check-bright");
        }, 1000);
    } else {
        navigator.clipboard.writeText(passTwo.textContent);
        document.querySelector("img.p2").setAttribute("src", "green-checkmark-icon.svg");
        document.querySelector("img.p2").classList.add("check-bright");
        setTimeout(function() {
            document.querySelector("img.p2").setAttribute("src", "copy-link-icon.svg");
            document.querySelector("img.p2").classList.remove("check-bright");
        }, 1000);
    }
}

const passBoxes = Array.from(document.getElementsByClassName("password"));
passBoxes.forEach( item => item.addEventListener("click", copyText) );