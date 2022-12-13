const Gameboard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const getGameBoard = () => gameBoard;
  const addNewValue = (value, index) => {
    gameBoard[index] = value;
  };

  return {
    getGameBoard,
    addNewValue,
  };
})();

const displayController = (() => {
  const domGameBoard = document.getElementById("gameBoard");
  const cells = domGameBoard.querySelectorAll(".cell");

  const render = () => {
    const gameBoard = Gameboard.getGameBoard();
    for (i = 0; i < cells.length; i++) {
      cells[i].textContent = gameBoard[i];
    }
  };

  const displayMove = () => {
    Array.from(cells).forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent !== "x" || cell.textContent !== "o") {
          Gameboard.addNewValue("x", index);
          render();
        }
      });
    });
  };

  return {
    render,
    displayMove,
  };
})();

const Player = (name) => {};

displayController.displayMove();
