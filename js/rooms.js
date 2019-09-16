function addNewRoom(){
    let tableRef = document.getElementById("room-table");

    // Get user input
    let userInput = prompt("Choose a name for your room: (Max 10 letters)");

    if(userInput.length <= 0 || userInput.length > 10){
        alert("Please enter a valid room name.")
    }

    else{

        // Insert a row at the end of the table
        let newRow = tableRef.insertRow(-1);
        
        // Insert a cell in the row at index 0
        let firstCell = newRow.insertCell(0);
        let secondCell = newRow.insertCell(1);

        // Append a text node to the cell
        let roomName = document.createTextNode(userInput);
        let numberOfPlayers = document.createTextNode("0/4 players");
        firstCell.appendChild(roomName);
        secondCell.appendChild(numberOfPlayers);
        secondCell.insertAdjacentHTML(
            "beforeend",
            "<button>Join</button>"
        );
    }

}

function deleteRoom(){
    let tableRef = document.getElementById("room-table");
    var rowCount = tableRef.rows.length;

    let userInput = prompt("Choose a name for your room");

    for(var i = 0; i < rowCount; i++) {
        let name = tableRef.rows[i].cells[0].innerHTML;
        if(name == userInput) {
            tableRef.deleteRow(i);
         }
    }

}

function searchRoom(){
    let tableRef = document.getElementById("room-table");
    var rowCount = tableRef.rows.length;

    let userInput = document.getElementById("searchInput").value;
    if(userInput == ""){
    } else{
        for(var i = 0; i < rowCount; i++) {
            let name = tableRef.rows[i].cells[0].innerHTML;
            tableRef.rows[i].style.backgroundColor = "white";
            if(name == userInput) {
             tableRef.rows[i].style.backgroundColor = "lightgrey";
             tableRef.rows[i].scrollIntoView();
             document.getElementById("searchInput").value = "";
            }
        }
    }
}





document.getElementById("addRoom").addEventListener("click", addNewRoom);
document.getElementById("deleteRoom").addEventListener("click", deleteRoom);
document.getElementById("searchRoom").addEventListener("click", searchRoom);
