const Gameboard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const cells = document.querySelectorAll(".cell");

  const render = () => {
    for (i = 0; i < cells.length; i++) {
      cells[i].textContent = gameBoard[i];
    }
  };

  const addNewValue = (value, index) => {
    gameBoard[index] = value;
    render();
  };

  return {
    addNewValue,
  };
})();

const displayController = (() => {
  const domGameBoard = document.getElementById("gameBoard");
  const cells = domGameBoard.querySelectorAll(".cell");

  const displayMove = (value) => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          Gameboard.addNewValue(value, index);
        }
      });
    });
  };

  return {
    displayMove,
  };
})();

const Player = (name) => {};
