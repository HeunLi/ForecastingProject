var table = document.getElementById("myTable");

function calculateAndUpdateMAV() {
  // Access every row data
  var row1 = table.rows[1];
  var row2 = table.rows[2];
  var row3 = table.rows[3];
  var row4 = table.rows[4];
  var row5 = table.rows[5];
  var row6 = table.rows[6];
  var row7 = table.rows[7];
  var row8 = table.rows[8];
  var row9 = table.rows[9];
  var row10 = table.rows[10];
  var row11 = table.rows[11];
  var row12 = table.rows[12];

  // Access cells in the row
  var cell1 = row1.cells[1];
  var cell2 = row2.cells[1];
  var cell3 = row3.cells[1];
  var cell4 = row4.cells[1];
  var cell5 = row5.cells[1];
  var cell6 = row6.cells[1];
  var cell7 = row7.cells[1];
  var cell8 = row8.cells[1];
  var cell9 = row9.cells[1];
  var cell10 = row10.cells[1];
  var cell11 = row11.cells[1];
  var cell12 = row12.cells[1];

  // Access cells in MAV Column
//   var mma1 = row1.cells[2];
//   var mma2 = row2.cells[2];
//   var mma3 = row3.cells[2];
  var mma4 = row4.cells[2];
  var mma5 = row5.cells[2];
  var mma6 = row6.cells[2];
  var mma7 = row7.cells[2];
  var mma8 = row8.cells[2];
  var mma9 = row9.cells[2];
  var mma10 = row10.cells[2];
  var mma11 = row11.cells[2];
  var mma12 = row12.cells[2];

  // Calculate MAV
  var mav1 = (parseFloat(cell1.innerHTML) + parseFloat(cell2.innerHTML) + parseFloat(cell3.innerHTML)) / 3;
  var mav2 = (parseFloat(cell2.innerHTML) + parseFloat(cell3.innerHTML) + parseFloat(cell4.innerHTML)) / 3;
  var mav3 = (parseFloat(cell3.innerHTML) + parseFloat(cell4.innerHTML) + parseFloat(cell5.innerHTML)) / 3;
  var mav4 = (parseFloat(cell4.innerHTML) + parseFloat(cell5.innerHTML) + parseFloat(cell6.innerHTML)) / 3;
  var mav5 = (parseFloat(cell5.innerHTML) + parseFloat(cell6.innerHTML) + parseFloat(cell7.innerHTML)) / 3;
  var mav6 = (parseFloat(cell6.innerHTML) + parseFloat(cell7.innerHTML) + parseFloat(cell8.innerHTML)) / 3;
  var mav7 = (parseFloat(cell7.innerHTML) + parseFloat(cell8.innerHTML) + parseFloat(cell9.innerHTML)) / 3;
  var mav8 = (parseFloat(cell8.innerHTML) + parseFloat(cell9.innerHTML) + parseFloat(cell10.innerHTML)) / 3;
  var mav9 = (parseFloat(cell9.innerHTML) + parseFloat(cell10.innerHTML) + parseFloat(cell11.innerHTML)) / 3;
  var mav10 = (parseFloat(cell10.innerHTML) + parseFloat(cell11.innerHTML) + parseFloat(cell12.innerHTML)) / 3;

  // Update MAV
  mma4.innerHTML = mav1.toFixed(2); // Update MAV with 2 decimal places
  mma5.innerHTML = mav2.toFixed(2);
  mma6.innerHTML = mav3.toFixed(2);
  mma7.innerHTML = mav4.toFixed(2);
  mma8.innerHTML = mav5.toFixed(2);
  mma9.innerHTML = mav6.toFixed(2);
  mma10.innerHTML = mav7.toFixed(2);
  mma11.innerHTML = mav8.toFixed(2);
  mma12.innerHTML = mav9.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
  generateGraph();
});

function generateGraph() {
  var actualSales = document.querySelectorAll('#myTable tr td:nth-child(2)');
  var movingAverage = document.querySelectorAll('#myTable tr td:nth-child(3)');
  var labels = [];
  var salesData = [];
  var movingAverageData = [];

  actualSales.forEach(function(td) {
      labels.push(td.parentElement.firstElementChild.textContent);
      salesData.push(parseInt(td.textContent));
  });

  movingAverage.forEach(function(td) {
      movingAverageData.push(parseInt(td.textContent));
  });

  var ctx = document.getElementById('chart').getContext('2d');

  if (window.myChart) {
      window.myChart.data.labels = labels;
      window.myChart.data.datasets[0].data = salesData;
      window.myChart.data.datasets[1].data = movingAverageData;
      window.myChart.update();
  } else {
      window.myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Actual Sales',
                  data: salesData,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }, {
                  label: '3-Month Moving Average',
                  data: movingAverageData,
                  backgroundColor: 'rgba(192, 75, 192, 0.2)',
                  borderColor: 'rgba(192, 75, 192, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }
}

// Add event listeners to editable table cells
var editableCells = document.querySelectorAll('#myTable td[contenteditable="true"]');
editableCells.forEach(function(cell) {
  cell.addEventListener('input', function() {
      generateGraph();
  });
});

// Attach event listeners to cells
table.addEventListener("input", calculateAndUpdateMAV);

// Initial MAV calculation and update
calculateAndUpdateMAV();
