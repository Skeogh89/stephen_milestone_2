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
            getState: function() {
                return postion;
        },
        setState: function (i) {
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
    }