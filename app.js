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

  const checkForWin = (marker) =>
    winPatterns.find((winPattern) =>
      winPattern.every((element) => board[element].includes(marker))
    );

  const checkForDraw = () => board.every((item) => item);

  const getEmptyCells = () =>
    board.reduce((acc, curr, currIndex) => {
      if (!curr) {
        acc.push(currIndex);
      }
      return acc;
    }, []);

  const getRandomEmptyCell = () => {
    const cells = getEmptyCells();
    const randomCell = Math.floor(Math.random() * cells.length);
    return cells[randomCell];
  };

  return {
    getGameBoard,
    setCell,
    resetBoard,
    checkForWin,
    checkForDraw,
    getRandomEmptyCell,
  };
})();

const displayController = (() => {
  const cells = Array.from(document.getElementsByClassName("cell"));
  const playerContainer = {
    player1: document.getElementById("player1Wrapper"),
    player2: document.getElementById("player2Wrapper"),
  };
  const restartBtn = document.getElementById("restartBtn");
  const getCells = () => [...cells];
  const getPlayerContainer = () => playerContainer;

  const render = () => {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getGameBoard()[index];
    });
  };

  const setWinClasses = (array, player) => {
    array.forEach((item) => {
      cells[item].classList.add("win", "win-animation");
      cells[item].style.animationDelay = "0s"; // removes cell's entrance animation delay
    });
    playerContainer[player].classList.add("winner");
  };

  const setDrawClasses = (array) => {
    array.forEach((item) => {
      item.classList.add("draw");
    });
  };

  const setTurnIndicator = (currentPlayer) => {
    const newDiv = document.createElement("div");
    newDiv.className = "turn-indicator";
    playerContainer[currentPlayer].appendChild(newDiv);
  };

  // Adds line under player1
  setTurnIndicator("player1");

  const removeTurnIndicator = (currentPlayer) => {
    const element =
      playerContainer[currentPlayer].querySelector(".turn-indicator");
    if (element) element.remove();
  };

  const resetClasses = () => {
    cells.forEach((cell) => {
      cell.className = "cell";
    });
    playerContainer.player1.className = "player-wrapper";
    playerContainer.player2.className = "player-wrapper";

    removeTurnIndicator("player1");
    removeTurnIndicator("player2");
    setTurnIndicator("player1");
  };

  const displayDropdown = (e) => {
    const dropdownArrow = document.getElementById("dropdownArrow");
    const dropdownContent = document.getElementById("dropdownMenu");
    const isDropdownArrow = e.target.matches(".dropdown-arrow");

    if (isDropdownArrow) {
      dropdownArrow.classList.toggle("active");
      dropdownContent.classList.toggle("active");
    }

    if (!isDropdownArrow) {
      dropdownArrow.classList.remove("active");
      dropdownContent.classList.remove("active");
    }
  };

  document.addEventListener("click", displayDropdown);

  const setPlayer = (e, player, fn) => {
    // sets new player and restarts the game
    const name = e.target.textContent;
    if (name === player.getName()) return;

    if (e.target.matches(".player-option")) {
      player.setName(name);
      document.querySelector(".player-2").textContent = player.getName();
      fn();
    }
  };

  return {
    render,
    getCells,
    getPlayerContainer,
    setWinClasses,
    setDrawClasses,
    setTurnIndicator,
    removeTurnIndicator,
    resetClasses,
    setPlayer,
    restartBtn,
  };
})();

const Player = (name, marker, id) => {
  const getName = () => name;
  const getMarker = () => marker;
  const getId = () => id; // unique id to identify players regardless of name

  const setName = (newName) => {
    name = newName;
  };

  const makeMove = (index) => {
    gameBoard.setCell(index, marker);
    displayController.render();
  };

  return { makeMove, getName, getMarker, getId, setName };
};

const gameController = (() => {
  const player1 = Player("Player 1", "x", "player1");
  const player2 = Player("Player 2", "o", "player2");
  const cells = displayController.getCells();
  let gameOn = true;
  let restartTimer;
  let currentPlayer = player1;

  const changeTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const restartGame = () => {
    gameOn = true;
    currentPlayer = player1;
    gameBoard.resetBoard();
    displayController.resetClasses();
    displayController.render();
  };

  const playRound = (cell, index) => {
    if (!cell.textContent) {
      currentPlayer.makeMove(index);
      displayController.removeTurnIndicator(currentPlayer.getId());

      const winPattern = gameBoard.checkForWin(currentPlayer.getMarker());
      if (winPattern) {
        gameOn = false;
        displayController.setWinClasses(winPattern, currentPlayer.getId());
        restartTimer = setTimeout(restartGame, 1000);
        return;
      }

      if (!winPattern && gameBoard.checkForDraw()) {
        gameOn = false;
        displayController.setDrawClasses(cells);
        restartTimer = setTimeout(restartGame, 1000);
        return;
      }

      changeTurn();
      displayController.setTurnIndicator(currentPlayer.getId());

      if (currentPlayer.getName() === "Random AI") {
        const randomEmptyCell = gameBoard.getRandomEmptyCell();
        playRound(randomEmptyCell, randomEmptyCell);
      }
    }
  };

  const playGame = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameOn) {
          playRound(cell, index);
        }
      });
    });
  };

  displayController.restartBtn.addEventListener("click", () => {
    clearTimeout(restartTimer);
    restartGame();
  });

  document.addEventListener("click", (e) => {
    displayController.setPlayer(e, player2, restartGame);
  });

  return { playGame };
})();

gameController.playGame();
