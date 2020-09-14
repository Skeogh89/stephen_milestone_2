/* current postion of the game*/

var stephen = function () {

    stephenPosition = (function() {
        var positions = {
            off: 0 , 
            on: 1 , 
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
            getPosition: function() {
                return postion;
        },
        setPosition: function (i) {
            console.log ('position' + i);
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
            
            if (level +1 > FINALROUND){
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

            if(!(k == gp.on || k == gp.playerSelection)) {
                return false;
            }

            if (k != gp.playerSelection)
            return true;

            selection += 1;

            if (button != sequenceArr[selection -1]) {
                selection = 0;
                gp.setPosition(gs.incorrect);
            } else if (selection == sequenceArr.length) {
                gp.setPosition(gp.correct);
            }

            return true;
        }

        //Reset game

        function restart () {
            sequenceArr = [];
            level = 0;
            selection = 0;
        }

        function begin (){
            restart();
            nextLevel();
        }
       


    }