let myTable = [];
const name = document.querySelector("#fname");
const dateEl = document.querySelector("#date");
const amountEl = document.querySelector("#amount");
const inputBtn = document.querySelector("#input-btn");
const tableBody = document.querySelector("#t-body");
// getting the item from localStorage and passing in the parse method to parse it back to an object or array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myTable"));

// this evaluates to a true or false situation to determine whether the code runs or not. this will make the inputs not able to vanish on refresh of the page
if (leadsFromLocalStorage) {
  myTable = leadsFromLocalStorage;
  render(myTable);
}

function deleteRow(event) {
  // accessing the button id itself gives the same id of the row itself, calling this gives row 1
  let row = event.target.id;
  //accessing the the last element of the row 1
  let index = row[row.length - 1];
  // deletes the row
  myTable.splice(index, 1);
  // re-render the table
  render(myTable);
  localStorage.setItem("myTable", JSON.stringify(myTable));
}

function render(table) {
  let tableHTML = "";
  let tableItems = "";

  table.forEach((row, i) => {
    row.forEach((column, j) => {
      tableItems += `<td class= "cell${j}">${column}</td> `;
    });
    tableItems += `<td><span onclick="deleteRow(event)" id="row${i}">X</span></td>`;
    tableHTML += `<tr> ${tableItems} </tr>`;
    //empty table items
    tableItems = "";
  });
  // setting the table body innerHTML to the tableHTML variable
  tableBody.innerHTML = tableHTML;
}

inputBtn.addEventListener("click", () => {
  // Appending the dollar sign to the amountEl.value
  const dollarAppend = `$${amountEl.value}`;
  // making sure the input is valid and the user isn't passing an empty string
  if (name.value != "" && dateEl.value != "" && amountEl.value != "") {
    myTable.push([name.value, dateEl.value, dollarAppend]);
    //   emptying the input boxes as soon as the content as been pushed to the array
    name.value = "";
    dateEl.value = "";
    amountEl.value = "";
    localStorage.setItem("myTable", JSON.stringify(myTable));
    render(myTable);
  }
});
