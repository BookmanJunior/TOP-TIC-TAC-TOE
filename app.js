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

  const render = () => {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getGameBoard()[index];
    });
  };

  return { render };
})();

const Player = () => {};
