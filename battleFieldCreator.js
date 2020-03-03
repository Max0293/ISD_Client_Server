function create(){
    return createShips(createBattleField(10, 10));
}

function createShips (array) {
    for (let i = 0; i < 4; i++) {
       array[0][i] = true;
    }
    for (let i = 0; i < 7; i++) {
       if (i < 3) {
          array[2][i] = true;
       } else if (i > 3) {
          array[2][i] = true;
       }
    }
    for (let i = 0; i < 8; i++) {
       if (i < 2) {
          array[4][i] = true;
       } else if (i > 2 && i < 5) {
          array[4][i] = true;
       } else if (i > 5 && i < 8) {
          array[4][i] = true;
       }
    }
    for (let i = 0; i <= 6; i++) {
       if (i % 2) {
          array[6][i] = true;
       }
    }
    return array;
 }

 function createBattleField (rows, columns) {
    const battleField = [];
    for (let i = 0; i < rows; i++) {
       battleField[i] = [];
       for (let j = 0; j < columns; j++) {
          battleField[i][j] = null;
       }
    }
    return battleField;
 }

 module.exports = create;