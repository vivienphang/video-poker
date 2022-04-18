// Create score table

/*
***************
GLOBAL VARIABLE
***************
*/

// Create function to calculate hand conditions
const setPointsWithMultiple = (multiple) => {
  const payoutContainer = document.getElementById('payout-container');
  payoutContainer[0].innerHTML = '';
  console.log(payoutContainer);

  Object.keys(handConditions).forEach((key) => {
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';
    const scoreKey = document.createElement('p');
    const scoreValue = document.createElement('p');
    scoreKey.innerHTML = key;
    scoreValue.innerHTML = handConditions[key] * multiple;
    scoreContainer.appendChild(scoreKey);
    scoreContainer.appendChild(scoreValue);
    payoutContainer[0].appendChild(scoreContainer);
  });
};

// let pointsElement;
// let betOnePlus;
// let betOneMinus;
// let betMax;
// const payoutContainer = document.getElementById('payout-container');

// Create function for payout table
// const createPayoutTable = () => {
//   // Create elements <table> and <body>
//   const table = document.createElement('table');
//   table.classList.add('scoreTable');
//   const tableBody = document.createElement('tbody');
//   tbody.classList.add('scoreTable');

//   // Create cells
//   for (j = 0; j <= 2; j += 1) {
//     // table row creation
//     const row = document.createElement('tr');

//     for (i = 0; i < 2; i += 1) {
//       // create element <td> and text node
//       // make text node the contents of <td> element
//       // put <td> at the end of table row
//       const cell = document.createElement('td');
//       const cellText = document.createTextNode('cell is a row');

//       cell.appendChild(cellText);
//       row.appendChild(cell);
//     }
//     // row added to end of table body
//     tableBody.appendChild(row);
//   }

//   // append the <tbody> inside the <table>
//   table.appendChild(tableBody);
//   // put <table> in the <body>
//   payoutContainer.appendChild(table);
//   // table border attribute to
//   table.setAttribute('border', '2');
// };
