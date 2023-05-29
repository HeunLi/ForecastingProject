document.getElementById("addExpenseBtn").addEventListener("click", addRow);

function addRow() {
  var table = document.getElementById("myTable");
  var lastRow = table.rows[table.rows.length - 1];

  var previousValue = lastRow.cells[1].textContent;
  var currentValue = lastRow.cells[2].textContent;
  
  var newRow = table.insertRow();
  newRow.innerHTML = `
    <td class="text-center">${table.rows.length - 1}</td>
    <td class="text-center" contenteditable="true">0</td>
    <td class="text-center" contenteditable="true">${previousValue}</td>
    <td class="text-center" contenteditable="true">0</td>
  `;
  
  addCellEventListeners(newRow); 
  updateAbsoluteValue(newRow); 
  updateSumDisplay(); // Update the sum display
  addNegativeClass(); // Add a class to highlight negative values
}

function addCellEventListeners(row) {
  var actualSalesCell = row.cells[1];
  var forecastSalesCell = row.cells[2];
  
  actualSalesCell.addEventListener("input", function() {
    updateAbsoluteValue(row);
    updateSumDisplay();
    addNegativeClass();
    updateAverageDisplay();
  });
  
  forecastSalesCell.addEventListener("input", function() {
    updateAbsoluteValue(row);
    updateSumDisplay();
    addNegativeClass();
    updateAverageDisplay();
  });
}

function updateAbsoluteValue(row) {
  var actualSales = row.cells[1].textContent;
  var forecastSales = row.cells[2].textContent;
  
  var actualSalesValue = parseFloat(actualSales);
  var forecastSalesValue = parseFloat(forecastSales);
  
  if (!isNaN(actualSalesValue) && !isNaN(forecastSalesValue)) {
    var result = forecastSalesValue - actualSalesValue;
    row.cells[3].textContent = result;
  } else {
    row.cells[3].textContent = "Invalid";
  }
  
  updateSum();
  updateAverageDisplay();
}

function updateSum() {
  var table = document.getElementById("myTable");
  var sum = 0;

  for (var i = 1; i < table.rows.length; i++) {
    var value = parseInt(table.rows[i].cells[3].textContent);
    sum += Math.abs(value); // Treat negative values as positive
  }

  document.getElementById("sumDisplay").textContent = sum;
}

function updateSumDisplay() {
  var sumDisplay = document.getElementById("sumDisplay");
  sumDisplay.textContent = 0; // Reset the sum initially
  updateSum(); // Update the sum
}

function updateAverageDisplay() {
  var table = document.getElementById("myTable");
  var numRows = table.rows.length - 2; // Subtracting header row and sum row
  var sum = parseInt(document.getElementById("sumDisplay").textContent);
  var average = sum / numRows;

  document.getElementById("averageDisplay").textContent = average;
}

function addNegativeClass() {
  var table = document.getElementById("myTable");

  for (var i = 1; i < table.rows.length; i++) {
    var value = parseInt(table.rows[i].cells[3].textContent);
    
    if (value < 0) {
      table.rows[i].cells[3].classList.add("negative"); // Add a class to highlight negative values
    } else {
      table.rows[i].cells[3].classList.remove("negative"); // Remove the class for positive values
    }
  }
}





