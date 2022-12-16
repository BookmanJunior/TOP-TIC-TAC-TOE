const gameBoard = (() => {
  const board = new Array(9);
  const getGameBoard = () => [...board];

  const setCell = (position, marker) => {
    board[position] = marker;
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
