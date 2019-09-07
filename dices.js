
let diceArray = ["diceOne","diceTwo","diceThree","diceFour","diceFive"];
let tableSpots = ["playerOne","playerTwo","playerThree","playerFour"];
let ls = ["","5","4","3","2","1"];
let ss = ["6","5","4","3","2",""];
let playerArray = [];
let diceValuesArray = [];
let numbers = [6,5,4,3,2,1];
let counter = 0;
let numberOfThrows = 0; 
let diceValue = 0; 
let playerIndex = 1;

// TODO: Kolla om man kan lösa så man kan ha samma av flera namn. Problem när man tar bort ena (index).
// TODO: Fixa summan till alla andra spelare. 
// TODO: Fixa så man inte kan lägga till någon annans spelares värde på någon annans spelplan. 
// TODO: Fixa sista värdena på tabellen. 
// TODO: Fixa Hide/show av tärningarna. 

// TODO: Par verkar ej funka.


function addPlayerNames(){
    let playerNameLower = document.getElementById("playerNames").value.toLowerCase();
    let playerName = playerNameLower.charAt(0).toUpperCase() + playerNameLower.slice(1);

    //Fixa så att man inte kan skicka in siffror. 
    if(playerName == ""){
        alert("Please enter a correct name.")
    }
    else if(counter == 4){
        alert("You have added maximum players (4 players)");
    }
    else{
        if(document.getElementById(tableSpots[counter]).innerHTML == "" || document.getElementById(tableSpots[counter]).innerHTML.value == undefined){
            document.getElementById(tableSpots[counter]).innerHTML = playerName;
            document.getElementById(tableSpots[counter]).value = playerName;
            playerArray[counter] = playerName;
            counter += 1;
        }
    }
}

function removePlayerNames(){
    let playerNameLower = document.getElementById("playerNames").value.toLowerCase();
    let playerName = playerNameLower.charAt(0).toUpperCase() + playerNameLower.slice(1);

    if(playerName == "" || !playerArray.includes(playerName)){
        alert("Please enter a already given name.")
    }

    else if(playerArray.includes(playerName)){
        let index = playerArray.indexOf(playerName);
        if (index > -1) {
            playerArray.splice(index, 1);
            document.getElementById(tableSpots[index]).innerHTML = "";
            document.getElementById(tableSpots[index]).value = "";
            for(let x = 0; x < 4; x++){
                document.getElementById(tableSpots[x]).innerHTML = "";
            }
            for(let x = 0; x < playerArray.length; x++){
                document.getElementById(tableSpots[x]).innerHTML = playerArray[x];
            }
            counter = playerArray.length;
        }
    }
}

function saveDiceValue(clicked){
    let diceValue = document.getElementById(clicked).value;
    if(diceValue != "" &&  document.getElementById(clicked).style.backgroundColor != "grey"){
        document.getElementById(clicked).style.backgroundColor = "grey";
    }
    else if(document.getElementById(clicked).style.backgroundColor == "grey"){
        document.getElementById(clicked).style.backgroundColor = "green";
    }
}

function calc(){
    if(numberOfThrows < 3){
        numberOfThrows += 1;
        document.getElementById("nrThrows").innerHTML = "You have made: " + numberOfThrows + " " + "throw";
        for(let x = 0; x < 5; x ++){
            if(numberOfThrows != 3 && document.getElementById(diceArray[x]).style.backgroundColor != "grey"){
                document.getElementById(diceArray[x]).value = Math.floor(Math.random() * 6) + 1;
            }
            else if(numberOfThrows == 3 ){
                document.getElementById(diceArray[x]).style.backgroundColor = "red";
                document.getElementById(diceArray[x]).disabled = true;
            }   
        }   
    }
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

function checkCombination(cell_id,number){
    let checkCounter = 0;
    let stash = 0;
    let kStash = 0;
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
        // Kontroll av 2 par. 
        else if(stash == 2 && cell_id.includes("_2pair")){
            document.getElementById(cell_id).innerHTML = twoPair;
            document.getElementById(cell_id).value = twoPair;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
        // Kontroll av Yatzy
        else if(contain == 5){
            document.getElementById(cell_id).innerHTML = number;
            document.getElementById(cell_id).value = number;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
        //Kontroll av par
        else if(contain >= 2 && !cell_id.includes("_pair")){
            twoPair += numbers[x]*2;
            stash += 1;
            if(contain == 3){
                kStash += 1;
                kSum += numbers[x]*3;
            }
            else if(contain == 2){
                kStash += 1;
                kSum += numbers[x]*2; 
            }    
        }
        // Kontroll av kåk. 
        else if(kStash == 2 && cell_id.includes("_kak")){
            document.getElementById(cell_id).innerHTML = kSum;
            document.getElementById(cell_id).value = kSum;
            document.getElementById(cell_id).disabled = true; 
            return true;
        }
        // Kontroll av insättning av 1-6 och 1 par. 
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

 // Uträkning av varje tärning (1-6) 
function addValue(cell_id){
    let totalSum = 0;
    let added = false;
    let oneSum = 0; let twoSum = 0;
    let diceSum_1 = 0; let diceSum_2 = 0; let diceSum_3 = 0; let diceSum_4 = 0; let diceSum_5 = 0; let = diceSum_6 = 0;
    // let diceSumArray = [diceSum_1,diceSum_2,diceSum_3,diceSum_4,diceSum_5,diceSum_6];
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
        //lagt en sträng här. 
        diceValuesArray[x] = "" + document.getElementById(diceArray[x]).value;
    }

    if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_1" || cell_id == "playerTwo_1"){
        document.getElementById(cell_id).innerHTML = diceSum_1;
        document.getElementById(cell_id).value = diceSum_1;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    } 
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_2" || cell_id == "playerTwo_2"){
        document.getElementById(cell_id).innerHTML = diceSum_2;
        document.getElementById(cell_id).value = diceSum_2;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_3" || cell_id == "playerTwo_3"){
        document.getElementById(cell_id).innerHTML = diceSum_3;
        document.getElementById(cell_id).value = diceSum_3;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_4" || cell_id == "playerTwo_4"){
        document.getElementById(cell_id).innerHTML = diceSum_4;
        document.getElementById(cell_id).value = diceSum_4;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_5" || cell_id == "playerTwo_5"){
        document.getElementById(cell_id).innerHTML = diceSum_5;
        document.getElementById(cell_id).value = diceSum_5;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_6" || cell_id == "playerTwo_6"){
        document.getElementById(cell_id).innerHTML = diceSum_6;
        document.getElementById(cell_id).value = diceSum_6;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_pair" || cell_id == "playerTwo_pair"){
      added = checkCombination(cell_id,2);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_2pair" || cell_id == "playerTwo_2pair"){
      added = checkCombination(cell_id,100);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_triss" || cell_id == "playerTwo_triss"){
        added = checkCombination(cell_id,3);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_fyrtal" || cell_id == "playerTwo_fyrtal"){
        added = checkCombination(cell_id,4);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_kak" || cell_id == "playerTwo_kak"){
      added = checkCombination(cell_id,100);
    }
    else if( document.getElementById(cell_id).value == undefined && cell_id == "playerOne_ls" || cell_id == "playerTwo_ls"){
        added = checkCombination(cell_id,15);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_ss" || cell_id == "playerTwo_ss"){
        added = checkCombination(cell_id,20);
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_chance" || cell_id == "playerTwo_chance"){
        document.getElementById(cell_id).innerHTML = totalSum;
        document.getElementById(cell_id).value = totalSum;
        document.getElementById(cell_id).disabled = true; 
        added = true;
    }
    else if(document.getElementById(cell_id).value == undefined && cell_id == "playerOne_yatzy" || cell_id == "playerTwo_yatzy"){
       added = checkCombination(cell_id,50);
    }
    else{
        console.log(alert("Pick a empty board cell."));
    }

    let playerString = "";
    let playerCell = "";
    let sumTotal = 0;
    let sumIndex = ""; 
    let sumArray = ["_1","_2","_3","_4","_5","_6","_bonus","_pair","_2pair","_triss","_fyrtal","_kak","_ls","_ss", "_chance","_yatzy"];

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
        }
    }

    for(let x = 0; x < 16; x++){
        playerString = "";
        playerString = playerCell;
        playerString += sumArray[x];
        if(document.getElementById(playerString).value != undefined && document.getElementById(playerString).value != ""){
            sumTotal += 1;
            twoSum +=  document.getElementById(playerString).value;
            if(sumTotal == 15){
                document.getElementById(sumIndex).innerHTML = twoSum;
            }
        }
    }
  
    if(oneSum >= 63){
        document.getElementById("playerOne_bonus").innerHTML = 50;
        document.getElementById("playerOne_bonus").value = 50; 
    }

    if(added){
        let playerMaxIndex = playerArray.length;
        if(playerMaxIndex > 1){
            playerMaxIndex -= 1;
            
        }
        // console.log(playerMaxIndex);
        numberOfThrows = 0;
        for(let x = 0; x < 5; x ++){
            document.getElementById(diceArray[x]).style.backgroundColor = "green";
            document.getElementById(diceArray[x]).value = "X";
            document.getElementById(diceArray[x]).removeAttribute('disabled');
        }
        if(playerArray[playerIndex] == undefined){
            playerIndex = 0;
            document.getElementById("playersTurn").innerHTML = "Current player: " + playerArray[playerIndex];
            document.getElementById("nrThrows").innerHTML = "You have made: ";
        }
        else if(playerIndex == playerMaxIndex){
            document.getElementById("playersTurn").innerHTML = "Current player: " + playerArray[playerIndex];
            document.getElementById("nrThrows").innerHTML = "You have made: ";
            playerIndex = 0;
        }
        else if(playerIndex != playerMaxIndex){
            document.getElementById("playersTurn").innerHTML = "Current player: " + playerArray[playerIndex];
            document.getElementById("nrThrows").innerHTML = "You have made: 0 throw";
            playerIndex += 1;
        }
            
    }   
}

function startGame(){
    document.getElementById("addPlayer").style.backgroundColor = "grey";
    document.getElementById("addPlayer").disabled = true;
    document.getElementById("removePlayer").style.backgroundColor = "grey";
    document.getElementById("removePlayer").disabled = true;
    document.getElementById("start").style.backgroundColor = "grey";
    document.getElementById("start").disabled = true;
    document.getElementById("playersTurn").innerHTML = "Current player: " + playerArray[0];

    // for(let x = 0; x < 5; x ++){
        // if(numberOfThrows != 3 && document.getElementById(diceArray[x]).style.backgroundColor != "grey"){
            document.getElementById(diceArray[0]).value = 2;
            document.getElementById(diceArray[1]).value = 4;
            document.getElementById(diceArray[2]).value = 3;
            document.getElementById(diceArray[3]).value = 6;
            document.getElementById(diceArray[4]).value = 5;
        // }

}

function endGame(){
    location.reload();
}