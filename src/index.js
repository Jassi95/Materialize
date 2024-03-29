console.log();

var size = 5;
var gameTable = Array(size)
  .fill()
  .map(() => Array(size).fill(0)); //makes 5x5 table
var turn = 1;
var time;
//functions to handle the HTML
console.log("HELLO");

if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  main();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    main();
  });
}

function main() {
  //  board = document.getElementById('board');
  console.log("hello");
  createTable(size);
  //var location = document.querySelector("div.box");
  // listen for a click
  timer();
}

function timer() {
  //https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_progressbar_labels_js4
  var elem = document.getElementById("myBar");
  var width = 0;
  time = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(time);
      //document.getElementById("myP").className = "w3-text-green w3-animate-opacity";
      if (turn === 1) {
        turn = 2;
      } else {
        turn = 1;
      }
      timer();
    } else {
      width++;
      elem.style.width = width + "%";
      var num = (width * 1) / 10;
      num = num.toFixed(0);
      num = 10 - num;
      document.getElementById("demo").innerHTML = num;
    }
  }
}

function addCell(tr, colnum) {
  var td = document.createElement("div");
  td.id = colnum;

  td.className = "box b-bottom col s2 push-s1 valign flow-text";
  td.innerHTML = "";
  td.addEventListener("mousedown", () => {
    engine();
  });
  tr.appendChild(td);
}

function addRow(rownum) {
  var tr = document.createElement("div");
  var test = document.createElement("p");
  var board = document.getElementById("board");
  test.innerHTML = "HALOJATA HALLOOO";
  tr.id = rownum;
  tr.className = "row";
  board.appendChild(tr);
  for (var i = 0; i < size; i++) {
    addCell(tr, i);
  }
}

function createTable(size) {
  for (var i = 0; i < size; i++) {
    addRow(i);
  }
}

//functions to handle the functionalities
function gameEnding() {
  //resets the game
  window.location.reload();
}

function five_in_row(array) {
  var n = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1] && array[i] !== 0) {
      n = n + 1;
    } else {
      n = 0;
    }
    //console.log(n)
    if (n === 4) {
      if (turn === 2) {
        alert("Player 1 won!");
      } else {
        alert("Player 2 won!");
      }
      gameEnding();
    }
  }
}

function check() {
  var l_to_r = [];
  var r_to_l = [];
  //horizontal
  for (let y = 0; y < size; y++) {
    five_in_row(gameTable[y]);
  }
  //diaconal
  for (let x = 0; x < size; x++) {
    //https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array
    var col = gameTable.map(function(value, index) {
      return value[x];
    });
    five_in_row(col);
  }
  //cross from left to right
  for (let i = 0; i < size; i++) {
    l_to_r.push(gameTable[i][size - i - 1]);
  }
  five_in_row(l_to_r);
  //console.log(l_to_r);

  //cross from right to left
  for (let j = 0; j < size; j++) {
    r_to_l.push(gameTable[j][j]);
  }
  five_in_row(r_to_l);
}

function engine(x, y) {
  y = event.target.parentNode.id;
  x = event.target.id;
  clearInterval(time);
  timer();
  console.log(x, y, gameTable);
  if (gameTable[x][y] === 0) {
    gameTable[x][y] = turn;
    if (turn === 1) {
      event.target.innerHTML = "x";
      event.target.className += " green";
    } else {
      event.target.innerHTML = "o";
      event.target.className += " red accent-1";
    }
    //change turn
    if (turn === 2) {
      turn = 1;
    } else turn = 2;
    check();
  }
}
