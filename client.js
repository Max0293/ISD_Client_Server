module.exports = createSeaBattle;

function createSeaBattle (battleField) {
   const missFire = -1;
   const hitFire = 0;
   const deathHit = 1;
   
   return (x) => {
      return (y) => {
         validate(x, y, battleField);
         if (checkEndGame(battleField)) {
            throw new Error('Game over');
         } else if (battleField[x][y] === true) {
            battleField[x][y] = false;
            if (isShipDestroyed(battleField, x, y)) {
               return {result: deathHit, resultArray: battleField};
            }
            return {result: hitFire, resultArray: battleField};
         }  else if (battleField[x][y] === null) {
            battleField[x][y] = missFire;
            return {result: missFire, resultArray: battleField};
         };
      };
   };
};

function checkEndGame (array) {
   for (const rows of array) {
      for (const cell of rows) {
         if (cell === true) {
            return false;
         };
      };
   };
   return true;
};

function isShipDestroyed (array, y, x) {
   let result = true;
   let checkX = true;
   let checkY = true;
   let bottomKey = y - 1;
   let upperKey = y + 1;
   let rightKey = x + 1;
   let leftKey = x - 1;

   while (array[upperKey][x] !== null && array[bottomKey][x] !== null) {
      if (array[upperKey][x] === true || array[bottomKey][x] === true) {
         checkX = false;
      }
      upperKey++;
      bottomKey--;
   };

   while (array[y][leftKey] !== null && array[y][rightKey] !== null) {
      if (array[y][leftKey] === true || array[y][rightKey] === true) {
         checkY = false;
      }
      leftKey--;
      rightKey++;
   }
   result = checkX === checkY;
   return result;
};

function validate (currentY, currentX, battleField) {
   if (currentX < 0 || currentX > 9) {
      throw new Error('You are enter incorrect number (correct = 0-9)');
   }
   if (currentY < 0 || currentY > 9) {
      throw new Error('You are enter incorrect number (correct = 0-9)');
   }
   if (typeof (currentX) !== 'number' || typeof (currentY) !== 'number') {
      throw new Error('You are enter incorrect data');
   }
   if (isNaN(currentX) || isNaN(currentY)) {
      throw new Error('You are enter incorrect data');
   }
   if (battleField[currentY][currentX] !== true && battleField[currentY][currentX] !== null) {
      throw new Error('You already shot in this cell');
   }
};
