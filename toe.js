(function Game() {
    var game = document.getElementById('board');
    var boxes = document.querySelectorAll('li');
    var context = { 'player1' : 'x', 'player2' : 'o' };
    var board = [];
    var currentContext;
    var init = function() {
        turns = 0;
        currentContext = computeContext();
        board[0] = new Array(3);
        board[1] = new Array(3);
        board[2] = new Array(3);
        for(var i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', clickHandler, false);
        }
        resetGame.addEventListener('click', resetGameHandler, false);
    }
    var computeContext = function() {
        return (turns % 2 == 0) ? context.player1 : context.player2;
    }
    var clickHandler = function() {
        this.removeEventListener('click', clickHandler);
        this.className = currentContext;
        this.innerHTML = currentContext;
        var pos = this.getAttribute('data-pos').split(',');
        board[pos[0]][pos[1]] = computeContext() == 'x' ? 1 : 0;
        if(checkStatus()) {
            gameWon();
        }
        turns++;
        currentContext = computeContext();
        turnDisplay.className = currentContext;
    }

    var checkStatus = function() {
        var used_boxes = 0;
        for(var rows = 0; rows < board.length; rows++ ) {
            var row_total = 0;
            var column_total = 0;
            for(var columns = 0; columns < board[rows].length; columns++) {
                row_total += board[rows][columns];
                column_total += board[columns][rows];
                if(typeof board[rows][columns] !== "undefined") {
                    used_boxes++;
                }
            }
            var diagonal_tl_br = board[0][0] + board[1][1] + board[2][2];
            var diagonal_tr_bl = board[0][2] + board[1][1] + board[2][0];
            if(diagonal_tl_br == 0 || diagonal_tr_bl == 0 || diagonal_tl_br == 3 || diagonal_tr_bl == 3) {
                return true;
            }
            if(row_total == 0 || column_total == 0 || row_total == 3 || column_total == 3) {
                return true;
            }
            if(used_boxes == 9) {
                gameDraw();
            }
        }
    }
    var gameWon = function() {
        clearEvents();
    }



    var clearEvents = function() {
        for(var i = 0; i < boxes.length; i++) {
            boxes[i].removeEventListener('click', clickHandler);
        }
    }
    var resetGame = document.getElementById('reset');
    var resetGameHandler = function() {
        clearEvents();
        init();

        for(var i = 0; i < boxes.length; i++) {
            boxes[i].className = '';
            boxes[i].innerHTML = '';
        }
    }

    game && init();
}
)();
