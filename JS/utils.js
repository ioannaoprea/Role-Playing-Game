// returns an array of random dice numbers for each character number of dice rolls
function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(() => Math.floor(Math.random()*6)+1);
}
 
// return placeholder dice
function getDicePlaceholderHtml(diceCount){
    return new Array(diceCount).fill(0).map(() => `<div class="dice"></div>`).join("");
}

// calculates the % for the health bar
const getPercentage=(ramainingHealth, maximumHealth) => (100* ramainingHealth)/maximumHealth

export {getDiceRollArray, getDicePlaceholderHtml, getPercentage};