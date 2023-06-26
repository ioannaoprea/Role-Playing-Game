import characterData from "./data.js";
import {Character} from "./character.js"


let monsterArray= ["orc", "demon", "goblin"];
let isWaiting=false;

function getNewMonster() {
    const nexMonsterData= characterData[monsterArray.shift()];
    return nexMonsterData ? new Character(nexMonsterData) : {} ;
}

// renders the Html for the dice  array and calculate the health after the attacl
function attack(){

    if(!isWaiting){
        wizard.setDiceHtml();
        monster.setDiceHtml();
        wizard.takeDamage(monster.currentDiceScore);
        monster.takeDamage(wizard.currentDiceScore);  
        render(); 
    
        if(wizard.dead) {
            endgame();
        } else if (monster.dead) {
            isWaiting=true;
            if(monsterArray.length>0){
                setTimeout(()=> {
                    monster= getNewMonster();
                    render();
                    isWaiting=false;
                }, 1500);
            } else {
                endgame(); 
            }
        }
    }
}

// to check the health of each character and to see who won
function endgame() {
    isWaiting=true;
    const endMessage= wizard.health===0 && monster.health===0 ? 
    "No victors - all creatures are dead" :
    wizard.health > 0 ? "The Wizard wins" : "The Monsters are Victorious";

    const endEmoji= wizard.health > 0 ? "🔮" : "☠️";
    setTimeout(()=> {
        document.body.innerHTML=`
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}<h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>`
    }, 2000);
    
}

// renders the Html for each character
function render() {
    document.getElementById("hero").innerHTML=wizard.getCharacterHtml();
    document.getElementById("monster").innerHTML=monster.getCharacterHtml();
}

document.getElementById("attack-button").addEventListener("click", attack);

const wizard=new Character(characterData.hero);
let monster= getNewMonster();

render();
