import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from "./utils.js";


// class that buids each Character

export class Character {
    constructor(data){
        Object.assign(this, data);
        this.maxHealth=this.health;
        this.diceHtml=getDicePlaceholderHtml(this.diceCount);
    };

    setDiceHtml() {
        this.currentDiceScore=getDiceRollArray(this.diceCount); 
        this.diceHtml=this.currentDiceScore.map((num) => 
            `<div class="dice">${num}</div>`).join("");
    };

    // to calculate the dice total & reduce it from the health
    takeDamage(attackScoreArray) {
        const totalAttackScore= attackScoreArray.reduce((total, num) => total + num);
        this.health-=totalAttackScore;
        if (this.health<=0) {
            this.health=0;
            this.dead=true;
        }   
    };

    // render HTML for the health bar
    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth);
        
        return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "danger" : " "} " 
                style="width: ${percent}%;">
            </div>
        </div>`
    };

    // renders the HTML for each character
    getCharacterHtml() {
        const {elementId, name, avatar, health, diceCount, diceHtml}=this;
        const healthBar= this.getHealthBarHtml();

        return ` 
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}"/>
                <p class="health">health: <b> ${health} </b></p>
                ${healthBar}
                <div class="dice-container">${diceHtml}</div>
            </div> `;
    };
};
