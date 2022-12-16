const gameBoard = (() => {
  const board = new Array(9).fill("");
  const getGameBoard = () => [...board];

  const setCell = (position, marker) => {
    board[position] = marker;
  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getGameBoard, setCell, resetBoard };
})();

const displayController = (() => {
  const cells = Array.from(document.getElementsByClassName("cell"));
  const getCells = () => [...cells];

  const render = () => {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getGameBoard()[index];
    });
  };

  return { render, getCells };
})();

const Player = (marker) => {
  const makeMove = () => {
    const cells = displayController.getCells();
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          gameBoard.setCell(index, marker);
          displayController.render();
        }
      });
    });
  };

  return { makeMove };
};
