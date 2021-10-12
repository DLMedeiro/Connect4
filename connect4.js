/** Connect Four
 *
 * Player 1 and 2 alternate turns.
 * On each turn, a piece is dropped down a column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 * On page load makeBoard and makeHtmlboard run to set up the game board
 */

 let WIDTH = 7;
 let HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 

//  MakeBoard: Creates the non-visual empty array for the game board based on Height and Width
 function makeBoard() {
   for (let y = 0; y < HEIGHT; y++){
     //MY ATTEMPT: Transforms "board" into an array with the length matching the value of "width".  Each element of the array is undefined at the start of the game 
     board.push(Array(WIDTH).fill());

     //SOLUTION: board.push(Array.from({length:WIDTH}));
   }
 }
 
  // makeHtmlBoard: Creates the visual game board (htmlBoard)
 function makeHtmlBoard() {
  
     // Part 1: Create top row for player selection
    // a. Create the top table row
    // b. Use "Width" to identify the 'x' location and quantity of cells to add into the top row
    // c. Event listeners added to each cell initiate game play later on

   let htmlBoard = document.getElementById('board');
   let top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);

   for (let x = 0; x < WIDTH; x++) {
     let headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
  //  Part 2: Create the remaining cells of the game board.
  // a. Create the number of rows based on "height"
  // b. Create the number of cells in each row based on "width"
  // c. Create individual IDs based on x and y coordinates to track game play
    
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
//  findSpotForCol: using the 'x' value produced within makeHtmlBoard, this function returns the y value of where the game piece should be placed
// The 'y' value provided will be located in the last row unless that cell is already occupied.  If occupied the 'y' value will be the next available value starting from the bottom of the board and moving upward.
 function findSpotForCol(x) {
   for (let y = HEIGHT - 1; y >=0 ; y--){
     if (!board[y][x]){
       return y
     }
   }
   return null;
   }
   
 
//  placeInTable: Creates the visual game pieces when each player makes a selection
// Placement is determined by the x value generated in makeHtmlBoard and the y value is generated in findSpotForCol
// 'y' provides which column
// 'x' provides which row
 function placeInTable(y, x) {
   let filledCell = document.getElementById(`${y}-${x}`);
   if (currPlayer == 1) {
     // Create P1 piece on baord
     let move = document.createElement('div');
     move.classList.add('piece','p1');
     board[y][x] = currPlayer;
     filledCell.appendChild(move);
   } else {
     // Create P2 piece on baord
     let move = document.createElement('div');
     move.classList.add('piece');
     move.classList.add('p2');
     board[y][x] = currPlayer;
     filledCell.appendChild(move);
   }
 
   //  SOLUTION:
   /*function placeInTable(y, x) {
     const piece = document.createElement('div');
     piece.classList.add('piece');
     piece.classList.add(`p${currPlayer}`);
     piece.style.top = -50 * (y + 2);
   
     const spot = document.getElementById(`${y}-${x}`);
     spot.append(piece);
   }
    */
 
 }

 /** endGame: announce game end */
 function endGame(msg) {
   alert(msg)
 }
 
 /** handleClick: handle click of column top to play piece - click runs functions listed above*/
 function handleClick(evt) {
   // get x from ID if cell is clicked
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   // Solution: board[y][x] = currPlayer;

   placeInTable(y, x);

   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie: starting with the board, look at each row, then each cell.  If all are true the game ends in a tie
   if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie Game!');
  }

   // switch players
   if (currPlayer == 1){
     currPlayer = 2;
   } else {
     currPlayer = 1;
   }
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
    //  Validates the x/y values produced within the horiz, vert, and diag parameters are on the board and have the same player assigned
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
  //  After each click function, below will evaluate the current x/y values to see if any conditions are met.  
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
 