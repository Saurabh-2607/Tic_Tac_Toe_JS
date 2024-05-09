function continueGame() {
    var player1Name = document.getElementById("player1").value.trim();
    var player2Name = document.getElementById("player2").value.trim();

    if (player1Name === "") {
        player1Name = "Player 1";
    }
    if (player2Name === "") {
        player2Name = "Player 2";
    }

    localStorage.setItem("player1Name", player1Name);
    localStorage.setItem("player2Name", player2Name);

    window.location.href = "MultiplayerGame.html";
}