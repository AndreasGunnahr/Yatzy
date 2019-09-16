let diceArray = ["diceOne","diceTwo","diceThree","diceFour","diceFive"];
let tableSpots = ["playerOne","playerTwo","playerThree","playerFour"];
let ls = ["","5","4","3","2","1"];
let ss = ["6","5","4","3","2",""];
let playerArray = [];
let diceValuesArray = [];
let numbers = [6,5,4,3,2,1];
let counter = 0;
let numberOfThrows = 3; 
let diceValue = 0; 
let playerIndex = 0;
let totalSum = 0;
let startIndex = 0;
let stash = 0;
let countPlayers = 0;

// TODO: Kolla om man kan lösa så man kan ha samma av flera namn. Problem när man tar bort ena (index).
// TODO: Animera tärningarna på kast. 

document.getElementById(tableSpots[0]).innerHTML = "Andreas";
document.getElementById(tableSpots[0]).value = "Andreas";
document.getElementById(tableSpots[1]).innerHTML = "Oskar";
document.getElementById(tableSpots[1]).value = "Oskar";
document.getElementById(tableSpots[2]).innerHTML = "Camilla";
document.getElementById(tableSpots[2]).value = "Camilla";
document.getElementById(tableSpots[3]).innerHTML = "Pettersson";
document.getElementById(tableSpots[3]).value = "Pettersson";
playerArray[0] = "Andreas";
playerArray[1] = "Oskar";
playerArray[2] = "Camilla";
playerArray[3] = "Pettersson";

document.getElementById("player0").style.border = "3px solid black";
addColor(playerIndex);
/*
class Dices{
    constructor(value){
        this.value = value;
    }
}

class Player{
    constructor(username, password, image){
        this.username = username; 
        this.password = password; 
        this.image = image; 
    }
}

class Table{
    constructor(){
        this.cellId = cellId;
        this.
    }
} */

// Funktion där vi lägger till varje spelares namn i tabellen. 
// function addPlayerNames(){
//     let playerNameLower = document.getElementById("playerNames").value.toLowerCase();
//     let playerName = playerNameLower.charAt(0).toUpperCase() + playerNameLower.slice(1);

//     //Fixa så att man inte kan skicka in siffror. 
//     if(playerName == ""){
//         alert("Please enter a correct name.")
//     }
//     else if(counter == 4){
//         alert("You have added maximum players (4 players)");
//     }
//     else{
//         if(document.getElementById(tableSpots[counter]).innerHTML == "" || document.getElementById(tableSpots[counter]).innerHTML.value == undefined){
//             document.getElementById(tableSpots[counter]).innerHTML = playerName;
//             document.getElementById(tableSpots[counter]).value = playerName;
//             playerArray[counter] = playerName;
//             counter += 1;
//         }
//     }
// }

// Funktion där vi tar bort en spelares namn från tabellen. 
// function removePlayerNames(){
//     let playerNameLower = document.getElementById("playerNames").value.toLowerCase();
//     let playerName = playerNameLower.charAt(0).toUpperCase() + playerNameLower.slice(1);

//     if(playerName == "" || !playerArray.includes(playerName)){
//         alert("Please enter a already given name.")
//     }

//     else if(playerArray.includes(playerName)){
//         let index = playerArray.indexOf(playerName);
//         if (index > -1) {
//             playerArray.splice(index, 1);
//             document.getElementById(tableSpots[index]).innerHTML = "";
//             document.getElementById(tableSpots[index]).value = "";
//             for(let x = 0; x < 4; x++){
//                 document.getElementById(tableSpots[x]).innerHTML = "";
//             }
//             for(let x = 0; x < playerArray.length; x++){
//                 document.getElementById(tableSpots[x]).innerHTML = playerArray[x];
//             }
//             counter = playerArray.length;
//         }
//     }
// }

// Funktion som gör att vi kan spara värdena på tärningarna om vi klickar på dem.
function saveDiceValue(clicked){
    let diceValue = document.getElementById(clicked).value;
    if(diceValue != "" &&  document.getElementById(clicked).style.backgroundColor != "grey"){
        document.getElementById(clicked).style.backgroundColor = "grey";
    }
    else if(document.getElementById(clicked).style.backgroundColor == "grey"){
        document.getElementById(clicked).style.backgroundColor = "green";
    }
}

// Funktion där vi kollar om max antal kast är gjorda. 
function checkMaxThrow(){
    if(numberOfThrows > 0 ){
        numberOfThrows -= 1;
        document.getElementById("nrThrows").innerHTML = "Number of throws left: " + numberOfThrows;
        for(let x = 0; x < 5; x ++){
            if(numberOfThrows != 0 && document.getElementById(diceArray[x]).style.backgroundColor != "grey"){
                document.getElementById(diceArray[x]).value = Math.floor(Math.random() * 6) + 1;
            }
            else if(numberOfThrows == 0 ){
                document.getElementById(diceArray[x]).value = Math.floor(Math.random() * 6) + 1;
                document.getElementById(diceArray[x]).style.backgroundColor = "red";
                document.getElementById(diceArray[x]).disabled = true;
            }   
        }   
    }
}

// Funktion som tar bort färgen på borders och tagna celler. 
function removeColor(index){
    for(let i = 0; i < 19; i++){
        for(let j=index+1; j < index+2; j++){
           let tableCell =  document.getElementById("gameBoard").rows[i].cells[j];
        //    console.log(tab);
           if(i == 0){
               tableCell.style.borderTop = "2px solid black";
           }
           else if(i == 18){
                tableCell.style.borderBottom = "2px solid black";
           }
           if(i != 0 && i != 7 && i != 8 && i != 18){
            tableCell.style.backgroundColor = "white";
           }
                tableCell.style.borderRight = "2px solid black";
                tableCell.style.borderLeft = "2px solid black"
        }
    }
}

// Funktion som lägger till färg på borders och lediga celler. 
function addColor(index){      
    for(let i = 0; i < 19; i++){
        for(let j=index+1; j < index+2; j++){
           let tableCell =  document.getElementById("gameBoard").rows[i].cells[j];
           if(i == 0){
               tableCell.style.borderTop = "3px solid brown";
           }
           else if(i == 18){
            tableCell.style.borderBottom = "3px solid brown";
           }
           if(tableCell.value == undefined && (i != 7 && i != 8 && i != 18)){
                tableCell.style.backgroundColor = "beige";
            }
            tableCell.style.borderRight = "3px solid brown";
            tableCell.style.borderLeft = "3px solid brown"
        }
    }
}

// Funktion där vi kollar vilken spelare som ska slå. 
function checkTurn(){
    let playerMaxIndex = playerArray.length;
    let player = "player";


    if(playerMaxIndex > 1){
        playerMaxIndex -= 1;
    }
    numberOfThrows = 3;
    for(let x = 0; x < 5; x ++){
        document.getElementById(diceArray[x]).style.backgroundColor = "lightgreen";
        document.getElementById(diceArray[x]).value = "X";
        document.getElementById(diceArray[x]).removeAttribute('disabled');
    }

    if(playerArray[playerIndex+1] == undefined){
        removeColor(startIndex);
        playerIndex = 0;
        startIndex = 0;
        // document.getElementById("playersTurn").innerHTML = "Current player: " + playerArray[playerIndex];
        document.getElementById("nrThrows").innerHTML = "Number of throws left: 3";
        document.getElementById(player.concat(countPlayers)).style.border = "none";
        document.getElementById(player.concat(playerIndex)).style.border = "3px solid black";
        addColor(startIndex);
        countPlayers = 0;
    }
    else if(playerIndex != playerMaxIndex){
        removeColor(startIndex);
        playerIndex += 1;
        startIndex += 1;
        // document.getElementById("playersTurn").innerHTML = "Current player: " + playerArray[playerIndex];
        document.getElementById("nrThrows").innerHTML = "Number of throws left: 3";
        document.getElementById(player.concat(countPlayers+1)).style.border = "3px solid black";
        document.getElementById(player.concat(countPlayers)).style.border = "none";
        addColor(startIndex);
        countPlayers += 1;
    }
    // else if(playerIndex == playerMaxIndex){
    //     playerIndex += 1;
    //     startIndex += 1;
    //     countPlayers = 0;
    //     document.getElementById("nrThrows").innerHTML = "Number of throws left: 3";
    //     document.getElementById(player.concat(countPlayers)).style.border = "3px solid black";
    //     document.getElementById(player.concat(playerIndex)).style.border = "none";
    //     console.log("här3");
    // }  
}

// Funktion som kollar om ett värde finns flera gånger. 
function countInArray(array, value) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            count++;
        }
    }
    return count;
}

// Funktion som kollar kombinationerna av värdena. 
function checkCombination(cell_id,number){
    let checkCounter = 0;
    let kStash = 0;
    let kCheck = 0;
    let kSum = 0;
    let twoPair = 0; 

    for(let x = 0; x <= diceValuesArray.length; x++){
        let contain = countInArray(diceValuesArray,numbers[x]);
        // Kontroll av Triss 
        if(contain >= 3 && cell_id.includes("_triss")){
            document.getElementById(cell_id).innerHTML = numbers[x]*3
            document.getElementById(cell_id).value = numbers[x]*3;
            document.getElementById(cell_id).disabled = true; 
            return true;
        } 

        // Kontroll av Fyrtal
        else if(contain >= 4 && cell_id.includes("_fyrtal")){
            document.getElementById(cell_id).innerHTML = numbers[x]*4
            document.getElementById(cell_id).value = numbers[x]*4;
            document.getElementById(cell_id).disabled = true; 
            return true;
        } 
        // Kontroll av liten stege (1-5).
        else if(contain == 1 && cell_id.includes("_ls")){
            if(diceValuesArray.includes(ls[x])){
                checkCounter += 1; 
                if(checkCounter == 5){
                    document.getElementById(cell_id).innerHTML = number;
                    document.getElementById(cell_id).value = number;
                    document.getElementById(cell_id).disabled = true; 
                    return true;
                }
            }
        }
        // Kontroll av Yatzy
        else if(contain == 5 && cell_id.includes("_yatzy")){
            document.getElementById(cell_id).innerHTML = number;
            document.getElementById(cell_id).value = number;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
        // Kontroll av stor stege (2-6).
        else if(contain == 1 && cell_id.includes("_ss")){
            if(diceValuesArray.includes(ss[x])){
                checkCounter += 1;
                if(checkCounter == 5){
                    document.getElementById(cell_id).innerHTML = number;
                    document.getElementById(cell_id).value = number;
                    document.getElementById(cell_id).disabled = true; 
                    return true;
                }
            }
        }
        // Kontroll av chance.
        else if(cell_id.includes("_chance")){
            if(isNaN(totalSum) ){
                totalSum = 0;
            }
            document.getElementById(cell_id).innerHTML = totalSum;
            document.getElementById(cell_id).value = totalSum;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
         // Kontroll av 2 par. 
         else if(stash == 2 && cell_id.includes("_twoPair")){
            document.getElementById(cell_id).innerHTML = twoPair;
            document.getElementById(cell_id).value = twoPair;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
        //Kontroll av 1 par
        else if(contain >= 2 && !cell_id.includes("_pair")){
            twoPair += numbers[x]*2;
            stash += 1;
            if(contain == 3){
                kStash += 1;
                kCheck = 1;
                kSum += numbers[x]*3;
            }
            else if(contain == 2){
                kStash += 1;
                kSum += numbers[x]*2; 
            }    
        }
        // Kontroll av kåk. 
        else if(kStash == 2 && kCheck == 1 && cell_id.includes("_kak")){
            document.getElementById(cell_id).innerHTML = kSum;
            document.getElementById(cell_id).value = kSum;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
        // Kontroll av insättning av 1-6.
        else if(contain >= number){
            document.getElementById(cell_id).innerHTML = numbers[x]*number;
            document.getElementById(cell_id).value = numbers[x]*number;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
    }
    document.getElementById(cell_id).innerHTML = 0;
    document.getElementById(cell_id).value = 0;
    document.getElementById(cell_id).disabled = true; 
    return true;
}

 // Uträkning av varje tärning (1-6) och där vi sätter in värdena i tabellen. 
function addValue(cell_id){
    let added = false;
    let oneSum = 0; let twoSum = 0;
    let diceSum_1 = 0; let diceSum_2 = 0; let diceSum_3 = 0; let diceSum_4 = 0; let diceSum_5 = 0; let = diceSum_6 = 0;
    totalSum = 0;
    for(let y = 0; y < 5; y ++){
        diceValue = parseInt(document.getElementById(diceArray[y]).value,10);
        if(diceValue == 1){
            diceSum_1 += diceValue;
        }
        else if(diceValue == 2){
            diceSum_2 += diceValue;
        }
        else if(diceValue == 3){
            diceSum_3 += diceValue;
        }
        else if(diceValue == 4){
            diceSum_4 += diceValue;
        }
        else if(diceValue == 5){
            diceSum_5 += diceValue;
        }
        else if(diceValue == 6){
            diceSum_6 += diceValue;
        }
         totalSum += diceValue;
    }

    for(let x = 0; x < diceArray.length; x++){ 
        diceValuesArray[x] = "" + document.getElementById(diceArray[x]).value;
    }


    if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex] + "_1") ){
        document.getElementById(cell_id).innerHTML = diceSum_1;
        document.getElementById(cell_id).value = diceSum_1;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    } 
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_2")){  
        document.getElementById(cell_id).innerHTML = diceSum_2;
        document.getElementById(cell_id).value = diceSum_2;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_3")){
        document.getElementById(cell_id).innerHTML = diceSum_3;
        document.getElementById(cell_id).value = diceSum_3;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_4")){
        document.getElementById(cell_id).innerHTML = diceSum_4;
        document.getElementById(cell_id).value = diceSum_4;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_5")){
        document.getElementById(cell_id).innerHTML = diceSum_5;
        document.getElementById(cell_id).value = diceSum_5;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_6")){
        document.getElementById(cell_id).innerHTML = diceSum_6;
        document.getElementById(cell_id).value = diceSum_6;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_pair")){
        added = checkCombination(cell_id,2);
    }
    else if(document.getElementById(cell_id).value == undefined &&cell_id.includes(tableSpots[startIndex]  + "_twoPair")){
        added = checkCombination(cell_id,100);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_triss")){
        added = checkCombination(cell_id,3);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_fyrtal")){
        added = checkCombination(cell_id,4);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_kak")){
        added = checkCombination(cell_id,100);
    }
    else if( document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_ls")){
        added = checkCombination(cell_id,15);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_ss")){
        added = checkCombination(cell_id,20);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_chance")){
        added = checkCombination(cell_id,100);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id.includes(tableSpots[startIndex]  + "_yatzy")){
        added = checkCombination(cell_id,50);
    }
    else{  
        console.log(alert("Pick a empty board cell or your own column."));
        added = false;
    }



    let sumTotal = 0;
    let valueCheck = 0;
    let playerString = "";
    let playerCell = "";
    let sumIndex = ""; 
    let sumArray = ["_1","_2","_3","_4","_5","_6","_bonus","_pair","_twoPair","_triss","_fyrtal","_kak","_ls","_ss", "_chance","_yatzy"];

    for(let x = 0; x < playerArray.length; x++){
        let checkCell = cell_id.includes(tableSpots[x]); 
        if(checkCell){
            playerCell = tableSpots[x];
            sumIndex = playerCell.concat("_sum1");
        }  
    }

    for(let x = 0; x < 6; x++){
        playerString = playerCell;
        playerString += sumArray[x];
        if(document.getElementById(playerString).value != undefined && document.getElementById(playerString).value != ""){
            oneSum +=  document.getElementById(playerString).value;
            document.getElementById(sumIndex).innerHTML = oneSum;
            valueCheck += 1;
        }
        else if(document.getElementById(playerString).value == 0){
            valueCheck += 1;
        }

    }
    
    for(let x = 0; x < playerArray.length; x++){
        let checkCell = cell_id.includes(tableSpots[x]);  
        if(checkCell){
            playerCell = tableSpots[x];
            sumIndex = playerCell.concat("_bonus");
            if(oneSum >= 63 && valueCheck == 6){
                document.getElementById(sumIndex).innerHTML = 50;
                document.getElementById(sumIndex).value = 50; 
            }
            else if(oneSum < 63 && valueCheck == 6){
                document.getElementById(sumIndex).innerHTML = 0;
                document.getElementById(sumIndex).value =  0;
            }
        }  
    }

    for(let x = 0; x < 16; x++){
        playerString = "";
        playerString = playerCell;
        playerString += sumArray[x];
        if(document.getElementById(playerString).value != undefined && document.getElementById(playerString).value != ""){
            sumTotal += 1;
            twoSum +=  document.getElementById(playerString).value;
        }
        else if(document.getElementById(playerString).value == 0){
            sumTotal += 1;
        }
    }

    playerCell = "";
    sumIndex = ""; 
    for(let x = 0; x < playerArray.length; x++){
        let checkCell = cell_id.includes(tableSpots[x]);  
        if(checkCell){
            playerCell = tableSpots[x];
            sumIndex = playerCell.concat("_sum2");
        }  
    }

    if(sumTotal == 16){
        document.getElementById(sumIndex).innerHTML = twoSum;
    }
    


    if(added){
        checkTurn();
    }   
}

// Funktion där vi startar matchen.
function startGame(){
    document.getElementById("addPlayer").style.backgroundColor = "grey";
    document.getElementById("addPlayer").disabled = true;
    document.getElementById("removePlayer").style.backgroundColor = "grey";
    document.getElementById("removePlayer").disabled = true;
    document.getElementById("start").style.backgroundColor = "grey";
    document.getElementById("start").disabled = true;
    // document.getElementById("playersTurn").innerHTML = "Current player: " + playerArray[playerIndex];
    // document.getElementById("header-container").style.display = "block";
}

// Funktion där vi avslutar och börjar om matchen. 
function endGame(){
    location.reload();
}

// Chatbox 
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

let myMessages = document.getElementById("myMsg");
let textBubble = document.getElementById("bubble");
let messages = document.getElementById("allMsg");
let textbox = document.getElementById("userMsg");
let submit = document.getElementById("submitMsg");
let chatUsername = document.getElementById("chatUser");

submit.addEventListener("click", function(){
    let newMessage = document.createElement("li");
    // let img = document.createElement("img");
    // img.src = "avatar.png";
    // img.width=30;
    // img.height=30;
    // img.style.borderRadius = "50%"; 
    // img.style.marginLeft = "10px";
    // newMessage.style.marginLeft = "10px";

    newMessage.innerHTML = textbox.value;
    textBubble.appendChild(newMessage);
    myMessages.style.display = "block";
    textbox.value = "";
}); 