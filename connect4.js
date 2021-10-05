/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 let WIDTH = 7;
 let HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   for (let y = 0; y < HEIGHT; y++){
     //MY ATTEMPT 
     board.push(Array(WIDTH).fill());
     //SOLUTION
     // Question: {length:WIDTH}
     // board.push(Array.from({length:WIDTH}));
   }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   let htmlBoard = document.getElementById('board');
   // TODO: add comment for this code
     // When function runs - create table row ('tr') with an ID of 'column-top).  Each cell created in the row through the for loop will listen for the 'handleClick' function
   let top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   // For loop creates each cell above each column for the width of the board.  ID's are set based on position, starting at 0 with the ending value based on the width of the board.
   for (let x = 0; x < WIDTH; x++) {
     let headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code
     // This for loop creates the game board portion.  
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     // Initiates each of the rows for the below for loop to populate the row contents
     for (let x = 0; x < WIDTH; x++) {
       // Creates each cell within the row
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       // Sets the ID of each cell to y and x coordinates (row, column)
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 // Result produces the value requried for y within placeInTable
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for (let y = HEIGHT - 1; y >=0 ; y--){
     if (!board[y][x]){
       return y
     }
   }
   return null;
   }
   
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   let filledCell = document.getElementById(`${y}-${x}`);
   if (currPlayer === 1) {
     // Create P1 piece on baord
     let move = document.createElement('div');
     move.classList.add('piece','p1');
     board[y][x] = `${currPlayer}`
     filledCell.appendChild(move);
     currPlayer += 1;
   } else {
     // Create P2 piece on baord
     let move = document.createElement('div');
     move.classList.add('piece');
     move.classList.add('p2');
     board[y][x] = `${currPlayer}`
     filledCell.appendChild(move);
     currPlayer = 1
   }
 
 
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert('Game Over')
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID if clicked cell
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
 
   // Question: In-memory board?
   // Solution:
     // board[y][x] = currPlayer;
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
 
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   // Question: Is this required if included in placeInTable function?
 
   // if (currPlayer === 1){
   //   console.log(currPlayer)
   //   return 1
   // } else {
   //   console.log(currPlayer)
   //  return 2
   // }
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 