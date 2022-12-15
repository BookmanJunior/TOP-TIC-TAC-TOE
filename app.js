const gameBoard = (() => {
  const board = new Array(9);
  const getGameBoard = () => Object.freeze(board);

  const setCell = (position, value) => {
    board[position] = value;
  };

  return { getGameBoard, setCell };
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
