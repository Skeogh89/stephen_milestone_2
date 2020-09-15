/* current postion of the game*/

var stephen = function () {

    stephenPosition = (function () {
        var positions = {
            off: 0,
            on: 1,
            start: 2,
            addRadom: 3,
            sequence: 4,
            playerSelection: 5,
            incorrect: 6,
            correct: 7,
            win: 8,
        };
        var postion = positions.off;

        var returnObject = {
            getPosition: function () {
                return postion;
            },
            setPosition: function (i) {
                console.log('position' + i);
                if (i >= 0 && i <= postions.win) {
                    postion = i;
                }
            },
            positions: positions,
        };

        for (var k in positions)
            returnObject[k] = positions[k];

        return returnObject;

    })();

    var gp = gamePosition;
    var level = 0;
    var sequenceArr = [];
    var selection = 0;  /* I untion into setState*/
    var FINALROUND = 30;

    function nextLevel() {
        selection = 0;

        if (level + 1 > FINALROUND) {
            gp.setPosition(gp.win);
        }
        else {
            level += 1;
            sequenceArr.push(Math.floor(Math.random() * 3.98));
            gp.setPosition(gp.sequence);
        }
    }

    function select(button) {
        var k = gp.getPosition();

        if (!(k == gp.on || k == gp.playerSelection)) {
            return false;
        }

        if (k != gp.playerSelection)
            return true;

        selection += 1;

        if (button != sequenceArr[selection - 1]) {
            selection = 0;
            gp.setPosition(gs.incorrect);
        } else if (selection == sequenceArr.length) {
            gp.setPosition(gp.correct);
        }

        return true;
    }

    //Reset game

    function restart() {
        sequenceArr = [];
        level = 0;
        selection = 0;
    }

    function begin() {
        restart();
        nextLevel();
    }

    function toggleSwitch() {
        if (gp.getPosition(gp.off)) {
            gp.setPosition(gp.on);
            restart();
        } else {
            gp.setPosition(gp.off);
        }
    }

    return {
        getLevel: function () {
            return level;
        },
        getSequenceArr: function () {
            return sequenceArr;
        },
        isPosition: function (i) {
            return gp.getPosition() == i;
        },
        nextLevel: nextLevel,
        select: select,
        setPosition: gp.setPosition,
        begin: begin,
        positions: gp.positions,
        toggleSwitch: toggleSwitch,        
    };

}();

  /*Starting the Game*/

 (function () { 

    var app = angular.module('stephen', []);

    var ButtonSelection = function () {
        this.lit = false;
        this.light = function () {
            this.lit = true; 
        };
    };

    var SETTINGS = {
        playerPressMS: 400,
        comPressMS: 600,
        startComTimeoutMS: 1100,
        comTimeoutMS: null,
        speedIncrement: 150,
        incrementRounds: [5, 9, 13],
    }

    /*Control*/

    app.control ('Stephen Control', function ($timeout){
        var sg = stephenGame;
        var timeoutStack = [];

        this.buttons = [
            new ButtonSelection(),
            new ButtonSelection(),
            new ButtonSelection(),
            new ButtonSelection(),
        ];

        function clearTimeouts(){
            var ids = timeoutStack.length; 
            for (var a = 0; a < ids; a ++)
                $timeout.cancel(timeoutStack.pop());
        }

        this.getCountText = function() {
            var txt = '';
            if (this.startPosition()){
                txt = (sg.isPosition(sg.positions.on)) ? '--' : sg.getLevel();
            }

            return txt;
        };

        function comSequence() {
            lightSequence (sg.getSequenceArr(), SETTINGS.comPressMS, SETTINGS.comTimeoutMS);
        };
        
        this.getStart = function ()  {
            return !sg.isPosition(sg.positions.off);
        }

        function incrementSpeed() {
            SETTINGS.incrementRounds.map(function (a) {
                if (sg.getLevel() == a) {
                    SETTINGS.comTimeoutMS -= SETTINGS.speedIncrement;
                }
            });
        }

        function lightColor (a , ms, options) { 
            var btn = ctrl.buttons[a];
            options = (!options) ? {} : options;
            var nextPosition = options.nextPosition;
        }

        timout(function(){
            btn.lit = false;
            if (typeof nextPosition != 'undefined') {
                sg.setPosition(nextPosition);
            }
        }, ms);
        }

        function lightSequence (seq, lightMS, timeoutMS, a) {
            a = (typeof a == 'undefined') ? 0 : a ;

            if ( a < seq.length -1) {
                lightColor(seq[a], lighMS);
                timeoutMS(function(){
                    lightSequence(seq, lightMS, timeoutMS, a + 1);
                }, timeoutMS);
            } else if (a == seq.length -1) {
                lightColor(seq[i], lighMS, {
                    nextPosition: sg.positions.playerSelection
                });
                }
            }

            this.pressColor = function(a) {
                var ms = SETTINGS.playerPressMS;

                if(!sg.press(a))
                    return;
                switch (sg.getPosition()) {
                    case sg.positions.correct: lightColor(a, ms);
                    
                        timeout(function () {
                            sg.nextLevel();
                            if(sg.isPosition(sg.positions.sequence))
                                comSequence();
                            else if(sg.isPosition(sg.positions.win))
                                win();
                        }, 1600);
                        break;
                    case sg.positions.incorrect:
                        lightColor(a, 1000, {
                            
                            timeout(function () {
                            sg.setState(sg.states.comDemo);
                            doComDemo();
                            }
                        },1500);
                        break;
                    default:
                        lightColor(i, ms);
                        break;
                }
            };
                    
                    })
                }
            }
                })
            }

        }
        
        
        
        );
    

 })