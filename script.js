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

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentSymbol;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()) {
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
            this.printResult(`${currentSymbol} Wins! Congratulations!`);
        } else if (this.is_game_over()) {
            this.game_is_over();
            this.printResult("It's a draw!");
        } else {
            this.symbols.change();
        }

        return true;
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
};

document.addEventListener('DOMContentLoaded', function () {
    const boardContainer = document.getElementById('board');
    tic_tac_toe.init(boardContainer);
    tic_tac_toe.start();

    const playAgainButton = document.querySelector('button');
    playAgainButton.addEventListener('click', function () {
        tic_tac_toe.restart();
    });
});
