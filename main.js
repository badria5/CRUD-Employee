let deleteElements = [];
let nameError=document.getElementById("nameerror");
function addData(){

    let name=document.querySelector(".name").value;
    let role=document.querySelector(".role").value;
    let state=document.querySelector(".status").value;
    const nameRegex = /^[A-Za-z\s]+$/;
    let table = document.getElementById("outputTable");
    if(!name || !nameRegex.test(name) ){
    window.alert("name is required (letters and spaces only)!");}
    else if(!role)
    { window.alert("role is required");}
    else if(!state){
        window.alert("status is required");
    }
    else{
    let newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = role;
    newRow.insertCell(2).innerHTML = state;
    newRow.insertCell(3).innerHTML =
                '<button onclick="editData(this)">Edit</button>' +
                '<button onclick="deleteData(this)">Delete</button>';
    
    clearInputs();
    }
}


function editData(button) {

    let row = button.parentNode.parentNode;

    let nameCell = row.cells[0];
    let roleCell = row.cells[1];
    let stateCell = row.cells[2];

    let nameInput =
            prompt("Enter the updated name:",
                    nameCell.innerHTML);
    let roleInput =
                prompt("Enter the updated role:",
                    roleCell.innerHTML);
    let stateInput =
                prompt("Enter the updated state:",
                    stateCell.innerHTML);
    nameCell.innerHTML = nameInput;
    roleCell.innerHTML = roleInput;
    stateCell.innerHTML = stateInput;

}

function deleteData(button) {
        let row = button.parentNode.parentNode;
    let rowData = {
        name: row.cells[0].innerHTML,
        role: row.cells[1].innerHTML,
        state: row.cells[2].innerHTML
    };
    
    deleteElements.push(rowData); 

       let table2 = document.getElementById("trashTable");
    let deleteRow = table2.insertRow(table2.rows.length);
    deleteRow.insertCell(0).innerHTML = rowData.name;
    deleteRow.insertCell(1).innerHTML = rowData.role;
    deleteRow.insertCell(2).innerHTML = rowData.state;
 deleteRow.insertCell(3).innerHTML =
        '<button onclick="restorFromTrash(this)">Restore</button>';
        row.parentNode.removeChild(row);

        }
function restorFromTrash(button) {
    let row = button.parentNode.parentNode;
    let name = row.cells[0].innerHTML;
    let role = row.cells[1].innerHTML;
    let state = row.cells[2].innerHTML;
    let table = document.getElementById("outputTable");
    let newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = role;
    newRow.insertCell(2).innerHTML = state;
    newRow.insertCell(3).innerHTML =
        '<button onclick="editData(this)">Edit</button>' +
        '<button onclick="deleteData(this)">Delete</button>';
           row.parentNode.removeChild(row);
           trashClose();
}
function trash(){
   let trash= document.getElementById("trashTable");
   if(trash.style.display=="none")
    {
   trash.style.display="block";}
   
}
function trashClose()
{
 let trashclose= document.getElementById("trashTable");
if(trashclose.style.display=="block")
    {
   trashclose.style.display="none";}
}
function clearInputs() {

            // Clear input fields
            document.querySelector(".name").value = "";
            document.querySelector(".role").value = "";
            document.querySelector(".status").value = "";
            
        }
