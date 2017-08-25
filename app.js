new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attach: function() {
            this.doAttach(3, 10, false);
        },
        specialAttach: function() {
            this.doAttach(10, 20, true);
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.logIt(true, 'Player heals for 10');
            this.monsterAttachs();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        doAttach: function (min, max, hard) {
            if (this.playerAttachs(min, max, hard)) {
                this.monsterAttachs();
            }
        },
        playerAttachs: function(min, max, hard) {
            var damage = this.calculateDamage(min, max);
            this.monsterHealth -= damage;

            var text;
            if (hard) {
                text = 'Player hits Monster hard for ' + damage;
            } else {
                text = 'Player hits Monster for ' + damage;
            }
            this.logIt(true, text);

            if (this.checkWin()) {
                return false;
            }
            return true;
        },
        monsterAttachs: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;

            this.logIt(false, 'Monster hits Player for ' + damage);

            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        logIt: function(isPlayer, text) {
            this.turns.unshift({ isPlayer: isPlayer, text: text });
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});
