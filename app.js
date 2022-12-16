const gameBoard = (() => {
  const board = new Array(9).fill("");
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];
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
  const getMarker = () => marker;

  const makeMove = (index) => {
    gameBoard.setCell(index, getMarker());
    displayController.render();
  };

  return { makeMove, getMarker };
};

const gameController = (() => {
  const player1 = Player("x");
  const player2 = Player("o");

  let currentPlayer = player1;

  const changeTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const playGame = () => {
    const cells = displayController.getCells();

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          currentPlayer.makeMove(index);
          changeTurn();
        }
      });
    });
  };

  return { playGame };
})();

gameController.playGame();
