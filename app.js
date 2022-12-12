const Gameboard = (() => {
  const gameBoard = ["x", "o", "x", "o", "x", "o", "x", "x", ""];
  const getGameBoard = () => gameBoard;

  return {
    getGameBoard,
  };
})();

const displayController = ((e) => {
  const domGameBoard = document.getElementById("gameBoard");
  const cells = domGameBoard.querySelectorAll(".cell");

  const render = () => {
    const gameBoard = Gameboard.getGameBoard();
    for (i = 0; i < cells.length; i++) {
      cells[i].textContent = gameBoard[i];
    }
  };

  return {
    render,
  };
})();

const Player = (name) => {};

displayController.render();
