const tic_tac_toe = {
    board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    symbols: {
        options: ['O', 'X'],
        turn_index: 0,
        change() {
            this.turn_index = this.turn_index === 0 ? 1 : 0;
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init(container) {
        this.container_element = container;
    },

    make_play(position) {
        if (this.gameover) {
            const gameOverMessage = document.getElementById('game-over-message');
            gameOverMessage.style.display = 'block';
            setTimeout(() => {
                gameOverMessage.style.display = 'none';
            }, 2000); // Hide the game over message after 2 seconds
            return false;
        }
        if (this.board[position] !== ' ') {
            const alertMessage = document.getElementById('alert-message');
            alertMessage.style.display = 'block';
            setTimeout(() => {
                alertMessage.style.display = 'none';
            }, 2000); // Hide the alert message after 2 seconds
            return false;
        }

        const currentPlayerSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentPlayerSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentPlayerSymbol);
        if (this.is_game_over()) {
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
            this.printResult(`${currentPlayerSymbol} Wins! Congratulations!`);
        } else if (this.is_game_over()) {
            this.game_is_over();
            this.printResult("It's a draw!");
        } else {
            this.symbols.change();
            if (this.symbols.turn_index === 1) {
                // Computer's turn
                setTimeout(() => {
                    const computerMove = this.getComputerMove();
                    this.make_play(computerMove);
                }, 800); // Delay of 2 seconds before the computer's move
            }
        }

        this.updateTurnInfo(); // Update turn information after each move

        return true;
    },

    getComputerMove() {
        // This function should return the index of the position where the computer wants to make its move
        // You need to implement the logic for the computer's moves here
        // For simplicity, you can implement a basic strategy that makes random valid moves
        let availableMoves = [];
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === ' ') {
                availableMoves.push(i);
            }
        }
        // Choose a random available move
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    },

    stylize_winner_sequence(winner_sequence) {
        winner_sequence.forEach((position) => {
            this
                .container_element
                .querySelector(`.cell-${position}`)
                .classList.add('winner');
        });
    },

    check_winning_sequences(symbol) {
        for (let i = 0; i < this.winning_sequences.length; i++) {
            const sequence = this.winning_sequences[i];
            if (this.board[sequence[0]] === symbol &&
                this.board[sequence[1]] === symbol &&
                this.board[sequence[2]] === symbol) {
                return i;
            }
        }
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    is_game_over() {
        return !this.board.includes(' ');
    },

    start() {
        this.board.fill(' ');
        this.draw();
        this.gameover = false;
        this.updateTurnInfo(); // Update turn information when the game starts
    },

    restart() {
        this.start();
        this.printResult('');
        console.log('This game has been restarted!');
    },

    draw() {
        this.container_element.innerHTML = this.board.map((element, index) => `<div class="cell-${index} cell" onclick="tic_tac_toe.make_play(${index})">${element}</div>`).join('');
    },

    printResult(message) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = message;
    },

    updateTurnInfo() {
        const turnInfoElement = document.getElementById('turn-info');
        if (this.symbols.turn_index === 1) {
            turnInfoElement.textContent = "Computer's Move"; // Display message for computer's move
        } else {
            turnInfoElement.textContent = "Your Move"; // Display message for user's move
        }
    },
};

document.addEventListener('DOMContentLoaded', function () {
    const boardContainer = document.getElementById('board');
    tic_tac_toe.init(boardContainer);
    tic_tac_toe.start();
});
