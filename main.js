let deleteElements = [];
/////Add data_________________________________________________________
function addData() {
  let name = document.querySelector(".name").value;
  let role = document.querySelector(".role").value;
  let salary = document.querySelector(".salary").value;
  let state = document.querySelector(".status").value;
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!name || !nameRegex.test(name)) {
    window.alert("Name is required (letters and spaces only)!");
  } else if (!role) {
    window.alert("Role is required");
  } else if (!salary || isNaN(salary)) {
    window.alert("Salary is required and must be a number");
  } else if (!state) {
    window.alert("Status is required");
  } else {
    let table = document.getElementById("outputTable").querySelector("tbody");
    let newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = role;
    newRow.insertCell(2).innerHTML = salary;
    newRow.insertCell(3).innerHTML = state;
    newRow.insertCell(4).innerHTML =
      '<button onclick="editData(this)">Edit</button>' +
      '<button onclick="deleteData(this)">Delete</button>' +
      '<button onclick="openBonusModal(this)">Bonus</button>';

    clearInputs();
  }
}
////////////Update data ________________________________________________________
function editData(button) {
  let row = button.parentNode.parentNode;
  let nameCell = row.cells[0];
  let roleCell = row.cells[1];
  let salaryCell = row.cells[2];
  let stateCell = row.cells[3];

  let nameInput = prompt("Enter the updated name:", nameCell.innerHTML);
  let roleInput = prompt("Enter the updated role:", roleCell.innerHTML);
  let salaryInput = prompt("Enter the updated salary:", salaryCell.innerHTML);
  let stateInput = prompt("Enter the updated state:", stateCell.innerHTML);

  nameCell.innerHTML = nameInput;
  roleCell.innerHTML = roleInput;
  salaryCell.innerHTML = salaryInput;
  stateCell.innerHTML = stateInput;
}
////Delete data ___________________________________________________________
function deleteData(button) {
  let row = button.parentNode.parentNode;
  let rowData = {
    name: row.cells[0].innerHTML,
    role: row.cells[1].innerHTML,
    salary: row.cells[2].innerHTML,
    state: row.cells[3].innerHTML,
  };

  deleteElements.push(rowData);

  let table2 = document.getElementById("trashTable").querySelector("tbody");
  let deleteRow = table2.insertRow();
  deleteRow.insertCell(0).innerHTML = rowData.name;
  deleteRow.insertCell(1).innerHTML = rowData.role;
  deleteRow.insertCell(2).innerHTML = rowData.salary;
  deleteRow.insertCell(3).innerHTML = rowData.state;
  deleteRow.insertCell(4).innerHTML =
    '<button onclick="restorFromTrash(this)">Restore</button>';

  row.parentNode.removeChild(row);
}
////Restore data frome trash_________________________________________________
function restorFromTrash(button) {
  let row = button.parentNode.parentNode;
  let name = row.cells[0].innerHTML;
  let role = row.cells[1].innerHTML;
  let salary = row.cells[2].innerHTML;
  let state = row.cells[3].innerHTML;

  let table = document.getElementById("outputTable").querySelector("tbody");
  let newRow = table.insertRow();
  newRow.insertCell(0).innerHTML = name;
  newRow.insertCell(1).innerHTML = role;
  newRow.insertCell(2).innerHTML = salary;
  newRow.insertCell(3).innerHTML = state;
  newRow.insertCell(4).innerHTML =
    '<button onclick="editData(this)">Edit</button>' +
    '<button onclick="deleteData(this)">Delete</button>' +
    '<button onclick="openBonusModal(this)">Bonus</button>';

  row.parentNode.removeChild(row);
  trashClose();
}
///Open trash________________________________________________________
function trash() {
  let trash = document.getElementById("trashTable");
  if (trash.style.display === "none") {
    trash.style.display = "block";
  }
}
///Close trash_________________________________________________________
function trashClose() {
  let trashclose = document.getElementById("trashTable");
  if (trashclose.style.display === "block") {
    trashclose.style.display = "none";
  }
}
////Clear Inputs____________________________________________________________
function clearInputs() {
  document.querySelector(".name").value = "";
  document.querySelector(".role").value = "";
  document.querySelector(".salary").value = "";
  document.querySelector(".status").value = "";
}

let currentBonusRow = null;
///Open Bounus________________________________________________________________
function openBonusModal(button) {
  currentBonusRow = button.parentNode.parentNode;
  document.getElementById("bonusPercentage").value = "";
  document.getElementById("bonusModal").style.display = "block";
}
///Close Bounus________________________________________________________________

function closeBonusModal() {
  document.getElementById("bonusModal").style.display = "none";
}
/////Calculate Bounus__________________________________________________________
function calculateBonus() {
  const percentage = parseFloat(
    document.getElementById("bonusPercentage").value
  );
  if (isNaN(percentage) || percentage < 0) {
    alert("Please enter a valid bonus percentage.");
    return;
  }

  const salaryCell = currentBonusRow.cells[2];
  const salary = parseFloat(salaryCell.innerText);
  const bonus = ((salary * percentage) / 100).toFixed(2);

  let bonusSpan = salaryCell.querySelector("span");
  if (!bonusSpan) {
    bonusSpan = document.createElement("span");
    salaryCell.appendChild(document.createElement("br"));
    bonusSpan.style.color = "green";
    salaryCell.appendChild(bonusSpan);
  }

  bonusSpan.textContent = `Bonus: $${bonus}`;
  closeBonusModal();
}
/////Using Filter ____________________________________________________________
function applyFilters() {
  const nameFilter = document.getElementById("filterName").value.toLowerCase();
  const roleFilter = document.getElementById("filterRole").value.toLowerCase();
  const minSalary = parseFloat(document.getElementById("minSalary").value);
  const maxSalary = parseFloat(document.getElementById("maxSalary").value);
  const minBonus = parseFloat(document.getElementById("minBonus").value);
  const maxBonus = parseFloat(document.getElementById("maxBonus").value);
  const statusFilter = document.getElementById("filterStatus").value;

  const rows = document.querySelectorAll("#outputTable tbody tr");
  rows.forEach((row) => {
    const name = row.cells[0].innerText.toLowerCase();
    const role = row.cells[1].innerText.toLowerCase();

    const salaryText = row.cells[2].innerText.split("\n")[0];
    const salary = parseFloat(salaryText);

    const bonusSpan = row.cells[2].querySelector("span");
    const bonusValue = bonusSpan
      ? parseFloat(bonusSpan.textContent.replace(/[^\d.]/g, ""))
      : 0;

    const status = row.cells[3].innerText;

    const matchesName = !nameFilter || name.includes(nameFilter);
    const matchesRole = !roleFilter || role.includes(roleFilter);
    const matchesSalary =
      (isNaN(minSalary) || salary >= minSalary) &&
      (isNaN(maxSalary) || salary <= maxSalary);
    const matchesBonus =
      (isNaN(minBonus) || bonusValue >= minBonus) &&
      (isNaN(maxBonus) || bonusValue <= maxBonus);
    const matchesStatus = !statusFilter || status === statusFilter;

    if (
      matchesName &&
      matchesRole &&
      matchesSalary &&
      matchesBonus &&
      matchesStatus
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}


// Show total payroll (sum of all salaries)____________________________________________
function updateTotalPayroll() {
  const rows = document.querySelectorAll("#outputTable tbody tr");
  let total = 0;
  rows.forEach((row) => {
    const salary = parseFloat(row.cells[2].innerText.split("\n")[0]);
    if (!isNaN(salary)) total += salary;
  });
  document.getElementById(
    "totalPayroll"
  ).innerText = `Total Payroll: ${total.toLocaleString()} R`;
}

// Delete employees below or equal to threshold________________________________________
function deleteLowSalaryEmployees(threshold) {
  const rows = Array.from(document.querySelectorAll("#outputTable tbody tr"));
  rows.forEach((row) => {
    const salary = parseFloat(row.cells[2].innerText.split("\n")[0]);
    if (!isNaN(salary) && salary <= threshold) {
      deleteData(row.cells[4].querySelector("button")); 
    }
  });
  updateTotalPayroll();
}

//// Highlight high salary and bonus holders_________________________________________
function highlightEmployees() {
  const rows = document.querySelectorAll("#outputTable tbody tr");
  rows.forEach((row) => {
    const nameCell = row.cells[0];
    const salaryCell = row.cells[2];

    ///// Clear previous badges___________________________________________________________
    nameCell.querySelectorAll(".badge").forEach((b) => b.remove());

    const salary = parseFloat(salaryCell.innerText.split("\n")[0]);
    const hasBonus = salaryCell.querySelector("span");

    if (salary >= 100000) {
      const badge = document.createElement("span");
      badge.textContent = "HIGH";
      badge.className = "badge high";
      nameCell.appendChild(badge);
    }

    if (hasBonus) {
      const badge = document.createElement("span");
      badge.textContent = "BONUS";
      badge.className = "badge bonus";
      nameCell.appendChild(badge);
    }
  });
}

///// Hook into bonus modal close and addData to refresh badges/payroll
const originalClose = closeBonusModal;
closeBonusModal = function () {
  originalClose();
  highlightEmployees();
  updateTotalPayroll();
};

const originalAdd = addData;
addData = function () {
  originalAdd();
  highlightEmployees();
  updateTotalPayroll();
};

/////Search for employee by name___________________________________________________
function searchEmployeeByName() {
  const searchName = document
    .getElementById("searchNameInput")
    .value.trim()
    .toLowerCase();
  const rows = document.querySelectorAll("#outputTable tbody tr");

  rows.forEach((row) => {
    row.classList.remove("highlight");

    const nameCell = row.cells[0].cloneNode(true); 
    nameCell.querySelectorAll(".badge")?.forEach((b) => b.remove());

    const name = nameCell.textContent.trim().toLowerCase();

    if (name === searchName && searchName !== "") {
      row.classList.add("highlight");
    }
  });
}
///////////Validate and add data_____________________________________________
function validateAndAddData() {
  clearErrors();

  const name = document.querySelector(".name").value.trim();
  const role = document.querySelector(".role").value.trim();
  const salary = document.querySelector(".salary").value.trim();
  const state = document.querySelector(".status").value;

  const nameRegex = /^[A-Za-z\s]{2,}$/;
  const roleRegex = /^[A-Za-z\s]{2,}$/;//using regular exp.
  const salaryRegex = /^\d+(\.\d{1,2})?$/;

  let valid = true;

  if (!name || !nameRegex.test(name)) {
    showError(
      ".name",
      "Name must contain only letters and be at least 2 characters."
    );
    valid = false;
  }

  if (!role || !roleRegex.test(role)) {
    showError(
      ".role",
      "Role must contain only letters and be at least 2 characters."
    );
    valid = false;
  }

  if (!salary || !salaryRegex.test(salary)) {
    showError(
      ".salary",
      "Salary must be a valid number (e.g., 5000 or 5000.00)."
    );
    valid = false;
  }

  if (!state) {
    showError(".status", "Status is required.");
    valid = false;
  }

  if (valid) {
    addData(); // Call original addData
  }
}
////Error Message ___________________________________________________________
function showError(selector, message) {
  const field = document.querySelector(selector);
  const error = document.createElement("div");
  error.className = "error-message";
  error.innerText = message;
  field.parentNode.insertBefore(error, field.nextSibling);
  field.classList.add("input-error");
}
////clear Errors________________________________________________________________
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  document
    .querySelectorAll(".input-error")
    .forEach((el) => el.classList.remove("input-error"));
}

////Clear search__________________________________________________________
function clearSearch() {
  document.getElementById("searchNameInput").value = ""; 
  const rows = document.querySelectorAll("#outputTable tbody tr");
  rows.forEach((row) => row.classList.remove("highlight"));
}
